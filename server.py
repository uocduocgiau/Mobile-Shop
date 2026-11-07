import hashlib
import hmac
import os
import re
import secrets
import smtplib
import sqlite3
import time
from contextlib import contextmanager
from datetime import date
from email.message import EmailMessage
from pathlib import Path
from typing import Literal
from urllib.parse import quote

from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get("DATA_DIR", BASE_DIR / "data"))
DATABASE_PATH = Path(os.environ.get("DATABASE_PATH", DATA_DIR / "mobi-house.sqlite3"))
PUBLIC_ORIGIN = os.environ.get("PUBLIC_ORIGIN", "").rstrip("/")
COOKIE_NAME = "mobi_session"
COOKIE_SECURE = os.environ.get("COOKIE_SECURE", "false").lower() == "true"
SESSION_HOURS = 12
REMEMBER_DAYS = 30
PASSWORD_ITERATIONS = 310_000
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class LoginRequest(BaseModel):
    email: str = Field(min_length=3, max_length=254)
    password: str = Field(min_length=1, max_length=128)
    remember: bool = False


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: str = Field(min_length=3, max_length=254)
    password: str = Field(min_length=8, max_length=128)
    terms: bool


class EmailRequest(BaseModel):
    email: str = Field(min_length=3, max_length=254)


class ResetPasswordRequest(BaseModel):
    token: str = Field(min_length=20, max_length=200)
    password: str = Field(min_length=8, max_length=128)


class RepairBookingRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    phone: str = Field(min_length=9, max_length=15)
    brand: str = Field(min_length=2, max_length=50)
    model: str = Field(min_length=2, max_length=100)
    repair_type: Literal["battery", "screen", "back-glass", "camera", "mainboard"]
    preferred_date: date
    branch: str = Field(min_length=3, max_length=100)
    note: str = Field(default="", max_length=500)


@contextmanager
def database():
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE_PATH, timeout=15)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def initialize_database():
    with database() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                password_salt BLOB NOT NULL,
                password_hash BLOB NOT NULL,
                created_at INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS sessions (
                token_hash TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                expires_at INTEGER NOT NULL,
                created_at INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS sessions_user_id ON sessions(user_id);
            CREATE TABLE IF NOT EXISTS password_resets (
                token_hash TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                expires_at INTEGER NOT NULL,
                created_at INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS rate_limits (
                rate_key TEXT PRIMARY KEY,
                window_started INTEGER NOT NULL,
                attempts INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS repair_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_name TEXT NOT NULL,
                phone TEXT NOT NULL,
                device_brand TEXT NOT NULL,
                device_model TEXT NOT NULL,
                repair_type TEXT NOT NULL CHECK (repair_type IN ('battery', 'screen', 'back-glass', 'camera', 'mainboard')),
                preferred_date TEXT NOT NULL,
                branch TEXT NOT NULL,
                note TEXT NOT NULL DEFAULT '',
                status TEXT NOT NULL DEFAULT 'received',
                created_at INTEGER NOT NULL
            );
            """
        )


def normalize_email(email: str) -> str:
    normalized = email.strip().lower()
    if not EMAIL_PATTERN.fullmatch(normalized):
        raise HTTPException(status_code=422, detail="Địa chỉ email chưa hợp lệ.")
    return normalized


def hash_password(password: str, salt: bytes | None = None) -> tuple[bytes, bytes]:
    salt = salt or secrets.token_bytes(16)
    hashed = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PASSWORD_ITERATIONS)
    return salt, hashed


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def user_payload(user: sqlite3.Row) -> dict[str, str]:
    return {"name": user["name"], "email": user["email"]}


def enforce_rate_limit(scope: str, identity: str, limit: int, window_seconds: int = 900):
    now = int(time.time())
    rate_key = hash_token(f"{scope}:{identity}")
    with database() as connection:
        connection.execute("DELETE FROM rate_limits WHERE window_started < ?", (now - window_seconds,))
        row = connection.execute("SELECT window_started, attempts FROM rate_limits WHERE rate_key = ?", (rate_key,)).fetchone()
        if row and now - row["window_started"] < window_seconds:
            if row["attempts"] >= limit:
                retry_after = window_seconds - (now - row["window_started"])
                raise HTTPException(status_code=429, detail="Bạn thử quá nhiều lần. Vui lòng chờ rồi thử lại.", headers={"Retry-After": str(retry_after)})
            connection.execute("UPDATE rate_limits SET attempts = attempts + 1 WHERE rate_key = ?", (rate_key,))
        else:
            connection.execute(
                "INSERT INTO rate_limits(rate_key, window_started, attempts) VALUES (?, ?, 1) "
                "ON CONFLICT(rate_key) DO UPDATE SET window_started = excluded.window_started, attempts = 1",
                (rate_key, now),
            )


def request_identity(request: Request) -> str:
    return request.client.host if request.client else "unknown"


def create_session(user_id: int, response: Response, remember: bool):
    now = int(time.time())
    max_age = REMEMBER_DAYS * 24 * 60 * 60 if remember else SESSION_HOURS * 60 * 60
    token = secrets.token_urlsafe(32)
    with database() as connection:
        connection.execute("DELETE FROM sessions WHERE expires_at <= ?", (now,))
        connection.execute(
            "INSERT INTO sessions(token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)",
            (hash_token(token), user_id, now + max_age, now),
        )
    response.set_cookie(
        COOKIE_NAME,
        token,
        max_age=max_age,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        path="/",
    )


def current_user(request: Request) -> sqlite3.Row | None:
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        return None
    now = int(time.time())
    with database() as connection:
        session = connection.execute(
            "SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?",
            (hash_token(token), now),
        ).fetchone()
        if not session:
            connection.execute("DELETE FROM sessions WHERE token_hash = ?", (hash_token(token),))
            return None
        return connection.execute("SELECT id, name, email FROM users WHERE id = ?", (session["user_id"],)).fetchone()


def send_password_reset_email(email: str, reset_url: str):
    host = os.environ.get("SMTP_HOST")
    sender = os.environ.get("SMTP_FROM")
    if not host or not sender:
        raise RuntimeError("SMTP_HOST và SMTP_FROM chưa được cấu hình.")
    port = int(os.environ.get("SMTP_PORT", "587"))
    message = EmailMessage()
    message["Subject"] = "Đặt lại mật khẩu Mobile Shop"
    message["From"] = sender
    message["To"] = email
    message.set_content(
        "Bạn vừa yêu cầu đặt lại mật khẩu Mobile Shop. Mở liên kết sau trong vòng 60 phút:\n\n"
        f"{reset_url}\n\nNếu bạn không yêu cầu, hãy bỏ qua email này."
    )
    with smtplib.SMTP(host, port, timeout=20) as smtp:
        smtp.starttls()
        username = os.environ.get("SMTP_USERNAME")
        password = os.environ.get("SMTP_PASSWORD")
        if username and password:
            smtp.login(username, password)
        smtp.send_message(message)


def frontend_origin(request: Request) -> str:
    if PUBLIC_ORIGIN:
        return PUBLIC_ORIGIN
    forwarded_protocol = request.headers.get("x-forwarded-proto", request.url.scheme).split(",", 1)[0].strip()
    return f"{forwarded_protocol}://{request.headers.get('host', 'localhost')}".rstrip("/")


initialize_database()
app = FastAPI(title="Mobile Shop API", docs_url=None, redoc_url=None, openapi_url=None)


@app.middleware("http")
async def protect_auth_requests(request: Request, call_next):
    if request.url.path.startswith("/api/auth/") and request.method in {"POST", "PUT", "PATCH", "DELETE"}:
        origin = request.headers.get("origin")
        if origin and origin.rstrip("/") != frontend_origin(request):
            return JSONResponse(status_code=403, content={"detail": "Nguồn gửi yêu cầu không hợp lệ."})
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    if COOKIE_SECURE:
        response.headers["Strict-Transport-Security"] = "max-age=31536000"
    if request.url.path == "/" or request.url.path.startswith("/api/auth/"):
        response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/repairs", status_code=201)
def create_repair_booking(payload: RepairBookingRequest, request: Request):
    digits = re.sub(r"\D", "", payload.phone)
    if not 9 <= len(digits) <= 11:
        raise HTTPException(status_code=422, detail="Số điện thoại cần có từ 9 đến 11 chữ số.")
    if payload.preferred_date < date.today():
        raise HTTPException(status_code=422, detail="Ngày hẹn không được ở trong quá khứ.")
    enforce_rate_limit("repair", request_identity(request), 5)
    now = int(time.time())
    with database() as connection:
        cursor = connection.execute(
            "INSERT INTO repair_requests(customer_name, phone, device_brand, device_model, repair_type, preferred_date, branch, note, created_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                payload.name.strip(),
                payload.phone.strip(),
                payload.brand.strip(),
                payload.model.strip(),
                payload.repair_type,
                payload.preferred_date.isoformat(),
                payload.branch.strip(),
                payload.note.strip(),
                now,
            ),
        )
        request_id = cursor.lastrowid
    return {
        "booking": {
            "code": f"MS-{date.today():%y%m}-{request_id:06d}",
            "status": "received",
            "preferred_date": payload.preferred_date.isoformat(),
        }
    }


@app.post("/api/auth/register", status_code=201)
def register(payload: RegisterRequest, request: Request, response: Response):
    if not payload.terms:
        raise HTTPException(status_code=422, detail="Bạn cần đồng ý với điều khoản sử dụng.")
    name = payload.name.strip()
    if len(name) < 2:
        raise HTTPException(status_code=422, detail="Họ tên cần có ít nhất 2 ký tự.")
    email = normalize_email(payload.email)
    enforce_rate_limit("register", request_identity(request), 5)
    salt, password_hash = hash_password(payload.password)
    now = int(time.time())
    try:
        with database() as connection:
            cursor = connection.execute(
                "INSERT INTO users(name, email, password_salt, password_hash, created_at) VALUES (?, ?, ?, ?, ?)",
                (name, email, salt, password_hash, now),
            )
            user_id = cursor.lastrowid
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=409, detail="Email này đã được đăng ký.") from None
    create_session(user_id, response, remember=False)
    return {"user": {"name": name, "email": email}}


@app.post("/api/auth/login")
def login(payload: LoginRequest, request: Request, response: Response):
    email = normalize_email(payload.email)
    identity = f"{request_identity(request)}:{email}"
    enforce_rate_limit("login", identity, 10)
    with database() as connection:
        user = connection.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    if not user:
        hash_password(payload.password, b"mobile-shop-dummy-salt")
        raise HTTPException(status_code=401, detail="Email hoặc mật khẩu không chính xác.")
    candidate = hash_password(payload.password, user["password_salt"])[1]
    if not hmac.compare_digest(candidate, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Email hoặc mật khẩu không chính xác.")
    create_session(user["id"], response, remember=payload.remember)
    return {"user": user_payload(user)}


@app.get("/api/auth/me")
def get_me(request: Request):
    user = current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Bạn chưa đăng nhập.")
    return {"user": user_payload(user)}


@app.post("/api/auth/logout")
def logout(request: Request, response: Response):
    token = request.cookies.get(COOKIE_NAME)
    if token:
        with database() as connection:
            connection.execute("DELETE FROM sessions WHERE token_hash = ?", (hash_token(token),))
    response.delete_cookie(COOKIE_NAME, path="/", httponly=True, secure=COOKIE_SECURE, samesite="lax")
    return {"ok": True}


@app.post("/api/auth/forgot-password")
def forgot_password(payload: EmailRequest, request: Request):
    email = normalize_email(payload.email)
    enforce_rate_limit("forgot", request_identity(request), 5)
    if not os.environ.get("SMTP_HOST") or not os.environ.get("SMTP_FROM"):
        raise HTTPException(status_code=503, detail="Email đặt lại mật khẩu chưa được cấu hình trên máy chủ.")
    with database() as connection:
        user = connection.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
    if user:
        token = secrets.token_urlsafe(32)
        token_digest = hash_token(token)
        now = int(time.time())
        with database() as connection:
            connection.execute("DELETE FROM password_resets WHERE user_id = ? OR expires_at <= ?", (user["id"], now))
            connection.execute(
                "INSERT INTO password_resets(token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)",
                (token_digest, user["id"], now + 3600, now),
            )
        reset_url = f"{frontend_origin(request)}/#reset_token={quote(token)}"
        try:
            send_password_reset_email(email, reset_url)
        except (OSError, smtplib.SMTPException, RuntimeError, ValueError):
            with database() as connection:
                connection.execute("DELETE FROM password_resets WHERE token_hash = ?", (token_digest,))
            raise HTTPException(status_code=503, detail="Không gửi được email khôi phục. Vui lòng thử lại sau.") from None
    return {"message": "Nếu email có tài khoản, hướng dẫn đặt lại mật khẩu sẽ được gửi đến hộp thư."}


@app.post("/api/auth/reset-password")
def reset_password(payload: ResetPasswordRequest, response: Response):
    now = int(time.time())
    token_digest = hash_token(payload.token)
    with database() as connection:
        reset = connection.execute(
            "SELECT user_id FROM password_resets WHERE token_hash = ? AND expires_at > ?",
            (token_digest, now),
        ).fetchone()
        if not reset:
            raise HTTPException(status_code=400, detail="Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.")
        salt, password_hash = hash_password(payload.password)
        connection.execute("UPDATE users SET password_salt = ?, password_hash = ? WHERE id = ?", (salt, password_hash, reset["user_id"]))
        connection.execute("DELETE FROM password_resets WHERE user_id = ?", (reset["user_id"],))
        connection.execute("DELETE FROM sessions WHERE user_id = ?", (reset["user_id"],))
    response.delete_cookie(COOKIE_NAME, path="/", httponly=True, secure=COOKIE_SECURE, samesite="lax")
    return {"message": "Mật khẩu đã được cập nhật. Hãy đăng nhập bằng mật khẩu mới."}


@app.get("/", include_in_schema=False)
@app.get("/reset-password", include_in_schema=False)
def home():
    return FileResponse(BASE_DIR / "index.html")


@app.get("/styles.css", include_in_schema=False)
def stylesheet():
    return FileResponse(BASE_DIR / "styles.css", media_type="text/css")


@app.get("/app.js", include_in_schema=False)
def javascript():
    return FileResponse(BASE_DIR / "app.js", media_type="application/javascript")
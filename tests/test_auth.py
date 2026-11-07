import os
import tempfile
from urllib.parse import parse_qs, urlparse

import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("DATABASE_PATH", os.path.join(tempfile.gettempdir(), "mobi-house-import.sqlite3"))
import server


@pytest.fixture
def client(tmp_path, monkeypatch):
    monkeypatch.setattr(server, "DATABASE_PATH", tmp_path / "mobi-house-test.sqlite3")
    monkeypatch.setattr(server, "COOKIE_SECURE", False)
    monkeypatch.setattr(server, "PUBLIC_ORIGIN", "")
    server.initialize_database()
    sent_emails = []
    monkeypatch.setattr(server, "send_password_reset_email", lambda email, link: sent_emails.append((email, link)))
    monkeypatch.setenv("SMTP_HOST", "smtp.test")
    monkeypatch.setenv("SMTP_FROM", "noreply@example.test")
    with TestClient(server.app) as test_client:
        yield test_client, sent_emails


def create_account(client):
    response = client.post(
        "/api/auth/register",
        json={"name": "Minh Anh", "email": "MinhAnh@example.com", "password": "CorrectHorseBattery!", "terms": True},
    )
    assert response.status_code == 201
    return response


def test_register_uses_http_only_cookie_and_me_endpoint(client):
    test_client, _ = client
    response = create_account(test_client)

    assert response.json() == {"user": {"name": "Minh Anh", "email": "minhanh@example.com"}}
    cookie = response.headers["set-cookie"].lower()
    assert "httponly" in cookie
    assert "samesite=lax" in cookie
    assert "correcthorsebattery" not in response.text.lower()
    with server.database() as connection:
        stored = connection.execute("SELECT password_salt, password_hash FROM users WHERE email = ?", ("minhanh@example.com",)).fetchone()
    assert stored["password_hash"] != b"CorrectHorseBattery!"
    assert len(stored["password_salt"]) == 16
    assert test_client.get("/api/auth/me").json() == response.json()


def test_register_requires_terms_and_unique_email(client):
    test_client, _ = client
    payload = {"name": "Minh Anh", "email": "minhanh@example.com", "password": "CorrectHorseBattery!", "terms": False}

    assert test_client.post("/api/auth/register", json=payload).status_code == 422
    payload["terms"] = True
    assert test_client.post("/api/auth/register", json=payload).status_code == 201
    assert test_client.post("/api/auth/register", json=payload).status_code == 409


def test_login_rejects_bad_password_and_accepts_correct_password(client):
    test_client, _ = client
    create_account(test_client)
    test_client.post("/api/auth/logout")

    wrong = test_client.post("/api/auth/login", json={"email": "minhanh@example.com", "password": "wrong-pass"})
    assert wrong.status_code == 401
    assert wrong.json()["detail"] == "Email hoặc mật khẩu không chính xác."

    correct = test_client.post("/api/auth/login", json={"email": "minhanh@example.com", "password": "CorrectHorseBattery!"})
    assert correct.status_code == 200
    assert test_client.get("/api/auth/me").status_code == 200


def test_logout_revokes_session(client):
    test_client, _ = client
    create_account(test_client)

    assert test_client.post("/api/auth/logout").status_code == 200
    assert test_client.get("/api/auth/me").status_code == 401


def test_password_reset_link_changes_password_and_revokes_sessions(client):
    test_client, sent_emails = client
    create_account(test_client)
    test_client.post("/api/auth/logout")

    forgot = test_client.post("/api/auth/forgot-password", json={"email": "minhanh@example.com"})
    assert forgot.status_code == 200
    assert len(sent_emails) == 1
    token = parse_qs(urlparse(sent_emails[0][1]).fragment)["reset_token"][0]

    reset = test_client.post("/api/auth/reset-password", json={"token": token, "password": "AnotherCorrectPass!"})
    assert reset.status_code == 200
    assert test_client.post("/api/auth/reset-password", json={"token": token, "password": "ThirdCorrectPass!"}).status_code == 400
    assert test_client.post("/api/auth/login", json={"email": "minhanh@example.com", "password": "CorrectHorseBattery!"}).status_code == 401
    assert test_client.post("/api/auth/login", json={"email": "minhanh@example.com", "password": "AnotherCorrectPass!"}).status_code == 200


def test_auth_rejects_cross_origin_post(client):
    test_client, _ = client
    response = test_client.post(
        "/api/auth/login",
        json={"email": "minhanh@example.com", "password": "wrong-pass"},
        headers={"Origin": "https://attacker.example"},
    )

    assert response.status_code == 403
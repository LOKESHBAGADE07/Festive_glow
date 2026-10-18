"""Smoke tests for the prototype API. Run: cd /app/backend && python -m pytest tests -q"""
import os
import uuid

import requests

BASE = os.environ.get("API_BASE", "http://localhost:8001/api")


def test_health():
    r = requests.get(f"{BASE}/health", timeout=10)
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_newsletter_issues_welcome_code_and_dedupes():
    email = f"test-{uuid.uuid4().hex[:8]}@example.com"
    r = requests.post(f"{BASE}/newsletter", json={"email": email, "source": "test"}, timeout=10)
    assert r.status_code == 200
    body = r.json()
    assert body["email"] == email
    assert body["welcome_code"] == "GLOW10"
    r2 = requests.post(f"{BASE}/newsletter", json={"email": email, "source": "test"}, timeout=10)
    assert r2.status_code == 200
    assert r2.json()["id"] == body["id"]


def test_newsletter_rejects_invalid_email():
    r = requests.post(f"{BASE}/newsletter", json={"email": "not-an-email", "source": "test"}, timeout=10)
    assert r.status_code == 422


def test_contact_requires_fields():
    r = requests.post(f"{BASE}/contact", json={"name": "", "email": "x@y.z", "message": ""}, timeout=10)
    assert r.status_code == 422
    r = requests.post(f"{BASE}/contact", json={"name": "Test", "email": "x@y.zz", "subject": "Hi", "message": "Hello"}, timeout=10)
    assert r.status_code == 200
    assert r.json()["name"] == "Test"

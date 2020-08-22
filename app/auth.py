from flask import Flask
from werkzeug.security import safe_str_cmp, check_password_hash
import requests


BASE_URL = "http://localhost:5006/api/v0.1/user"


def create_token():
    return "fake token"


def authenticate(username, password):
    response = requests.get(f"{BASE_URL}/{username}")

    if not response:
        return "fake no token"

    if check_password_hash(response.password_hash, password):
        return create_token()


def identity(payload):
    response = requests.get(f"{BASE_URL}/{payload['username']}")

    return response
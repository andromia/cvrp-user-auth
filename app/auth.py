from flask import Flask
from werkzeug.security import safe_str_cmp, check_password_hash
import requests
from flask_jwt_extended import create_access_token


BASE_URL = "http://localhost:5006/api/v0.1/user"


def create_token(user: dict):
    identity = {key: user[key] for key in user if "password" not in key}

    return create_access_token(identity=identity)


def authenticate(username, password):
    response = requests.get(f"{BASE_URL}/{username}")

    if not response:
        return None

    if check_password_hash(response.password_hash, password):
        return response

    return None

from flask import Flask
from datetime import timedelta
from werkzeug.security import safe_str_cmp, check_password_hash
from flask_jwt_extended import create_access_token
from json import loads
import requests

# TODO: for docker containers
# BASE_URL = "http://flask_crud_dev:5006/api/v0.1/user"
BASE_URL = "http://localhost:5006/api/v0.1/user"


def create_token(user: dict):
    identity = {key: user[key] for key in user if "password" not in key}
    token = create_access_token(identity=identity, expires_delta=timedelta(hours=5))

    return token


def authenticate(username, password):
    response = requests.get(f"{BASE_URL}/{username}")

    if response.status_code != 200:
        return None

    user = loads(response.text)["user"]
    if check_password_hash(user["password_hash"], password):
        return create_token(user)

    return None

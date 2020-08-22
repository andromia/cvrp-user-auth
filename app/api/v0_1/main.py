from json import loads, dumps
from typing import List

from flask import jsonify, make_response, request
import requests

from app import auth

from . import bp


BASE_URL = "http://localhost:5006/api/v0.1/user"


@bp.route("/login", methods=["POST"])
def login():
    """
    TODO    
    """
    body = loads(request.data)

    if not auth.authenticate(body["username"], body["password"]):
        return "failed to authenticate"

    return auth.create_token()


@bp.route("/register", methods=["POST"])
def register():
    """
    TODO    
    """
    body = loads(request.data)

    response = requests.get(f"{BASE_URL}/{body['username']}")
    if response:
        return "username exists"

    response = requests.post(BASE_URL, json={"user": body})

    return auth.create_token()

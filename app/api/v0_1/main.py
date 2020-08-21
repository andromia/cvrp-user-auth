from json import loads
from typing import List

from flask import jsonify, make_response, request
import requests

from app import auth

from . import bp


@bp.route("/login", methods=["POST"])
def login():
    """
    TODO    
    """
    body = loads(request.data)

    user = requests.get(f"http://localhost:5006/api/v0.1/user/{body['username']}")

    return jsonify(user.__str__())

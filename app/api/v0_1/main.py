from json import loads
from typing import List

from flask import jsonify, make_response, request

from app import auth

from . import bp


@bp.route("/login", methods=["POST"])
def login():
    """
    TODO    
    """
    body = loads(request.data)
    
    response = None
    
    return jsonify(response)

import logging
import os
from logging.handlers import RotatingFileHandler, SMTPHandler

from flask import Flask, current_app, request
from flask_cors import CORS

from config import Config

__version__ = "v0.1"


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)

    from app.api.v0_1 import bp as api_bp

    app.register_blueprint(api_bp, url_prefix="/api/v0.1")

    return app

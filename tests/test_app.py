from . import common
from app import auth, create_app
from app import __version__

from config import Config

import logging
import pytest
import json


class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite://"


@pytest.fixture
def client():
    yield create_app(TestConfig).test_client()


def test_login(client):
    input_data = []
    logging.debug(f"input data : {input_data}")

    endpoint = f"/api/{__version__}/login"
    logging.debug(f"endpoint: {endpoint}")

    response = client.post(endpoint, json=input_data)
    output = json.loads(response.get_data())


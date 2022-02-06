import pytest
from flask import Flask, request

from app.validation import validate_service

app = Flask(__name__)


@pytest.mark.parametrize("params", [
   {"service": 1},
   {"service": ["array"]}
])
def test_invalid_types_are_rejected(params, create_valid_service_request):
   json_input = create_valid_service_request(**params)
   with app.test_request_context('/', json=json_input):
       errors = validate_service(request)
       assert errors is not None


@pytest.mark.parametrize("required_parm_name", ["service"])
def test_missing_required_params_is_rejected(required_parm_name, create_valid_service_request):
   json_input = create_valid_service_request()
   del json_input[required_parm_name]
   with app.test_request_context('/', json=json_input):
       errors = validate_service(request)
       assert errors is not None


def test_valid_service_is_accepted(create_valid_service_request):
   json_input = create_valid_service_request(service="Tester")
   with app.test_request_context('/', json=json_input):
       errors = validate_service(request)
       assert errors is None
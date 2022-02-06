from flask_inputs import Inputs
from flask_inputs.validators import JsonSchema

# https://pythonhosted.org/Flask-Inputs/#module-flask_inputs
# https://json-schema.org/understanding-json-schema/
# we want an object containing a required greetee  string value
service_schema = {
   'type': 'object',
   'properties': {
       'service': {
           'type': 'string',
       }
   },
   'required': ['service']
}


class ServiceInputs(Inputs):
   json = [JsonSchema(schema=service_schema)]


def validate_service(request):
   inputs = ServiceInputs(request)
   print(request)
   if inputs.validate():
       return None
   else:
       return inputs.errors
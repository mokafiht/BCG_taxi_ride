# src/tests/app/test_main.py

# http://flask.pocoo.org/docs/1.0/testing/#testing-json-apis
def test_hello_service(client):
   request_payload = {"service": "service"}
   response = client.post("/hello", json=request_payload)
   result = response.get_json()

   assert response.status_code == 200
   assert result is not None
   assert "message" in result
   assert result['message'] == "hello service"
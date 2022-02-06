from flask import Flask, jsonify, request
from mypkg.testservice import say_hello_service
from app.invalid_usage  import InvalidUsage
from app.validation  import validate_service
import sqlite3
import json
from flask_cors import CORS

cors = CORS()
app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def index() -> str:
    # transform a dict into an application/json response 
    return jsonify({"message": "It Works"})

@app.route("/hello", methods=['POST'])
def hello() -> str:
    testvar = request.get_json("service")
    errors = validate_service(request)
    if errors is not None:
       print(errors)
       raise InvalidUsage(errors)
    response = {"message": say_hello_service(testvar['service'])}
    return jsonify(response)

@app.route("/rides", methods=['POST'])
def rides() -> str:
    conn = get_db_connection()
    rides = conn.execute('SELECT * FROM ride').fetchall()
    conn.close()
    data = []
    idxs = ['id','distance','startTime','duration']
    for row in rides:
        tmpdict = dict()
        i = 0
        for x in row:
            tmpdict[idxs[i]] = x
            i = i + 1
        data.append(tmpdict)
    response = jsonify(data)#json.dumps(data, indent=2)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
   response = jsonify(error.to_dict())
   response.status_code = error.status_code
   return response
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)        

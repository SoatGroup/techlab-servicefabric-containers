import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    if os.environ.get('Fabric_NodeName') is not None:
        computer_name = os.environ['Fabric_NodeName']
    else:
        computer_name = os.environ['COMPUTERNAME']

    return computer_name

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
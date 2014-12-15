from flask import Flask
from flask import render_template
from flask import request

import json
import logging

app = Flask(__name__, static_url_path='/build', static_folder='build')

@app.route('/')
def todo():
    return render_template('todo.html')

@app.route('/tasks.json')
def getTasks():
    with open("tasks.json") as json_file:
        json_data = json.load(json_file)
        return json.dumps(json_data)

@app.route('/addTask/', methods=['POST'])
def addTask():
    print("here")
    # result = request.json.get('result')
    # print result

if __name__ == '__main__':
    app.run(debug=True)
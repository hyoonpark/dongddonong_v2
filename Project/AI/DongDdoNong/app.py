

from flask import Flask, request, jsonify, send_file


app = Flask(__name__)



@app.route('/')
def index():
    return "Hello World!"
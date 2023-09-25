from flask import Flask, request, jsonify, send_file
from video import upload


app = Flask(__name__)


@app.route('/')
def index():
    return "Hello World!"


@app.route('/ai/upload', methods=['POST'])
def upload_file():
    rslt = upload.module()
    return rslt
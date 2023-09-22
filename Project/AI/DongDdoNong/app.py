from flask import Flask, request, jsonify, send_file
import boto3
import uuid
from werkzeug.utils import secure_filename  # 파일 가져오기


app = Flask(__name__)


s3 = boto3.client(
    's3',
    # aws_access_key_id=app.config['S3_ACCESS_KEY'],
    # aws_secret_access_key=app.config['S3_SECRET_KEY'],
    aws_access_key_id='AKIATFUDLW4NBSNG2SR7',
    aws_secret_access_key='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',
    # config=Config(signature_version='s3v4')
)


# 동영상 업로드
@app.route('/ai/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file:
        folder = 'video/'
        filename = secure_filename(file.filename)
        unique_filename = str(uuid.uuid4()) + os.path.splitext(filename)[1]
        key = os.path.join(folder, unique_filename)
        # s3.upload_fileobj(file, app.config['S3_BUCKET_NAME'], filename)
        s3.upload_fileobj(file, 'dongddonong', key)
        return 'File uploaded successfully', 200

    return 'No file selected', 404


@app.route('/')
def index():
    return "Hello World!"
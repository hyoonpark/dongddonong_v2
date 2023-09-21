import os

from flask import Flask, request, jsonify, send_file
# from werkzeug.utils import secure_filename  # 파일 가져오기
# import joblib  # 학습된 모델 가져오기

# dongddonong_model = joblib.load(# 경로)

app = Flask(__name__)


# 영상 분석 endpoint
# @app.route('/AI/analysis', methods=['POST', 'GET'])
# def analysis():
#     if request.method == 'POST':
#         video_data = request.files['video']  # 클라이언트에서 데이터 받기
#         video_data.save()
#
#         analysis_result = dongddonong_model.analysis(video_data)
#
#         return jsonify({'analysis_result': analysis_result})


@app.route('/ai')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0')
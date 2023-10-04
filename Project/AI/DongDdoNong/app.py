import os
import sys
NOW_DIR = os.getcwd()
sys.path.append(NOW_DIR + '/deepsort')


from flask import Flask, request, jsonify, send_file, redirect
import requests

import boto3
# import opencv
# from scenedetect import open_video, SceneManager
# from scenedetect.detectors import ContentDetector
# from scenedetect.scene_manager import save_images
# from scenedetect.video_splitter import split_video_ffmpeg
# from moviepy.editor import VideoFileClip, concatenate_videoclips, vfx, AudioFileClip, afx
from deepsort import basketball
# from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
# from moviepy.editor import VideoFileClip, AudioFileClip
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
app = Flask(__name__)


s3 = boto3.client(
    's3',
    # aws_access_key_id=app.config['S3_ACCESS_KEY'],
    # aws_secret_access_key=app.config['S3_SECRET_KEY'],
    aws_access_key_id='AKIATFUDLW4NBSNG2SR7',
    aws_secret_access_key='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',
    # config=Config(signature_version='s3v4')
)


@app.route('/ai')
def test():
    return "test"


@app.route('/ai/analysis/{ID}', methods=['POST'])
def analyze_video(ID):
    spring_url = f'https://j9e103.p.ssafy.io:8589/game'
    try:
        # Lambda 함수로부터 전달된 동영상 데이터 받기
        video_data = request.data
        result = basketball.detect(video_data, ID)

        # 동영상 데이터를 메모리에서 읽기
        # nparr = np.fromstring(video_data, np.uint8)
        # video_frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # 분석 결과 반환
        # highlight = highlight_video(result, video_data)
        try:
            # Spring Boot 서버로 POST 요청을 보냅니다.
            response = requests.post(spring_url, jsonify({'result': result}))

            # 응답 확인
            if response.status_code == 200:
                result = response.json()
                print("Analysis Result:", result['result'])
            else:
                print("Error:", response.status_code, response.text)

        except Exception as e:
            print("Error:", str(e))

        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
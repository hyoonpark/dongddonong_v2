import os

from flask import Flask, request, jsonify, send_file, redirect, requests
import joblib

import boto3
import opencv
from scenedetect import open_video, SceneManager
from scenedetect.detectors import ContentDetector
from scenedetect.scene_manager import save_images
from scenedetect.video_splitter import split_video_ffmpeg
from moviepy.editor import VideoFileClip, concatenate_videoclips, vfx, AudioFileClip, afx


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


@app.route('ai/analysis/{ID}', method=['POST'])
def analyze_video(ID):
    try:
        # Lambda 함수로부터 전달된 동영상 데이터 받기
        video_data = request.data

        # 동영상 데이터를 메모리에서 읽기
        nparr = np.fromstring(video_data, np.uint8)
        video_frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # 동영상 분석 로직 구현
        # 여기에서 동영상 프레임을 처리하고 분석 작업
        # 예를 들어, 프레임별로 얼굴 인식, 객체 추적
        clf = joblib.load("저장된 모델.pkl 경로")  # 모델 로드
        prediction = clf.predict(video_frame)  # 예측값

        # 분석 결과 반환
        analysis_result = prediction  # ex) 카카오톡 ID 1/1, 50, 60
        highlight = highlight_video(analysis_result, video_data)
        return jsonify({'result': analysis_result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def highlight_video(result, video_data):
    # 디텍터 생성, 임계값 30, 장면 당 최소 프레임 수 150
    content_detector = ContentDetector(threshold=30, min_scene_len=150)

    # Scene Manager 생성
    scene_manager = SceneManager()
    scene_manager.add_detector(content_detector)

    # 디텍트 수행
    scene_manager.detect_scenes(video_data, show_progress=True)
    scene_list = scene_manager.get_scene_list()

    # 장면 분할 결과 출력
    for scene in scene_list:
        start, end = scene
        print(start, "~", end)

    # 영상 자르기 (파일로 저장)
    split_video_ffmpeg(video_path, scene_list, show_progress=True)

    clip1 = VideoFileClip("test-Scene-001.mp4").subclip(0, 20).fx(vfx.speedx, 0.5).fx(vfx.fadein, 1)
    clip2 = VideoFileClip("test-Scene-002.mp4").subclip(0, 8)
    clip3 = VideoFileClip("test-Scene-003.mp4").subclip(1, 6)
    clip4 = VideoFileClip("test-Scene-004.mp4").subclip(1, 6).fx(vfx.fadeout, 1)

    combined = concatenate_videoclips([clip1, clip2, clip3, clip4])
    combined.write_videofile("combined.mp4")
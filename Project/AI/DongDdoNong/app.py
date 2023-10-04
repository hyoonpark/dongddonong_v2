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
from deepsort import basketball
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
from moviepy.editor import VideoFileClip, AudioFileClip

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


@app.route('ai/analysis/<ID>', method=['POST'])
def analyze_video(ID):
    try:
        # Lambda 함수로부터 전달된 동영상 데이터 받기
        video_data = request.data
        result = basketball.detect(video_data, ID)

        # 동영상 데이터를 메모리에서 읽기
        # nparr = np.fromstring(video_data, np.uint8)
        # video_frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # 분석 결과 반환
        # highlight = highlight_video(result, video_data)


        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def highlight_video(result, video_data):
    for _ in range(len(result["playerHistories"])):
        # 각 슛 장면 주변 2초씩 가져오기
        highlight_duration = 2  # 2초
        for frame in result["playerHistories"].get("goalTime"):
            start_time = max(frame - highlight_duration, 0)
            end_time = frame + highlight_duration
            output_file = f'highlight_{frame}.mp4'

            # 동영상의 해당 부분 추출
            ffmpeg_extract_subclip(video_data, start_time, end_time, targetname=output_file)

            # 추출된 하이라이트 동영상에 배경 음악 추가
            highlight_clip = VideoFileClip(output_file)
            bgm_clip = AudioFileClip(bgm_path)

            # 무음 오디오 클립 생성
            silence_clip = AudioFileClip("", fps=44100, duration=highlight_clip.duration)

            # 하이라이트 동영상에 배경 음악을 무음 오디오 클립과 함께 합치기
            final_clip = highlight_clip.set_audio(silence_clip).set_audio(bgm_clip)

            # 하이라이트 동영상 저장
            final_clip.write_videofile(output_file)

        clips = [VideoFileClip(f'highlight_{frame}.mp4') for frame in shot_frames]
        final_video = concatenate_videoclips(clips)
        final_video.write_videofile('highlight_summary.mp4')
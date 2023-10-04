import os
os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"] = "4,5"

import argparse
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
import numpy as np
import math
import cv2
from pathlib import Path
import glob
import re


### 환경 설정 쪽 부분들 ###
def increment_path(path, exist_ok=True, sep=''):
    # Increment path, i.e. runs/exp --> runs/exp{sep}0, runs/exp{sep}1 etc.
    path = Path(path)  # os-agnostic
    if (path.exists() and exist_ok) or (not path.exists()):
        return str(path)
    else:
        dirs = glob.glob(f"{path}{sep}*")  # similar paths
        matches = [re.search(rf"%s{sep}(\d+)" % path.stem, d) for d in dirs]
        i = [int(m.groups()[0]) for m in matches if m]  # indices
        n = max(i) + 1 if i else 2  # increment number
        return f"{path}{sep}{n}"  # update path
    

### 환경 설정 쪽 부분들 끝 ###


def pose(num, id):
    # 인식할 사진
    image_path = "pose/crop_image.jpg"
    image = mp.Image.create_from_file(image_path)
    image_name = os.path.basename(image_path)
    
    
    # 모델 주소
    model_path = 'pose/pose_landmarker_full.task'
    save_dir = Path(increment_path(Path('pose/runs') / 'exp', exist_ok='store_true'))
    save_dir.mkdir(parents=True, exist_ok=True)
    save_path = os.path.join(save_dir, str(num)+"_"+str(id)+".jpg")
    

    # 포즈 모델 가져오기
    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.PoseLandmarkerOptions(
        base_options=base_options,
        output_segmentation_masks=True)
    detector = vision.PoseLandmarker.create_from_options(options)

    
    # 객체 인식
    detection_result = detector.detect(image)
    
    # 포즈 인식이 안 되는 경우...가 발생하는 경우를 대비한 예외처리
    if len(detection_result.pose_landmarks) != 0:        
#         print(detection_result.pose_landmarks[0])
        # 몸의 어느 쪽이 더 잘 보이는 쪽인지 14랑 13의 z축을 비교하면 되겠다
        visibilityL = detection_result.pose_landmarks[0][13].visibility
        visibilityR = detection_result.pose_landmarks[0][14].visibility
        
        # visibility를 이용해서 더 잘 보이는 쪽 기준으로 가쟈
        if visibilityL > visibilityR:
            label = classifyPoseL(detection_result.pose_landmarks[0], image, id)
        else:
            label = classifyPoseR(detection_result.pose_landmarks[0], image, id)
        
        # 시각화
        annotated_image = draw_landmarks_on_image(image.numpy_view(), detection_result)
#         cv2.imwrite(save_path, image.numpy_view())
        return label


# 1, 2, 3 순서로 있을 때 사이 각 계산하기
# lr 이 1이면 왼쪽, 2면 오른쪽
def calculateAngle(lr, landmark1, landmark2, landmark3):
    x1, y1 = landmark1.x, landmark1.y
    x2, y2 = landmark2.x, landmark2.y
    x3, y3 = landmark3.x, landmark3.y

    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) - math.atan2(y1 - y2, x1 - x2))

#     # 오른쪽에는 이게 되네...
#     # 아크탄젠트라(-180~180) 음수가 있어서 양수(0~360)로 만들어주기 
    if angle < 0:
        angle += 360
        if angle > 180:
            angle = 360 - angle
            
    return angle


def classifyPoseL(landmarks, output_image, id, display=False):
    flag = False
    color = (0, 0, 255)
    num = 0
    
    # 왼쪽 팔꿈치(13), 왼쪽 어깨(11), 왼쪽 엉덩이(23) 사이 각 계산
    left_body_angle = calculateAngle(1, landmarks[13], landmarks[11], landmarks[23])
    
    # 왼쪽 어깨(11), 왼쪽 팔꿈치(13), 왼쪽 손목(15) 사이 각 계산
    left_elbow_angle = calculateAngle(1, landmarks[11], landmarks[13], landmarks[15])
    
#     print("왼", left_body_angle, left_elbow_angle)
    
    # 팔이 위를 향해 벌어졌는지 확인(패스, 드리블과 구분하기 위해) 
    if left_body_angle > 110 and left_body_angle < 180:
        num += 1
    # 한 팔을 폈는지 확인한다.
    if left_elbow_angle > 130 and left_elbow_angle < 180:
        num += 2
    if num == 3:
        flag = True
#     print("in pose", num)
    return num

def classifyPoseR(landmarks, output_image, id, display=False):
    flag = False
    color = (0, 0, 255)
    num = 0
    
    # 오른쪽 팔꿈치(14), 오른쪽 어깨(12), 오른쪽 엉덩이(24) 사이 각 계산
    right_body_angle = calculateAngle(2, landmarks[14], landmarks[12], landmarks[24])
    
    # 오른쪽 어깨(12), 오른쪽 팔꿈치(14), 오른쪽 손목(16) 사이 각 계산
    right_elbow_angle = calculateAngle(2, landmarks[12], landmarks[14], landmarks[16])
    
#     print("오", right_body_angle, right_elbow_angle)
    
    # 팔이 몸과 90도 이상 벌어졌는지...(패스, 드리블과 구분하기 위해) 
    if right_body_angle > 110 and right_body_angle < 180:
        num += 1
    # 한 팔을 폈는지 확인한다.
    if right_elbow_angle > 130 and right_elbow_angle < 180:
        num += 2
    if num == 3:
        flag = True
#     print("in pose", num)
    return num


def draw_landmarks_on_image(rgb_image, detection_result):
    pose_landmarks_list = detection_result.pose_landmarks
    annotated_image = np.copy(rgb_image)
    

  # Loop through the detected poses to visualize.
    for idx in range(len(pose_landmarks_list)):
        pose_landmarks = pose_landmarks_list[idx]

        # Draw the pose landmarks.
        pose_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
        pose_landmarks_proto.landmark.extend([
          landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in pose_landmarks
        ])
        solutions.drawing_utils.draw_landmarks(
          annotated_image,
          pose_landmarks_proto,
          solutions.pose.POSE_CONNECTIONS,
          solutions.drawing_styles.get_default_pose_landmarks_style())
    return annotated_image



if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--project', default='runs', help='save results to project/name')
    parser.add_argument('--name', default='exp', help='save results to project/name')    
    parser.add_argument('--exist-ok', action='store_true', help='existing project/name ok, do not increment')

    opt = parser.parse_args()
    pose()



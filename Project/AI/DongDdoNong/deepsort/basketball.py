import os

import argparse
import time
from pathlib import Path

import cv2
import torch
import torch.backends.cudnn as cudnn

from numpy import random
import copy

from PIL import Image
import itertools


from models.experimental import attempt_load
from utils.datasets import LoadStreams, LoadImages
from utils.general import check_img_size, check_requirements, check_imshow, non_max_suppression, apply_classifier, \
    scale_coords, xyxy2xywh, strip_optimizer, set_logging, increment_path
from utils.plots import plot_one_box
from utils.torch_utils import select_device, load_classifier, time_synchronized, TracedModel

from pose.pose_estimation import pose

from deep_sort_pytorch.utils.parser import get_config
from deep_sort_pytorch.deep_sort import DeepSort
from collections import deque
import numpy as np
palette = (2 ** 11 - 1, 2 ** 15 - 1, 2 ** 20 - 1)
data_deque = {}

class Player:
    def __init__(self, id):
        self.id = id
        self.st2=0
        self.st3=0
        self.sg2=0
        self.sg3=0
        self.ballTime = 0
        self.pose = 0
        self.goalTime = []
        self.image = []

    def shot_try_plus2(self):
        self.st2+=1
    
    def shot_goal_plus2(self):
        self.sg2+=1 
            
    def shot_try_plus3(self):
        self.st3+=1
    
    def shot_goal_plus3(self):
        self.sg3+=1 
        
    def ball_time_plus(self):
        self.ballTime+=1 
        
    def shot_goal_time_plus(self, time):
        self.goalTime.append(time)


def detect(video, ID):
    shot_try_done = False
    shot_goal_try = False
    shot_goal_try_count = 0
    shot_goal_done = True
    after_goal = 0
    
    players = {}
    players_data = {}
    
    shot_id = -1
    shot_where = 2

    shot_count = 0
    
    shot_ing = False

    last_distance = 0
    
    ball_data = []
    last_ball_data = []
    last_rim_data = []
    rim_height = 0
    
    
    names, source, weights, view_img, save_txt, imgsz, trace = opt.names, video, opt.weights, opt.view_img, opt.save_txt, opt.img_size, not opt.no_trace
    save_img = not opt.nosave and not source.endswith('.txt')
    webcam = source.isnumeric() or source.endswith('.txt') or source.lower().startswith(
        ('rtsp://', 'rtmp://', 'http://', 'https://'))


    save_dir = Path(increment_path(Path(opt.project) / opt.name, exist_ok=opt.exist_ok))
    (save_dir / 'labels' if save_txt else save_dir).mkdir(parents=True, exist_ok=True)

    cfg_deep = get_config()
    cfg_deep.merge_from_file("deep_sort_pytorch\configs\deep_sort.yaml")
    deepsort = DeepSort(cfg_deep.DEEPSORT.REID_CKPT,
                        max_dist=cfg_deep.DEEPSORT.MAX_DIST, min_confidence=cfg_deep.DEEPSORT.MIN_CONFIDENCE,
                        nms_max_overlap=cfg_deep.DEEPSORT.NMS_MAX_OVERLAP, max_iou_distance=cfg_deep.DEEPSORT.MAX_IOU_DISTANCE,
                        max_age=cfg_deep.DEEPSORT.MAX_AGE, n_init=cfg_deep.DEEPSORT.N_INIT, nn_budget=cfg_deep.DEEPSORT.NN_BUDGET,
                        use_cuda=True)


    set_logging()
    device = select_device(opt.device)
    half = device.type != 'cpu'


    model = attempt_load(weights, map_location=device) 
    stride = int(model.stride.max()) 
    
    if trace:
        model = TracedModel(model, device, opt.img_size)

    if half:
        model.half()


    vid_path, vid_writer = None, None
    if webcam:
        view_img = check_imshow()
        cudnn.benchmark = True  
        dataset = LoadStreams(source, img_size=imgsz, stride=stride)
    else:
        dataset = LoadImages(source, img_size=imgsz, stride=stride)
    
    cap = cv2.VideoCapture(source)
    fps = cap.get(cv2.CAP_PROP_FPS)
    

    # Get names and colors
    names = load_classes(names)
    colors = [[random.randint(0, 255) for _ in range(3)] for _ in names]

    # Run inference
    if device.type != 'cpu':
        model(torch.zeros(1, 3, imgsz, imgsz).to(device).type_as(next(model.parameters())))
    old_img_w = old_img_h = imgsz
    old_img_b = 1

    t0 = time.time()
    
    
    for idx, (path, img, im0s, vid_cap) in enumerate(dataset): 
        temp = copy.deepcopy(im0s)
        
        img = torch.from_numpy(img).to(device)
        img = img.half() if half else img.float()
        img /= 255.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)
            
        image_height, image_width, _ = im0s.shape

        if device.type != 'cpu' and (old_img_b != img.shape[0] or old_img_h != img.shape[2] or old_img_w != img.shape[3]):
            old_img_b = img.shape[0]
            old_img_h = img.shape[2]
            old_img_w = img.shape[3]
            for i in range(3):
                model(img, augment=opt.augment)[0]

        t1 = time_synchronized()
        with torch.no_grad():
            pred = model(img, augment=opt.augment)[0]
        t2 = time_synchronized()
        pred = non_max_suppression(pred, opt.conf_thres, opt.iou_thres, classes=opt.classes, agnostic=opt.agnostic_nms)
        t3 = time_synchronized()


        for i, det in enumerate(pred):   
            if webcam:
                p, s, im0, frame = path[i], '%g: ' % i, im0s[i].copy(), dataset.count
            else:
                p, s, im0, frame = path, '', im0s, getattr(dataset, 'frame', 0)

            p = Path(p)
            save_path = str(save_dir / p.name)
            gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]
            
            if len(det):
                det[:, :4] = scale_coords(img.shape[2:], det[:, :4], im0.shape).round()

                for c in det[:, -1].unique():
                    n = (det[:, -1] == c).sum() 
                    s += '%g %ss, ' % (n, names[int(c)]) 
                    
                
                xywh_bboxs = []
                confs = []
                oids = []
                
                for *xyxy, conf, cls in reversed(det):
                    x_c, y_c, bbox_w, bbox_h = xyxy_to_xywh(*xyxy)
                    xywh_obj = [x_c, y_c, bbox_w, bbox_h]
                    xywh_bboxs.append(xywh_obj)
                    confs.append([conf.item()])
                    oids.append(int(cls))
                    
                    if int(cls) == 2:
                        ball_data = xywh_obj[0],xywh_obj[1], xywh_obj[0]+xywh_obj[2], xywh_obj[1]+xywh_obj[3] 
                        plot_one_box(xyxy, im0, label="ball", color=colors[int(cls)], line_thickness=1)
                        continue
    
                    if save_img or view_img:
                        label = f'{names[int(cls)]} {conf:.2f}'
                        plot_one_box(xyxy, im0, label=label, color=colors[int(cls)], line_thickness=1)

                xywhs = torch.Tensor(xywh_bboxs)
                confss = torch.Tensor(confs)

                outputs = deepsort.update(xywhs, confss, oids, im0)

                if len(outputs) > 0:
                    bbox_xyxy = outputs[:, :4]
                    identities = outputs[:, -2]
                    object_id = outputs[:, -1]


                    person_data = outputs[outputs[:,-1]==0]
                    rim_data = outputs[outputs[:,-1]==1]
                    person_num = len(person_data)
                    
                    for now in person_data:
                        x1, y1, x2, y2, id = now[0], now[1], now[2], now[3], now[4]
                        person_width = (x2-x1)/2
                        ball_width = (ball_data[3]-ball_data[1])/2

                        crop = temp[y1:y2, x1:x2]
                        crop_data = np.array(crop, dtype=np.uint8)
                        crop_image = Image.fromarray(crop_data)

                        if id not in players or idx %15 == 0:
                            save_image = cv2.cvtColor(crop_data, cv2.COLOR_BGR2RGB)
                            folder_path = "pose/exp/"+str(id)
                            if not os.path.exists(folder_path):
                                os.makedirs(folder_path)
                            cv2.imwrite("pose/exp/"+str(id)+"/"+
                                        str(len(os.listdir(f"pose/exp/{id}")))+".jpg", cv2.cvtColor(save_image, cv2.COLOR_RGB2BGR))             
                    
                        if id not in players:
                            players[id] = Player(id)

                            players_data[id] = crop_data
                    
                    close_person, distance = close_person_find(person_data, ball_data)
                    
                    x1, y1, x2, y2, close_id = person_data[close_person][0], person_data[close_person][1], person_data[close_person][2], person_data[close_person][3], person_data[close_person][4]
                    person_width = (x2-x1)/2
                    ball_width = (ball_data[3]-ball_data[1])/2

                    crop = temp[max(y1-30, 0):min(y2+30, image_height), max(x1-40, 0):min(image_width,x2+40)]
                    crop_data = np.array(crop, dtype=np.uint8)
                    crop_image = Image.fromarray(crop_data)
                        
                    crop_image.save("pose/crop_image.jpg")                            

                    result_pose = pose(idx, close_id)
                    if result_pose == 3:
                        shot_ing = True
                        shot_id = close_id
                        shot_where = 2
                        
                    if not shot_try_done and shot_goal_done and shot_id != -1:
                        players[shot_id].ball_time_plus()
                    else:
                        if distance < ball_width*2 + person_width:
                            players[close_id].ball_time_plus()

                    if not shot_try_done and shot_goal_done and shot_id != -1:
                        if shot_count < 6:
                            if distance > last_distance:
                                shot_count+=1
                                last_distance = distance

                        else: 
                            shot_try_done = True    
                            shot_count = 0
                            if shot_where == 2:
                                players[shot_id].shot_try_plus2()
                            elif shot_where == 3:
                                players[shot_id].shot_try_plus3()
                            shot_goal_done = False

                    rim_num = len(rim_data)
                    
                    if rim_num > 0:
                        last_rim_data = rim_data
                        rim_height = rim_data[0][3] - rim_data[0][1]
                    else:
                        rim_data = last_rim_data
                        
                    if len(rim_data) == 0:
                        continue

                    ball_state = True
                    if len(ball_data) == 0:
                        ball_state = False

                    rim_state = True
                    if len(rim_data) == 0:
                        rim_state = False

                    if ball_state and rim_state and shot_ing:
                        ball_x_state, ball_y_state = shot_try_check(ball_data, rim_data[0])    

                        if not shot_goal_done and shot_try_done:
                            shot_goal_try_count += 1
                            if shot_goal_check_one(ball_data, rim_data, rim_height):
                                shot_goal_try = True

                        if shot_goal_try:
                            if shot_goal_check_two(ball_data, rim_data):
                                shot_goal_done=True
                                players[shot_id].shot_goal_time_plus(idx)
                                shot_goal_try = False
                                shot_try_done = False
                                shot_ing = False
                                shot_goal_try_count = 0
                                last_distance = 0

                                if shot_where == 2:
                                    players[shot_id].shot_goal_plus2()
                                if shot_where == 3:
                                    players[shot_id].shot_goal_plus3()
                                shot_id = -1

                        if shot_goal_try_count == 90:
                            shot_goal_try = False
                            shot_try_done = False
                            shot_goal_done = True
                            shot_goal_try_count = 0
                            shot_ing = False
                            last_distance = 0
                            shot_id = -1



    folder_path = "./pose/exp/"

    object_hist = {}
    
    for object_folder in os.listdir(folder_path):
        object_hist[object_folder] = []
        object_folder_path = os.path.join(folder_path, object_folder)
        
        image_files = [f for f in os.listdir(object_folder_path) if f.endswith(".jpg")]

        image_file = image_files[int(len(image_files)/2)]
        image_path = os.path.join(object_folder_path, image_file)

        image = cv2.imread(image_path)

        hist = cv2.calcHist([image], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256])

        object_hist[object_folder].append(hist)

    object_list = list(object_hist.keys())

    for object1, object2 in itertools.combinations(object_list, 2):
        hist1 = object_hist[object1]
        hist2 = object_hist[object2]
        
        similarity = cv2.compareHist(hist1[0], hist2[0], cv2.HISTCMP_CHISQR_ALT)
        
        if similarity < 180000:
            object1 = int(object1)
            object2 = int(object2)
            players[object1].st2 += players[object2].st2
            players[object1].sg2 += players[object2].sg2
            players[object1].goalTime += players[object2].goalTime
            players[object1].ballTime += players[object2].ballTime
            del players[object2]

    result = {
        "id": ID,
        "playerHistories": []
    }


    for player_id, player_obj in players.items():
        player_history = {
            "diffProfileImg": "string",  # 필요한 경우 프로필 이미지 경로 또는 정보로 대체
            "twoPts": player_obj.sg2,
            "threePts": 0,
            "tryTwoPts": player_obj.st2,
            "tryThreePts": 0,
            "xyUrl": "string",  # 필요한 경우 위치 정보 URL로 대체
            "playTime": player_obj.ballTime,  # 필요한 경우 플레이 시간으로 대체
            "win": True,  # 필요한 경우 승패 정보로 대체
            "goalTime": player_obj.goalTime,
            "highlightUrl": "string"  # 필요한 경우 하이라이트 비디오 경로 또는 정보로 대체
        }

        result["playerHistories"].append(player_history)

    # 최종 결과 반환
    return result
        
def xyxy_to_xywh(*xyxy):
    bbox_left = min([xyxy[0].item(), xyxy[2].item()])
    bbox_top = min([xyxy[1].item(), xyxy[3].item()])
    bbox_w = abs(xyxy[0].item() - xyxy[2].item())
    bbox_h = abs(xyxy[1].item() - xyxy[3].item())
    x_c = (bbox_left + bbox_w / 2)
    y_c = (bbox_top + bbox_h / 2)
    w = bbox_w
    h = bbox_h
    return x_c, y_c, w, h

def xyxy_to_tlwh(bbox_xyxy):
    tlwh_bboxs = []
    for i, box in enumerate(bbox_xyxy):
        x1, y1, x2, y2 = [int(i) for i in box]
        top = x1
        left = y1
        w = int(x2 - x1)
        h = int(y2 - y1)
        tlwh_obj = [top, left, w, h]
        tlwh_bboxs.append(tlwh_obj)
    return tlwh_bboxs


def load_classes(path):
    with open(path, 'r') as f:
        names = f.read().split('\n')
    return list(filter(None, names))

def shot_try_check(ball_data, rim_data):
    ball_xposition = False
    ball_yposition = False
    b = ball_data

    if (b[1]+b[3])/2 <= rim_data[1]:
        ball_yposition = True
    else:
        return False, False

    ball_center = ((b[0] + b[2])/2)
    rim_length = rim_data[2] - rim_data[0]

    left_limit = rim_data[0] - rim_length 
    right_limit = rim_data[2]+ rim_length

    if left_limit <= ball_center <= right_limit:
        ball_xposition = True 

    return ball_xposition, ball_yposition
    
def shot_goal_check_one(ball_data, rim_data, rim_height):
    flag = False
    b = ball_data
    r = rim_data[0] 

    ball_x = (b[0]+b[2])/2
    ball_y = (b[1]+b[3])/2
    ball_width = b[2] - b[0]
    if(ball_y > r[1] and ball_y < r[3]+rim_height):
        if(r[0] < ball_x and ball_x < r[2]):
            rim_width = r[2] - r[0]
            cal = rim_width / ball_width 
            if (cal > 1.7 and cal < 2.45):
                return True
    return flag    

def shot_goal_check_two(ball_data, rim_data):
    flag = False
    b = ball_data
    r = rim_data[0] 
    
    ball_x = (b[0]+b[2])/2
    ball_y = (b[1]+b[3])/2
    if(r[0] < ball_x and ball_x < r[2]):
        if(b[1] > r[3]):
            return True

    return flag

def calculate_distance(person_bbox, ball_bbox):
    person_x, person_y = person_bbox[0] + person_bbox[2] / 2, person_bbox[1] + person_bbox[3] / 2
    ball_x, ball_y = ball_bbox[0] + ball_bbox[2] / 2, ball_bbox[1] + ball_bbox[3] / 2

    distance = abs(person_x - ball_x)
    
    return distance

def close_person_find(people_bboxes, ball_bbox):
    closest_person_idx = None
    closest_distance = float('inf')
    
    for idx, person_bbox in enumerate(people_bboxes):
        distance = calculate_distance(person_bbox, ball_bbox)
        if distance < closest_distance:
            closest_distance = distance
            closest_person_idx = idx
    
    return closest_person_idx, closest_distance



if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--weights', nargs='+', type=str, default='before_basketball.pt', help='model.pt path(s)')
    parser.add_argument('--source', type=str, default='inference/images', help='source')  # file/folder, 0 for webcam
    parser.add_argument('--img-size', type=int, default=640, help='inference size (pixels)')
    parser.add_argument('--conf-thres', type=float, default=0.25, help='object confidence threshold')
    parser.add_argument('--iou-thres', type=float, default=0.45, help='IOU threshold for NMS')
    parser.add_argument('--device', default='', help='cuda device, i.e. 0 or 0,1,2,3 or cpu')
    parser.add_argument('--view-img', action='store_true', help='display results')
    parser.add_argument('--save-txt', action='store_true', help='save results to *.txt')
    parser.add_argument('--save-conf', action='store_true', help='save confidences in --save-txt labels')
    parser.add_argument('--nosave', action='store_true', help='do not save images/videos')
    parser.add_argument('--classes', nargs='+', type=int, help='filter by class: --class 0, or --class 0 2 3')
    parser.add_argument('--agnostic-nms', action='store_true', help='class-agnostic NMS')
    parser.add_argument('--augment', action='store_true', help='augmented inference')
    parser.add_argument('--update', action='store_true', help='update all models')
    parser.add_argument('--project', default='runs/detect', help='save results to project/name')
    parser.add_argument('--name', default='exp', help='save results to project/name')
    parser.add_argument('--names', type=str, default='data/coco.names', help='*.cfg path')
    parser.add_argument('--exist-ok', action='store_true', help='existing project/name ok, do not increment')
    parser.add_argument('--no-trace', action='store_true', help='don`t trace model')
    parser.add_argument('--trailslen', type=int, default=64, help='trails size (new parameter)')
    opt = parser.parse_args()
    

    with torch.no_grad():
        if opt.update: 
            for opt.weights in ['before_basketball.pt']:
                detect()
                strip_optimizer(opt.weights)
        else:
            detect()
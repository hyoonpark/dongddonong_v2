## 기본 이미지 설정
#FROM python:3.8
#
## 작업 디렉토리 설정
#WORKDIR /app
#
## 소스 코드 복사
#COPY . .
#
## 가상 환경 설정 및 의존성 설치
#RUN python -m venv venv
#RUN /bin/bash -c "source venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt"
#
## Flask 애플리케이션 실행
#CMD ["/bin/bash", "-c", "source venv/bin/activate && nohup python app.py &"]
#
## 컨테이너 내부에서 5000 포트 노출
#EXPOSE 5000



# Image Download
FROM python:3.8.5
WORKDIR /app

# Copy files
COPY . .

# Install packages
# RUN pip install --upgrade pip
# RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "./app.py", "0.0.0.0:5000"]

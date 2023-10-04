# Image Download
FROM tiangolo/uwsgi-nginx-flask:python3.8
WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN pip install --upgrade pip && pip install --no-cache-dir --upgrade -r /app/requirements.txt
RUN pip install uwsgi
RUN pip install boto3
RUN pip install torch torchvision opencv-python
#RUN pip install mediapipe
#RUN apt-get update && apt-get -y install libgl1-mesa-glx


# Copy files
COPY . .

# Install packages
# RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

EXPOSE 5000
# CMD ["python3", "app.py", "0.0.0.0:5000"]
CMD ["uwsgi", "--ini", "uwsgi.ini"]

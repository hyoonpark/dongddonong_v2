# Image Download
FROM tiangolo/uwsgi-nginx-flask:python3.8
WORKDIR /app

# Copy files
COPY . .

RUN pip install uwsgi

# Install packages
# RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

EXPOSE 5000
# CMD ["python3", "app.py", "0.0.0.0:5000"]
CMD ["uwsgi", "--ini", "uwsgi.ini"]

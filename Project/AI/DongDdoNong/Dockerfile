# Image Download
FROM tiangolo/uwsgi-nginx-flask:python3.8
WORKDIR /app

# Copy files
COPY . .

# Install packages
# RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

EXPOSE 5000
CMD ["python", "app.py", "0.0.0.0:5000"]
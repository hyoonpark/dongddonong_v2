import boto3


s3 = boto3.resource('s3')


def open_video_from_s3(filename):
    bucket = s3.Bucket(dongddonong)
    object = bucket.Object(filename)
    response = object.get()
    file_stream = response['Body']
    img = Image.open(file_stream)
    return img
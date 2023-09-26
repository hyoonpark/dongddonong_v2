from app import app
from flask_sslify import SSLify

sslify = SSLify(app)

if __name__ == "__main__":
    # ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    ssl_context = ('./crt/certificate.crt', './crt/private.key')
    
    app.run(ssl_context=ssl_context)
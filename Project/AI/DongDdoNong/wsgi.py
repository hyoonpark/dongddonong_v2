from app import app
import ssl

if __name__ == "__main__":
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ssl_context.load_cert_chain(certfile='./crt/certificate.pem', keyfile='./crt/private.pem')
    app.run(port=5000, ssl_context=ssl_context)
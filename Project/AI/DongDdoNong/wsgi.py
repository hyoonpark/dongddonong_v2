from app import app
import ssl

if __name__ == "__main__":
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ssl_context.load_cert_chain('./crt/certificate.crt', './crt/private.key')
    
    app.run()
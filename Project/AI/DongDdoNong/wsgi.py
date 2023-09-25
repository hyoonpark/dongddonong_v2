from app import app
import ssl

if __name__ == "__main__":
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    ssl_context.load_cert_chain('certificate.crt', 'private.key')
    
    app.run(port=443, ssl_context=ssl_context)

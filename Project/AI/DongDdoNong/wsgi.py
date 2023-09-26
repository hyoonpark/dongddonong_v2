from app import app
# import ssl

if __name__ == "__main__":
    # ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    # ssl_context.load_cert_chain('./crt/certificate.pem', './crt/private.pem')
    
    app.run(ssl_context='adhoc')
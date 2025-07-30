import hashlib
import os
from dotenv import load_dotenv
import base64
from dotenv import load_dotenv
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Hash import MD5

load_dotenv()
SECRET_KEY = base64.b64decode(os.getenv("AES_KEY"))
print(f"SECRET_KEY: {SECRET_KEY}")

# Hash
def hash_text(input_string: str) -> str:
    sha256_hash = hashlib.sha256()
    sha256_hash.update(input_string.encode('utf-8'))
    return sha256_hash.hexdigest()

# AES Encryption
def encrypt(plain_text: str) -> str:
    cipher = AES.new(SECRET_KEY, AES.MODE_ECB)
    padded = pad(plain_text.encode('utf-8'), AES.block_size)
    encrypted = cipher.encrypt(padded)
    return base64.b64encode(encrypted).decode('utf-8')

def decrypt(cipher_text_b64: str) -> str:
    encrypted = base64.b64decode(cipher_text_b64)
    cipher = AES.new(SECRET_KEY, AES.MODE_ECB)
    decrypted = cipher.decrypt(encrypted)
    return unpad(decrypted, AES.block_size).decode('utf-8')


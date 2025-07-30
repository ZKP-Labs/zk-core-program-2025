from typing import Dict
from app.models.captcha import Captcha
from app.models.user import User

# User
user_store: Dict[str, User] = {} 

# Captcha
captcha_store: Dict[str, Captcha] = {}

def reset_memory():
    global user_store, captcha_store
    user_store = {}
    captcha_store = {}
    
    print("Memory has been reset.")
    print(f"Current user store: {user_store}")
    print(f"Current captcha store: {captcha_store}")


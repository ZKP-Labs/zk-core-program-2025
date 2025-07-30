from app.routers.router import route
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.store import memory
from app.utils import encrypt
from app.models.user import User
from uuid import uuid4

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows method như GET, POST, OPTIONS, ...
    allow_headers=["*"],  
)

# Static files for captcha functionality
app.mount("/static", StaticFiles(directory="captcha_js"), name="static")

app.include_router(route)

user = User(
    id='f2d433da-fd03-4825-bf83-66787d8f095c',
    username='Santo',
    email='loithanhle2202@gmail.com',
    password_hash='96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e'
)

memory.user_store[user.id] = user

print('Memory: \n', memory.user_store)
print('Memory: \n', memory.captcha_store)

# memory.reset_memory()

# text = "hello world"
# enText = encrypt.encrypt(text)
# print(f"Original text: {text}")
# print(f"Encrypted text: {enText}")
# print(f"Decrypted text: {encrypt.decrypt(enText)}")

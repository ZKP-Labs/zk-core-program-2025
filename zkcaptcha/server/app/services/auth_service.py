from app.utils import encrypt
from app.store import memory
from app.utils import encrypt
from app.models.user import User
from uuid import uuid4
from app.utils import jwt
from fastapi import HTTPException

def signup(data: dict):
    username = encrypt.decrypt(data.get("username"))
    email = encrypt.decrypt(data.get("email"))
    password = encrypt.decrypt(data.get("password"))

    print(f"data:\n username: {data.get('username')}\n email: {data.get('email')}\n password: {data.get('password')}")
    print(f"decrypt:\n username: {username}\n email: {email}\n password: {password}")

    if any(email == user.email for user in memory.user_store.values()):
        print(f"Email {email} already exists")
        raise HTTPException(status_code=400, detail="Email already exists")

    newUser = User(
        id=str(uuid4()),
        username=username,
        email=email,
        password_hash=encrypt.hash_text(password)
    )

    memory.user_store[newUser.id] = newUser

    print("---------------------------------------------")
    print("Registered new user:")
    print(f"User {newUser.username} created with ID: {newUser.id}`")
    print(f"User stores: {memory.user_store}")
    print("---------------------------------------------")

    return {
        "message": "User created successfully",
        "user": newUser.to_response_model()
    }, 201

def signin(data: dict):
    email = encrypt.decrypt(data.get("email"))
    password = encrypt.decrypt(data.get("password"))
    
    print(f"data:\n email: {data.get('email')}\n password: {data.get('password')}")
    print(f"decrypt:\n email: {email}\n password: {password}")

    if not any(email == user.email for user in memory.user_store.values()):
        print(f"Email {email} not signup")
        raise HTTPException(status_code=400, detail="Email not signup")

    user = get_user_by_email(email)
    if (encrypt.hash_text(password) != user.password_hash):
        print("Password is incorrect")
        raise HTTPException(status_code=400, detail="Password is incorrect")

    token_payload = {
        "user_id": user.id,
        "email": user.email,
        "username": user.username
    }
    token = jwt.create_jwt(token_payload)

    return {
        "message": "Sign in successful",
        "user": user.to_response_model(),
        "token": token
    }, 200

def get_user_by_email(email: str):
    for user in memory.user_store.values():
        if user.email == email:
            return user
    
    return None

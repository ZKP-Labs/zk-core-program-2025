import jwt
import datetime
import os
from dotenv import load_dotenv
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

ALGORITHM = "HS256"
security = HTTPBearer()

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET", "default-secret")

def create_jwt(data: dict, expires_in_minutes=60):
    payload = data.copy()
    expires_in_days = 1
    payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(days=expires_in_days)        
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

def decode_jwt(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Token is not valid!")

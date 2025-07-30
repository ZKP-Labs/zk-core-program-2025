from fastapi import APIRouter, Request, Depends
from app.services import challenge_service, auth_service
from app.utils import jwt, poseidon_hash_from_node
from fastapi.responses import JSONResponse

route = APIRouter()

@route.get("/")
def read_root():
    return { "message": "Hello" }

# Define the endpoints for authentication
@route.post("/signup")
async def signup(request: Request):
    data = await request.json()
    return auth_service.signup(data)

@route.post("/signin")
async def signin(request: Request):
    data = await request.json()
    return auth_service.signin(data)

# Define the endpoint for challenge creation
@route.get("/challenge")
def get_challenge(payload=Depends(jwt.verify_token)):
    return challenge_service.create_challenge()

@route.post("/verify")
async def verify_challenge(request: Request, payload=Depends(jwt.verify_token)):
    print("✅ Route /verify is call")
    data = await request.json()
    return challenge_service.verify_challenge(data)

@route.post("/poseidon")
async def get_poseidon_hash(request: Request):
    data = await request.json()
    input = data.get("answer")
    
    print('INPUT: ', input)
    
    result = poseidon_hash_from_node.poseidon_hash(input)
    return JSONResponse(content={"hash": result})


from app.utils.generate import generate_captcha_image;
from uuid import uuid4
from app.models.captcha import Captcha
from app.store import memory
from app.utils import poseidon_hash_from_node
from fastapi import HTTPException
import json
import subprocess
import tempfile
import os

def str_to_felts(s):
    return [ord(c) for c in s]

def create_challenge():
    # Generate a new captcha image
    captcha_image = generate_captcha_image()
    text, image_data = captcha_image
    
    felts = str_to_felts(text)
    hash_result = poseidon_hash_from_node.poseidon_hash(felts)
    public_hash = str(hash_result)
    
    print("Captcha text:", text)
    print("Felts:", felts)
    print("Poseidon hash (public_hash):", public_hash)

    captcha = Captcha(
        id = str(uuid4()),
        challenge_data = image_data,
        public_hash = public_hash
    )

    # Save the captcha to store
    memory.captcha_store[captcha.id] = captcha

    return captcha.to_response_model()

def verify_challenge(data: dict):
    print("== Start verification ==")
    print("Raw input:", data)
    
    captcha_id = data.get("captcha_id")
    user_id = data.get("user_id")
    proof = data.get("proof")
    public_signals = data.get("public_signals", [])
    print("Parsed public_signals:", public_signals)
    
    user = next((u for u in memory.user_store.values() if u.id == user_id), None)
    if user is None:
        print('User does not exist')
        raise HTTPException(status_code=400, detail="User does not exist")

    captcha = next((c for c in memory.captcha_store.values() if c.id == captcha_id), None)
    if captcha is None:
        print('Captcha does not exist')
        raise HTTPException(status_code=400, detail="Captcha does not exist")
    
    if str(public_signals[-1]) != str(captcha.public_hash):
        print(f'public_signals {public_signals}')
        print(f'public_hash {captcha.public_hash}')
        captcha.attempts += 1
        print('Verify fail, number of attempts remaining: ', captcha.max_attempts - captcha.attempts)
        
        if (captcha.attempts == 3):
            print('No attempts left, please get a new captcha.')
            memory.captcha_store.pop(captcha.id, None)
            
            raise HTTPException(
                status_code=403,
                detail="No attempts left, please get a new captcha."
            )
            
        
        raise HTTPException(
            status_code=400,
            detail="Public signal does not match original CAPTCHA"
        )
        
    # Create temp file for proof và public_signals
    with tempfile.TemporaryDirectory() as tmpdir:
        proof_path = os.path.join(tmpdir, "proof.json")
        public_path = os.path.join(tmpdir, "public.json")

        with open(proof_path, "w") as f:
            json.dump(proof, f)
        print("Wrote proof.json")
            
        with open(public_path, "w") as f:
            json.dump(public_signals, f)
        print("Wrote public.json")

        # Call snarkjs verify
        vk_path = "captcha_verification_key.json"
        if not os.path.exists(vk_path):
            print("verification_key.json not found")
            raise HTTPException(status_code=400, detail="Verification key missing")

        print("Starting snarkjs verification...")

        try:
            SNARKJS_PATH = "C:/Users/loith/AppData/Roaming/npm/snarkjs.cmd"
            result = subprocess.run(
                [SNARKJS_PATH, "groth16", "verify", vk_path, public_path, proof_path],
                capture_output=True,
                text=True
            )
            
            print("STDOUT:\n", result.stdout)
            print("STDERR:\n", result.stderr)

            # Check result
            if result.returncode == 0 and "OK" in result.stdout:
                print('Proof is valid. Solve captcha correctly')
                memory.captcha_store.pop(captcha.id, None)
                
                return {"success": True, "message": "Proof is valid"}, 200
            else:
                return {"success": False, "message": "Invalid proof", "detail": result.stdout + result.stderr}

        except Exception as e:
            print("Exception occurred:", e)
            raise HTTPException(status_code=400, detail=f"Verification error: {str(e)}")

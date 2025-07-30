from dataclasses import dataclass, field
from datetime import datetime, timezone, timedelta

@dataclass
class CaptchaResponse:
    captcha_id: str
    captcha_image: str
    attempts: int
    max_attempts: int
    expires_at: str
    wasm_url: str
    zkey_url: str

@dataclass
class Captcha:
    id: str
    challenge_data: str
    public_hash: str
    attempts: int = 0
    max_attempts: int = 3
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    expires_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc) + timedelta(minutes=5))
    
    def to_response_model(seft) -> CaptchaResponse:
        return CaptchaResponse(
            captcha_id = seft.id,
            captcha_image = seft.challenge_data,
            attempts = seft.attempts,
            max_attempts = seft.max_attempts,
            expires_at = seft.expires_at.isoformat(),
            wasm_url = "http://localhost:8000/static/captcha.wasm",
            zkey_url = "http://localhost:8000/static/captcha.zkey"
        )
    
    
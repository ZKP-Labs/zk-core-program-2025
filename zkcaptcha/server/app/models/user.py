from dataclasses import dataclass, field
from datetime import datetime, timezone, timedelta

@dataclass
class User:
    id: str
    username: str
    email: str
    password_hash: str
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    
    def to_response_model(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at.isoformat()
        }
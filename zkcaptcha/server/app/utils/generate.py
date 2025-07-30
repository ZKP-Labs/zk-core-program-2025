import random
import string
import random
import os
import base64
from io import BytesIO
from captcha.image import ImageCaptcha

def generate_strong_captcha_code(length: int = 6) -> str:
    if length < 3:
        raise ValueError("Chiều dài CAPTCHA phải >= 3 để có đủ chữ, số, ký tự đặc biệt.")

    letters = random.choices(string.ascii_letters, k=1)
    digits = random.choices(string.digits, k=1)
    specials = random.choices("!@#$%^&*()_+-=", k=1)

    remaining = random.choices(
        string.ascii_letters + string.digits + "!@#$%^&*()_+-=", k=length - 3
    )

    full_code = letters + digits + specials + remaining
    random.shuffle(full_code)
    return ''.join(full_code)

def get_all_fonts(fonts_dir: str) -> list[str]:
    return [
        os.path.join(fonts_dir, f)
        for f in os.listdir(fonts_dir)
        if f.endswith(".ttf")
    ]

def generate_captcha_image(output_dir: str = "captchas") -> str:
    os.makedirs(output_dir, exist_ok=True)
    
    fonts_dir = os.path.join(os.path.dirname(__file__), "fonts")
    available_fonts = get_all_fonts(fonts_dir)
    
    selected_fonts = random.sample(available_fonts, k=min(3, len(available_fonts)))
    
    captcha = ImageCaptcha(
        width=random.randint(300, 500),
        height=random.randint(150, 250),
        fonts=selected_fonts,
        font_sizes=random.sample([40, 60, 70, 90, 100], k=random.randint(1, 3))
    )
    
    text = generate_strong_captcha_code()
    
    # Create the captcha image and save it to a buffer
    buffer = BytesIO()
    captcha.write(text, buffer)
    buffer.seek(0)

    # Encoding image to base64
    img_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    return text, f"data:image/png;base64,{img_base64}"
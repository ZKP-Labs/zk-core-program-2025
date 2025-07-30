# zkcaptcha

>zkcaptcha is a CAPTCHA system that uses Zero-Knowledge Proofs to verify users without revealing sensitive information. The project consists of two parts: client (frontend) and server (backend).

## Table of Contents
- [Introduction](#introduction)
- [Members](#members)
- [Slide And Video](#slide-and-video)
- [Project Structure](#project-structure)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Contact](#contact)

## Introduction
zkcaptcha uses Zero-Knowledge Proof technology to generate and verify CAPTCHAs, enhancing user security and privacy.

## Members
1. **Le Thanh Loi** *(Leader)*
2. **Le Pham Thao Nguyen**
3. **Nguyen Van An**
4. **Nguyen Dinh Khanh**
5. **Bui Huynh Phuoc Tai**
6. **Nguyen Thi Hoang Anh**
7. **Le Tran Tuan Khanh**
8. **Tran Nhat Minh**

## Slide And Video
[Link to the document](https://docs.google.com/document/d/1s4YPkDboCtVlfuBE1mXsIoCqJTd05gksDcGsPcBKezE/edit?usp=sharing)

## Project Structure


```
zkcaptcha/
├── client/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── assets/
│       │   └── react.svg
│       ├── app/
│       │   ├── api/
│       │   │   ├── auth.api.js
│       │   │   └── captcha.api.js
│       │   ├── config/
│       │   │   └── apiURL.config.js
│       │   ├── hooks/
│       │   │   └── captcha.hook.js
│       │   └── service/
│       │       ├── encrypt.service.js
│       │       └── validation.service.js
│       ├── pages/
│       │   ├── Auth.jsx
│       │   └── Home.jsx
│       ├── PrivateRoute.jsx
│       └── stylesheets/
│           ├── abstracts/
│           │   ├── _functions.scss
│           │   ├── _index.scss
│           │   ├── _mixins.scss
│           │   └── _variables.scss
│           ├── base/
│           │   ├── _base.scss
│           │   └── _index.scss
│           ├── components/
│           │   ├── _button.scss
│           │   └── _index.scss
│           ├── layouts/
│           │   └── _index.scss
│           ├── pages/
│           │   ├── _auth.scss
│           │   ├── _home.scss
│           │   └── _index.scss
│           ├── vendor/
│           │   ├── _font.scss
│           │   └── _index.scss
│           └── main.scss

├── server/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── circuits/
│   │   │   ├── captcha.circom
│   │   │   ├── test_public.circom
│   │   │   └── circomlib/
│   │   │       ├── index.js
│   │   │       ├── package.json
│   │   │       └── ... (circuits, doc, test, etc.)
│   │   ├── models/
│   │   │   ├── captcha.py
│   │   │   └── user.py
│   │   ├── routers/
│   │   │   └── router.py
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   └── challenge_service.py
│   │   ├── store/
│   │   │   └── memory.py
│   │   └── utils/
│   │       ├── encrypt.py
│   │       ├── fonts/
│   │       │   ├── Bonechiller Free.otf
│   │       │   ├── Bradleys Pen.ttf
│   │       │   └── ... (other fonts)
│   │       ├── generate.py
│   │       ├── jwt.py
│   │       ├── poseidon_hash.js
│   │       ├── poseidon_hash_from_node.py
│   │       └── zk_artifacts.py
│   ├── main.py
│   ├── run.py
│   ├── captcha_final.zkey
│   ├── captcha.r1cs
│   ├── captcha.sym
│   ├── powersOfTau28_hez_final_10.ptau
│   ├── verification_key.json
│   └── ...
├── README.md
└── ...
```

## System Requirements
- Node.js >= 16.x
- Python >= 3.10 (recommend 3.10)
- pip
- (Optional) Circom, snarkjs if you want to rebuild the circuit

## Installation

### 1. Install client
```bash
cd client
npm install
```

### 2. Install server
```bash
cd server
pip install -r requirements.txt  # If requirements.txt exists
# Or install required packages (e.g. FastAPI, uvicorn...)
pip install fastapi uvicorn
git clone https://github.com/iden3/circom.git

cd app/circuits
git clone https://github.com/iden3/circomlib.git
```

## Running the Project

### 1. Run server
```bash
cd server
py run.py
```

### 2. Run client
```bash
cd client
npm run dev
```

The client will run at http://localhost:5173 (or the port specified by Vite).
The server will run at http://localhost:8000.

## Contact
- Author: [Santo]
- Email: [loithanhle2202@gmail.com]

---
*Thanks!*

# zkcaptcha

zkCaptcha is a demo that applies Zero-Knowledge Proofs to CAPTCHA to verify users without revealing any data, helping to prevent bots and protect user privacy.

## Team Information
**Group:** 2

**Members**

- Name: Le Thanh Loi
  - Discord Username: loithanhle2202
  - Github Username: Santo-Ryu
  - Role: Team Leader, Fullstack Developer

- Name: Le Pham Thao Nguyen
  - Discord Username: NguynLee
  - Github Username: thaonguyen05
  - Role: QA Tester, Technical Writer

- Name: Bui Huynh Phuoc Tai
  - Discord Username: huynhtai3862
  - Github Username: suyhuynh2
  - Role: Backend Developer

- Name: Nguyen Van An
  - Discord Username: nguyenvanan20092005
  - Github Username: vanan2009
  - Role: Frontend Developer

- Name: Nguyen Dinh Khanh
  - Discord Username: khanh15102005
  - Github Username: NguyenDinhKhanh23NS046
  - Role: Frontend Developer

- Name: Nguyen Thi Hoang Anh
  - Discord Username: hoanganh003392
  - Github Username: NguyenHoangAnh09
  - Role: QA Tester, Documentation Specialist

- Name: Tran Nhat Minh
  - Discord Username: nhatminh032
  - Github Username: minhnh123
  - Role: ZKP Circuit Designer

## Technical Report

### 1. Real-World Problem

Today, online web systems are facing a wide range of automated threats from bots, leading to serious consequences:

- Mass account creation
- Denial-of-Service (DoS) attacks
- User data theft by automatically solving CAPTCHA challenges

### 2. Limitations of Traditional CAPTCHA Systems

- Annoying user experience (image selection, sliders, etc.)
- Privacy violations (e.g., Google reCAPTCHA collects user behavior data)
- Vulnerable to modern Machine Learning models
- Requires sending the CAPTCHA solution to the server, risking data leakage

### 3. Proposed Solution – zkCaptcha

**zkCaptcha** is a CAPTCHA system that applies **Zero-Knowledge Proofs (ZKP)** to verify users as humans without revealing personal data or the actual solution.

#### How it works:

1. The client downloads the CAPTCHA and solves it locally.
2. A ZKP is generated to prove that the solution is correct (without revealing it).
3. The proof is sent to the server.
4. The server verifies the proof without ever seeing the solution.

#### Advantages:

- No personal data collection  
- No user annoyance or complex challenges  
- No solution transmitted over the network  
- Effective bot prevention

### 4. System Architecture

#### 4.1 CAPTCHA Circuit (Circom)

- Implemented using Circom 2.2.2
- Uses Poseidon Hash to hash the CAPTCHA input
- Compares the user's input with a public hash to generate a proof

#### 4.2 Backend Verification (NodeJS/Python)

- Utilizes snarkjs to verify the proof
- Prevents replay attacks by assigning a unique ID to each CAPTCHA (each CAPTCHA is valid only once; the server stores used IDs to reject reused proofs)
- Communicates with the client via API

#### 4.3 Client (ReactJS + WASM)

- Displays the CAPTCHA to the user
- Compiles the Circom circuit to WebAssembly (WASM) to generate the proof on the client side
- Sends the proof to the server via API

### 5. Additional Security Measures

- **Replay protection**: Each CAPTCHA is assigned a unique `captchaId`. A proof is valid only once; after use, it becomes invalid.
- **Rate limiting**: Limits the number of proof generations to prevent bots from brute-forcing CAPTCHA solutions.
- **Zero-knowledge**: Proofs are generated and verified without revealing the actual solution.

### 6. Technologies Used

| Component  | Technology             |
|------------|------------------------|
| Circuit    | Circom 2.2.2, Poseidon |
| Proof      | circomlibjs, snarkjs   |
| Backend    | Python                 |
| Frontend   | ReactJS, WebAssembly   |

### 7. Project Structure

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

### 8. System Requirements
- Node.js >= 16.x
- Python >= 3.10 (recommend 3.10)
- pip
- (Optional) Circom, snarkjs if you want to rebuild the circuit

### 9. Installation

#### 1. Install client
```bash
cd client
npm install
```

#### 2. Install server
```bash
cd server
pip install -r requirements.txt  # If requirements.txt exists
# Or install required packages (e.g. FastAPI, uvicorn...)
pip install fastapi uvicorn
git clone https://github.com/iden3/circom.git

cd app/circuits
git clone https://github.com/iden3/circomlib.git
```

### 10. Running the Project

#### 1. Run server
```bash
cd server
py run.py
```

#### 2. Run client
```bash
cd client
npm run dev
```

The client will run at http://localhost:5173 (or the port specified by Vite).
The server will run at http://localhost:8000.

### 11. Conclusion

zkCaptcha is a next-generation CAPTCHA solution that:

- Does not compromise user privacy  
- Does not annoy users with tedious challenges  
- Does not expose sensitive information  
- Is not easily bypassed by AI or machine learning

The project aims to bring practical applications of Zero-Knowledge Proof technology into web security, opening up significant potential for building modern, secure, and user-friendly verification systems.


## Project Outcomes and Reflections

### **Project Impact and Benefits**

zkCaptcha provides a practical and forward-looking solution for strengthening web security without compromising user experience or privacy. By applying Zero-Knowledge Proof (ZKP) technology, the system allows users to prove that they have correctly solved a CAPTCHA — without revealing the solution or any personal information.

**Key benefits include:**

- **Improved user experience**: no more selecting images, dragging sliders, or solving annoying puzzles.
- **Enhanced privacy protection**: no behavior tracking, no user data collection.
- **Resilient against automated AI attacks**: bots cannot reuse proofs or solve CAPTCHAs in conventional ways.
- **Easy integration**: the system can be deployed on existing web platforms with minimal changes required from the user side.

This project clearly demonstrates that ZKP is not limited to the blockchain domain but can be effectively applied to traditional web services as well.
---

### **Notable Insights and Experiences**
During the development of zkCaptcha, we discovered many interesting and sometimes surprising insights:

- Generating ZKPs can be performed efficiently **on the client side**, thanks to WebAssembly (WASM).
- Designing circuits in **Circom** is similar to low-level logic programming and requires a different mindset compared to conventional programming.
- **Replay attacks** are a common vulnerability in ZKP systems — without assigning a unique ID to each CAPTCHA, proofs can be reused maliciously.
- Using **Poseidon Hash** instead of SHA256 made the system more efficient and better suited for SNARK-based verification.

We learned that ZKPs are not just theoretical — with proper and optimized design, they can be integrated into real-time systems effectively.
---

### **Challenges Faced**

We encountered several technical and architectural challenges during development:

- **Circuit complexity**: Writing custom logic in Circom and debugging signal flows was initially difficult. We addressed this by breaking down the logic into small, testable modules before integrating them.
- **Client-side integration**: Handling asynchronous proof generation in React required careful state and error management to avoid disrupting the user experience.
- **Verification optimization**: On the backend, ensuring fast and secure proof verification—especially with replay protection—required efficient memory usage and proper management of used CAPTCHA IDs.

How we overcame these challenges:

- We modularized the project into clearly defined, testable components.
- We iterated through repeated testing and performance monitoring.
- We learned from official documentation and the ZKP community to apply best practices.

Through this experience, we gained a clearer understanding of how to build an effective ZKP system that balances security, privacy, and user experience.
---

### **Thoughts on Zero-Knowledge Proofs and Their Applications**

Zero-Knowledge Proof (ZKP) is one of the most exciting advancements in modern cryptography. What makes ZKP so compelling is its ability to **prove the validity of a statement without revealing the underlying information**, offering a whole new approach to trust and security.

**What makes it compelling:**

- Its **mathematical elegance** — the ability to prove something without needing to explain it in detail.
- The potential to build **privacy-preserving applications** in a digital world increasingly driven by data collection.

**What makes it challenging:**

- A **steep learning curve** when getting started with writing circuits and optimizing performance.
- **System performance** must be carefully designed when deploying at scale.

**Potential real-world applications:**

- **Identity verification**: Proving age or nationality without disclosing specific data.
- **Secure voting**: Achieving transparency and verifiability while keeping voter identity secret.
- **Asset or access proof**: Proving ownership or access rights without revealing wallet addresses or sensitive credentials.
- **Human verification**: As demonstrated in zkCaptcha — proving you're human without explaining why or how.

We believe that ZKP will be the foundation for a new generation of secure and privacy-respecting systems — and zkCaptcha is only the first step into that future.
---

## References

```
https://github.com/GraphitiLabs/zkaptcha
https://github.com/signorecello/zcaptcha
https://docs.circom.io/
```

## Presentaion Slide
[Slide](https://www.canva.com/design/DAGumlfJalY/G_TPTmCcR-D57Uxai4ORhQ/edit?utm_content=DAGumlfJalY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Video Demo 
[Video Demo](https://drive.google.com/file/d/1qSZjV3xcb_xK2ZaiAUgbpGeNr3sK2Mpj/view?usp=sharing)


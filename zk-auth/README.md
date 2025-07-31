# zk-auth

## ZK-Auth: Privacy-Preserving Authentication Using Zero-Knowledge Proofs

ZK-Auth is a zero-knowledge-based authentication system designed to enhance user privacy and data security in web applications. Instead of revealing actual passwords or sensitive user data during login or registration, our project uses Zero-Knowledge Proofs (ZKPs) to prove identity without exposing any private information. This approach significantly reduces risks such as data breaches, password leaks, and phishing attacks.

This project contributes to the ecosystem by promoting user-centric privacy in authentication workflows, especially relevant in the context of blockchain, decentralized identities (DID), and modern Web3 applications.

## Team Information
  **Group:** [8]

  **Members**

    - Name: Lê Bá Hiếu
      - Discord Username: lbhieu89
      - Github Username: LBHieu
      - Role: Leader

    - Name: Trần Trương Nhật Huy
      - Discord Username: nhath026
      - Github Username: nhath026
      - Role: Member

## Technical Report

  **Problem Statement**
    In traditional login/registration systems, users must share sensitive credentials (e.g., passwords) that are stored — often in hashed form — on a server. However, centralized storage is a major attack surface, leading to breaches, phishing, and password reuse issues.

   **Limitations of existing solutions:**
    - Centralized trust assumptions
    - Password leakage risks
    - Users must reveal identity to authenticate
    - Phishing attacks still work if credentials are reused

  **Our Approach**
   We designed ZK-Auth, a system that uses Zero-Knowledge Proofs to allow users to:
   - Register by committing to a secret (e.g., password hash or secret phrase)
   - Log in by proving knowledge of the secret without revealing it

   **Key idea:** 
    Use zk-SNARKs or Circom-based circuits to validate that the user knows the correct secret hash corresponding to a stored commitment on-chain or off-chain.

  **Technical Components**
   - **Frontend:** ReactJS      
     - Registration and login UI
     - Integration with ZKP prover via WebAssembly

   - **Backend:** Node.js + Express
     - Stores user commitments (hashes of secrets)
     - Verifies zk-SNARK proofs using snarkjs or similar verifier

    - **ZKP Tools:**
     - *Circom* for writing zk circuits
     - *snarkjs* for setup, proof generation, and verification
     - *Poseidon* hash inside circuit for efficient hashing

    **Workflow:**
     1. Registration:
       User enters a password → hashed inside a circuit → commitment stored on backend

     2. Login:
       User proves they know a secret that hashes to the stored commitment using zk-SNARK → proof is verified without revealing the actual secret

## Project Outcomes and Reflections
 **Project Impact and Benefits**
   - User privacy: No password ever leaves the user’s device
   - Resilience to breaches: Even if the server is hacked, no raw passwords are stored
   - Modular: Can be integrated into traditional systems or decentralized apps

 **Notable Insights and Experiences**
   - Writing Circom circuits was both powerful and challenging — managing signal constraints, Poseidon hashing, and circuit sizes required careful testing.
   - Witness generation in the browser is feasible with WebAssembly and helps create a better user experience.

 **Challenges Faced**
   - **Circuit complexity and debugging:** Especially in handling variable-length inputs and padding
   - **Proof generation time:** Took optimization steps with trusted setup and reduced constraints
   - **Integration:** Connecting proof generation to web frontend was non-trivial, especially across platforms

 **Workflow:** 
   circuit → witness → proof → verification, and debugging each step with mock inputs.

 **Thoughts on ZKPs and Applications**
   ZKPs are a game-changer for privacy and decentralized identity. Although currently niche and requiring specialized tooling, their application in secure login, anonymous voting, asset ownership verification, and private messaging is extremely promising. We find ZKPs both intellectually exciting and practically useful for the next wave of privacy-first applications.

## References

- [Iden3 Documentation](https://iden3-docs.readthedocs.io/en/latest/)
- [Circom Guide](https://docs.circom.io/)
- [Poseidon Hash](https://github.com/iden3/poseidon)
- [Plonk](https://zkplabs.network/blog/Introduce-PLONK-Revolutionizing-ZK-SNARK-Technology-for-Efficiency-and-Privacy)

## Presentaion Slide
[ZKA_Group8](https://www.canva.com/design/DAGum_sHdH4/bLmtpLjg4mW0gjYubAHUiQ/edit?utm_content=DAGum_sHdH4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Video Demo 

[ZKA_Group8_video](https://drive.google.com/drive/folders/1P_D-b-FUp3VEbzKnxhCrb0UpFcryNmxH?usp=sharing)
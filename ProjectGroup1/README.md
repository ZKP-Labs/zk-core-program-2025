# Simple Exchange Simulation with ZKP for Proof of Reserves

This project demonstrates a simple cryptocurrency exchange that leverages Zero-Knowledge Proofs (ZKPs) to solve the Proof of Reserves (PoR) problem. The goal is to enable exchanges to prove solvency — that their total on-chain reserves are greater than or equal to the total user balances — **without revealing individual balances or the exact reserve amount**.

By using ZKPs, we enhance **transparency, trust, and privacy** in digital asset platforms. The project is educational, but the principles can be extended to real-world applications in centralized or decentralized exchanges.

---

## Team Information

**Group**: Group 1

### Members

- **Name**: Nguyễn Khánh Huyền
  **Discord Username**: update later
  **GitHub Username**: update later
  **Role**: Learn practical applications, write a presentation script, participate in circuit design (sum)

- **Name**: Ngô Mậu Hoàng Đức
  **Discord Username**: update later
  **GitHub Username**: NgoMauHoangDuc
  **Role**: Participate in circuit design (all non negative), main circuit synthesis, Deeper theory study, building ZK snark verify tool

- **Name**: Mai Tiến Dũng
  **Discord Username**: dung01118
  **GitHub Username**: Mtdung290504
  **Role**: *Leader* - Participate in circuit design (merkle tree), participate in system design, write library to run zk-SNARK flow, render input, circuit to match dynamic data

- **Name**: Nguyễn Đức Thạnh
  **Discord Username**: update later
  **GitHub Username**: update later
  **Role**: Learn practical applications, Design and build Frontend, Building a simulated blockchain

- **Name**: Nguyễn Văn Hiếu
  **Discord Username**: mhieu100
  **GitHub Username**: mhieu100
  **Role**: Backend API Development, Blockchain Integration, Real-time Transaction Processing, Cryptocurrency Exchange System Implementation

- **Name**: Lê Hoàng Việt
  **Discord Username**: update later
  **GitHub Username**: update later
  **Role**: Build a library to manipulate merkle trees, build a merkle proof verifier

- **Name**: Nguyễn Trung Hiếu
  **Discord Username**: _chicharito.
  **GitHub Username**: UsagiiTsukino
  **Role**: Backend API Development, Blockchain Integration, Real-time Transaction Processing, Cryptocurrency Exchange System Implementation

- **Name**: Nguyễn Văn Tiến Dũng
  **Discord Username**: update later
  **GitHub Username**: update later
  **Role**: Learn practical applications

- **Name**: Ngô Trường Minh Hoàng 
  **Discord Username**: update later
  **GitHub Username**: update later
  **Role**: Learn practical applications, write a presentation script

- **Name**: Lưu Như Thắng
  **Discord Username**: luoidattenquadi
  **GitHub Username**:Thangga7
  **Role**: Learn practical applications, Participate in system design, design and build Frontend, Building a simulated blockchain

---

## Technical Report

### Problem Statement

In centralized exchanges, users have to **trust that the exchange holds sufficient assets** to cover all liabilities. Traditional Proof of Reserves solutions often require revealing sensitive information such as total user balances or individual holdings.

This project addresses the **lack of privacy in proving solvency**, offering a way to prove that user balances are included in a Merkle tree and the exchange’s reserves are sufficient, **without leaking actual values**.

### Motivation

- Enhance user trust through verifiable and private solvency proofs  
- Protect sensitive user and exchange data  
- Provide a base architecture for future ZK-based financial compliance systems

### Limitations of Existing Solutions

- Existing PoR solutions (e.g. Merkle proof publication) may reveal user balances
- Lack of cryptographic integrity — hard to verify if data is consistent and not manipulated
- No generalized framework to extend for advanced compliance or privacy features

### Our Approach

We simulate an exchange system where:

1. User data is stored in a database and hashed into a Merkle tree.
2. A Circom circuit validates that a specific user is included in the tree and that the sum of all user balances is less than or equal to the exchange reserve.
3. The ZKP (using Groth16 via SnarkJS) is generated and verified independently.

### Technical Components

- **Circom**: Circuit programming for ZK constraints
- **SnarkJS**: Setup, proof generation, and verification (Groth16 scheme)
- **Node.js**: Server-side backend and test drivers
- **Merkle Tree**: Constructed manually from JSON-based user data
- **BN128 curve**: Cryptographic foundation for pairing-based ZKP

---

## Project Outcomes and Reflections

### Project Impact and Benefits

- Demonstrates how ZKPs can be applied to **increase trust without compromising privacy**.
- Serves as a reference implementation for privacy-preserving compliance in fintech.

### Notable Insights and Experiences

- Circom enables expressive arithmetic logic but requires strict attention to constraint limits.
- Trusted Setup must be carefully managed to avoid vulnerabilities or excessive file sizes.

### Challenges Faced

- Initial learning curve with Circom and R1CS model
- Managing large proving keys and trusted setup files on weaker machines
- Ensuring consistency between off-chain Merkle tree construction and circuit logic

### Thoughts on Zero-Knowledge Proofs and Their Applications

- ZKPs are incredibly promising for **privacy-preserving verification** in Web3, finance, and digital identity.
- Practical integration requires optimization (e.g., non-blocking proof generation, secure trusted setups).
- We see strong potential in building transparent systems without exposing sensitive data.

---

## References

- [Circom Documentation](https://docs.circom.io)
- [SnarkJS GitHub](https://github.com/iden3/snarkjs)

---

## Presentation Slide

https://www.canva.com/design/DAGuXU6yinA/zIHfk8X9ZV-q4VYgWWdjqw/edit

---

## Video Demo

https://drive.google.com/file/d/1inwDmGJup5QsW4lY-ILnDeccMqrXzPo8/view?usp=sharing
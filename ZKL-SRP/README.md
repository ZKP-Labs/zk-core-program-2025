# SECURE REMOTE PASSWORD

## Team Information
**Group:** [9]

**Members**

- Name: Lê Tuấn Anh
- Name: Nguyễn Hoàng Việt

  

## Technical Report
Problem & Motivation
Traditional password-based authentication is vulnerable to database breaches, MITM attacks, and phishing. Existing solutions (like OAuth or 2FA) introduce complexity or trust dependencies.

Proposed Solution: SRP Authentication
Our system implements SRP-6a, a zero-knowledge proof protocol that:
  -Never stores passwords (only a cryptographic verifier).
  -Prevents offline attacks (even with database leaks).
  -utually authenticates client/server via session keys.

Technical Components
  -Backend: Python + Flask (secure session management).
  -Cryptography: SRP-6a with 2048-bit primes and SHA-256.
  -Frontend: Responsive HTML/CSS with client-side validation.


## Project Outcomes and Reflections

Impact & Benefits
  -Security: Eliminates password storage risks.
  -Usability: No need for 2FA or complex key management.
Challenges
  -Debugging Crypto: Ensuring K_client == K_server required rigorous logging.
  -User Experience: Balancing security with simple UI flows.
Thoughts on Zero-Knowledge Proofs (ZKPs)
  -Promising for: Privacy-preserving auth, blockchain, and decentralized identity.
  -Challenge: Complexity in implementation vs. traditional systems.

## References

https://info.cs.st-andrews.ac.uk/student-handbook/files/project-library/cs4796/gf45-Final_Report.pdf [page 40]

## Presentaion Slide
https://docs.google.com/presentation/d/1ir4KejT73GveUNsua_SGfzsS0Difz73e/edit?usp=sharing&ouid=108077557850721146167&rtpof=true&sd=true

## Video Demo 

https://youtu.be/BzdTxaz_Z0Q

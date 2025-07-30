# Zero Knowledge Role-Based Access Control (ZK-RBAC)

ZK-RBAC is a role-based access control system using Zero-Knowledge Proofs technology that allows employees to prove their roles and access rights without revealing sensitive personal information such as passwords or identification data.

## Project Description

This system addresses security and privacy issues in modern enterprise environments, where traditional access control management often requires revealing sensitive information. ZK-RBAC uses Merkle Trees and ZK-SNARKs to create a secure authentication mechanism with privacy protection.

## Impact on Ecosystem and Society

- **Privacy Protection**: Employees can prove access rights without revealing personal information
- **Enhanced Security**: Uses advanced cryptography to protect the system from attacks
- **Transparency and Trust**: Zero-Knowledge Proofs ensure authentication accuracy without requiring trust in third parties
- **Wide Application**: Can be applied in organizations, enterprises, and distributed systems to manage access control securely

## Team Information
**Group:** 3

**Members**

- Name: Ngô Tấn Phước
  - Discord Username: TanPhuoc
  - Github Username: ngotanphuoc
  - Role: Member

- Name: Nguyễn Trung Nguyên
  - Discord Username: NTNguyen
  - Github Username: NTNguyen055
  - Role: Leader

- Name: Trần Nhơn Nhật
  - Discord Username: Nhat
  - Github Username: trannhatbuilder
  - Role: Member

- Name: Phạm Thanh Doãn
  - Discord Username: doanasd
  - Github Username: doanasd
  - Role: Member

- Name: Trần Công Tường
  - Discord Username: congtuong0411
  - Github Username: congtuong04
  - Role: Member

- Name: Nguyễn Viết Khang
  - Discord Username: khangtumu123
  - Github Username: khangng04
  - Role: Member

- Name: Trần Ngọc Thành
  - Discord Username: thanh24024
  - Github Username: NgocTahn24024
  - Role: Member

- Name: Phan Minh Quân
  - Discord Username: phanquan277
  - Github Username: phanquan277github
  - Role: Member


## Technical Report

### Real-world Problem and Motivation

In modern enterprise environments, traditional role-based access control (RBAC) management faces many challenges regarding security and privacy:

**Main Issues:**
- **Sensitive Information Disclosure**: Traditional systems require employees to provide personal information (username, password, ID) to prove their roles
- **Security Risks**: Authentication information can be stolen, misused, or leaked
- **Lack of Transparency**: Employees cannot verify how their personal information is processed
- **Third-party Dependency**: Requires complete trust in centralized management systems

**Limitations of Current Solutions:**
- Traditional RBAC systems store user information in plaintext or simple hash formats
- No mechanism to prove roles without revealing identity
- Vulnerable to brute-force attacks and database attacks

### Proposed Approach

**ZK-RBAC** uses Zero-Knowledge Proofs technology to solve the above problems:

1. **Privacy-preserving Proof**: Employees can prove they belong to a specific department without revealing email, password, or personal information
2. **Cryptographic Security**: Uses Merkle Trees with Poseidon hash to ensure integrity and security
3. **Transparency**: All proof steps can be publicly verified
4. **Decentralization**: Does not require trust in a single central entity

### Main Technical Components

#### 1. **Zero-Knowledge Circuit (Circom)**
- **File**: `circuits/merkle_proof.circom`
- **Function**: Circuit proves membership in Merkle tree with depth 3
- **Technology**: Uses Poseidon hash to ensure high security
- **Input**: leaf (hash of email+secret), path_elements, path_index, root
- **Output**: isValid (1 if proof succeeds)

#### 2. **Merkle Tree Management System**
- **File**: `merkle/create_root.py`
- **Function**: Creates Merkle tree for each department from employee list
- **Important Features**: 
  - This script only needs to run **once** during initial system setup
  - Automatically creates `roots/` directory if it doesn't exist
  - **Manual Updates**: When users change information in `employees/*.json` files (add/remove employees, change email/secret), can run this script again to create new Merkle tree
  - **Data Overwrite**: When re-run, script will overwrite files in `roots/` with new data
- **Process**:
  - Hash employee information (email + secret) using Poseidon
  - Build Merkle tree with 8 leaves (2^3)
  - Export root hash for each department
- **Result**: JSON files containing root, leaves and email hashes in `roots/` folder

#### 3. **Web Application Stack**
- **Backend**: Flask server (`web/prover/server.py`)
  - Handles role proof requests
  - Searches departments based on email patterns
  - Generates and verifies ZK proofs
- **Frontend**: HTML/CSS/JavaScript with Tailwind CSS
  - User-friendly interface
  - Integrates SnarkJS to create proofs directly in browser
- **Dashboard**: Separate for each department (finance, hr, it, sales)

#### 4. **Cryptographic Components**
- **Poseidon Hash**: Hash function friendly to ZK circuits
- **ZK-SNARKs**: Uses Groth16 protocol to create concise proofs
- **Trusted Setup**: Ptau files for ceremony setup

#### 5. **Data Management**
- **Employee Data**: JSON files for 4 departments (finance, hr, it, sales)
  - **Purpose**: These files are designed for easy control and demonstration
  - **Structure**: Each file contains employee list with email and secret password
  - **Demo-friendly**: Can easily add/remove employees to test different scenarios
  - **Production**: In real deployment, this data would be stored securely and encrypted
- **Root Storage**: Stores Merkle roots and metadata
- **Proof Artifacts**: Files generated from circuit compilation process

### Technologies Used

- **Circom**: Circuit programming language for ZK-SNARKs
- **SnarkJS**: JavaScript library to create and verify proofs
- **Python**: Build Merkle tree and data management
- **Flask**: Web framework for backend API
- **Node.js**: Runtime for hashing scripts
- **HTML/CSS/JS**: Frontend development with Tailwind CSS

### Operation Workflow

1. **Setup Phase**: Create Merkle trees for all departments and compile circuits
2. **Registration**: Employees are added to their respective department lists
3. **Authentication**: 
   - Employee enters email and secret
   - System finds department and creates Merkle proof
   - Generate ZK proof proving membership
4. **Verification**: Verify proof and grant access to corresponding dashboard

## Project Outcomes and Reflections

### **Project Impact and Benefits**

**ZK-RBAC** has delivered significant results and benefits:

- **Absolute Privacy Protection**: The system allows employees to authenticate their roles without revealing any personal information, from email to passwords
- **Enhanced Trust**: Uses advanced cryptographic technology (ZK-SNARKs, Poseidon hash) to ensure integrity and security
- **Scalability**: Modular architecture allows easy addition of new departments and management of thousands of employees
- **Transparency and Verification**: All proofs can be publicly verified without revealing sensitive information
- **Real-world Application**: Can be deployed in organizations and enterprises to replace traditional RBAC systems

### **Notable Insights and Experiences**

During development, we made interesting discoveries:

- **Power of Merkle Trees**: Using Merkle Trees not only ensures data integrity but also allows efficient membership proof with logarithmic complexity
- **Poseidon Hash Friendliness**: Unlike SHA256, Poseidon is specifically designed for ZK circuits, significantly reducing constraints and improving performance
- **Frontend-Backend Integration**: Integrating SnarkJS into browsers allows direct client-side proof generation, reducing server load and increasing security
- **Flexible Architecture**: The system can easily scale from 4 demo departments to hundreds of real departments by simply updating JSON data

### **Challenges Faced and Solutions**

**1. ZK Circuits Complexity:**
- **Challenge**: Circom syntax and ZK circuit logic are completely different from traditional programming
- **Solution**: Thoroughly studied documentation, experimented with simple circuits before building merkle_proof.circom
- **Lesson**: ZK programming requires rigorous mathematical thinking and deep understanding of cryptographic primitives

**2. Trusted Setup and Key Management:**
- **Challenge**: Managing ptau, zkey files and ensuring trustworthy trusted setup ceremony
- **Solution**: Used verified Powers of Tau ceremony and thoroughly documented the setup process
- **Lesson**: Trusted setup is the backbone of ZK-SNARKs, must be performed carefully and transparently

**3. Performance Optimization:**
- **Challenge**: Initial proof generation time was quite slow, affecting user experience
- **Solution**: Optimized circuit design, used efficient hash functions, and pre-computed witnesses
- **Lesson**: Performance in ZK systems heavily depends on circuit design and choice of cryptographic primitives

**4. Frontend-Cryptography Integration:**
- **Challenge**: Integrating complex cryptographic operations into web interface
- **Solution**: Used SnarkJS library and created abstraction layers to hide complexity from end users
- **Lesson**: UX design for cryptographic applications requires balancing security and usability

### **Thoughts on Zero-Knowledge Proofs and Their Applications**

**Compelling Aspects:**
- **Privacy by Design**: ZKPs allow building systems where privacy is not an afterthought but a core feature
- **Mathematical Elegance**: The ability to prove knowledge without revealing knowledge is a beautiful mathematical breakthrough
- **Trustless Verification**: Can verify claims without needing to trust the prover

**Challenges:**
- **Complexity Barrier**: Requires deep mathematical knowledge and specialized tools
- **Performance Trade-offs**: Proof generation and verification are still expensive compared to traditional methods
- **Trusted Setup Dependency**: Many ZK schemes require trusted setup, creating a single point of failure

**Application Potential:**
- **Blockchain and DeFi**: Privacy-preserving transactions, identity verification, voting systems
- **Healthcare**: Prove vaccination status, medical credentials without revealing personal health data
- **Education**: Verify academic credentials and certifications privately
- **Supply Chain**: Prove product authenticity and compliance without revealing trade secrets
- **Government Services**: Digital identity, tax verification, benefits distribution with privacy protection

**Future Impact:**
ZKPs have the potential to revolutionize how we approach privacy in the digital age. As technology matures and tools become more accessible, we may see widespread adoption in fields requiring high privacy like finance, healthcare, and government services. The ZK-RBAC project is just the beginning of a future where privacy and functionality can coexist perfectly.

## References

### **Core Technologies**

1. **Circom Documentation**
   - https://docs.circom.io/
   - Circuit programming language for ZK-SNARKs

2. **SnarkJS Library**
   - https://github.com/iden3/snarkjs
   - JavaScript library for ZK-SNARK proof generation and verification

3. **Circomlib**
   - https://github.com/iden3/circomlib
   - Circuit templates including Poseidon hash implementations

### **Cryptographic Components**

4. **Poseidon Hash Function**
   - "Poseidon: A New Hash Function for Zero-Knowledge Proof Systems" - Grassi et al.
   - https://eprint.iacr.org/2019/458.pdf

5. **Groth16 Protocol**
   - "On the Size of Pairing-based Non-interactive Arguments" - Jens Groth
   - https://eprint.iacr.org/2016/260.pdf

### **Development Frameworks**

6. **Flask Framework**
   - https://flask.palletsprojects.com/
   - Python web framework for backend API

7. **Tailwind CSS**
   - https://tailwindcss.com/docs
   - CSS framework for frontend styling

### **Educational Resources**

8. **ZK-SNARKs Tutorial**
   - "ZK-SNARKs: Under the Hood" by Vitalik Buterin
   - https://vitalik.ca/general/2017/02/01/zk_snarks.html

9. **Circom Learning Materials**
   - 0xPARC Circom Workshop: https://learn.0xparc.org/materials/circom/

## Presentaion Slide

(https://www.canva.com/design/DAGuh0kL1mg/yxFv6wgS_-ntv9h8o7BTkw/edit?ui=eyJBIjp7fX0)

## Video Demo 

(https://drive.google.com/drive/folders/11B2AmB-dVyKJePtkVRbIYakIPcALAa0M?usp=sharing)


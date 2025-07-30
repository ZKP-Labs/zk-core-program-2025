import subprocess
import os

def generate_zk_artifacts(circuit_name="captcha"):
    try:
        # Đường dẫn tuyệt đối
        CIRCOM_PATH = "C:/WorkSpace/Web/zkcaptcha/server/circom/target/release/circom.exe"
        SNARKJS_PATH = "C:/Users/loith/AppData/Roaming/npm/snarkjs.cmd"
        PTAU_PATH = os.path.abspath("powersOfTau28_hez_final_10.ptau")

        # File CIRCOM (đầu vào)
        circuit_path = os.path.abspath(f"app/circuits/{circuit_name}.circom")
        print("[INFO] Run with file:", circuit_path)

        # B1: Compile circuit to WASM and R1CS
        subprocess.run([
            CIRCOM_PATH,
            circuit_path,
            "--r1cs", "--wasm", "--sym"
        ], check=True)
        print("[✅] Compile circuit to WASM and R1CS")

        # File R1CS output từ Circom
        r1cs_file = f"{circuit_name}.r1cs"
        zkey_file = f"{circuit_name}.zkey"
        vkey_file = f"{circuit_name}_verification_key.json"

        # B2: Groth16 setup
        subprocess.run([
            SNARKJS_PATH, "groth16", "setup",
            r1cs_file, PTAU_PATH, zkey_file
        ], check=True)
        print("[✅] zKey generation from R1CS and PTAU")

        # B3: Export verification key
        subprocess.run([
            SNARKJS_PATH, "zkey", "export", "verificationkey",
            zkey_file, vkey_file
        ], check=True)
        print("[✅] Exported verification key")

        print("\n🎉 WASM & zKey created successfully!\n")

    except subprocess.CalledProcessError as e:
        print(f"[❌] Command failed: {e.cmd}")
        print(f"[💥] Return code: {e.returncode}")
        if e.stderr:
            print(f"[stderr] {e.stderr}")
    except FileNotFoundError as e:
        print(f"[❌] File not found: {e}")
    except Exception as e:
        print(f"[❌] Unexpected error: {e}")


# Gọi hàm
generate_zk_artifacts()


# import subprocess
# import os
# import shutil

# def generate_zk_artifacts(circuit_name="captcha"):
#     try:
#         CIRCOM_PATH = "C:/WorkSpace/Web/zkcaptcha/server/circom/target/release/circom.exe"
#         SNARKJS_PATH = "C:/Users/loith/AppData/Roaming/npm/snarkjs.cmd"
        
#         circuit_path = os.path.abspath(f"app/circuits/{circuit_name}.circom")
        
#         print("Run with file:", f"{circuit_path}")
        
#         # B1: Compile circuit to WASM and R1CS
#         subprocess.run([
#             CIRCOM_PATH,
#             f"{circuit_path}",
#             "--r1cs", "--wasm", "--sym"
#         ], check=True)
#         print('Compile circuit to WASM and R1CS')

#         # B2: Trusted Setup
#         subprocess.run([SNARKJS_PATH, "powersoftau", "new", "bn128", "12", "pot12_0000.ptau", "-v"], check=True)
#         subprocess.run([
#             SNARKJS_PATH, "powersoftau", "contribute",
#             "pot12_0000.ptau", "pot12_final.ptau"
#         ], check=True)
#         print('Trusted Setup')

#         # B3: zKey generation from R1CS and PTau
#         subprocess.run([SNARKJS_PATH, "groth16", "setup",
#                         f"{circuit_name}.r1cs", "pot12_final.ptau", f"{circuit_name}.zkey"], check=True)
#         print('zKey generation from R1CS and PTau')

#         # B4: Export verification key to JSON
#         subprocess.run([SNARKJS_PATH, "zkey", "export", "verificationkey",
#                         f"{circuit_name}.zkey", f"{circuit_name}_verification_key.json"], check=True)
#         print('Export verification key to JSON')
        
#         print("WASM & zkey created successfully.")

#     except subprocess.CalledProcessError as e:
#         print(f"[!] Command failed with return code {e.returncode}")
#         print(f"[!] Command: {e.cmd}")
#         print(f"[!] Output: {e.output}")
#         print(f"[!] Stdout: {e.stdout}")
#         print(f"[!] Stderr: {e.stderr}")
#     except FileNotFoundError as e:
#         print(f"File not found: {e}")
#     except Exception as e:
#         print(f"Unexpected error: {e}")


# # Gọi hàm
# generate_zk_artifacts()

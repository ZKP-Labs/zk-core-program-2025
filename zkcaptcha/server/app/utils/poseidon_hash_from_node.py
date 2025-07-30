import subprocess

def poseidon_hash(inputs):
    args = ["node", "app/utils/poseidon_hash.js"] + [str(x) for x in inputs]
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"Error running Node.js script: {result.stderr}")
    hash_str = result.stdout.strip()
    return hash_str

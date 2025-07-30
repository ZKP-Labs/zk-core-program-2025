pragma circom 2.2.2;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/comparators.circom";

template Auth() {
    signal input sec_1; // Private input 1
    signal input sec_2; // Private input 2
    signal input hash; // Hashed password saved in database - Public input
    signal output valid;

    signal computedHash;
    
    // Compute Poseidon hash of password
    component poseidon = Poseidon(2);
    poseidon.inputs[0] <== sec_1;
    poseidon.inputs[1] <== sec_2;
    computedHash <== poseidon.out; 

    // Compare hashes using IsEqual
    component isEq = IsEqual();
    isEq.in[0] <== computedHash;
    isEq.in[1] <== hash;

    valid <== isEq.out;
}

component main {public [hash]} = Auth();
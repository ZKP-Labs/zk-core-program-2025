pragma circom 2.2.2;

include "circomlib/circuits/poseidon.circom";
include "circomlib/circuits/comparators.circom";

template zkCaptcha() {
    signal input chars[6];          
    signal input public_hash;       
    signal output is_valid;         

    component hasher = Poseidon(6);
    for (var i = 0; i < 6; i++) {
        hasher.inputs[i] <== chars[i];
    }

    hasher.out === public_hash;

    is_valid <== 1;
}

component main { public [chars, public_hash] } = zkCaptcha();

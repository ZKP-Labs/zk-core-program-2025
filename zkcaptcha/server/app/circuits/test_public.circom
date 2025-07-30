pragma circom 2.2.2;

template T() {
    signal input x;
    signal output y;

    y <== x + 1;
}

component main = T();


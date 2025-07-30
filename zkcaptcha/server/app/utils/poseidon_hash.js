const circomlib = require('circomlibjs');
const process = require('process');

async function main() {
    const poseidon = await circomlib.buildPoseidon();
    const F = poseidon.F;

    // Lấy input từ tham số dòng lệnh, ví dụ: node poseidon_hash.js 1 2 3
    const inputs = process.argv.slice(2).map(x => BigInt(x));

    // Tính hash
    const hash = poseidon(inputs);
    const hashStr = F.toString(hash);

    console.log(hashStr);
}

main();

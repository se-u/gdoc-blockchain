const SHA256 = require('crypto-js/sha256');

// Target kesulitan untuk penambangan
const TARGET_DIFFICULTY = BigInt("0x00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const MAX_TRANSACTIONS = 10;

// Simpanan transaksi yang belum dimasukkan ke blok
const mempool = [];
// Daftar blok yang sudah ditambang
const blocks = [];

/**
 * Tambahkan transaksi baru ke mempool
 * @param {Object} transaction - Transaksi yang akan ditambahkan
 */
function addTransaction(transaction) {
    mempool.push(transaction);
}

/**
 * Menambang blok baru dengan transaksi dari mempool
 */
function mine() {
    // Ambil transaksi dari mempool sampai batas MAX_TRANSACTIONS
    const transactions = mempool.splice(0, MAX_TRANSACTIONS);

    // Buat blok baru
    const block = {
        id: blocks.length,        // ID blok (berdasarkan jumlah blok sebelumnya)
        transactions,            // Daftar transaksi
        nonce: 0                 // Nilai awal nonce
    };

    let hash;
    // Loop sampai menemukan hash yang valid
    while (true) {
        hash = SHA256(JSON.stringify(block)).toString();
        if (BigInt(`0x${hash}`) < TARGET_DIFFICULTY) {
            break; // Berhenti jika hash sesuai dengan target
        }
        block.nonce++; // Tingkatkan nonce jika hash belum valid
    }

    // Tambahkan blok baru ke daftar blok
    blocks.push({ ...block, hash });
}

// Fungsi utama untuk simulasi
function simulate() {
    console.log("=== Simulasi Blockchain Sederhana ===");

    // Tambahkan beberapa transaksi ke mempool
    for (let i = 1; i <= 25; i++) {
        addTransaction({ from: `User${i}`, to: `User${i + 1}`, amount: i * 10 });
    }
    console.log("Transaksi di mempool:", mempool);

    // Tambang 3 blok
    console.log("\nMenambang blok...");
    for (let i = 0; i < 3; i++) {
        mine();
        console.log(`Blok ${i} selesai ditambang. Hash: ${blocks[i].hash}`);
    }

    // Tampilkan blok yang ditambang
    console.log("\n=== Blok yang Ditambang ===");
    console.log(JSON.stringify(blocks, null, 2));
}

// Jalankan simulasi
simulate();

import { writeFileSync } from 'fs';





console.log("Your wallet address (public key):", wallet.publicKey.toBase58());


writeFileSync('secretKey.json', JSON.stringify(Array.from(wallet.secretKey)));

console.log("Wallet keys saved to secretKey.json");

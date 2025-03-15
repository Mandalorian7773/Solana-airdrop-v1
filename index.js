import { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import fs from "fs";

let wallet;
const secretKeyFile = "secretKey.json";

if (fs.existsSync(secretKeyFile)) {
    const secretKey = new Uint8Array(JSON.parse(fs.readFileSync(secretKeyFile, "utf8")));
    wallet = Keypair.fromSecretKey(secretKey);
    console.log("Loaded wallet address:", wallet.publicKey.toBase58());
} else {
    wallet = Keypair.generate();
    fs.writeFileSync(secretKeyFile, JSON.stringify(Array.from(wallet.secretKey)));
    console.log("Generated wallet and saved keys to secretKey.json");
    console.log("Wallet address:", wallet.publicKey.toBase58());
}

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletBalance = await connection.getBalance(wallet.publicKey);
        console.log(`Wallet balance: ${walletBalance / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.error("Error getting wallet balance:", err);
    }
};



const main = async () => {
    await getWalletBalance();
    //await airDropSol();
    await getWalletBalance();
};

main();

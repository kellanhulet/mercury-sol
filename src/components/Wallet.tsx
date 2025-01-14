import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function WalletInfo({ walletAddress }: { walletAddress: string }) {
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        const connection = new Connection(clusterApiUrl("devnet"));

        const pubKey = new PublicKey(walletAddress);

        const balanceInLamports = await connection.getBalance(pubKey);
        const solBalance = balanceInLamports / 1000000000;

        setBalance(solBalance);
      } catch (err) {
        console.error(err);
      }
    };

    if (walletAddress) {
      fetchWalletInfo();
    }
  }, [walletAddress]);

  return <div>Sol Balance: ${balance}</div>;
}

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

export const Wallet = ({ walletAddress }: { walletAddress: string }) => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        const pubKey = new PublicKey(walletAddress);

        const accountInfo = await connection.getAccountInfo(pubKey);
        console.log(accountInfo);

        setBalance(0);
        console.log(balance);
      } catch (err) {
        console.error(err);
        setBalance(null);
      }
    };

    if (walletAddress) {
      fetchWalletInfo();
    }
  }, [walletAddress]);

  return (
    <div>
      <h1>Wallet Info</h1>
      <div>
        <p>Wallet Address: {walletAddress}</p>
        <p>Balance: {balance} SOL</p>
      </div>
    </div>
  );
};

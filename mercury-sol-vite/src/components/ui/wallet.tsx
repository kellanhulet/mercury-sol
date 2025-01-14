import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

export const Wallet = ({ walletAddress }: { walletAddress: string }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        setLoading(true);
        const connection = new Connection(clusterApiUrl("devnet"));

        const pubKey = new PublicKey(walletAddress);

        // Get balance instead of account info
        const balanceInLamports = await connection.getBalance(pubKey);
        const solBalance = balanceInLamports / 1000000000;

        setBalance(solBalance);
        setError(null);
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch balance"
        );
        setBalance(null);
      } finally {
        setLoading(false);
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>Balance: {balance?.toFixed(4)} SOL</p>
        )}
      </div>
    </div>
  );
};

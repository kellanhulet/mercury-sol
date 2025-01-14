import { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

interface TokenBuyer {
  address: string;
  timestamp: number;
}

interface TokenScannerProps {
  tokenAddress: string;
}

const TokenScanner: React.FC<TokenScannerProps> = ({ tokenAddress }) => {
  const [buyers, setBuyers] = useState<TokenBuyer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTokenBuyers = async (tokenAddress: string): Promise<TokenBuyer[]> => {
    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
    const mintPubkey = new PublicKey(tokenAddress);
    const buyers = new Set<TokenBuyer>();

    try {
      const tokenAccounts = await connection.getTokenLargestAccounts(mintPubkey);

      for (const tokenAccount of tokenAccounts.value) {
        const signatures = await connection.getSignaturesForAddress(tokenAccount.address, {
          limit: 1000,
        });

        for (const sig of signatures) {
          try {
            const tx = await connection.getTransaction(sig.signature);
            if (!tx) continue;

            tx.transaction.message.instructions.forEach((instruction, idx) => {
              const programId = tx.transaction.message.accountKeys[instruction.programIdIndex];
              if (programId.equals(TOKEN_PROGRAM_ID)) {
                const accountInfo = tx.transaction.message.accountKeys[instruction.accounts[0]];
                buyers.add({
                  address: accountInfo.toBase58(),
                  timestamp: tx.blockTime ? tx.blockTime * 1000 : Date.now(),
                });
              }
            });
          } catch (err) {
            console.error(`Error processing transaction: ${err}`);
            continue;
          }
        }
      }

      return Array.from(buyers);
    } catch (err) {
      throw new Error(`Failed to fetch token buyers: ${err}`);
    }
  };

  const handleScan = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const buyersList = await getTokenBuyers(tokenAddress);
      setBuyers(buyersList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleScan}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Scanning..." : "Scan Token Buyers"}
      </button>

      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}

      {buyers.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Token Buyers ({buyers.length})</h2>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Wallet Address</th>
                  <th className="p-2 text-left">Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((buyer, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-mono">{buyer.address}</td>
                    <td className="p-2">{new Date(buyer.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenScanner;

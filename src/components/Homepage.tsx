import { useState } from "react";
import { WalletInfo } from "./Wallet";

export function Homepage() {
  const [walletAddress, setWalletAddress] = useState<string>();

  return (
    <div className="text-lg font-medium">
      Jonah is a bot!
      <div>
        <label>
          {"Wallet Address"}
          <input
            className="border"
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </label>
        {walletAddress && <WalletInfo walletAddress={walletAddress} />}
      </div>
    </div>
  );
}

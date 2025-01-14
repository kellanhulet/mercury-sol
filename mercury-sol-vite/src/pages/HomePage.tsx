import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import { Wallet } from "@/components/ui/wallet";

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  return (
    <div className="w-screen min-h-screen">
      {/* Header */}
      <header className="sticky max-w-full">
        <div className="w-full px-4 flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between mx-auto w-full">
            <Building2 className="h-6 w-6" />
            <h1 className="text-xl font-bold">Neptune Wallet Analyzer</h1>
            <Button>Connect</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-4">
        <Input type="email" placeholder="Abc123..." />
      </section>
      <section>
        <label>
          Wallet Adress
          <input
            className="bg-white border"
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </label>
        {walletAddress && <Wallet walletAddress={walletAddress} />}
      </section>
    </div>
  );
}

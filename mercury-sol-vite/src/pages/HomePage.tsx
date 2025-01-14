import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowRight, Phone, Mail, CheckCircle } from "lucide-react";
import TokenScanner from "@/components/TokenScanner";

const HomePage = () => {
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
      {/* <section className="py-4 px-4">
        <Input type="email" placeholder="Abc123..." />
        <Button>Search</Button>
      </section> */}

      <div>
        <TokenScanner tokenAddress="HNg5PYJmtqcmzXrv6S9zP1CDKk5BgDuyFBxbvNApump" />
      </div>
    </div>
  );
};

// Sample services data
const services = [
  {
    title: "Strategic Consulting",
    description: "Expert guidance for your business growth",
    features: ["Business Analysis", "Market Research", "Growth Strategy"],
  },
  {
    title: "Digital Solutions",
    description: "Modern technology for modern business",
    features: ["Web Development", "Cloud Services", "Digital Marketing"],
  },
  {
    title: "Financial Services",
    description: "Optimize your financial operations",
    features: ["Financial Planning", "Risk Management", "Investment Advisory"],
  },
];

export default HomePage;

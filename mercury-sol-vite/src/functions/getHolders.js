const { Connection, PublicKey } = require("@solana/web3.js");
const { TOKEN_PROGRAM_ID } = require("@solana/spl-token");

async function getTokenBuyers(tokenAddress) {
  // Connect to Solana mainnet
  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
  const mintPubkey = new PublicKey(tokenAddress);

  // Get all token accounts for this mint
  const tokenAccounts = await connection.getTokenLargestAccounts(mintPubkey);

  const buyers = new Set();

  // For each token account, get its transaction history
  for (const tokenAccount of tokenAccounts.value) {
    const signatures = await connection.getSignaturesForAddress(
      tokenAccount.address,
      { limit: 1000 } // Adjust limit as needed
    );

    // Get transaction details for each signature
    for (const sig of signatures) {
      try {
        const tx = await connection.getTransaction(sig.signature);
        if (!tx) continue;

        // Look through all instructions in the transaction
        tx.transaction.message.instructions.forEach((instruction) => {
          if (instruction.programId.equals(TOKEN_PROGRAM_ID)) {
            // Add the owner's address to our set of buyers
            const accountInfo = tx.transaction.message.accountKeys[instruction.accounts[0]];
            buyers.add(accountInfo.toBase58());
          }
        });
      } catch (error) {
        console.error(`Error processing transaction: ${error}`);
        continue;
      }
    }
  }

  return Array.from(buyers);
}

// Example usage
async function main() {
  try {
    const tokenAddress = "YOUR_TOKEN_ADDRESS_HERE";
    const buyers = await getTokenBuyers(tokenAddress);
    console.log("Token buyers:", buyers);
    console.log("Total unique buyers:", buyers.length);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

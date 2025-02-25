// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const TokenizedTree = await hre.ethers.getContractFactory("TokenizedTree");

  // Deploy the contract
  const contract = await TokenizedTree.deploy();  // No need for deployed() separately

  await contract.waitForDeployment(); // ✅ Replaces contract.deployed()

  console.log("Contract deployed to:", await contract.getAddress());
}

// Run the deployment script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

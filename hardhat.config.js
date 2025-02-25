require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");


console.log("RPC_URL:", process.env.RPC_URL || "Not Found");
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Loaded" : "Not Found");

module.exports = {
  solidity: "0.8.28",
  networks: {
    codexSepolia: {
      url: process.env.RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenizedTree Contract", function () {
  let TokenizedTree, contract, owner, addr1;

  beforeEach(async function () {
    TokenizedTree = await ethers.getContractFactory("TokenizedTree");
    [owner, addr1] = await ethers.getSigners();
    contract = await TokenizedTree.deploy();
    await contract.waitForDeployment();
  });

  it("Should deploy successfully", async function () {
    expect(await contract.getAddress()).to.not.be.null;
  });

  it("Should allow minting a tree NFT", async function () {
    const tx = await contract.plantTree(); // ✅ Correct - No parameters
    await tx.wait();
    expect(await contract.totalTrees()).to.equal(1); // ✅ Check if the count increased
  });
}); // ✅ Added missing closing bracket

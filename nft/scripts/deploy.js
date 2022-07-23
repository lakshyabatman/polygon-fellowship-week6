// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const NFTContract = await hre.ethers.getContractFactory("NFTContract");
  const nFTContract = await NFTContract.deploy(9,ethers.utils.parseEther("0.02"),"ipfs://QmY3Tu3zLydQcg5fXiMy8fbE5WwgnSvj2SFGdqsnwb1KzM/");

  await nFTContract.deployed();

  console.log("nFTContract deployed to:", nFTContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

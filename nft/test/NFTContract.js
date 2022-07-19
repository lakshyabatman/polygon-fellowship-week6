const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
  
  describe("NFTContract", function () {

    describe("Deployment and Minting", async function () {
        it("should have proper token uri", async function() {
            const [owner, otherAccount] = await ethers.getSigners();
            const NFTContract = await hre.ethers.getContractFactory("NFTContract");
            const nFTContract = await NFTContract.deploy(100, ethers.utils.parseEther("0.02"), "testurl/");
        
            await nFTContract.deployed();
        
            console.log("nFTContract deployed to:", nFTContract.address);
            await nFTContract.mint();
           expect(await nFTContract.tokenURI(0)).to.equal("testurl/0.json")
        })

        it("should allow user to mint more sale limit", async function() {
           try {
            const [owner, otherAccount] = await ethers.getSigners();
            const NFTContract = await hre.ethers.getContractFactory("NFTContract");
            const nFTContract = await NFTContract.deploy(4, ethers.utils.parseEther("0.02"), "testurl/");
        
            await nFTContract.deployed();
        
            console.log("nFTContract deployed to:", nFTContract.address);
            await nFTContract.mint();
            await nFTContract.mint();
            await nFTContract.mint();
            await nFTContract.mint();
            await nFTContract.mint();
             nFTContract.mint();
           }catch(err) {
            expect(err.message).to.be.equal("VM Exception while processing transaction: reverted with reason string 'all NFT sold out'")
           }
        })



    })
  });
  
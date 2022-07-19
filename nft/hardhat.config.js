require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    "goerli": {
      "accounts":[process.env.PRIVATE_KEY],
      "url":process.env.URL
    }
  },
  "etherscan" : {
    "apiKey":process.env.ETHERSCAN_API
  }
};

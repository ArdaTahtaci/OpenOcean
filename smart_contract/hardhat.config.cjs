require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/Y3Vs5JtRYF9ZbpT2IKZ4RgdjthLW3bmY',
      accounts: ['b0f0a1238efbda0fe24e268a365eaf5728338a37d0c122873a7c28933f2ffbea']
    }
  }
};

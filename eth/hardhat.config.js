require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/8f969a2334fd4a47b01180598184f9ff",
      accounts: ["0f3fcfba47b29acee62f16161db357b8143dbdbf2b5877ce312e987600e0bf86"]
    },
  }
};


const {ethers} = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const gamesFactory = await ethers.deployContract("GamesFactory");

  await gamesFactory.waitForDeployment();
  console.log('Contract GamesFactory is deployed to:', gamesFactory.target);
}

main()
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

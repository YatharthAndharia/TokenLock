const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(1000000);
  await token.deployed();
  console.log("Token deployed to:", token.address);

  const TokenLock = await hre.ethers.getContractFactory("TokenLock");
  const tokenlock = await TokenLock.deploy();
  await tokenlock.deployed();
  console.log("TokenLock deployed to:", tokenlock.address);

  /*const TokenInstances = await hre.ethers.getContractFactory("TokenInstances");
  const tokeninstances = await TokenInstances.deploy();
  await tokeninstances.deployed();
  console.log("TokenInstances deployed to:", tokeninstances.address);*/
  // console.log(token.owner().call());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

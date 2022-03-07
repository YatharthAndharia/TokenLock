const { messagePrefix } = require("@ethersproject/hash");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");

  });
  it("Token Testing", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(1000);
    await token.deployed();

    const Token1 = await ethers.getContractFactory("Token");
    const token1 = await Token1.deploy(1000);
    await token1.deployed();

    const TokenLock = await ethers.getContractFactory("TokenLock");
    const tokenlock = await TokenLock.deploy();
    await tokenlock.deployed();

    const [owner, addr1] = await ethers.getSigners();
    //expect(await token.balanceOf(owner.address)).to.equal(100);
    await token.transfer(tokenlock.address, 100);
    //await token1.transfer(tokenlock.address, 100);
    await tokenlock.connect(owner).lockToken(100, owner.address, 10, token.address);
    //await tokenlock.connect(owner).lockToken(40, owner.address, 0, token1.address);
    //expect(await token.balanceOf(addr1.address)).to.equal(50);
    //console.log(await token.address);
    //console.log(flag);
    console.log("Owner Balance : ", await token.balanceOf(owner.address));
    console.log("TokenLock Balance : ", await token.balanceOf(tokenlock.address));
    await token.transfer(tokenlock.address, 500);
    await tokenlock.connect(owner).lockToken(500, owner.address, 20, token.address);
    console.log("Owner Balance : ", await token.balanceOf(owner.address));
    console.log("TokenLock Balance : ", await token.balanceOf(tokenlock.address));

    //await tokenlock.withdrawToken(40, token1.address);
    //console.log("Owner Balance : ", await token.balanceOf(owner.address));
    //console.log("TokenLock Balance : ", await token.balanceOf(tokenlock.address));
    //console.log("Owner Balance : ", await token1.balanceOf(owner.address));
    //console.log("TokenLock Balance : ", await token1.balanceOf(tokenlock.address));
    //console.log(await tokenlock.connect(owner).userDetails[owner.address]);
    console.log(await tokenlock.connect(owner).getMapping());
  });
  /*it("Frontend Testing", async function () {
    const Frontend = await ethers.getContractFactory("Frontend");
    const frontend = await Frontend.deploy();
    await frontend.deployed();

    
    expect(await token.balanceOf(owner.address)).to.equal(100000);
  });*/
});

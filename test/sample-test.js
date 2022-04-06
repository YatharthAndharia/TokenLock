//
const { expect } = require("chai");
const { ethers } = require("hardhat");
let owner;
let addr1;
let addr2;
let token;
let token2;
let lock;
beforeEach(async function () {
  let Token = await ethers.getContractFactory("Token");
  token = await Token.deploy(10000);

  let Token2 = await ethers.getContractFactory("Token");
  token2 = await Token2.deploy(20000);

  let Lock = await ethers.getContractFactory("TokenLock");
  lock = await Lock.deploy();

  [owner, addr1, addr2] = await ethers.getSigners();
  await token.transfer(addr1.address, 1000);
  await token2.transfer(addr1.address, 2000);
});
describe("Testing", function () {
  it("Token Approve testing (TransferFrom)", async function () {
    await token.approve(addr1.address, 5000);
    await expect(
      token.connect(addr1).transferFrom(owner.address, lock.address, 6000)
    ).to.be.revertedWith("ERC20: insufficient allowance");
    await token.connect(addr2).transferFrom(owner.address, lock.address, 1000);
    expect(await token.balanceOf(lock.address)).to.equal(1000);
  });
  it("Lock Token With Approve in contract", async function () {
    await token.approve(lock.address, 1000000000000);
    await expect(
      lock.lockToken(token.address, 30000000000, 15)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    await lock.lockToken(token.address, 500, 10);
    expect(await token.balanceOf(lock.address)).to.equal(500);
    await lock.lockToken(token.address, 300, 15);
    expect(await token.balanceOf(lock.address)).to.equal(800);
  });
  it("Lock Multiple Token With Approve in contract", async function () {
    await token.approve(lock.address, 1000);
    await lock.lockToken(token.address, 500, 10);
    await lock.lockToken(token.address, 300, 15);
    await token2.approve(lock.address, 500);
    await lock.lockToken(token2.address, 500, 10);
    expect(await token.balanceOf(lock.address)).to.equal(800);
    expect(await token2.balanceOf(lock.address)).to.equal(500);
  });
  it("Withdraw Token Testing", async function () {
    await token.approve(lock.address, 1000);
    await lock.lockToken(token.address, 500, 5);
    expect(await token.balanceOf(lock.address)).to.equal(500);
    await expect(lock.withDrawToken(0)).to.be.revertedWith(
      "You can't withdraw token before unlocktime"
    );
    function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }
    sleep(5000);
    await lock.withDrawToken(0);
    expect(await token.balanceOf(lock.address)).to.equal(0);
  });
});

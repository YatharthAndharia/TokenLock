import React, { useRef } from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Token from '../artifacts/contracts/Token.sol/Token.json';
import TokenLock from '../artifacts/contracts/TokenLock.sol/TokenLock.json';
//const tokenaddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const tokenlockaddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
function Dummy(props) {
    const dummy = async (tokenaddress) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const contractlock = new ethers.Contract(tokenlockaddress, TokenLock.abi, signer);
        const contracttoken = new ethers.Contract(tokenaddress, Token.abi, signer);
        const balance = await contracttoken.balanceOf(account);
        console.log("Balance of Account:", parseInt(balance._hex, 16));
        console.log(25);
    }
    //dummy(props.previousData.contractaddress);
    if (props.previousData.contractaddress == "") {

    }
    else {
        console.log(props.previousData.contractaddress);
        dummy(props.previousData.contractaddress);
    }
    return (
        <h1>Helloworld</h1>
    )
}
export default Dummy;
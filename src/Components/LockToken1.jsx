import React, { useRef } from "react";
import { useState } from "react";
import Dummy from './Dummy.jsx';
import { ethers } from "ethers";
import Token from '../artifacts/contracts/Token.sol/Token.json';
import TokenLock from '../artifacts/contracts/TokenLock.sol/TokenLock.json';
const tokenaddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const tokenlockaddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
//import Connect from "./Connect";
function LockToken(props) {
    /*const [data, setData] = useState({
        contractaddress: ""
    });*/

    const contractaddr = useRef();
    const amount = useRef();
    const unlocktime = useRef();
    const lockToken = async () => {
        //setData({ contractaddress: contractaddr.current.value });
        //console.log(unlocktime.current.value);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const contractlock = new ethers.Contract(tokenlockaddress, TokenLock.abi, signer);
        const contracttoken = new ethers.Contract(tokenaddress, Token.abi, signer);
        await contractlock.lockToken(amount.current.value, account, 15, tokenaddress);
        await contracttoken.transfer(tokenlockaddress, amount.current.value);
        const balance = await contracttoken.balanceOf(account);
        console.log("Balance of Account:", parseInt(balance._hex, 16));
    }
    return (
        <>
            <br />Contract Address : <input type="text" ref={contractaddr}></input><br />
            Amount : <input type="number" ref={amount}></input><br />
            Unlock Time : <input type="datetime-local" ref={unlocktime}></input><br />
            <button className='btn' onClick={lockToken}>LockToken</button>

        </>
    );
}
export default LockToken;
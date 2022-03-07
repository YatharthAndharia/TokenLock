import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json';
import TokenLock from './artifacts/contracts/TokenLock.sol/TokenLock.json';
import Connect from './Components/Connect';


const tokenaddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const tokenlockaddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
//const frontendAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
function App() {
  const [state, setState] = useState({
    connected: false
  });
  /*const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts.toString());
    } catch (error) {
      console.log(error);
    }
  };*/

  /*useEffect(() => {
    connectWallet();
  }, []);*/

  /*async function getbalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const contracttoken = new ethers.Contract(tokenaddress, Token.abi, provider);
    const balance = await contracttoken.balanceOf(account);
    console.log("Balance of Account:", parseInt(balance._hex, 16));
  }
  async function lockToken() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const contractlock = new ethers.Contract(tokenlockaddress, TokenLock.abi, signer);
    const contracttoken = new ethers.Contract(tokenaddress, Token.abi, signer);

    await contractlock.lockToken(data.tokens, account, data.unlockTime, tokenaddress);
    await contracttoken.transfer(tokenlockaddress, data.tokens);
    const balance = await contracttoken.balanceOf(account);
    //console.log(account);
    console.log("Balance of Account:", parseInt(balance._hex, 16));
  }
  async function withdrawToken() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const contractlock = new ethers.Contract(tokenlockaddress, TokenLock.abi, signer);
    const contracttoken = new ethers.Contract(tokenaddress, Token.abi, signer);

    //await contractlock.lockToken(100, account, 15, tokenaddress);
    //await contracttoken.transfer(tokenlockaddress, 100);
    await contractlock.withdrawToken(data.withtokens, tokenaddress);
    console.log(data.withtokens);
    //const balance = await contracttoken.balanceOf(account);
    //console.log(account);

    //console.log("Balance of Account:", parseInt(balance._hex, 16));
  }

  const handleChange = (event) => {
    event.persist();
    setData({ ...data, [event.target.id]: event.target.value });
    //console.log(data.tokens);
  }*/
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Connect stateData={state} updateStateData={setState} />
      </header>
    </div>
  );
}

export default App;

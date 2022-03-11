import React, { useState } from "react";
import { ethers } from "ethers";
import "./connect.css";

function Connect(props) {
  const [data, setData] = useState({
    balance: null,
  });
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const balance = await provider.getBalance(account);
      const balanceInEth = ethers.utils.formatEther(balance);
      setData({ balance: balanceInEth, account: account });
      props.updateStateData({
        ...props.stateData,
        provider,
        account,
        isConnected: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const disConnectWallet = async () => {
    console.log(data);
    props.updateStateData({
      ...props.stateData,
      provider: null,
      signer: null,
      account: null,
      isConnected: false,
    });
    window.location.reload();
  };
  //console.log(data);
  if (props.stateData.isConnected) {
    console.log(data.account, data.balance);
    return (
      <div className="d-flex justify-content-between mx-5">
        {/* <div className="topHeader d-flex flex-row mx-5 card bg-primary"> */}
        {/* <div className="d-flex justify-contenet-around"> */}
        <div className="p-1 overflow textcolor">{data.account}</div>
        <div className="p-1 overflow textcolor">Bal:{data.balance}</div>
        {/* </div> */}
        {/* </div> */}
        <div>
          <button
            className="btn btn-danger btn-sm my-1"
            onClick={disConnectWallet}
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <nav className="navbar navbar-dark bg-primary">
          <button
            className="topHeader connectbtn btn btn-primary"
            onClick={connectWallet}
          >
            Connect
          </button>
        </nav>
      </>
    );
  }
}

export default Connect;

import React, { useState } from "react";
import { ethers } from "ethers";

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
        props.updateStateData({
            ...props.stateData,
            provider: null,
            signer: null,
            account: null,
            isConnected: false,
        });
    };

    if (props.stateData.isConnected) {
        console.log(data.account, data.balance);
        return (
            <div className="topHeader">
                <span className="btns">{data.account}</span><br />
                Balance:{data.balance}
                <button className="btns" onClick={disConnectWallet}>
                    disconnect
                </button>
            </div>
        );
    } else {
        return (
            <div className="topHeader">
                <button className="btns" onClick={connectWallet}>
                    Connect
                </button>
            </div>
        );
    }
}

export default Connect;
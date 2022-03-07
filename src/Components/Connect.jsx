import React, { useState } from "react";
import { ethers } from "ethers";
import LockToken1 from "./LockToken1";

function Connect(props) {
    const [data, setData] = useState({
        balance: null,
    });

    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Please Install MetaMask!");
                return;
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const account = await signer.getAddress();
            const balance = await provider.getBalance(account);
            const balanceInEth = ethers.utils.formatEther(balance);
            setData({ balance: balanceInEth, account });
            props.updateStateData({
                ...props.stateData,
                provider,
                signer,
                connected: true,
            });
        } catch (error) {
            console.log(error);
        }
    }
    const disConnectWallet = async () => {
        props.updateStateData({
            ...props.stateData,
            provider: null,
            signer: null,
            account: null,
            connected: false,
        });
    };

    if (props.stateData.connected) {
        console.log(data.account, data.balance);
        return (
            <div>
                <span className="btns">{data.account}</span><br />
                <br />
                <p>Balance:{data.balance}</p>
                <button className="btns" onClick={disConnectWallet}>
                    DisConnect
                </button>
                <LockToken1 stateData={data} updateStateData={setData} />


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
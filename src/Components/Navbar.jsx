import { ethers } from "ethers";
import React, { useState } from "react";
function Navbar(props) {
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
      // console.log("Provider", provider);
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
  if (!props.stateData.isConnected) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light position-sticky">
          <div className="mx-5">
            <h4 className="navbar-brand">
              <i className="fa fa-lock"></i>{" "}
              <b>
                Smart <br />
                Finance
              </b>
            </h4>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ml-5">
              <li className="nav-item active nav-link">
                <small>
                  <i className="fa fa-search"></i>{" "}
                </small>
                Explore
              </li>
              <li className="nav-item active nav-link">
                <small>
                  <i className="fa fa-info-circle"></i>{" "}
                </small>
                About Us
              </li>
              <li className="nav-item active nav-link">
                <small>
                  <i className="fa fa-phone"></i>{" "}
                </small>
                Contact Us
              </li>
              <li className="nav-item active nav-link">
                <small>
                  <i className="fa fa-lock"></i>{" "}
                </small>
                Lockups
              </li>
            </ul>

            <div className="mx-2">
              <button
                className="topHeader connectbtn btn btn-primary"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  } else return <></>;
}
export default Navbar;

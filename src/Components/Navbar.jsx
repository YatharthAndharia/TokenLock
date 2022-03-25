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
  window.ethereum.enable();
  window.ethereum.on("accountsChanged", function (accounts) {
    window.location.reload();
  });

  window.ethereum.on("chainChanged", function (networkId) {
    window.location.reload();
  });

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
                className="topHeader connectbtn btn btn-dark"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  } else
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
                className="btn btn-danger my-1"
                onClick={disConnectWallet}
              >
                Disconnect
              </button>
            </div>
          </div>
        </nav>

        <div className="bg-dark">
          <div className="d-flex justify-content-between mx-5 col-10">
            {/* <div className="topHeader d-flex flex-row mx-5 card bg-primary"> */}
            {/* <div className="d-flex justify-contenet-around"> */}
            <div className="p-1 overflow text-light">
              Connected to : {data.account}
            </div>
            <div className="p-1 overflow text-light">
              Balance : {data.balance}
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </>
    );
}
export default Navbar;

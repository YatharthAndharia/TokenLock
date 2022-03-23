import React, { useState } from "react";
import { ethers } from "ethers";
import "./connect.css";
import lock from "../lock.svg";
import laptop from "../laptop.svg";
import smartswap from "../smartswap.jpeg";

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
  //console.log(data);
  if (props.stateData.isConnected) {
    // console.log(data.account, data.balance);
    return (
      <div className="d-flex justify-content-between mx-5">
        {/* <div className="topHeader d-flex flex-row mx-5 card bg-primary"> */}
        {/* <div className="d-flex justify-contenet-around"> */}
        <div className="p-1 overflow text-dark">{data.account}</div>
        <div className="p-1 overflow text-dark">Bal:{data.balance}</div>
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
        <section className="bg-primary">
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

          <div className="row mb-5 p-2">
            <center className="m-2">
              <div className="d-flex justify-content-center mt-2">
                <img src={smartswap} style={{ height: "50px" }}></img>
                <h1 className="mx-1" style={{ color: "white" }}>
                  Smart Locks
                </h1>
              </div>
              <div style={{ color: "white" }}>
                Liquidity Locking for Token Founders and Community
              </div>
            </center>
            <div className="col-sm-6">
              <div className="cardclass mb-4">
                <div className="card-body d-flex">
                  <h1 className="card-title">
                    <i className="fab fa-btc"></i>
                  </h1>
                  <div>
                    <div className="mx-3">
                      <h5>Lock Any ERC20 Token in Seconds</h5>
                    </div>
                    <div className="text-warning mx-3">
                      The SmartSwap Locking Tool makes it fast, safe and secure
                      to lock up any ERC-20 based coin.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="cardclass mb-4">
                <div className="card-body d-flex">
                  <h1 className="card-title">
                    <i className="fab fa-ethereum"></i>
                  </h1>
                  <div>
                    <div className="mx-3">
                      <h5>How It Works !</h5>
                    </div>
                    <div className="text-warning mx-3">
                      Enter your Token Address - Enter Token Amount - Enter
                      Unlock Time - Approve - Lock
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="tablecontent mx-3 rounded">
          <table className="table table-bordered table-striped table-light">
            <thead className="position-sticky">
              <tr>
                <th scope="col">Transaction ID</th>
                <th scope="col">Token Name</th>
                <th scope="col">Token Symbol</th>
                <th scope="col">Token Amount</th>
                <th scope="col">UnlockTime</th>
                <th scope="col">Owner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {state.tnxs.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{state.tokname}</td>
                <td>{state.toksymbol}</td>
                <td>{item.amount}</td>
                <td>
                  <SimpleDateTime
                    dateFormat="DMY"
                    dateSeparator="/"
                    timeSeparator=":"
                  >
                    {item.unlockTime}
                  </SimpleDateTime>
                </td>
                <td>{item.owner}</td>
                <td>
                  <button
                    className="btn btn-success"
                    disabled={item.withdrawed}
                    onClick={() => {
                      handleWithdraw(item.id);
                    }}
                  >
                    Withdraw
                  </button>
                </td>
              </tr>
            ))} */}
            </tbody>
          </table>
        </div>

        <div className="row m-5 bg-primary rounded">
          <div className="col-sm-4 my-5">
            <div className="card">
              <div className="card-body">
                <h1>
                  <center>
                    <i className="fa fa-lock"></i>
                  </center>
                </h1>
                <center>
                  <h5 className="card-title">Lock Liquidity</h5>
                </center>
                <center className="card-text text-secondary">
                  Input your liquidity tokens into a time-released vault that
                  returns the tokens at a specified date.
                </center>
              </div>
            </div>
          </div>
          <div className="col-sm-4 my-5">
            <div className="card">
              <div className="card-body">
                <h1>
                  <center>
                    <i className="fa fa-laptop"></i>
                  </center>
                </h1>
                <center>
                  <h5 className="card-title">Public Facing Profile</h5>
                </center>
                <center className="card-text text-secondary">
                  Proudly display your locked tokens and vesting schedules to
                  the world as proof and feel relaxed.
                </center>
              </div>
            </div>
          </div>
          <div className="col-sm-4 my-5">
            <div className="card">
              <div className="card-body">
                <h1>
                  <center>
                    <i className="fa fa-lock"></i>
                  </center>
                </h1>
                <center>
                  <h5 className="card-title">Create a Custom Coin Lockup</h5>
                </center>
                <center className="card-text text-secondary">
                  Lock your liquidity or developer tokens in a few simple steps.
                  Our process is easy, fast and secure.
                </center>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="container footer">
            <hr className="mb-5" />

            <div className="row">
              <div className="col-lg-4 col-md-12 me-auto mb-3">
                <img
                  src={smartswap}
                  alt="brand-logo"
                  className="brand-logo"
                  style={{ height: "50px" }}
                />
              </div>

              <div className="col-lg-2 col-md-3 col ">
                <h5>Platform</h5>

                <li className="my-2 ">Explore</li>

                <li className="my-2">All Coin</li>

                <li className="my-2">About</li>

                <li className="my-2">TrustSwap</li>
              </div>

              <div className="col-lg-2 col-md-3 col">
                <h5>Lockups</h5>

                <li className="my-2">Create Lock</li>

                <li className="my-2">My Lockups</li>

                <li className="my-2">Help Locking</li>

                <li className="my-2">FAQ</li>
              </div>

              <div className="col-lg-2 col-md-3 col footer-list">
                <h5>Company</h5>

                <li className="my-2">Privacy Policy</li>

                <li className="my-2">Terms & Condition</li>

                <li className="my-2">GitBook</li>

                <li className="my-2">Help Center</li>
              </div>

              <div className="col-lg-2 col-md-3 col">
                <h5>Connect</h5>

                <li className="my-2">Facebook</li>

                <li className="my-2">Discord</li>

                <li className="my-2">Github</li>

                <li className="my-2">Twitter</li>
              </div>
            </div>

            <hr className="mt-5" />

            <span href="/">© 2022 SmartSwap All Rights Reserved.</span>
          </div>
        </div>
      </>
    );
  }
}

export default Connect;

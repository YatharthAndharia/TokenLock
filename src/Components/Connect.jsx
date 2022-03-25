import React, { useState } from "react";
import { ethers } from "ethers";
import "./connect.css";
import lock from "../lock.svg";
import laptop from "../laptop.svg";
import smartswap from "../smartswap.jpeg";
import Footer from "./Footer";

function Connect(props) {
  const [data, setData] = useState({
    balance: null,
  });

  if (props.stateData.isConnected) {
    return <></>;
  } else {
    return (
      <>
        <section className="bg-dark">
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

        <div className="row m-5 bg-dark rounded">
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

        <Footer />
      </>
    );
  }
}

export default Connect;

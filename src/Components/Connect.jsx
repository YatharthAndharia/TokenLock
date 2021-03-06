import React, { useState } from "react";
import { ethers } from "ethers";
import "./connect.css";
import lock from "../lock.svg";
import laptop from "../laptop.svg";
import smartswap from "../smartswap.jpeg";
import Footer from "./Footer";
import { useEffect } from "react";
import TokenLock from "../artifacts/contracts/TokenLock.sol/TokenLock.json";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import SimpleDateTime from "react-simple-timestamp-to-date";

function Connect(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const onLoad = async () => {
      const pro = new ethers.providers.JsonRpcProvider();
      const lockAddress = process.env.REACT_APP_LOCKCONTRACTADDRESS;
      const contract = new ethers.Contract(lockAddress, TokenLock.abi, pro);

      let arr = [];
      const ids = await contract.getAllIds();
      for (let i = 0; i < ids.length; i++) {
        const detail = await contract.getDetailsOf(i);
        const tok = new ethers.Contract(detail.tokenAddress, Token.abi, pro);
        //console.log(detail);
        var timeDiff1 =
          Math.floor(Date.now() / 1000) - parseInt(detail.lockedTime._hex, 16);
        var timeDiff2 =
          parseInt(detail.unlockTime._hex, 16) -
          parseInt(detail.lockedTime._hex, 16);
        var meterValue = timeDiff1 / timeDiff2;
        const symb = await tok.symbol();
        const name = await tok.name();
        const obj = {
          id: parseInt(detail.id._hex, 16),
          owner: detail.owner,
          tokenAddress: detail.tokenAddress,
          name: name,
          symb: symb,
          withdrawed: detail.withdrawed,
          amount: parseInt(detail.amount._hex, 16),
          unAmount: parseInt(detail.amountUnlocked._hex, 16),
          lockedTime: parseInt(detail.lockedTime._hex, 16),
          unlockTime: parseInt(detail.unlockTime._hex, 16),
          meter: meterValue,
        };
        arr.push(obj);
        // console.log(arr);
      }
      setData(arr);
    };
    onLoad();
  }, []);

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
                <th>Withdraw Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.symb}</td>
                  <td>{item.unAmount}</td>
                  <td>
                    <SimpleDateTime
                      dateFormat="DMY"
                      dateSeparator="/"
                      timeSeparator=":"
                    >
                      {item.unlockTime}
                    </SimpleDateTime>
                    <progress id="disk_d" value={item.meter}></progress>
                  </td>
                  <td>{item.owner}</td>
                  <td>{item.withdrawed ? "Withdrawn" : "Not Yet"}</td>
                </tr>
              ))}
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

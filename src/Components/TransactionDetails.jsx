import { useState } from "react";
import SimpleDateTime from "react-simple-timestamp-to-date";
import "./TransactionDetails.css";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import { ethers } from "ethers";

function TransactionDetails(props) {
  const tnxs = [];
  const [state, setState] = useState({});
  async function getDetails() {
    const ids = await props.stateData.lockContract.myTransactions();
    for (let i = 0; i < ids.length; i++) {
      const e = parseInt(ids[i]._hex, 16);
      const detail = await props.stateData.lockContract.getDetailsOf(i);
      const tok = new ethers.Contract(
        detail.tokenAddress,
        Token.abi,
        props.stateData.provider
      );
      var timeDiff1 =
        Math.floor(Date.now() / 1000) - parseInt(detail.lockedTime._hex, 16);
      var timeDiff2 =
        parseInt(detail.unlockTime._hex, 16) -
        parseInt(detail.lockedTime._hex, 16);
      var meterValue = timeDiff1 / timeDiff2;
      const obj = {
        id: parseInt(detail.id._hex, 16),
        owner: detail.owner,
        tokenAddress: detail.tokenAddress,
        symb: await tok.symbol(),
        name: await tok.name(),
        withdrawed: detail.withdrawed,
        amount: parseInt(detail.amount._hex, 16),
        unAmount: parseInt(detail.amountUnlocked._hex, 16),
        lockedTime: parseInt(detail.lockedTime._hex, 16),
        unlockTime: parseInt(detail.unlockTime._hex, 16),
        meter: meterValue,
      };
      tnxs.push(obj);
    }
    var tokname = await props.stateData.tokenContract.name();
    var toksymbol = await props.stateData.tokenContract.symbol();
    setState({ ...state, tnxs, tokname, toksymbol });
  }

  async function handleWithdraw(tnx_id) {
    await props.stateData.lockContract.withDrawToken(tnx_id);
  }

  if (props.stateData.isConnected && state.tnxs != null) {
    return (
      <>
        <br />
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
              {state.tnxs.map((item) => (
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
                    <br />
                    <progress id="disk_d" value={item.meter}></progress>
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
              ))}
            </tbody>
          </table>
        </div>
        <center>
          <button onClick={getDetails} className="btn btn-dark m-2">
            <i className="fa fa-refresh"></i>
          </button>
        </center>
      </>
    );
  } else if (props.stateData.isConnected) {
    return (
      <center>
        <button onClick={getDetails} className="btn btn-dark m-2">
          TransactionDetails
        </button>
      </center>
    );
  } else return <h1>Helloworld</h1>;
}
export default TransactionDetails;

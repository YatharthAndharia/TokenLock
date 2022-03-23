import { useState } from "react";
import { useRef } from "react";
import ContractAddress from "./ContractAddress";
import TransactionDetails from "./TransactionDetails";
import "./LockToken.css";

function LockToken(props) {
  const tokenAmount = useRef();
  const unlockTime = useRef();
  //console.log(unlockTime.current.value);
  var tokamount = 0;
  var untime = 0;
  var disable = true;
  const [state, setState] = useState({ disable });
  async function handleApprove() {
    tokamount = tokenAmount.current.value;
    untime = unlockTime.current.value;
    // console.log(Date.parse("15/03/2022, 13:40"));
    await props.stateData.tokenContract.approve(state.lock.address, tokamount);
    props.stateData.tokenContract.on("Approval", (owner, spender, value) => {
      setState({ ...state, disable: false, tokamount, untime });
      disable = false;
    });
    //console.log(props.stateData.tokenContract);
  }

  async function handleLock() {
    //console.log(await props.stateData.tokenContract.balanceOf(await props.stateData.account));
    await props.stateData.lockContract.lockToken(
      state.token.address,
      state.tokamount,
      state.untime
    );
    await props.stateData.lockContract.on("TokenLocked", async (id) => {
      const bal = await props.stateData.tokenContract.balanceOf(
        await props.stateData.account
      );
      const balance = parseInt(parseInt(bal._hex, 16));
      //console.log(balance);

      setState({ ...state, balance: balance, disable: true });
    });
    //const mapping = await props.stateData.lockContract.getMapping();
    //console.log(mapping);
  }
  async function contractData(contracts) {
    const bal = await contracts.tokenContract.balanceOf(
      props.stateData.account
    );
    const balance = parseInt(parseInt(bal._hex, 16));
    const symbol = await contracts.tokenContract.symbol();
    const name = await contracts.tokenContract.name();
    console.log(props.stateData.account);
    setState({
      ...state,
      balance: balance,
      symbol: symbol,
      name: name,
      token: contracts.tokenContract,
      lock: contracts.lockContract,
    });
  }
  if (props.stateData.isConnected && state.balance == null) {
    return (
      <>
        <ContractAddress
          stateData={props.stateData}
          getData={contractData}
          updateStateData={props.updateStateData}
        />
      </>
    );
  } else if (props.stateData.isConnected && state.balance != null) {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <div className="card bg-light mx-5 myCard">
          <div className="card-body bg-light">
            <center>
              <h4>
                <i className="fa fa-lock"></i> Configure Lock
              </h4>
            </center>
            <div>
              <br />
              <label> Token Amount</label>{" "}
              <input
                className="w-25 rounded"
                type="text"
                required
                ref={tokenAmount}
              />{" "}
              <label>Unlock Time</label>{" "}
              <input
                className="w-25 rounded"
                type="text" //"datetime-local"
                required
                ref={unlockTime}
              />
              <label>Balance:{state.balance}</label> <span>{state.symbol}</span>
            </div>
            <br />
            <div className="d-flex justify-content-evenly">
              <button onClick={handleApprove} className="btn btn-warning">
                Approve
              </button>
              <button
                id="lockbtn"
                onClick={handleLock}
                disabled={state.disable}
                className="btn btn-success"
              >
                Lock
              </button>
            </div>
          </div>
        </div>

        <TransactionDetails
          stateData={props.stateData}
          updateStateData={props.updateStateData}
        />
      </>
    );
  } else {
    return <></>;
  }
}
export default LockToken;

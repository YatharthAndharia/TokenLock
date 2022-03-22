import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/TokenLock.sol/TokenLock.json";
import { ethers } from "ethers";
import { useRef } from "react";
import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import "./ContractAddress.css";
const lockAddress =
  /*process.env.REACT_APP_LOCKCONTRACTADDRESS;*/ "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function ContractAddress(props) {
  console.log(lockAddress);
  const [state, setState] = useState({});
  const contractaddress = useRef();
  //   setState({ ...state, tokenAddress: contractaddress });
  const getContractAddress = async () => {
    //console.log(contractaddress.current.value);
    //setState({ ...state, contaddr: contractaddress.current.value });
    //console.log(state.contaddr);
    const signer = await props.stateData.provider.getSigner();
    const tokenContract = new ethers.Contract(
      contractaddress.current.value,
      Token.abi,
      signer
    );
    const lockContract = new ethers.Contract(lockAddress, Lock.abi, signer);
    props.updateStateData({ ...props.stateData, lockContract, tokenContract });
    props.getData({ tokenContract, lockContract });
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <br />
      <center>
        {/* <div className="container"> */}

        <div className="card bg-light mx-5">
          <center className="card-title my-1">
            <h5>
              <b>
                <i className="fa fa-lock"></i> Create New Lock
              </b>
            </h5>
          </center>
          <div className="card-body">
            <div className="card-title">
              <small className="textcolorgray">
                Enter the token address you would like to lock for
              </small>
            </div>
            <input
              className="form-control"
              type="text"
              ref={contractaddress}
            ></input>

            <small className="textcolorgray">
              e.g. 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
            </small>

            <p>
              <br />{" "}
              <button onClick={getContractAddress} className="btn btn-primary">
                Submit
              </button>
            </p>
          </div>
        </div>
        {/* </div> */}
      </center>
    </>
  );
}
export default ContractAddress;

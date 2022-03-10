import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/TokenLock.sol/TokenLock.json";
import { ethers } from "ethers";
import { useRef } from "react";
import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import "./ContractAddress.css";
const tokenAddress = "0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8";
const lockAddress = "0x851356ae760d987E095750cCeb3bC6014560891C";

function ContractAddress(props) {
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
      <br />
      <center>
        {/* <div className="container"> */}
        <div className="card bg-light mx-5">
          <div className="card-body">
            <h5 className="card-title">Enter Token Address</h5>
            <input type="text" ref={contractaddress}></input>

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

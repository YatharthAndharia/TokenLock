import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/TokenLock.sol/TokenLock.json";
import { ethers } from "ethers";
import { useRef } from "react";
import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
const tokenAddress = "0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8";
const lockAddress = "0x851356ae760d987E095750cCeb3bC6014560891C";

function ContractAddress(props) {
    const [state, setState] = useState({});
    const contractaddress = useRef();
    const getContractAddress = async () => {
        //console.log(contractaddress.current.value);
        //setState({ contaddr: contractaddress.current.value });
        //console.log(state.contaddr);
        const signer = await props.stateData.provider.getSigner();
        const tokenContract = new ethers.Contract(contractaddress.current.value, Token.abi, signer);
        const lockContract = new ethers.Contract(lockAddress, Lock.abi, signer);
        props.updateStateData({ ...props.stateData, lockContract, tokenContract });
        props.getData({ tokenContract, lockContract });
    }
    return (
        <>
            <input type="text" ref={contractaddress}></input>
            <button onClick={getContractAddress}>Submit</button><br />

        </>
    )
}
export default ContractAddress;
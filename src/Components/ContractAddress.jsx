import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/TokenLock.sol/TokenLock.json";
import { ethers } from "ethers";
import { useRef } from "react";
import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
const tokenAddress = "0xFD471836031dc5108809D173A067e8486B9047A3";
const lockAddress = "0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc";

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
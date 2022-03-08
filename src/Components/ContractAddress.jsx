import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/TokenLock.sol/TokenLock.json";
import { ethers } from "ethers";
import { useRef } from "react";
import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
const tokenAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";
const lockAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";

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
            <button onClick={getContractAddress}>Submit</button>

        </>
    )
}
export default ContractAddress;
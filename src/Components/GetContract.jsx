import { ethers } from "ethers";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/TokenLock.sol/TokenLock.json";
const tokenAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";
const lockAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";

function GetContract(props) {
    const setState = async () => {
        const signer = await props.stateData.provider.getSigner();
        const tokenContract = new ethers.Contract(tokenAddress, Token.abi, signer);
        const lockContract = new ethers.Contract(lockAddress, Lock.abi, signer);
        props.updateStateData({ ...props.stateData, lockContract, tokenContract });
        props.getData({ tokenContract, lockContract });
    };

    return <button onClick={setState}>GetTokenBalance</button>;
}
export default GetContract;
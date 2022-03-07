import LockToken from "./LockToken";
import { ethers } from "ethers";
import Token from '../artifacts/contracts/Token.sol/Token.json';
import TokenLock from '../artifacts/contracts/TokenLock.sol/TokenLock.json';
const tokenaddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const tokenlockaddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
async function ContractSetup(props) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const contractlock = new ethers.Contract(tokenlockaddress, TokenLock.abi, signer);
    const contracttoken = new ethers.Contract(tokenaddress, Token.abi, signer);
    console.log("Helloworld");
}
export default ContractSetup;
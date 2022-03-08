import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/TokenLock.sol/TokenLock.json";
import { ethers } from "ethers";
import { useRef } from "react";
import { useState } from "react";
const tokenAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";
const lockAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";

function TransactionDetails(props) {
    const tnxs = [];
    const [state, setState] = useState({
    });
    async function getDetails() {
        //const tnxs = [];
        const ids = await props.stateData.lockContract.myTransactions();
        //console.log(ids);
        for (let i = 0; i < ids.length; i++) {
            const detail = await props.stateData.lockContract.getDetailsOf(i);
            const obj = {
                id: parseInt(detail.id._hex, 16),
                owner: detail.owner,
                tokenAddress: detail.tokenAddress,
                withdrawed: detail.withdrawed,
                amount: parseInt(detail.amount._hex, 16),
                lockedTime: parseInt(detail.lockedTime._hex, 16),
                unlockTime: parseInt(detail.unlockTime._hex, 16),
            };
            tnxs.push(obj);
        }
        setState({ ...state, tnxs });
        //console.log();
    }

    if (props.stateData.isConnected) {
        return (
            <>
                <button onClick={getDetails}>getDetails</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            <th scope="col">Token</th>
                            <th scope="col">Amount</th>
                            <th scope="col">UnlockTime</th>
                            <th scope="col">Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.tnxs.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>DT</td>
                                <td>{item.amount}</td>
                                <td>{item.unlockTime}</td>
                                <td>{item.owner}</td>
                                <td />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )

    }
    else {
        return (<></>)
    }
}
export default TransactionDetails;
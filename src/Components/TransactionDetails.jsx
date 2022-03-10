import Token from "../artifacts/contracts/Token.sol/Token.json";
import Lock from "../artifacts/contracts/TokenLock.sol/TokenLock.json";
import { ethers } from "ethers";
import { useRef } from "react";
import { useState } from "react";
import SimpleDateTime from 'react-simple-timestamp-to-date';


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
            // const unlock = parseInt(detail.lockedTime._hex, 16);
            // console.log(unlock);
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
        var tokname = await props.stateData.tokenContract.name();
        var toksymbol = await props.stateData.tokenContract.symbol();
        //console.log(tokname, toksymbol);
        setState({ ...state, tnxs, tokname, toksymbol });
        //console.log();
    }

    async function handleWithdraw(tnx_id) {
        await props.stateData.lockContract.withDrawToken(tnx_id);

    }

    if (props.stateData.isConnected && state.tnxs != null) {
        return (
            <>
                {/* <div className="container"> */}
                <table className="table table-bordered table-striped table-light">
                    <thead>
                        <tr>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Token Name</th>
                            <th scope="col">Token Symbol</th>

                            <th scope="col">Token Amount</th>
                            <th scope="col">UnlockTime</th>
                            <th scope="col">Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.tnxs.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{state.tokname}</td>
                                <td>{state.toksymbol}</td>
                                <td>{item.amount}</td>
                                {/* <td>{item.unlockTime}</td> */}
                                <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{item.unlockTime}</SimpleDateTime></td>
                                <td>{item.owner}</td>
                                <td><button className="btn btn-success" disabled={item.withdrawed} onClick={() => { handleWithdraw(item.id) }}>Withdraw</button></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                {/* </div> */}
                <center><button onClick={getDetails}>TransactionDetails</button></center>
            </>
        )

    }
    else if (props.stateData.isConnected) {
        return (
            <button onClick={getDetails}>TransactionDetails</button>
        )
    }
    else
        return (<></>);
}
export default TransactionDetails;
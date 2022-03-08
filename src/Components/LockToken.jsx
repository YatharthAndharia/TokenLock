import GetContract from "./GetContract";
import { useState } from "react";
import { useRef } from "react";

function LockToken(props) {
    const tokenAmount = useRef();
    const unlockTime = useRef();
    var tokamount = 0;
    var untime = 0;
    const [state, setState] = useState({});
    async function handleApprove() {
        tokamount = tokenAmount.current.value;
        untime = unlockTime.current.value;
        //setState({ tokenAmount: tokens, unlockTime: time });
        console.log(state);
        await state.token.approve(state.lock.address, tokamount);
    }

    async function handleLock() {
        //console.log(untime);
        await props.stateData.lockContract.lockToken(
            state.token.address,
            tokamount,
            untime
        );
        //const mapping = await props.stateData.lockContract.getMapping();
        //console.log(mapping);
    }
    async function contractData(contracts) {
        const bal = await contracts.tokenContract.balanceOf(
            props.stateData.account
        );
        const balance = parseInt(parseInt(bal._hex, 16));
        const symbol = await contracts.tokenContract.symbol();
        console.log(props.stateData.account);
        setState({
            balance: balance,
            symbol: symbol,
            token: contracts.tokenContract,
            lock: contracts.lockContract,
        });
    }
    if (props.stateData.isConnected) {
        return (
            <>
                <GetContract
                    stateData={props.stateData}
                    getData={contractData}
                    updateStateData={props.updateStateData}
                />
                <label> Token Amount</label>
                <div>
                    <input
                        className="w-25 "
                        type="text"
                        required
                        ref={tokenAmount}
                    />
                </div>

                <div className="col-4 data-field">
                    <label>Balance:{state.balance}</label>
                    <span>{state.symbol}</span>
                </div>

                <div className="header d-flex">
                    <div className="col-8 data-field">
                        <label>Unlock Time</label>
                        <input
                            className="w-25"
                            type="text"
                            required
                            ref={unlockTime}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-evenly">
                    <button onClick={handleApprove}>Approve</button>
                    <button onClick={handleLock}>Lock</button>
                </div>
            </>
        );
    } else {
        return <h3>Please Connect Your Wallet First (:</h3>;
    }
}
export default LockToken;
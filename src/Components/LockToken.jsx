import GetContract from "./GetContract";
import { useState } from "react";
import { useRef } from "react";
import ContractAddress from "./ContractAddress";
import TransactionDetails from "./TransactionDetails";

function LockToken(props) {
    const tokenAmount = useRef();
    const unlockTime = useRef();
    var tokamount = 0;
    var untime = 0;
    var disable = true;
    const [state, setState] = useState({ disable });
    async function handleApprove() {
        tokamount = tokenAmount.current.value;
        untime = unlockTime.current.value;
        await state.token.approve(state.lock.address, tokamount);
        setState({ ...state, disable: false, tokamount, untime });
        //console.log(props.stateData.tokenContract);
    }

    async function handleLock() {
        //console.log(await props.stateData.tokenContract.balanceOf(await props.stateData.account));
        await props.stateData.lockContract.lockToken(
            state.token.address,
            state.tokamount,
            state.untime
        );
        await props.stateData.lockContract.on("TokenLocked", async (id) => {
            const bal = await props.stateData.tokenContract.balanceOf(
                await props.stateData.account
            );
            const balance = parseInt(parseInt(bal._hex, 16));
            console.log(balance);
            setState({ ...state, balance: balance });
        })
        //const mapping = await props.stateData.lockContract.getMapping();
        //console.log(mapping);
    }
    async function contractData(contracts) {
        const bal = await contracts.tokenContract.balanceOf(
            props.stateData.account
        );
        const balance = parseInt(parseInt(bal._hex, 16));
        const symbol = await contracts.tokenContract.symbol();
        const name = await contracts.tokenContract.name();
        console.log(props.stateData.account);
        setState({
            ...state,
            balance: balance,
            symbol: symbol,
            name: name,
            token: contracts.tokenContract,
            lock: contracts.lockContract,
        });
    }
    if (props.stateData.isConnected) {
        return (
            <>
                <ContractAddress
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
                    <button id="lockbtn" onClick={handleLock} disabled={state.disable}>Lock</button>
                </div>

            </>
        );
    } else {
        return <h3>Please Connect Your Wallet First (:</h3>;
    }
}
export default LockToken;
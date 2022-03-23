import { ethers } from "ethers";

function Table(props) {
  console.log(process.env.REACT_APP_LOCKCONTRACTADDRESS);
  const addr = process.env.REACT_APP_LOCKCONTRACTADDRESS;
  //   const lockcontract=new ethers.Contract(addr,)
  const handleOnClick = async () => {
    const allids = await addr.getAllIds();
    console.log(allids);
  };
  return (
    <>
      <button onClick={handleOnClick}>Transactions</button>
      <div className="tablecontent mx-3 rounded">
        <table className="table table-bordered table-striped table-light">
          <thead className="position-sticky">
            <tr>
              <th scope="col">Transaction ID</th>
              <th scope="col">Token Name</th>
              <th scope="col">Token Symbol</th>
              <th scope="col">Token Amount</th>
              <th scope="col">UnlockTime</th>
              <th scope="col">Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {state.tnxs.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{state.tokname}</td>
                <td>{state.toksymbol}</td>
                <td>{item.amount}</td>
                <td>
                  <SimpleDateTime
                    dateFormat="DMY"
                    dateSeparator="/"
                    timeSeparator=":"
                  >
                    {item.unlockTime}
                  </SimpleDateTime>
                </td>
                <td>{item.owner}</td>
                <td>
                  <button
                    className="btn btn-success"
                    disabled={item.withdrawed}
                    onClick={() => {
                      handleWithdraw(item.id);
                    }}
                  >
                    Withdraw
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Table;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TransactionDetails from "./Components/TransactionDetails";
import Connect from "./Components/Connect";
import LockToken from "./Components/LockToken";
import Navbar from "./Components/Navbar";

function App() {
  const [state, setState] = useState({
    isConnected: false,
  });
  return (
    <div>
      <Navbar stateData={state} updateStateData={setState} />
      <Connect stateData={state} updateStateData={setState} />

      <LockToken stateData={state} updateStateData={setState} />
      {/* <TransactionDetails stateData={state} updateStateData={setState} /> */}
      <br></br>
    </div>
  );
}

export default App;

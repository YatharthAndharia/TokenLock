import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import Connect from "./Components/Connect";
import LockToken from "./Components/LockToken";
function App() {
  const [state, setState] = useState({
    isConnected: false,
  });
  return (
    <div>
      <Connect stateData={state} updateStateData={setState} />
      <LockToken stateData={state} updateStateData={setState} />
      <br></br>
    </div>
  );
}

export default App;
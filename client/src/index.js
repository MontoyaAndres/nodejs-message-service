import React from "react";
import ReactDOM from "react-dom";

import Context from "./context";
import App from "./App";

ReactDOM.render(
  <Context.Provider>
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <div className="boco-react">
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "modern-normalize/modern-normalize.css";
import { StoreProvider } from "./connection/storeProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

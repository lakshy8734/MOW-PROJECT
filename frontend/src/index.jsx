import React from "react";
import './index.css'
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={'146410129507-a5kdnm9vhuctitkfladdu4db7pv3t1oe.apps.googleusercontent.com'}>
      <App />
    </GoogleOAuthProvider>
    <ToastContainer style={{zIndex: "999999999"}}/>
  </React.StrictMode>,
  document.getElementById("root")
  
);

// process.env.YOUR_CLIENT_ID
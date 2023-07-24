import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const domain = process.env.REACT_APP_DOMAIN_ID;
const clientID = process.env.REACT_APP_CLIENT_ID;
const apiAudience = process.env.REACT_APP_AUDIENCE;
root.render(
  // <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        useRefreshTokens: true,
        redirect_uri: window.location.origin,
        ignoreCache: true,
        audience: apiAudience,
        // organization: "org_4UAey1mek2Dm0ZCZ", // Dev1 Concepcion Organization
      }}
    >
      <App />
    </Auth0Provider>
  // </React.StrictMode>
);

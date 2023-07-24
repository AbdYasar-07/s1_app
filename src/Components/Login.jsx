import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const login = async () => {
    await loginWithRedirect();
  };
  return (
    <div>
      <button
        className="btn btn-primary buttonStyle p-2 "
        onClick={() => login()}
      >
        Login
      </button>
    </div>
  );
};

export default Login;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout } = useAuth0();

  const onLogout = async () => {
    logout()
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("auth_access_token");
        localStorage.removeItem("user_profile");
      })
      .catch((error) => {
        console.error("Error while logging out ::", error);
      })
      .finally(() => {
        console.log("removed local storages..");
      });
  };

  return (
    <div>
      <button
        className="btn btn-primary buttonStyle"
        onClick={() => onLogout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Styles/Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import Logout from "./Logout";

const Header = ({ user }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <header>
      <nav
        class="d-block position-relative"
        style={{ padding: "0", boxShadow: "5px 5px 5px #adadad !important" }}
      >
        <div class="d-flex justify-content-between align-items-center ms-5">
          <div>
            <img
              src="https://cdn.auth0.com/styleguide/latest/lib/logos/img/logo-blue.svg"
              alt="auth0"
              width="100"
              height="100"
              className="ms-3 me-5"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSSetZHth0LHil6EGxW5ngEMCLEzKEyWrlaA&usqp=CAU"
              alt="Conception"
              width="120"
              height="100"
              className="ms-3 me-3"
            />
          </div>
          {/* <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button> */}
          <div class="justify-content-end" id="navbarNav">
            <div style={{ position: "absolute", right: "8px", top: "41px" }}>
              {!isAuthenticated && <Login />}
              {isAuthenticated && <Logout />}
            </div>
            {isAuthenticated && (
              <div
                class=""
                style={{
                  position: "absolute",
                  right: "128px",
                  bottom: "18px",
                }}
              >
                <span style={{ marginRight: "15px" }}>Hello, {user?.name}</span>
                <img
                  src={user?.picture}
                  alt="user profile"
                  class="rounded-circle"
                  width="50"
                  height="50"
                />
              </div>
            )}
          </div>
        </div>
        <div style={{ marginRight: "10px" }}></div>
      </nav>
    </header>
  );
};

export default Header;

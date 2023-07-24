/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Axios from "../../Utils/Axios";
import Tabs from "./Tabs";
import "../Styles/NestedContent.css";
import { useNavigate, useParams } from "react-router-dom";

const NestedContent = ({setIsProfileRendered, isProfileRendered}) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const resource = process.env.REACT_APP_AUTH_EXT_RESOURCE;

  const getUserProfile = async (accessToken, userId) => {
    await Axios(resource + `/users/${userId}`, "GET", null, accessToken)
      .then((userProfile) => {
        setUserProfile(userProfile);
        localStorage.setItem("user_profile", JSON.stringify(userProfile));
        setIsProfileRendered(true);
      })
      .catch((error) => {
        console.error("Error while fetching user information ::", error);
      });
  };

  useEffect(() => {
    const callUserProfile = async () => {
      await getUserProfile(localStorage.getItem("auth_access_token"), userId);
    };
    callUserProfile();
    navigate(`/users/${userId}/profile`);
  }, [isProfileRendered]);
  return (
    <>
      <div
        className="d-flex align-items-center pt-2 pb-2 container profileHeader"
        style={{
          backgroundColor: "rgb(204 204 204 / 18%)",
          height: "150px !important",
        }}
      >
        <div className="col-2">
          <img
            src={userProfile.picture}
            alt="user profile"
            class="rounded-circle"
            width="80"
            height="80"
          />
        </div>
        <div className="col-6 text-start">
          <h2 className="fw-normal">{userProfile.name}</h2>
          <h5 className="fw-light text-secondary">{userProfile.email}</h5>
        </div>
      </div>
      <Tabs tabs={["Profile", "Groups", "Roles"]} />
    </>
  );
};

export default NestedContent;

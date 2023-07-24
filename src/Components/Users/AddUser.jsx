import React, { useEffect, useState } from "react";
import Axios from "../../Utils/Axios";
import "../Styles/AddUser.css";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUser({ setIsUserAdded, isTokenFetched }) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [listOfConnnection, setlistOfConnnection] = useState([]);
  const [databaseConnection, setDatabaseConnection] = useState("");
  const [userNameValidation, setUserNameValidation] = useState(false);
  const [emailReqdValidation, setEmailReqdValidation] = useState(false);
  const [validation, setValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [isConnection, setIsConnection] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordCapableValidation, setPasswordCapableValidation] =
    useState(false);
  const [isPassWordValue, setIsPasswordValue] = useState(false);
  const [repeatPasswordValidation, setRepeatPasswordValidation] =
    useState(false);
  const [userModal, setUserModal] = useState(false);
  const [isModelView, setIsModelView] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const initializeFileds = () => {
    setIsDisable(false);
    setIsConnection(false);
    setUserModal(true);
    setValidation(false);
    setUserNameValidation(false);
    setEmailReqdValidation(false);
    setEmailValidation(false);
    setPasswordValidation(false);
    setPasswordCapableValidation(false);
    setRepeatPasswordValidation(false);
    setIsPasswordValue(false);
    setUserEmail("");
    setUsername("");
    setUserPassword("");
    setDatabaseConnection("");
    setRepeatPassword("");
    if (localStorage.getItem("access_token")?.length > 0) {
      setIsModelView(true);
    }
  };

  const getAuthToken = async () => {
    let body = {
      client_id: process.env.REACT_APP_AUTH_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH_MANAGEMENT_CLIENT_SECRET,
      audience: process.env.REACT_APP_AUTH_MANAGEMENT_AUDIENCE,
      grant_type: process.env.REACT_APP_AUTH_GRANT_TYPE,
    };
    return await Axios(
      "https://dev-34chvqyi4i2beker.jp.auth0.com/oauth/token",
      "POST",
      body,
      null
    )
      .then(async (managementToken) => {
        return managementToken;
      })
      .catch((error) => {
        return "Error ::", error;
      });
  };
  const getDatabaseConnections = async () => {
    // console.log(localStorage.getItem("access_token"));
    // check whether the access_token is valid or not
    if (localStorage.getItem("access_token")?.length > 0) {
      await getAuthToken()
        .then(async (managementToken) => {
          await Axios(
            "https://dev-34chvqyi4i2beker.jp.auth0.com/api/v2/connections?strategy=auth0",
            "GET",
            null,
            managementToken?.access_token
          )
            .then((databaseNames) => {
              setlistOfConnnection(databaseNames);
            })
            .catch((error) => {
              console.error("Error while fetching Auth0 Databases ::", error);
            });
        })
        .catch((error) => {
          console.error("Error while fetching mangement token :::", error);
        });
    }
  };

  const createUser = async () => {
    // check whether the access_token is valid or not
    if (localStorage.getItem("access_token")?.length > 0) {
      await getAuthToken().then(async (managementToken) => {
        let body = {
          email: userEmail,
          name: userName,
          connection: databaseConnection,
          password: userPassword,
        };
        await Axios(
          "https://dev-34chvqyi4i2beker.jp.auth0.com/api/v2/users",
          "POST",
          JSON.stringify(body),
          managementToken?.access_token,
          true
        )
          .then((addedUser) => {
            // console.log("added user", addedUser);
            if (addedUser.hasOwnProperty("response")) {
              console.log(addedUser.response.data.message, "addedUser");
              toast(addedUser.response.data.message, { type: "error" });
              setIsDisable(false);
              return;
            }
            toast(`${addedUser.name} is added`, { type: "success" });
            setUserModal(false);
            setIsUserAdded(true);
          })
          .catch((error) => {
            console.log("error :::", JSON.stringify(error));
            if (JSON.stringify(error) !== "{}") {
              toast(error.response.data.message, { type: "error" });
              setIsDisable(false);
            }
          });
      });
    }
  };
  const isemailvalidate = () => {
    let emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      userEmail
    );
    !emailValidation ? setEmailValidation(true) : setEmailValidation(false);
    if (!userEmail.trim()) {
      setEmailReqdValidation(true);
      // setValidation(true); 
    }
  };

  const isPassWordValidate = () => {
    setIsPasswordValue(true);
    let passwordValidate =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{5,}$/.test(
        userPassword
      );
    !passwordValidate
      ? setPasswordCapableValidation(true)
      : setPasswordCapableValidation(false);
  };
  const isConnectionValidate = () => {
    // console.log(databaseConnection);
    databaseConnection.length === 0
      ? setIsConnection(true)
      : setIsConnection(false);
  };

  const comparePassword = () => {
    setRepeatPasswordValidation(true);
    userPassword !== repeatPassword
      ? setPasswordValidation(true)
      : setPasswordValidation(false);
  };

  const getUserData = () => {
    isConnectionValidate();
    setValidation(true);
    setUserNameValidation(true);
    setEmailReqdValidation(true);
    setIsPasswordValue(true);
    setRepeatPasswordValidation(true);

    if (
      !(
        repeatPasswordValidation &&
        isPassWordValue &&
        passwordCapableValidation &&
        emailValidation &&
        passwordValidation &&
        databaseConnection.length !== 0
      ) &&
      userName.length !== 0 &&
      userEmail.length !== 0 &&
      userPassword.length !== 0 &&
      databaseConnection.length !== 0
    ) {
      createUser();
      setIsUserAdded(false);
      setIsDisable(true);
    }
  };
  const toggleButton = () => {
    setUserModal(false);
  };
  const handleBlur = () => {
    if (!userName.trim()) {
      setUserNameValidation(true);
      // setValidation(true); 
    }
  };
  useEffect(() => {
    const init = () => {
      getDatabaseConnections();
    };
    init();
  }, [isTokenFetched]);

  useEffect(() => {
    const init1 = () => {
      isConnectionValidate();
    };
    init1();
  }, [databaseConnection]);
  return (
    <div className={`${!isTokenFetched ? "cursorDisable" : ""}`}>
      <ToastContainer />
      <button
        type="button"
        class="btn btn-primary"
        disabled={!isTokenFetched}
        onClick={() => initializeFileds()}
      >
        + Create user
      </button>
      {isModelView && userModal && (
        <div className="customModal transitionEffect">
          <div className="col-3 m-auto">
            <div class="modal-content container col-4">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Create User <FaUser style={{ marginBottom: "4px" }} />
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => toggleButton()}
                ></button>
              </div>
              <div class="modal-body">
                <form class="row g-2 needs-validation">
                  <div class="mb-3 text-start">
                    <label for="recipient-name" class="col-form-label">
                      Name<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="userEmail"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                      onBlur={handleBlur}
                    />
                    {userNameValidation && !userName && (
                      <p className="text-danger mt-1 mb-0">
                        Name is required *
                      </p>
                    )}
                  </div>
                  <div class="mb-3 text-start">
                    <label for="recipient-name" class="col-form-label">
                      Email<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="userEmail"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      onBlur={isemailvalidate}
                    />
                    {emailReqdValidation && !userEmail && (
                      <p className="text-danger mt-1 mb-0">
                        Email is required *
                      </p>
                    )}
                    {userEmail && emailValidation && (
                      <p className="text-danger mt-1 mb-0">
                        Enter valid e-mail *
                      </p>
                    )}
                  </div>
                  <div class="mb-3 text-start">
                    <label for="recipient-name" class="col-form-label">
                      Password<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="userPassword"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      onBlur={isPassWordValidate}
                    />
                    {isPassWordValue && !userPassword && (
                      <p className="text-danger mt-1 mb-0">
                        Password is required
                      </p>
                    )}
                    {userPassword &&
                      passwordCapableValidation &&
                      isPassWordValue && (
                        <p className="text-danger">
                          Password should have atleast 5 characters and special
                          characters
                        </p>
                      )}
                  </div>
                  <div class="mb-3 text-start">
                    <label for="recipient-name" class="col-form-label">
                      Repeat Password<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="repeatePassword"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      onBlur={comparePassword}
                    />
                    {repeatPasswordValidation && !repeatPassword && (
                      <p className="text-danger mt-1 mb-0">
                        Repeated Password is required
                      </p>
                    )}
                    {repeatPassword && passwordValidation && (
                      <p className="text-danger">
                        Repeat password should be same as password
                      </p>
                    )}
                  </div>
                  <div>
                    <label for="conection" className="pe-4 d-block text-start">
                      Connection <span className="text-danger ms-2">*</span>
                    </label>
                    <select
                      className="w-100 form-control"
                      onChange={(e) => {
                        setDatabaseConnection(e.target.value);
                      }}
                      onBlur={isConnectionValidate}
                    >
                      <option value={""}> None </option>
                      {listOfConnnection.length > 0 &&
                        listOfConnnection?.map((dataBase, index) => {
                          return (
                            <option value={dataBase.name} key={index}>
                              {dataBase.name}
                            </option>
                          );
                        })}
                      {listOfConnnection.length == 0 && (
                        <option value={""}>No data base found</option>
                      )}
                    </select>
                    {validation && isConnection && (
                      <p className="text-start text-danger">
                        Connection is required
                      </p>
                    )}
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={toggleButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={() => getUserData()}
                  disabled={isDisable}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;

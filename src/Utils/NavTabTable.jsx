import React, { useEffect, useState } from "react";
import Axios from "./Axios";
import { useParams } from "react-router";
import AppSpinner from "./AppSpinner";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const NavTabTable = ({
  showTable,
  columns,
  isAdded,
  setIsAdded,
  showDeleteButton,
  scope,
  isDeleted,
  setIsDeleted,
  isUserAllGroups,
  isUserAllRoles,
  isRoles,
}) => {
  const [userGroups, setUserGroups] = useState([]);
  const { userId } = useParams();
  const resource = process.env.REACT_APP_AUTH_EXT_RESOURCE;
  const [loadSpinner, setLoadSpinner] = useState(false);
  const [userAllGroups, setUserAllGroups] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [userAllRoles, setUserAllRoles] = useState([]);

  const loaction = useLocation();
  const [tableValue, setTableValue] = useState(false);

  const getUserGroups = async (accessToken, userId) => {
    await Axios(resource + `/users/${userId}/groups`, "GET", null, accessToken)
      .then((groups) => {
        setUserGroups(groups);
        setIsAdded(false);
      })
      .catch((error) => {
        console.error("Error while fetching user groups :::", error);
      })
      .finally(() => {
        setLoadSpinner(false);
      });
  };

  const getUserAllGroups = async (accessToken, userId) => {
    await Axios(
      resource + `/users/${userId}/groups/calculate`,
      "GET",
      null,
      accessToken
    )
      .then((response) => {
        setUserAllGroups(response);
      })
      .catch((error) => {
        console.error(
          "Error while getting user's calculated all groups :::",
          error
        );
      })
      .finally(() => setLoadSpinner(false));
  };

  const fetchUserRoles = async () => {
    await Axios(
      resource + `/users/${userId}/roles`,
      "GET",
      null,
      localStorage.getItem("auth_access_token")
    ).then(async (roles) => {
      let appIds = [];
      roles.forEach((role) => appIds.push(role.applicationId));
      await getManagementToken().then(async (tkn) => {
        await getClientInformation(tkn, appIds, isUserAllRoles, roles).then(
          () => {
            setLoadSpinner(false);
          }
        );
      });
    });
  };

  const getUserAllRoles = async (accessToken, userId) => {
    await Axios(
      resource + `/users/${userId}/roles/calculate`,
      "GET",
      null,
      accessToken
    ).then(async (allRoles) => {
      let appIds = [];
      allRoles.forEach((role) => appIds.push(role.applicationId));
      await getManagementToken().then(async (tkn) => {
        await getClientInformation(tkn, appIds, isUserAllRoles, allRoles).then(
          () => {
            setLoadSpinner(false);
          }
        );
      });
    });
  };

  const getManagementToken = async () => {
    let managementApi = process.env.REACT_APP_MANAGEMENT_API;
    let data = {
      client_id: process.env.REACT_APP_AUTH_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH_MANAGEMENT_CLIENT_SECRET,
      audience: process.env.REACT_APP_AUTH_MANAGEMENT_AUDIENCE,
      grant_type: "client_credentials",
    };

    return await Axios(managementApi, "POST", data, null, true)
      .then((response) => {
        return response?.access_token;
      })
      .catch((error) => {
        console.error("error ::", error);
      });
  };

  const getClientInformation = async (
    managementToken,
    appIds,
    isUserAllRoles,
    roles
  ) => {
    const clients = process.env.REACT_APP_AUTH_GET_CLIENT;
    const promises = appIds.map((appId) => {
      return Axios(
        clients + `/${appId}?fields=client_id%2Cname`,
        "GET",
        null,
        managementToken,
        false
      );
    });

    const responses = await Promise.all(promises);
    const map = new Map();
    responses.forEach((response) => {
      map.set(response?.client_id, response?.name);
    });

    roles.map((role) => {
      role.applicationName = map.get(role.applicationId);
      return { ...role };
    });
    if (!isUserAllRoles) {
      setUserRoles(roles);
    }

    if (isUserAllRoles) {
      setUserAllRoles(roles); 
    }
  };

  const remove = async (id, scope) => {
    setLoadSpinner(true);
    const resource = process.env.REACT_APP_AUTH_EXT_RESOURCE;
    switch (scope?.toLowerCase()) {
      case "group": {
        await Axios(
          resource + `/groups/${id}/members`,
          "DELETE",
          [`${userId}`],
          localStorage.getItem("auth_access_token")
        )
          .then((response) => {
            setIsDeleted(true);
          })
          .catch((error) => {
            console.error(
              `Error while removing user from a ${scope} :::`,
              error
            );
          });
        break;
      }
      case "roles": {
        await Axios(
          resource + `/users/${userId}/roles`,
          "DELETE",
          [`${id}`],
          localStorage.getItem("auth_access_token")
        )
          .then((response) => {
            setIsDeleted(true);
          })
          .catch((error) => {
            console.error(
              `Error while removing user from a ${scope} :::`,
              error
            );
          });
        break;
      }
      default: {
        console.log("Default case worked...");
        setLoadSpinner(false);
      }
    }
  };

  useEffect(() => {
    setLoadSpinner(true);
    if (!isRoles && !isUserAllGroups) {
      const callUserGroups = async () => {
        await getUserGroups(
          localStorage.getItem("auth_access_token") || "",
          userId
        );
      };

      callUserGroups();
    }
    if (!isRoles && isUserAllGroups) {
      getUserAllGroups(localStorage.getItem("auth_access_token") || "", userId);
    }

    if (isRoles) {
      if (!isUserAllRoles) {
        fetchUserRoles();
      }
      if (isUserAllRoles) {
        getUserAllRoles(
          localStorage.getItem("auth_access_token") || "",
          userId
        );
      }
    }
  }, [isAdded, isDeleted]);

  useEffect(() => {
    if (loaction.pathname.endsWith("allroles")) {
      scope = "All-Roles";
    }
    switch (scope) {
      case "Group":
        userGroups.length == 0 ? setTableValue(true) : setTableValue(false);
        break;
      case "All-Groups":
        userAllGroups.length == 0 ? setTableValue(true) : setTableValue(false);
        break;
      case "Roles":
        userRoles.length == 0 ? setTableValue(true) : setTableValue(false);
        break;
      case "All-Roles":
        userAllRoles.length == 0 ? setTableValue(true) : setTableValue(false);
        break;
    }
  }, [userGroups, userAllGroups, userRoles, userAllRoles]);
  return (
    <>
      {loadSpinner && <AppSpinner />}
      {!loadSpinner && showTable && (
        <div>
          <table class="table">
            <thead>
              <tr>
                {columns.map((column, index) => {
                  return (
                    <th scope="col" key={index + 1}>
                      {column}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {!isRoles &&
                userGroups &&
                userGroups?.map((group, index) => {
                  return (
                    <tr key={group._id} title={group.name}>
                      <td id={group._id}>{group.name}</td>
                      <td key={index} id={group._id}>
                        {group.description}
                      </td>
                      {showDeleteButton && (
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => remove(group._id, scope)}
                          >
                            <FaTimes />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              {!isRoles &&
                userAllGroups &&
                userAllGroups?.map((group) => {
                  return (
                    <tr key={group._id} title={group.name}>
                      <td id={group._id}>{group.name}</td>
                      <td id={group._id} title={group.description}>
                        {group.description}
                      </td>
                      {showDeleteButton && (
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => remove(group._id, scope)}
                          >
                            <FaTimes />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              {isRoles &&
                userRoles &&
                userRoles?.map((role) => {
                  return (
                    <tr key={role._id} title={role.name}>
                      <td title={role.name}>{role.name}</td>
                      <td title={role.applicatioName}>
                        {role.applicationName}
                      </td>
                      <td title={role.description}>{role.description}</td>
                      {showDeleteButton && (
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => remove(role._id, scope)}
                          >
                            <FaTimes />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              {isRoles &&
                userAllRoles &&
                userAllRoles.map((role) => {
                  return (
                    <tr key={role._id} title={role.name}>
                      <td title={role.name} id={role._id}>
                        {role.name}
                      </td>
                      <td
                        title={role.applicationName}
                        id={role.applicationName}
                      >
                        {role.applicationName}
                      </td>
                      <td id={role._id} title={role.description}>
                        {role.description}
                      </td>
                      {showDeleteButton && (
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => remove(role._id, scope)}
                          >
                            <FaTimes />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      {!loadSpinner && tableValue && <p className="text-center fw-bold fs-6">No {scope.toLowerCase()} were found</p>}
    </>
  );
};

export default NavTabTable;

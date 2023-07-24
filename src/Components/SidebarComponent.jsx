/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Styles/SidebarComponent.css";
import Content from "./Contents/Content";
import { FaUserAlt } from "react-icons/fa";
import NestedContent from "./Contents/NestedContents";
import { Link, Outlet } from "react-router-dom";

const SidebarComponent = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-2 col-lg-2 col-xxl-2 col-xl-2 px-sm-2 px-0 ">
            {/* <div  className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"> */}
            <div className="text-white min-vh-100">
              <a className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none justi justify-content-center">
                <span
                  className="fs-5 d-none d-sm-inline "
                  style={{
                    marginTop: "20px",
                    color: "black",
                    padding: "10px",
                    background: "#adadad50",
                    fontFamily: "sans-serif",
                    borderRadius: "10px",
                  }}
                >
                  SUPER USER AUTH APP <FaUserAlt style={{ margin: "5px" }} />
                </span>
              </a>
              <ul
                // className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start "
                className="p-0 d-inline-block"
                id="menu"
                // style={{marginTop:"50px",marginLeft:"40px"}}
              >
                <li className="nav-item mt-2">
                  <Link
                    to={"/users"}
                    className="links nav-link align-middle px-0"
                  >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">User</span>
                  </Link>
                </li>
                <li className=" mt-2">
                  <a
                    data-bs-toggle="collapse"
                    className="links nav-link px-0 align-middle"
                  >
                    <i className="fs-4 bi-speedometer2"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Groups</span>{" "}
                  </a>
                </li>
                <li className=" mt-2">
                  <a className="links nav-link px-0 align-middle">
                    <i className="fs-4 bi-table"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Roles</span>
                  </a>
                </li>
                <li className=" mt-2">
                  <a className="links ripple nav-link px-0 align-middle">
                    <i className="fs-4 bi-table"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Permissions</span>
                  </a>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <div className="col py-3">
            <Content/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;

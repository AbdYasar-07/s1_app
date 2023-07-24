import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Tabs({ tabs }) {
  const { userId } = useParams();
  const navigate=useNavigate();

  const tabNavigation = (paths) => { 
    navigate(`/users/${userId}/${paths.toLowerCase()}`);
  };
  return (
    <div className="d-flex container">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index + 1}
                class={`${index === 0 ? "nav-link active" : "nav-link"}`}
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
                onClick={() => tabNavigation(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Tabs;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./Components/AppLayout";
import Content from "./Components/Contents/Content";
import ContentOutlet from "./Components/Contents/ContentOutlet";
import { CodeSnippet } from "./Utils/CodeSnippet";
import NestedContentOutlet from "./Components/Contents/NestedContentOutlet";
import Roles from "./Components/Users/Roles";
import GroupsOutlet from "./Components/Contents/GroupsOutlet";
import Groups from "./Components/Users/Groups";
import AllGroups from "./Components/Users/AllGroups";
import { useEffect, useState } from "react";
import RolesOutlet from "./Components/Contents/RolesOutlet";
import AllRoles from "./Components/Users/AllRoles";

function App() {
  const [isProfileRendered, setIsProfileRendered] = useState(false);
  const [loggedUserProfile, setLoggedUserProfile] = useState([]);
  useEffect(() => {
    setLoggedUserProfile(
      JSON.stringify(JSON.parse(localStorage.getItem("user_profile")), null, 2)
    );
    setIsProfileRendered(false);
  }, [isProfileRendered]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="users" element={<Content />}>
              <Route index element={<ContentOutlet />}></Route>
              <Route
                path=":userId"
                element={
                  <NestedContentOutlet
                    setIsProfileRendered={setIsProfileRendered}
                    isProfileRendered={isProfileRendered}
                  />
                }
              >
                <Route
                  path="profile"
                  element={
                    <CodeSnippet
                      title="User Profile"
                      code={loggedUserProfile}
                    />
                  }
                ></Route>
                <Route path="groups" element={<GroupsOutlet />}>
                  <Route path="show" element={<Groups />}></Route>
                  <Route path="allgroups" element={<AllGroups />}></Route>
                </Route>
                <Route path="roles" element={<RolesOutlet />}>
                  <Route path="show" element={<Roles />}></Route>
                  <Route path="allroles" element={<AllRoles />}></Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

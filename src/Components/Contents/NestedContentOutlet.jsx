import React from "react";
import { Outlet } from "react-router-dom";
import NestedContent from "./NestedContents";

const NestedContentOutlet = ({setIsProfileRendered,isProfileRendered}) => {
  return (
    <div>
      <NestedContent setIsProfileRendered={setIsProfileRendered}/>
      <Outlet />
    </div>
  );
};

export default NestedContentOutlet;

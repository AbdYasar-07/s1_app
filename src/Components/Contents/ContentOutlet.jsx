import React, { useState } from "react";
import ContentHeader from "../Contents/ContentHeader";
import ContentBody from "../Contents/ContentBody";
import AddUser from "../Users/AddUser";

const ContentOutlet = () => {
  const [isUserAdded, setIsUserAdded] = useState(false);
  const [isTokenFetched, setIsTokenFteched] = useState(false);

  return (
    <div className="container">
      <ContentHeader
        title="Users"
        description="Open a user to add them to a group or assign them to a role"
      />
      <div className="position-relative mt-5 p-0">
        <ContentBody
          isUserAdded={isUserAdded}
          setIsTokenFteched={setIsTokenFteched}
        />
        <div className="position-absolute top-0 end-0 p-0 me-4">
          <AddUser
            setIsUserAdded={setIsUserAdded}
            isTokenFetched={isTokenFetched}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentOutlet;

import React from "react";
import { ApplicationNavigation } from "../../../routes/MainRoutes";

function Users() {
  return (
    <div>
      <div className="container mt-5 mb-5">
        <ApplicationNavigation links={[]} pageTitle={"Users"} />

        <div className="row"></div>
      </div>
    </div>
  );
}

export default Users;

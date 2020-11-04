import React, { useContext } from "react";

// Utilities and Context
import "./style.css";
import UserContext from "../../utils/UserContext";

// Components
import Dropdown from "../../components/Dropdown";

function DashPage() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Dropdown />
      <div className="welcome">
        <h1 className="welcome-text">Welcome</h1>
        <br />
        <h1 className="name-text">{user.firstname}</h1>
      </div>
    </>
  );
}

export default DashPage;

import React from "react";

// Utilities and Context
import "./style.css";

// Components
import Dropdown from "../../components/Dropdown";

function DashPage() {
  return (
    <>
      <Dropdown />
      <div className="welcome">
        <h1 className="welcome-text">Welcome</h1>
        <br />
        <h1 className="name-text">Ryan</h1>
      </div>
    </>
  );
}

export default DashPage;

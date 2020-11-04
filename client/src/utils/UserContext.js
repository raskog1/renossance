import React from "react";

const UserContext = React.createContext({
  user: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    department: "",
  },
  setUser: () => {},
});

export default UserContext;

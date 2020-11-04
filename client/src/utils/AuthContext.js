import React from "react";

const AuthContext = React.createContext({
  authData: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
  },
  setAuth: () => {},
});

export default AuthContext;

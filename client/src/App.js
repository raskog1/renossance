import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

// Utilities and Context
import "./App.css";
import AuthContext from "./utils/AuthContext";
import UserContext from "./utils/UserContext";

// Components
import LoginPage from "./pages/LoginPage";
import DashPage from "./pages/DashPage";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5a2d81",
      contrastText: "#fff",
    },
    secondary: {
      main: "#63727a",
      contrastText: "#fff",
    },
  },
});

function App() {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
  });

  const [userState, setUserState] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    department: "",
  });

  useEffect(() => {
    if (localStorage.token) {
      axios.defaults.headers.common["x-auth-token"] = localStorage.token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
      setAuthState({
        isAuthenticated: false,
        loading: false,
      });
    }

    try {
      axios.get("/api/auth").then((res) => {
        setUserState(res.data);
      });
    } catch (error) {
      console.error(error.response.data);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData: authState, setAuth: setAuthState }}
    >
      <UserContext.Provider value={{ user: userState, setUser: setUserState }}>
        <div className="App">
          <Router>
            <ThemeProvider theme={theme}>
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/dash" component={DashPage} />
              </Switch>
            </ThemeProvider>
          </Router>
        </div>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Utilities and Context
import "./App.css";

// Components
import LoginPage from "./pages/LoginPage";
import DashPage from "./pages/DashPage";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import AuthContext from "./utils/AuthContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5a2d81",
    },
    secondary: {
      main: "#63727a",
    },
    error: {
      main: "#ff0000",
    },
  },
});

function App() {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  return (
    <AuthContext.Provider
      value={{ authData: authState, setAuth: setAuthState }}
    >
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
    </AuthContext.Provider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Utilities and Context
import "./App.css";

// Components
import LoginPage from "./pages/LoginPage";
import DashPage from "./pages/DashPage";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";

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
  return (
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
  );
}

export default App;

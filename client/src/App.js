import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Utilities and Context
import './App.css';

// Components
import LoginPage from "./pages/LoginPage";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5a2d81",
    },
    secondary: {
      main: "#63727a",
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
          </Switch>
        </ThemeProvider>
      </Router>
    </div>

  );
}

export default App;

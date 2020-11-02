import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Button,
  TextField,
  Snackbar,
  SnackbarContent,
  Slide,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
//import CustomizedInputs from "../../components/CustomizedInputs";

import AuthContext from "../../utils/AuthContext";

function LoginPage() {
  // States
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [open, setOpen] = useState(false);

  // Other Variables
  const { authData, setAuth } = React.useContext(AuthContext);
  const { username, password } = credentials;

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });

    try {
      const res = await axios.post("/api/auth", body, config);
      console.log(res);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      axios.defaults.headers.common["x-auth-token"] = res.data.token;

      setAuth({
        ...authData,
        isAuthenticated: true,
        loading: false,
        token: localStorage.getItem("token"),
      });
    } catch (error) {
      // Displays error popup for user
      setOpen(true);

      localStorage.removeItem("token");
      setAuth({ ...authData, isAuthenticated: false, token: null });
      console.error(error);
    }
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (authData.isAuthenticated) {
    return <Redirect to="/dash" />;
  }

  return (
    <div className="App-header">
      <header className="App-header">
        <h6>Renossance</h6>
      </header>
      <form noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <TextField
          name="username"
          variant="outlined"
          color="primary"
          label="Username"
          value={username}
          onChange={(e) => onChange(e)}
        />
        <br />
        <TextField
          name="password"
          variant="outlined"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <br />
        <Button type="submit" variant="contained" color="primary" size="large">
          Login
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={4500}
        TransitionComponent={Slide}
        //onClose={handleClose}
      >
        {/* <SnackbarContent
          style={{
            backgroundColor: "red",
          }}
          message="Invalid Credentials"
        /> */}
        <MuiAlert
          elevation={20}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          Invalid Credentials
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;

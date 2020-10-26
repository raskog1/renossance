import React from "react";
import { Button, TextField } from '@material-ui/core';
import CustomizedInputs from "../../components/CustomizedInputs";

function LoginPage() {
    return (

        <div className="App-header">
            <header className="App-header">Renossance</header>
            <form noValidate autoComplete="off">
                {/* <CustomizedInputs label="Username" classes="root" /> */}
                <TextField variant="outlined" color="primary" label="Username" />
                <br />
                <TextField variant="outlined" type="password" label="Password" />
                <br />
                <Button variant="contained" color="primary" size="large">Login</Button>
            </form>
        </div>
    )
}

export default LoginPage;
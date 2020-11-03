import React, { useState } from "react";
import { Drawer, Button, List, Divider, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    }
})

function Dropdown() {
    const classes = useStyles();
    const [drop, setDrop] = useState({ isOpen: false });

    const toggleDrop = () => {
        setDrop({ isOpen: !drop.isOpen });
    }

    return (
        <>
            <Button onClick={toggleDrop} color="secondary">Get Started</Button>
            <Drawer open={drop.isOpen} onClose={toggleDrop} anchor="top">
                <div role="presentation" onClick={toggleDrop} onClick={toggleDrop}>
                    <List>
                        {["Browse", "Search", "Create Project", "Mini Hotel", "Reports"].map((text) =>
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        )}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key="Logout">
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </>
    )
}

export default Dropdown;
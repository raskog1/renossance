import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
    root: {
        background: "#282c34",
        color: "white"
    },
    input: {
        color: "white"
    }
};

function CustomizedInputs(props) {
    const { classes, label } = props;

    return (
        <TextField
            label={label}
            className={classes.root}
            InputProps={{
                className: classes.input
            }}
        />
    );
}

CustomizedInputs.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputs);
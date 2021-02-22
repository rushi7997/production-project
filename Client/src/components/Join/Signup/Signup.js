import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl, FormHelperText, TextField, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        marginTop: 20
    },
    formInput: {
        marginTop: 10
    },
    loginButton: {
        marginTop: 20
    }
}));

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [pwdNotMatchError, setPwdNotMatchError] = useState(false);

    const validateEmail = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    }
    const validatePassword = () => {
        if (password === password2) {
            setPwdNotMatchError(false);
        } else {
            setPwdNotMatchError(true);
        }
    }

    const handleSubmit = () => {
        if (validateEmail() && validatePassword()) {
            console.log("TRUE")
        } else {
            console.log("FALSE");
        }
    }
    const classes = useStyles();

    let textField;
    if (emailError) {
        textField = (<TextField type="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                className={classes.formInput}
                                onChange={(event) => setEmail(event.target.value)}
                                onFocus={() => setEmailError(false)}
                                onBlur={() => validateEmail()}
                                error
                                helperText="Invalid Email."/>);
    } else {
        textField = (<TextField type="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                onBlur={() => validateEmail()}
                                onFocus={() => setEmailError(false)}
                                className={classes.formInput}
                                onChange={(event) => setEmail(event.target.value)}/>);
    }

    const getPasswordField = (id) => {
        if (pwdNotMatchError) {
            return (
                <TextField type="password"
                           id={id}
                           label={id}
                           variant="outlined"
                           className={classes.formInput}
                           onChange={(event) => setPassword(event.target.value)}
                           onBlur={() => validatePassword()}
                           error
                           helperText="Passwords does not match!"
                           onFocus={() => setPwdNotMatchError(false)}
                />);
        } else {
            return (
                <TextField type="password"
                           id={id}
                           label={id}
                           variant="outlined"
                           className={classes.formInput}
                           onChange={(event) => setPassword(event.target.value)}
                           onBlur={() => validatePassword()}
                           onFocus={() => setPwdNotMatchError(false)}
                />);
        }
    }


    return (
        <
            div
            className={classes.container}>
            < FormControl
                className={classes.root}>
                {textField}
                <FormHelperText id="email-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl className={classes.root}>
                {getPasswordField("Password")}
            </FormControl>
            <FormControl className={classes.root}>
                {getPasswordField("Confirm-Password")}
            </FormControl>
            <Button variant="contained" color="primary" className={classes.loginButton} onClick={handleSubmit}>
                Signup
            </Button>
        </div>
    );
}
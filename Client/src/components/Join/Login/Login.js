import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl, FormHelperText, TextField, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%"
    },
    container: {
        display : "flex",
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

export default function Login() {
    let [email, setEmail] = useState("");
    let[password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const classes = useStyles();

    const validateEmail = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    }

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

    const handleSubmit = () => {
        if (validateEmail()) {
            console.log("TRUE")
        } else {
            console.log("FALSE");
        }
    }


    return (
        <div className={classes.container}>
            <FormControl className={classes.root}>
                {textField}
                <FormHelperText id="email-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl className={classes.root}>
                <TextField type="password"
                           id="password"
                           label="Password"
                           variant="outlined"
                           className={classes.formInput}
                           onChange={(event) => setPassword(event.target.value)}/>
            </FormControl>
            <Button variant="contained" color="primary" className={classes.loginButton}>
                Login
            </Button>
        </div>
    );
}
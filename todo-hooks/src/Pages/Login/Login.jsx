import React, { useState } from "react";
import { useMergeState } from "../../CustomHooks/useMergeState";
import { fetchLoginData } from "../../Redux/login/actionCreaters";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getTodoData } from "../../Redux/todo/actionCreaters";
import styles from "../Register/styles.module.css"
import { Notifications } from "../../Components/Notifications";
export const Login = () => {
    const initState = {
        username: "",
        password: "",
    };

    const [open,setOpen] = useState(false);

    const [state, setState] = useMergeState(initState);
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.login.isAuth);
    const loading = useSelector((state) => state.login.loading);
    const error = useSelector((state) => state.login.error);
    const message = useSelector((state) => state.login.message);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = state;
        const payload = {
            username,
            password,
        };
        dispatch(fetchLoginData(payload));
        setOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ [name]: value });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    const { username, password } = state;
    
    return !isAuth ? (
        <div>
            <form onSubmit={handleSubmit}>
                {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}

                <div className = {styles.user_form}>
                    <label >username:</label>
                    <input
                       required
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>

                <div className = {styles.user_form}>
                   <label >password:</label>
                    <input
                        required
                        type="text"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>

                <input type="submit" value="Login" />
            </form>
            <div>
                {!loading && error === false && (
                    <Notifications
                        open={open}
                        handleClose={handleClose}
                        message={message}
                        severity="success"
                    />
                )}

                {error && (
                    <Notifications
                        open={open}
                        handleClose={handleClose}
                        message={message}
                        severity="error"
                    />
                )}
            </div>
            {loading && <div>loading pls wait</div>}
            {/* <div>{message}</div>  */}
        </div>
    ) : (
        <Redirect to="/" />
    );
};

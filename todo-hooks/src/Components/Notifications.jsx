import React from "react";
import {
    Snackbar
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";


export const Notifications = ({open, handleClose,severity,message}) => {
    return (
        <>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity= {severity}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};
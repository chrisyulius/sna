import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationContext = React.createContext();

const NotificationContextProvider = (props) => {
    const [snackBar, setSnackBar] = useState({
        open: false,
        message: ''
    });

    const showSnackBar = (message) => {
        setSnackBar({ open: true, message });
    };

    const handleClose = () => {
        setSnackBar({
            open: false,
            message: ''
        });
    };

    const [snackBarError, setSnackBarError] = useState({
        open: false,
        message: ''
    });

    const showSnackBarError = (message) => {
        setSnackBarError({ open: true, message });
    };

    const handleCloseErr = () => {
        setSnackBarError({
            open: false,
            message: ''
        });
    };

    return (
        <NotificationContext.Provider value={{ showSnackBar, showSnackBarError }}>
            <Snackbar
                open={snackBar.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackBar.message}
                </Alert>
            </Snackbar>
            <Snackbar
                open={snackBarError.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={6000}
                onClose={handleCloseErr}
            >
                <Alert onClose={handleCloseErr} severity="error" sx={{ width: '100%' }}>
                    {snackBarError.message}
                </Alert>
            </Snackbar>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </NotificationContext.Provider>
    );
};

export { NotificationContextProvider, NotificationContext };

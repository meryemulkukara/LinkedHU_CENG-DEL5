import React, {useState, useContext } from 'react';
import {Box, Card, TextField, Button } from '@mui/material';
import { ApplicationContext } from "../../common/context";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const contextMethods = useContext(ApplicationContext);

    const submit = () => {
        if (email === '') {
            contextMethods.setSnackbarInfo({
                open: true,
                message: 'Please fill in all fields correctly',
                variant: 'error',
            });
            return;
        }

        contextMethods.forgotPassword(email);
    }

    

    return (
        <div className="login">
        <Card className="login-card">


            <h2>Forgot Password</h2>
            <Box sx={{display: "flex", marginTop: "8px", flexDirection: "column", width:"100%"}}>
                        <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Email"
                      autoComplete=""
                      autoFocus
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      onKeyPress={() => submit()}
                    />
                <Link to="/login" style={{textDecoration: 'none'}}>

                    <u>Return back</u>
                </Link>
                <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, p: 1.1, backgroundColor: "#141932 !important" }}
                      onClick={() => submit()}
                    >
                      Sign In
                    </Button>
            </Box>

            </Card>
            </div>
    );
}
export default ForgotPassword;
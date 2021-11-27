import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
const Register = () => {
    const [loginData, setLoginData] = useState({});
    const location = useLocation();
    const history = useNavigate();
    const { user, registerUser, isLoading, authError, logInWithGoogle } = useAuth();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLogInSubmit = e => {
        const name = loginData.firstName + ' ' + loginData.lastName;
        console.log(name);
        if (loginData.password !== loginData.confirmPassword) {
            alert("your password didn't match")
        }
        else {
            registerUser(loginData.email, loginData.password, name, history);
        }
        e.preventDefault();
    }
    const signInWithGoogle = () => {
        logInWithGoogle(location, history);
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item sx={{ boxShadow: 3, mx: 'auto' }} xs={12} md={6}>
                        <img src="https://i.ibb.co/QMqQRbF/Screenshot-19-removebg-preview.png" alt="" width="200px" />
                        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 900 }}>Create An Account</Typography>
                        <form onSubmit={handleLogInSubmit}>
                            <TextField
                                required
                                onBlur={handleOnChange}
                                id="outlined-basic"
                                type="text"
                                name="firstName"
                                label="First Name"
                                variant="standard"
                                sx={{ width: "75%", m: 1 }} />
                            <TextField
                                required
                                onBlur={handleOnChange}
                                id="outlined-basic"
                                type="text"
                                name="lastName"
                                label="Last Name"
                                variant="standard"
                                sx={{ width: "75%", m: 1 }} />
                            <TextField
                                required
                                onBlur={handleOnChange}
                                id="outlined-basic"
                                type="email"
                                name="email"
                                label="Email"
                                variant="standard"
                                sx={{ width: "75%", m: 1 }} />
                            <TextField
                                required
                                onBlur={handleOnChange}
                                id="outlined-basic"
                                type="password"
                                name="password"
                                label="Password"
                                variant="standard"
                                sx={{ width: "75%", m: 1 }} />
                            <TextField
                                required
                                onBlur={handleOnChange}
                                id="outlined-basic"
                                type="password"
                                name="confirmPassword"
                                label="Confirm"
                                variant="standard"
                                sx={{ width: "75%", m: 1 }} />



                            <Button variant="contained" sx={{ width: "75%", m: 1 }} style={{ backgroundColor: "#F63E7B" }} type="submit">Register</Button> <br />

                            <Button style={{ color: '#F63E7B' }} sx={{ my: 2 }} variant="text">--------------------- OR ---------------------</Button> <br />
                            <Button style={{ borderColor: '#F63E7B', color: '#F63E7B' }} onClick={signInWithGoogle} sx={{ width: "75%", m: 1 }} variant="outlined"><img src="https://i.ibb.co/kMP3qmn/Group-573.png" alt="" style={{ width: '25px' }} />  Sign In With Google</Button> <br />

                            <NavLink style={{ textDecoration: 'none' }} to='/login'><Button style={{ color: 'black' }} sx={{ my: 2 }} variant="text">Already User? Please Login</Button></NavLink>
                        </form>

                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">User Created Successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};

export default Register;
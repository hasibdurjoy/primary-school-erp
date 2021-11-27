import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, logInWithGoogle, isLoading, authError } = useAuth();
    const location = useLocation();
    const history = useNavigate();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLogInSubmit = e => {
        console.log(loginData);
        loginUser(loginData.email, loginData.password, location, history);

        e.preventDefault();
    }

    const signInWithGoogle = () => {
        logInWithGoogle(location, history);
    }

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item sx={{ boxShadow: 3, mx: 'auto', mt: 5 }} xs={12} md={6}>
                    {/* <img style={{ width: "200px" }} src="https://i.ibb.co/QMqQRbF/Screenshot-19-removebg-preview.png" alt="" /> */}
                    <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 900 }}>Login</Typography>

                    <form onSubmit={handleLogInSubmit}>
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            name="email"
                            type="email"
                            onChange={handleOnChange}
                            label="Your Email"
                            id="outlined-size-small"
                            size="small"
                            variant="standard"

                        />
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="outlined-size-small"
                            label="Your Password"
                            name="password"
                            onChange={handleOnChange}
                            variant="standard"
                            type="password"
                            size="small" />

                        <Button variant="contained" sx={{ width: "75%", m: 1 }} style={{ backgroundColor: "#F63E7B" }} type="submit">Login</Button> <br />

                        <Button style={{ color: '#F63E7B' }} sx={{ my: 2 }} variant="text">--------------------- OR ---------------------</Button> <br />

                        <Button style={{ borderColor: '#F63E7B', color: '#F63E7B' }} onClick={signInWithGoogle} sx={{ width: "75%", m: 1 }} variant="outlined"><img src="https://i.ibb.co/kMP3qmn/Group-573.png" alt="" style={{ width: '25px' }} />  Sign In With Google</Button> <br />

                        <NavLink style={{ textDecoration: 'none' }} to='/register'><Button style={{ color: 'black' }} sx={{ my: 2 }} variant="text">New User? Please Register</Button></NavLink>
                    </form>

                    {isLoading && <CircularProgress />}
                    {user?.email && <Alert severity="success">User Created Successfully!</Alert>}
                    {authError && <Alert severity="error">Invalid Username or password</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={8} md={4}>
                    <Link to='/dashboard' style={{ textDecoration: "none", textAlign: "center" }}>
                        <Paper >
                            <img src="https://image.freepik.com/free-icon/dwelling-house_318-1861.jpg" alt="" width="100px" />
                            <Typography variant="h6">Home</Typography>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={8} md={4}>
                    <Link to='/addNewStudent' style={{ textDecoration: "none", textAlign: "center" }}>
                        <Paper >
                            <img src="https://image.flaticon.com/icons/png/512/1252/1252249.png" alt="" width="100px" />
                            <Typography variant="h6">Add New Student</Typography>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={8} md={4}>
                    <Link to='/allStudents' style={{ textDecoration: "none", textAlign: "center" }}>
                        <Paper >
                            <img src="https://image.flaticon.com/icons/png/512/1252/1252249.png" alt="" width="100px" />
                            <Typography variant="h6">All Students</Typography>
                        </Paper>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';

const Home = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={8} md={2}>
                    <Paper >
                        <Typography variant="body1">Home</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
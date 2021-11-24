import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SchoolStudentInfo = () => {
    const [students, setStudents] = useState([]);
    const [male, setMale] = useState([]);
    const [female, setFemale] = useState([]);
    useEffect(() => {
        fetch('https://infinite-badlands-03688.herokuapp.com/allStudents')
            .then(res => res.json())
            .then(data => {
                setStudents(data)
                const maleStd = data.filter(student => student.gender === 'male')
                setMale(maleStd)
                const femaleStd = data.filter(student => student.gender === 'female')
                setFemale(femaleStd)
            })
    }, []);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={8} md={4}>
                    <Link to='/dashboard' style={{ textDecoration: "none", textAlign: "center" }}>
                        <Paper >
                            <img src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-mbe-style-icon-cute-cartoon-schoolboy-red-scarf-school-studentred-scarfcartoonboygirlmbe-png-image_4048990.jpg" alt="" width="100px" />
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6">{students.length}</Typography>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={8} md={4}>
                    <Link to='/dashboard' style={{ textDecoration: "none", textAlign: "center" }}>
                        <Paper >
                            <img src="https://previews.123rf.com/images/jemastock/jemastock1609/jemastock160906922/63284308-boy-cartoon-student-back-to-school-education-and-childhood-theme-colorful-design-vector-illustration.jpg" alt="" width="100px" />
                            <Typography variant="h6">Male</Typography>
                            <Typography variant="h6">{male.length}</Typography>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={8} md={4}>
                    <Link to='/dashboard' style={{ textDecoration: "none", textAlign: "center" }}>
                        <Paper >
                            <img src="https://previews.123rf.com/images/jemastock/jemastock1609/jemastock160906921/63284305-girl-cartoon-student-back-to-school-education-and-childhood-theme-colorful-design-vector-illustratio.jpg" alt="" width="100px" />
                            <Typography variant="h6">Female</Typography>
                            <Typography variant="h6">{female.length}</Typography>
                        </Paper>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SchoolStudentInfo;
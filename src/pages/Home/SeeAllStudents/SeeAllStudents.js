import React from 'react';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import { Box } from '@mui/system';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const SeeAllStudents = () => {
    const [studentClass, setStudentClass] = React.useState('');
    const [yearValue, setYearValue] = React.useState(new Date());
    const [students, setStudents] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleAge = (event) => {
        setStudentClass(event.target.value);
    };

    React.useEffect(() => {
        setLoading(true)
        fetch(`https://infinite-badlands-03688.herokuapp.com/students/?class=${studentClass}&year=${yearValue.getFullYear()}`)
            .then(res => res.json())
            .then(data => {
                setStudents(data)
                setLoading(false)
            })
    }, [studentClass, yearValue])

    const handleDelete = id => {
        Swal.fire({
            icon: 'question',
            title: 'Do you want to delete student',
            showDenyButton: true, showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const url = `https://infinite-badlands-03688.herokuapp.com/allStudents/${id}`;
                    fetch(url, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Deleted successfully',
                                })
                                const remainingStudents = students.filter(student => student._id !== id);
                                setStudents(remainingStudents);
                            }
                        });
                }
                else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });

    }

    return (
        <>
            <Container>
                <Grid container spacing={1}>
                    <Grid item sx={{ boxShadow: 3, mx: 'auto', pt: 3, pb: 3 }} xs={12} md={10}>
                        <form >
                            <Box sx={{ width: '75%', mt: 2, mx: "auto" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={studentClass}
                                                label="Class"
                                                onChange={handleAge}
                                            >
                                                <MenuItem value={0}>Pre Primary</MenuItem>
                                                <MenuItem value={1}>One</MenuItem>
                                                <MenuItem value={2}>Two</MenuItem>
                                                <MenuItem value={3}>Three</MenuItem>
                                                <MenuItem value={4}>Four</MenuItem>
                                                <MenuItem value={5}>Five</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                views={['year']}
                                                label="Year"
                                                value={yearValue}
                                                onChange={(newValue) => {
                                                    setYearValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} helperText={null} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* <br />
                            <input type="submit" style={{ width: "50%", padding: "10px 0px" }} /> */}
                        </form>
                    </Grid>
                </Grid>
                {loading &&
                    <Box align="center">
                        <CircularProgress align="center" />
                    </Box>
                }
            </Container>

            <TableContainer component={Paper}>
                <Table sx={{ mt: 3 }} size="small" aria-label="a dense table">

                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Birth Id</TableCell>
                            <TableCell align="left">Class</TableCell>
                            <TableCell align="left">Father</TableCell>
                            <TableCell align="left">Mother</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {
                            students.length > 0 && students.map((student) => (
                                <TableRow
                                    key={student._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {student.name}
                                    </TableCell>
                                    <TableCell align="left">{student.birthId}</TableCell>
                                    <TableCell align="left">{student.class}</TableCell>
                                    <TableCell align="left">
                                        <b>Name</b> :{student.fathersName} <br />
                                        <b>NID</b> :{student.fathersNid} <br />
                                        <b>Phone</b> : {student.fathersPhone}
                                    </TableCell>
                                    <TableCell align="left">
                                        <b>Name</b> :{student.mothersName} <br />
                                        <b>NID</b> :{student.mothersNid} <br />
                                        <b>Phone</b> : {student.mothersPhone}
                                    </TableCell>

                                    <Link to={`/manageStudent/${student._id}`} style={{ textDecoration: "none" }}> <TableCell align="left"><Button variant="contained">Edit</Button></TableCell></Link>

                                    <Button onClick={() => { handleDelete(student._id) }} variant="contained">Delete</Button>

                                </TableRow>))
                        }
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
};

export default SeeAllStudents;
import React from 'react';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material';
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

const SeeAllStudents = () => {
    const [studentClass, setStudentClass] = React.useState('');
    const [yearValue, setYearValue] = React.useState(new Date());
    const [students, setStudents] = React.useState([]);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.class = studentClass;
        data.year = yearValue.getFullYear();
        console.log(data);
    }

    const handleAge = (event) => {
        setStudentClass(event.target.value);
    };

    React.useEffect(() => {
        fetch(`https://warm-citadel-00750.herokuapp.com/students/?class=${studentClass}&year=${yearValue.getFullYear()}`)
            .then(res => res.json())
            .then(data => setStudents(data))
    }, [studentClass, yearValue])

    return (
        <>
            <Container>
                <Grid container spacing={1}>
                    <Grid item sx={{ boxShadow: 3, mx: 'auto', pt: 3, pb: 3 }} xs={12} md={10}>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                        {students.length > 0 && students.map((student) => (
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
                                    Name :{student.fathersName} <br />
                                    NID :{student.fathersNid} <br />
                                    Phone : {student.fathersPhone}
                                </TableCell>
                                <TableCell align="left">
                                    Name :{student.mothersName} <br />
                                    NID :{student.mothersNid} <br />
                                    Phone : {student.mothersPhone}
                                </TableCell>

                                <TableCell align="left"><Button variant="contained">Edit</Button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default SeeAllStudents;
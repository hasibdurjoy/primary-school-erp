import React from 'react';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Swal from 'sweetalert2';

const AddNewStudent = () => {
    const [studentClass, setStudentClass] = React.useState('');
    const [studentGender, setStudentGender] = React.useState('');
    const [yearValue, setYearValue] = React.useState(new Date());

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.class = studentClass;
        data.gender = studentGender;
        data.year = yearValue.getFullYear();

        Swal.fire({
            icon: 'question',
            title: 'Do you want to add this student',
            showDenyButton: true, showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch('https://infinite-badlands-03688.herokuapp.com/allStudents', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Successfully added',
                                })
                                reset();
                            }
                        });
                    console.log(data)
                    reset();

                }
                else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
    };

    const handleAge = (event) => {
        setStudentClass(event.target.value);
    };
    const handleGender = (event) => {
        setStudentGender(event.target.value);
    };

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item sx={{ boxShadow: 3, mx: 'auto', pt: 3, pb: 3 }} xs={12} md={10}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ width: '75%', mt: 2, mx: "auto" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        {...register("name")}
                                        required
                                        label="Name"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
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
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={studentGender}
                                            label="Gender"
                                            onChange={handleGender}
                                        >
                                            <MenuItem value={'male'}>Male</MenuItem>
                                            <MenuItem value={'female'}>Female</MenuItem>
                                            <MenuItem value={'others'}>Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>

                        <TextField
                            sx={{ width: '75%', mt: 2 }}
                            {...register("birthId")}
                            required
                            label="Student Birth Id No"
                            type="number"
                        />

                        <TextField
                            sx={{ width: '75%', mt: 2 }}
                            {...register("fathersName")}
                            required
                            label="Fathers Name"
                            type="text"
                        />

                        <Box sx={{ width: '75%', mt: 2, mx: "auto" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        sx={{ width: '100%', mt: 2 }}
                                        {...register("fathersPhone")}
                                        required
                                        label="Fathers Phone Number"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        sx={{ width: '100%', mt: 2 }}
                                        {...register("fathersNid")}
                                        required
                                        label="Fathers NID no"
                                        type="number"
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <TextField
                            sx={{ width: '75%', mt: 2 }}
                            {...register("mothersName")}
                            required
                            label="Mothers Name"
                            type="text"
                        />

                        <Box sx={{ width: '75%', mt: 2, mx: "auto" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        sx={{ width: '100%', mt: 2 }}
                                        {...register("mothersPhone")}
                                        required
                                        label="Mothers Phone Number"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        sx={{ width: '100%', mt: 2 }}
                                        {...register("mothersNid")}
                                        required
                                        label="Mothers NID no"
                                        type="number"
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <br />
                        <input type="submit" style={{ width: "50%", padding: "10px 0px" }} />
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddNewStudent;
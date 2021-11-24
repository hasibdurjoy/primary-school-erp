import React from 'react';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';

const UpdateStudent = () => {
    const { studentId } = useParams();
    const [studentClass, setStudentClass] = React.useState('');
    const [student, setStudent] = React.useState({});
    const [studentGender, setStudentGender] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [yearValue, setYearValue] = React.useState(new Date());


    React.useEffect(() => {
        setLoading(true)
        fetch(`https://infinite-badlands-03688.herokuapp.com/manageStudents/${studentId}`)
            .then(res => res.json())
            .then(data => {
                setStudent(data)
                setLoading(false)
            })
    }, []);

    const { _id, name, gender, birthId, fathersName, fathersPhone, fathersNid, mothersName, mothersPhone, mothersNid } = student;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.class = studentClass;
        data.gender = studentGender || student.gender;
        data.year = yearValue.getFullYear();

        Swal.fire({
            icon: 'question',
            title: 'Do you want to edit student',
            showDenyButton: true, showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const url = `https://infinite-badlands-03688.herokuapp.com/allStudents/${_id}`;
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                setUpdateSuccess(true);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Updated Successfully ',
                                })
                            }
                        })
                }
                else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
    };

    const handleClass = (event) => {
        setStudentClass(event.target.value);
    };
    console.log(studentClass);
    const handleGender = (event) => {
        setStudentGender(event.target.value);
    };

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item sx={{ boxShadow: 3, mx: 'auto', pt: 3, pb: 3 }} xs={12} md={10}>
                    {
                        loading ? <CircularProgress />
                            :
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box sx={{ width: '75%', mt: 2, mx: "auto" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={8}>
                                            {
                                                name && <TextField
                                                    sx={{ width: '100%' }}
                                                    {...register("name")}
                                                    required
                                                    label="Name"
                                                    type="text"
                                                    defaultValue={name}
                                                />
                                            }
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
                                                {
                                                    student.class && <Select
                                                        defaultValue={student.class}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        // value={studentClass}
                                                        label="Class"
                                                        onChange={handleClass}
                                                    >
                                                        <MenuItem value={0}>Pre Primary</MenuItem>
                                                        <MenuItem value={1}>One</MenuItem>
                                                        <MenuItem value={2}>Two</MenuItem>
                                                        <MenuItem value={3}>Three</MenuItem>
                                                        <MenuItem value={4}>Four</MenuItem>
                                                        <MenuItem value={5}>Five</MenuItem>
                                                    </Select>
                                                }
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                                {
                                                    gender && <Select
                                                        defaultValue={gender}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Gender"
                                                        onChange={handleGender}
                                                    >
                                                        <MenuItem value={'male'}>Male</MenuItem>
                                                        <MenuItem value={'female'}>Female</MenuItem>
                                                        <MenuItem value={'others'}>Others</MenuItem>
                                                    </Select>}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {
                                    birthId && <TextField
                                        defaultValue={birthId}
                                        sx={{ width: '75%', mt: 2 }}
                                        {...register("birthId")}
                                        required
                                        label="Student Birth Id No"
                                        type="number"
                                    />
                                }
                                {
                                    fathersName && <TextField
                                        defaultValue={fathersName}
                                        sx={{ width: '75%', mt: 2 }}
                                        {...register("fathersName")}
                                        required
                                        label="Fathers Name"
                                        type="text"
                                    />
                                }

                                <Box sx={{ width: '75%', mt: 2, mx: "auto" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            {
                                                fathersPhone && <TextField
                                                    defaultValue={fathersPhone}
                                                    sx={{ width: '100%', mt: 2 }}
                                                    {...register("fathersPhone")}
                                                    required
                                                    label="Fathers Phone Number"
                                                    type="number"
                                                />
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {
                                                fathersNid && <TextField
                                                    defaultValue={fathersNid}
                                                    sx={{ width: '100%', mt: 2 }}
                                                    {...register("fathersNid")}
                                                    required
                                                    label="Fathers NID no"
                                                    type="number"
                                                />
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>

                                {
                                    mothersName && <TextField
                                        defaultValue={mothersName}
                                        sx={{ width: '75%', mt: 2 }}
                                        {...register("mothersName")}
                                        required
                                        label="Mothers Name"
                                        type="text"
                                    />
                                }

                                <Box sx={{ width: '75%', mt: 2, mx: "auto" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            {
                                                mothersPhone && <TextField
                                                    defaultValue={mothersPhone}
                                                    sx={{ width: '100%', mt: 2 }}
                                                    {...register("mothersPhone")}
                                                    required
                                                    label="Mothers Phone Number"
                                                    type="number"
                                                />
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {
                                                mothersNid && <TextField
                                                    defaultValue={mothersNid}
                                                    sx={{ width: '100%', mt: 2 }}
                                                    {...register("mothersNid")}
                                                    required
                                                    label="Mothers NID no"
                                                    type="number"
                                                />
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>

                                <br />
                                <input type="submit" style={{ width: "50%", padding: "10px 0px" }} />
                            </form>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default UpdateStudent;
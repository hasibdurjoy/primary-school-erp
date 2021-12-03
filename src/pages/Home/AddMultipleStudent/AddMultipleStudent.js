import React, { useState } from "react";
import * as XLSX from "xlsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import Swal from 'sweetalert2';

const AddMultipleStudent = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);


    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                setLoading(true);
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
            console.log(d);
            setLoading(false);
        });
    };
    console.log('items', items);
    const handleSubmit = () => {
        Swal.fire({
            icon: 'question',
            title: 'Do you want to add this student',
            showDenyButton: true, showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch('https://infinite-badlands-03688.herokuapp.com/addStudents', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(items)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedCount) {
                                setItems('')
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Successfully added',
                                })
                            }
                        });
                    console.log(items)

                }
                else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
    }

    return (
        <div>
            <input
                type="file"
                accept=".csv"
                onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                }}
            />
            <button onClick={handleSubmit}>Submit</button>

            {
                items && <TableContainer component={Paper}>
                    <Table sx={{ mt: 3 }} size="small" aria-label="a dense table">

                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Birth Id</TableCell>
                                <TableCell align="left">Class</TableCell>
                                <TableCell align="left">Year</TableCell>
                                <TableCell align="left">Father</TableCell>
                                <TableCell align="left">Mother</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {
                                items.length > 0 && items.map((student) => (
                                    <TableRow
                                        key={student._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {student.name}
                                        </TableCell>
                                        <TableCell align="left">{student.birthId}</TableCell>
                                        <TableCell align="left">{student.class}</TableCell>
                                        <TableCell align="left">{student.year}</TableCell>
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

                                    </TableRow>))
                            }
                        </TableBody>

                    </Table>
                </TableContainer>
            }
        </div>
    );
};

export default AddMultipleStudent;
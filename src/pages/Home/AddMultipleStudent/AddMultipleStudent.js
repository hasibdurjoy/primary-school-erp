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
                    fetch('http://localhost:5000/addStudents', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(items)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedCount) {
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
                onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                }}
            />
            <button onClick={handleSubmit}>Submit</button>
            {
                items.map(item => <h2>{items.length}</h2>)
            }
        </div>
    );
};

export default AddMultipleStudent;
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Header() {
    const { user, logOut, isLoggedOut } = useAuth();
    const navigate = useNavigate();

    {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        isLoggedOut && Toast.fire({
            icon: 'error',
            title: 'Logged Out successfully'
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {
                        user.email ? <>
                            <Link to='/dashboard' style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit" >Dashboard</Button></Link>
                            <Button color="inherit">{user.displayName}</Button>
                            <Button color="inherit" onClick={logOut}>Log Out</Button>
                        </>
                            :
                            <>
                                <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit" >Log In</Button></Link>
                            </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

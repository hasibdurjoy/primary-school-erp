import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    let location = useLocation();
    const { user, admin, isLoading, isAdminLoading } = useAuth();
    if (isLoading) {
        return <CircularProgress color="success" />
    }
    if (isAdminLoading) {
        return <CircularProgress color="success" />
    }
    if (user.email && admin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} />;

};

export default AdminRoute;
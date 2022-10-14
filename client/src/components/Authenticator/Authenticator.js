import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const Authenticator = () => {
    return (
        localStorage.getItem("token") ? <Outlet /> : <Navigate to="/signin" />
    );
};

export default Authenticator;
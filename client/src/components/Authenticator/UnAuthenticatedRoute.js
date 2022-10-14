import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const UnAuthenticatedRoute = ({ restrictedToPublicOnly }) => {
    return (
        !localStorage.getItem("token") ? <Outlet /> : <Navigate to="/productpage" /> 
    );
};

export default UnAuthenticatedRoute;
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar"
import { Footer } from "../components/shared/Footer.jsx";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";




function ProtectedRoute({ component: Component, role, ...restOfProps }) {
    const isAuthenticated = localStorage.getItem("authorization");
    const [reload, setReload] = useState(false)
    let decoded = localStorage.getItem('authorization');
    if (localStorage.getItem('authorization')) {
        decoded = jwt_decode(localStorage.getItem('authorization'));
        // console.log('entrando');
        if (decoded.usuario.blnAdmin !== role && role !== null) {
            Swal.fire({
                icon: 'error',
                text: 'No cuenta con permisos para acceder a esta ruta'
            })
        }
    }


    return (
        <>
            <Navbar setReload={setReload} reload={reload} />
            <div className="container">
                <Route
                    {...restOfProps}
                    render={(props) =>
                        isAuthenticated ? (decoded.usuario.blnAdmin === role ? <Component {...props} /> : (role === null ? <Component {...props} /> : <Redirect to="dashboard" />)) : <Redirect to="/auth/login" />
                    }
                />
            </div>
            <Footer />
        </>

    );
}

export default ProtectedRoute;
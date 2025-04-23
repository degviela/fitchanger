import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const AUTH_URL = process.env.REACT_APP_AUTH_URL;

    useEffect(() => {
        axios
            .get(`${AUTH_URL}/user`, { withCredentials: true })
            .then(() => {
                setAuthenticated(true);
                console.log("iij ah");
            })
            .catch(() => setAuthenticated(false))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return authenticated ? element : <Navigate to="/login" />;
}
export default ProtectedRoute;
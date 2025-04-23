import axios from 'axios';

const AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const getCSRFToken = async () => {
    try {
        await axios.get(`${AUTH_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
        });
    } catch (error) {
        console.error('CSRF token request failed:', error);
        throw error;
    }
};

import './logedIn.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const LoggedIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data; 

    useEffect(() => {
        if (!data) {
            navigate('/login');
        }
    }, [data, navigate]); 

    if (!data) {
        return null; 
    }

    return (
        <div className='container'>
            <h1 className='h1-style'>You are in the home page now {location.state.data.email}</h1>
        </div>
    );
}

export default LoggedIn;
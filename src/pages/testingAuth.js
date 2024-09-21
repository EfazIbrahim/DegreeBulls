import React from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();

    const handleNavigation = (role) => {
        navigate(`/${role}`);
    };

    return (
        <div>
            <h2>Select Your Role</h2>
            <button onClick={() => handleNavigation('student')}>Student</button>
            <button onClick={() => handleNavigation('advisor')}>Advisor</button>
            <button onClick={() => handleNavigation('staff')}>Staff</button>
        </div>
    );
}

export default Auth;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';



function Auth() {
    const navigate = useNavigate();

    const handleNavigation = (role) => {
        navigate(`/${role}`);
    };

    return (
        <div className="auth-container">
            <h2>Select Your Role</h2>
            <button className="auth-button" onClick={() => handleNavigation('student')}>Student</button>
            <button className="auth-button" onClick={() => handleNavigation('advisor')}>Advisor</button>
            <button className="auth-button" onClick={() => handleNavigation('staff')}>Staff</button>
        </div>
    );
}

export default Auth;
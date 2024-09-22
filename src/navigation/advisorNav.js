import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Selection from '../pages/advisorPages/studentSelection';
import './advisorNav.css';
import logoWhite from '../assets/logo.png';

function AdvisorNav() {
    return (
        <div className="advisor">
            <nav className="advisor-navbar">
                <img className="advisor-logo" src={logoWhite} alt="Degree Bulls Logo"/>
                <Link to="/advisor">Home</Link>
                <Link to="student-selection">Student Selection</Link>
            </nav>
            <h1>Advisor Home</h1>
            <Routes>
                <Route path="student-selection" element={<Selection />} />
                <Route path="/advisor" element={<AdvisorNav />} />
            </Routes>
        </div>
    );
}

export default AdvisorNav;
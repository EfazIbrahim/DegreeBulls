import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Selection from '../pages/advisorPages/studentSelection';
import Home from '../pages/advisorPages/advisorHome';
import './advisorNav.css';
import logoWhite from '../assets/logo.png';

function AdvisorNav() {
    return (
        <div className="advisor">
            <nav className="advisor-navbar">
                <img className="advisor-logo" src={logoWhite} alt="Degree Bulls Logo"/>
                <Link className="advisor-links" to="/advisor">Home</Link>
                <Link className="advisor-links" to="student-selection">Student Selection</Link>
            </nav>
            <Routes>
                <Route path="student-selection" element={<Selection />} />
                <Route path="/advisor" element={<AdvisorNav />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default AdvisorNav;
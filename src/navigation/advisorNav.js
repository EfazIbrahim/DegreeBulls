import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Selection from '../pages/advisorPages/studentSelection';
import CourseSelection from '../pages/advisorPages/courseSelection';
import './advisorNav.css';
import logo from '../assets/logo.png';

function AdvisorNav() {
    return (
        <div className="advisor">
            <nav className="advisor-navbar">
                <img className="advisor-logo" src={logo} alt="Degree Bulls Logo"/>
                <Link className="advisor-links" to="/advisor">Instructor List</Link>
                <Link className="advisor-links" to="student-selection">Student Selection</Link>
            </nav>
            <Routes>
                <Route path="student-selection" element={<Selection />} />
                <Route path="/advisor" element={<AdvisorNav />} />
                <Route path="/" element={<CourseSelection />} />
            </Routes>
        </div>
    );
}

export default AdvisorNav;
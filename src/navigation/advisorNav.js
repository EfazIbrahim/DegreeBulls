import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Selection from '../pages/advisorPages/studentSelection';
import CourseSelection from '../pages/advisorPages/courseSelection';
import './advisorNav.css';
import logo from '../assets/logo.png';

function AdvisorNav() {
    return (
        <div className="advisorNav">
            <nav className="advisorNav-navbar">
                <img className="advisorNav-logo" src={logo} alt="Degree Bulls Logo"/>
                <Link className="advisorNav-links" to="/advisor">Instructor List</Link>
                <Link className="advisorNav-links" to="student-selection">Student Selection</Link>
                <Link className="advisorNav-links" to="/">Log Out</Link>
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
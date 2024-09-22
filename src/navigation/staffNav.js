import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Gpa from '../pages/studentPages/studentGpa';
import './staffNav.css';
import logoWhite from '../assets/logo.png';

function StudentNav() {
    return (
        <div className="student">
            <nav className="student-navbar">
                <img className="student-logo" src={logoWhite} alt="Degree Bulls Logo"/>
                <Link to="/student">Home</Link>
                <Link to="gpa">GPA</Link>
            </nav>
            <h1>Student Home</h1>
            <Routes>
                <Route path="gpa" element={<Gpa />} />
                <Route path="/student" element={<StudentNav />} />
            </Routes>
        </div>
    );
}

export default StudentNav;
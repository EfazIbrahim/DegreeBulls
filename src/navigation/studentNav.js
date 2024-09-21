
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/studentPages/studentHome';
import Gpa from '../pages/studentPages/studentGpa';
import './student.css';
import logoWhite from '../assets/logo.png';


function StudentNav() {
    return (
        <div className="student">
            <nav className="student-navbar">
                <img className="student-logo" src={logoWhite} alt="Degree Bulls Logo"/>
                <Link to="home">Home</Link>
                <Link to="gpa">GPA</Link>
            </nav>
            <h1>Student Navigation</h1>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="gpa" element={<Gpa />} />
            </Routes>
        </div>
    );
}
export default StudentNav;
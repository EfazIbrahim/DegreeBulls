
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Gpa from '../pages/studentPages/studentGpa';
import StudentHome from '../pages/studentPages/studentHome';
import './studentNav.css';
import logoWhite from '../assets/logo.png';


function StudentNav() {
    return (
        <div className="student">
            <nav className="student-navbar">
                <img className="student-logo" src={logoWhite} alt="Degree Bulls Logo"/>
                <Link className="student-links" to="/student">Home</Link>
                <Link className="student-links" to="gpa">GPA</Link>
            </nav>
            <Routes>
                <Route path="gpa" element={<Gpa />} />
                <Route path="/student" element={<StudentNav />} />
                <Route path="/" element={<StudentHome />} />
            </Routes>
        </div>
    );
}
export default StudentNav;
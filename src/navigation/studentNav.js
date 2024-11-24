import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Gpa from '../pages/studentPages/studentGpa';
import StudentCourses from '../pages/studentPages/studentCourses';
import './studentNav.css';
import logoWhite from '../assets/logo.png';


function StudentNav() {
    return (
        <div className="studentNav">
            <nav className="studentNav-navbar">
                <img className="studentNav-logo" src={logoWhite} alt="Degree Bulls Logo"/>
                <Link className="studentNav-links" to="/student">Courses</Link>
                <Link className="studentNav-links" to="gpa">GPA</Link>
            </nav>
            <Routes>
                <Route path="gpa" element={<Gpa />} />
                <Route path="/student" element={<StudentNav />} />
                <Route path="/" element={<StudentCourses />} />
            </Routes>
        </div>
    );
}
export default StudentNav;

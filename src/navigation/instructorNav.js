import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import InstructorStudents from '../pages/instructorPages/instructorStudents';
import InstructorCourses from "../pages/instructorPages/instructorCourses";
import './instructorNav.css';
import logoWhite from '../assets/logo.png';

function InstructorNav() {
    return (
        <div className="instructorNav">
            <nav className="instructorNav-navbar">
                <img className="instructorNav-logo" src={logoWhite} alt="Degree Bulls Logo"/>
                <Link className="instructorNav-links" to="/instructor">Students</Link>
                <Link className="instructorNav-links" to="courses">Courses</Link>
                <Link className="instructorNav-links" to="/">Log Out</Link>
            </nav>
            <Routes>
                <Route path="/instructor" element={<InstructorStudents />} />
                <Route path="/" element={<InstructorStudents />} />
                <Route path="courses" element={<InstructorCourses />} />
            </Routes>
        </div>
    );
}

export default InstructorNav;
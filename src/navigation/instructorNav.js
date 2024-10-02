import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import InstructorHome from '../pages/instructorPages/instructorHome';
import InstructorCourses from "../pages/instructorPages/instructorCourses";
import './instructorNav.css';
import logoWhite from '../assets/logo.png';


function InstructorNav() {
    return (
        <div className="instructor">
            <nav className="instructor-navbar">
                <img className="instructor-logo" src={logoWhite} alt="Degree Bulls Logo"/>
                <Link className="instructor-links" to="/instructor">Home</Link>
                <Link className="instructor-links" to="courses">Courses</Link>
            </nav>
            <Routes>
                <Route path="/instructor" element={<instructorNav />} />
                <Route path="/" element={<InstructorHome />} />
                <Route path="courses" element={<InstructorCourses />} />
            </Routes>
        </div>
    );
}
export default InstructorNav;
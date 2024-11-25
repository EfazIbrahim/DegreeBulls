import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import StudentSelection from "../pages/staffPages/studentSelection";
import InstructorSelection from "../pages/staffPages/instructorSelection";
import StaffHome from "../pages/staffPages/staffHome";
import logoWhite from '../assets/logo.png';
import './staffNav.css';

function StaffNav() {
    return (
        <div className="staffNav">
            <nav className="staffNav-navbar">
                <img className="staffNav-logo" src={logoWhite} alt="Degree Bulls Logo"/>
                <Link className="staffNav-links" to="/staff">Home</Link>
                <Link className="staffNav-links" to="instructors">Instructors</Link>
                <Link className="staffNav-links" to="students">Students</Link>
                <Link className="staffNav-links" to="/">Log Out</Link>
            </nav>
            <Routes>
                <Route path="/" element={<StaffHome/>}/>
                <Route path="instructors" element={<InstructorSelection />} />
                <Route path="students" element={<StudentSelection />} />
                <Route path="staff" element={<StaffNav />} />
            </Routes>
        </div>
    );
}

export default StaffNav;
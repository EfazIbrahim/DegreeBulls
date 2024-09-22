import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import StudentSelection from "../pages/staffPages/studentSelection";

import InstrutorSelection from "../pages/staffPages/instructorSelection";
import StaffHome from "../pages/staffPages/staffHome";
import logoWhite from '../assets/logo.png';

import './staffNav.css';



function StaffNav() {
  return (
    <div className="staff">
        <nav className="staff-navbar">

            <img className="staff-logo" src={logoWhite} alt="Degree Bulls Logo"/>

            <Link className="staff-links" to="/staff">Home</Link>

            <Link className="staff-links" to="instructors">Instructors</Link>

            <Link className="staff-links" to="students">Students</Link>

        </nav>
        <Routes>
            <Route path="/" element={<StaffHome/>}/>
            <Route path="instructors" element={<InstrutorSelection />} />
            <Route path="students" element={<StudentSelection />} />
            <Route path="staff" element={<StaffNav />} />

        </Routes>
    </div>
  );
}

export default StaffNav

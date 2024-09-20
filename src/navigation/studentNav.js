
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/studentPages/studentHome';
import Gpa from '../pages/studentPages/studentGpa';

function StudentNav() {
    return (
        <div>
            <nav className="navbar">
                <li>
                    <Link to="home">Home</Link>
                </li>
                <li>
                    <Link to="gpa">GPA</Link>
                </li>
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
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Logs from '../pages/adminPages/logs';
import './adminNav.css';
import logo from '../assets/logo.png';

function AdminNav() {
    return (
        <div className="adminNav">
            <nav className="adminNav-navbar">
                <img className="adminNav-logo" src={logo} alt="Degree Bulls Logo"/>
                <Link className="adminNav-links" to="/admin">Logs</Link>
                <Link className="adminNav-links" to="/">Log Out</Link>
            </nav>
            <Routes>
                <Route path="/admin" element={<Logs />} />
                <Route path="/" element={<Logs />} />
            </Routes>
        </div>
    );
}

export default AdminNav;
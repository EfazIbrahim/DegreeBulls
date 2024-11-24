import React from 'react';
import './student.css';
import { calculateGPA } from './studentFunctions.js';
import {useAuth} from "../../context/AuthContext";

function Gpa() {
    const { currentUser } = useAuth();
    const viewgpa = async () => {
        try {
            const gpa = await calculateGPA(currentUser);
            console.log(gpa)
        } catch (error) {
            console.error('Error fetching gpa:', error);
        }
    };
    return (
        <div className="student">
            <h1 className="student-header">Student GPA</h1>
            <button className="student-button" onClick={viewgpa}>Log GPA</button>
        </div>
    );
}

export default Gpa;
import React from 'react';
import './instructor.css';
import { GetInstructorStudents, AssignGrade } from './instructorFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function InstructorStudents() {
    const { currentUser } = useAuth();
    const viewstudents = async () => {
        try {
            const instructor = await GetInstructorStudents(currentUser);
            console.log(instructor);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const assigngrade = async () => {
        try {
            const courses = await AssignGrade(currentUser, "Ishraq Khan", "A");
            console.log(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
    return (
        <div className="instructor">
            <h1 className="instructor-header">Students</h1>
            <button className="instructor-button" onClick={viewstudents}>Students</button>
            <button className="instructor-button" onClick={assigngrade}>Assign Grade</button>
        </div>
    );
}

export default InstructorStudents;
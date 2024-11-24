import React from 'react';
import './instructor.css';
import { GetInstructorData, GetInstructorCourses } from './instructorFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function InstructorSelection() {
    const { currentUser } = useAuth();
    const viewinstructor = async () => {
        try {
            const instructor = await GetInstructorData(currentUser);
            console.log(instructor);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const viewcourses = async () => {
        try {
            const courses = await GetInstructorCourses(currentUser);
            console.log(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
    return (
        <div className="instructor">
            <h1 className="instructor-header">Course Selection</h1>
            <button className="instructor-button" onClick={viewinstructor}>Instructor Info</button>
            <button className="instructor-button" onClick={viewcourses}>Courses</button>
        </div>
    );
}

export default InstructorSelection;
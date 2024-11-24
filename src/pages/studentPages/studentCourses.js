import React from 'react';
import './student.css';
import { GetCourses} from './studentFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function StudentCourses() {
    const { currentUser } = useAuth();
    const viewcourse = async () => {
        try {
            const courses = await GetCourses(currentUser);
            console.log(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    return (
        <div className="student">
            <h1 className="student-header">Student Courses</h1>
            <button className="student-button" onClick={viewcourse}>Log Course</button>
        </div>
    );
}

export default StudentCourses;
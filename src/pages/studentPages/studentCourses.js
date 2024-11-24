import React from 'react';
import './student.css';
import { getCourse1 } from './studentFunctions';
function StudentCourses() {
    const course1 = getCourse1();
    return (
        <div className="student">
            <h1 className="student-header">Student Courses</h1>
            <div className="student-semester">
                <h2 className="student-label">Fall 2024</h2>
            </div>
            <button className="student-button" onClick={() => console.log(course1)}>Log Course</button>

        </div>
    );
}

export default StudentCourses;
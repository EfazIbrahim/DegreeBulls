import React from 'react';
import './student.css';
// import { getCourses } from './studentFunctions';
function StudentCourses() {
    const handleButtonClick = async () => {
        try {
            const courses = await getCourses();
            console.log(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    return (
        <div className="student">
            {/*<button className="student-button" onClick={handleButtonClick}>Log Course</button>*/}
            <h1 className="student-header">Student Courses</h1>
            <div className="student-semester">
                <h2 className="student-label">Fall 2024</h2>
            </div>

        </div>
    );
}
export default StudentCourses;
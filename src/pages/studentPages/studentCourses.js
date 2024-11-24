import React from 'react';
import './student.css';
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
            <h1 className="student-header">Student Courses</h1>
            <button className="student-button" onClick={handleButtonClick}>Log Course</button>
        </div>
    );
}
export default StudentCourses;
import React, { useState, useEffect } from 'react';
import './student.css';
import { GetCourses } from './studentFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function StudentCourses() {
    const { currentUser } = useAuth();
    const [courses, setCourses] = useState([]);

    const getCourse = async () => {
        try {
            const courses = await GetCourses(currentUser);
            setCourses(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        getCourse();
    }, []);

    return (
        <div className="student">
            <h1 className="student-header">Courses</h1>
            <div className="student-semester">
                {courses.map((course, index) => (
                    <div key={index}>
                        <h2 className="student-label">{course.semester}:</h2>
                        <div>
                            {course.courses.map((c, idx) => (
                                <h1 className="student-courses" key={idx}>{c.course}: {c.grade}</h1>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentCourses;
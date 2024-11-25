// import React from 'react';
// import './advisor.css';
// import { selectStudent, getCourses, getStudentCourses, addCourse, removeCourse  } from './advisorFunctions.js';
// import { useAuth } from '../../context/AuthContext.js';
//
// function StudentSelection() {
//     const { currentUser } = useAuth();
//     const id = "2ko5rQG2NHhput2ZS1SOPdyIUUw2" //for test purposes
//     const courseID = "CAI 4002" //for test purposes
//
//     const viewcourse = async () => {
//         try {
//             const course = await getCourses(id);
//             console.log(course);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//
//     return (
//         <div className="advisor">
//             <h1 className="advisor-header">Courses</h1>
//             <button className="instructor-button" onClick={viewcourse}>All Course</button>
//         </div>
//     );
// }
//
//
// export default StudentSelection;

import React, { useState, useEffect, useRef } from 'react';
import './advisor.css';
import { getCourses } from './advisorFunctions.js';
import { useAuth } from '../../context/AuthContext.js';
import { useDispatch } from 'react-redux';
import { addString } from '../../redux/store';

function StudentSelection() {
    const { currentUser } = useAuth();
    const id = "2ko5rQG2NHhput2ZS1SOPdyIUUw2"; // Hardcoded student ID
    const [courses, setCourses] = useState([]);
    const hasMounted = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let allCourses = await getCourses(id);
                console.log(allCourses);
                setCourses(allCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        if (!hasMounted.current && currentUser) {
            dispatch(addString(currentUser.uid + " viewed instructor course list")); // Add log to Redux store
            fetchCourses();
            hasMounted.current = true;
        }
    }, [currentUser, dispatch]);

    const getInstructor = (course) => {
        switch (course) {
            case "CAI 4002":
                return "Dr. Morgan";
            case "COT 4400":
                return "Topsakal";
            case "CIS 4930":
                return "Donald Trump";
            default:
                return "Dr. John Doe";
        }
    };

    return (
        <div className="advisor">
            <h1 className="advisor-header">Courses</h1>
            {courses.length > 0 && (
                <table className="courses-table">
                    <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Instructor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course, index) => (
                        <tr key={index}>
                            <td>{course}</td>
                            <td>{getInstructor(course)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default StudentSelection;
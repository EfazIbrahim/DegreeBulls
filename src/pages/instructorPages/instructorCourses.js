// import React from 'react';
// import './instructor.css';
// import { GetInstructorData, GetInstructorCourses } from './instructorFunctions.js';
// import { useAuth } from '../../context/AuthContext.js';
//
// function InstructorSelection() {
//     const { currentUser } = useAuth();
//     const viewinstructor = async () => {
//         try {
//             const instructor = await GetInstructorData(currentUser);
//             console.log(instructor);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//     const viewcourses = async () => {
//         try {
//             const courses = await GetInstructorCourses(currentUser);
//             console.log(courses);
//         } catch (error) {
//             console.error('Error fetching courses:', error);
//         }
//     }
//     return (
//         <div className="instructor">
//             <h1 className="instructor-header">Course Selection</h1>
//             <button className="instructor-button" onClick={viewinstructor}>Instructor Info</button>
//             <button className="instructor-button" onClick={viewcourses}>Courses</button>
//         </div>
//     );
// }
//
// export default InstructorSelection;
//
// import React, { useState, useEffect } from 'react';
// import './instructor.css';
// import { GetInstructorData, GetInstructorCourses } from './instructorFunctions.js';
// import { useAuth } from '../../context/AuthContext.js';
//
// function InstructorSelection() {
//     const { currentUser } = useAuth();
//     const [instructorData, setInstructorData] = useState(null);
//
//     useEffect(() => {
//         const fetchInstructor = async () => {
//             try {
//                 const instructor = await GetInstructorData(currentUser);
//                 setInstructorData(instructor);
//             } catch (error) {
//                 console.error('Error fetching instructor:', error);
//             }
//         };
//
//         fetchInstructor();
//     }, [currentUser]);
//
//     const viewcourses = async () => {
//         try {
//             const courses = await GetInstructorCourses(currentUser);
//             console.log(courses);
//         } catch (error) {
//             console.error('Error fetching courses:', error);
//         }
//     };
//
//     return (
//         <div className="instructor">
//             <h1 className="instructor-header">Course Selection</h1>
//             <button className="instructor-button" onClick={viewcourses}>Courses</button>
//             {instructorData && (
//                 <div className="instructor-info">
//                     <p className="instructor-info-text">{instructorData.Name}</p>
//                     <p className="instructor-info-text">{instructorData.Department}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default InstructorSelection;

import React, { useState, useEffect, useRef } from 'react';
import './instructor.css';
import { GetInstructorData, GetInstructorCourses } from './instructorFunctions.js';
import { useAuth } from '../../context/AuthContext.js';
import { useDispatch } from 'react-redux';
import { addString } from '../../redux/store';

function InstructorSelection() {
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const [instructorData, setInstructorData] = useState(null);
    const [coursesData, setCoursesData] = useState(new Map());
    const hasMounted = useRef(false);

    useEffect(() => {
        const fetchInstructor = async () => {
            try {
                const instructor = await GetInstructorData(currentUser);
                setInstructorData(instructor);
            } catch (error) {
                console.error('Error fetching instructor:', error);
            }
        };

        const fetchCourses = async () => {
            try {
                const courses = await GetInstructorCourses(currentUser);
                setCoursesData(courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        if (!hasMounted.current && currentUser) {
            dispatch(addString(currentUser.uid + " viewed course list")); // Add log to Redux store
            fetchInstructor();
            fetchCourses();
            hasMounted.current = true;
        }
    }, [currentUser, dispatch]);

    return (
        <div className="instructor">
            <h1 className="instructor-header">Courses</h1>
            {instructorData && (
                <div className="instructor-info">
                    <p className="instructor-info-text">{instructorData.Name}</p>
                    <p className="instructor-info-text">{instructorData.Department}</p>
                </div>
            )}
            {Array.from(coursesData.entries()).map(([course, details]) => (
                <div key={course} className="instructor-table-container">
                    {details.Years.map((year) => (
                        <div key={year}>
                            <h2>{year}</h2>
                            <table className="instructor-table">
                                <thead>
                                <tr>
                                    <th>Course</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{course}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default InstructorSelection;
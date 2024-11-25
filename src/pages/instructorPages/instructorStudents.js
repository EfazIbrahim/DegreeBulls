// import React from 'react';
// import './instructor.css';
// import { GetInstructorStudents, AssignGrade } from './instructorFunctions.js';
// import { useAuth } from '../../context/AuthContext.js';
//
// function InstructorStudents() {
//     const { currentUser } = useAuth();
//     const viewstudents = async () => {
//         try {
//             const instructor = await GetInstructorStudents(currentUser);
//             console.log(instructor);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//     const assigngrade = async () => {
//         try {
//             const courses = await AssignGrade(currentUser, "Ishraq Khan", "A");
//             console.log(courses);
//         } catch (error) {
//             console.error('Error fetching courses:', error);
//         }
//     }
//     return (
//         <div className="instructor">
//             <h1 className="instructor-header">Students</h1>
//             <button className="instructor-button" onClick={viewstudents}>Students</button>
//             <button className="instructor-button" onClick={assigngrade}>Assign Grade</button>
//         </div>
//     );
// }
//
// export default InstructorStudents;




//
// import React, { useState } from 'react';
//
// import './instructor.css';
// import { GetInstructorStudents } from './instructorFunctions.js';
// import { useAuth } from '../../context/AuthContext.js';
//
// function InstructorStudents() {
//     const { currentUser } = useAuth();
//     const [studentsData, setStudentsData] = useState(new Map());
//
//     const viewstudents = async () => {
//         try {
//             const instructor = await GetInstructorStudents(currentUser);
//             setStudentsData(instructor);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     };
//
//     return (
//         <div className="instructor">
//             <h1 className="instructor-header">Students</h1>
//             <button className="instructor-button" onClick={viewstudents}>Students</button>
//             {Array.from(studentsData.entries()).map(([course, students]) => (
//                 <div key={course}>
//                     <h2>{course}</h2>
//                     <table className="instructor-table">
//                         <thead>
//                         <tr>
//                             <th>Students</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {Array.from(students.keys()).map((student) => (
//                             <tr key={student}>
//                                 <td>{student}</td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// export default InstructorStudents;


import './instructor.css';
import React, { useState, useEffect } from 'react';
import { GetInstructorStudents } from './instructorFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function InstructorStudents() {
    const { currentUser } = useAuth();
    const [studentsData, setStudentsData] = useState(new Map());

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const instructor = await GetInstructorStudents(currentUser);
                setStudentsData(instructor);
            } catch (error) {
                console.error('Error fetching instructor:', error);
            }
        };

        fetchStudents();
    }, [currentUser]);

    return (
        <div className="instructor">
            <h1 className="instructor-header">Students</h1>
            {Array.from(studentsData.entries()).map(([course, students]) => (
                <div key={course} className="instructor-table-container">
                    <h2>{course}</h2>
                    <table className="instructor-table">
                        <thead>
                        <tr>
                            <th>Students</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from(students.keys()).map((student) => (
                            <tr key={student}>
                                <td>{student}</td>
                            </tr>
                        ))}
                        {course === "CAI 4002" && (
                            <tr>
                                <td>Donal Trump</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default InstructorStudents;
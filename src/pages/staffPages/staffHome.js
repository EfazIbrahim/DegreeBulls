//



//
// import React, { useState } from 'react';
// import './staff.css';
// import { newCourse, deleteCourse, modStudent, removeInstructor, assignInstructor, unassignInstructor, addMajor, removeMajor } from './staffFunctions.js';
// import { useAuth } from '../../context/AuthContext.js';
//
// function StaffHome() {
//     const { currentUser } = useAuth();
//     const [courses, setCourses] = useState(['COT 4400', 'CIS 4930', 'CAI 4002', 'CNT 4410']);
//     const [majors, setMajors] = useState({ IT: '124', CS: '120' });
//     const [courseSearch, setCourseSearch] = useState('');
//     const [majorSearch, setMajorSearch] = useState('');
//
//     const newcourse = async () => {
//         try {
//             const out = await newCourse(currentUser, "CAI 4841", "CS");
//             console.log(out);
//             setCourses(out);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//
//     const delcourse = async () => {
//         try {
//             const out = await deleteCourse(currentUser, "CAI 4841", "CS");
//             console.log(out);
//             setCourses(out);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//
//     const addstudent = async () => {
//         try {
//             const changeName = "Ishraq Sadik";
//             const out = await modStudent(currentUser, "2ko5rQG2NHhput2ZS1SOPdyIUUw2", changeName);
//             console.log(out);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//
//     const unassign_ins = async () => {
//         try {
//             const out = await unassignInstructor(currentUser, "M49HCtwZpqVGxrkEYakcSlyeUaH2", "CAI 4841", "CS");
//             console.log(out);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//
//     const assign_ins = async () => {
//         try {
//             const out = await assignInstructor(currentUser, "M49HCtwZpqVGxrkEYakcSlyeUaH2", "CAI 4841", "CS");
//             console.log(out);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//
//     const addmajor = async () => {
//         try {
//             const out = await addMajor(currentUser, "CySec", 120);
//             console.log(out);
//             setMajors(out);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//
//     const delmajor = async () => {
//         try {
//             const out = await removeMajor(currentUser, "CySec");
//             console.log(out);
//             setMajors(out);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//
//     return (
//         <div className="staff">
//             <h1 className="staff-header">Home</h1>
//             <div className="button-group">
//                 <button className="instructor-button" onClick={newcourse}>New Course</button>
//                 <button className="instructor-button" onClick={delcourse}>Delete Course</button>
//                 <input
//                     type="text"
//                     placeholder="Search Courses"
//                     value={courseSearch}
//                     onChange={(e) => setCourseSearch(e.target.value)}
//                 />
//                 <table>
//                     <thead>
//                     <tr>
//                         <th>Department Courses</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {courses.map(course => (
//                         <tr key={course}><td>{course}</td></tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="button-group">
//                 <button className="instructor-button" onClick={addstudent}>Modify Student</button>
//                 <button className="instructor-button" onClick={assign_ins}>Assign Instructor</button>
//                 <button className="instructor-button" onClick={unassign_ins}>Unassign Instructor</button>
//             </div>
//             <div className="button-group">
//                 <button className="instructor-button" onClick={addmajor}>Add Major</button>
//                 <button className="instructor-button" onClick={delmajor}>Delete Major</button>
//                 <input
//                     type="text"
//                     placeholder="Search Majors"
//                     value={majorSearch}
//                     onChange={(e) => setMajorSearch(e.target.value)}
//                 />
//                 <table>
//                     <thead>
//                     <tr>
//                         <th>Department Majors</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {Object.keys(majors).map(major => (
//                         <tr key={major}><td>{major}</td></tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
// export default StaffHome;


import React, { useState } from 'react';
import './staff.css';
import { newCourse, deleteCourse, modStudent, removeInstructor, assignInstructor, unassignInstructor, addMajor, removeMajor } from './staffFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function StaffHome() {
    const { currentUser } = useAuth();
    const [courses, setCourses] = useState(['COT 4400', 'CIS 4930', 'CAI 4002', 'CNT 4410']);
    const [majors, setMajors] = useState({ IT: '124', CS: '120' });
    const [courseSearch, setCourseSearch] = useState('');
    const [majorSearch, setMajorSearch] = useState('');

    const newcourse = async () => {
        if (courses.includes("CAI 4841")) {
            console.error('Error: Course already exists');
            return;
        }
        try {
            const out = await newCourse(currentUser, "CAI 4841", "CS");
            console.log(out);
            setCourses(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }

    const delcourse = async () => {
        try {
            const out = await deleteCourse(currentUser, "CAI 4841", "CS");
            console.log(out);
            setCourses(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }

    const addstudent = async () => {
        try {
            const changeName = "Ishraq Sadik";
            const out = await modStudent(currentUser, "2ko5rQG2NHhput2ZS1SOPdyIUUw2", changeName);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }

    const unassign_ins = async () => {
        try {
            const out = await unassignInstructor(currentUser, "M49HCtwZpqVGxrkEYakcSlyeUaH2", "CAI 4841", "CS");
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }

    const assign_ins = async () => {
        try {
            const out = await assignInstructor(currentUser, "M49HCtwZpqVGxrkEYakcSlyeUaH2", "CAI 4841", "CS");
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }

    const addmajor = async () => {
        if (majors['CySec']) {
            console.error('Error: Major already exists');
            return;
        }
        try {
            const out = await addMajor(currentUser, "CySec", 120);
            console.log(out);
            setMajors(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }

    const delmajor = async () => {
        try {
            const out = await removeMajor(currentUser, "CySec");
            console.log(out);
            setMajors(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }

    return (
        <div className="staff">
            <h1 className="staff-header">Home</h1>
            <div className="button-group">
                <button className="instructor-button" onClick={newcourse}>New Course</button>
                <button className="instructor-button" onClick={delcourse}>Delete Course</button>
                <input
                    type="text"
                    placeholder="Search Courses"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                />
                <table>
                    <thead>
                    <tr>
                        <th>Department Courses</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map(course => (
                        <tr key={course}><td>{course}</td></tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="button-group">
                {/*<button className="instructor-button" onClick={addstudent}>Modify Student</button>*/}
                {/*<button className="instructor-button" onClick={assign_ins}>Assign Instructor</button>*/}
                {/*<button className="instructor-button" onClick={unassign_ins}>Unassign Instructor</button>*/}
            </div>
            <div className="button-group">
                <button className="instructor-button" onClick={addmajor}>Add Major</button>
                <button className="instructor-button" onClick={delmajor}>Delete Major</button>
                <input
                    type="text"
                    placeholder="Search Majors"
                    value={majorSearch}
                    onChange={(e) => setMajorSearch(e.target.value)}
                />
                <table>
                    <thead>
                    <tr>
                        <th>Department Majors</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(majors).map(major => (
                        <tr key={major}><td>{major}</td></tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default StaffHome;
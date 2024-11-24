// import React from 'react';
// import './student.css';
// import { calculateGPA } from './studentFunctions.js';
// import {useAuth} from "../../context/AuthContext";
//
// function Gpa() {
//     const { currentUser } = useAuth();
//     const viewgpa = async () => {
//         try {
//             const gpa = await calculateGPA(currentUser);
//             console.log(gpa)
//         } catch (error) {
//             console.error('Error fetching gpa:', error);
//         }
//     };
//     return (
//         <div className="student">
//             <h1 className="student-header">Student GPA</h1>
//             <button className="student-button" onClick={viewgpa}>Log GPA</button>
//         </div>
//     );
// }
//
// export default Gpa;

// import React, { useState } from 'react';
// import './student.css';
// import { calculateGPA } from './studentFunctions.js';
// import { useAuth } from "../../context/AuthContext";
//
// function Gpa() {
//     const { currentUser } = useAuth();
//     const [gpa, setGpa] = useState(null);
//
//
//     const viewgpa = async () => {
//         try {
//             const gpa = await calculateGPA(currentUser);
//             setGpa(gpa.toFixed(2));
//         } catch (error) {
//             console.error('Error fetching gpa:', error);
//         }
//     };
//
//     return (
//         <div className="student">
//             <h1 className="student-header">Student GPA</h1>
//             <button className="student-button" onClick={viewgpa}>Log GPA</button>
//             {gpa !== null && <p className="gpa-text">Current Cumulative GPA is: {gpa}</p>}
//         </div>
//     );
// }
//
// export default Gpa;

//
// import React, { useState, useEffect } from 'react';
// import './student.css';
// import { calculateGPA } from './studentFunctions.js';
// import { useAuth } from "../../context/AuthContext";
//
// function Gpa() {
//     const { currentUser } = useAuth();
//     const [gpa, setGpa] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [selectedCourses, setSelectedCourses] = useState([]);
//     const suggestions = ['CEN 4020', 'CIS 2030', 'COP 2510', 'CDA 3510'];
//     const grades = ['A', 'B', 'C', 'D', 'F'];
//
//     useEffect(() => {
//         const fetchGpa = async () => {
//             try {
//                 const gpa = await calculateGPA(currentUser);
//                 setGpa(gpa.toFixed(2));
//             } catch (error) {
//                 console.error('Error fetching gpa:', error);
//             }
//         };
//         fetchGpa();
//     }, [currentUser]);
//
//     const handleSearchClick = () => {
//         setShowSuggestions(true);
//     };
//
//     const handleSuggestionClick = (suggestion) => {
//         setSearchTerm(suggestion);
//         setShowSuggestions(false);
//     };
//
//     const handleAddCourse = () => {
//         if (searchTerm && !selectedCourses.includes(searchTerm)) {
//             setSelectedCourses([...selectedCourses, searchTerm]);
//             setSearchTerm('');
//         }
//     };
//
//     const filteredSuggestions = suggestions.filter(suggestion =>
//         suggestion.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     return (
//         <div className="student">
//             <h1 className="student-header">Student GPA</h1>
//             {gpa !== null && <p className="gpa-text">Current Cumulative GPA is: {gpa}</p>}
//             <button className="what-if-button">What-if GPA</button>
//             <div className="search-container">
//                 <input
//                     type="text"
//                     className="search-bar"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onClick={handleSearchClick}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <button className="add-course-button" onClick={handleAddCourse}>Add Course</button>
//             </div>
//             {showSuggestions && (
//                 <ul className="suggestions-list">
//                     {filteredSuggestions.map((suggestion, index) => (
//                         <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                             {suggestion}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             {selectedCourses.length > 0 && (
//                 <table className="course-table">
//                     <thead>
//                     <tr>
//                         <th>Course Name</th>
//                         <th>GPA Analysis</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {selectedCourses.map((course, index) => (
//                         <tr key={index}>
//                             <td>{course}</td>
//                             <td>
//                                 <select>
//                                     {grades.map((grade, i) => (
//                                         <option key={i} value={grade}>{grade}</option>
//                                     ))}
//                                 </select>
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }
//
// export default Gpa;


import React, { useState, useEffect } from 'react';
import './student.css';
import { calculateGPA } from './studentFunctions.js';
import { useAuth } from "../../context/AuthContext";

function Gpa() {
    const { currentUser } = useAuth();
    const [gpa, setGpa] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [grades, setGrades] = useState({});
    const [whatIfGpa, setWhatIfGpa] = useState(null);
    const suggestions = ['CEN 4020', 'CIS 2030', 'COP 2510', 'CDA 3510'];
    const gradeOptions = ['A', 'B', 'C', 'D', 'F'];

    useEffect(() => {
        const fetchGpa = async () => {
            try {
                const gpa = await calculateGPA(currentUser);
                setGpa(gpa.toFixed(2));
            } catch (error) {
                console.error('Error fetching gpa:', error);
            }
        };
        fetchGpa();
    }, [currentUser]);

    const handleSearchClick = () => {
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setShowSuggestions(false);
    };

    const handleAddCourse = () => {
        if (searchTerm && !selectedCourses.includes(searchTerm)) {
            setSelectedCourses([...selectedCourses, searchTerm]);
            setSearchTerm('');
        }
    };

    const handleGradeChange = (course, grade) => {
        setGrades({ ...grades, [course]: grade });
    };

    const calculateWhatIfGpa = () => {
        const gradePoints = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
        const totalGradePoints = selectedCourses.reduce((total, course) => {
            return total + (gradePoints[grades[course]] || 0);
        }, 0);
        const newGpa = ((5 * gpa) + totalGradePoints) / (selectedCourses.length + 5);
        setWhatIfGpa(newGpa.toFixed(2));
    };

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="student">
            <h1 className="student-header">Student GPA</h1>
            {gpa !== null && <p className="gpa-text">Current Cumulative GPA is: {gpa}</p>}
            <div className="search-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                    value={searchTerm}
                    onClick={handleSearchClick}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="add-course-button" onClick={handleAddCourse}>Add Course</button>
            </div>
            {showSuggestions && (
                <ul className="suggestions-list">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            {selectedCourses.length > 0 && (
                <table className="course-table">
                    <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>GPA Analysis</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedCourses.map((course, index) => (
                        <tr key={index}>
                            <td>{course}</td>
                            <td>
                                <select onChange={(e) => handleGradeChange(course, e.target.value)}>
                                    <option value="">Select Grade</option>
                                    {gradeOptions.map((grade, i) => (
                                        <option key={i} value={grade}>{grade}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <button className="what-if-button" onClick={calculateWhatIfGpa}>What-if GPA</button>
            {whatIfGpa !== null && <p className="gpa-text">What-if GPA: {whatIfGpa}</p>}
        </div>
    );
}

export default Gpa;
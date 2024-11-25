// // import React, { useState } from 'react';
// // import './advisor.css';
// // import { getStudentCourses, getCourses, addCourse, removeCourse, calculateGPA, GetCourses } from './advisorFunctions.js';
// // import { useAuth } from '../../context/AuthContext.js';
// //
// //
// // function StudentSelection() {
// //     const { currentUser } = useAuth();
// //     const [searchInput, setSearchInput] = useState('');
// //     const [suggestions, setSuggestions] = useState([]);
// //     const [selectedCourses, setSelectedCourses] = useState([]);
// //     const [courseSearchInput, setCourseSearchInput] = useState('');
// //     const [courseSuggestions, setCourseSuggestions] = useState([]);
// //     const [availableCourses, setAvailableCourses] = useState([]);
// //     const [studentSelected, setStudentSelected] = useState(false);
// //     const [whatIfCourseInput, setWhatIfCourseInput] = useState('');
// //
// //     const hardcodedStudents = ['Ishraq Sadik', 'Farhan Shahriar', 'Efaz Ibrahim'];
// //     const hardcodedStudentId = '2ko5rQG2NHhput2ZS1SOPdyIUUw2'; // Hardcoded student ID
// //
// //     const studentCourse = async () => {
// //         try {
// //             const out = await GetCourses("2ko5rQG2NHhput2ZS1SOPdyIUUw2");
// //             console.log(out);
// //         } catch (error) {
// //             console.error('Error fetching instructor:', error);
// //         }
// //     }
// //     const studentGpa = async () => {
// //         try {
// //             const out = await calculateGPA("2ko5rQG2NHhput2ZS1SOPdyIUUw2");
// //             console.log(out);
// //         } catch (error) {
// //             console.error('Error fetching instructor:', error);
// //         }
// //     }
// //
// //     const handleInputChange = (event) => {
// //         const input = event.target.value;
// //         setSearchInput(input);
// //         if (input.length > 2) {
// //             const filteredSuggestions = hardcodedStudents.filter(student =>
// //                 student.toLowerCase().includes(input.toLowerCase())
// //             );
// //             setSuggestions(filteredSuggestions);
// //         } else {
// //             setSuggestions([]);
// //         }
// //     };
// //
// //     const handleStudentSelect = async (student) => {
// //         setSearchInput(student);
// //         setSuggestions([]);
// //         setStudentSelected(true);
// //         try {
// //             const courses = await getStudentCourses(hardcodedStudentId);
// //             setSelectedCourses(courses);
// //             const availableCourses = await getCourses(hardcodedStudentId);
// //             setAvailableCourses(availableCourses);
// //         } catch (error) {
// //             console.error('Error fetching student courses:', error);
// //         }
// //     };
// //
// //     const handleCourseInputChange = (event) => {
// //         const input = event.target.value;
// //         setCourseSearchInput(input);
// //         if (input.length > 2) {
// //             const filteredSuggestions = availableCourses.filter(course =>
// //                 course.toLowerCase().includes(input.toLowerCase())
// //             );
// //             setCourseSuggestions(filteredSuggestions);
// //         } else {
// //             setCourseSuggestions([]);
// //         }
// //     };
// //
// //     const handleAddCourse = async (course) => {
// //         try {
// //             const updatedCourses = await addCourse(hardcodedStudentId, course);
// //             setSelectedCourses(updatedCourses);
// //         } catch (error) {
// //             console.error('Error adding course:', error);
// //         }
// //     };
// //
// //     const handleDropCourse = async (course) => {
// //         try {
// //             const updatedCourses = await removeCourse(hardcodedStudentId, course);
// //             setSelectedCourses(updatedCourses);
// //         } catch (error) {
// //             console.error('Error dropping course:', error);
// //         }
// //     };
// //
// //     const handleWhatIfCourseInputChange = (event) => {
// //         setWhatIfCourseInput(event.target.value);
// //     };
// //
// //     return (
// //         <div className="advisor">
// //             <h1 className="advisor-header">Student Selection</h1>
// //             <button className="advisor-button" onClick={studentCourse}>log student courses</button>
// //             <button className="advisor-button" onClick={studentGpa}>log student gpa</button>
// //             <input
// //                 type="text"
// //                 className="advisor-search"
// //                 value={searchInput}
// //                 onChange={handleInputChange}
// //                 placeholder="Search for a student..."
// //             />
// //             {suggestions.length > 0 && (
// //                 <div className="suggestions-dropdown">
// //                     {suggestions.map((student, index) => (
// //                         <div
// //                             key={index}
// //                             className="suggestion-item"
// //                             onClick={() => handleStudentSelect(student)}
// //                         >
// //                             {student}
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}
// //             {selectedCourses.length > 0 && (
// //                 <table className="courses-table">
// //                     <thead>
// //                     <tr>
// //                         <th>Course Name</th>
// //                     </tr>
// //                     </thead>
// //                     <tbody>
// //                     {selectedCourses.map((course, index) => (
// //                         <tr key={index}>
// //                             <td>{course}</td>
// //                         </tr>
// //                     ))}
// //                     </tbody>
// //                 </table>
// //             )}
// //             {studentSelected && (
// //                 <>
// //                     <input
// //                         type="text"
// //                         className="advisor-search"
// //                         value={courseSearchInput}
// //                         onChange={handleCourseInputChange}
// //                         placeholder="Search for a course..."
// //                     />
// //                     {courseSuggestions.length > 0 && (
// //                         <div className="suggestions-dropdown">
// //                             {courseSuggestions.map((course, index) => (
// //                                 <div
// //                                     key={index}
// //                                     className="suggestion-item"
// //                                     onClick={() => setCourseSearchInput(course)}
// //                                 >
// //                                     {course}
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     )}
// //                     <button onClick={() => handleAddCourse(courseSearchInput)}>Add Course</button>
// //                     <button onClick={() => handleDropCourse(courseSearchInput)}>Drop Course</button>
// //                     <div className="what-if-container">
// //                         <h2>What-if Analysis</h2>
// //                         <div className="what-if-search-container">
// //                             <input
// //                                 type="text"
// //                                 className="advisor-search what-if-search"
// //                                 value={whatIfCourseInput}
// //                                 onChange={handleWhatIfCourseInputChange}
// //                                 placeholder="Search for a course..."
// //                             />
// //                             <button onClick={() => handleAddCourse(whatIfCourseInput)}>Add</button>
// //                         </div>
// //                     </div>
// //                 </>
// //             )}
// //         </div>
// //     );
// // }
// // export default StudentSelection;
//
//
// import React, { useState } from 'react';
// import './advisor.css';
// import { getStudentCourses, getCourses, addCourse, removeCourse, calculateGPA, GetCourses } from './advisorFunctions.js';
// import { useAuth } from '../../context/AuthContext.js';
//
// function StudentSelection() {
//     const { currentUser } = useAuth();
//     const [searchInput, setSearchInput] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [selectedCourses, setSelectedCourses] = useState([]);
//     const [courseSearchInput, setCourseSearchInput] = useState('');
//     const [courseSuggestions, setCourseSuggestions] = useState([]);
//     const [availableCourses, setAvailableCourses] = useState([]);
//     const [studentSelected, setStudentSelected] = useState(false);
//
//     const hardcodedStudents = ['Ishraq Sadik', 'Farhan Shahriar', 'Efaz Ibrahim'];
//     const hardcodedStudentId = '2ko5rQG2NHhput2ZS1SOPdyIUUw2'; // Hardcoded student ID
//
//     const studentCourse = async () => {
//         try {
//             const out = await GetCourses("2ko5rQG2NHhput2ZS1SOPdyIUUw2");
//             console.log(out);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//     const studentGpa = async () => {
//         try {
//             const out = await calculateGPA("2ko5rQG2NHhput2ZS1SOPdyIUUw2");
//             console.log(out);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//
//     const handleInputChange = (event) => {
//         const input = event.target.value;
//         setSearchInput(input);
//         if (input.length > 2) {
//             const filteredSuggestions = hardcodedStudents.filter(student =>
//                 student.toLowerCase().includes(input.toLowerCase())
//             );
//             setSuggestions(filteredSuggestions);
//         } else {
//             setSuggestions([]);
//         }
//     };
//
//     const handleStudentSelect = async (student) => {
//         setSearchInput(student);
//         setSuggestions([]);
//         setStudentSelected(true);
//         try {
//             const courses = await getStudentCourses(hardcodedStudentId);
//             setSelectedCourses(courses);
//             const availableCourses = await getCourses(hardcodedStudentId);
//             setAvailableCourses(availableCourses);
//         } catch (error) {
//             console.error('Error fetching student courses:', error);
//         }
//     };
//
//     const handleCourseInputChange = (event) => {
//         const input = event.target.value;
//         setCourseSearchInput(input);
//         if (input.length > 2) {
//             const filteredSuggestions = availableCourses.filter(course =>
//                 course.toLowerCase().includes(input.toLowerCase())
//             );
//             setCourseSuggestions(filteredSuggestions);
//         } else {
//             setCourseSuggestions([]);
//         }
//     };
//
//     const handleAddCourse = async (course) => {
//         try {
//             const updatedCourses = await addCourse(hardcodedStudentId, course);
//             setSelectedCourses(updatedCourses);
//         } catch (error) {
//             console.error('Error adding course:', error);
//         }
//     };
//
//     const handleDropCourse = async (course) => {
//         try {
//             const updatedCourses = await removeCourse(hardcodedStudentId, course);
//             setSelectedCourses(updatedCourses);
//         } catch (error) {
//             console.error('Error dropping course:', error);
//         }
//     };
//
//     return (
//         <div className="advisor">
//             <h1 className="advisor-header">Student Selection</h1>
//             <button className="advisor-button" onClick={studentCourse}>log student courses</button>
//             <button className="advisor-button" onClick={studentGpa}>log student gpa</button>
//             <input
//                 type="text"
//                 className="advisor-search"
//                 value={searchInput}
//                 onChange={handleInputChange}
//                 placeholder="Search for a student..."
//             />
//             {suggestions.length > 0 && (
//                 <div className="suggestions-dropdown">
//                     {suggestions.map((student, index) => (
//                         <div
//                             key={index}
//                             className="suggestion-item"
//                             onClick={() => handleStudentSelect(student)}
//                         >
//                             {student}
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {selectedCourses.length > 0 && (
//                 <table className="courses-table">
//                     <thead>
//                     <tr>
//                         <th>Course Name</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {selectedCourses.map((course, index) => (
//                         <tr key={index}>
//                             <td>{course}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             )}
//             {studentSelected && (
//                 <>
//                     <input
//                         type="text"
//                         className="advisor-search"
//                         value={courseSearchInput}
//                         onChange={handleCourseInputChange}
//                         placeholder="Search for a course..."
//                     />
//                     {courseSuggestions.length > 0 && (
//                         <div className="suggestions-dropdown">
//                             {courseSuggestions.map((course, index) => (
//                                 <div
//                                     key={index}
//                                     className="suggestion-item"
//                                     onClick={() => setCourseSearchInput(course)}
//                                 >
//                                     {course}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     <button onClick={() => handleAddCourse(courseSearchInput)}>Add Course</button>
//                     <button onClick={() => handleDropCourse(courseSearchInput)}>Drop Course</button>
//                     <button className="advisor-button">What-if Analysis</button>
//                 </>
//             )}
//         </div>
//     );
// }
// export default StudentSelection;

import React, { useState } from 'react';
import './advisor.css';
import { getStudentCourses, getCourses, addCourse, removeCourse, calculateGPA, GetCourses } from './advisorFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function StudentSelection() {
    const { currentUser } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [courseSearchInput, setCourseSearchInput] = useState('');
    const [courseSuggestions, setCourseSuggestions] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [studentSelected, setStudentSelected] = useState(false);
    const [showWhatIfAnalysis, setShowWhatIfAnalysis] = useState(false);
    const [whatIfSearchInput, setWhatIfSearchInput] = useState('');
    const [whatIfCourses, setWhatIfCourses] = useState([]);
    const [currentGPA, setCurrentGPA] = useState(null);
    const [whatIfGPA, setWhatIfGPA] = useState(null);

    const hardcodedStudents = ['Ishraq Sadik', 'Farhan Shahriar', 'Efaz Ibrahim'];
    const hardcodedStudentId = '2ko5rQG2NHhput2ZS1SOPdyIUUw2'; // Hardcoded student ID

    const studentCourse = async () => {
        try {
            const out = await GetCourses("2ko5rQG2NHhput2ZS1SOPdyIUUw2");
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const studentGpa = async () => {
        try {
            const out = await calculateGPA("2ko5rQG2NHhput2ZS1SOPdyIUUw2");
            console.log(out);
            setCurrentGPA(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }

    const handleInputChange = (event) => {
        const input = event.target.value;
        setSearchInput(input);
        if (input.length > 2) {
            const filteredSuggestions = hardcodedStudents.filter(student =>
                student.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleStudentSelect = async (student) => {
        setSearchInput(student);
        setSuggestions([]);
        setStudentSelected(true);
        try {
            const courses = await getStudentCourses(hardcodedStudentId);
            setSelectedCourses(courses);
            const availableCourses = await getCourses(hardcodedStudentId);
            setAvailableCourses(availableCourses);
        } catch (error) {
            console.error('Error fetching student courses:', error);
        }
    };

    const handleCourseInputChange = (event) => {
        const input = event.target.value;
        setCourseSearchInput(input);
        if (input.length > 2) {
            const filteredSuggestions = availableCourses.filter(course =>
                course.toLowerCase().includes(input.toLowerCase())
            );
            setCourseSuggestions(filteredSuggestions);
        } else {
            setCourseSuggestions([]);
        }
    };

    const handleAddCourse = async (course) => {
        try {
            const updatedCourses = await addCourse(hardcodedStudentId, course);
            setSelectedCourses(updatedCourses);
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleDropCourse = async (course) => {
        try {
            const updatedCourses = await removeCourse(hardcodedStudentId, course);
            setSelectedCourses(updatedCourses);
        } catch (error) {
            console.error('Error dropping course:', error);
        }
    };

    const handleWhatIfAnalysisClick = () => {
        setShowWhatIfAnalysis(true);
    };

    const handleBackButtonClick = () => {
        setShowWhatIfAnalysis(false);
    };

    const handleWhatIfSearchInputChange = (event) => {
        setWhatIfSearchInput(event.target.value);
    };

    const handleAddWhatIfCourse = () => {
        setWhatIfCourses([...whatIfCourses, whatIfSearchInput]);
        setWhatIfSearchInput('');
    };

    const handleCalculateGPA = async () => {
        try {
            const out = await calculateGPA("2ko5rQG2NHhput2ZS1SOPdyIUUw2");
            setCurrentGPA(out);

            const gradePoints = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
            let totalPoints = 0;
            let totalCourses = whatIfCourses.length;

            whatIfCourses.forEach(course => {
                const sanitizedCourse = course.replace(/\s+/g, '_');
                const grade = document.querySelector(`#grade-${sanitizedCourse}`).value;
                totalPoints += gradePoints[grade] || 0;
            });

            const newWhatIfGPA = ((5 * out) + totalPoints) / (5 + totalCourses);
            setWhatIfGPA(newWhatIfGPA.toFixed(2));
        } catch (error) {
            console.error('Error calculating GPA:', error);
        }
    };

    return (
        <div className="advisor">
            <h1 className="advisor-header">Student Selection</h1>
            {/*<button className="advisor-button" onClick={studentCourse}>log student courses</button>*/}
            {/* <button className="advisor-button" onClick={studentGpa}>log student gpa</button> */}
            <input
                type="text"
                className="advisor-search"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Search for a student..."
            />
            {suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                    {suggestions.map((student, index) => (
                        <div
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleStudentSelect(student)}
                        >
                            {student}
                        </div>
                    ))}
                </div>
            )}
            {selectedCourses.length > 0 && (
                <table className="courses-table">
                    <thead>
                    <tr>
                        <th>Course Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedCourses.map((course, index) => (
                        <tr key={index}>
                            <td>{course}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {studentSelected && (
                <>
                    <input
                        type="text"
                        className="advisor-search"
                        value={courseSearchInput}
                        onChange={handleCourseInputChange}
                        placeholder="Search for a course..."
                    />
                    {courseSuggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {courseSuggestions.map((course, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => setCourseSearchInput(course)}
                                >
                                    {course}
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={() => handleAddCourse(courseSearchInput)}>Add Course</button>
                    <button onClick={() => handleDropCourse(courseSearchInput)}>Drop Course</button>
                    <button className="advisor-button" onClick={handleWhatIfAnalysisClick}>What-if Analysis</button>
                </>
            )}
            {showWhatIfAnalysis && (
                <>
                    <h2 className="what-if-heading">What-if Analysis</h2>
                    <div className="what-if-search-container">
                        <input
                            type="text"
                            className="advisor-search what-if-search"
                            value={whatIfSearchInput}
                            onChange={handleWhatIfSearchInputChange}
                            placeholder="Search for a course..."
                        />
                        <button onClick={handleAddWhatIfCourse}>Add</button>
                    </div>
                    <table className="what-if-table">
                        <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Grade</th>
                        </tr>
                        </thead>
                        <tbody>
                        {whatIfCourses.map((course, index) => (
                            <tr key={index}>
                                <td>{course}</td>
                                <td>
                                    <select id={`grade-${course.replace(/\s+/g, '_')}`}>
                                        <option value="">Select Grade</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="F">F</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className="advisor-button" onClick={handleCalculateGPA}>Calculate GPA</button>
                    {currentGPA !== null && <p className="gpa-text">Current GPA: {currentGPA}</p>}
                    {whatIfGPA !== null && <p className="gpa-text">What-if GPA: {whatIfGPA}</p>}
                    <button className="advisor-button" onClick={handleBackButtonClick}>Back</button>
                </>
            )}
        </div>
    );
}

export default StudentSelection;
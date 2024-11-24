// import React from 'react';
// import './advisor.css';
// import { selectStudent, getCourses, getStudentCourses, addCourse, removeCourse  } from './advisorFunctions.js';
// import { useAuth } from '../../context/AuthContext.js';
//
// function StudentSelection() {
//     const { currentUser } = useAuth();
//     const id = "2ko5rQG2NHhput2ZS1SOPdyIUUw2" //for test purposes
//     const courseID = "CAI 4002" //for test purposes
//     const viewstudent = async () => {
//         try {
//             const studentlist = await selectStudent(currentUser);
//             console.log(studentlist);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//     const viewcourse = async () => {
//         try {
//             const course = await getCourses(id);
//             console.log(course);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//     const viewstudentcourse = async () => {
//         try {
//             const course = await getStudentCourses(id);
//             console.log(course);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//     const add = async () => {
//         try {
//             const course = await addCourse(id, courseID);
//             console.log(course);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//     const drop = async () => {
//         try {
//             const course = await removeCourse(id, courseID);
//             console.log(course);
//         } catch (error) {
//             console.error('Error fetching instructor:', error);
//         }
//     }
//     return (
//         <div className="advisor">
//             <h1 className="advisor-header">Student Selection</h1>
//             <button className="instructor-button" onClick={viewstudent}>StudentList</button>
//             <button className="instructor-button" onClick={viewcourse}>All Course</button>
//             <button className="instructor-button" onClick={viewstudentcourse}>Student Course</button>
//             <button className="instructor-button" onClick={add}>Add Course</button>
//             <button className="instructor-button" onClick={drop}>Drop Course</button>
//         </div>
//     );
// }
//
//
// export default StudentSelection;



import React, { useState } from 'react';
import './advisor.css';
import { getStudentCourses, getCourses, addCourse, removeCourse } from './advisorFunctions.js';
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

    const hardcodedStudents = ['Ishraq Sadik', 'Farhan Shahriar', 'Efaz Ibrahim'];
    const hardcodedStudentId = '2ko5rQG2NHhput2ZS1SOPdyIUUw2'; // Hardcoded student ID

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

    return (
        <div className="advisor">
            <h1 className="advisor-header">Student Selection</h1>
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
                </>
            )}
        </div>
    );
}

export default StudentSelection;

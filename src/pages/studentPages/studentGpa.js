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

import React, { useState, useEffect } from 'react';
import './student.css';
import { calculateGPA } from './studentFunctions.js';
import { useAuth } from "../../context/AuthContext";

function Gpa() {
    const { currentUser } = useAuth();
    const [gpa, setGpa] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions = ['CEN 4020', 'CIS 2030', 'COP 2510', 'CDA 3510'];

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

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="student">
            <h1 className="student-header">Student GPA</h1>
            {gpa !== null && <p className="gpa-text">Current Cumulative GPA is: {gpa}</p>}
            <button className="what-if-button">What-if GPA</button>
            <div className="search-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                    value={searchTerm}
                    onClick={handleSearchClick}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="add-course-button">Add Course</button>
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
        </div>
    );
}

export default Gpa;
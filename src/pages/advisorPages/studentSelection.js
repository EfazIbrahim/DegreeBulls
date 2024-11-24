import React, { useState } from 'react';
import './advisor.css';

function StudentSelection() {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSearch, setSelectedSearch] = useState('');

    const students = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown']; // Example student names

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchInput(value);
        if (value) {
            const filteredSuggestions = students.filter(student =>
                student.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchInput(suggestion);
        setSuggestions([]);
        setSelectedSearch(suggestion);
    };

    return (
        <div className="advisor">
            <h1 className="advisor-header">Student Selection</h1>
            <input
                className="advisor-search"
                type="text"
                placeholder="Search for a student..."
                value={searchInput}
                onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
                <select
                    className="suggestions-dropdown"
                    size={suggestions.length}
                    onChange={(e) => handleSuggestionClick(e.target.value)}
                >
                    {suggestions.map((suggestion, index) => (
                        <option key={index} value={suggestion}>
                            {suggestion}
                        </option>
                    ))}
                </select>
            )}
            {/*<p>Selected Search: {selectedSearch}</p>*/}

        </div>
    );
}

export default StudentSelection;
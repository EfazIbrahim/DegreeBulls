import React from 'react';
import './staff.css';
import { newCourse, deleteCourse, modStudent, removeInstructor, assignInstructor, unassignInstructor, addMajor, removeMajor } from './staffFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function StaffHome() {
    const { currentUser } = useAuth();
    const newcourse = async () => {
        try {
            const out = await newCourse(currentUser, "CAI 4841", "CS");
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const delcourse = async () => {
        try {
            const out = await deleteCourse(currentUser, "CAI 4841", "CS");
            console.log(out);
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
            const out = await unassignInstructor(currentUser, "M49HCtwZpqVGxrkEYakcSlyeUaH2", "COT 4400");
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const assign_ins = async () => {
        try {
            const out = await assignInstructor(currentUser, "M49HCtwZpqVGxrkEYakcSlyeUaH2", "CAI 4841");
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const addmajor = async () => {
        try {
            const out = await addMajor(currentUser, "CySec", 120);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const delmajor = async () => {
        try {
            const out = await removeMajor(currentUser, "CySec");
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    return (
        <div className="staff">
            <h1 className="staff-header">Home</h1>
            <button className="instructor-button" onClick={newcourse}>New Course</button>
            <button className="instructor-button" onClick={delcourse}>Delete Course</button>
            <button className="instructor-button" onClick={addstudent}>Modify Student</button>
            <button className="instructor-button" onClick={assign_ins}>Assign Instructor</button>
            <button className="instructor-button" onClick={unassign_ins}>Unassign Instructor</button>
            <button className="instructor-button" onClick={addmajor}>Add Major</button>
            <button className="instructor-button" onClick={delmajor}>Delete Major</button>
        </div>
    );
}
export default StaffHome;
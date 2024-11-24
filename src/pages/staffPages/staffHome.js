import React from 'react';
import './staff.css';
import { newCourse, deleteCourse, addStudent, removeStudent, addInstructor, removeInstructor, assignInstructor, addMajor, removeMajor } from './staffFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function StaffHome() {
    const { currentUser } = useAuth();
    const course = "CAI 4841";
    const major = "CS";
    const newcourse = async () => {
        try {
            const out = await newCourse(currentUser, course, major);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const delcourse = async () => {
        try {
            const out = await deleteCourse(currentUser, course, major);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const addstudent = async () => {
        try {
            const out = await addStudent(currentUser);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const delstudent = async () => {
        try {
            const out = await removeStudent(currentUser);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const add_ins = async () => {
        try {
            const out = await addInstructor(currentUser);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const del_ins = async () => {
        try {
            const out = await removeInstructor(currentUser);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const assign_ins = async () => {
        try {
            const out = await assignInstructor(currentUser);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const addmajor = async () => {
        try {
            const out = await addMajor(currentUser);
            console.log(out);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const delmajor = async () => {
        try {
            const out = await removeMajor(currentUser);
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
            <button className="instructor-button" onClick={addstudent}>Add Student</button>
            <button className="instructor-button" onClick={delstudent}>Remove Student</button>
            <button className="instructor-button" onClick={add_ins}>Add Instructor</button>
            <button className="instructor-button" onClick={del_ins}>Remove Instructor</button>
            <button className="instructor-button" onClick={assign_ins}>Assign Instructor</button>
            <button className="instructor-button" onClick={addmajor}>Add Major</button>
            <button className="instructor-button" onClick={delmajor}>Delete Major</button>
        </div>
    );
}
export default StaffHome;
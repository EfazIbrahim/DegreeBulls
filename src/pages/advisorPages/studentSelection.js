import React from 'react';
import './advisor.css';
import { selectStudent, getCourses, getStudentCourses, addCourse, removeCourse  } from './advisorFunctions.js';
import { useAuth } from '../../context/AuthContext.js';

function StudentSelection() {
    const { currentUser } = useAuth();
    const id = "2ko5rQG2NHhput2ZS1SOPdyIUUw2" //for test purposes
    const courseID = "CAI 4002" //for test purposes
    const viewstudent = async () => {
        try {
            const studentlist = await selectStudent(currentUser);
            console.log(studentlist);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const viewcourse = async () => {
        try {
            const course = await getCourses(id);
            console.log(course);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const viewstudentcourse = async () => {
        try {
            const course = await getStudentCourses(id);
            console.log(course);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const add = async () => {
        try {
            const course = await addCourse(id, courseID);
            console.log(course);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    const drop = async () => {
        try {
            const course = await removeCourse(id, courseID);
            console.log(course);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    return (
        <div className="advisor">
            <h1 className="advisor-header">Student Selection</h1>
            <button className="instructor-button" onClick={viewstudent}>StudentList</button>
            <button className="instructor-button" onClick={viewcourse}>All Course</button>
            <button className="instructor-button" onClick={viewstudentcourse}>Student Course</button>
            <button className="instructor-button" onClick={add}>Add Course</button>
            <button className="instructor-button" onClick={drop}>Drop Course</button>
        </div>
    );
}


export default StudentSelection;
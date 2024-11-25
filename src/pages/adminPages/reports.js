import React from 'react';
import './admin.css';

const Report = () => {
    const students = [
        { name: 'Alice', major: 'Computer Science', gpa: 3.5, credits: 30 },
        { name: 'Bob', major: 'Computer Science', gpa: 3.8, credits: 40 },
        { name: 'Charlie', major: 'Computer Science', gpa: 2.9, credits: 20 },
        { name: 'David', major: 'Mathematics', gpa: 3.2, credits: 35 },
        { name: 'Eve', major: 'Mathematics', gpa: 3.6, credits: 45 },
        { name: 'Frank', major: 'Mathematics', gpa: 3.1, credits: 25 },
        { name: 'Grace', major: 'Physics', gpa: 3.7, credits: 50 },
        { name: 'Heidi', major: 'Physics', gpa: 3.4, credits: 30 },
        { name: 'Ivan', major: 'Physics', gpa: 3.9, credits: 40 },
    ];

    const courses = [
        { course: 'CS101', semester: 'Fall 2023', grade: 'A', instructor: 'Dr. Smith' },
        { course: 'CS101', semester: 'Fall 2023', grade: 'B', instructor: 'Dr. Smith' },
        { course: 'CS102', semester: 'Spring 2023', grade: 'A', instructor: 'Dr. Johnson' },
        { course: 'MATH101', semester: 'Fall 2023', grade: 'C', instructor: 'Dr. Brown' },
        { course: 'MATH102', semester: 'Spring 2023', grade: 'B', instructor: 'Dr. Brown' },
        { course: 'PHYS101', semester: 'Fall 2023', grade: 'A', instructor: 'Dr. White' },
        { course: 'PHYS102', semester: 'Spring 2023', grade: 'A', instructor: 'Dr. White' },
    ];

    const calculateGPAStats = (students) => {
        const majors = [...new Set(students.map(student => student.major))];
        const gpaStats = majors.map(major => {
            const majorStudents = students.filter(student => student.major === major);
            const gpas = majorStudents.map(student => student.gpa);
            const highestGPA = Math.max(...gpas);
            const lowestGPA = Math.min(...gpas);
            const averageGPA = (gpas.reduce((acc, gpa) => acc + gpa, 0) / gpas.length).toFixed(2);
            return { major, highestGPA, lowestGPA, averageGPA };
        });
        return gpaStats;
    };

    const calculateCourseStats = (courses) => {
        const semesters = [...new Set(courses.map(course => course.semester))];
        const courseStats = semesters.map(semester => {
            const semesterCourses = courses.filter(course => course.semester === semester);
            const courseNames = [...new Set(semesterCourses.map(course => course.course))];
            return courseNames.map(courseName => {
                const courseData = semesterCourses.filter(course => course.course === courseName);
                const totalEnrollments = courseData.length;
                const averageGrade = (courseData.reduce((acc, course) => {
                    const gradePoints = { 'A': 4, 'S': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0, 'U': 0, 'I': 0 };
                    return acc + gradePoints[course.grade];
                }, 0) / totalEnrollments).toFixed(2);
                return { semester, course: courseName, totalEnrollments, averageGrade };
            });
        }).flat();
        return courseStats;
    };

    const calculateInstructorStats = (courses) => {
        const instructors = [...new Set(courses.map(course => course.instructor))];
        const instructorStats = instructors.map(instructor => {
            const instructorCourses = courses.filter(course => course.instructor === instructor);
            const majors = [...new Set(instructorCourses.map(course => course.course.split('')[0]))];
            return majors.map(major => {
                const majorCourses = instructorCourses.filter(course => course.course.startsWith(major));
                const totalStudents = majorCourses.length;
                return { instructor, major, totalStudents };
            });
        }).flat();
        return instructorStats;
    };

    const calculateStudentStats = (students) => {
        const majors = [...new Set(students.map(student => student.major))];
        const studentStats = majors.map(major => {
            const majorStudents = students.filter(student => student.major === major);
            const sortedStudents = majorStudents.sort((a, b) => b.credits - a.credits);
            return { major, students: sortedStudents };
        });
        return studentStats;
    };

    const gpaStats = calculateGPAStats(students);
    const rankedGPAStats = [...gpaStats].sort((a, b) => b.averageGPA - a.averageGPA);
    const courseStats = calculateCourseStats(courses);
    const instructorStats = calculateInstructorStats(courses);
    const studentStats = calculateStudentStats(students);

    return (
        <div className="admin">
            <h1 className="admin-header">Reports</h1>
            <table className="course-table">
                <thead>
                <tr>
                    <th>Major</th>
                    <th>Highest GPA</th>
                    <th>Lowest GPA</th>
                    <th>Average GPA</th>
                </tr>
                </thead>
                <tbody>
                {gpaStats.map((stat, index) => (
                    <tr key={index}>
                        <td>{stat.major}</td>
                        <td>{stat.highestGPA}</td>
                        <td>{stat.lowestGPA}</td>
                        <td>{stat.averageGPA}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2 className="admin-header">Ranked Departments by Average GPA</h2>
            <table className="course-table">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Major</th>
                    <th>Average GPA</th>
                </tr>
                </thead>
                <tbody>
                {rankedGPAStats.map((stat, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{stat.major}</td>
                        <td>{stat.averageGPA}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2 className="admin-header">Course Stats by Semester</h2>
            <table className="course-table">
                <thead>
                <tr>
                    <th>Semester</th>
                    <th>Course</th>
                    <th>Total Enrollments</th>
                    <th>Average Grade</th>
                </tr>
                </thead>
                <tbody>
                {courseStats.map((stat, index) => (
                    <tr key={index}>
                        <td>{stat.semester}</td>
                        <td>{stat.course}</td>
                        <td>{stat.totalEnrollments}</td>
                        <td>{stat.averageGrade}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2 className="admin-header">Instructor Stats</h2>
            <table className="course-table">
                <thead>
                <tr>
                    <th>Instructor</th>
                    <th>Major</th>
                    <th>Total Students</th>
                </tr>
                </thead>
                <tbody>
                {instructorStats.map((stat, index) => (
                    <tr key={index}>
                        <td>{stat.instructor}</td>
                        <td>{stat.major}</td>
                        <td>{stat.totalStudents}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2 className="admin-header">Students by Major</h2>
            {studentStats.map((stat, index) => (
                <div className="admin-container" key={index}>
                    <h3 className="admin-label">{stat.major}</h3>
                    <table className="course-table">
                        <thead>
                        <tr>
                            <th>Student</th>
                            <th>Credits</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stat.students.map((student, idx) => (
                            <tr key={idx}>
                                <td>{student.name}</td>
                                <td>{student.credits}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default Report;
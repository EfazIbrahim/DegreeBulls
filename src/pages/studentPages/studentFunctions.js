import { db } from '../../firebase/firebase.js';
import { collection, doc, getDocs } from 'firebase/firestore';
/**
 * Retrieves the courses for the authenticated user, organized by semester.
 * 
 * @async
 * @function getCourses
 * @returns {Promise<Array<{semester: string, courses: Array<{course: string, grade: string}>}>>} 
 * An array of objects where each object represents a semester and contains an array of course objects.
 * 
 * @throws {Error} If the user is not authenticated.
 * 
 * @example
 * // Example of the returned object:
 * [
 *   {
 *     semester: 'Fall 2023',
 *     courses: [
 *       { course: 'CEN 4020', grade: 'A' },
 *       { course: 'COP 4530', grade: 'B+' }
 *     ]
 *   },
 *   {
 *     semester: 'Spring 2024',
 *     courses: [
 *       { course: 'CIS 4250', grade: 'A-' },
 *       { course: 'CDA 3103', grade: 'B' }
 *     ]
 *   }
 * ]
 * 
 * // To retrieve the courses for a specific semester:
 * const courses = await getCourses();
 * const fall2023Courses = courses.find(sem => sem.semester === 'Fall 2023').courses;
 * console.log(fall2023Courses); // Outputs: [{ course: 'CEN 4020', grade: 'A' }, { course: 'COP 4530', grade: 'B+' }]
 */
async function GetCourses(currentUser) {
    const userId = currentUser.uid;
    const courses = [];

    const userDocRef = doc(db, 'Student', userId);
    const courseCollectionRef = collection(userDocRef, 'Course');
    const semestersSnapshot = await getDocs(courseCollectionRef);

    const coursesBySemester = new Map();

    semestersSnapshot.forEach(semesterDoc => {
        const semesterData = semesterDoc.data();
        const semesterCourses = [];

        for (const [course, grade] of Object.entries(semesterData)) {
            semesterCourses.push({ course, grade });
        }

        coursesBySemester.set(semesterDoc.id, semesterCourses);
    });

    coursesBySemester.forEach((coursesArray, semester) => {
        courses.push({ semester, courses: coursesArray });
    });

    return courses;
}

async function calculateGPA(currentUser) {
    const courses = await GetCourses(currentUser);
    let totalPoints = 0;
    let totalCredits = 0;

    const gradeToPoints = {
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1.0,
        'F': 0.0
    };

    courses.forEach(semester => {
        semester.courses.forEach(course => {
            const grade = course.grade;
            const points = gradeToPoints[grade];
            const credits = 3; // Assuming each course is 3 credits, adjust as necessary

            totalPoints += points * credits;
            totalCredits += credits;
        });
    });

    const gpa = totalPoints / totalCredits;
    return gpa;
}
export { GetCourses, calculateGPA };


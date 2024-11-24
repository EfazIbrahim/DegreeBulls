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
    if (!currentUser) {
        throw new Error('User not authenticated');
    }

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

export { GetCourses };


import { db } from '../../firebase/firebase.js';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { GetCourses } from '../studentPages/studentFunctions.js';

async function GetInstructorData(currentUser) {
    const userId = currentUser.uid;
    const userDocRef = doc(db, 'Instructor', userId);
    const docSnap = await getDoc(userDocRef); 

    return docSnap.data();
}

async function GetInstructorCourses(currentUser) {
    const userId = currentUser.uid;
    const querySnapshot = await getDocs(collection(db, "Instructor", userId, "Courses"));

    const coursesMap = new Map();
    querySnapshot.forEach((doc) => {
        coursesMap.set(doc.id, doc.data());
    });

    return coursesMap;
}

async function GetInstructorStudents(currentUser) {
    const userId = currentUser.uid;
    const querySnapshot = await getDocs(collection(db, "Instructor", userId, "Courses"));

    const studentsMap = new Map();
    querySnapshot.forEach((doc) => {
        const students = doc.data().students;
        for (const [studentID, studentData] of Object.entries(students)) {
            if (!studentsMap.has(doc.id)) {
                studentsMap.set(doc.id, new Map());
            }
            studentsMap.get(doc.id).set(studentData.name, studentData.grade);
    }
    });
    return studentsMap;

}

//parameters are returned by GetInstructorStudents
async function AssignGrade(currentUser, course, student, grade) {
    // const userId = currentUser.uid;
    // // const querySnapshot = await getDocs(collection(db, "Instructor", userId, "Courses"));
    // const instructorDocRef = doc(db, 'Instructor', userId);
    // const instructorCoursesRef = collection(instructorDocRef, 'Courses');
    // const instructorCourseDocRef = doc(instructorCoursesRef, course);
    // const instructorCourseDoc = await getDoc(instructorCourseDocRef);
    // const instructorCourseData = instructorCourseDoc.data();
    
    // await updateDoc(instructorCourseDocRef, {
    //     ...instructorCourseData[course],
    //     students: {
    //         ...instructorCourseData.students,
    //         [studentid]: {
    //             ...instructorCourseData.students[studentid],
    //             grade: grade
    //         }
    //     }
    // });

    // //update the student in instructor's course
    // let studentid = null;
    // // querySnapshot.forEach((doc) => {
    // //     const students = doc.data().students;
    // //     for (const [studentID, studentData] of Object.entries(students)) {
    // //         if (studentData.name === student) {
    // //             students[studentID].grade = grade;
    // //             studentid = studentID;
    // //             course = doc.id;
    // //         }
    // //     }
    // // });
    
    // //update the student in student's course
    // const studentDocRef = doc(db, 'Student', studentid);
    // const studentcourseDocRef = doc(studentDocRef, 'Course', 'Fall 2024');
    // await updateDoc(studentcourseDocRef, {
    //     [course]: grade
    // });

    // const courses = await GetCourses(studentid);
    // return courses;
}

export { GetInstructorData, GetInstructorCourses, GetInstructorStudents, AssignGrade };
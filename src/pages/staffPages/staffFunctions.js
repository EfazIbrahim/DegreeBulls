import { db } from '../../firebase/firebase';
import { deleteField, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

//only if they belong to the same department

async function newCourse(currentUser, course, major) {
    const userID = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'Staff', userID));
    const staffDepartment = userDoc.data().Department;

    const majorDoc = await getDoc(doc(db, 'course', major));
    if (majorDoc.data().hasOwnProperty(course)) {
        throw new Error('Course already exists');
    }
    if (majorDoc.exists() && majorDoc.data().Department === staffDepartment) {
        await updateDoc(doc(db, 'course', major), {
            [course]: {
                instructor: "",
                students: []
            }
        });
    } else {
        throw new Error('You do not have permission to add a course to this major');
    }
}

async function deleteCourse(currentUser, course, major) {
    const userID = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'Staff', userID));
    const staffDepartment = userDoc.data().Department;

    const courseDoc = await getDoc(doc(db, 'course', major));
    if (!courseDoc.exists()) {
        throw new Error('Course does not exist');
    }
    if (courseDoc.exists() && courseDoc.data().Department === staffDepartment) {
        await updateDoc(doc(db, 'course', major), {
            [course]: deleteField()
        });
    } else {
        throw new Error('You do not have permission to delete this course');
    }
}

async function addStudent(id, student) {

}

async function removeStudent(id, student) {

}

async function addInstructor(id, instructor) {

}

async function removeInstructor(id, instructor) {

}

async function assignInstructor(id, instructor) {

}

async function addMajor(id, major) {

}

async function removeMajor(id, major) {

}

export { newCourse, deleteCourse, addStudent, removeStudent, addInstructor, removeInstructor, assignInstructor, addMajor, removeMajor };
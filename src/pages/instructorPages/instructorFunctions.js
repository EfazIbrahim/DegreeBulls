import { db } from '../../firebase/firebase.js';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

async function GetInstructorData(currentUser) {
    if (!currentUser) {
        throw new Error('User not authenticated');
    }

    const userId = currentUser.uid;
    const userDocRef = doc(db, 'Instructor', userId);
    const docSnap = await getDoc(userDocRef); 

    return docSnap.data();
}

async function GetInstructorCourses(currentUser) {
    if (!currentUser) {
        throw new Error('User not authenticated');
    }

    const userId = currentUser.uid;
    const querySnapshot = await getDocs(collection(db, "Instructor", userId, "Courses"));

    const coursesMap = new Map();
    querySnapshot.forEach((doc) => {
        coursesMap.set(doc.id, doc.data());
    });

    return coursesMap;
}

async function GetInstructorStudents(currentUser) {
    
}

async function AssignGrade(currentUser, student) {

}

export { GetInstructorData, GetInstructorCourses, GetInstructorStudents, AssignGrade };
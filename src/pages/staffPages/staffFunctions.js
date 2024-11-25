import { db } from '../../firebase/firebase';
import { deleteField, doc, setDoc, updateDoc, getDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';

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

    const updatedMajorDoc = await getDoc(doc(db, 'course', major));
    const updatedData = updatedMajorDoc.data();
    return Object.keys(updatedData).filter(key => key !== 'Department');
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

    const updatedMajorDoc = await getDoc(doc(db, 'course', major));
    const updatedData = updatedMajorDoc.data();
    return Object.keys(updatedData).filter(key => key !== 'Department');
}

async function modStudent(currentUser, studentID, changeName=false, changeMajor=false) {
    const userID = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'Staff', userID));
    const staffDepartment = userDoc.data().Department;

    const studentDoc = await getDoc(doc(db, 'Student', studentID));
    if (studentDoc.exists() && studentDoc.data().Department === staffDepartment) {
        if (changeName) {
            await updateDoc(doc(db, 'Student', studentID), {
                Name: changeName
            });
        }
        else if (changeMajor) {
            await updateDoc(doc(db, 'Student', studentID), {
                Major: changeMajor
            });
        }
    } else {
        throw new Error('You do not have permission to modify this student');
    }

    const updatedStudentDoc = await getDoc(doc(db, 'Student', studentID));
    return updatedStudentDoc.data();
}

async function removeStudent(currentUser, studentID) {
    const userID = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'Staff', userID));
    const staffDepartment = userDoc.data().Department;

    const studentDoc = await getDoc(doc(db, 'Student', studentID));
    if (studentDoc.exists() && studentDoc.data().Department === staffDepartment) {
        await deleteDoc(doc(db, 'Student', studentID));
    } else {
        throw new Error('You do not have permission to remove this student');
    }
}

async function removeInstructor(currentUser, instructorID) {
    const userID = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'Staff', userID));
    const staffDepartment = userDoc.data().Department;

    const instructorDoc = await getDoc(doc(db, 'Instructor', instructorID));
    if (instructorDoc.exists() && instructorDoc.data().Department === staffDepartment) {
        await deleteDoc(doc(db, 'Instructor', instructorID));
    } else {
        throw new Error('You do not have permission to remove this instructor');
    }
}

async function assignInstructor(currentUser, instructorID, newcourse, major) {
    const userID = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'Staff', userID));
    const staffDepartment = userDoc.data().Department;

    const instructorDoc = await getDoc(doc(db, 'Instructor', instructorID));
    if (instructorDoc.exists() && instructorDoc.data().Department === staffDepartment) {
        //update course list
        const courseDoc = await getDoc(doc(db, 'course', major));

        if (courseDoc.exists() && courseDoc.data().hasOwnProperty(newcourse)) {
            if (courseDoc.data()[newcourse].instructor === instructorID) {
                throw new Error('Instructor already assigned to this course');
            }
            await updateDoc(doc(db, 'course', major), {
                [newcourse]: {
                    instructor: instructorID
                }
            });
        }
        //update instructor list
        const querySnapshot = await getDocs(collection(db, "Instructor", instructorID, "Courses"));
        querySnapshot.forEach((doc) => {
            if (doc.id === newcourse) {
                throw new Error('Instructor already assigned to this course');
            }
        });
        await setDoc(doc(db, 'Instructor', instructorID, 'Courses', newcourse), {
            Years: ["Fall 2024"],
            students: {}
        });
    } else {
        throw new Error('You do not have permission to assign this instructor');
    }

    const updatedCourseDoc = await getDoc(doc(db, 'course', newcourse));
    return updatedCourseDoc.data();
}

async function unassignInstructor(currentUser, instructorID, course) {
    const userID = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'Staff', userID));
    const staffDepartment = userDoc.data().Department;

    const instructorDoc = await getDoc(doc(db, 'Instructor', instructorID));
    if (instructorDoc.exists() && instructorDoc.data().Department === staffDepartment) {
        //update course list
        const courseDoc = await getDoc(doc(db, 'course', course));
        if (courseDoc.exists() && courseDoc.data().instructor === instructorID) {
            await updateDoc(doc(db, 'course', course), {
                instructor: ""
            });
        } else {
            throw new Error('Instructor is not assigned to this course');
        }
        //update instructor list
        const querySnapshot = await getDocs(collection(db, "Instructor", instructorID, "Courses"));
        querySnapshot.forEach(async (doc) => {
            if (doc.id === course) {
                await deleteDoc(doc.ref);
            }
        });
    } else {
        throw new Error('You do not have permission to unassign this instructor');
    }

    const updatedCourseDoc = await getDoc(doc(db, 'course', course));
    return updatedCourseDoc.data();
}

async function addMajor(currentUser, major, credithours) {
    const userID = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'Staff', userID));
    const staffDepartment = userDoc.data().Department;

    //update Department with new major
    const DepartmentDoc = await getDoc(doc(db, 'Department', staffDepartment));
    if (DepartmentDoc.data().Majors && DepartmentDoc.data().Majors.hasOwnProperty(major)) {
        throw new Error('Major already exists');
    }
    await updateDoc(doc(db, 'Department', staffDepartment), {
        [`Majors.${major}`]: credithours
    });

    //update course document with new major
    await setDoc(doc(db, 'course', major), {
        Department: staffDepartment,
    });

    const updatedDepartmentDoc = await getDoc(doc(db, 'Department', staffDepartment));
    return updatedDepartmentDoc.data().Majors;
}

async function removeMajor(currentUser, major) {
    const userID = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'Staff', userID));
    const staffDepartment = userDoc.data().Department;

    //remove major from department
    if (userDoc.data().Department !== staffDepartment) {
        throw new Error('You do not have permission to remove this major');
    }
    const DepartmentDoc = await getDoc(doc(db, 'Department', staffDepartment));
    if (DepartmentDoc.data().Majors && DepartmentDoc.data().Majors.hasOwnProperty(major)) {
        await updateDoc(doc(db, 'Department', staffDepartment), {
            [`Majors.${major}`]: deleteField()
        });
    } else {
        throw new Error('Major does not exist');
    }

    //remove major from course document
    const courseDoc = await getDoc(doc(db, 'course', major));
    if (courseDoc.exists() && courseDoc.data().Department === staffDepartment) {
        await deleteDoc(doc(db, 'course', major));
    } else {
        throw new Error('You do not have permission to remove this major');
    }

    const updatedDepartmentDoc = await getDoc(doc(db, 'Department', staffDepartment));
    return updatedDepartmentDoc.data().Majors;
}

export { newCourse, deleteCourse, modStudent, removeStudent, removeInstructor, assignInstructor, unassignInstructor, addMajor, removeMajor };
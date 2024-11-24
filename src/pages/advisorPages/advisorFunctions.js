import { db } from '../../firebase/firebase.js';
import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove, deleteField } from 'firebase/firestore';

//return a map of students in the advisor's department [key=name,value=studentID]
//create a dropdown menu from the name of students
//use ID as argument to next functions
async function selectStudent(currentUser) {
    if (!currentUser) {
        throw new Error('User not authenticated');
    }

    //retrieve the advisor's department
    const userId = currentUser.uid;
    const docRef = doc(db, "Advisor", userId);
    const docSnap = await getDoc(docRef);
    const advisorDepartment = docSnap.data().Department;
    
    //retrieve the list of students in the advisor's department
    const querySnapshot = await getDocs(collection(db, "Student"));
    const studentMap = new Map();
    querySnapshot.forEach((doc) => {
        if (doc.data().Department === advisorDepartment){
            studentMap.set(doc.data().Name, doc.id);
        }
    });

    return studentMap;
}

//all arguments below refer to student ID
//return a list of courses in the student's major
async function getCourses(id){
    const userDocRef = doc(db, 'Student', id);
    const userDocSnap = await getDoc(userDocRef);
    const studentMajor = userDocSnap.data().Major;

    const courseDocRef = doc(db, 'course', studentMajor);
    const courseDoc = await getDoc(courseDocRef);

    const courseList = [];
    const courseData = courseDoc.data();
    Object.keys(courseData).forEach((field) => {
        if (field !== 'Department') {
            courseList.push(field);
        }
    });
    console.log(courseList);
    return courseList;
}

//return a list of courses the student is currently enrolled in
async function getStudentCourses(id){
    const userDocRef = doc(db, 'Student', id);
    const courseCollectionRef = collection(userDocRef, 'Course');
    const semestersSnapshot = await getDocs(courseCollectionRef);

    const courseArray = [];
    for (const semesterDoc of semestersSnapshot.docs) {
        if (semesterDoc.id === 'Fall 2024') {
            const semesterData = semesterDoc.data();
            courseArray.push(...Object.keys(semesterData)); // Add course names to the array
        }
    }
    return courseArray;
}

//return new student course list after adding a course
async function addCourse(id, course) {
    if ((await getStudentCourses(id)).length >= 6) {
        throw new Error('Student is already enrolled in 6 courses');
    }
    else if ((await getStudentCourses(id)).includes(course)) {
        throw new Error('Student is already enrolled in this course');
    }
    else if (!(await getCourses(id)).includes(course)) {
        throw new Error('Course is not available to student');
    }
    const grades = ['A', 'B', 'C', 'D'];
    const randomGrade = grades[Math.floor(Math.random() * grades.length)];{
        //update student's course list
        const userDocRef = doc(db, 'Student', id);
        const studentcourseDocRef = doc(userDocRef, 'Course', 'Fall 2024');
        await updateDoc(studentcourseDocRef, {
            [course]: randomGrade
        });

        //update course's student list
        const userDocSnap = await getDoc(userDocRef);
        const studentMajor = userDocSnap.data().Major;
        const courseDocRef = doc(db, 'course', studentMajor);
        const courseDoc = await getDoc(courseDocRef);
        const courseData = courseDoc.data();
        await updateDoc(courseDocRef, {
            [course]: {
                ...courseData[course],
                students: arrayUnion(id)
            }
        });

        //update instructor's student list
        const instructorId = courseData[course].instructor;
        const instructorDocRef = doc(db, 'Instructor', instructorId);
        const instructorCoursesRef = collection(instructorDocRef, 'Courses');
        const instructorCourseDocRef = doc(instructorCoursesRef, course);
        const instructorCourseDoc = await getDoc(instructorCourseDocRef);
        const instructorCourseData = instructorCourseDoc.data();
        
        await updateDoc(instructorCourseDocRef, {
            ...instructorCourseData[course],
            students: {
                ...instructorCourseData.students,
                [id]: {
                    grade: randomGrade,
                    semester: 'Fall 2024',
                    name: userDocSnap.data().Name
                }
            }
        });
    }
    //return updated course list
    return getStudentCourses(id);
}

//return new student course list after removing a course
async function removeCourse(id, course) {
    if (!(await getStudentCourses(id)).includes(course)) {
        throw new Error('Student is not enrolled in this course');
    } else {
        //update student's course list
        const userDocRef = doc(db, 'Student', id);
        const studentcourseDocRef = doc(userDocRef, 'Course', 'Fall 2024');
        await updateDoc(studentcourseDocRef, {
            [course]: deleteField()
        });

        //update course's student list
        const userDocSnap = await getDoc(userDocRef);
        const studentMajor = userDocSnap.data().Major;
        const courseDocRef = doc(db, 'course', studentMajor);
        const courseDoc = await getDoc(courseDocRef);
        const courseData = courseDoc.data();
        await updateDoc(courseDocRef, {
            [course]: {
                ...courseData[course],
                students: arrayRemove(id)
            }
        });

        //update instructor's student list
        const instructorId = courseData[course].instructor;
        const instructorDocRef = doc(db, 'Instructor', instructorId);
        const instructorCoursesRef = collection(instructorDocRef, 'Courses');
        const instructorCourseDocRef = doc(instructorCoursesRef, course);
        const instructorCourseDoc = await getDoc(instructorCourseDocRef);
        const instructorCourseData = instructorCourseDoc.data();
        
        const updatedStudents = { ...instructorCourseData.students };
        delete updatedStudents[id];

        await updateDoc(instructorCourseDocRef, {
            students: updatedStudents
        });
    }
    //return updated course list
    return getStudentCourses(id);
}

export { selectStudent, getCourses, getStudentCourses, addCourse, removeCourse };
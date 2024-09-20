import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
// import { getAuth, createUserWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMV0N8fIFW43_lZJyUXKvW5Dt4-abrWD4",
  authDomain: "hecatho-7fdd9.firebaseapp.com",
  projectId: "hecatho-7fdd9",
  storageBucket: "hecatho-7fdd9.appspot.com",
  messagingSenderId: "1035982172106",
  appId: "1:1035982172106:web:17391463a4e6e4c196e933",
  measurementId: "G-7RNF0GRHHV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const auth = getAuth(app);
const db = getFirestore(app);
let marksCollection = collection(db, "StudentMarks");

const course = document.getElementById("course");
const studentId = document.getElementById("studentId");
const marks = document.getElementById("marks");
const totalMarks = document.getElementById("totalMarks");
const grade = document.getElementById("grade");
const marksBtn = document.getElementById("marksBtn");

marksBtn.addEventListener("click", addMarksToDb);

// getDataFromDB();
async function addMarksToDb() {
  if (
    !course.value ||
    !studentId.value ||
    !marks.value ||
    !totalMarks.value ||
    !grade.value
  ) {
    alert("All fields must be filled!");
    return;
  }


 

  try {
    const StudentMarks = {
      course: course.value,
      studentId: studentId.value,
      marks: marks.value,
      totalMarks: totalMarks.value,
      grade: grade.value,
    };

    const docRef = await addDoc(marksCollection, StudentMarks);
    course.value = "";
    studentId.value = "";
    marks.value = "";
    totalMarks.value = "";
    grade.value = "";
    alert("Marks added successfully!");
  } catch (e) {
    console.log(e);
  }
}


// async function getMarksFromDB() {
//     try {
//       const querySnapshot = await getDocs(portalCollection);
//       querySnapshot.forEach((doc) => {
//         const { course, studentId, marks, totalMarks, grade } = doc.data();
//         const ele = ` <tr id=${doc.id}> <td>${firstName + " " + lastName}</td>
//              <td>${email}</td>
//              <td>${cnic}</td>
//              </tr>`;
//         student_list.innerHTML += ele;
//         //   console.log(firstName, lastName, email, cnic);
//       //   student_list.childNodes.forEach((td)=> login.addEventListener('click', function(){
//       //     console.log(this)
//       //   }))
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }
  
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
let portalCollection = collection(db, "StudentData");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cnic = document.getElementById("cnic");
const student_list = document.getElementById("student_list");
// const loginBtn = document.getElementById("loginBtn");
// const role = document.getElementById("role");
// const loginEmail = document.getElementById("login_email");
// const loginPasword = document.getElementById("login_password");
// const student_name = document.getElementById("student_name");
// const student_email = document.getElementById("student_email");


const submitBtn = document.getElementById("submitBtn");

getDataFromDB();

submitBtn.addEventListener("click", addDataToDb);


async function addDataToDb() {
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !password.value ||
    !cnic.value
  ) {
    alert("All fields must be filled!");
    return;
  }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.value.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

  try {
    const StudentData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      cnic: cnic.value,
    };

    const docRef = await addDoc(portalCollection, StudentData);
    getDataFromDB();
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
    cnic.value = "";
    alert("Data added successfully!");
  } catch (e) {
    console.log(e);
  }
}

async function getDataFromDB() {
  try {
    const querySnapshot = await getDocs(portalCollection);
    student_list.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const { firstName, lastName, email, cnic } = doc.data();
      const ele = ` <tr id=${doc.id}> <td>${firstName + " " + lastName}</td>
           <td>${email}</td>
           <td>${cnic}</td>
           </tr>`;
      student_list.innerHTML += ele;
      //   console.log(firstName, lastName, email, cnic);
    //   student_list.childNodes.forEach((td)=> login.addEventListener('click', function(){
    //     console.log(this)
    //   }))
    });
  } catch (e) {
    console.log(e);
  }
}



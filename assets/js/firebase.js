
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

  import {getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js"
  
  //firestore
  import { getFirestore, collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc, getDoc,} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
 
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDcnF9dcWdh4lvSoIy943GcbKhP91mdJuk",
    authDomain: "diario-digital-471e7.firebaseapp.com",
    projectId: "diario-digital-471e7",
    storageBucket: "diario-digital-471e7.appspot.com",
    messagingSenderId: "265187515709",
    appId: "1:265187515709:web:cb4cf1932f40b06f63f954"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  export const auth = getAuth(app);

  // Initialize firestore 
  export const db = getFirestore();

  //Operaciones CRUD
  export const createTask = (title, description) => addDoc(collection(db, "tasks"), {title,description});

  export const onGetTask = (callback) => onSnapshot(collection(db,"tasks"), callback);

  export const getTask = (id) => getDoc(doc(db, "tasks", id));

  export const updateTask = (id, newData) => updateDoc(doc(db, "tasks", id), newData);

  export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));
  
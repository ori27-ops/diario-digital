//Impotamos la app
import { auth } from "./firebase.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js"

import { checkLogin } from "./checkLogin.js";

import "./signupForm.js";

onAuthStateChanged(auth, async (user) => {
    console.log(user);
    checkLogin(user);
})
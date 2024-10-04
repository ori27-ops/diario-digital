import {auth} from "./firebase.js"
import {createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js"
import { showMessage } from "./toastMessage.js";

const signupForm = document.querySelector("#signup-form")

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();
    console.log("formulario enviado");

    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);  

        showMessage("Usuario registrado", "success"); 
        //Cerrar el modal
        const signupModal = document.querySelector("signup-modal");
        const modal = bootstrap.Modal.getInstance(signupModal);
        modal.hide();

        signupForm.requestFullscreen();
    } catch(error){
        console.log(error);
        if (error.code === "auth/email-already-in-use"){
            showMessage("El correo ya está en uso", "error");
        } else if (error.code === "auth/weak-password") {
            showMessage("La contraseña debe tener al menos 6 caracteres", "error");
        } else {
            showMessage("Correo invalido", "error");
        }
    }
});
 

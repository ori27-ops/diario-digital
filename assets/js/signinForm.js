import {auth} from "./firebase.js"
import {signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js"
import { showMessage } from "./toastMessage.js";

const signinForm = document.querySelector("#signin-form")

signinForm.addEventListener("submit", async (e) => {

    e.preventDefault();
    console.log("formulario enviado");

    const email = signinForm["signin-email"].value;
    const password = signinForm["signin-password"].value;

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);  

        showMessage("Usuario registrado", "success"); 
        //Cerrar el modal
        const signinModal = document.querySelector("#signin-modal");
        const modal = bootstrap.Modal.getInstance(signinModal);
        modal.hide();

        signinForm.requestFullscreen();
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
 
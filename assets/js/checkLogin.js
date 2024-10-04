const loggednIn = document.querySelectorAll(".logged-in");
const loggednOut = document.querySelectorAll(".logged-out");
const mainContainer = document.querySelector("#main-container");
const saludo = document.querySelector("#saludo");

export const checkLogin = (user) => {

    if (user){
        loggednIn.forEach((element) => (element.style.display = "block"));
        loggednOut.forEach((element) => (element.style.display = "none"));
  
        mainContainer.style.display = "block"
        saludo.textContent = `Bienvenid@ ${user.email}`;
    } else {
        loggednOut.forEach((element) => (element.style.display = "block"));
        loggednIn.forEach((element) => (element.style.display = "none"));
    
        mainContainer.style.display = "none"
        saludo.textContent = "";
    }
}
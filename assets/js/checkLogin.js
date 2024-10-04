const loggednIn = document.querySelectorAll(".logged-in");
const loggednOut = document.querySelectorAll(".logged-out");

export const checkLogin = (user) => {

    if (user){
        loggednIn.forEach((element) => (element.style.display = "block"));
        loggednOut.forEach((element) => (element.style.display = "none"));
    } else {
        loggednOut.forEach((element) => (element.style.display = "block"));
        loggednIn.forEach((element) => (element.style.display = "none"));
    }
}
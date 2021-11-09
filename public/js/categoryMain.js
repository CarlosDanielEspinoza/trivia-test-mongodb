const btnBio = document.querySelector("#bio");
const btnFi = document.querySelector("#fi");
const btnPhy = document.querySelector("#phy");

btnBio.addEventListener("click", ()=>{
    sessionStorage.setItem("Theme","Biologia");
    location.href = "/play";
});
btnFi.addEventListener("click", ()=>{
    sessionStorage.setItem("Theme","Fisica");
    location.href = "/play";
});
btnPhy.addEventListener("click", ()=>{
    sessionStorage.setItem("Theme","Filosofia");
    location.href = "/play";
});
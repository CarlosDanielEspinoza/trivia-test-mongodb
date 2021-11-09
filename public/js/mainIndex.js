const ageVar = document.querySelector("#age");
const names = document.querySelector("#name");
const btnAccept = document.querySelector("#btnAccept");

for(var i = 10; i <= 50 ;i++){
    let options = document.createElement("option");

    if(i == 50){
        options.textContent = `+${i}`;
    }else if(i == 10){
        options.textContent = `-${i}`;
    }else{
        options.textContent = i;
    }
    
    ageVar.appendChild(options);
}

btnAccept.addEventListener("click", (e)=>{
    if(names.value != ""){
        sessionStorage.setItem("age",ageVar.value);
        sessionStorage.setItem("name",names.value);
        setTimeout(()=>{
            location.href = "/category";
        },100);
    }else {
        names.focus();
        
    }
    
    
});
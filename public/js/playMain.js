const contentQuiz = document.querySelector("#contentQuiz");
const checkBtn = document.querySelector("#check");

let theme = sessionStorage.getItem("Theme");
let quiz;
let quizSelect;
let answer = [];
let wins = 0;

fetch("questions.json")
    .then((res)=>{
        return res.json();
    }).then((json)=>{
        quiz = json;
        return selectCategory();
    }).catch((error)=>{
        console.log(error.message);
})

function selectCategory(){
    if(theme == "Filosofia"){
        quizSelect = quiz.Filosofia;
        document.querySelector("h1").textContent = "Filosofía";
        document.querySelector("title").textContent = "Trivias - Filosofía";
    
    }else if(theme == "Biologia"){
        quizSelect = quiz.Biologia;
        document.querySelector("h1").textContent = "Biología";
        document.querySelector("title").textContent = "Trivias - Biología";
    
    }else if(theme == "Fisica"){
        quizSelect = quiz.Fisica;
        document.querySelector("h1").textContent = "Fisica";
        document.querySelector("title").textContent = "Trivias - Fisica";
    }
    pushQuestions();
}


function pushQuestions(){

    let count = 0;
    let countOpt = 0;
    let countId = 0;
    let long1 = quizSelect.length;

    for(var i = 0; i < long1 ; i++){
        let indexQuiz = Math.floor((Math.random() * ((quizSelect.length-1) - 0 + 1)) + 0);

        let article = document.createElement("article");
        article.setAttribute("class", "boxQuestion");
        contentQuiz.appendChild(article);

        let question = document.createElement("h4");
        question.textContent = quizSelect[indexQuiz].pregunta;
        question.setAttribute("class", "boxQuestion__question");
        article.appendChild(question);

        let lineSeparate = document.createElement("hr");
        lineSeparate.setAttribute("class", "boxQuestion__question");
        article.appendChild(lineSeparate);

        let long2 = quizSelect[indexQuiz].opciones.length;
        for(var a = 0; a < long2; a++){
            
            let indexOpt = Math.floor((Math.random() * ((quizSelect[indexQuiz].opciones.length-1) - 0 + 1)) + 0);

            let optionsCont = document.createElement("div");
            optionsCont.setAttribute("class","boxQuestion__option");
            article.appendChild(optionsCont);

            let options = document.createElement("input");
            options.setAttribute("type","radio");
            options.setAttribute("name",countOpt);
            options.setAttribute("value", quizSelect[indexQuiz].opciones[indexOpt]);
            options.setAttribute("id",countId);
            options.setAttribute("class", "option__label");
            optionsCont.appendChild(options);

            let label = document.createElement("label");
            label.textContent = quizSelect[indexQuiz].opciones[indexOpt];
            label.setAttribute("for",countId);
            optionsCont.appendChild(label);

            countId++;
            count++;
            if(count == 4){
                countOpt++;
                count = 0;
            } 

            //Eliminar Opción de la lista.
            quizSelect[indexQuiz].opciones.splice(indexOpt,1); 
        }

        //Agregar la respuesta a la pregunta al final de una lista.
        answer.push(quizSelect[indexQuiz].respuesta);

        //Eliminar pregunta de la lista.
        quizSelect.splice(indexQuiz,1); 
    }
    
}

function firstBtn(){
    let inputs = document.querySelectorAll("input");
    let countAprov = 0;
    
    for(var i = 0; i < inputs.length; i++){

        if(inputs[i].checked == true){
            countAprov++;
        }
    }

    if(countAprov == 10){
        let checkBox = document.querySelector("#checkBox");
        checkBox.removeChild(checkBox.lastChild);
        
        check(inputs);

    }else{
        let checkBox = document.querySelector("#checkBox");

        if(checkBox.firstChild.id == checkBox.lastChild.id){
            let alertQuestions = document.createElement("div");
            alertQuestions.setAttribute("class","alertQuestions");
            alertQuestions.textContent = "¡Alerta! Completa todos los campos";
            checkBox.appendChild(alertQuestions);
        }
    }
}

function secondBtn(){
    sessionStorage.setItem("win",wins);

    const all_Data = {
        name: sessionStorage.getItem("name"),
        age: sessionStorage.getItem("age"),
        point: sessionStorage.getItem("win"),
        category: sessionStorage.getItem("Theme"),
    }

    fetch("/result",{
        method: "POST",
        body: JSON.stringify(all_Data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        let redirect = `/result/${sessionStorage.getItem("Theme")}`
        location.href = redirect;
    })
    .catch( e => console.log(e));

}


function check(inputs){
    let x = 0;

    for(var i = 0; i < inputs.length; i++){

        if(inputs[i].checked == true){

            if(inputs[i].value == answer[x]){
                //Selección Correcta
                wins++;
                let labelError = document.querySelector(`label[for='${inputs[i].id}']`);
                labelError.style.color = "rgb(146, 255, 131)";
                labelError.style.fontWeight = "bold";
                
            }else{
                //Selección erronea.
                let labelError = document.querySelector(`label[for='${inputs[i].id}']`);
                labelError.style.color = "rgb(165, 21, 21)";
                labelError.style.fontWeight = "bold";
            }
            x++;
        } else {
            inputs[i].disabled = true;
        }
    }

    //Cambiar Botón a Continuar... Con otro Event Listener.
    checkBtn.textContent = "Continuar";
    checkBtn.removeEventListener("click",firstBtn);
    checkBtn.addEventListener("click",secondBtn);
}


checkBtn.addEventListener("click", firstBtn);
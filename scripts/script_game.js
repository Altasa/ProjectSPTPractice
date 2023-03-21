//запрос на сервер
var QUESTIONS;
var req_for_questions = new XMLHttpRequest();
let quiz_id=window.location.href.split("?")[1].split("=")[1];
let requestURL="../php/quiz/q"+quiz_id+".php";
req_for_questions.open("GET", requestURL);
req_for_questions.responseType = 'json';
req_for_questions.send();
req_for_questions.onload=function(){
    QUESTIONS=req_for_questions.response;
    loadQuiz(); //запуск квиза
}

const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submit = document.getElementById('submit');

var usersAnswers = []
var currentQuiz = 0;

function loadQuiz(){ //загрузка квиза и его обновление
    answerElements.forEach(answerEl => answerEl.checked = false);//обновление статуса ответа

    let currentQuizData = QUESTIONS["questions"][currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
}

function getSelected(){ //учет ответов пользователя
    let answer;
    answerElements.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}

submit.addEventListener('click', () => { //добавление ответов в массив
    let answer = getSelected();
    if(answer){
        usersAnswers.push(answer);
        currentQuiz++;
        if(currentQuiz < QUESTIONS["questions"].length){
            if(currentQuiz==(QUESTIONS["questions"].length-1)){
                submit.textContent="Submit";
            }
            loadQuiz();
        }else{
            alert("TO SERVER");
        }
    }
});

/*
//отпрака массива ответов и получение результата пользователя
const req_for_res = new XMLHttpRequest();
 
req_for_res.open("POST", "/main"); //вместо main другое название, связывающее запрос на сервер с самим сервером
req_for_res.setRequestHeader("Content-Type", "application/json"); //тип данных для передачи JSON

const ANSWERS = JSON.stringify(usersAnswers);
 
req_for_res.send(ANSWERS);

req_for_res.onload = () => {
    if (req_for_res.status == 200) { 
        const result = JSON.parse(req_for_res.responseText)
        
    } else {
        console.log("Server response: ", req_for_res.statusText);
    }
};

function users_res(res){ //функция вывода результата
    quiz.innerHTML = `<h2>You answered coreectly at ${res}/${QUESTIONS.length} questions</h2>
            <button onclick="location.reload()">Reload</button>`;
}

users_res(result);
*/
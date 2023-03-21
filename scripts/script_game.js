const usersAnswers = []

//ниже запрос на сервер
const req_for_questions = new XMLHttpRequest();
 
req_for_questions.open("GET", "/main"); //вместо main другое название, связывающее запрос на сервер с самим сервером
req_for_questions.setRequestHeader("Content-Type", "application/json"); //тип данных для передачи JSON
 
req_for_questions.send();

req_for_questions.onload = () => {
    if (req_for_questions.status == 200) { 
        const QUESTIONS = JSON.parse(req_for_questions.responseText)
        
    } else {
        console.log("Server response: ", req_for_questions.statusText);
    }
};


const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submit = document.getElementById('submit');

let currentQuiz = 0;


loadQuiz(); //запуск квиза

function loadQuiz(){ //загрузка квиза и его обновление
    deselectAnswers();

    const currentQuizData = QUESTIONS[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
}

function deselectAnswers(){ //обновление статуса ответа
    answerElements.forEach(answerEl => answerEl.checked = false)
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
    const answer = getSelected();

    usersAnswers.push(answer);

    if(answer){

        if(currentQuiz < QUESTIONS.length){
            loadQuiz();
        }
        
    }
});


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
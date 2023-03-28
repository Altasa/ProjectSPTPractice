var QUESTIONS;
var usersAnswers = []
var currentQuiz = 0;

const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submit = document.getElementById('submit');
const quiz_name = document.getElementById('quiz-name');
//запрос на сервер
let quiz_id=window.location.href.split("?")[1].split("=")[1];
let requestURL="../php/quiz/q.php";
fetch(requestURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({R:"Q", quiz_id})
})
    .then(response=>QUESTIONS=response.json())
    .then(result=>QUESTIONS=result)
    .then(loadQuiz);

quiz_name.innerText = QUESTIONS.questions[0];

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
            send_submit();
        }
    }
});

function send_submit(){
    let ans_data={
        R:"A",
        quiz_id,
        usersAnswers
    }
    fetch(requestURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(ans_data)
    })
        .then(response=>response.json())
        .then(result=>users_res(result));

    function users_res(result){ //функция вывода результата
        if(result["U"]=="OK"){
            quiz.innerHTML = `
            <h2>You answered coreectly at ${result["A"]}/${QUESTIONS["questions"].length} questions</h2>
            <p>Your points added to score!</p>
            <button onclick="location.reload()">Reload</button>
            <button onclick="location.href='../index.html'">Return to main page</button>
            `;
        }else{
            quiz.innerHTML = `
            <h2>You answered coreectly at ${result["A"]}/${QUESTIONS["questions"].length} questions</h2>
            <p>If register you can collect this points!</p>
            <button onclick="location.reload()">Reload</button>
            <button onclick="location.href='../index.html'">Return to main page</button>
            `;
        }
    }
}

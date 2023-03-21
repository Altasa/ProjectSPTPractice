

//const data = JSON.stringify(quizData);
const xhr = new XMLHttpRequest();
 
xhr.open("GET", "/main");
xhr.setRequestHeader("Content-Type", "application/json");
 
xhr.send(data);

xhr.onload = () => {
    if (xhr.status == 200) { 
        const questions = JSON.parse(xhr.responseText)
        
    } else {
        console.log("Server response: ", xhr.statusText);
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
let score = 0;

loadQuiz();

function loadQuiz(){
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
}

function deselectAnswers(){
    answerElements.forEach(answerEl => answerEl.checked = false)
}

function getSelected(){
    let answer;

    answerElements.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

submit.addEventListener('click', () => {
    const answer = getSelected();

    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }

        currentQuiz++;

        if(currentQuiz < quizData.length){
            loadQuiz();
        }
        else{
            quiz.innerHTML = `<h2>You answered coreectly at ${score}/${quizData.length} questions</h2>
            <button onclick="location.reload()">Reload</button>`;
        }
    }
});


//Параметры заголовка
window.onscroll = function() {stickyHeader()};

var header = document.getElementById("main_h");
var sticky = header.offsetTop;

function stickyHeader() {
    if (window.pageYOffset >= sticky) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
}

//Отображение сообщения пользователю
var msgBox=document.getElementById("message");
var msgToUser=document.getElementById("message-to-user");
var msgCloseButton=document.getElementById("message-close-icon");
msgCloseButton.onclick=function(){msgClose()};
function msgClose(){
    msgBox.style.display='none';
    msgBox.style.backgroundColor='lawngreen';
}

//Загрузка учетной записи и функционала страницы
var login=document.getElementById("a-login");
var register=document.getElementById("a-register");
var requestURL="./php/intropage.php";
var hero=document.getElementById('hero');
userCheck();

//Функция подгрузки учетной записи
function userCheck(){
    //Запрос статуса сессии
    let request=new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType="json";
    request.send();
    request.onload=function(){
        if(request.response==null){ //При отсутствии сессии установить функции входа и регистрации
            login.value="Sign In";
            register.value="Sign Up";
            let message="#";    //Нужно добавить отображение специальных сообщений

            login.onclick=function(){   //Переход к форме входа в учетную запись
                location.href = "./pages/sign.html?id="+"in";
            };

            register.onclick=function(){//Переход к форме регистрации учетной записи
                location.href = "./pages/sign.html?id="+"up";
            }

        } else {    //При активной сессии установить кнопки работы с аккаунтом и выхода
            login.value="Account";
            register.value="Log Out";
            login.onclick=function(){
                location.href = "./pages/user.html";
            }
            register.onclick=function(){
                location.href = "./php/logout.php";
            }
        }
    }
}

//Загрузка викторин
let quiz1=document.getElementById('quiz1');
quiz1.onclick=function(){go_quiz(1);}
let quiz2=document.getElementById('quiz2');
quiz2.onclick=function(){go_quiz(2);}
let quiz3=document.getElementById('quiz3');
quiz3.onclick=function(){go_quiz(3);}
let quiz4=document.getElementById('quiz4');
quiz4.onclick=function(){go_quiz(4);}
function go_quiz(value){location.href="./pages/quiz.html?id="+value;}

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
var requestURL="../php/intropage.php";
var hero=document.getElementById('hero');
var account=document.getElementById('account');
userCheck();


//Функция подгрузки учетной записи
function userCheck(){
    //Запрос статуса сессии
    let request=new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType="json";
    request.send();
    request.onload=function(){
        if(request.response==null){ //При отсутствии сессии вернуть
            location.href = "../index.html";
        } else {    //При активной сессии установить кнопки работы с аккаунтом и выхода
            login.value="Play";
            register.value="Log Out";
            login.onclick=function(){
                location.href = "../index.html";
            }
            register.onclick=function(){
                location.href = "../php/logout.php";
            }
            //Установка данных аккаунта и состояния рейтинга
            let username=document.getElementById('username');
            let useremail=document.getElementById('useremail');
            let userscore=document.getElementById('userscore');
            username.textContent=request.response.login;
            useremail.textContent=request.response.email;
            userscore.textContent=request.response.score;
            let leadlist=document.querySelectorAll('#leaderboardcontent')[0].childNodes;
            for(let i=0;i<Object.keys(request.response).length-3;i++){
                leadlist[2*i+1].childNodes[0].textContent=request.response[i].login;
                leadlist[2*i+1].childNodes[1].textContent=request.response[i].score;
                leadlist[2*i+1].style.display="block";
            }
        }
    }
}

//Функционал изменений в аккаунте
var change_login_button=document.getElementById("change_login");
var change_email_button=document.getElementById("change_email");
var change_passw_button=document.getElementById("change_passw");
var changer_url="../php/changer.php";
change_login_button.onclick=function(){
    let new_login=prompt("Insert new login: ");
    let update_status;
    fetch(changer_url,{
        method: 'POST',
        body: JSON.stringify({R:"L", D:new_login})
    })
        .then(response=>response.text())
        .then(result=>update_status=result);
    //Loading
    let loading_status=false;
    let changetimerId = setInterval(() => {
        if(typeof(update_status)=="string"){
            loading_status=true;
            clearInterval(changetimerId);
        }
        if(update_status==="SUCCESS"){
            msgToUser.textContent="Success update login!";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='lawngreen';
            userCheck();
        }else if(update_status==="FAIL"){
            msgToUser.textContent="Fail update login!";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='red';
        }
    }, 100);
    //Stop loading after 3 sec
    setTimeout(() => { 
        if(loading_status==false){
            clearInterval(changetimerId);
            msgToUser.textContent="Cannot connect to server\nPlease contact administartion.";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='red';
        }
    }, 3000);
}
change_email_button.onclick=function(){
    let new_email=prompt("Insert new email: ");
    let update_status;
    fetch(changer_url,{
        method: 'POST',
        body: JSON.stringify({R:"E", D:new_email})
    })
        .then(response=>response.text())
        .then(result=>update_status=result);
    //Loading
    let loading_status=false;
    let changetimerId = setInterval(() => {
        if(typeof(update_status)=="string"){
            loading_status=true;
            clearInterval(changetimerId);
        }
        if(update_status==="SUCCESS"){
            msgToUser.textContent="Success update email!";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='lawngreen';
            userCheck();
        }else if(update_status==="FAIL"){
            msgToUser.textContent="Fail update email!";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='red';
        }
    }, 100);
    //Stop loading after 3 sec
    setTimeout(() => { 
        if(loading_status==false){
            clearInterval(changetimerId);
            msgToUser.textContent="Cannot connect to server\nPlease contact administartion.";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='red';
        }
    }, 3000);
}
change_passw_button.onclick=function(){
    let new_passw=prompt("Insert new passw: ");
    let update_status;
    fetch(changer_url,{
        method: 'POST',
        body: JSON.stringify({R:"P", D:new_passw})
    })
        .then(response=>response.text())
        .then(result=>update_status=result);
    //Loading
    let loading_status=false;
    let changetimerId = setInterval(() => {
        if(typeof(update_status)=="string"){
            loading_status=true;
            clearInterval(changetimerId);
        }
        if(update_status==="SUCCESS"){
            msgToUser.textContent="Success update passw!";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='lawngreen';
            userCheck();
        }else if(update_status==="FAIL"){
            msgToUser.textContent="Fail update passw!";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='red';
        }
    }, 100);
    //Stop loading after 3 sec
    setTimeout(() => { 
        if(loading_status==false){
            clearInterval(changetimerId);
            msgToUser.textContent="Cannot connect to server\nPlease contact administartion.";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='red';
        }
    }, 3000);
}
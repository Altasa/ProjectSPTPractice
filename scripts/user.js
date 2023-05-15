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

//Функционал изменений в аккаунте
var change_picture_button=document.getElementById("change_picture");
var change_login_button=document.getElementById("change_login");
var change_email_button=document.getElementById("change_email");
var change_passw_button=document.getElementById("change_passw");
var delete_account_button=document.getElementById("delete_account");
var changer_url="../php/changer.php";
var deleter_url="../php/deleter.php";

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
            let useremailstat=document.getElementById('useremailstat');
            let new_confirmletter_button=document.getElementById("new_confirmletter");
            let userscore=document.getElementById('userscore');
            let userpicture=document.getElementById('userpicture');
            username.textContent=request.response.login;
            useremail.textContent=request.response.email;
            if(request.response.emailstat==1){
                useremailstat.textContent="Email succesfully confirmed ";
                new_confirmletter_button.style.display='none';
            }else{
                useremailstat.textContent="Please check email to confirm ";
                new_confirmletter_button.onclick=function(){
                    new_confirmletter_button.style.display='none';
                    let update_status;
                    fetch(changer_url,{
                        method: 'POST',
                        body: JSON.stringify({R:"E", D:request.response.email})
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
                            msgToUser.textContent="New confirmation letter has been sent to your email";
                            msgBox.style.display='block';
                            msgBox.style.backgroundColor='lawngreen';
                            userCheck();
                        }else if(update_status==="FAIL"){
                            msgToUser.textContent="Fail to send confirmation letter";
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
            }
            userscore.textContent=request.response.score;
            userpicture.src="../images/users/"+request.response.picture+".png";
            userpicture.onerror=function(){
                userpicture.src="../images/miss.png";
            };
            let leadlist=document.querySelectorAll('#leaderboardcontent')[0].childNodes;
            for(let i=0;i<Object.keys(request.response).length-5;i++){
                leadlist[2*i+1].childNodes[0].src="../images/users/"+request.response[i].id+".png";
                leadlist[2*i+1].childNodes[0].onerror=function(){
                    leadlist[2*i+1].childNodes[0].src="../images/miss.png";
                };
                leadlist[2*i+1].childNodes[1].textContent=request.response[i].login;
                leadlist[2*i+1].childNodes[2].textContent=request.response[i].score;
                leadlist[2*i+1].style.display="block";
            }
        }
    }
}

change_picture_button.onclick=function(){
    let form=document.getElementById('pictureform');
    document.getElementById("prompt-pictureform-container").style.display="block";
    form.cancel.onclick=function(){
        document.getElementById('prompt-pictureform-container').style.display='none';
    };
    form.sent_picture.onclick=function(){
        let requestURL="../php/setpic.php";
        form=document.querySelector('#pictureform');
        formData=new FormData(form);
        data=formData;
        let update_status;
        fetch(requestURL,{
            method: 'POST',
            body: data
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
                msgToUser.textContent="Success update picture!";
                msgBox.style.display='block';
                msgBox.style.backgroundColor='lawngreen';
                document.getElementById('prompt-pictureform-container').style.display='none';
                userCheck();
            }else if(update_status==="FAIL"){
                msgToUser.textContent="Fail update picture!";
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
}
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
delete_account_button.onclick=function(){
    let passw=prompt("Insert password to delete account: ");
    let update_status;
    fetch(deleter_url,{
        method: 'POST',
        body: JSON.stringify(passw)
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
            msgToUser.textContent="Success delete account!";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='lawngreen';
            userCheck();
        }else if(update_status==="EMAILNEED"){
            msgToUser.textContent="Need confirm deleting - please check email";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='gold';
        }else if(update_status==="INVPW"){
            msgToUser.textContent="Invalid password!";
            msgBox.style.display='block';
            msgBox.style.backgroundColor='red';
        }else if(update_status==="FAIL"){
            msgToUser.textContent="Unknown Server Error\nPlease contact administration.";
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
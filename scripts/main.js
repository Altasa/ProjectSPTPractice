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

var msgBox=document.getElementById("message");
var msgToUser=document.getElementById("message-to-user");
var msgCloseButton=document.getElementById("message-close-icon");
msgCloseButton.onclick=function(){
    msgBox.style.display='none';
    msgBox.style.backgroundColor='lawngreen';
}

var forms=document.getElementById("forms");
var login=document.getElementById("a-login");
var register=document.getElementById("a-register");
var requestURL="./php/intropage.php";
userCheck();

function userCheck(){
    let request=new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType="json";
    request.send();
    request.onload=function(){
        if(request.response==null){
            login.value="Sign In";
            register.value="Sign Up";
            login.onclick=function(){
                cover();
            
                let form=document.getElementById('signinform');
                let container=document.getElementById('prompt-signinform-container');
                container.style.display='flex';
            
                form.cancel.onclick=function(){
                    remove_cover();
                    container.style.display='none';
                };
            
                form.sign_in.onclick=function(){
                    let requestURL="./php/log.php";
                    form=document.querySelector('#signinform');
                    formData=new FormData(form);
                    formData.append("sign_in", "");
                    data=new URLSearchParams(formData);
                    let login_status;
                    fetch(requestURL,{
                        method: 'POST',
                        body: data
                    })
                        .then(response=>response.text())
                        .then(result=>login_status=result);
                    //Loading
                    let loading_status=false;
                    let logtimerId = setInterval(() => {
                        if(login_status==="EMPTY"){
                            message.innerText="All fields are required!";
                        }else if(login_status==="INVLEN"){
                            message.innerText="Max 32 symbols in fields!";
                        }else if(login_status==="INVLOG"){
                            message.innerText="Invalid Username!";
                        }else if(login_status==="INVPAS"){
                            message.innerText="Invalid Password!";
                        }else if(login_status==="UNKER"){
                            message.innerText="Unknown Server Error\nPlease contact administration.";
                        }else if((login_status==="ACLOG")||(login_status=="ALLOG")){
                            msgToUser.textContent="Success login!";
                            msgBox.style.display='block';
                            remove_cover();
                            container.style.display='none';
                            userCheck();
                        }
                        if(typeof(login_status)=="string"){
                            loading_status=true;
                            clearInterval(logtimerId);
                        }
                    }, 100);
                    //Stop loading after 3 sec
                    setTimeout(() => { 
                        if(loading_status==false){
                            clearInterval(logtimerId);
                            message.innerText="Cannot connect to server\nPlease contact administration.";
                        }
                    }, 3000);
                }
            };
            register.onclick=function(){
                cover();
            
                let form=document.getElementById('signupform');
                let container=document.getElementById('prompt-signupform-container');
                container.style.display='flex';
            
                form.cancel.onclick=function(){
                    remove_cover();
                    container.style.display='none';
                };
            
                form.sign_up.onclick=function(){
                    let requestURL="./php/reg.php";
                    form=document.querySelector('#signupform');
                    formData=new FormData(form);
                    formData.append("sign_up", "");
                    data=new URLSearchParams(formData);
                    let reger_status;
                    fetch(requestURL,{
                        method: 'POST',
                        body: data
                    })
                        .then(response=>response.text())
                        .then(result=>reger_status=result);
                    //Loading
                    let loading_status=false;
                    let regtimerId = setInterval(() => {
                        if(reger_status==="EMPTY"){
                            message.innerText="All fields are required!";
                        }else if(reger_status==="BUSY"){
                            message.innerText="Username already exist!";
                        }else if(reger_status==="SUCCESS"){
                            msgToUser.textContent="Success register!";
                            msgBox.style.display='block';
                            remove_cover();
                            container.style.display='none';
                            userCheck();
                        }else if(reger_status==="FAIL"){
                            message.innerText="Unknown Server Error\nPlease contact administration.";
                        }else if(reger_status==="TLDR"){
                            message.innerText="Max 32 symbols in fields!";
                        }
                        if(typeof(reger_status)=="string"){
                            loading_status=true;
                            clearInterval(regtimerId);
                        }
                    }, 100);
                    //Stop loading after 3 sec
                    setTimeout(() => { 
                        if(loading_status==false){
                            clearInterval(regtimerId);
                            message.innerText="Cannot connect to server\nPlease contact administration.";
                        }
                    }, 3000);
                }
            }
        } else {
            login.value="Account";
            register.value="Log Out";
            let playpage=true;
            let hero=document.getElementById('hero');
            let account=document.getElementById('account');
            login.onclick=function(){
                if(playpage==true){
                    login.value="Play";
                    playpage=false;
                    hero.style.display='none';
                    account.style.display='block';
                }else{
                    login.value="Account";
                    playpage=true;
                    hero.style.display='block';
                    account.style.display='none';
                }
            }
            register.onclick=function(){
                location.href = "./php/logout.php";
            }
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
    function cover(){
        let coverDiv=document.createElement('div');
        coverDiv.id='cover-div';
        document.body.style.overflowY='hidden';
        document.body.append(coverDiv);
        forms.style.width="100%";
    }
    function remove_cover(){
        document.getElementById('cover-div').remove();
        document.body.style.overflowY='';
        forms.style.width="0%";
    }
}

var change_login_button=document.getElementById("change_login");
var change_email_button=document.getElementById("change_email");
var change_passw_button=document.getElementById("change_passw");
var changer_url="./php/changer.php";
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

let quiz1=document.getElementById('quiz1');
quiz1.onclick=function(){
    go_quiz(1);
}
function go_quiz(value){
    location.href="./pages/quiz.html?id="+value;
}

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



var login=document.getElementById("a-login");
var register=document.getElementById("a-register");
var requestURL="./php/intropage.php";
var request=new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType="html";
request.send();
request.onload=function(){
    if(request.response=="REJECT"){
        login.value="Sign In";
        register.value="Sign Up";
        login.onclick=function(){
            let coverDiv=document.createElement('div');
            coverDiv.id='cover-div';
            document.body.style.overflowY='hidden';
            document.body.append(coverDiv);
        
            let form=document.getElementById('signinform');
            let container=document.getElementById('prompt-signinform-container');
            let message=document.getElementById('signin-prompt-message');
            message.innerHTML="Sign In";
            container.style.display='flex';
        
            form.cancel.onclick=function(){
                document.getElementById('cover-div').remove();
                document.body.style.overflowY='';
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
                        message.innerText="Sign In\nAll fields are required!";
                    }else if(login_status==="INVLEN"){
                        message.innerText="Sign In\nMax 32 symbols in fields!";
                    }else if(login_status==="INVLOG"){
                        message.innerText="Sign In\nInvalid Username!";
                    }else if(login_status==="INVPAS"){
                        message.innerText="Sign In\nInvalid Password!";
                    }else if(login_status==="UNKER"){
                        message.innerText="Sign In\nUnknown Server Error\nPlease contact administration.";
                    }else if((login_status==="ACLOG")||(login_status=="ALLOG")){
                        location.reload();
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
                        message.innerText="Sign In\nCannot connect to server\nPlease contact administration.";
                    }
                }, 3000);
            }
        };
        register.onclick=function(){
            let coverDiv=document.createElement('div');
            coverDiv.id='cover-div';
            document.body.style.overflowY='hidden';
            document.body.append(coverDiv);
        
            let form=document.getElementById('signupform');
            let container=document.getElementById('prompt-signupform-container');
            let message=document.getElementById('signup-prompt-message');
            message.innerHTML="Sign Up";
            container.style.display='flex';
        
            form.cancel.onclick=function(){
                document.getElementById('cover-div').remove();
                document.body.style.overflowY='';
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
                        message.innerText="Sign Up\nAll fields are required!";
                    }else if(reger_status==="BUSY"){
                        message.innerText="Sign Up\nUsername already exist!";
                    }else if(reger_status==="SUCCESS"){
                        alert("SUCCESS REGISTRATION");
                        location.reload();
                    }else if(reger_status==="FAIL"){
                        message.innerText="Sign Up\nUnknown Server Error\nPlease contact administration.";
                    }else if(reger_status==="TLDR"){
                        message.innerText="Sign Up\nMax 32 symbols in fields!";
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
                        message.innerText="Sign In\nCannot connect to server\nPlease contact administration.";
                    }
                }, 3000);
            }
        }
    } else if(request.response=="ACCESS"){
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
    }
}
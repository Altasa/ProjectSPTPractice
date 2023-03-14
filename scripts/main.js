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
var requestURL="../php/intropage.php";
var request=new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType="html";
request.send();
var mode;
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
            document.getElementById('prompt-message').innerHTML="Sign In";
            container.style.display='block';
        
            function complete(value){
                document.getElementById('cover-div').remove();
                document.body.style.overflowY='';
                container.style.display='none';
            }
        
            form.cancel.onclick=function(){
                complete(null);
            };
        
            form.sign_in.onclick=function(){
                let requestURL="../php/log.php";
                form=document.querySelector('#signinform');
                formData=new FormData(form);
                formData.append("sign_in", "");
                data=new URLSearchParams(formData);
                fetch(requestURL,{
                    method: 'POST',
                    body: data
                })
                    .then(response=>response.text())
                    .then(result=>alert(result));
            }
        };
        register.onclick=function(){
            let coverDiv=document.createElement('div');
            coverDiv.id='cover-div';
            document.body.style.overflowY='hidden';
            document.body.append(coverDiv);
        
            let form=document.getElementById('signupform');
            let container=document.getElementById('prompt-signupform-container');
            document.getElementById('prompt-message').innerHTML="Sign Up";
            container.style.display='block';
        
            function complete(value){
                document.getElementById('cover-div').remove();
                document.body.style.overflowY='';
                container.style.display='none';
            }
        
            form.cancel.onclick=function(){
                complete(null);
            };
        
            form.sign_up.onclick=function(){
                let requestURL="../php/reg.php";
                form=document.querySelector('#signupform');
                formData=new FormData(form);
                formData.append("sign_up", "");
                data=new URLSearchParams(formData);
                fetch(requestURL,{
                    method: 'POST',
                    body: data
                })
                    .then(response=>response.text())
                    .then(result=>alert(result));
            }
        }
    } else if(request.response=="ACCESS"){
        login.value="Account";
        register.value="Log Out";
        login.onclick=function(){
            location.href = "./pages/account.html";
        }
        register.onclick=function(){
            location.href = "./php/logout.php";
        }
    }
}
var login=document.querySelector(".login");
var passw=document.querySelector(".passw");
var sign_in=document.querySelector(".sign_in");
var sign_up=document.querySelector(".sign_up");
function SignIn(){
    var username=login.value;
    var password=passw.value;
    alert(username+" "+password);
}
sign_in.addEventListener('click', SignIn);
function SignUp(){
    var username=login.value;
    var password=passw.value;
}
sign_up.addEventListener('click', SignUp);
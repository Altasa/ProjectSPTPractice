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
    alert(username+" "+password);
}
sign_up.addEventListener('click', SignUp);
//database
var requestURL="https://altasa.github.io/SPTP";
//try load file
var request=new XMLHttpRequest();
request.open('GET', requestURL+"/data.json");
request.responseType="json";
request.send();
request.onload=function(){
    var database=request.response;
    alert(database['name']);
}
//try save file
var registr=new XMLHttpRequest();
registr.open('POST', requestURL);
registr.setRequestHeader('Content-Type', 'application/json charset=utf-8');
let json=JSON.stringify(
    {"name":"Example"}
);
registr.send(json);
var requestURL="http://f0781709.xsph.ru/log.php";
var request=new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType="html";
request.send();
request.onload=function(){
    if(request.response=="REJECT"){
        account1.textContent="Sign In";
        account1.setAttribute("href", "./pages/signin.html");
        account2.textContent="Sign Up";
    } else if(request.response=="ACCESS"){
        account1.textContent="Account";
        account2.textContent="Log out";
    }
}
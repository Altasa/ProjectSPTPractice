var account1=document.querySelector(".account1");
var account2=document.querySelector(".account2");
var requestURL="../php/intropage.php";
var request=new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType="html";
request.send();
request.onload=function(){
    if(request.response=="REJECT"){
        account1.textContent="Sign In";
        account1.setAttribute("href", "./pages/signin.html");
        account2.textContent="Sign Up";
        account2.setAttribute("href", "./pages/signup.html");
    } else if(request.response=="ACCESS"){
        account1.textContent="Account";
        account1.setAttribute("href", "./pages/account.html")
        account2.textContent="Log out";
        account2.setAttribute("href", "./php/logout.php")
    }
}
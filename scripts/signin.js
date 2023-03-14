var login_button=document.querySelector(".login_button");
var requestURL="../php/log.php";
login_button.onclick=function submit(){
    form = document.querySelector('#formElem')
    formData = new FormData(form);
    formData.append("sign_in", "");
    data = new URLSearchParams(formData);
    fetch(requestURL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Disposition': 'form-data'
          },
        body: data
    })
        .then(response=>response.text())
        .then(result=>alert(result));
}
var mainscript=document.createElement('script');
mainscript.src="./scripts/main.js";
document.head.appendChild(mainscript);
mainscript.onerror=function() {   //Перезагрузка при сбое
    script=document.createElement('script');
    script.src="./scripts/main.js";
    document.body.append(script);
};
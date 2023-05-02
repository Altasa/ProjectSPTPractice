<?php   //Обработчик запроса удаления аккаунта
    session_start();
    if(($_GET['hash'])&&(isset($_SESSION["session_login"]))){
        $hash=htmlspecialchars($_GET['hash']);
        //Получаем id и подтверждено ли Email
        require("./dbcon.php");
        if($result=mysqli_query($con, "SELECT `login`, `email_confirmed` FROM `userlist` WHERE `hash`='".$hash."'")) {
            while($row=mysqli_fetch_assoc($result)){ 
                $login=$row['login'];
                $emailstat=$row['email_confirmed'];
            }
            if(($emailstat==1)&&($login==$_SESSION['session_login'])){
                mysqli_query($con, "DELETE FROM `userlist` WHERE `login`=".$login);
                header("Location: ../php/logout.php");
            } else {
                header("Location: ../pages/sign.html?id=in");
            }
        } else {
            header("Location: ../pages/sign.html?id=in");
        }
    }else{
        header("Location: ../pages/sign.html?id=in");
    }
    ?>
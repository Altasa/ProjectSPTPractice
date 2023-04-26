<?php   //Обработчик запроса удаления аккаунта
    if($_GET['hash']){
        $hash=htmlspecialchars($_GET['hash']);
        //Получаем id и подтверждено ли Email
        require("./dbcon.php");
        if($result=mysqli_query($con, "SELECT `id`, `email_confirmed` FROM `userlist` WHERE `hash`='".$hash."'")) {
            while($row=mysqli_fetch_assoc($result)){ 
                $id=$row['id'];
                $emailstat=$row['email_confirmed'];
            }
            //Проверяет подтверждён ли Email
            if($emailstat==1){
                //Если да, произвести удаление
                mysqli_query($con, "DELETE FROM `userlist` WHERE `id`=".$id);
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
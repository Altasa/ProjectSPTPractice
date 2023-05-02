<?php   //Обработчик запроса удаления аккаунта
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);
    session_start();
    if((isset($_SESSION["session_login"]))&&(!empty($data))){
        $login=$_SESSION['session_login'];
        $email=$_SESSION['session_email'];
        require("./dbcon.php");
        $data=htmlspecialchars($data);
        $sql="SELECT `passw`, `email_confirmed` FROM `userlist` WHERE `login` = '".$login."'";
        $result=mysqli_query($con, $sql);
        if($result) {
            while($row=mysqli_fetch_assoc($result)){ 
                $dbpassw=$row['passw'];
                $emailstat=$row['email_confirmed'];
            }
            if($data==$dbpassw){
                if($emailstat==1){
                    $hash=md5($login.time());
                    mysqli_query($con, "UPDATE `userlist` SET `hash` = '".$hash."' WHERE `login`='".$login."'");
                    //Отправка письма подтверждения Email
                    require('smtp-func.php');
                    //Переменная $headers нужна для Email заголовка
                    $headers  = "MIME-Version: 1.0\r\n";
                    $headers .= "Content-type: text/html; charset=utf-8\r\n";
                    $headers .= "To: <$email>\r\n";
                    $headers .= "From: <bestquizever.limited@mail.ru>\r\n";
                    //Сообщение для Email
                    $message = '
                            <html>
                            <head>
                            <title>Подтверждение Удаления аккаунта</title>
                            </head>
                            <body>
                            <p>Здравствуйте '.$login.' !</p>
                            <p>Подан запрос на удаление Вашего аккаунта</p>
                            <p>Если Вы этого не делали, пожалуйста, смените пароль и сообщите администрации сайта: <a href="http://f0781709.xsph.ru/index.html">Перейти на сайт</a></p>
                            <br>
                            <p>Чтобы подтвердить удаление, перейдите по ссылке: <a href="http://f0781709.xsph.ru/php/deleter_email.php?hash='.$hash.'">Подтвердить удаление</a></p>
                            <p>Спасибо за Ваше участие!</p>
                            </body>
                            </html>
                            ';
                    //Отправка почты
                    smtpmail($email, "BEST QUIZ EVER - Удаление аккаунта", $message, $headers);
                    echo "EMAILNEED";
                }else{
                    $result2=mysqli_query($con, "DELETE FROM `userlist` WHERE `login`='".$login."'");
                    if($result2){
                        unset($_SESSION['session_login']);
                        unset($_SESSION['session_email']);
                        unset($_SESSION['session_picture']);
                        unset($_SESSION['session_score']);
                        session_destroy();
                        echo "SUCCESS";
                    }else{
                        echo "FAIL";
                    }
                }
            }else{
                echo "INVPW";
            }
        }else{
            echo "FAIL";
        }
    }else{
        echo "EMPTY";
    }
    ?>
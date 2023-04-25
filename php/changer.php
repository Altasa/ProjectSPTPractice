<?php   //Обработчики запросов изменения данных учетной записи
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);
    session_start();
    if((isset($_SESSION["session_login"]))&&(!empty($data["D"]))){
        require("./dbcon.php");
        if($data["R"]=="L") {
	        $new_val=htmlspecialchars($data["D"]);
            $sql="UPDATE `userlist` SET `login` = '".$new_val."' WHERE `login`='".$_SESSION['session_login']."'";
            $result=mysqli_query($con, $sql);
            if($result) {
                $_SESSION['session_login']=$new_val;
                echo "SUCCESS";
            }else{
                echo "FAIL";
            }
        }else if($data["R"]=="E"){
	        $new_val=htmlspecialchars($data["D"]);
            $login=$_SESSION['session_login'];
            $sql="UPDATE `userlist` SET `email` = '".$new_val."' WHERE `login`='".$login."'";
            $result=mysqli_query($con, $sql);
            if($result) {
                $_SESSION['session_email']=$new_val;
                $hash=md5($new_val.time());
                mysqli_query($con, "UPDATE `userlist` SET `hash` = '".$hash."' WHERE `login`='".$login."'");
                echo "SUCCESS";
                //Отправка письма подтверждения Email
				require('smtp-func.php');
				//Переменная $headers нужна для Email заголовка
				$headers  = "MIME-Version: 1.0\r\n";
				$headers .= "Content-type: text/html; charset=utf-8\r\n";
				$headers .= "To: <$new_val>\r\n";
				$headers .= "From: <bestquizever.limited@mail.ru>\r\n";
				//Сообщение для Email
				$message = '
						<html>
						<head>
						<title>Подтверждение Email</title>
						</head>
						<body>
						<p>Здравствуйте '.$login.' !</p>
			    		<p>Подтверждение Email позволит вам сбросить пароль и блокирует несанкционированное удаление аккаунта.</p>
						<p>Что бы подтвердить Email, перейдите по ссылке: <a href="http://f0781709.xsph.ru/php/confirm.php?hash='.$hash.'">подтвердить</a></p>
						<p>Спасибо за Ваше участие!</p>
						</body>
						</html>
						';
				//Отправка почты
				smtpmail($new_val, "BEST QUIZ EVER - Подтверждение Email", $message, $headers);
            }else{
                echo "FAIL";
            }
        }else if($data["R"]=="P"){
	        $new_val=htmlspecialchars($data["D"]);
            $sql="UPDATE `userlist` SET `passw` = '".$new_val."' WHERE `login`='".$_SESSION['session_login']."'";
            $result=mysqli_query($con, $sql);
            if($result) {
                echo "SUCCESS";
            }else{
                echo "FAIL";
            }
        }else{
            echo "FAIL";
        }
    }else{
        echo "FAIL";
    }
    ?>
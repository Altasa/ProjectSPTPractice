<?php	//Обработка попытки регистрации
	if(isset($_POST["sign_up"])) {
	    if(!empty($_POST['login']) && !empty($_POST['passw'])) {
            $login=htmlspecialchars($_POST['login']);
	        $passw=htmlspecialchars($_POST['passw']);
            $email=htmlspecialchars($_POST['email']);
			if(
				(strlen($login)<33)&&
				(strlen($passw)<33)&&
				(strlen($email)<65)
			){
				include("./dbcon.php");
            	$query=mysqli_query($con, "SELECT `login` FROM `userlist` WHERE `login`='".$login."'");
            	$numrows=mysqli_num_rows($query);
            	if($numrows==0){
					//Хеш подтверждения Email
					$hash=md5($login.time());
					$score=0;
	            	$sql="INSERT INTO `userlist` (login, passw, email, hash, score) VALUES('$login', '$passw', '$email', '$hash', '$score')";
                	$result=mysqli_query($con, $sql);
                	if($result) {
						session_start();
						$_SESSION['session_login']=$login;
						$_SESSION['session_email']=$email;
						$_SESSION['session_score']=$score;
						$query=mysqli_query($con, "SELECT `id`, `email_confirmed` FROM `userlist` WHERE `login`='".$login."'");
						while($row=mysqli_fetch_assoc($query)){
							$_SESSION['session_picture']=$row['id'];
							$_SESSION['session_emailstat']=$row['email_confirmed'];
						}
						echo "SUCCESS";
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
								<title>Подтверждение Email</title>
								</head>
								<body>
								<p>Здравствуйте '.$login.' !</p>
								<p>Подтверждение Email позволит вам сбросить пароль и блокирует несанкционированное удаление аккаунта.</p>
								<p>Чтобы подтвердить Email, перейдите по ссылке: <a href="http://f1003067.xsph.ru/php/confirm.php?hash='.$hash.'">подтвердить</a></p>
								<p>Спасибо за Ваше участие!</p>
								</body>
								</html>
								';
						//Отправка почты
						smtpmail($email, "BEST QUIZ EVER - Подтверждение Email", $message, $headers);
                	} else {
						echo "FAIL";
                	}
	        	} else {
	            	echo "BUSY";
            	}
			}else{
				echo "TLDR";
			}
	    }else{
	        echo "EMPTY";
	    }
	}
	?>
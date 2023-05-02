<?php	//Сброс пароля
	if(isset($_POST["lost_passw"])) {
    	if(!empty($_POST['login']) || !empty($_POST['passw'])) {
	        $login=htmlspecialchars($_POST['login']);
	        $email=htmlspecialchars($_POST['passw']);
			if((strlen($login)<33)&&(strlen($email)<65)){
				require("./dbcon.php");
				require('smtp-func.php');
				if(!empty($_POST['login'])){
					$query=mysqli_query($con, "SELECT `login`, `email` FROM `userlist` WHERE `login`='".$login."'");
					$numrows=mysqli_num_rows($query);
					if($numrows!=0) {
						while($row=mysqli_fetch_assoc($query)) {
							$dblogin=$row['login'];
							$dbemail=$row['email'];
						}
						$new_passw=substr(md5($dblogin.time()), 0, 5);
						$sql="UPDATE `userlist` SET `passw` = '".$new_passw."' WHERE `login`='".$dblogin."'";
						$result=mysqli_query($con, $sql);
						if($result) {
							sendnewpassw($dblogin, $dbemail, $new_passw);
							echo "SUCCESS";
						}else{
							echo "UNKER";
						}
					}else{
						echo "INVLOG";
					}
				}else{
                    $query=mysqli_query($con, "SELECT `login`, `email` FROM `userlist` WHERE `email`='".$email."'");
				    $numrows=mysqli_num_rows($query);
				    if($numrows!=0) {
                        while($row=mysqli_fetch_assoc($query)) {
							$dblogin=$row['login'];
                            $dbemail=$row['email'];
					    }
						$new_passw=substr(md5($dblogin.time()), 0, 5);
						$sql="UPDATE `userlist` SET `passw` = '".$new_passw."' WHERE `login`='".$dblogin."'";
						$result=mysqli_query($con, $sql);
						if($result) {
							sendnewpassw($dblogin, $dbemail, $new_passw);
							echo "SUCCESS";
						}else{
							echo "UNKER";
						}
                    }else{
						echo "INVEML";
					}
				}
			}else{
				echo "INVLEN";
			}
	    }else{
            echo "EMPTY";
	    }
	}else{
	    echo "UNKER";
	}
	function sendnewpassw($login, $mail_to, $new_passw){
		//Отправка письма с новым паролем
		//Переменная $headers нужна для Email заголовка
		$headers  = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n";
		$headers .= "To: <$mail_to>\r\n";
		$headers .= "From: <bestquizever.limited@mail.ru>\r\n";
		//Сообщение для Email
		$message = '
				<html>
				<head>
				<title>Подтверждение Email</title>
				</head>
				<body>
				<p>Здравствуйте '.$login.' !</p>
				<p>Подан запрос на сброс Вашего пароля</p>
				<p>Ваш новый пароль: "'.$new_passw.'"</p>
				<p><a href="http://f0781709.xsph.ru/index.html">Перейти на сайт</a></p>
				<p>Спасибо за Ваше участие!</p>
				</body>
				</html>
				';
		//Отправка почты
		smtpmail($mail_to, "BEST QUIZ EVER - Сброс пароля", $message, $headers);
		return true;
	}
	?>
<?php	//Сброс пароля
	if(isset($_POST["lost_passw"])) {
    	if(!empty($_POST['login'])) {
	        $login=htmlspecialchars($_POST['login']);
			if(strlen($login)<65){
				require("./dbcon.php");
				require('smtp-func.php');
				$query=mysqli_query($con, "SELECT `login`, `email`, `email_confirmed` FROM `userlist` WHERE `login`='".$login."'");
				$numrows=mysqli_num_rows($query);
				if($numrows!=0) {
					while($row=mysqli_fetch_assoc($query)) {
						$dblogin=$row['login'];
						$dbemail=$row['email'];
						$email_stat=$row['email_confirmed'];
					}
					if($email_stat==1){
						$new_passw=substr(md5($dblogin.time()), 0, 5);
						if(sendnewpassw($dblogin, $dbemail, $new_passw)){
							$sql="UPDATE `userlist` SET `passw` = '".$new_passw."' WHERE `login`='".$dblogin."'";
							$result=mysqli_query($con, $sql);
							if($result) {
								echo "SUCCESS";
							}else{
								echo "UNKER";
							}
						}else{
							echo "UNKER";
						}
					}else{
						echo "INVEML";
					}
				}else{
                    $query=mysqli_query($con, "SELECT `login`, `email`, `email_confirmed` FROM `userlist` WHERE `email`='".$login."'");
				    $numrows=mysqli_num_rows($query);
				    if($numrows!=0) {
                        while($row=mysqli_fetch_assoc($query)) {
							$dblogin=$row['login'];
                            $dbemail=$row['email'];
							$email_stat=$row['email_confirmed'];
					    }
						if($email_stat==1){
							$new_passw=substr(md5($dblogin.time()), 0, 5);
							if(sendnewpassw($dblogin, $dbemail, $new_passw)){
								$sql="UPDATE `userlist` SET `passw` = '".$new_passw."' WHERE `login`='".$dblogin."'";
								$result=mysqli_query($con, $sql);
								if($result) {
									echo "SUCCESS";
								}else{
									echo "UNKER";
								}
							}else{
								echo "UNKER";
							}
						}else{
							echo "INVEML";
						}
                    }else{
						echo "INVLOG";
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
				<p><a href="http://f1003067.xsph.ru/index.html">Перейти на сайт</a></p>
				<p>Спасибо за Ваше участие!</p>
				</body>
				</html>
				';
		//Отправка почты
		smtpmail($mail_to, "BEST QUIZ EVER - Сброс пароля", $message, $headers);
		return true;
	}
	?>
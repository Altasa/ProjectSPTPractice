<?php
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
					$score=0;
	            	$sql="INSERT INTO `userlist` (login, passw, email, score) VALUES('$login', '$passw', '$email', '$score')";
                	$result=mysqli_query($con, $sql);
                	if($result) {
						session_start();
						$_SESSION['session_login']=$login;
						$_SESSION['session_email']=$email;
						$_SESSION['session_score']=$score;
	                	echo "SUCCESS";
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
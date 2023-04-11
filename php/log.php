<?php	//Обработка попытки входа
	session_start();
	if(isset($_SESSION["session_login"])) {
	    echo "ALLOG";
	} else
	if(isset($_POST["sign_in"])) {
    	if(!empty($_POST['login']) && !empty($_POST['passw'])) {
	        $login=htmlspecialchars($_POST['login']);
	        $passw=htmlspecialchars($_POST['passw']);
			if((strlen($login)<33)||(strlen($passw)<33)){
				require("./dbcon.php");
				$query=mysqli_query($con, "SELECT `login`, `passw`, `email`, `score` FROM `userlist` WHERE `login`='".$login."'");
				$numrows=mysqli_num_rows($query);
				if($numrows!=0) {
					while($row=mysqli_fetch_assoc($query)) {
						$dblogin=$row['login'];
						$dbpassw=$row['passw'];
						$dbemail=$row['email'];
						$dbscore=$row['score'];
					}
					if($login == $dblogin && $passw == $dbpassw) {
						$_SESSION['session_login']=$login;
						$_SESSION['session_email']=$dbemail;
						$_SESSION['session_score']=$dbscore;
						echo "ACLOG";
					}else{
						echo "INVPAS";
					}
				} else {
					echo  "INVLOG";
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
	?>
<?php	//Обработка замены изображения
	session_start();
	if(isset($_SESSION["session_login"])) {
            if(($_FILES['picture']['type']=="image/png")&&
                ($_FILES['picture']['size']<10241)){
                if(move_uploaded_file($_FILES['picture']['tmp_name'], '../images/users/'.$_SESSION['session_picture'].'.png')){
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
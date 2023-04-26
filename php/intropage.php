<?php   //Отображение статуса сессии
    session_start();
    if(!isset($_SESSION["session_login"])):
        echo "REJECT";
    else:
        $arr=array(
            'login'=>$_SESSION['session_login'],
            'email'=>$_SESSION['session_email'],
            'picture'=>$_SESSION['session_picture'],
            'emailstat'=>$_SESSION['session_emailstat'],
            'score'=>$_SESSION['session_score']
        );
        //Выборка списка лидеров
        require("./dbcon.php");
        $query=mysqli_query($con, "SELECT `login`, `id`, `score` FROM `userlist` ORDER BY `score` DESC LIMIT 5");
        $numrows=mysqli_num_rows($query);
		if($numrows!=0) {
            for($i=0;$i<$numrows;$i++){
                $arr[$i]=mysqli_fetch_assoc($query);
            }
        }
        echo json_encode($arr);
    endif; 
    ?>
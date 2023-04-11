<?php   //Отображение статуса сессии
    session_start();
    if(!isset($_SESSION["session_login"])):
        echo "REJECT";
    else:
        $arr=array(
            'login'=>$_SESSION['session_login'],
            'email'=>$_SESSION['session_email'],
            'score'=>$_SESSION['session_score']
        );
        //Выборка списка лидеров
        require("./dbcon.php");
        $query=mysqli_query($con, "SELECT `login`, `score` FROM `userlist` ORDER BY `score` DESC LIMIT 5");
        $numrows=mysqli_num_rows($query);
		if($numrows!=0) {
            for($i=0;$i<$numrows;$i++){
                $arr[$i]=mysqli_fetch_assoc($query);
            }
        }
        echo json_encode($arr);
    endif; 
    ?>
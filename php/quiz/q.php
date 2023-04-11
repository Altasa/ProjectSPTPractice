<?php
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);
    if($data["R"]=="Q") {   //Загрузчик викторин
        $quiz_addr="../../data/quiz/q";
        switch($data["quiz_id"]){
            case "1": $quiz_addr.="1"; break;
            case "2": $quiz_addr.="2"; break;
            case "3": $quiz_addr.="3"; break;
        }
        echo file_get_contents($quiz_addr."q.json");
    }else if($data["R"]=="A"){  //Обработчик ответов
        $answers=json_decode(file_get_contents('../../data/quiz/q'.$data["quiz_id"]."a.json"), true);
        $right=0;
        for($i=0;$i<count($answers["answers"]);$i++){
            if($answers["answers"][$i]==$data["usersAnswers"][$i]){
                $right++;
            }
        }
        $resp["A"]=$right;
        session_start();
        //Сохранение результатов в учетную запись
        if(isset($_SESSION["session_login"])){
            require("../dbcon.php");
            $query_old_val=mysqli_query($con, "SELECT `"."quiz".$data["quiz_id"]."` FROM `userlist` WHERE `login`='".$_SESSION['session_login']."'");
            $old_val=mysqli_fetch_assoc($query_old_val)["quiz".$data["quiz_id"]];
            $_SESSION['session_score']=$_SESSION['session_score']-$old_val+$right;
            $query_new_val=mysqli_query($con, "UPDATE `userlist` SET `"."quiz".$data["quiz_id"]."` = '".$right."' WHERE `login`='".$_SESSION['session_login']."'");
            $query_scr_upd=mysqli_query($con, "UPDATE `userlist` SET `score` = '".$_SESSION['session_score']."' WHERE `login`='".$_SESSION['session_login']."'");
            $resp["U"]=["OK"];
        }else{
            $resp["U"]=["NO"];
        }
        echo json_encode($resp);
    }else{
        die("UNKER");
    }
    ?>
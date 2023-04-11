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
            $sql="UPDATE `userlist` SET `email` = '".$new_val."' WHERE `login`='".$_SESSION['session_login']."'";
            $result=mysqli_query($con, $sql);
            if($result) {
                $_SESSION['session_email']=$new_val;
                echo "SUCCESS";
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
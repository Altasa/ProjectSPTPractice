<?php
	// Database constants
	// do not forget create table "userlist"
	// id, login, passw, email, email_confirmed, hash, score, quiz1, quiz2, quiz3, quiz4.
	// int str    str    str    int              str   int    int    int    int    int
	define("DB_SERVER", "localhost");
	define("DB_USER", "username");
	define("DB_PASS", "password");
	define("DB_NAME", "database");

	$con = mysqli_connect(DB_SERVER,DB_USER, DB_PASS) or die(mysql_error());
	mysqli_select_db($con, DB_NAME) or die("Cannot select DB");
?>
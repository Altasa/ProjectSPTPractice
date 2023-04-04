<?php
	session_start();
	unset($_SESSION['session_login']);
	unset($_SESSION['session_email']);
	unset($_SESSION['session_score']);
	session_destroy();
	header("Location: ../index.html");
	?>
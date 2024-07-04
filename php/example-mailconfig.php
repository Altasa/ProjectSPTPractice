<?php
	// login to smtp server via application password.
	$config = array(
		'smtp_charset'=>'utf-8',
        'smtp_username'=>'account_name@domain.name',
        'smtp_password'=>'application_password',
        'smtp_from'=>'account_name@domain.name',
        'smtp_host'=>'smtp.domain.name', // or another address of your domain mail server.
		'smtp_port'=>'465', // or another port of your domain mail server.
		'smtp_debug'=>true
	);
?>
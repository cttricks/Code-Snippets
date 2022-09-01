<?php

/*
 * Written By: Tanish Raj
 * Date: 2022/09/01
 * Contact: help.cttricks@gmail.com
*/

date_default_timezone_set("Asia/Kolkata");
$REDIRECT_URL = "https://niotron.com";
$LOG_DIRECTORY = "dailylogs";

if(!is_dir($LOG_DIRECTORY)){
	mkdir($LOG_DIRECTORY);
}

$LOGFILE = $LOG_DIRECTORY. '/ip'. date('Ymd', time()) .'.json';
$_LOGFILE = $LOG_DIRECTORY .'/ip'. date('d.m.Y',strtotime("-1 days")) .'.json';

if(is_file($_LOGFILE)){
	unlink($_LOGFILE);
}

$LOGS = array();
if(is_file($LOGFILE)){
	$LOGS = json_decode(file_get_contents($LOGFILE), true);
}

function getFormattedIP() {
    $userid = '';
    if (getenv('HTTP_CLIENT_IP'))
        $userid = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $userid = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $userid = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $userid = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $userid = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $userid = getenv('REMOTE_ADDR');
    else
        $userid = '151.01.01.001';
	
    return  "ip_" . str_replace(":","_",str_replace(".","_", $userid));
}

$IP = getFormattedIP();

if(isset($_GET['code']) && strlen(preg_replace('/[^A-Za-z0-9]/', '', $_GET['code'])) > 0){
	//LOG & Redirect Client
	$LOGS[$IP] = preg_replace('/[^A-Za-z0-9]/', '', $_GET['code']);
	file_put_contents($LOGFILE, json_encode($LOGS, JSON_PRETTY_PRINT));
	
	header('Location: ' . $REDIRECT_URL);
	exit;
}else{
	//Print ReferrerCode If Available
	$RES = array('status' => false, 'msg' => 'no refferrer code available');
	if(isset($LOGS[$IP])){
		$RES = array(
			'status' => true, 
			'msg' => 'successfully got refferrer code', 
			'code' => $LOGS[$IP]
		);
	}
	
}

echo json_encode($RES);

?>

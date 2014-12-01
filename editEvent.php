<?php
include_once('database.php');
header("Content-Type: application/json");
session_start();
ini_set("session.cookie_httponly", 1);
$username = $_SESSION['user'];
$eventname = mysql_real_escape_string( htmlentities ($_POST["eventname"] ));
$day = mysql_real_escape_string( htmlentities ($_POST["day"] ));
$start_time = mysql_real_escape_string( htmlentities ($_POST["startTime"] ));
$end_time = mysql_real_escape_string( htmlentities ($_POST["endTime"] ));

$sql = "UPDATE events SET start_time='$start_time', end_time='$end_time' WHERE username='$username' AND date='$day' AND title='$eventname'";
    
    $result = mysql_query($sql);
    
    if( $result ) {
        
        echo json_encode(array(
            "eventModified" => true,
            "user" => $_SESSION['user'],
	    "eventname" => $eventname

	));
	exit();
    } else {
	echo json_encode(array(
            "eventModified" => false,
	    "message" => "Fail to change event time. Please check whether the event is existed on the date you pick."
	));
	exit();
    }

?>
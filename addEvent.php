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

$sql = "INSERT INTO events (username, title, date, start_time, end_time) VALUES('$username', '$eventname', '$day', '$start_time', '$end_time');";
    
    $result = mysql_query($sql);
    
    if( $result ) {
        
        echo json_encode(array(
            "eventAdded" => true,
            "user" => $_SESSION['user'],
	    "eventname" => $eventname

	));
	exit();
    } else {
	echo json_encode(array(
            "eventAdded" => false,
	    "message" => "Event creation failed!"
	));
	exit();
    }

?>
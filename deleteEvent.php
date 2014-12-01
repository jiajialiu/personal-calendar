<?php
include_once('database.php');
header("Content-Type: application/json");
session_start();
ini_set("session.cookie_httponly", 1);
$username = $_SESSION['user'];
$eventname = mysql_real_escape_string( htmlentities ($_POST["eventname"] ));
$day = mysql_real_escape_string( htmlentities ($_POST["day"] ));

$sql = "DELETE FROM events WHERE username='$username' AND date='$day' AND title='$eventname'";
    
    $result = mysql_query($sql);
    
    if( $result ) {
        
        echo json_encode(array(
            "eventDelete" => true,
            "user" => $_SESSION['user'],
	    "eventname" => $eventname

	));
	exit();
    } else {
	echo json_encode(array(
            "eventModified" => false,
	    "message" => "Fail to delete event."
	));
	exit();
    }

?>
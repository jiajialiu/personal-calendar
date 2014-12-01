<?php
include_once('database.php');
header("Content-Type: application/json");
session_start();
ini_set("session.cookie_httponly", 1);
$username = $_SESSION['user'];
$day = mysql_real_escape_string( htmlentities ($_POST["day"]));

$sql = "select title, start_time, end_time FROM events WHERE (username='$username' AND date='$day')";
$result = mysql_query($sql);
$events=array();
while($p=mysql_fetch_array($result)){
    $events[]=$p;
}
    if($events!=null) {
        echo json_encode(array(
            "eventExisted" => true,
            "user" => $_SESSION['user'],
	    "events" => $events

	));
	exit();
    } else {
	echo json_encode(array(
            "eventExisted" => false,
	    "events" => $events
	));
	exit();
    }

?>
<?php
include_once('database.php');
header("Content-Type: application/json");
session_start();
ini_set("session.cookie_httponly", 1);
$username = $_SESSION['user'];
$start_day = mysql_real_escape_string( htmlentities ($_POST["start_day"]));
$end_day = mysql_real_escape_string( htmlentities ($_POST["end_day"]));
$sql = "select distinct date FROM events WHERE (username='$username' AND date>='$start_day' AND date<='$end_day')";
$result = mysql_query($sql);
$dates=array();
while($p=mysql_fetch_array($result)){
    $dates[]=$p[0];
}
    if($dates!=null) {
        echo json_encode(array(
            "user" => $_SESSION['user'],
	    "dates" => $dates

	));
	exit();
    } else {
	echo json_encode(array(
	    "dates" => $dates
	));
	exit();
    }

?>
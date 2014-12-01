<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="calendar.css" />
    <link href="jquery-ui.css" type="text/css" rel="Stylesheet" />
    <script src="//cdn.sencha.io/ext-4.2.0-gpl/ext.js"></script>    
    <script src="jquery.min.js"></script>
    <script src="jquery-ui.min.js"></script>
    <script type="text/javascript" src="login.js"></script>
    <script type="text/javascript" src="calendarHelper.js"></script>
    <script type="text/javascript" src="calendar.js"></script>
    <title>My Calendar</title>
</head>

<body>
    
    <h2>Personal Calendar</h2>
<?php

session_start();
include_once('database.php');
?>

<div id="login" class="login" >
    <h3>Return user:</h3> 
    <label>Username:</label>
    <input id="username" type="text" name="username" ><br/>
    <label>Password:</label>
    <input id="password" type="password" name="password"><br/>
    <button id="login_btn">login</button><br/>
    <h3>New user:</h3>
    <button id="signUp_btn">click here to register</button><br/>
</div>

<div id="signUp" class="login" >    
    <label>Username:</label>
    <input id="reg_username" type="text" name="username" ><br/>
    <label>Password:</label>
    <input id="reg_password" type="password" name="password"><br/>
    <label>Email Address:</label>
    <input id="reg_email" type="text" name="email"><br/>
    <button id="reg_btn">register</button><br/>
</div>
  
<div id="loginMessage" class="login"></div>

<div class="welcome" id="welcome">
    <div id="usertag">You have not signed in yet!</div>
    <button id="logout_btn">logout</button>
</div>

<div id="event" class="addevent">
    <div id="existingEvents"></div>
    <h3 id="eventdate">Add Event:</h3>
    <label>Event:</label>
    <input id="event_name" type="text" name="eventname" ><br/>
    <input type="hidden" id="day" value="">
    <label>From(hh:mm):</label>
    <input id="start_time" type="text" name="start_time" ><br/>
    <label>To(hh:mm):</label>
    <input id="end_time" type="text" name="end_time" ><br/> 
    <input type="hidden" id="token" name="token" value="<?php echo $_SESSION['token'];?>" />
    <button id="new_event_btn">Create</button>
    <button id="edit_event_btn">Edit</button>
    <button id="delete_event_btn">Delete</button><br/>
    <button id="hide_btn">Hide Event bar</button><br/>
</div>
<div id="showDate"></div>
<div id="t"></div>
<p id="testMessege"></p>
<div id="calendar">
    <br/>
    <button id="prev_month_btn"><</button>
    <span id="currentMonth"></span>
    <button id="next_month_btn">></button>
    <br/><br/>
    <table id="calendarTable" class="calendar">
        <tr>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
        </tr>
	<tr class="week0">
		<td class="day0"></td>
		<td class="day1"></td>
		<td class="day2"></td>
		<td class="day3"></td>
		<td class="day4"></td>
		<td class="day5"></td>
		<td class="day6"></td>
	</tr>
	<tr class="week1">
		<td class="day0"></td>
		<td class="day1"></td>
		<td class="day2"></td>
		<td class="day3"></td>
		<td class="day4"></td>
		<td class="day5"></td>
		<td class="day6"></td>
	</tr>
	<tr class="week2">
		<td class="day0"></td>
		<td class="day1"></td>
		<td class="day2"></td>
		<td class="day3"></td>
		<td class="day4"></td>
		<td class="day5"></td>
		<td class="day6"></td>
	</tr>
	<tr class="week3">
		<td class="day0"></td>
		<td class="day1"></td>
		<td class="day2"></td>
		<td class="day3"></td>
		<td class="day4"></td>
		<td class="day5"></td>
		<td class="day6"></td>
	</tr>
	<tr class="week4">
		<td class="day0"></td>
		<td class="day1"></td>
		<td class="day2"></td>
		<td class="day3"></td>
		<td class="day4"></td>
		<td class="day5"></td>
		<td class="day6"></td>
	</tr>
        <tr class="week5">
		<td class="day0"></td>
		<td class="day1"></td>
		<td class="day2"></td>
		<td class="day3"></td>
		<td class="day4"></td>
		<td class="day5"></td>
		<td class="day6"></td>
	</tr>
</table>

<div id="edit-event-dialog-form" title="view Events" style="display:none;">
</div>

<script>
    //Hide elements immediately to avoid blinking on page-load
    $("#login").hide();
    $("#signUp").hide();
    $("#welcome").hide();
    $("#calendar").hide();
    $("#event").hide();
    $("#showDate").hide();
</script>
</body>
</html>
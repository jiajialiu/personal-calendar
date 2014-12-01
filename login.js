$(document).ready(function(){
    $("#login_btn").click(loginAjax);
    $("#logout_btn").click(logoutAjax);
    $("#reg_btn").click(registerAjax);
    checkStatusAjax();
    $("#signUp_btn").click(function(){
	$("#login").hide();
	$("#signUp").show();
    });
});

function checkStatusAjax(event) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "checkStatus.php",true);
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", checkStatusCallback, false);
    xmlHttp.send(null);
}

function checkStatusCallback(event) {
	var jsonData = JSON.parse(event.target.responseText);
	if (jsonData.isLoggedIn) {
	    //Hide login and signup, show welcome and calendar
	    $("#login").hide();
	    $("#signUp").hide();
	    $("#welcome").show();
	    $("#usertag").html("Welcome, " + jsonData.user+"!");
	    $("#calendar").show();
	} else {
	    //Show login, hide signup, welcome and calendar, 
	    $("#login").show();
	    $("#signUp").hide();
	    $("#welcome").hide();
	    $("#calendar").hide();
	}
}


function loginAjax(event){
	var username = $("#username").val(); 
        var password = $("#password").val();  
 
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
 
	var xmlHttp=new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST","login.php",true); 
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
        xmlHttp.send(dataString); // Send the data
        xmlHttp.addEventListener("load",loginCallback,false);
        
        //Clear the fields
        $("#username").val("");
        $("#password").val("");

}

function loginCallback(event) {
    var jsonData = JSON.parse(event.target.responseText); 
    if (jsonData.success){
//hide login and signup, show welcome and calendar, 
        $("#login").hide();
	$("#signUp").hide();
        $("#welcome").show();
        $("#usertag").html("Welcome, " + jsonData.user + "!");
	$("#calendar").show();
	$("#event").hide();
	$("#loginMessage").html("");
	updateCalendar();
    }else{
       $("#loginMessage").html(jsonData.message);
    }
}

function logoutAjax(event) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "logout.php",true);
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", logoutCallback, false);
    xmlHttp.send(null);
}

function logoutCallback(event) {
	$("#login").show();
        $("#signUp").hide();
	$("#welcome").hide();
        $("#calendar").hide();
	$("#event").hide();
	$("#testMessege").html("");
}


function registerAjax(event){
	var username = $("#reg_username").val(); // Get the username from the form
	var password = $("#reg_password").val(); // Get the password from the form
        var email = $("#reg_email").val(); // Get the password from the form
 
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password) + "&email=" + encodeURIComponent(email);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "register.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xmlHttp.send(dataString); // Send the data
        xmlHttp.addEventListener("load", registerCallback, false);
        
        //Clear the fields
        $("#reg_username").val("");
        $("#reg_password").val("");
        $("#reg_email").val("");

}


function registerCallback(event) {
    var jsonData = JSON.parse(event.target.responseText); 
    if (jsonData.success){
//hide login and signup, show welcome and calendar, 
        $("#login").hide();
	$("#signUp").hide();
        $("#welcome").show();
        $("#usertag").html("Welcome " + jsonData.user);
	$("#event").hide();
        $("#calendar").show();
	$("#loginMessage").html("");
	updateCalendar();
    }else{
       $("#loginMessage").html(jsonData.message);
    }
}
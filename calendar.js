var d=new Date();
var currentMonth=new Month(d.getFullYear(),d.getMonth());
var selectedCell=null;
$(document).ready(function(){
    updateCalendar();
    document.getElementById("existingEvents").innerHTML="";
    $("#next_month_btn").click(function(){
        currentMonth=currentMonth.nextMonth();
        updateCalendar();
        console.log("The new month is "+currentMonth.month+" "+currentMonth.year);
    });
    $("#prev_month_btn").click(function(){
	currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	console.log("The new month is "+currentMonth.month+" "+currentMonth.year);
    });
    $('#calendar td').mouseover(function(){
	$(this).addClass('hover');
	selectedCell = $(this);
    });    
    $('#calendar td').mouseout(function(){
	$(this).removeClass('hover');
	selectedCell = null;
    });   
    $("#new_event_btn").click(addEventAjax);
    $("#edit_event_btn").click(editEventAjax);
    $("#delete_event_btn").click(deleteEventAjax);
    $("#hide_btn").click(function(){
	$("#event").hide();
        $("#day").val("");
	document.getElementById("existingEvents").innerHTML = "";
    });
});

function updateCalendar(){
    $("#currentMonth").html(monthToString(currentMonth.month) + " " + currentMonth.year);
    console.log(currentMonth);
    var weeks = currentMonth.getWeeks();

    //for(var w in weeks){
	//var days = weeks[w].getDates();
	//for(var d in days){
	    //console.log(Date(days[d]));
	    //$(".week" + w).find(".day"+d).html(days[d].getDate());
	    
	    //$(".week" + w).find(".day"+d).click(function() {
		//var year=currentMonth.year;
                //var month=currentMonth.month+1;
                //var current_week=$(this).parent().attr("class");
                //var current_date=$(this).html();
                //if (current_week=="week0"&&current_date>10) {
                    //month=month-1;
                   //if (month==0) {
                        //month=12;
                        //year=year-1;
                    //}
               //}
                //if ((current_week=="week4"||current_week=="week5")&&current_date<20) {
                    //month=month+1;
                    //if (month==13) {
                        //month=1;
                        //year=year+1;
                    //}
                //}
                //var today = year + "-" + month + "-" + current_date;
                //document.getElementById("day").setAttribute('value', today);
                //fetchEventsAjax();
                //$("#eventdate").html("Add/Edit/Delete Event on "+today);
		//$("#event").show();
                //showDialog();
		//console.log(day.value);
            //});
	//}
    //}

    //var table_startdate=$(".week0").find(".day0").html();
    var table_startdate=weeks[0].sunday.getDate();
    var table_enddate=weeks[5].sunday.deltaDays(6).getDate();
    //var table_enddate=$(".week5").find(".day6").html();
    var table_monthS=currentMonth.month+1;
    var table_yearS=currentMonth.year;
    var table_monthE=currentMonth.month+1;
    var table_yearE=currentMonth.year;
    if (table_startdate>10) {
	table_monthS=table_monthS-1;
	if (table_monthS==0) {
	    table_monthS=12;
            table_yearS=table_yearS-1;
        }
    }
    var start_day=table_yearS + "-" + table_monthS + "-" + table_startdate;
    if (table_enddate<20) {
	table_monthE=table_monthE+1;
	if (table_monthE==13) {
	    table_monthE=1;
            table_yearE=table_yearE+1;
        }
    }
    var end_day=table_yearE + "-" + table_monthE + "-" + table_enddate;
    fetchDatetsWithEventAjax(start_day,end_day); 
}

function addEventAjax(event){
	var eventname = $("#event_name").val();
	var startTime = document.getElementById("start_time").value;
	var endTime = document.getElementById("end_time").value;
	var day = document.getElementById("day").value;
	// Make a URL-encoded string for passing POST data:
	var dataString = "eventname=" + encodeURIComponent(eventname) + "&day=" + encodeURIComponent(day) + "&startTime=" + encodeURIComponent(startTime)+ "&endTime=" + encodeURIComponent(endTime);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "addEvent.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xmlHttp.send(dataString); // Send the data
        xmlHttp.addEventListener("load", addEventCallback, false);

	$("#event_name").val("");
        $("#start_time").val("");
        $("#end_time").val("");
	$("#day").val("");
}

function addEventCallback(event) {
    var jsonData = JSON.parse(event.target.responseText); 
    if(jsonData.eventAdded){       
	$("#testMessege").html("Event added uccessfully!");
	$("#event").hide();
        
    }else{
        $("#testMessage").html(jsonData.message);
    }
}

function editEventAjax(event){
	var eventname = $("#event_name").val();
	var startTime = document.getElementById("start_time").value;
	var endTime = document.getElementById("end_time").value;
	var day = document.getElementById("day").value;
	// Make a URL-encoded string for passing POST data:
	var dataString = "eventname=" + encodeURIComponent(eventname) + "&day=" + encodeURIComponent(day) + "&startTime=" + encodeURIComponent(startTime)+ "&endTime=" + encodeURIComponent(endTime);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "editEvent.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xmlHttp.send(dataString); // Send the data
        xmlHttp.addEventListener("load", editEventCallback, false);

	$("#event_name").val("");
        $("#start_time").val("");
        $("#end_time").val("");
	$("#day").val("");
}

function editEventCallback(event) {
    var jsonData = JSON.parse(event.target.responseText); 
    if(jsonData.eventModified){       
	$("#testMessege").html("Event modified successfully!");
	$("#event").hide();
        
    }else{
        $("#testMessage").html(jsonData.message);
    }
}

function deleteEventAjax(event){
	var eventname = $("#event_name").val();
	var day = document.getElementById("day").value;
	// Make a URL-encoded string for passing POST data:
	var dataString = "eventname=" + encodeURIComponent(eventname) + "&day=" + encodeURIComponent(day);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "deleteEvent.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xmlHttp.send(dataString); // Send the data
        xmlHttp.addEventListener("load", deleteEventCallback, false);

	$("#event_name").val("");
        $("#start_time").val("");
        $("#end_time").val("");
	$("#day").val("");
}

function deleteEventCallback(event) {
    var jsonData = JSON.parse(event.target.responseText); 
    if(jsonData.eventDelete){       
	$("#testMessege").html("Event has been removed from your calendar.");
	$("#event").hide();
    }else{
        $("#testMessage").html(jsonData.message);
    }
}

function fetchEventsAjax(event){
	var day = document.getElementById("day").value;
	// Make a URL-encoded string for passing POST data:
	var dataString = "&day=" + encodeURIComponent(day);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "fetchEvents.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xmlHttp.send(dataString); // Send the data
        xmlHttp.addEventListener("load", fetchEventsCallback, false);
}

function fetchEventsCallback(event) {
    var jsonData = JSON.parse(event.target.responseText);
    //var eventsParent = document.getElementById("existingEvents");
    var eventsParent = document.getElementById("edit-event-dialog-form");
    eventsParent.innerHTML = "";
    
    if(jsonData.eventExisted){
	var events = jsonData.events;
	for(var i in events) {
	    var title = events[i].title;
	    var start_time = events[i].start_time;
            var end_time = events[i].end_time;
	    eventsParent.innerHTML += "<p>Event: " + title + "</p>";
            eventsParent.innerHTML += "<p>From: " + start_time + " to: " + end_time + "</p>"+"<br/>";
	}
    console.log(events);    
    }else{
        eventsParent.innerHTML += "No events today";
	console.log(jsonData);
    }
}

function fetchDatetsWithEventAjax(start_day,end_day){
	// Make a URL-encoded string for passing POST data:
	var dataString = "&start_day=" + encodeURIComponent(start_day) + "&end_day=" + encodeURIComponent(end_day);

	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "fetchDates.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xmlHttp.send(dataString); // Send the data
        xmlHttp.addEventListener("load", fetchDatesWithEventCallback, false);
}

function fetchDatesWithEventCallback(event) {
    var jsonData = JSON.parse(event.target.responseText);
    //var eventsParent = document.getElementById("showDate");
    //eventsParent.innerHTML = "";
    var dates = jsonData.dates;
    //for(var i in dates) {
	//if (i==0) {
	    //eventsParent.innerHTML += "<p>Your have events on:</p>";
	//}
	//var date = dates[i];
	//eventsParent.innerHTML += "<p>Date: " + date + "</p>";
    //}
    //$("#showDate").show();
    initializeCalendar(dates);
}

function initializeCalendar(dates) {
    var weeks = currentMonth.getWeeks();
    //var eventsParent = document.getElementById("showDate");
    
    for(var w in weeks){
	var days = weeks[w].getDates();
	for(var d in days){
	    $(".week" + w).find(".day"+d).removeClass("haveEvents");
	    var month=days[d].getMonth()+1;
	    if (month<10) {
		month="0"+month;
	    }
	    var day=days[d].getDate();
	    if (day<10) {
		day="0"+day;
	    }
	    var today= (days[d].getFullYear())+"-"+month+"-"+day;
	    if (dates.indexOf(today)!=-1) {
		$(".week" + w).find(".day"+d).addClass("haveEvents");
	    }
	    console.log(Date(days[d]));
	    $(".week" + w).find(".day"+d).html(days[d].getDate());
	    
	    $(".week" + w).find(".day"+d).click(function() {
		var year=currentMonth.year;
                var month=currentMonth.month+1;
                var current_week=$(this).parent().attr("class");
                var current_date=$(this).html();
                if (current_week=="week0"&&current_date>10) {
                    month=month-1;
                   if (month==0) {
                        month=12;
                        year=year-1;
                    }
                }
                if ((current_week=="week4"||current_week=="week5")&&current_date<20) {
                    month=month+1;
                    if (month==13) {
                        month=1;
                        year=year+1;
                    }
                }
                var today = year + "-" + month + "-" + current_date;
                document.getElementById("day").setAttribute('value', today);
                fetchEventsAjax();
                $("#eventdate").html("Add/Edit/Delete Event on "+today);
		$("#event").show();
                showDialog();
		console.log(day.value);
            });
	}
    }
}

function showDialog() {
    $("#edit-event-dialog-form").dialog({
	draggable: true,
	resizable: true,
	buttons: [ {
	    text: "Ok", click: function() {
		$( this ).dialog( "close" );
	    }
	} ]
    });
}

function monthToString(month) {
    switch(month) {
	case 0:
	  return "January";
	  break;
	case 1:
	  return "February";
	  break;
	case 2:
	  return "March";
	  break;
	case 3:
	  return "April";
	  break;
	case 4:
	  return "May";
	  break;
	case 5:
	  return "June";
	  break;
	case 6:
	  return "July";
	  break;
	case 7:
	  return "August";
	  break;
	case 8:
	  return "September";
	  break;
	case 9:
	  return "October";
	  break;
	case 10:
	  return "November";
	  break;
	case 11:
	  return "December";
	  break;
	default:
	  return "Unknown Month";
    }
}


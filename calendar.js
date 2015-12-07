//////////////////////////////
// INITIALIZING APPLICATION //
//////////////////////////////

// Initializing angular app, iSchoolCalendar.
var iSchoolCalendar = angular.module("iSchoolCalendar", []);

// Initializing Parse.
Parse.initialize("CIawsCOoro1K3GHQq4teHxwzDyRjE8MuUXauh4Sm", "Mrrvv6XeBDSA6kkWWSBzkmnjDeHNh406gn5INWaB");

// Initializing Event & User objects.
var Event = Parse.Object.extend("Event");
var User = Parse.Object.extend("User");

$(document).ready(function() {

    $("#listView").hide();
	console.log("Document ready.");

	// add-event-div and login-div are both initially hidden.
	$("#add-event-div").hide();
	$("#login-div").hide();
	console.log("Add Event <div> hidden.");

	// Initializing fullCalendar.
	$("#calendar").fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		eventClick: function( event, jsEvent, view ) { 
			alert('Event: ' + calEvent.title);
		},
		eventColor: "#603CA2",
		businessHours: false,
		editable: false

	});

	$("#calendar").hide();
	getEvents();
	$("#calendar").show();
		
});

///////////////////////////////////
// CALENDAR & LIST FUNCTIONALITY //
///////////////////////////////////

// Empties calendar and list; queries Parse for events.
var getEvents = function() {

	$("#calendar").fullCalendar("removeEvents");
	$("#eventList").empty();

	var query = new Parse.Query(Event);
	query.find({
		success:function(results) {
			addEvents(results);
		}
	});

}

// Loops through acquired events and adds events individually.
var addEvents = function(data) {

	for (i in data) {
		addEvent(data[i]);
	}

}


// Adds an event to the calendar and the list.
var addEvent = function(event) {
	var eventTitle = event.get("eventTitle");
	var startTime = event.get("startTime");
	var endTime = event.get("endTime");
	var eventDesc = event.get("eventDesc");

    $("#eventList").append("<li><div class='listed-event'><div class='event-title'><h3>" + eventTitle + "</h3></div><ul><li><em>Begins:</em> " + startTime + "</li><li><em>Ends:</em> " + endTime + "</li><li><p>" + eventDesc + "</p></li></ul></div></li>");
	var theEvent = {
		title: eventTitle,
		start: startTime,
		end: endTime,
		description: eventDesc
	};

	$("#calendar").fullCalendar("renderEvent", theEvent, true);

}

//////////////////////
// EVENT SUBMISSION //
//////////////////////

// Upon clicking "Submit," submitEvent parses input for the event and hawks it to the Parse
// database, so long as the input is valid.
var submitEvent = function() {

	$("#event-errors").hide();
	$("#event-errors").empty();

	var eventTitle = $("#newTitle").val();
	var url = $("#eventUrl").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var desc = $("#eventDesc").val();

	if (eventTitle === "" || startTime === "" || endTime === "" || desc === "") {

		var warning = "<li class='warning'>Error detected: PEBCAK. Please resolve:</li>";
		$("#event-errors").append(warning);
		if (eventTitle === "") {
			var error = "<li>You're missing an event title.</li>";
			$("#event-errors").append(error);
		}
		if (startTime === "") {
			var error = "<li>You're missing the start time of your event.</li>";
			$("#event-errors").append(error);
		}
		if (endTime === "") {
			var error = "<li>You're missing the end time of your event.</li>";
			$("#event-errors").append(error);
		}
		if (desc === "") {
			var error = "<li>You're missing a description of your event.</li>";
			$("#event-errors").append(error);
		}
		$("#event-errors").fadeIn(1000);

	} else {

		var anEvent = new Event();
		anEvent.set("eventTitle", eventTitle);
		anEvent.set("startTime", startTime);
		anEvent.set("endTime", endTime);
		anEvent.save(null, {
			success: function(anEvent) {
				$("#newTitle").empty();
				$("#eventUrl").empty();
				$("#startTime").empty();
				$("#endTime").empty();
				$("#eventDesc").empty();
			},
			error: function(anEvent, error) {
				alert("ERROR: " + error.message);
			}
		});

		getEvents();

	}

}

////////////////////////////
// USER SIGN UP & SIGN IN //
////////////////////////////

// signUp adds a newly created user to the Parse database.
var signUp = function() {

	var userEmail = $("#email").val();
	var userPswd = $("#userPswd").val();

}

// signIn queries the database for this user. If they exist, they're signed in and may now add
// events to the calendar.
var signIn = function() {

	var userEmail = $("#email").val();
	var userPswd = $("#userPswd").val();

}

////////////////
// AESTHETICS //
////////////////

// Shows the list; hides the calendar.
var showList = function() {

    $("#listView").show();
    $("#calendar").hide();

}

// Shows the calendar; hides the list.
var showCalendar = function() {

    $("#listView").hide();
    $("#calendar").show();

}

// Fades in the event form.
var revealEventForm = function() {

	$("#add-event-div").fadeIn(1000);

}

// Fades in the login form.
var revealLoginForm = function() {

	$("#login-div").fadeIn(1000);

}
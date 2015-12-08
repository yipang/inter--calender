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

	// Hiding divs for optimal experience.
    $("#listView").hide();
	$("#add-event-div").hide();
	$("#login-div").hide();

	// Initializing fullCalendar.
	$("#calendar").fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		eventClick: function( event, jsEvent, view ) { 
			$('#modalTitle').html(event.title);
            $('#modalBody').html("<p><b>Description</b>: " + event.description + "<p><b>Start Time</b>: " + Date.parse(event.start) + "</p>");
            $('#eventUrl').attr('href',event.url);
            $('#fullCalModal').modal();
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
	var eventUrl = event.get("eventUrl");
	var startTime = event.get("startTime");
	var endTime = event.get("endTime");
	var eventDesc = event.get("eventDesc");

	// Posting event to list view.
	if (eventUrl === "") {
		$("#eventList").append("<li><div class='listed-event'><div class='event-title'>" + eventUrl + "<h3>" + eventTitle + "</h3></div><ul><li><em>Begins:</em> " + startTime + "</li><li><em>Ends:</em> " + endTime + "</li><li><p>" + eventDesc + "</p></li></ul></div></li>");
	} else {
		$("#eventList").append("<li><div class='listed-event'><div class='event-title'><a href='" + eventUrl + "'><h3>" + eventTitle + "</h3></a></div><ul><li><em>Begins:</em> " + startTime + "</li><li><em>Ends:</em> " + endTime + "</li><li><p>" + eventDesc + "</p></li></ul></div></li>");
	}

	// Posting event to calendar.
	var theEvent = {
		title: eventTitle,
		start: startTime,
		end: endTime,
		description: eventDesc,
		url: eventUrl,
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
	var eventUrl = $("#eventUrl").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var eventDesc = $("#eventDesc").val();

	if (eventTitle === "" || startTime === "" || endTime === "" || eventDesc === "") {

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
		if (eventDesc === "") {
			var error = "<li>You're missing a description of your event.</li>";
			$("#event-errors").append(error);
		}
		$("#event-errors").fadeIn(1000);

	} else {

		var anEvent = new Event();
		anEvent.set("eventTitle", eventTitle);
		anEvent.set("eventUrl", eventUrl);
		anEvent.set("startTime", startTime);
		anEvent.set("endTime", endTime);
		anEvent.set("eventDesc", eventDesc)

		console.log(eventTitle + " " + eventUrl + " " + startTime + " " + endTime + " " + eventDesc);

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

	$("#login-errors").hide();
	$("#login-errors").empty();

	var userEmail = $("#email").val();
	var userPswd = $("#userPswd").val();

	// Sign up validation failure: error displayed.
	if (userEmail === "" || userPswd === "") {

		var warning = "<li class='warning'>You cannot create an account without:</li>";
		$("#login-errors").append(warning);
		if (userEmail === "") {
			var error = "<li>A valid email address.</li>";
			$("#login-errors").append(error);
		}
		if (userPswd === "") {
			var error = "<li>A password.</li>";
			$("#login-errors").append(error);
		}
		$("#login-errors").fadeIn(1000);

	// Sign up validation success: account created.
	} else {

		var newUser = new Parse.User();
		newUser.set("username", userEmail);
		newUser.set("password", userPassword);
		newUser.set("email", userEmail);
		user.set("email", "email@example.com");

		user.signUp(null, {
		  success: function(newUser) {
		    
		  },
		  error: function(newUser, error) {
		    alert("ERROR: " + error.code + " " + error.message);
		  }
		});
		
	}

}

// signIn queries the database for this user. If they exist, they're signed in and may now add
// events to the calendar.
var signIn = function() {

	var userEmail = $("#email").val();
	var userPswd = $("#userPswd").val();

}

/////////////////////
// USER EXPERIENCE //
/////////////////////

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
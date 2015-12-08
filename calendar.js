//////////////////////////////
// INITIALIZING APPLICATION //
//////////////////////////////

// Initializing angular app, iSchoolCalendar.
var iSchoolCalendar = angular.module("iSchoolCalendar", []);

// Initializing Parse.
Parse.initialize("CIawsCOoro1K3GHQq4teHxwzDyRjE8MuUXauh4Sm", "Mrrvv6XeBDSA6kkWWSBzkmnjDeHNh406gn5INWaB");

// Initializing Event object.
var Event = Parse.Object.extend("Event");

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
		eventClick: function(event, jsEvent, view) { 
			$(".modalTitle").html(event.title);
            $(".modalBody").html("<p><b>Start Time:</b> " + Date.parse(event.start) + "</p><p><b>Description</b>: " + event.description);
            $(".eventUrl").attr("href",event.url);
            $("#fullCalModal").modal();
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
	var startMonth = event.get("startMonth");
	var startDay = event.get("startDay");
	var startYear = event.get("startYear");
	var startHour = event.get("startHour");
	var startMinute = event.get("startMinute");
	var startChrono = event.get("startChrono");
	var startTotal = event.get("startTotal");
	var endMonth = event.get("endMonth");
	var endDay = event.get("endDay");
	var endYear = event.get("endYear");
	var endHour = event.get("endHour");
	var endMinute = event.get("endMinute");
	var endChrono = event.get("endChrono");
	var endTotal = event.get("endTotal");
	var eventLocation = event.get("eventLocation");
	var eventDesc = event.get("eventDesc");

	// Posting event to list view.
	if (eventUrl === "") {
		if (eventLocation === "") {
			$("#eventList").append("<li><div class='listed-event'><div class='event-title'><h3>" + eventTitle + "</h3></div><ul><li><em>Begins:</em> " + startMonth + " " + startDay + ", " + startYear + " - " + startHour + ":" + startMinute + " " + startChrono + "</li><li><em>Ends:</em> " + endMonth + " " + endDay + ", " + endYear + " - " + endHour + ":" + endMinute + " " + endChrono + "</li><li><p>" + eventDesc + "</p></li></ul></div></li>");
		} else {
			$("#eventList").append("<li><div class='listed-event'><div class='event-title'><h3>" + eventTitle + "</h3></div><ul><li><em>Location:</em> " + eventLocation + "</li><li><em>Begins:</em> " + startMonth + " " + startDay + ", " + startYear + " - " + startHour + ":" + startMinute + " " + startChrono + "</li><li><em>Ends:</em> " + endMonth + " " + endDay + ", " + endYear + " - " + endHour + ":" + endMinute + " " + endChrono + "</li><li><p>" + eventDesc + "</p></li></ul></div></li>");
		}
	} else {
		if (eventLocation === "") {
			$("#eventList").append("<li><div class='listed-event'><div class='event-title'><a href='" + eventUrl + "'><h3>" + eventTitle + "</h3></a></div><ul><li><em>Begins:</em> " + startMonth + " " + startDay + ", " + startYear + " - " + startHour + ":" + startMinute + " " + startChrono + "</li><li><em>Ends:</em> " + endMonth + " " + endDay + ", " + endYear + " - " + endHour + ":" + endMinute + " " + endChrono + "</li><li><p>" + eventDesc + "</p></li></ul></div></li>");
		} else {
			$("#eventList").append("<li><div class='listed-event'><div class='event-title'><a href='" + eventUrl + "'><h3>" + eventTitle + "</h3></a></div><ul><li><em>Location:</em> " + eventLocation + "</li><li><em>Begins:</em> " + startMonth + " " + startDay + ", " + startYear + " - " + startHour + ":" + startMinute + " " + startChrono + "</li><li><em>Ends:</em> " + endMonth + " " + endDay + ", " + endYear + " - " + endHour + ":" + endMinute + " " + endChrono + "</li><li><p>" + eventDesc + "</p></li></ul></div></li>");
		}
	}

	// Posting event to calendar.
	var theEvent = {
		title: eventTitle,
		start: startTotal,
		end: endTotal,
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
	$("#event-success").hide();
	$("#event-success").empty();

	var eventTitle = $("#newTitle").val();
	var eventUrl = $("#eventUrl").val();

	var startMonth = $("#startMonth").val();
	var startDay = $("#startDay").val();
	var startYear = $("#startYear").val();
	var startHour = $("#startHour").val();
	var startMinute = $("#startMinute").val();
	var startChrono = $("#startChrono").val();
	var startTime = (startMonth + " " + startDay + ", " + startYear + " " + startHour + ":" + startMinute + " " + startChrono);

	var endMonth = $("#endMonth").val();
	var endDay = $("#endDay").val();
	var endYear = $("#endYear").val();
	var endHour = $("#endHour").val();
	var endMinute = $("#endMinute").val();
	var endChrono = $("#endChrono").val();
	var endTime = (endMonth + " " + endDay + ", " + endYear + " " + endHour + ":" + endMinute + " " + endChrono);

	var eventLocation = $("#eventLocation").val();
	var eventDesc = $("#eventDesc").val();

	if (eventTitle === "" || eventDesc === "") {

		var warning = "<li class='warning'>Error detected: PEBCAK. Please resolve:</li>";
		$("#event-errors").append(warning);
		if (eventTitle === "") {
			var error = "<li>You're missing an event title.</li>";
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
		anEvent.set("startMonth", startMonth);
		anEvent.set("startDay", startDay);
		anEvent.set("startYear", startYear);
		anEvent.set("startHour", startHour);
		anEvent.set("startMinute", startMinute);
		anEvent.set("startChrono", startChrono);
		anEvent.set("startTotal", startTime);
		anEvent.set("endMonth", endMonth);
		anEvent.set("endDay", endDay);
		anEvent.set("endYear", endYear);
		anEvent.set("endHour", endHour);
		anEvent.set("endMinute", endMinute);
		anEvent.set("endChrono", endChrono)
		anEvent.set("endTotal", endTime);
		anEvent.set("eventLocation", eventLocation);
		anEvent.set("eventDesc", eventDesc);

		anEvent.save(null, {
			success: function(anEvent) {
				var success = "<li class='success-declare'>Event submitted!</li>";
				$("#event-success").append(success);
				var successDetails = (eventTitle + " begins on " + startMonth + " " + startDay + ", " + startYear + " at " + startHour + ":" + startMinute + " " + startChrono + ".");
				$("#event-success").append(successDetails);
				$("#event-success").fadeIn(1000);
				$("#newTitle").val("");
				$("#eventUrl").val("");
				$("#eventLocation").val("");
				$("#eventDesc").val("");
			},
			error: function(anEvent, error) {
				alert("ERROR: " + error.message);
			}
		});

		getEvents();

	}

}

////////////////////////////
// USER SIGN UP & LOG IN  //
////////////////////////////

// signUp adds a newly created user to the Parse database.
var signUp = function() {

	$("#login-errors").hide();
	$("#login-errors").empty();
	$("#login-success").hide();
	$("#login-success").empty();

	var userEmail = $("#userEmail").val();
	var userPswd = $("#userPswd").val();

	// Sign up validation failure: error displayed.
	if (userEmail === "" || userPswd === "") {

		var warning = "<li class='warning'>You cannot create an account without:</li>";
		$("#login-errors").append(warning);
		if (userEmail === "") {
			var error = "<li>... a valid email address.</li>";
			$("#login-errors").append(error);
		}
		if (userPswd === "") {
			var error = "<li>... a password.</li>";
			$("#login-errors").append(error);
		}
		$("#login-errors").fadeIn(1000);

	// Sign up validation success: account created.
	} else {

		var newUser = new Parse.User();
		newUser.set("username", userEmail);
		newUser.set("password", userPswd);
		newUser.set("email", userEmail);

		newUser.signUp(null, {
			success: function(newUser) {
				var success = "<li class='success-declare'>Account created!</li>";
				$("#login-success").append(success);
				var successDetails = ("Check your email, " + userEmail + ", for verification.");
				$("#login-success").append(successDetails);
				$("#email").val("");
				$("#userPswd").val("");
			},
			error: function(newUser, error) {
				var warning = "<li class='warning'>Error code: " + error.code + ".</li>";
				$("#login-errors").append(warning);
				var parseError = "<li>" + error.message + "</li>";
				$("#login-errors").append(parseError);
				$("#login-errors").fadeIn(1000);
			}
		});
		
	}

}

// logIn queries the database for this user. If they exist, they're signed in and may now add
// events to the calendar.
var logIn = function() {

	$("#login-errors").hide();
	$("#login-errors").empty();
	$("#login-success").hide();
	$("#login-success").empty();

	var userEmail = $("#userEmail").val();
	var userPswd = $("#userPswd").val();

	if (userEmail === "" || userPswd === "") {

		var warning = "<li class='warning'>You cannot log in without:</li>";
		$("#login-errors").append(warning);
		if (userEmail === "") {
			var error = "<li>... a valid email address.</li>";
			$("#login-errors").append(error);
		}
		if (userPswd === "") {
			var error = "<li>... a password.</li>";
			$("#login-errors").append(error);
		}
		$("#login-errors").fadeIn(1000);

	} else {

		Parse.User.logIn(userEmail, userPswd, {
			success: function(user) {
				var success = "<li class='success-declare'>You're now logged in, " + userEmail + "!</li>";
			},
			error: function(user, error) {
				var warning = "<li class='warning'>Error code: " + error.code + ".</li>";
				$("#login-errors").append(warning);
				var parseError = "<li>" + error.message + ".</li>";
				$("#login-errors").append(parseError);
				$("#login-errors").fadeIn(1000);
			}
		});

	}

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
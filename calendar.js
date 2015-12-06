var iSchoolCalendar = angular.module("iSchoolCalendar", []);

// Initializing Parse.
Parse.initialize("CIawsCOoro1K3GHQq4teHxwzDyRjE8MuUXauh4Sm", "Mrrvv6XeBDSA6kkWWSBzkmnjDeHNh406gn5INWaB");

var Event = Parse.Object.extend("Event");
var User = Parse.Object.extend("User");

$(document).ready(function() {

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
		businessHours: false,
		editable: false
	});

	$("#calendar").hide();

	getEvents();

	$("#calendar").show();
		
});

var signUp = function() {
	
}

// Empties calendar; queries Parse for events.
var getEvents = function() {

	$("#calendar").fullCalendar("removeEvents");
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

// Adds an event to the calendar.
var addEvent = function(event) {
	var eventTitle = event.get("eventTitle");
	var startTime = event.get("startTime");
	var endTime = event.get("endTime");

	var theEvent = {
		title: eventTitle,
		start: startTime,
		end: endTime
	};

	$("#calendar").fullCalendar("renderEvent", theEvent, true);

}

// Fades in the event form.
var revealEventForm = function() {

	$("#add-event-div").fadeIn(1000);

}

// Fades in the login form.
var revealLoginForm = function() {

	$("#login-div").fadeIn(1000);

}

// Upon clicking "Add Event," addEvent.
var submitEvent = function() {

	var eventTitle = $("#newTitle").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();

	var anEvent = new Event();
	anEvent.set("eventTitle", eventTitle);
	anEvent.set("startTime", startTime);
	anEvent.set("endTime", endTime);
	anEvent.save(null, {
		success: function(anEvent) {
			$("#newTitle").empty();
			$("#startTime").empty();
			$("#endTime").empty();
		},
		error: function(anEvent, error) {
			alert("ERROR: " + error.message);
		}
	});

	getEvents();

}
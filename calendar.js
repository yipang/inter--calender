var iSchoolCalendar = angular.module("iSchoolCalendar", []);

$(document).ready(function() {

	console.log("Document ready.");

	// add-event-div is initially hidden. Only admin needs to use it.
	$("#add-event-div").hide();
	console.log("Add Event <div> hidden.");

	// Initialize calendar.
	$("#calendar").fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		businessHours: false, // does not emphasize business hours
		editable: true, //editable.  NEED TO CHANGE TO TRUE WHEN ORG LOGS IN
	});
	console.log("Calendar initialized.");

	fillCalendar();
		
});

// Fills the calendar with events grabbed from calendar.json.
var fillCalendar = function() {

	$("#calendar").fullCalendar({
    	events: "data/calendar.json"
	});
	console.log("Calendar filled.");

}

// Fades in the event form.
var revealEventForm = function() {

	$("#add-event-div").fadeIn(1000);

}

// Upon clicking "Add Event," addEvent.
var addEvent = function() {

	var eventTitle = $("newTitle").val();
	var startTime = $("startTime").val();
	var endTime = $("endTime").val();
	console.log("EVENT TITLE: " + eventTitle + ". START: " + endTime + ". END: " + endTime);

	// Somewhere here, validate that the info is good (properly formatted).

	// Somewhere here, hawk valid data to node.js; have node.js append it to calendar.json.

	// Else, reject input.

	// Calendar is refilled with new events.
	fillCalendar();

}


/*

MANUAL EVENT INPUT:

$('#calendar').fullCalendar({
	header: {
		left: 'prev,next today',
		center: 'title',
		right: 'month,agendaWeek,agendaDay'
	},
	businessHours: false, // does not emphasize business hours
	editable: true, //editable.  NEED TO CHANGE TO TRUE WHEN ORG LOGS IN
	events: [
		{
			title: 'Business Lunch',
			start: '2015-11-20T13:00:00',
			constraint: 'businessHours'
		},
		{
			title: 'Meeting',
			start: '2015-11-13T11:00:00',
			constraint: 'availableForMeeting', // defined below
			color: '#257e4a'
		},
		{
			title: 'Conference',
			start: '2015-11-18',
			end: '2015-02-20'
		},
		{
			title: 'Party',
			start: '2015-11-29T20:00:00'
		},
			// red areas where no events can be dropped
		{
			start: '2015-11-24',
			end: '2015-02-28',
			overlap: false,
			rendering: 'background',
			color: '#ff9f89'
		},
		{
			start: '2015-11-06',
			end: '2015-02-08',
			overlap: false,
			rendering: 'background',
			color: '#ff9f89'
		}
	]
});
*/
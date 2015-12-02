var myApp = angular.module('myApp', []);

$(document).ready(function() {

	// In theory, gets calendar.json data; displays in #calendar.
	$('#calendar').fullCalendar({
    	events: "data/calendar.json"
	});

	/*
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
		
});

// Upon clicking "Add Event," addEvent.
var addEvent = function() {

	var eventTitle = $("newTitle").val();
	var startTime = $("startTime").val();
	var endTime = $("endTime").val();

	// Somewhere here, validate that the info is good (properly formatted).

}


/* CONTROLLER (if needed).
myApp.controller("calendarController", function($scope, $http) {
	$http.get("data/events.json").then(function(response) {
		$scope.events = response.data;
		showEvents(events);
	})
});

// Reads events.json; 
var showEvents = function(events) {

}
*/
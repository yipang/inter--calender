//////////////////////////////
// INITIALIZING APPLICATION //
//////////////////////////////

// Initializing angular app, iSchoolCalendar.
var iSchoolCalendar = angular.module("iSchoolCalendar", []);

// Initializing Parse.
Parse.initialize("CIawsCOoro1K3GHQq4teHxwzDyRjE8MuUXauh4Sm", "Mrrvv6XeBDSA6kkWWSBzkmnjDeHNh406gn5INWaB");

// Initializing Event object.
var Event = Parse.Object.extend("Event");
var GoogEvent = Parse.Object.extend("GoogEvent");

// Checking if the user is logged in.
var currentUser = Parse.User.current();
// Acquiring userName.
/*
if (currentUser) {
    var userName = currentUser.get("username");
    var greeting = "Welcome, " + userName + "! You can now post events.";
    alert(greeting);
    $("#greeting-text").val(greeting);
} else {
    $("#greeting").append("Welcome to the iSchool Calendar. You're not logged in currently.");
}
*/

$(document).ready(function() {

    // Hiding divs for optimal experience.
    $("#listView").hide();
    $("#add-event-div").hide();
    $("#login-div").hide();
    $("#logout-button").hide();
    $("#add-event-button").hide();

    if (currentUser) {
        $("#logout-button").show();
        $("#add-event-button").show();
        $("#login-button").hide();
    }

    // Initializing fullCalendar.
    $("#calendar").fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        eventClick: function(event, jsEvent, view) {
            alert("clicked");
            $(".modalTitle").html(event.title);
            
            var startArr = event.start.toString().split(" ");
            var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
            var numMonth = monthArray.indexOf(startArr[1]) + 1;
            var season;

            if (numMonth == 1 || numMonth == 2 || numMonth == 12) {
                season = "winter";
            } else if (numMonth > 2 && numMonth < 6) {
                season = "spring";
            } else if (numMonth > 6 && numMonth < 9) {
                season = "summer";
            } else {
                season = "fall";
            }


            alert(season);
            $(".modalTitle").css("background-image", 'url("img/"' + season + '".jpg")');

            var startTimeArr = startArr[4].split(":");
            var startTime4dig = startTimeArr[0] + startTimeArr[1];
            var startTime = getFormattedTime(startTime4dig);
            var startDateText = startArr[0] + " " + startArr[1] + " " + startArr[2] + ", " + startArr[3] + " at " + startTime;
            if (event.end) {
            var endArr = event.end.toString().split(" ");
            var endTimeArr = endArr[4].split(":");
            var endTime4dig = endTimeArr[0] + endTimeArr[1];
            var endTime = getFormattedTime(endTime4dig);
            var endDateText = endArr[0] + " " + endArr[1] + " " + endArr[2] + ", " + endArr[3] + " at " + endTime;
            } else {
                endDateText = "End Date Not Specified"
            }
            
            $(".modalBody").html("<p><b>Start Time:</b> " + startDateText +"</p><p><b>End Time:</b> " + endDateText + "</p><p><b>Description</b>: " + event.description + "</p><p><a href= " + event.url + " target='_blank'>View Event Page</a></p>");

            $("#fullCalModal").modal();
            return false;
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

    if (currentUser) {
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

        var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var numMonthStart = monthArray.indexOf(startMonth) + 1;
        var numMonthEnd = monthArray.indexOf(endMonth) + 1;
        var season;

        if (numMonthStart == 1 || numMonthStart == 2 || numMonthStart == 12) {
            season = "winter";
        } else if (numMonthStart > 2 && numMonthStart < 6) {
            season = "spring";
        } else if (numMonthStart > 6 && numMonthStart < 9) {
            season = "summer";
        } else {
            season = "fall";
        }

        var startCNum;
        if (startChrono == "AM") {
            startCNum = 1;
        } else {
            startCNum = 2;
        }

        var startDayZero;
        if (startDay < 10) {
            startDayZero = "0" + startDay;
        } else {
            startDayZero = startDay;
        }

        var startMZero;
        if (numMonthStart < 10) {
            startMZero = "0" + numMonthStart;
        } else {
            startMZero = numMonthStart;
        }

        var startHZero;
        if (startHour < 10) {
            startHZero = "0" + startHour;
        } else {
            startHZero = startHour;
        }

        if (numMonthEnd == 1 || numMonthEnd == 2 || numMonthEnd == 12) {
            season = "winter";
        } else if (numMonthEnd > 2 && numMonthEnd < 6) {
            season = "spring";
        } else if (numMonthEnd > 6 && numMonthEnd < 9) {
            season = "summer";
        } else {
            season = "fall";
        }

        var endCNum;
        if (endChrono == "AM") {
            endCNum = 1;
        } else {
            endCNum = 2;
        }

        var endDayZero;
        if (endDay < 10) {
            endDayZero = "0" + endDay;
        } else {
            endDayZero = endDay;
        }

        var endMZero;
        if (numMonthEnd < 10) {
            endMZero = "0" + numMonthEnd;
        } else {
            endMZero = numMonthEnd;
        }

        var endHZero;
        if (endHour < 10) {
            endHZero = "0" + endHour;
        } else {
            endHZero = endHour;
        }

        var numericStartDate = startYear + "" + startMZero + "" + startDayZero + "" + startCNum + "" + startHZero + "" + startMinute;
        var numericEndDate = endYear + "" + endMZero + "" + endDayZero + "" + endCNum + "" + endHZero + "" + endMinute;

        if (eventTitle === "" || eventDesc === "" || parseInt(numericEndDate) <= parseInt(numericStartDate)) {

            var warning = "<li class='warning'>Error code: PEBCAK. Please resolve:</li>";
            $("#event-errors").append(warning);
            
            if (parseInt(numericEndDate) <= parseInt(numericStartDate)) {
                var error = "<li>You should make end time after the start time.</li>";
                $("#event-errors").append(error);
            }

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
            anEvent.set("numericStartDate", numericStartDate);
            anEvent.set("numericEndDate", numericEndDate);
            anEvent.set("season", season);

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
    } else {
        var warning = "<li>You must log in before submitting events.</li>"
        $("#event-errors").append(warning);
        $("#event-errors").fadeIn(1000);
    }

}

//////////////////////////////////////
// USER SIGN UP, LOG IN, & LOG OUT  //
//////////////////////////////////////

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
                var parseError = "<li>" + error.message + ".</li>";
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

    if (currentUser) {
        var warning = "<li>You're already logged in!</li>";
        $("#login-errors").append(warning);
        $("#login-errors").fadeIn(1000);
    } else {
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
                    $("#login-button").hide();
                    location.reload();
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

}

// Logs the user out and hides the log out button.
var logOut = function() {

    Parse.User.logOut();
    $("#logout-button").hide();
    $("#login-button").show();
    location.reload();

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
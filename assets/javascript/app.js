// Initialize Firebase
var config = {
    apiKey: "AIzaSyAiN03J8efV7X76-ts7ziYhaIJu8-mJmjk",
    authDomain: "traintime-c7988.firebaseapp.com",
    databaseURL: "https://traintime-c7988.firebaseio.com",
    projectId: "traintime-c7988",
    storageBucket: "",
    messagingSenderId: "564207673925"
};
  
firebase.initializeApp(config);

var database = firebase.database();


//  Displays todays date and time
var now = moment().format("MM/DD/YYYY hh:mm A");
$('#currentTime').text("Today is: " + now);

//  Click function for adding Train
$("#add-train").on("click", function(event) {

    //  Keeps form from submitting on click
    event.preventDefault();

    // Grabs user input
    var name = $("#train_name").val().trim();
    var destination = $("#destination").val().trim();
    var time = moment($("#train_time").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency").val().trim();

    //  Creating temporary object
    var newTrain = {
        newName: name,
        newDestination: destination,
        newTime: time,
        newFrequency: frequency
    };

    //  Upload data to the database
    database.ref().push(newTrain);

    //  Clear input from text boxes
    $("#train_name").val("");
    $("#destination").val("");
    $("#train_time").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var name = childSnapshot.val().newName;
    var destination = childSnapshot.val().newDestination;
    var time = childSnapshot.val().newTime;
    var frequency = childSnapshot.val().newFrequency;
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;

    // Minute Until Train
    var minutesAway = frequency - tRemainder;

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextArrival).format("hh:mm A");
    
    // Adding to table
    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCsZ9J0MPY5XA_PW_kkpKFuH71Tdgg1hHs",
    authDomain: "train-time-940a7.firebaseapp.com",
    databaseURL: "https://train-time-940a7.firebaseio.com",
    projectId: "train-time-940a7",
    storageBucket: "train-time-940a7.appspot.com",
    messagingSenderId: "710285382112"
  };
  
firebase.initializeApp(config);

var database = firebase.database();

//  Click function for adding Train
$("#add-train").on("click", function(event) {
    //  Keeps for from submitting on click
    event.preventDefault();
console.log("hey");
    // Grabs user input
    var name = $("#train_name").val().trim();
    var destination = $("#destination").val().trim();
    var time = moment($("#train_time").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency").val().trim();

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

    // var timeDisplay = moment.unix(time).format("HH:mm");

    // var tMinutes = moment().diff(moment(empStart, "X"), "months");

    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
    time + "</td><td>" + frequency + "</td><td>");
});
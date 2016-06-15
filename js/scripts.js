//Business Logic

//Set Global Variables
var runningTotal = 0;
var playerOne = 0;
var playerTwo = 0;
var playerOneTurn = true;

//Set Functions
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var checkIfOne = function(currentNumber){
  if (currentNumber === 1) {
    runningTotal = 0;
    $("#running-total").text(runningTotal);
    debugger;
    if(playerOneTurn){
      $("#player-one-total").text(playerOne);
      $("#player-two-score").addClass("highlight");
      $("#player-one-score").removeClass("highlight");
      playerOneTurn = false;
    } else {
      $("#player-two-total").text(playerTwo);
      $("#player-one-score").addClass("highlight");
      $("#player-two-score").removeClass("highlight");
      playerOneTurn = true;
    }

    // if (playerOneTurn) {
    //   !playerOneTurn;
    // } else if (!playerOneTurn) {
    //   playerOneTurn;
    // }
  }
};

//User Interface Logic
$(document).ready(function() {
  //Roll Button Functionality
  $("#roll-button").click(function() {
      var currentRoll = getRandomInt(1,7);
      $("#dice-number").text(currentRoll);
      checkIfOne(currentRoll);
      runningTotal += currentRoll;
      $("#running-total").text(runningTotal);
  });

  //Hold Button Functionality
  $("#hold-button").click (function(){
    if(playerOneTurn){
      playerOne += runningTotal;
      $("#player-one-total").text(playerOne);
      !playerOneTurn
      $("#player-two-score").addClass("highlight");
      $("#player-one-score").removeClass("highlight");
    } else {
      playerTwo += runningTotal;
      $("#player-two-total").text(playerTwo);
      playerOneTurn;
      $("#player-one-score").addClass("highlight");
      $("#player-two-score").removeClass("highlight");
    }
    runningTotal = 0;
    $("#running-total").text(runningTotal);
  });
});

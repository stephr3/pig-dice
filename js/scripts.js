//Business Logic///
//Set Global Variables
var Dice = {
  1:"img/dice_one.jpg",
  2:"img/dice_two.jpg",
  3:"img/dice_three.jpg",
  4:"img/dice_four.jpg",
  5:"img/dice_five.jpg",
  6:"img/dice_six.jpg"
}
var runningTotal = 0;
var playerOne = 0;
var playerTwo = 0;
var playerOneTurn = true;
var currentRoll;

//Set Functions
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var showDice = function(currentNumber) {
  if (currentNumber == 1) {
    $("#dice-roll").append("<img src=" + Dice.1 + ">")
  }
}
var checkIfOne = function(currentNumber){
  if (currentNumber === 1) {
    runningTotal = 0;
    $("#running-total").text(runningTotal);

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
  } else {
    runningTotal += currentRoll;

  }
};

//User Interface Logic
$(document).ready(function() {
  //Roll Button Functionality
  $("#roll-button").click(function() {
      currentRoll = getRandomInt(1,7);
      showDice(currentRoll);
      $("#dice-number").text(currentRoll);
      checkIfOne(currentRoll);
      $("#running-total").text(runningTotal);

  });

  //Hold Button Functionality
  $("#hold-button").click (function(){
    if(playerOneTurn){
      playerOne += runningTotal;
      $("#player-one-total").text(playerOne);
      $("#player-two-score").addClass("highlight");
      $("#player-one-score").removeClass("highlight");
      playerOneTurn = false;
    } else {
      playerTwo += runningTotal;
      $("#player-two-total").text(playerTwo);
      $("#player-one-score").addClass("highlight");
      $("#player-two-score").removeClass("highlight");
      playerOneTurn = true
    }
    runningTotal = 0;
    $("#running-total").text(runningTotal);
  });
});

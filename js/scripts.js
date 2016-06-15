//Business Logic///
//Set Global Variables
var Dice = {
  one:"img/dice_one.jpg",
  two:"img/dice_two.jpg",
  three:"img/dice_three.jpg",
  four:"img/dice_four.jpg",
  five:"img/dice_five.jpg",
  six:"img/dice_six.jpg"
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
  $("#dice-roll").empty();
  if (currentNumber === 1) {
    $("#dice-roll").append("<img class='dice-images' src=" + Dice.one + ">")
  } else if (currentNumber === 2) {
    $("#dice-roll").append("<img class='dice-images' src=" + Dice.two + ">")
  } else if (currentNumber === 3) {
    $("#dice-roll").append("<img class='dice-images' src=" + Dice.three + ">")
  } else if (currentNumber === 4) {
    $("#dice-roll").append("<img class='dice-images' src=" + Dice.four + ">")
  } else if (currentNumber === 5) {
    $("#dice-roll").append("<img class='dice-images' src=" + Dice.five + ">")
  } else if (currentNumber === 6) {
    $("#dice-roll").append("<img class='dice-images' src=" + Dice.six + ">")
  }
};

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

var declareWinner = function(playerOneScore, playerTwoScore) {
  if (playerOne >= 100) {
    alert("Winner PLAYER ONE");
    endGame();

  } else if (playerTwo >= 100) {
    alert("Winner PLAYER TWO!")
    endGame();
  }
};

var endGame = function () {
  runningTotal = 0;
  playerOne = 0;
  playerTwo = 0;
  $("#player-one-total").text(playerOne);
  $("#player-two-total").text(playerTwo);
};

//User Interface Logic
$(document).ready(function() {
  //Roll Button Functionality
  $("#roll-button").click(function() {
      currentRoll = getRandomInt(1,7);
      showDice(currentRoll);
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
    declareWinner(playerOne, playerTwo);
  });
});

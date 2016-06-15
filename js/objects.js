//Business Logic

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

//Set Object Constructor
function Player(currentRoll, runningTotal, totalScore, turn){
  this.currentRoll = currentRoll;
  this.runningTotal = runningTotal;
  this.totalScore = totalScore;
  this.turn = turn;
}

//Initialize Objects
var playerOne = new Player (0, 0, 0, true);

var playerTwo = new Player (0, 0, 0, false);

var Dice = {
  one:"img/dice_one.jpg",
  two:"img/dice_two.jpg",
  three:"img/dice_three.jpg",
  four:"img/dice_four.jpg",
  five:"img/dice_five.jpg",
  six:"img/dice_six.jpg"
};

//Set Prototypes
Player.prototype.checkIfOne = function () {
  if (this.currentRoll === 1) {
    this.runningTotal = 0;
    this.switch();
  } else {
    this.runningTotal += this.currentRoll;
  }
};

Player.prototype.hold = function () {
  this.totalScore += this.runningTotal;
  this.runningTotal = 0;
  this.switch();
};

Player.prototype.switch = function () {
  if (this === playerOne) {
    playerOne.turn = false;
    playerTwo.turn = true;
    $("#player-two-score").addClass("highlight");
    $("#player-one-score").removeClass("highlight");
  } else if (this === playerTwo) {
    playerTwo.turn = false;
    playerOne.turn = true;
    $("#player-one-score").addClass("highlight");
    $("#player-two-score").removeClass("highlight");
}
};

//User Interface Logic
$(document).ready(function() {
  //Roll Button Functionality
  $("#roll-button").click(function() {
    //Player One's Turn
    if (playerOne.turn) {
      playerOne.currentRoll = getRandomInt(1,7);
      showDice(playerOne.currentRoll);
      playerOne.checkIfOne();
      $("#running-total").text(playerOne.runningTotal);
      $("#player-one-total").text(playerOne.totalScore);
    //Player Two's Turn
    } else if (playerTwo.turn){
      playerTwo.currentRoll = getRandomInt(1,7);
      showDice(playerTwo.currentRoll);
      playerTwo.checkIfOne();
      $("#running-total").text(playerTwo.runningTotal);
      $("#player-two-total").text(playerTwo.totalScore);
    }
  });

  //Hold Button Functionality
  $("#hold-button").click (function(){
    if (playerOne.turn) {
      playerOne.hold();
      $("#player-one-total").text(playerOne.totalScore);
      $("#running-total").text(playerTwo.runningTotal);
    } else if (playerTwo.turn)
      playerTwo.hold();
      $("#player-two-total").text(playerTwo.totalScore);
      $("#running-total").text(playerOne.runningTotal);
  });
});

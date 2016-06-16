//Business Logic
var totalRolls = 0;
var computer =false;
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
function Player(playerName, currentRoll, runningTotal, totalScore, turn){
  this.playerName = playerName;
  this.currentRoll = currentRoll;
  this.runningTotal = runningTotal;
  this.totalScore = totalScore;
  this.turn = turn;
}

//Initialize Objects
var playerOne = new Player ("Player One", 0, 0, 0, true);

var playerTwo = new Player ("Player Two", 0, 0, 0, false);

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
    if (computer) {
      $("#hold-button").hide();
    }
  } else {
    this.runningTotal += this.currentRoll;
    if (this.runningTotal >= 15 && (computer = true)) {
      totalRolls++;
    }
  }
};
Player.prototype.hold = function () {
  this.totalScore += this.runningTotal;
  this.declareWinner();
  this.runningTotal = 0;
  this.switch();
  $("#hold-button").hide();
};
////computerhold//////
Player.prototype.computerPlay = function () {
  if (playerTwo.turn = true) {
  $("#hold-button").hide();
} else if (playerOne.turn) {
  $("#hold-button").show();
  }
  if (totalRolls < 2) {
    playerTwo.checkIfOne();
  } else {
    playerTwo.hold();
  }
}
Player.prototype.switch = function () {
  totalRolls = 0;
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
Player.prototype.declareWinner = function() {
  if (this.totalScore >= 100) {
    alert("Winner: " + this.playerName);
    endGame(playerOne, playerTwo);
  }
};
var endGame = function (one, two) {
  one.runningTotal = 0;
  one.totalScore = 0;
  two.runningTotal = 0;
  two.totalScore = 0;
  $("#player-one-total").text(one.totalScore);
  $("#player-two-total").text(two.totalScore);
};
//User Interface Logic
$(document).ready(function() {
  //Play the Computer Button Functionality
  $("#comp").click(function() {
    computer = true;
    $("#comp").hide();
    $("#friend").show();
    endGame(playerOne,playerTwo);
  });
  //Play a Friend Functionality
  $("#friend").click(function(){
    computer = false;
    $("#friend").hide();
    $("#comp").show();
    endGame(playerOne,playerTwo);
  });
  //Roll Button Functionality
  $("#roll-button").click(function() {
    $("#hold-button").show();
    console.log(totalRolls);
    //Player One's Turn
    // debugger;
    if (playerOne.turn) {
      playerOne.currentRoll = getRandomInt(1,7);
      showDice(playerOne.currentRoll);
      playerOne.checkIfOne();
      $("#running-total").text(playerOne.runningTotal);
      $("#player-one-total").text(playerOne.totalScore);
    //Player Two's Turn
    } else if (playerTwo.turn){
      if (computer){
        playerTwo.currentRoll = getRandomInt(1,7);
        showDice(playerTwo.currentRoll);
        playerTwo.computerPlay();
        $("#running-total").text(playerTwo.runningTotal);
        $("#player-two-total").text(playerTwo.totalScore);
      } else {
        playerTwo.currentRoll = getRandomInt(1,7);
        showDice(playerTwo.currentRoll);
        playerTwo.checkIfOne();
        $("#running-total").text(playerTwo.runningTotal);
        $("#player-two-total").text(playerTwo.totalScore);
      }
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

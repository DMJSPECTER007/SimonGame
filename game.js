//generation of a random colour
var randomNumber;
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;

function nextSequence() {
  randomNumber = (Math.floor(Math.random() * 4));
  level++;
  $("h1").text("Level " + level);
  randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  //flashing of button
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

//handling button press and storing user nextSequence
var userPattern = [];
var userChosenColour;
$(".btn").click(function() {
  userChosenColour = $(this).attr('id');
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userPattern.length - 1);
});
//function for playing sound on button clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//adding animation to the clicked button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
//toggle function will be used to avoid multiple keypresses(first key press will be the start of the game)
var start = false;
var level = -1;

function toggle() {
  start = !(start);
}
//checking for a keyboard key press to restart the game
$("body").keypress(function() {
  if (start === false) {
    toggle();
    nextSequence();
  }
});
//function to match the user pattern and the gamePattern
function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    restart();
  }
}
//function to restart the game
function restart() {
  start = false;
  level = -1;
  gamePattern = [];
  userPattern = [];
}

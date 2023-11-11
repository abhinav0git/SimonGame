var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//start
$(document).keypress(function() {   //listening to the keypress i.e any keyboard key
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// user presses a button
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);    //user pressed buttons are pushe into userChosenColour

  playSound(userChosenColour);
  animatePress(userChosenColour);     // play sound and animate the tiles while they are pressed

  checkAnswer(userClickedPattern.length-1);   // the currently pressed button is checked rather than the whole sequence 
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
      if (userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);   // updating lvl header
  var randomNumber = Math.floor(Math.random() * 4);     // 1 2 3 4
  var randomChosenColour = buttonColours[randomNumber];   
  gamePattern.push(randomChosenColour);   //among 4 color one is chosen and push to the gamePattern array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);   //$("#" + randomChosenColour) = $("#red") OR $("#green") etc
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

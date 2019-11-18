var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level= 0;
//keyboard click to start
$(document).keydown(function(){
  if(!started){ //if its starts for the first time
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }

});
//button click event
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);//to check the user answer  by passing in the index of the last answer in the usersequence
});
//function to check usersequence
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");//if the gamepattern last element and user sequence is equal log success else log wwrong
    //if its success then call next sequence again after a short delay
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//funtion to generate random number and animate buttons
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);//to generate numbers between 0 and 3
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //since all buttons have respective color id
  //fade in fade out to create flash animation
  playSound(randomChosenColor);
}
//function to play sound
function playSound(name){

  var audio=new Audio("sounds/" +name+ ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
function startOver(){
  //reset the values of level,started and game pattern variables
  started=false;
  level=0;
  gamePattern=[];
}

function getRndnum(max) {
  var rnd = Math.random() * (max);
  return Math.floor(rnd);
}
var colors = ["green", "red", "yellow", "blue"];
var gameorder = [];
var playerorder = [];
var start = true;
var targetu;
var level = 0;
var colorcount=0;

$(".btn").click(function(event){
  if(start){return;}
  colorcount++;
  targetu = event.currentTarget;
  targetu.classList.add("pressed");
  var coloru = targetu.classList[1];
  removePressed(coloru);
  playerorder.push(coloru);
  if(!checkArrays(playerorder, gameorder)){gameover(); return;}
  if(colorcount===level){
    checkAnswer();
  }
})
function clickeru (event){

}

function removePressed(colorus){
  setTimeout(function (){
    $("."+colorus).removeClass("pressed");
  },110)
}


$(document).keypress(function restartgame() {
  if(start) {
    start = false;
    $("body").removeClass("game-over");
    gameorder = [];
    playerorder = [];
    level = 0;
    colorcount = 0;
    nextSequence();
  }
})

function buttonAudio(color){
  var audio = new Audio("sounds/"+color+".mp3")
  audio.play();
}
function gameoverAudio(){
  var num = getRndnum(5);
  if(num===0){num=1;}
  var audio = new Audio("sounds/wrong"+num+".mp3")
  audio.play();
}

function gameover(){
  gameorder = [];
  playerorder = [];
  level = 0;
  colorcount = 0;
  $("h1").text("Game OVER, Press Any Key to Try Again");
  $("body").addClass("game-over");
  gameoverAudio();
  start = true;
}

function checkArrays(a, b){
  var ln = a.length;
  for(var i=0;i<ln;i++){
    if(a[i] !== b[i]){return false;}
  }
  return true;
}


function checkAnswer(){
  if(checkArrays(playerorder, gameorder)){
    setTimeout(nextSequence,500);
  }else{
    gameover();
  }
}

function nextSequence(){
  colorcount = 0;
  playerorder = [];
  level++;
  $("h1").text("Level "+level);
  getOrder();
}


function getOrder() {
  var rndcolor = getRndnum(4);
  var color = colors[rndcolor];
  $("."+color).fadeIn(100).fadeOut(100).fadeIn(100);
  gameorder.push(color);
}

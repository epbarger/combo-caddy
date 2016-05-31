var singleBell = new Audio('sounds/single_bell.mp3'); 
var tripleBell = new Audio('sounds/triple_bell.mp3');
var comboAudioPointer = new Audio('sounds/loris/jab.mp3');

var selectedCoach = "loris";
var roundLength = 20;
var numberOfRounds = 3;
var breakLength = 10;

var currentActionId = 1;

var combos = [
  ["one", "one.mp3", 1500],
  ["jab", "jab.mp3", 1500],
  ["double jab", "double_jab.mp3", 2000],
  ["one two", "one_two.mp3", 2000],
  ["one two three", "one_two_three.mp3", 3000],
  ["jab cross hook", "jab_cross_hook.mp3", 3000],
  ["jab uppercut hook", "jab_uppercut_hook.mp3", 3000],
  ["one two three two", "one_two_three_two.mp3", 4000],
  ["jab cross", "jab_cross.mp3", 2000]
]

window.onload = function(){
  // start/stop buttons
  var dingBtn = document.getElementById('ding')
  dingBtn.addEventListener("click", function(){ start(0) }); 

  var setBtn = document.getElementById('set')
  setBtn.addEventListener("click", function(){start(numberOfRounds - 1)});

  var cancelBtn = document.getElementById('cancel')
  cancelBtn.addEventListener("click", stop);


  //  settings selects

  var coachBtn = document.getElementById('coach')
  coachBtn.addEventListener("change", selectCoach);

  var lengthBtn = document.getElementById('length')
  lengthBtn.addEventListener("change", selectRoundLength);

  var breakLengthBtn = document.getElementById('break-length');
  breakLengthBtn.addEventListener("change", selectBreakLength);

  var roundCountBtn = document.getElementById('round-count');
  roundCountBtn.addEventListener("change", selectRoundCount);

  selectCoach({ 'explicitOriginalTarget': coachBtn })
  selectRoundLength({ 'explicitOriginalTarget': lengthBtn })
  selectBreakLength({ 'explicitOriginalTarget': breakLengthBtn })
  selectRoundCount({ 'explicitOriginalTarget': roundCountBtn })
}

var selectCoach = function(e){
  selectedCoach = e.explicitOriginalTarget.value
}

var selectRoundLength = function(e){
  roundLength = parseInt(e.explicitOriginalTarget.value)
}

var selectBreakLength = function(e){
  breakLength = parseInt(e.explicitOriginalTarget.value)
}

var selectRoundCount = function(e){
  numberOfRounds = parseInt(e.explicitOriginalTarget.value)
}

var start = function(breaksLeft){
  console.log('start')
  playSingleBell()
  hideStartButtonsShowStopButton()
  var startActionId = currentActionId
  setTimeout(function(){ playRound(startActionId, Date.now() + roundLength * 1000, breaksLeft) }, 1000)
}

var stop = function(){
  console.log('stop')
  currentActionId++
  playTripleBell(currentActionId)
  showStartButtonsHideStopButton()
}

var playRound = function(actionId, roundEndTime, breaksLeft){
  if (currentActionId != actionId) { return null; }
  var combo = combos[Math.floor(Math.random() * combos.length)];
  console.log(combo[0])
  comboAudioPointer.src = 'sounds/' + selectedCoach + '/' + combo[1]
  comboAudioPointer.play()
  var delayLength = combo[2]
  if (Date.now() > roundEndTime) {
    if (breaksLeft > 0) {
      console.log('scheduled next round')
      setTimeout(function(){ playTripleBell(actionId) }, delayLength) // play the end round bell after phrase delay
      setTimeout(function(){ // schedule next round
        playSingleBell(actionId)
        setTimeout(function(){ 
          playRound(actionId, Date.now() + breakLength * 1000 + roundLength * 1000, breaksLeft - 1)
        }, 1000) 
      }, breakLength * 1000)
    } else {
      setTimeout(end, delayLength)
    }
  } else {
    setTimeout(function(){ playRound(actionId, roundEndTime, breaksLeft) }, delayLength)
  }
}

var end = function(){
  console.log('end')
  showStartButtonsHideStopButton()
  playTripleBell()
}

var playSingleBell = function(actionId){
  if (currentActionId == actionId) { singleBell.play() }
}

var playTripleBell = function(actionId){
  if (currentActionId == actionId) { tripleBell.play() }
}

var hideStartButtonsShowStopButton = function() {
  document.getElementById('ding').className = 'btn btn-success hide'
  document.getElementById('set').className = 'btn btn-success hide'
  document.getElementById('cancel').className = 'btn btn-danger'
}

var showStartButtonsHideStopButton = function(){
  document.getElementById('ding').className = 'btn btn-success'
  document.getElementById('set').className = 'btn btn-success'
  document.getElementById('cancel').className = 'btn btn-danger hide'
}

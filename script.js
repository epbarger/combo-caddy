var singleBell = new Audio('sounds/single_bell.mp3'); var playSingleBell = function(){singleBell.volume = 0.5; singleBell.play();}
var tripleBell = new Audio('sounds/triple_bell.mp3'); var playTripleBell = function(){tripleBell.volume = 0.5; tripleBell.play();}
var comboAudioPointer = new Audio('sounds/loris/jab.mp3');

var selectedCoach = "loris";
var roundLength = 180;
// var numberOfRounds = 3;
// var breakLength = 60;

var roundInterrupt = false;

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

var playNextCombo = function(endTime) {
  if (roundInterrupt === true){
    roundInterrupt = false
    return null
  }

  var combo = combos[Math.floor(Math.random() * combos.length)];
  console.log(combo[0])
  // need to reuse audio object to keep iOS user-interaction play permission
  comboAudioPointer.src = 'sounds/' + selectedCoach + '/' + combo[1]
  comboAudioPointer.play()
  var delayLength = combo[2]
  if (Date.now() > endTime) {
    setTimeout(endRound, delayLength)
  } else {
    setTimeout(function(){ playNextCombo(endTime) } , delayLength)
  }
}

var endRound = function(){
  playTripleBell()
  console.log('round over')
}

var newRound = function(length){
  playSingleBell()
  console.log('round start')
  var endTime = Date.now() + (1000 * length)
  setTimeout(function(){ playNextCombo(endTime) }, 1000)
}

var cancelRound = function(){
  roundInterrupt = true
  playTripleBell()
  console.log('round cancelled')
}

var selectCoach = function(e){
  selectedCoach = e.explicitOriginalTarget.value
}

var selectRoundLength = function(e){
  roundLength = parseInt(e.explicitOriginalTarget.value)
}

var clickDing = function(e){
  var btn = e.explicitOriginalTarget
  if (btn.value == 'start') {
    newRound(roundLength)
    btn.value = 'stop'
    btn.textContent = 'End Round Early'
    btn.className = 'btn btn-danger'
  } else {
    cancelRound()
    btn.value = 'start'
    btn.textContent = 'Start Round'
    btn.className = 'btn btn-success'
  }
}

window.onload = function(){
  var dingBtn = document.getElementById('ding')
  dingBtn.addEventListener("click", clickDing); 

  var coachBtn = document.getElementById('coach')
  coachBtn.addEventListener("change", selectCoach);

  var lengthBtn = document.getElementById('length')
  lengthBtn.addEventListener("change", selectRoundLength);

  selectCoach({ 'explicitOriginalTarget': document.getElementById('coach') })
  selectRoundLength({ 'explicitOriginalTarget': document.getElementById('length') })
}

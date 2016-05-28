var singleBell = new Audio('sounds/single_bell.mp3'); var playSingleBell = function(){singleBell.play();}
var tripleBell = new Audio('sounds/triple_bell.mp3'); var playTripleBell = function(){tripleBell.play();}

var selectedVoice = "loris";
var roundLength = 180;
var numberOfRounds = 3;
var breakLength = 60;

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
  var audio = new Audio('sounds/' + selectedVoice + '/' + combo[1])
  audio.play()
  var delayLength = combo[2]
  if (Date.now() > endTime) {
    setTimeout(endRound, delayLength)
  } else {
    setTimeout(playNextCombo.bind(null, endTime), delayLength)
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
  setTimeout(playNextCombo.bind(null, endTime), 1000)
}

var cancelRound = function(){
  roundInterrupt = true
  playTripleBell()
  console.log('round cancelled')
}

window.onload = function(){
  var dingBtn = document.getElementById('ding')
  dingBtn.addEventListener("click", newRound.bind(null, roundLength)); 

  var cancelBtn = document.getElementById('cancel')
  cancelBtn.addEventListener("click", cancelRound);
}

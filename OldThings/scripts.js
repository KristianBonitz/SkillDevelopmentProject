var drills = [
  {"name":"3-ball Mills Mess",
  "time": 6},
  {"name":"3-ball reverse cascade",
  "time": 4},
  {"name":"4-ball Fountain",
  "time": 3}
]

var clockActive = false;
var drillsActive = false;
var drillPosition = 0;
var drillTime = 0;
var clock;

function StartClock(){
  clock = window.setInterval(checkTime, 1000);
  drillsActive = true;
  updateTimer();
}

function StopDrills(){
  drillPosition = 0;
  drillName = "";
  drillTime = 0;
  drillsActive = false;
  clearInterval(clock);
  updateTimer();
  //update page
}

function SkipDrill(){
  drillPosition++;
  updateTimer();
}

function PauseClock(){
  clearInterval(clock);
}

function ResumeClock(){
  if(drillsActive){
    clock = window.setInterval(checkTime, 1000);
  }
}

function checkTime(){
  console.log(clockActive);
  if (drillTime <= 0){
    if (drillPosition >= drills.length - 1){
      StopDrills();
      clockActive = false;
    }else{
      drillPosition++;
      updateTimer();
    }
  }else{
    drillTime--;
    document.getElementById("clock").innerHTML = drillTime;
  }
}

function updateTimer(taskName, time){
  document.getElementById("task").innerHTML = drills[drillPosition].name;
  document.getElementById("clock").innerHTML = drills[drillPosition].time.toString();
  drillTime = drills[drillPosition].time;
}

document.getElementById('start-stop').addEventListener('click', function(event){
  if(clockActive){
    StopDrills();
    clockActive = false;
  }else{
    StartClock();
    clockActive = true; 
  }
});

document.getElementById('skip-button').addEventListener('click', SkipDrill);

document.getElementById('pause-button').addEventListener('click', function(event){
  if(clockActive){
    PauseClock();
    clockActive = false;
  }else{
    ResumeClock();
    clockActive = true;
  }
});
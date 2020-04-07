let clock = document.querySelector('.clock h1')
let date = new Date();
document.querySelectorAll(".breaks button").forEach( element => element.addEventListener('click', activate));
var interval;

function tool(x){
        minStarted = x;
        secStarted = 0;
        clock.innerText = `${minStarted}:0${secStarted}`
        clearInterval(interval);
        interval  = setInterval(updateTime,1000);
}
function startClock(e){
    if(currentActive.innerText == "Pomodoro"){
        tool(25);
    } else if(currentActive.innerText == "Short break") {
        tool(5);
    } else if(currentActive.innerText == "Long break"){
        tool(15);
    }
}
let lastActive,currentActive;
function activate(e){
    if(lastActive !== undefined){
        lastActive.classList.remove('selected');
    }
    e.target.classList.add('selected');
    lastActive = e.target;
    currentActive = e.target;
}
var minStarted,secStarted;
function updateTime(){
    
    if(secStarted<10){
        clock.innerText = `${minStarted}:0${secStarted}`;
    } else{
        clock.innerText = `${minStarted}:${secStarted}`;
    }
    document.querySelector('title').innerText = `(${minStarted}:${secStarted}) Pomodoro timer`;
    if(secStarted == 0){
        secStarted = 59;
        minStarted--;
    } else {
        secStarted--;
    }
    if(secStarted == 0 && minStarted == 0){
        document.querySelector('audio').play();
        clearInterval(interval);
        clock.innerText = `${minStarted}:0${secStarted}`;
    }
    
}
var i = 0
function stopClock(){
    console.log(interval)
    if(i % 2 ==1){
        interval = setInterval(updateTime,1000);
    } else { 
        clearInterval(interval);
    }
    i++
}
function resetClock(){
    if(currentActive.innerText == "Pomodoro"){
        minStarted = 25;
        secStarted = 0;
    } else if(currentActive.innerText == "Short break") {
        minStarted = 5;
        secStarted = 0;
    } else if(currentActive.innerText == "Long break"){
        minStarted = 15;
        secStarted = 0;
    }
    clearInterval(interval);
    updateTime()
}


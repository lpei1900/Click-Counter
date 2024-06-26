const clickArea = document.querySelector(".clickArea");
const timerDiv = document.querySelector(".timer");
const cpsDiv = document.querySelector(".cps");
const clicksDiv = document.querySelector(".clicks");
const buttons = document.querySelectorAll(".secBtn");

let gameOn = false;
let counter = 0;
let cps = 0;
let clicks = 0;
let startTime = 0;
let gameTime = 5;


buttons.forEach(button => {
    button.addEventListener("click", () => {
        gameTime = parseInt(button.textContent.replace(" Seconds", ""));
        setButtonColor(button);
    });
});


function startGame(seconds){
    clickArea.textContent = '';
    if(!gameOn){
        gameOn = true;
        startTime = Date.now();
        updateClicks();
        let timer = setInterval(updateClock, 10);
        setTimeout(() => resetGame(timer, seconds), seconds * 1000);
    }
    else{
        updateClicks();
    }
}

function updateClock(){
    const currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    let seconds = Math.floor(elapsedTime / 1000);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    seconds = String(seconds);
    milliseconds = String(milliseconds).padStart(2,"0");

    cps = String((clicks/(elapsedTime/1000)).toFixed(2));

    cpsDiv.textContent = cps;
    timerDiv.textContent = `${seconds}.${milliseconds}`;

}

function updateClicks(){
    clicks+=1;
    clicksDiv.textContent = clicks;
}

function resetGame(timer, seconds){
    clearInterval(timer);
    showPopup(seconds);
    gameOn = false;
    counter = 0;
    cps = 0;
    clicks = 0;
    startTime = 0;
    timerDiv.textContent = "0.0";
    cpsDiv.textContent = 0;
    clicksDiv.textContent = 0;
    clickArea.textContent = 'Click Here';
}


function setButtonColor(clickedButton){
    buttons.forEach(button => {
        button.style.backgroundColor = "#343536";
    });
    clickedButton.style.backgroundColor = "#3498DB";
}


/*Popup*/
document.getElementById("closeButton").addEventListener("click", hidePopup);
document.getElementById("closePopup").addEventListener("click", hidePopup);

function showPopup(seconds) { 
    document.body.style.overflow = "hidden";
    document.getElementById("popup").style.display = "block";
    document.getElementById("timeText").textContent = `Time: ${seconds} Second/s`;
    document.getElementById("clicksText").textContent = `Clicks: ${clicks}`;
    document.getElementById("cpsText").textContent = `Cps: ${cps}/sec`;
}

function hidePopup() {
    document.body.style.overflow = "auto";
    document.getElementById("popup").style.display = "none";
}





function createRipple(event) {
    const button = event.currentTarget;
  
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
  
    const ripple = button.getElementsByClassName("ripple")[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    button.appendChild(circle);
  }
  
  
clickArea.addEventListener("click", (e) => {
    startGame(gameTime);
    createRipple(e);
});
  
  
  
const timer = document.querySelector(".timer");
const title = document.querySelector(".title");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resumeBtn = document.querySelector(".resumeBtn");
const resetBtn = document.querySelector(".resetBtn");
const pomoCountsDisplay = document.querySelector(".pomoCountsDisplay")





//initialise variables
const Work_Time = 25 * 60;
const Break_Time = 5 * 60;
let timerID = null;
let oneRoundCompleted = false;//Work Time + Break Time
let totalCount = 0
let paused = false;



//Function to CountDown
const countDown = (time) => {
    return () => {
        const mins = Math.floor(time / 60).toString().padStart(2, "0");
        const secs = Math.floor(time % 60).toString().padStart(2, "0");
        timer.textContent = `${mins} : ${secs}`;
        time--;
        if (time < 0) {
            stopTimer();
            if (!oneRoundCompleted) {
                timerID = startTimer(Break_Time);
                oneRoundCompleted = true;
                updateTitle("Its Break Time!")
            }
            else {
                updateTitle("Completed 1 Round of Promodoro Technique!")
                setTimeout(() => updateTitle("Start Timer Again"), 2000)
                totalCount++;
                saveLocalCounts();
                showPomoCounts();
            }
        }
    }
}



//function to update Title
const updateTitle = (msg) => {
    title.textContent = msg;
}



//function to save Promodoro counts to localStorage
const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem("pomoCounts"));
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("pomoCounts", JSON.stringify(counts));
}





//function to stop timer 
const stopTimer = () => {
    clearInterval(timerID);
    timerID = null;
}



//Function to start Timer 
const startTimer = (startTime) => {
    if (timerID !== null) {
        stopTimer();
    }
    return setInterval(countDown(startTime), 1000)
    // console.log(timerID)
}





//function to get time in seconds
const getTimeInSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(":")
    return parseInt(minutes * 60) + parseInt(seconds);
}





//adding event listner to start button
startBtn.addEventListener("click", () => {
    timerID = startTimer(Work_Time);
    updateTitle("Its Work Time!")
})



//Adding Event Listener to reset button
resetBtn.addEventListener("click", () => {
    stopTimer();
    timer.textContent = "25:00";
    updateTitle("Click start for Work Time");
})



//Adding Event Listener to pause button
pauseBtn.addEventListener("click", () => {
    stopTimer();
    paused = true;
    updateTitle("Timer Paused")
})



//adding Event listener to Resume button
resumeBtn.addEventListener("click", () => {
    if (paused) {
        const currentTime = getTimeInSeconds(timer.textContent);
        timerID = startTimer(currentTime);
        paused = false;
        (!oneRoundCompleted) ? updateTitle("Its Work Time") : updateTitle("Its Break Time")
    }
})





//function to show completed pomoCounts
const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem("pomoCounts"));
    if (counts > 0) {
        pomoCountsDisplay.style.display = "flex";
    }
    pomoCountsDisplay.firstElementChild.textContent = counts;
}



showPomoCounts();
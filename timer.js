const FULL_DASH_ARRAY = 283;
const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;

document.getElementById("app").innerHTML = 
`<div class="timer">
  <svg class="timer_svg" viewBox="0 0 100 100">
    <g class="timer_circle">
      <circle class="path_elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="path-remaining"
        stroke-dasharray="283"
        class="path_remaining"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="timer-label" class="timer_label">${formatTime(timeLeft)}</span>
</div>`;


function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
  document
    .getElementById("path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
let timer;
let running = false;
let time = 0; // Time in seconds
let laps = [];

const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");
const lapButton = document.getElementById("lap-btn");
const timeDisplay = document.getElementById("time-display");
const lapsList = document.getElementById("laps");

// Function to format time into HH:MM:SS
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to update the time display
function updateTime() {
  timeDisplay.textContent = formatTime(time);
}

// Start the stopwatch
startButton.addEventListener("click", () => {
  if (!running) {
    timer = setInterval(() => {
      time++;
      updateTime();
    }, 1000);
    running = true;
  }
});

// Pause the stopwatch
pauseButton.addEventListener("click", () => {
  if (running) {
    clearInterval(timer);
    running = false;
  }
});

// Reset the stopwatch
resetButton.addEventListener("click", () => {
  clearInterval(timer);
  running = false;
  time = 0;
  updateTime();
  laps = [];
  lapsList.innerHTML = ""; // Clear laps
});

// Record a lap
lapButton.addEventListener("click", () => {
  if (running) {
    laps.push(formatTime(time));
    displayLaps();
  }
});

// Display lap times
function displayLaps() {
  lapsList.innerHTML = ""; // Clear the list before adding laps
  laps.forEach((lap, index) => {
    const li = document.createElement("li");
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}

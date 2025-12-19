// ==========================================
// 1. VARIABLES & CONFIGURATION
// ==========================================

// Time durations in seconds
const FOCUS_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

// Colors
const COLOR_BLUE = "var(--google-blue)";
const COLOR_GREEN = "var(--google-green)";
const COLOR_YELLOW = "var(--google-yellow)";

// State variables (Global)
let timeLeft = FOCUS_TIME;
let isRunning = false;
let currentMode = "focus"; // 'focus', 'short-break', 'long-break'
let timerInterval = null;


// ==========================================
// 2. DOM ELEMENTS (Selecting by ID)
// ==========================================

const timerDisplay = document.getElementById("timer-display");
const timerLabel = document.getElementById("timer-label");
const ringProgress = document.getElementById("ring-progress");

// Buttons
const startBtn = document.getElementById("toggle-btn");
const resetBtn = document.getElementById("reset-btn");
const toggleIcon = document.getElementById("toggle-icon");

// Mode Buttons
const focusBtn = document.getElementById("focus-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");

// Task Elements (POST JAM ACTIVITY)
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("new-task-title");
const addTaskBtn = document.getElementById("add-task-btn");
const taskCountNum = document.getElementById("task-count-num");
const placeholder = document.querySelector(".empty-state");
const delBtn = document.querySelector('.btn-delete');
const iterCount = document.getElementById("iteration-count");
let taskCount = 0;



// ==========================================
// 3. TIMER FUNCTIONS
// ==========================================

function updateTimerDisplay() {
  // Calculate minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Format as "MM:SS" (e.g., "05:09")
  const formattedTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  timerDisplay.textContent = formattedTime;

  // Update the ring progress
  let totalTime = FOCUS_TIME;
  if (currentMode === "short-break") totalTime = SHORT_BREAK_TIME;
  if (currentMode === "long-break") totalTime = LONG_BREAK_TIME;

  const progress = 1 - timeLeft / totalTime;
  ringProgress.style.strokeDashoffset = progress;
}

function startTimer() {
  let iterations = 0;
  if (isRunning) {
    // If already running, pause it
    clearInterval(timerInterval);
    isRunning = false;
    toggleIcon.textContent = "play_arrow";
    timerLabel.textContent = "Paused";
    document.body.removeAttribute("style");
    console.log("Timer Paused");
  } else {
    // Start the timer
    isRunning = true;
    toggleIcon.textContent = "pause";
    timerLabel.textContent =
      currentMode === "focus" ? "Stay focused" : "Take a break";

    switch (currentMode) {
      case "focus":
        document.body.setAttribute("style","background-color: #112b55");
        break;
      case "short-break":
        document.body.setAttribute("style","background-color: #1c552bff");
        break;
      case "long-break":
        document.body.setAttribute("style","background-color: #a17a05ff");
        break;  
      default:
        document.body.removeAttribute("style");
        break;
    }  

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft = timeLeft - 1;
        console.log("Timer Running");
        updateTimerDisplay();
      } else {
        // Timer finished
        clearInterval(timerInterval);
        isRunning = false;
        toggleIcon.textContent = "play_arrow";
        alert("Time is up!");
        console.log("TImer Finished");
        iterations++;
        iterCount.textContent = iterations;

      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  toggleIcon.textContent = "play_arrow";
  console.log("Timer Reset");
  // Reset time based on current mode
  if (currentMode === "focus") timeLeft = FOCUS_TIME;
  else if (currentMode === "short-break") timeLeft = SHORT_BREAK_TIME;
  else if (currentMode === "long-break") timeLeft = LONG_BREAK_TIME;
  document.body.removeAttribute("style");
  updateTimerDisplay();
}

function setMode(mode) {
  currentMode = mode;

  // Update buttons style
  focusBtn.classList.remove("active");
  shortBreakBtn.classList.remove("active");
  longBreakBtn.classList.remove("active");

  const root = document.documentElement;
  console.log(root);

  if (mode === "focus") {
    timeLeft = FOCUS_TIME;
    focusBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_BLUE);
    timerLabel.textContent = "Ready to focus?";
    
    console.log("Focus Mode");
  } else if (mode === "short-break") {
    timeLeft = SHORT_BREAK_TIME;
    shortBreakBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_GREEN);
    timerLabel.textContent = "Time for a break";
    
    console.log("Short Break Mode");
  } else if (mode === "long-break") {
    timeLeft = LONG_BREAK_TIME;
    longBreakBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_YELLOW);
    
    timerLabel.textContent = "Time for a long break";
    console.log("Long Break Mode");
  }

  // Stop timer when switching modes
  clearInterval(timerInterval);
  isRunning = false;
  toggleIcon.textContent = "play_arrow";
  document.body.removeAttribute("style");
  console.log("Timer Reset");

  updateTimerDisplay();
}



// ==========================================
// 4. TASK FUNCTIONS (POST JAM ACTIVITY)
// ==========================================
// 
// 🎯 YOUR CHALLENGE: Implement the task management functions below!
// 
// The HTML already has:
//   - An input field with id="new-task-title"
//   - An add button with id="add-task-btn" 
//   - A task list with id="task-list"
//   - A task counter with id="task-count-num"
//
// You are FREE to implement these functions however you want!
// Be creative and add any extra features you think would be cool.
//
// ==========================================

/**
 * addTask()
 * 
 * This function should add a new task to the task list.
 * 
 * Things to consider:
 * - How do you get the text from the input field?
 * - How do you create a new list item element?
 * - How do you add it to the task list?
 * - Should you clear the input after adding?
 * - What if the input is empty?
 * 
 * Feel free to add any logic you want!
 */
function addTask() {
 

  // verify if taskInput is empty
  if (taskInput.value == "" || taskInput.value == " ") {
    taskInput.value = "";
    return;
  }
  let task = taskInput.value; // take taskInput Value to be appended
  
  // initial task item creation
  let liCreate = document.createElement("li");
  let inputCreate = document.createElement("input");
  let inputLabel = document.createElement("label");
  let delBtn = document.createElement("span");
  taskCount++; // to be used for creating an ID for the task to be created

  // setting the properties for the checkbox of an Item
  inputCreate.setAttribute("type", "checkbox");
  inputCreate.classList.add("first");
  inputCreate.id = `task-${taskCount}`;
  
  // setting the properties for the title of the task
  inputLabel.setAttribute("for" , inputCreate.id);
  inputLabel.classList.add("task-title");
  inputLabel.textContent = task;

  // setting the properties for the delete button
  delBtn.classList.add("material-symbols-rounded");
  delBtn.classList.add("btn-delete");
  delBtn.innerHTML = "delete";

  // merging the three items into one container
  liCreate.append(inputCreate, inputLabel, delBtn);
  liCreate.classList.add("task-item");
  liCreate.id = `li-task-${taskCount}`;

  // modifying task container to make room for the task item
  placeholder.style.display = "none";
  
  // appending the item to the task container
  taskList.appendChild(liCreate);

  taskInput.value = ""; // resetting the taskInput box

  updateTaskCount();

}


/**
 * deleteTask(taskElement)
 * 
 * This function should remove a task from the list.
 * 
 * @param {HTMLElement} taskElement - The task item to delete
 * 
 * Things to consider:
 * - How do you remove an element from the DOM?
 * - Should you update the task counter?
 * - What if there are no more tasks? (show empty state?)
 * 
 * Feel free to add any logic you want!
 */
function deleteTask(taskElement) {
  // taskElement would return the delBtn, so its parent is called
    let task = taskElement.parentElement;
    console.log(task);

    taskList.removeChild(task); // removal of the item
    taskCount--; // decreases taskCount to make ID coherent

    // show placeholder if there are no tasks
    if (taskCount == 0) {
      placeholder.removeAttribute("style");
    }
    updateTaskCount();
}

function doneTask(taskElement){
  // taskElement returns the checkbox ID, so its parent is called
  let task = document.getElementById(`li-${taskElement.id}`);
  let taskTitle = task.children[1]; // taskTitle is assumed to be child[1]
  task.children[0].disabled = true; // checkbox is assumed to be child[2] and then disabled
  task.classList.add("done");
  console.log(task);
  taskTitle.setAttribute("style", "text-decoration: line-through"); // adds style for completed item

  updateList();
  updateTaskCount();
}


/**
 * updateTaskCount()
 * 
 * This function should update the task counter display.
 * 
 * Hint: You can count the number of .task-item elements in the list.
 * 
 * Feel free to add any logic you want!
 */
function updateTaskCount() {
  // used for updating the task counter
   const taskCounter =  document.querySelectorAll(".task-item").length;
   taskCountNum.textContent = taskCounter;
}

function updateList(){
  // used for moving down finished tasks
  let toMove = taskList.querySelectorAll('.done');

  // re-appends the item to the button
  toMove.forEach(item =>{
    taskList.appendChild(item);
  });

}


// ==========================================
// 5. EVENT LISTENERS
// ==========================================

// Timer Controls
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);


// eventListener to listen for keyboard events
document.addEventListener("keydown", (event)=>{
  switch (event.key) {
    case " ":
      startTimer();
      break;
    case "r":
      resetTimer();
      break;
    case "1":
      setMode("focus");
      break;
    case "2":
      setMode("short-break");
      break;
    case "3":
      setMode("long-break");
      break;
  
    default:
      break;
  }
  
});

// Mode Buttons
focusBtn.addEventListener("click", () => {
  setMode("focus");
  console.log("Focus mode activated");
});

shortBreakBtn.addEventListener("click", () => {
  setMode("short-break");
  console.log("Short break mode activated");
});

longBreakBtn.addEventListener("click", () => {
  setMode("long-break");
  console.log("Long break mode activated");
});

// Task Controls (POST JAM ACTIVITY)
// Uncomment these when you're ready to test your functions!

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
  
});

// used to prevent keyboard shortcuts to be triggered while
// using the inputBox
taskInput.addEventListener("keyup",(e)=>{
    e.stopPropagation();
});
taskInput.addEventListener("keydown",(e)=>{
    e.stopPropagation();
});

// eventListener for delete button
taskList.addEventListener("click", (event)=>{
  const btn = event.target.closest('.btn-delete');
  if (!btn) return;
  deleteTask(btn);
});

// eventListener for done checkbox
taskList.addEventListener("change", (event)=>{
  if (event.target.matches('input[type="checkbox"]')) {
    if (event.target.checked) {
      doneTask(event.target);
    }
  }
});





// ==========================================
// 6. INITIALIZATION
// ==========================================

updateTimerDisplay();

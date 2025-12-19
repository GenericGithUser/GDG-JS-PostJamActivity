#  GDG Pomodoro Timer

A beautiful, modern Pomodoro Timer web application built with vanilla HTML, CSS, and JavaScript. This project was created as part of the **GDG PUP JavaScript Workshop** to demonstrate fundamental web development concepts.

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [JavaScript Functions Reference](#javascript-functions-reference)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)

---

## 🎯 Overview

The **GDG Pomodoro Timer** is a productivity tool based on the Pomodoro Technique, a time management method developed by Francesco Cirillo. The technique uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

This application allows users to:
- Focus for **25 minutes** during work sessions
- Take **5-minute short breaks** between sessions
- Enjoy **15-minute long breaks** after completing multiple sessions

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Modern UI** | Glass-morphism design with Google's Material Design elements |
| 🔄 **Three Timer Modes** | Focus (25 min), Short Break (5 min), Long Break (15 min) |
| ⏯️ **Start/Pause Toggle** | Single button to control timer state |
| 🔁 **Reset Functionality** | Quickly reset the current timer |
| 📊 **Visual Progress Ring** | SVG-based circular progress indicator |
| 🎨 **Dynamic Theming** | Color changes based on the selected mode |
| 📱 **Responsive Design** | Works on desktop and mobile devices |

---

## 📁 Project Structure

```
Live Project/
├── pomodoro.html          # Main HTML file (entry point)
├── README.md              # This documentation file
├── js/
│   └── main.js            # JavaScript logic for timer functionality
└── styles/
    └── pomodoro.css       # Stylesheet with modern glassmorphism design
```

### File Descriptions

| File | Purpose |
|------|---------|
| `pomodoro.html` | Contains the HTML structure including the timer display, mode buttons, control buttons, and SVG progress ring |
| `js/main.js` | Contains all JavaScript logic including timer functions, state management, and event handling |
| `styles/pomodoro.css` | Contains all CSS styling including the glassmorphism effect, animations, and responsive design |

---

## ⚙️ How It Works

### Timer Modes

The application supports three distinct modes, each with a different duration and color theme:

| Mode | Duration | Color | Purpose |
|------|----------|-------|---------|
| **Focus** | 25 minutes | 🔵 Blue | Concentrated work session |
| **Short Break** | 5 minutes | 🟢 Green | Quick rest between sessions |
| **Long Break** | 15 minutes | 🟡 Yellow | Extended rest after multiple sessions |

### State Management

The timer maintains the following state variables:

```javascript
let timeLeft = FOCUS_TIME;      // Remaining time in seconds
let isRunning = false;          // Whether the timer is active
let currentMode = "focus";      // Current timer mode
let timerInterval = null;       // Reference to the interval
```

---

## 📚 JavaScript Functions Reference

Below is a comprehensive breakdown of each function in `main.js`:

---

### 1. `updateTimerDisplay()`

**Purpose:** Updates the timer display and progress ring based on the current time remaining.

**How it works:**
1. Calculates minutes and seconds from `timeLeft` (which is in seconds)
2. Formats the time as `MM:SS` with leading zeros (e.g., `05:09`)
3. Updates the timer display text content
4. Calculates and updates the SVG ring progress based on elapsed time

**Code Location:** Lines 46-66

```javascript
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
```

**Key Concepts:**
- `Math.floor()` - Rounds down to get whole minutes
- `% (modulo)` - Gets remaining seconds
- `padStart(2, "0")` - Ensures two-digit formatting
- `strokeDashoffset` - Controls SVG circle animation

---

### 2. `startTimer()`

**Purpose:** Toggles the timer between running and paused states.

**How it works:**
1. If timer is running → Pauses it (clears interval, updates UI)
2. If timer is paused → Starts it (sets interval, updates UI)
3. Uses `setInterval()` to decrement time every 1000ms (1 second)
4. When time reaches 0, stops the timer and shows an alert

**Code Location:** Lines 68-98

```javascript
function startTimer() {
  if (isRunning) {
    // If already running, pause it
    clearInterval(timerInterval);
    isRunning = false;
    toggleIcon.textContent = "play_arrow";
    timerLabel.textContent = "Paused";
  } else {
    // Start the timer
    isRunning = true;
    toggleIcon.textContent = "pause";
    timerLabel.textContent =
      currentMode === "focus" ? "Stay focused" : "Take a break";

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft = timeLeft - 1;
        updateTimerDisplay();
      } else {
        // Timer finished
        clearInterval(timerInterval);
        isRunning = false;
        toggleIcon.textContent = "play_arrow";
        alert("Time is up!");
      }
    }, 1000);
  }
}
```

**Key Concepts:**
- `setInterval()` - Executes code repeatedly at specified intervals
- `clearInterval()` - Stops the interval when pausing
- Ternary operator (`? :`) - Conditional text based on mode

---

### 3. `resetTimer()`

**Purpose:** Stops the timer and resets it to the initial duration of the current mode.

**How it works:**
1. Clears any running interval
2. Sets `isRunning` to `false`
3. Resets the toggle icon to play
4. Sets `timeLeft` based on the current mode
5. Updates the display

**Code Location:** Lines 100-111

```javascript
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  toggleIcon.textContent = "play_arrow";
  
  // Reset time based on current mode
  if (currentMode === "focus") timeLeft = FOCUS_TIME;
  else if (currentMode === "short-break") timeLeft = SHORT_BREAK_TIME;
  else if (currentMode === "long-break") timeLeft = LONG_BREAK_TIME;

  updateTimerDisplay();
}
```

**Key Concepts:**
- Conditional statements for mode-specific durations
- State reset pattern

---

### 4. `setMode(mode)`

**Purpose:** Switches between timer modes (Focus, Short Break, Long Break).

**Parameters:**
- `mode` (string): One of `"focus"`, `"short-break"`, or `"long-break"`

**How it works:**
1. Updates the `currentMode` state variable
2. Removes "active" class from all mode buttons
3. Adds "active" class to the selected mode button
4. Changes the theme color using CSS custom properties
5. Updates the timer label text
6. Stops any running timer
7. Resets time to the new mode's duration
8. Updates the display

**Code Location:** Lines 113-151

```javascript
function setMode(mode) {
  currentMode = mode;

  // Update buttons style
  focusBtn.classList.remove("active");
  shortBreakBtn.classList.remove("active");
  longBreakBtn.classList.remove("active");

  const root = document.documentElement;

  if (mode === "focus") {
    timeLeft = FOCUS_TIME;
    focusBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_BLUE);
    timerLabel.textContent = "Ready to focus?";
  } else if (mode === "short-break") {
    timeLeft = SHORT_BREAK_TIME;
    shortBreakBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_GREEN);
    timerLabel.textContent = "Time for a break";
  } else if (mode === "long-break") {
    timeLeft = LONG_BREAK_TIME;
    longBreakBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_YELLOW);
    timerLabel.textContent = "Time for a long break";
  }

  // Stop timer when switching modes
  clearInterval(timerInterval);
  isRunning = false;
  toggleIcon.textContent = "play_arrow";

  updateTimerDisplay();
}
```

**Key Concepts:**
- `classList.add()` / `classList.remove()` - DOM class manipulation
- `document.documentElement` - Access to root HTML element
- `style.setProperty()` - Dynamically change CSS variables
- CSS Custom Properties (`--theme-primary`) - Dynamic theming

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or package managers required!

### Running the Application

1. **Clone or download** the repository
2. **Navigate** to the `Live Project` folder
3. **Open** `pomodoro.html` in your web browser

```bash
# If using a local server (optional)
cd "Live Project"
npx serve .
```

Or simply double-click `pomodoro.html` to open it in your default browser.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure and accessibility |
| **CSS3** | Modern styling with glassmorphism and animations |
| **JavaScript (ES6+)** | Timer logic and DOM manipulation |
| **Google Fonts** | Typography (Google Sans, Roboto Mono) |
| **Material Symbols** | Icon library for UI elements |
| **SVG** | Scalable progress ring animation |

---

## 📝 Learning Objectives

This project demonstrates the following JavaScript concepts:

1. **Variables & Constants** - Using `const` and `let` for state management
2. **DOM Selection** - `document.getElementById()` for element access
3. **Functions** - Modular code organization
4. **Event Listeners** - Responding to user interactions
5. **Timers** - `setInterval()` and `clearInterval()`
6. **String Methods** - `padStart()` for formatting
7. **Math Operations** - `Math.floor()`, modulo operator
8. **CSS Manipulation** - Dynamic class and style changes
9. **Conditional Logic** - `if/else` statements
10. **Arrow Functions** - Modern function syntax

---

## 📄 License

This project is open source and available for educational purposes.

---

<div align="center">

**Made with ❤️ by GDG PUP Web Dev Team**

*Happy Coding! 🚀*

</div>

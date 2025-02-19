let history = [];

function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    let display = document.getElementById("display");
    try {
        let expression = display.value; // Store the question
        let result = eval(expression);
        if (!isNaN(result)) {
            display.value = result;
            addToHistory(expression, result);
        }
    } catch {
        display.value = "Error";
    }
}

function addToHistory(expression, result) {
    let historyEntry = `${expression} = ${result}`;
    history.unshift(historyEntry);
    if (history.length > 5) history.pop();

    let historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Keyboard Support (Works in Both Light & Dark Mode)
document.addEventListener("keydown", function(event) {
    let key = event.key;
    if (/[0-9+\-*/.=]/.test(key)) {
        if (key === "=" || key === "Enter") calculateResult();
        else appendToDisplay(key);
    } else if (key === "Backspace") deleteLast();
    else if (key === "Escape") clearDisplay();
});

// Theme Toggle (Fix for Dark Mode Issues)
document.getElementById("toggle-theme").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    // Change theme toggle icon
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";

    // Force re-render input field to ensure proper visibility
    let display = document.getElementById("display");
    display.value += " "; // Add a space to force redraw
    setTimeout(() => {
        display.value = display.value.trim(); // Remove extra space
    }, 10);
});
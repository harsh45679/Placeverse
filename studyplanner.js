
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addtask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        updateStats();
    }
    inputBox.value = "";
    saveData();
}

// Add event listener for Enter key
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addtask();
    }
});

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        updateStats();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateStats();
        saveData();
    }
}, false);

function updateStats() {
    const totalTasks = listContainer.children.length;
    const completedTasks = listContainer.querySelectorAll('.checked').length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('completed-tasks').textContent = completedTasks;
    document.getElementById('pending-tasks').textContent = pendingTasks;
    document.getElementById('completion-rate').textContent = completionRate + '%';
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateStats();
}

// Load tasks when page loads
showTask();

// Update stats every few seconds to keep them current
setInterval(updateStats, 1000);

window.onload = function() {
  window.toggleTopicSections = function(clickedElement) {
    const topic = clickedElement.closest(".topic-1");
    if (!topic) {
      console.warn("Couldn't find topic-1 container");
      return;
    }

    const sub1 = topic.querySelector(".sub-1");
    const sub2 = topic.querySelector(".sub-2");

    sub1?.classList.toggle("active");
    sub2?.classList.toggle("active");
  };
};

function toggleSections(clickedElement) {
  const topic = clickedElement.closest(".mock-1");
  if (!topic) {
    console.log("No .mock-1 found");
    return;
  }

  const container = topic.querySelector(".question-container");
  if (!container) {
    console.log("No .question-container found inside mock-1");
    return;
  }

  console.log("Toggling section...");

  if (container.style.display === "flex") {
    container.style.display = "none";
  } else {
    container.style.display = "flex";
  }
}

function markComplete(div) {
  // Toggle 'completed' class
  div.classList.toggle("completed");

  // Handle tick SVG
  let tick = div.querySelector(".tick-svg");
  if (tick) {
    tick.remove();
  } else {
    const tickIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tickIcon.setAttribute("class", "tick-svg");
    tickIcon.setAttribute("width", "20");
    tickIcon.setAttribute("height", "20");
    tickIcon.setAttribute("viewBox", "0 0 24 24");
    tickIcon.setAttribute("fill", "none");
    tickIcon.setAttribute("stroke", "green");
    tickIcon.setAttribute("stroke-width", "2");
    tickIcon.setAttribute("stroke-linecap", "round");
    tickIcon.setAttribute("stroke-linejoin", "round");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M5 13l4 4L19 7");

    tickIcon.appendChild(path);
    div.appendChild(tickIcon);
  }

  // ✅ Update progress bar
  updateOverallProgress();
}

function updateOverallProgress() {
  const coreChecks = document.querySelectorAll(".core-check.completed").length;
  const mockChecks = document.querySelectorAll(".gapc.completed").length;
  const aptChecks = document.querySelectorAll(".apt-check.completed").length;

  const totalCore = document.querySelectorAll(".core-check").length;
  const totalMock = document.querySelectorAll(".gapc").length;
  const totalApt = document.querySelectorAll(".apt-check").length;

  const totalCompleted = coreChecks + mockChecks + aptChecks;
  const totalAvailable = totalCore + totalMock + totalApt;

  const percentage = totalAvailable === 0 ? 0 : Math.round((totalCompleted / totalAvailable) * 100);

  // Update fill width
  const fill = document.querySelector(".progress-fill");
  if (fill) {
    fill.style.width = `${percentage}%`;
  }

  // Update text inside the bar
  const progressText = document.querySelector(".progress-text");
  if (progressText) {
    progressText.textContent = `Overall Progress: ${percentage}%`;
  }

  // Save to localStorage for APTITUDE MOCK progress
  const aptitudeMockProgress = [];
  document.querySelectorAll(".gapc").forEach((element, index) => {
    aptitudeMockProgress[index] = element.classList.contains("completed");
  });
  localStorage.setItem("aptitudeMockProgress", JSON.stringify(aptitudeMockProgress));

  // Save to localStorage for core topic progress
  const coreProgress = [];
  document.querySelectorAll(".core-check").forEach((element, index) => {
    coreProgress[index] = element.classList.contains("completed");
  });
  localStorage.setItem("coreProgress", JSON.stringify(coreProgress));

  // Save aptitude video progress for weekly tracking
  const aptVideoProgress = [];
  document.querySelectorAll(".apt-check").forEach((element, index) => {
    aptVideoProgress[index] = element.classList.contains("completed");
  });
  localStorage.setItem("aptVideoProgress", JSON.stringify(aptVideoProgress));

  // Trigger a custom event to notify main dashboard of progress change
  window.dispatchEvent(new CustomEvent('aptitudeProgressUpdated', {
    detail: { progress: aptVideoProgress }
  }));
}

function showanswer(button) {
  const interactDiv = button.closest(".ineteract");
  const showDiv = interactDiv.querySelector(".show");

  if (showDiv.style.display === "none" || showDiv.style.display === "") {
    showDiv.style.display = "block";
  } else {
    showDiv.style.display = "none";
  }
}

// Initialize progress on page load
window.addEventListener("DOMContentLoaded", function() {
  // Restore APTITUDE MOCK progress from localStorage
  const savedAptitudeMockProgress = JSON.parse(localStorage.getItem("aptitudeMockProgress")) || [];
  document.querySelectorAll(".gapc").forEach((element, index) => {
    if (savedAptitudeMockProgress[index] === true) {
      element.classList.add("completed");
      // Add tick SVG if completed
      const tickIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      tickIcon.setAttribute("class", "tick-svg");
      tickIcon.setAttribute("width", "20");
      tickIcon.setAttribute("height", "20");
      tickIcon.setAttribute("viewBox", "0 0 24 24");
      tickIcon.setAttribute("fill", "none");
      tickIcon.setAttribute("stroke", "green");
      tickIcon.setAttribute("stroke-width", "2");
      tickIcon.setAttribute("stroke-linecap", "round");
      tickIcon.setAttribute("stroke-linejoin", "round");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M5 13l4 4L19 7");

      tickIcon.appendChild(path);
      element.appendChild(tickIcon);
    }
  });

  // Restore core topic progress from localStorage
  const savedCoreProgress = JSON.parse(localStorage.getItem("coreProgress")) || [];
  document.querySelectorAll(".core-check").forEach((element, index) => {
    if (savedCoreProgress[index] === true) {
      element.classList.add("completed");
      const tickIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      tickIcon.setAttribute("class", "tick-svg");
      tickIcon.setAttribute("width", "20");
      tickIcon.setAttribute("height", "20");
      tickIcon.setAttribute("viewBox", "0 0 24 24");
      tickIcon.setAttribute("fill", "none");
      tickIcon.setAttribute("stroke", "green");
      tickIcon.setAttribute("stroke-width", "2");
      tickIcon.setAttribute("stroke-linecap", "round");
      tickIcon.setAttribute("stroke-linejoin", "round");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M5 13l4 4L19 7");

      tickIcon.appendChild(path);
      element.appendChild(tickIcon);
    }
  });

  // Restore aptitude video progress from localStorage
  const savedAptVideoProgress = JSON.parse(localStorage.getItem("aptVideoProgress")) || [];
  document.querySelectorAll(".apt-check").forEach((element, index) => {
    if (savedAptVideoProgress[index] === true) {
      element.classList.add("completed");
      const tickIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      tickIcon.setAttribute("class", "tick-svg");
      tickIcon.setAttribute("width", "20");
      tickIcon.setAttribute("height", "20");
      tickIcon.setAttribute("viewBox", "0 0 24 24");
      tickIcon.setAttribute("fill", "none");
      tickIcon.setAttribute("stroke", "green");
      tickIcon.setAttribute("stroke-width", "2");
      tickIcon.setAttribute("stroke-linecap", "round");
      tickIcon.setAttribute("stroke-linejoin", "round");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M5 13l4 4L19 7");

      tickIcon.appendChild(path);
      element.appendChild(tickIcon);
    }
  });

  updateOverallProgress();
});
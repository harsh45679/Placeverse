const dailyMotivation = [
  "Start where you are. Use what you have. Do what you can.",
  "Success is the sum of small efforts repeated daily.",
  "Discipline is doing it even when you don’t feel like it.",
  "Push yourself. No one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Don’t stop until you’re proud.",
  "Progress, not perfection.",
  "You are capable of amazing things.",
  "One step at a time. One day at a time.",
  "Keep going. Your future self will thank you.",
  "Failure is not the opposite of success—it’s part of it.",
  "It’s a slow process, but quitting won’t speed it up.",
  "Dream big. Start small. Act now.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Stay focused and never give up.",
  "Your only limit is your mind.",
  "Small progress is still progress.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Be stronger than your excuses.",
  "Wake up with purpose. Go to bed with pride."
];

const motivationText = document.getElementsByClassName("motivation-1")[0];
const todayIndex = new Date().getDate() % dailyMotivation.length;
motivationText.innerText = dailyMotivation[todayIndex];

const dailyReminders = [
  " Time to solve your 3 DSA questions!",
  " Work on your web development project today!",
  " Learn one core subject video (OS/DBMS/etc.)",
  " Revise your previous DSA topics for 15 mins.",
  " Check your weekly progress & fix weak areas.",
  " Complete one section of your current project.",
  " Stay focused — consistency beats intensity!"
];

const reminderText = document.getElementsByClassName("remainder-text")[0];
const todayremain = new Date().getDate() % dailyReminders.length;
reminderText.innerText = dailyReminders[todayremain];

function removebutton() {
  document.getElementById("fake-loggin").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function removeform() {
  const inputname = document.getElementById("username");
  const nameapp = document.getElementById("usernameapp");

  if (inputname.value.trim() === "") {
    alert("Enter username");
  } else {
    const username = inputname.value.trim().toUpperCase();
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", "true");

    nameapp.innerText = username;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("fake-loggin").style.display = "none";
    updateAllProgress();
  }
}




// Progress tracking functions
function getDSAProgress() {
  let totalQuestions = 0;
  let completedQuestions = 0;

  for (let i = 0; i < 25; i++) {
    const topicData = JSON.parse(localStorage.getItem(`topic-${i}`)) || { video: false, questions: [] };
    totalQuestions += topicData.questions.length;
    completedQuestions += topicData.questions.filter(q => q === true).length;
  }

  return totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;
}

function getCoreSubjectsProgress() {
  const coreData = JSON.parse(localStorage.getItem('coreSubjectsProgress')) || [];
  if (coreData.length === 0) return 0;

  const completed = coreData.filter(item => item === true).length;
  return Math.round((completed / coreData.length) * 100);
}

function getAptitudeProgress() {
  const aptitudeData = JSON.parse(localStorage.getItem('aptVideoProgress')) || [];
  if (aptitudeData.length === 0) return 0;

  const completed = aptitudeData.filter(item => item === true).length;
  return Math.round((completed / aptitudeData.length) * 100);
}

function getAptitudeVideoCount() {
  const aptitudeData = JSON.parse(localStorage.getItem('aptVideoProgress')) || [];
  const completed = aptitudeData.filter(item => item === true).length;
  const total = aptitudeData.length;

  // If no aptitude data exists yet, check for .apt-check elements on current page
  if (total === 0) {
    const aptCheckElements = document.querySelectorAll('.apt-check');
    if (aptCheckElements.length > 0) {
      const liveCompleted = Array.from(aptCheckElements).filter(el => el.classList.contains('completed')).length;
      return { completed: liveCompleted, total: aptCheckElements.length };
    }
  }

  return { completed: completed, total: total };
}

function getProjectsProgress() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  if (projects.length === 0) return 0;

  const completedProjects = projects.filter(project =>
    project && (
      (project.overview && project.overview.trim() !== '') ||
      (project.purpose && project.purpose.trim() !== '') ||
      (project.code && project.code.trim() !== '') ||
      (project.name && project.name.trim() !== '')
    )
  ).length;

  return Math.round((completedProjects / projects.length) * 100);
}

function getProjectsCount() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const completedProjects = projects.filter(project =>
    project && (
      (project.overview && project.overview.trim() !== '') ||
      (project.purpose && project.purpose.trim() !== '') ||
      (project.code && project.code.trim() !== '') ||
      (project.name && project.name.trim() !== '')
    )
  ).length;

  return { completed: completedProjects, total: projects.length };
}

function getMockTestProgress() {
  const aptitudeMocks = JSON.parse(localStorage.getItem('aptitudeMockProgress')) || [];
  const coreMocks = JSON.parse(localStorage.getItem('coreMockProgress')) || [];
  const combined = aptitudeMocks.concat(coreMocks);
  const completed = combined.filter(Boolean).length;
  return Math.round((completed / 10) * 100);
}

function getMockTestCount() {
  const aptitudeMockData = JSON.parse(localStorage.getItem('aptitudeMockProgress')) || [];
  const coreMockData = JSON.parse(localStorage.getItem('coreMockProgress')) || [];
  const aptitudeCompleted = aptitudeMockData.filter(item => item === true).length;
  const coreCompleted = coreMockData.filter(item => item === true).length;
  const totalCompleted = aptitudeCompleted + coreCompleted;
  return { completed: totalCompleted, total: 10 };
}

function getCombinedMockTestCount() {
  const aptitudeMockData = JSON.parse(localStorage.getItem('aptitudeMockProgress')) || [];
  const coreMockData = JSON.parse(localStorage.getItem('coreMockProgress')) || [];
  const totalCompleted = [...aptitudeMockData, ...coreMockData].filter(Boolean).length;
  return { completed: totalCompleted, total: 10 };
}

// 🧠 MAIN UPDATE FUNCTION
function updateAllProgress() {
  const dsaProgress = getDSAProgress();
  const coreProgress = getCoreSubjectsProgress();
  const aptitudeProgress = getAptitudeProgress();
  const projectsProgress = getProjectsProgress();
  const mockProgress = getMockTestProgress();

  const weeklyOverall = Math.round((dsaProgress + coreProgress + aptitudeProgress + projectsProgress) / 4);

  const projectCount = getProjectsCount();
  const mockCount = getMockTestCount();
  const totalCompleted = projectCount.completed + mockCount.completed;
  const totalItems = projectCount.total + mockCount.total;
  const monthlyOverall = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  updateExistingBars(dsaProgress, coreProgress, projectsProgress, weeklyOverall);
  updateMonthlySection(projectsProgress, mockProgress, monthlyOverall);
}

function updateProgressBar(selector, percentage, text) {
  const progressBar = document.querySelector(`${selector} .progressbar`);
  const divideElement = document.querySelector(`${selector} .divide`);
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.style.backgroundColor = getProgressColor(percentage);
  }
  if (divideElement) {
    divideElement.textContent = text;
  }
}

function getProgressColor(percentage) {
  if (percentage >= 80) return '#4CAF50';
  if (percentage >= 60) return '#FFC107';
  if (percentage >= 40) return '#FF9800';
  return '#F44336';
}

// ✅ FIXED: Aptitude progress now updates dynamically
function updateExistingBars(dsaProgress, coreProgress, projectsProgress, overallProgress) {
  const weeklyBars = document.querySelectorAll('.weekly .design');

  weeklyBars.forEach((bar, index) => {
    const progressBar = bar.querySelector('.progressbar');
    const divide = bar.querySelector('.divide');

    if (progressBar && divide) {
      let percentage = 0;
      let label = '';

      switch(index) {
        case 0:
          percentage = overallProgress;
          label = `${percentage}%`;
          break;
        case 1:
          percentage = dsaProgress;
          label = `${percentage}%`;
          break;
        case 2:
          // Aptitude Video Progress
          const aptVideoCount = getAptitudeVideoCount();
          const updatedAptProgress = getAptitudeProgress();
          percentage = updatedAptProgress;
          // Ensure we always show a proper label, even if no videos exist yet
          if (aptVideoCount.total === 0) {
            label = `${updatedAptProgress}%`;
          } else {
            label =  `${percentage}%`;
          }
          console.log('Aptitude bar update - Progress:', updatedAptProgress, 'Label:', label);
          break;
        case 3:
          percentage = coreProgress;
          label = `${percentage}%`;
          break;
        case 4:
          percentage = projectsProgress;
          label = `${percentage}%`;
          break;
      }

      progressBar.style.width = `${percentage}%`;
      progressBar.style.backgroundColor = getProgressColor(percentage);
      divide.textContent = label;
    }
  });
}

function updateMonthlySection(projectsProgress, mockProgress, monthlyOverall) {
  const projectCount = getProjectsCount();
  const mockCount = getCombinedMockTestCount();

  const dsaProgress = getDSAProgress();
  const coreProgress = getCoreSubjectsProgress();
  const aptitudeProgress = getAptitudeProgress();
  const overallMonthlyProgress = Math.round((dsaProgress + coreProgress + aptitudeProgress + projectsProgress + mockProgress) / 5);

  const percentElement = document.querySelector('.percent');
  if (percentElement) {
    percentElement.textContent = `${overallMonthlyProgress}%`;
  }

  const monthBars = document.querySelectorAll('.monthbar .design');
  if (monthBars.length >= 2) {
    const projectBar = monthBars[0].querySelector('.progressbar');
    const projectDiv = monthBars[0].querySelector('.divide');
    if (projectDiv) projectDiv.textContent = `${projectCount.completed}`;
    if (projectBar) {
      projectBar.style.width = `${projectsProgress}%`;
      projectBar.style.backgroundColor = getProgressColor(projectsProgress);
    }

    const mockBar = monthBars[1].querySelector('.progressbar');
    const mockDiv = monthBars[1].querySelector('.divide');
    if (mockDiv) mockDiv.textContent = `${mockCount.completed}/10`;
    if (mockBar) {
      mockBar.style.width = `${mockProgress}%`;
      mockBar.style.backgroundColor = getProgressColor(mockProgress);
    }
  }
}

// ✅ Auto tracking and re-sync
window.addEventListener('DOMContentLoaded', () => {
  window.lastAptitudeProgress = getAptitudeProgress();
  setTimeout(() => {
    monitorAptitudeCheckboxes();
    updateAllProgress();
  }, 500);
  setInterval(updateAllProgress, 30000);
});

window.addEventListener('storage', (e) => {
  if (['aptVideoProgress', 'coreSubjectsProgress', 'aptitudeMockProgress', 'coreMockProgress'].includes(e.key)) {
    setTimeout(updateAllProgress, 100);
  }
});

window.addEventListener('focus', updateAllProgress);

window.addEventListener('aptitudeProgressUpdated', function(e) {
  console.log('Aptitude progress updated:', e.detail);
  setTimeout(updateAllProgress, 50);
});

// Direct monitoring for .apt-check elements (for live updates when on aptitude page)
function monitorAptitudeCheckboxes() {
  const aptCheckboxes = document.querySelectorAll('.apt-check');
  if (aptCheckboxes.length > 0) {
    aptCheckboxes.forEach(checkbox => {
      // Remove existing listeners to avoid duplicates
      checkbox.removeEventListener('change', handleAptitudeCheckboxChange);
      checkbox.removeEventListener('click', handleAptitudeCheckboxClick);
      // Listen for both click and change events
      checkbox.addEventListener('click', handleAptitudeCheckboxClick);
      checkbox.addEventListener('change', handleAptitudeCheckboxChange);
    });
  }
}

function handleAptitudeCheckboxClick() {
  // Small delay to ensure the checkbox state has been updated
  setTimeout(() => {
    const currentAptProgress = getAptitudeProgress();
    console.log('Aptitude checkbox clicked, new progress:', currentAptProgress);
    window.lastAptitudeProgress = currentAptProgress;
    updateAllProgress();
  }, 100);
}

function handleAptitudeCheckboxChange() {
  setTimeout(() => {
    const currentAptProgress = getAptitudeProgress();
    console.log('Aptitude checkbox changed, new progress:', currentAptProgress);
    window.lastAptitudeProgress = currentAptProgress;
    updateAllProgress();
  }, 50);
}

const aptitudeObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      const addedNodes = Array.from(mutation.addedNodes);
      const hasAptCheckboxes = addedNodes.some(node =>
        node.nodeType === 1 && (
          node.classList?.contains('apt-check') ||
          node.querySelector?.('.apt-check')
        )
      );
      if (hasAptCheckboxes) {
        setTimeout(monitorAptitudeCheckboxes, 100);
      }
    }
  });
});

aptitudeObserver.observe(document.body, { childList: true, subtree: true });

setInterval(() => {
  const currentAptProgress = getAptitudeProgress();
  const storedProgress = window.lastAptitudeProgress || 0;
  if (currentAptProgress !== storedProgress) {
    window.lastAptitudeProgress = currentAptProgress;
    updateAllProgress();
  }
}, 2000);


window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const storedUsername = localStorage.getItem("username");

  if (isLoggedIn === "true" && storedUsername) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("fake-loggin").style.display = "none";
    document.getElementById("usernameapp").innerText = storedUsername.toUpperCase();
  }

  // already existing
  window.lastAptitudeProgress = getAptitudeProgress();
  setTimeout(() => {
    monitorAptitudeCheckboxes();
    updateAllProgress();
  }, 500);
  setInterval(updateAllProgress, 30000);
});



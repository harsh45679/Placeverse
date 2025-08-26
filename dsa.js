
const dailyMotivations = [
  "🧠 Stack your doubts, queue your efforts, and sort your mindset!",
  "⚔ Face challenges like a binary search — divide and conquer.",
  "🚀 Optimize your mindset before you optimize your code.",
  "🔁 Don’t loop through failures — break and continue learning.",
  "📚 Life’s like recursion — it all returns back to you.",
  "🎯 Each wrong submission is just a test case in your journey.",
  "🛠 Hash your knowledge and access it in O(1) time — revise!",
  "🔥 When the going gets tough, apply dynamic programming — reuse your strength.",
  "🎢 Life is like a priority queue — handle what matters most.",
  "⏳ Brute force your way through confusion — then optimize with clarity.",
];

// Get today's base index
const todayIndex = new Date().getDate() % dailyMotivations.length;

// Function to wrap index
const wrapIndex = (i) => i % dailyMotivations.length;

// Set the quotes (looping through array if needed)
document.getElementById("quote1").innerText = dailyMotivations[wrapIndex(todayIndex)];
document.getElementById("quote2").innerText = dailyMotivations[wrapIndex(todayIndex + 1)];
document.getElementById("quote3").innerText = dailyMotivations[wrapIndex(todayIndex + 2)];
document.getElementById("quote4").innerText = dailyMotivations[wrapIndex(todayIndex + 3)];


// ✅ Restore overall progress ring immediately
(function restoreOverall() {
  const stored = parseInt(localStorage.getItem('overallProgress') || "0", 10);
  const circle = document.querySelector('.progress-ring__circle');
  const percentText = document.querySelector('.per');
  if (percentText) percentText.textContent = stored + "%";
  if (circle) {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (stored / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
})();

// ✅ SECTION TOGGLER
function toggleSections(clickedElement) {
  const topic = clickedElement.closest(".topic-1");
  const subSections = topic.querySelectorAll(".sub-1, .sub-2, .sub-3");
  const isVisible = subSections[0].style.display === "block";
  subSections.forEach(sub => {
    sub.style.display = isVisible ? "none" : "block";
  });
}

// ✅ INDIVIDUAL TOPIC LOGIC
document.querySelectorAll('.topic-1').forEach((topic, topicIndex) => {
  const videoCheck = topic.querySelector('.sub-2 .check');
  const sectionSpan = topic.querySelector('.sectionhead span');
  const progressBar = topic.querySelector('.bar .fill');
  const topicTick = topic.querySelector('.main .check');

  let totalQuestions = topic.querySelectorAll('.sub-3 .checkbox').length;
  let totalVideos = videoCheck ? 1 : 0;

  // ✅ Load saved state from localStorage
  const localKey = `topic-${topicIndex}`;
  const saved = JSON.parse(localStorage.getItem(localKey)) || { video: false, questions: [] };

  // ✅ VIDEO SECTION
  if (videoCheck && !videoCheck.querySelector('svg')) {
    videoCheck.innerHTML = getTickSVG(saved.video);
    videoCheck.dataset.checked = saved.video.toString();
    videoCheck.addEventListener('click', () => {
      const isChecked = videoCheck.dataset.checked === "true";
      videoCheck.dataset.checked = (!isChecked).toString();
      videoCheck.innerHTML = getTickSVG(!isChecked);
      save();
      update();
    });
  }

  // ✅ QUESTION CHECKBOXES
  topic.querySelectorAll('.sub-3 .checkbox').forEach((box, i) => {
    const isSaved = saved.questions[i] || false;
    box.innerHTML = getTickSVG(isSaved);
    box.dataset.checked = isSaved.toString();

    box.addEventListener('click', () => {
      const isChecked = box.dataset.checked === "true";
      box.dataset.checked = (!isChecked).toString();
      box.innerHTML = getTickSVG(!isChecked);
      save();
      update();
    });
  });

  // ✅ Save to localStorage
  function save() {
    const boxStates = Array.from(topic.querySelectorAll('.sub-3 .checkbox')).map(b => b.dataset.checked === "true");
    const videoState = (videoCheck && videoCheck.dataset.checked === "true");
    localStorage.setItem(localKey, JSON.stringify({ video: videoState, questions: boxStates }));
  }

  // ✅ PROGRESS CALCULATION
  function update() {
    let questionDone = 0;
    topic.querySelectorAll('.sub-3 .checkbox').forEach(box => {
      if (box.dataset.checked === "true") questionDone++;
    });

    const videoDone = (videoCheck && videoCheck.dataset.checked === "true") ? 1 : 0;
    const totalDone = questionDone + videoDone;
    const totalItems = totalQuestions + totalVideos;

    const percent = Math.floor((totalDone / totalItems) * 100);
    if (progressBar) {
      progressBar.style.width = percent + "%";
      progressBar.textContent = percent + "%";
      progressBar.style.marginLeft = "8px";
    }

    if (sectionSpan) sectionSpan.textContent = `${questionDone}/${totalQuestions}`;

    if (topicTick) {
      topicTick.innerHTML = (totalDone === totalItems) ? getTickSVG(true) : '';
    }

    updateOverallProgress();
  }

  update();
});

// ✅ OVERALL CIRCLE LOGIC
function updateOverallProgress() {
  const allCheckboxes = document.querySelectorAll('.sub-3 .checkbox');
  const total = allCheckboxes.length;
  let completed = 0;

  allCheckboxes.forEach(cb => {
    if (cb.dataset.checked === "true") completed++;
  });

  const percent = Math.floor((completed / total) * 100);

  // ✅ Store percent in localStorage
  localStorage.setItem('overallProgress', percent);

  const circle = document.querySelector('.progress-ring__circle');
  const percentText = document.querySelector('.per');
  if (percentText) percentText.textContent = percent + "%";
  if (circle) {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
}

// ✅ SVG TICK HELPER
function getTickSVG(show = true) {
  return show
    ? `<svg class="check-img" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke=" #d12125" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" style="display: block;">
        <path d="M20 6 9 17l-5-5"/>
      </svg>`
    : `<svg class="check-img" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke=" #d12125" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" style="display: none;">
        <path d="M20 6 9 17l-5-5"/>
      </svg>`;
}
document.querySelectorAll('.gapa a').forEach(a => a.setAttribute('target', '_blank'));




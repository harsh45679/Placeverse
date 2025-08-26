let count = 0;
let num = document.querySelector(".number");

// Load saved projects from localStorage
window.addEventListener("DOMContentLoaded", function () {
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
  savedProjects.forEach(proj => {
    renderProject(proj.name, proj.level, proj.overview, proj.purpose, proj.code);
  });
});

// Add new project
function addproject() {
  let projectname = prompt("Enter the project name");
  let projectlevel = prompt("Enter the project level (EASY, MEDIUM, HARD)");

  if (!projectname || projectname.trim() === "") {
    alert("Enter a valid project name");
    return;
  }

  projectlevel = projectlevel.toUpperCase();
  if (!["EASY", "MEDIUM", "HARD"].includes(projectlevel)) {
    alert("Enter a valid level: EASY, MEDIUM, or HARD");
    return;
  }

  renderProject(projectname, projectlevel, "", "", "");

  // Save to localStorage
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.push({
    name: projectname,
    level: projectlevel,
    overview: "",
    purpose: "",
    code: ""
  });
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Render project (new or from localStorage)
function renderProject(projectname, projectlevel, overviewText, purposeText, codeText) {
  let project1 = document.createElement("div");
  project1.className = "project-1";
  const projectId = "project-" + Date.now();
  project1.setAttribute("data-id", projectId);
  project1.innerHTML = `
    <div class="upper">
      <h1 class="name">${projectname}</h1>
      <div class="level">
        <h2 class="le">Level: <span class="leveltxt">${projectlevel}</span></h2>
      </div>
      <div class="dustbin">
        <svg class="d" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
          viewBox="0 0 24 24">
          <path stroke=" #00E5FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
        </svg>
      </div>
      <div class="expand">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00E5FF" class="exp"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
        </svg>
      </div>
    </div>

    <div class="sub-1">
      <label><h1 class="subhead">What is project overview? (paste)</h1></label>
      <textarea rows="5" cols="40" placeholder="Type something..." class="overview">${overviewText || ""}</textarea>
    </div>

    <div class="sub-2">
      <label><h1 class="subhead">What is project purpose? (paste)</h1></label>
      <textarea rows="5" cols="40" placeholder="Type something..." class="purpose">${purposeText || ""}</textarea>
    </div>

    <div class="sub-3">
      <label><h1 class="subhead">Paste your code here</h1></label>
      <textarea rows="5" cols="40" placeholder="Type something..." class="code">${codeText || ""}</textarea>
    </div>
  `;

  let main = document.querySelector(".projects");
  let btn = document.querySelector(".addie");
  main.insertBefore(project1, btn);

  count++;
  num.textContent = count;

  let ex = project1.querySelector(".expand");
  let sub1 = project1.querySelector(".sub-1");
  let sub2 = project1.querySelector(".sub-2");
  let sub3 = project1.querySelector(".sub-3");

  ex.addEventListener("click", function () {
    sub1.classList.toggle("active");
    sub2.classList.toggle("active");
    sub3.classList.toggle("active");
  });

  // Delete project
  let dustbin = project1.querySelector(".dustbin");
  dustbin.addEventListener("click", function () {
    project1.remove();
    count--;
    num.textContent = count;

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let updatedProjects = projects.filter(p => !(p.name === projectname && p.level === projectlevel));
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  });

  // Auto-save textareas when modified
  let overviewField = project1.querySelector(".overview");
  let purposeField = project1.querySelector(".purpose");
  let codeField = project1.querySelector(".code");

  const saveText = () => {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let updatedProjects = projects.map(p => {
      if (p.name === projectname && p.level === projectlevel) {
        return {
          ...p,
          overview: overviewField.value,
          purpose: purposeField.value,
          code: codeField.value
        };
      }
      return p;
    });
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  overviewField.addEventListener("input", saveText);
  purposeField.addEventListener("input", saveText);
  codeField.addEventListener("input", saveText);
}




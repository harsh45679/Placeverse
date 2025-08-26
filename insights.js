function toggleTopicSections(element) {
  console.log("Arrow clicked:", element);

  const topic = element.closest(".topic-1");
  const sections = topic.querySelectorAll(".sub-1, .sub-2, .sub-3, .sub-4, .sub-5");

  // Toggle display for each section
  sections.forEach(sec => {
    sec.style.display = (sec.style.display === "block") ? "none" : "block";
  });

  // Rotate the arrow
  const arrow = topic.querySelector(".exp");
  arrow.classList.toggle("rotated");
}
/**
 * Switch back and forth between Resume and CV versions of the resume
 * based on URL parameter
 */
(function() {
  const urlParams = new URLSearchParams(window.location.search);

  const cvOnlyElements = document.querySelectorAll(".cv-only");
  const resumeOnlyElements = document.querySelectorAll(".resume-only");

  if (urlParams.get("version") === "resume") {
    cvOnlyElements.forEach(elem => elem.setAttribute("hidden", ""));
    resumeOnlyElements.forEach(elem => elem.removeAttribute("hidden"));
  } else {
    resumeOnlyElements.forEach(elem => elem.setAttribute("hidden", ""));
    cvOnlyElements.forEach(elem => elem.removeAttribute("hidden"));
  }
})();
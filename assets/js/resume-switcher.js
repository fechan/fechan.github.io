/**
 * Switch back and forth between Resume and CV versions of the resume
 * based on URL parameter
 */
(function() {
  const urlParams = new URLSearchParams(window.location.search);

  const cvOnlyElements = document.querySelectorAll(".cv-only");
  const viewingCVNotice = document.getElementById("viewing-cv-notice");
  const viewingResumeNotice = document.getElementById("viewing-resume-notice");

  if (urlParams.get("version") === "resume") {
    cvOnlyElements.forEach(elem => elem.setAttribute("hidden", ""));
    viewingCVNotice.setAttribute("hidden", "");
    viewingResumeNotice.removeAttribute("hidden");
  } else {
    cvOnlyElements.forEach(elem => elem.removeAttribute("hidden"));
    viewingCVNotice.removeAttribute("hidden");
    viewingResumeNotice.setAttribute("hidden", "");
  }
})();
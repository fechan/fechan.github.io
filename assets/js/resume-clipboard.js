/**
 * Add "click to copy" function to elements with the "copyable" CSS class
 */
(function() {
  const COPYABLE_HOVER_CLASS = "copyable-hover";
  const COPYABLE_ACTIVE_CLASS = "copyable-active";

  document.querySelectorAll(".copyable").forEach(elem => {
    elem.addEventListener("mousedown", event => {
      event.stopPropagation();
      navigator.clipboard.writeText(elem.textContent);
      elem.classList.add(COPYABLE_ACTIVE_CLASS);
    });

    elem.addEventListener("mouseup", event => {
      elem.classList.remove(COPYABLE_ACTIVE_CLASS);
    });

    elem.addEventListener("mouseover", event => {
      event.stopPropagation();
      elem.classList.add(COPYABLE_HOVER_CLASS);
    });

    elem.addEventListener("mouseout", event => {
      event.stopPropagation();
      elem.classList.remove(COPYABLE_HOVER_CLASS);
    });
  });
})();
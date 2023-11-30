/**
 * Add "click to copy" function to elements with the "copyable" CSS class
 */
(function() {
  const COPYABLE_HOVER_CLASS = "copyable-hover";
  const COPYABLE_ACTIVE_CLASS = "copyable-active";

  document.querySelectorAll(".copyable").forEach(elem => {
    elem.addEventListener("mousedown", event => {
      if (event.button !== 0 || event.altKey) return;

      event.stopPropagation();
      navigator.clipboard.writeText(extractText(elem));
      elem.classList.add(COPYABLE_ACTIVE_CLASS);
    });

    elem.addEventListener("mouseup", event => {
      setTimeout(() => {
        elem.classList.remove(COPYABLE_ACTIVE_CLASS);
      }, 700);
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

  /**
   * Extract and process text from an HTML element in a human-readable way
   * @param {HTMLElement} elem Element whose text to extract
   * @returns Text content
   */
  function extractText(elem) {
    let elemCopy = elem.cloneNode(true);

    // add dashes before list items that have no child list items
    elemCopy.querySelectorAll("li").forEach(li => {
      if (li.querySelectorAll("li").length === 0) li.textContent = "- " + li.textContent
    });

    let text = elemCopy.textContent
      .replace(/^ +/gm, "") // strip leading spaces from each line
      .replace(/^\n+|\n+$/g, "") // strip leading & trailing newlines from entire text block
      .replace(/\n{3,}/g, "\n\n"); // replace 3+ consecutive newlines with 2 newlines
    return text;
  }
})();
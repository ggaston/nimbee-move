(function () {
  const spotEls = document.querySelectorAll('[data-behavior="popper-open"]');

  spotEls.forEach((element) => {
    element.addEventListener("mouseover", showPopper);
    element.addEventListener("mouseleave", hidePopper);
  });

  function showPopper(evt, target) {
    const targetEl = evt.currentTarget;

    if (
      targetEl.dataset.behavior === "popper-open" &&
      targetEl.dataset.target
    ) {
      const popperEl = document.getElementById(targetEl.dataset.target);
      const rect = targetEl.getBoundingClientRect()
      
      popperEl.style.left = rect.left + 64 + 'px'; 
      popperEl.classList.add("visible");
      popperEl.style.top = rect.top - popperEl.clientHeight + 25 + 'px';
    }
  }

  function hidePopper(evt, target) {
    const targetEl = evt.currentTarget;
    let popperEl = null;

    if (
      targetEl.dataset.behavior === "popper-open" &&
      targetEl.dataset.target
    ) {
      popperEl = document.getElementById(targetEl.dataset.target);
      popperEl.style.top = '-400px'
      popperEl.classList.remove("visible");
    }
  }
})();


const spotEls = document.querySelectorAll('[data-behavior="popper-open"]');

spotEls.forEach((element) => {
  element.addEventListener("mouseover", showPopper);
  element.addEventListener("mouseleave", hidePopper);
});

function showPopper(evt, target) {
  const targetEl = target || evt.currentTarget;

  // Hide open poppers
  let openPoppers = document.querySelectorAll(".popper.is-visible");
  openPoppers.forEach((el) => {
    const target = document.querySelector('[data-target="' + el.id + '"]');
    hidePopper(null, target);
  });

  if (
    targetEl.dataset.behavior === "popper-open" &&
    targetEl.dataset.target
  ) {
    const popperEl = document.getElementById(targetEl.dataset.target);
    const rect = targetEl.getBoundingClientRect()

    targetEl.classList.add('active')
    popperEl.style.left = rect.left + 64 + 'px'; 
    popperEl.classList.add("is-visible");
    popperEl.style.top = rect.top - popperEl.clientHeight + 25 + 'px';
  }
}

function hidePopper(evt, target) {
  const targetEl = target|| evt.currentTarget;
  let popperEl = null;

  if (
    targetEl.dataset.behavior === "popper-open" &&
    targetEl.dataset.target
  ) {
    targetEl.classList.remove('active')
    popperEl = document.getElementById(targetEl.dataset.target);
    popperEl.style.top = '-400px'
    popperEl.classList.remove("is-visible");
  }
}


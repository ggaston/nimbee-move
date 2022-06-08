const spotEls = document.querySelectorAll('[data-behavior="popper-open"]');
let transitionTimeout = null

spotEls.forEach((element) => {
	//Bind events
	element.addEventListener('click', showPopper);
	element.addEventListener('mouseleave', hidePopper);

	// Set initial position of poppers
	requestAnimationFrame(() => {
		const popperEl = document.getElementById(element.dataset.target);
		popperEl.style.top = element.offsetTop - 290 + 'px';
		//console.log(element.offsetTop, element)
	});
});

function showPopper(evt, target) {
	const targetEl = target || evt.currentTarget;
	//console.log('show popper')

	if (targetEl.dataset.behavior === 'popper-open' && targetEl.dataset.target) {
		const popperEl = document.getElementById(targetEl.dataset.target);

		if (!popperEl.classList.contains('is-visible')) {
			targetEl.classList.add('active');
			popperEl.classList.add('is-block');
			popperEl.clientHeight;

			popperEl.classList.add('is-visible');
			popperEl.style.left = targetEl.offsetLeft - 130 + 'px';
			popperEl.style.top = targetEl.offsetTop - popperEl.clientHeight - 20 + 'px';
			console.log('show popper');
		}
	}
}

function hidePopper(evt, target) {
	const targetEl = target || evt.currentTarget;
	let popperEl = null;

	if (transitionTimeout) {
		resetTimeout(transitionTimeout)
	}

	if (targetEl.dataset.behavior === 'popper-open' && targetEl.dataset.target) {
		// Remove pagination highlight
		pages.highlight(null);

		targetEl.classList.remove('active');
		popperEl = document.getElementById(targetEl.dataset.target);
		if (popperEl.classList.contains('is-visible')) {
			popperEl.style.top = null;
			popperEl.classList.remove('is-visible');

			// On transition end make it invisible, remove from display and set original top position
			transitionTimeout = setTimeout(() => {
				popperEl.classList.remove('is-block');
				popperEl.style.top = targetEl.offsetTop - 290 + 'px';
			}, 200);


			// TODO: not working without proper condition, is fired on each mouseleave
			// popperEl.ontransitionend = () => {
			// 	popperEl.classList.remove('is-block');
			// 	popperEl.style.top = targetEl.offsetTop - 290 + 'px';
			// };
			// popperEl.ontransitioncancel = () => {
			// 	popperEl.classList.remove('is-block');
			// 	popperEl.style.top = targetEl.offsetTop - 290 + 'px';
			// };
		}
	}
}

function clearPoppers() {
	// Hide open poppers
	let openPoppers = document.querySelectorAll('.popper.is-visible');
	openPoppers.forEach((el) => {
		const target = document.querySelector('[data-target="' + el.id + '"]');
		hidePopper(null, target);
	});
}

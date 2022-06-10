const spotEls = document.querySelectorAll('[data-behavior="popper-open"]');
let transitionTimeout = null

// FIXME: Temporary use map of initial heights of poppers

const popperHeightMap = {
	'popper-truck' : 217,
	'popper-cargo' : 209,
	'popper-driver' : 243,
	'popper-app' : 272,
	'popper-charging' : 167,
	'popper-request' : 280,
	'popper-battery' : 310,
	'popper-ev' : 235,
}

spotEls.forEach((element, index) => {
	//Bind spot events
	element.addEventListener('click', showPopper);
	element.addEventListener('mouseleave', hidePopper);

	// Set initial position of poppers. Each of the popper should be close to the specific position of spot.
	requestAnimationFrame(() => {
		const popperEl = document.getElementById(element.dataset.target);
		popperEl.style.top = element.offsetTop - popperHeightMap[element.dataset.target] + 'px';
		//console.log(element.offsetTop, element)
	});
});

function showPopper(evt, target) {
	const targetEl = target || evt.currentTarget;
	//console.log('show popper')

	if (targetEl.dataset.behavior === 'popper-open' && targetEl.dataset.target) {
		const popperEl = document.getElementById(targetEl.dataset.target);
		let mode = document.documentElement.dataset.mode

		if (!popperEl.classList.contains('is-visible')) {
			targetEl.classList.add('active');
			popperEl.classList.add('is-block');
			popperEl.clientHeight;

			popperEl.classList.add('is-visible');
			document.documentElement.dataset.mode = mode + " hasPopper";
			// TODO: read width/height of popper from DOM
			const rect = targetEl.getBoundingClientRect()
			const spotWidthOffset = 28
			const popperSpotMargin = 20
			const headerHeight = 86
			const x = targetEl.offsetLeft - popperEl.clientWidth / 2 + spotWidthOffset 
			const y = targetEl.offsetTop - popperEl.clientHeight - 20

			const boundX = rect.x - popperEl.clientWidth / 2
			const boundY = rect.y - popperEl.clientHeight - popperSpotMargin - headerHeight

			console.log(rect.x - popperEl.clientWidth / 2)
			console.log(rect.y - popperEl.clientHeight - popperSpotMargin - headerHeight)

			// If popper renders outside of the viewport boundaries adjust calculation
			popperEl.style.left = (boundX > 0 ? x : x - boundX) + 'px';
			// popperEl.style.top = (boundY > 0 ? y : y - boundY) + 'px';
			popperEl.style.top = y + 'px';

			showHeadline(targetEl.dataset.target.replace('popper-', ''))
			console.log('show popper');
		}
	}
}

function hidePopper(evt, target) {
	const targetEl = target || evt.currentTarget;
	let mode = document.documentElement.dataset.mode
	let popperEl = null;

	if (transitionTimeout) {
		clearTimeout(transitionTimeout)
	}

	if (targetEl.dataset.behavior === 'popper-open' && targetEl.dataset.target) {
		// Remove pagination highlight
		pages.highlight(null);

		targetEl.classList.remove('active');
		popperEl = document.getElementById(targetEl.dataset.target);
		if (popperEl.classList.contains('is-visible')) {
			popperEl.style.top = null;
			popperEl.classList.remove('is-visible');

			document.documentElement.dataset.mode = mode.replace(' hasPopper', '')

			// On transition end make it invisible, remove from display and set original top position
			transitionTimeout = setTimeout(() => {
				popperEl.classList.remove('is-block');
				popperEl.style.top = targetEl.offsetTop - popperHeightMap[targetEl.dataset.target] + 'px';
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
	let mode = document.documentElement.dataset.mode
	let openPoppers = document.querySelectorAll('.popper.is-visible');
	
	document.documentElement.dataset.mode = mode.replace(' hasPopper', '')
	openPoppers.forEach((el) => {
		const target = document.querySelector('[data-target="' + el.id + '"]');
		hidePopper(null, target);
	});
}

function showHeadline(id) {
	const headlineEl = document.getElementById('headline-' + id)
	const headlineEls = document.querySelectorAll('.content .headline[data-behavior="fade-in"]')

	headlineEls.forEach((el) => {
		el.classList.remove('is-block')
		el.classList.remove('is-visible')
	})

	headlineEl.classList.add('is-block')
	headlineEl.clientHeight
	headlineEl.classList.add('is-visible')
}

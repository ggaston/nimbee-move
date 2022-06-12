const spottery = {
	init: function (selector = '[data-behavior="spot"]', opts) {
		const defaults = {
			spotSelector: selector,
			spotControlSelector: '[data-behavior="spot-control"]',
			spotControlSelectorPrev: '[data-behavior="spot-control-prev"]',
			spotControlSelectorNext: '[data-behavior="spot-control-next"]',
			spotContentSelector: '[data-behavior="spot-content"]',
			animateClassName: 'is-animated',
			activeClassName: 'is-active',
			spotNav: '',
		};
		//debugger
		const options = (this.options = { ...defaults, ...opts });

		this.options.spots = document.querySelectorAll(options.spotSelector);
		const spotContents = (this.options.spotContents = document.querySelectorAll(
			options.spotContentSelector
		));
		const controls = (this.options.controls = document.querySelectorAll(
			options.spotControlSelector
		));

		const controlsNext = (this.options.controlsNext = document.querySelectorAll(
			options.spotControlSelectorNext
		));
		const controlsPrev = (this.options.controlsPrev = document.querySelectorAll(
			options.spotControlSelectorPrev
		));

		// TODO: Enable Bind clickout events
		document.addEventListener('click', this.clickOut.bind(this));

		// Bind spot events
		controls.forEach((el) => {
			//console.log('control: ', el)
			//el.addEventListener("click", this.addAnimationClass.bind(this));
			el.addEventListener('click', this.showSpotContent.bind(this));
		});

		if (controlsNext.length && controlsPrev.length) {
			controlsNext.forEach((el) => {
				el.addEventListener('click', this.next.bind(this));
			});
			controlsPrev.forEach((el) => {
				el.addEventListener('click', this.prev.bind(this));
			});
		}

        // Bind arrow events
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                // Left Key pressed!
                case 'ArrowLeft':
                    this.prev()
                    break;
                // Right Key pressed!
                case 'ArrowRight':
                    this.next()
                    break;
            }
        }); 

		// Update spot content positions. Prevent opening content outside of viewport. Tweak x position.
		requestAnimationFrame(() => {
			document.querySelector('.content h1').classList.add('is-animated');
			spotContents.forEach((contentEl, index) => {
				const el = contentEl.firstElementChild;
				const rect = el.getBoundingClientRect();
				const pos = {
					x: rect.x - el.clientWidth / 2,
				};
				pos.y = rect.y;

				const translateX =
					pos.x > 0
						? pos.x + el.clientWidth > window.innerWidth
							? pos.x - rect.x + (window.innerWidth - (pos.x + el.clientWidth))
							: pos.x - rect.x
						: -pos.x - el.clientWidth / 2;

				contentEl.style.transform = 'translateX(' + translateX + 'px)';
			});
		});
	},
	current: -1,
	// One time on page load.
	// To prevent animations on load another class is required.
	addAnimationClass: function (evt, targetControl) {
		const options = this.options;
		const target = evt ? evt.currentTarget : targetControl;
		console.log(evt);
		const spot = target.closest(options.spotSelector);
		const content = spot
			? spot.querySelector(options.spotContentSelector)
			: this.contentLookup(target);

		if (content) {
			content.classList.add(options.animateClassName);
			target.removeEventListener('click', this.addAnimationClass);
		}
	},

	showSpotContent: function (evt, targetEl) {
		const options = this.options;
		const el = evt ? evt.currentTarget : targetEl;

		// Find spot container element
		const spot = this.spotLookup(el);
		const content = this.contentLookup(el);

		// Looking for 2 types of elements: 1. active spot and 2. active spot controls
		let activeEls = document.querySelectorAll(
			options.spotSelector +
				'.' +
				options.activeClassName +
				',' +
				options.spotControlSelector +
				'.' +
				options.activeClassName
		);

		// Detect elemenets already with spot content visible
		const notActive = spot.classList.contains(options.activeClassName) ? false : true;
		let current;
		const spots = options.spots.entries();

		for (item of spots) {
			if (spot.isEqualNode(item[1])) {
				current = item[0];
			}
		}

        // TODO: refactor blinking spot switch when spot open
        document.getElementById('spot-container').classList.remove('has-open-spot')

		//Prepare transitions, animations. Normally elements not have transitions attached
		this.addAnimationClass(evt, targetEl);

		// Switch all active spots to inactive state
		activeEls.forEach((el) => {
			el.classList.remove(options.activeClassName);
		});

		// Add active only if it is not active
		if (notActive) {
            // TODO: refactor blinking spot switch when spot open
            document.getElementById('spot-container').classList.add('has-open-spot')
			spot.classList.add(options.activeClassName);
			el.classList.add(options.activeClassName);
			this.current = current;
            // Effects on H1 outside of pottery
            fadein(document.querySelector('h1 .fade-in'), this.current);
            this.higlightNavItem()
		}

	},

    // Update navigation/pagination active items
    higlightNavItem: function(){
        const options = this.options
        const current = this.current
        const currentId = options.spots[current].id;
        const bindedEls = document.querySelectorAll(
            options.spotControlSelector + '[data-bind="#' + currentId + '"]'
        );

        this.setActive(bindedEls);
    },

	spotLookup: function (el) {
		const options = this.options;
		// Try to find parent spot element, otherwise return target element itself
		let spot = el.closest(options.spotSelector);
		const content = this.contentLookup(el);

		if (content) {
			spot = content.closest(options.spotSelector);
		}

		return spot;
	},

	contentLookup: function (el) {
		const options = this.options;
		let contentAttr = el.dataset.bind;

		const content = contentAttr
			? document.querySelector(contentAttr).dataset.behavior === 'spot-content'
				? document.querySelector(contentAttr)
				: document
						.querySelector(contentAttr)
						.querySelector('[data-behavior="spot-content"]')
			: el.querySelector(options.spotContentSelector);

		return content;
	},

	clickOut: function (evt) {
		const options = this.options;
		let activeEls = document.querySelectorAll('.' + options.activeClassName);

		// accept spot-control[-]
		if (evt.target.closest('[data-behavior^="spot-control"]')) {
			return;
		} else {
			activeEls.forEach((el) => {
				el.classList.remove(options.activeClassName);
			});
            // TODO: refactor blinking spot switch when spot open
            document.getElementById('spot-container').classList.remove('has-open-spot')
		}
	},

	next: function () {
		const options = this.options;
		const spots = options.spots;
		let current = this.current;

		// SET NEW ACTIVE SPOT (current)
		current = this.current = spots.length - 1 > current ? current + 1 : 0;

		const control = spots[current].querySelector(options.spotControlSelector);

		this.showSpotContent(null, control);

        // Update navigation/pagination active items
        this.higlightNavItem()

		return current;
	},

	prev: function () {
		const options = this.options;
		const spots = options.spots;
		let current = this.current;

		current = this.current = current < 1 ? spots.length - 1 : current - 1;
        const control = spots[current].querySelector(options.spotControlSelector);

		this.showSpotContent(null, control);

        // Update navigation/pagination active items
        this.higlightNavItem()

		return current;
	},
	clearActive: function (el) {
		const options = this.options;
		const elem = el ? el : document;
		// TODO: Remove hardcoded selector to opts
		const activeEls = elem.querySelectorAll(
			'[data-behavior*="spot"].' + options.activeClassName
		);

		activeEls.forEach((el) => {
			el.classList.remove(options.activeClassName);
		});
        // TODO: refactor blinking spot switch when spot open
        document.getElementById('spot-container').classList.remove('has-open-spot')
	},
	setActive: function (els) {
        console.log('setActive: ', els)
		els.forEach((el) => {
			el.classList.add(this.options.activeClassName);
		});
	},
};

const nimbee_spots = Object.assign(spottery);
nimbee_spots.init();

function fadein(el, index) {
	let els = el.parentNode.children;
	const foreach = Array.prototype.forEach;
	//console.log(els);

	foreach.call(els, (el) => {
		el.classList.remove('fade-in');
	});

	els[index].classList.add('fade-in');
}

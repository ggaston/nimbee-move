let pagination = {
  init: function (opts) {
    const self = this;
    const options = opts || {
      pages: '[data-behavior="pagination"]',
      controls: {
        prev: '[data-behavior="pagination-control-prev"]',
        next: '[data-behavior="pagination-control-next"]',
      },
    };

    // Collect pages
    let pages = document.querySelectorAll(options.pages);
    this.pages = pages;

    // Collect controls
    const prev = (this.controls.prev = document.querySelector(
      options.controls.prev
    ));
    const next = (this.controls.next = document.querySelector(
      options.controls.next
    ));

    console.log(pages);
    console.log(this.controls);

    // Bind events
    pages.forEach(function (element, index) {
      element.parentElement.addEventListener("click", function (event) {
        self.show(event, index);
      });
    });

    prev.addEventListener("click", self.prev.bind(this));
    next.addEventListener("click", self.next.bind(this));

    return this;
  },
  controls: {},
  pages: [],
  current: -1,
  next: function (evt) {
    if (this.current < this.pages.length - 1) {
      this.highlight(null);
      const current = (this.current += 1);
      console.log("next: " + this.current);

      this.show(null, current);
      this.highlight(current);
    } else {
      // infinite loop to first item
      this.highlight(null);
      this.current = -1;
      this.next(null);
    }

    return this.current;
  },

  prev: function (evt) {
    const current = this.current;

    if (current > 0) {
        this.highlight(null);
      this.current -= 1;
      this.show(null, this.current);
      this.highlight(this.current);
    } else {
      this.highlight(null);
      this.current = this.pages.length;
      this.prev(null);
    }

    console.log("prev: " + this.current);

    return this.current;
  },
  show: function (evt, index) {
    const selectedPage = this.current;
    const selectedPageId = selectedPage !== -1 ? this.pages[selectedPage].dataset.target : null;
    const id = this.pages[index].dataset.target;
    const selectedEl = document.getElementById(selectedPageId);
    const el = document.getElementById(id);

    console.log("show: " + selectedPage);

    // Clear all open poppers
    if (selectedEl) {
      clearPoppers()
    }

    // highlight pagination
    this.highlight(index);

    // update state of selected popper
    this.current = index;

    // Open new popper
    showPopper(null, el); // TODO: make Popper object
  },

  highlight: function (index) {
    if (this.current > -1 && this.current < this.pages.length) {
      console.log("highlight remove: " + index);
      this.pages[this.current].parentNode.classList.remove("active");
    }

    if (index > 0 || index === 0) {
      console.log("highlight: " + index);
      this.pages[index].parentNode.classList.add("active");
    }
  },
};

const pages = pagination.init();

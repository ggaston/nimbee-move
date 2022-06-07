(function(){
    let pagination = {
        init: function(opts) {
            const self = this
            const options = opts || {
                pages: '[data-behavior="pagination"]',
                controls: {
                    prev: '[data-behavior="pagination-control-prev"]',
                    next: '[data-behavior="pagination-control-next"]'
                }
            }

            // Collect pages
            let pages = document.querySelectorAll(options.pages)
            this.pages = pages

            // Collect controls
            const prev = this.controls.prev = document.querySelector(options.controls.prev)
            const next = this.controls.next = document.querySelector(options.controls.next)

            console.log(pages)
            console.log(this.controls)

            // Bind events
            pages.forEach(function(element, index){
                element.parentElement.addEventListener('click', function(event) {
                        self.show(event, index)
                    }
                )
            });

            return this
        },
        controls: {},
        pages: [],
        current: 0,
        next: function(){
            this.current += 1
            console.log('next: ' + this.current)
            this.show(this.current)
            this.highlight(this.current)
            return this.current
        },
        prev: function() {
            const current = this.current
            
            if (current > 0) {
                this.current -= 1
            }
            
            console.log('prev: ' + this.current)
    
            return this.current
        },
        show: function(evt, index) {
            const current = this.current
            const currentId = this.pages[current].dataset.target
            const id = this.pages[index].dataset.target
            const currentEl = document.getElementById(currentId)
            const el = document.getElementById(id)
            
            console.log('show: ' + current)
            
            // Hide current
            hidePopper(evt, currentEl)
            // Open new
            showPopper(evt, el) // TODO: make Popper object
            this.current = index
        },
        highlight: function(item){
            console.log('highlight: ' + item)
        }
    }

    const pages = pagination.init()

    pages.prev()

})()
const timeline = gsap.timeline({ repeat: -1 });
const spotlightEl = document.getElementById('spotlight')

timeline
  .to("#spotlight", {
    "--spotlight-x": '41%',
    "--spotlight-y": '40%',
    duration: 3,
    delay: 2,
    onStart: (e) => {
        const prevSpotEl = document.getElementById('spot-truck')
        const currentSpotEl = document.getElementById('spot-request')
        prevSpotEl.classList.remove('active')
        setTimeout(() => {
            currentSpotEl.classList.add('active')
        }, 2000)
        
    }
  })
  .to("#spotlight", {
    "--spotlight-x": '71%',
    "--spotlight-y": '65%',
    duration: 2,
    delay: 5,
    onStart: (e) => {
        const prevSpotEl = document.getElementById('spot-request')
        const currentSpotEl = document.getElementById('spot-ev')
        prevSpotEl.classList.remove('active')
        setTimeout(() => {
            currentSpotEl.classList.add('active')
        }, 1000)
    }
  })
  .to("#spotlight", {
    "--spotlight-x": '11%',
    "--spotlight-y": '30%',
    duration: 3,
    delay: 5,
    onStart: (e) => {
        const prevSpotEl = document.getElementById('spot-ev')
        const currentSpotEl = document.getElementById('spot-truck')
        prevSpotEl.classList.remove('active')
        setTimeout(() => {
            currentSpotEl.classList.add('active')
        }, 2000)
    }
  });


window.addEventListener('mousemove', (evt) => {
    // TODO: Remove active classes from spots
    spotlightEl.style.display = 'none';
    timeline.pause()
})
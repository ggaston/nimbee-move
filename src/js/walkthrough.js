let walkthrough = gsap.timeline({ repeat: -1 });
const btn = document.getElementById('btn-walkthrough')

btn.addEventListener('click', startWalkthrough)

function startWalkthrough(evt) {
    if (walkthrough.isActive()) {
        walkthrough.pause()
        clearTimeout(spotlightTimeout);
        // Mark <html> data attribute about animation state
        document.documentElement.dataset.mode = "";
        // Make walkthrough button inactive
        btn.classList.remove('active')
    } else {
        // Mark <html> data attribute about animation state
        document.documentElement.dataset.mode = "walkthrough";
        // Make walkthrough button active
        btn.classList.add('active')
        walkthrough.resume()
    }
}

walkthrough
    .to('#btn-walkthrough', {
        duration: 5,
        delay: 0.5,
        onStart: (e) => {
            pagination.next()
        }
    })

walkthrough.pause()    
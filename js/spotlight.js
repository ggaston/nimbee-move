let spotlight = gsap.timeline({ repeat: -1 });
const spotlightEl = document.getElementById("spotlight");
let spotlightTimeout;

// Mark <html> data attribute about animation state
document.documentElement.dataset.mode = "spotlight";

spotlight
  .to("#spotlight", {
    "--spotlight-x": "34%",
    "--spotlight-y": "62%",
    duration: 1,
    delay: 6,
    onStart: () => {
      onStartEffects('spot-driver', 'spot-app', 500)
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "50%",
    "--spotlight-y": "66%",
    duration: 1,
    delay: 6,
    onStart: () => {
      onStartEffects('spot-app', 'spot-battery', 500)
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "44%",
    "--spotlight-y": "54%",
    duration: 1,
    delay: 6,
    onStart: () => {
      onStartEffects('spot-battery', 'spot-charging', 500)
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "72%",
    "--spotlight-y": "50%",
    duration: 1,
    delay: 3,
    onStart: () => {
      onStartEffects('spot-charging', 'spot-request', 500)
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "21%",
    "--spotlight-y": "62%",
    duration: 1,
    delay: 6,
    onStart: () => {
      onStartEffects('spot-request', 'spot-cargo', 500)
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "8%",
    "--spotlight-y": "62%",
    duration: 1,
    delay: 6,
    onStart: () => {
      onStartEffects('spot-cargo', 'spot-truck', 500)
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "74%",
    "--spotlight-y": "72%",
    duration: 1,
    delay: 6,
    onStart: () => {
      onStartEffects('spot-truck', 'spot-ev', 500)
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "35%",
    "--spotlight-y": "72%",
    duration: 1,
    delay: 6,
    onStart: () => {
      onStartEffects('spot-ev', 'spot-driver', 500)
    },
  })
  

window.addEventListener("mousemove", resetTimeout);
window.addEventListener("click", resetTimeout);

// Bind arrow events
document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
    switchToInteractive()
  }
})

function switchToInteractive(){
    nimbee_spots.clearActive()
  
    // Mark <html> data attribute about animation state
    document.documentElement.dataset.mode = "interactive";
  
    spotlightEl.style.opacity = 0;
  
    spotlight.pause();
    trackMouse();
}

function resetTimeout(e) {
    // Spotlight dismiss only once
    if (spotlightTimeout) {
      clearTimeout(spotlightTimeout);
      spotlightTimeout = null;
      trackMouse();

      return;
    }
    switchToInteractive()
  }

function trackMouse() {
  //console.log('spotlightTimeout: ' + spotlightTimeout)
  if (!spotlightTimeout) {
    spotlightTimeout = setTimeout(() => {
      spotlightEl.style.zIndex = 4; // FIXME: in some cases higher z-index persist in interactive mode
      spotlightEl.style.opacity = 1;

      // Clear active states
      nimbee_spots.clearActive()

      // Restart playback
      spotlight.resume();

      // Reset timeout
      spotlightTimeout = null;

      // Mark <html> data attribute with animation state
      document.documentElement.dataset.mode = "spotlight";
    }, 25000);
  }
}

function onStartEffects(prevId, nextId, delay) {
      const prevSpotEl = document.getElementById(prevId);
      const currentSpotEl = document.getElementById(nextId);
      const children = currentSpotEl.parentElement.children;
      const foreach = Array.prototype.forEach
      let index = 0
      
      foreach.call(children, (child, idx) => {
        if (child.isEqualNode(currentSpotEl)) {
          index = idx
        }
      })

      prevSpotEl.querySelector('[data-behavior="spot-control"]').classList.remove("is-active");
      setTimeout(() => {
        currentSpotEl.querySelector('[data-behavior="spot-control"]').classList.add("is-active");
        // Change headline
        fadein(document.querySelector('h1 .fade-in'), index)
      }, delay);
}

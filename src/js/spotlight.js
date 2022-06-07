let spotlight = gsap.timeline({ repeat: -1 });
const spotlightEl = document.getElementById("spotlight");
let spotlightTimeout;

// Mark <html> data attribute about animation state
document.documentElement.dataset.mode = "spotlight";

spotlight
  .to("#spotlight", {
    "--spotlight-x": "41%",
    "--spotlight-y": "40%",
    duration: 3,
    delay: 2,
    onStart: () => {
      onStartEffects('spot-truck', 'spot-request', 2000)
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "71%",
    "--spotlight-y": "65%",
    duration: 2,
    delay: 5,
    onStart: () => {
      onStartEffects('spot-request', 'spot-ev', 1000)
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "11%",
    "--spotlight-y": "30%",
    duration: 3,
    delay: 5,
    onStart: () => {
      onStartEffects('spot-ev', 'spot-truck', 2000)
    },
  });

window.addEventListener("mousemove", resetTimeout);
window.addEventListener("click", resetTimeout);

function resetTimeout() {
    // Cancel timeout if walkthrough
    if (document.documentElement.dataset.mode === "walkthrough") {
        clearTimeout(spotlightTimeout);
        spotlightTimeout = null;
        return;
    }
  
    // Spotlight dismiss only once
    if (spotlightTimeout) {
      //console.log('mousemove: ' + spotlightTimeout)
      clearTimeout(spotlightTimeout);
      spotlightTimeout = null;
      trackMouse();
      return;
    }
  
    const spotEls = document.querySelectorAll(".spot");
    spotEls.forEach((el) => el.classList.remove("active"));
  
    // Mark <html> data attribute about animation state
    document.documentElement.dataset.mode = "interactive";
  
    spotlightEl.style.opacity = 0;
    //Hide spotlight
    spotlightEl.ontransitionend = (evt) => {
      console.log("opacity: " + spotlightEl.style.opacity);
      if (spotlightEl.style.opacity === "0") {
        spotlightEl.style.zIndex = -1;
      }
    };
  
    spotlight.pause();
    //spotlight.stop();
    trackMouse();
  }

function trackMouse() {
  console.log('spotlightTimeout: ' + spotlightTimeout)
  if (!spotlightTimeout) {
    spotlightTimeout = setTimeout(() => {
      spotlightEl.style.zIndex = 4;
      spotlightEl.style.opacity = 1;

      // Hide open poppers
      let openPoppers = document.querySelectorAll(".popper.is-visible");
      openPoppers.forEach((el) => {
        const target = document.querySelector('[data-target="' + el.id + '"]');
        hidePopper(null, target);
      });

      // Restart playback
      spotlight.resume();

      // Reset timeout
      spotlightTimeout = null;

      // Mark <html> data attribute with animation state
      document.documentElement.dataset.mode = "spotlight";
    }, 5000);
  }
}

function onStartEffects(prevId, nextId, delay) {
      const prevSpotEl = document.getElementById(prevId);
      const currentSpotEl = document.getElementById(nextId);
      prevSpotEl.classList.remove("active");
      setTimeout(() => {
        currentSpotEl.classList.add("active");
      }, delay);
}

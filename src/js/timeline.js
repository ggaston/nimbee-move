let timeline = gsap.timeline({ repeat: -1 });
const spotlightEl = document.getElementById("spotlight");
let timeout;

// Mark <html> data attribute about animation state
document.documentElement.dataset.mode = "spotlight";

timeline
  .to("#spotlight", {
    "--spotlight-x": "41%",
    "--spotlight-y": "40%",
    duration: 3,
    delay: 2,
    onStart: (e) => {
      const prevSpotEl = document.getElementById("spot-truck");
      const currentSpotEl = document.getElementById("spot-request");
      prevSpotEl.classList.remove("active");
      setTimeout(() => {
        currentSpotEl.classList.add("active");
      }, 2000);
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "71%",
    "--spotlight-y": "65%",
    duration: 2,
    delay: 5,
    onStart: (e) => {
      const prevSpotEl = document.getElementById("spot-request");
      const currentSpotEl = document.getElementById("spot-ev");
      prevSpotEl.classList.remove("active");
      setTimeout(() => {
        currentSpotEl.classList.add("active");
      }, 1000);
    },
  })
  .to("#spotlight", {
    "--spotlight-x": "11%",
    "--spotlight-y": "30%",
    duration: 3,
    delay: 5,
    onStart: (e) => {
      const prevSpotEl = document.getElementById("spot-ev");
      const currentSpotEl = document.getElementById("spot-truck");
      prevSpotEl.classList.remove("active");
      setTimeout(() => {
        currentSpotEl.classList.add("active");
      }, 2000);
    },
  });

window.addEventListener("mousemove", (evt) => {
  // Spotlight dismiss only once
  if (timeout) {
    //console.log('mousemove: ' + timeout)
    clearTimeout(timeout);
    timeout = null;
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
      //spotlightEl.style.display = 'none';
    }
  };

  timeline.pause();
  //timeline.stop();
  trackMouse();
});

function trackMouse() {
  //console.log('timeout: ' + timeout)
  if (!timeout) {
    timeout = setTimeout(() => {
      spotlightEl.style.zIndex = 4;
      spotlightEl.style.opacity = 1;
      timeline.resume();
      timeout = null;

      // Mark <html> data attribute about animation state
      document.documentElement.dataset.mode = "spotlight";
    }, 5000);
  }
}

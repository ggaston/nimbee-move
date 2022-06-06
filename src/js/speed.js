const overlayEl = document.getElementById('overlay')

function spotlightMove(destination, duration, delay = 0) {
    let x = 0
    let y = 0
    let startTime = 0
    
    function tick(time){
        if (!startTime) {
            startTime = time
        }

        overlayEl.style.backgroundImage = `radial-gradient(circle at calc(50% + ${x}px) calc(50% + ${y}px), #06121722 6%, #06121788 9%)`
        x = easeInOutExpo((time - startTime), 0, destination[0], duration)
        y = easeInOutExpo((time - startTime), 0, destination[1], duration)

        if (x < destination[0]) {
            requestAnimationFrame(tick)
        }
    }

    setTimeout(() => {
        requestAnimationFrame(tick)
    }, delay)
}

spotlightMove([500, 100], 4000, 1000)


/** https://spicyyoghurt.com/tools/easing-functions **/

/**
 * 
 * @param {number} t Time - Amount of time that has passed since the beginning of the animation
 * @param {number} b Beginning value - Start position of animation
 * @param {number} c Change in value - Usually the end position of animation
 * @param {number} d Duration - Amount of time the animation will take. 
 * @returns {number} position
 */
function easeOutCubic (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInOutExpo (t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

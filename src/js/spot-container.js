const spotContainerEl = document.getElementById('spot-container');

function spots() {
    var originalRatios = {
        width:  window.innerWidth / 1680,
        height: window.innerHeight / 980
      };
      
    // formula for cover:
    var coverRatio = Math.max(originalRatios.width, originalRatios.height);

    var newImageWidth = 1680 * coverRatio;
    var newImageHeight = 980 * coverRatio;

    var offestX = (newImageWidth - window.innerWidth) / 2
    var offestY = (newImageHeight - window.innerHeight) / 2


    spotContainerEl.style.width = newImageWidth + 'px'
    spotContainerEl.style.height = newImageHeight + 'px'
    spotContainerEl.style.transform = `translate(-${offestX}px, -${offestY}px)`


    const log = {
        'image width': newImageWidth,
        'image height': newImageHeight,
        'window width': window.innerWidth,
        'window height': window.innerHeight,
        'width offset': offestX,
        'height offset': offestY
    }

    //console.table(log)

    //requestAnimationFrame(spots)
}

requestAnimationFrame(spots)
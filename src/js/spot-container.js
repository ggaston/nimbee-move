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
    //TODO: not working if container is smaller then viewport
    spotContainerEl.style.transform = `translateX(-${offestX}px)`


    // const log = {
    //     'image width': newImageWidth,
    //     'image height': newImageHeight,
    //     'window width': window.innerWidth,
    //     'window height': window.innerHeight,
    //     'width offset': offestX,
    //     'height offset': offestY
    // }

    //console.table(log)

    //requestAnimationFrame(spots)
}

requestAnimationFrame(spots)
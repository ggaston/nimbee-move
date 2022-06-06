const spotEl = document.getElementById('spot-truck');

function position(){
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

    var picRatioX = 1680 / newImageWidth
    var picRatioY = 980 / newImageHeight

    spotEl.style.left = 'calc(200px / ' + picRatioX + ')' // modify horizontal position
    spotEl.style.top = 'calc(200px / ' + picRatioY + ')' // modify vertical postion. Height should be the image height not viewport.

    console.log(newImageWidth + ' | ' + newImageHeight)
    console.log(window.innerWidth + ' | ' + window.innerHeight)
    console.log(picRatioX + ' | ' + picRatioY)
    //window.requestAnimationFrame(position)
}

window.requestAnimationFrame(position)

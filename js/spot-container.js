const spotContainerEl=document.getElementById("spot-container");function spots(){var t={width:window.innerWidth/1680,height:window.innerHeight/980},t=Math.max(t.width,t.height),n=1680*t,t=980*t,e=(n-window.innerWidth)/2;window.innerHeight;spotContainerEl.style.width=n+"px",spotContainerEl.style.height=t+"px",spotContainerEl.style.transform=`translateX(-${e}px)`,requestAnimationFrame(spots)}requestAnimationFrame(spots);
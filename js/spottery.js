const spottery={init:function(t='[data-behavior="spot"]',e){t=this.options={...{spotSelector:t,spotControlSelector:'[data-behavior="spot-control"]',spotControlSelectorPrev:'[data-behavior="spot-control-prev"]',spotControlSelectorNext:'[data-behavior="spot-control-next"]',spotContentSelector:'[data-behavior="spot-content"]',animateClassName:"is-animated",activeClassName:"is-active"},...e};this.options.spots=document.querySelectorAll(t.spotSelector);const o=this.options.spotContents=document.querySelectorAll(t.spotContentSelector),s=this.options.controls=document.querySelectorAll(t.spotControlSelector),n=this.options.controlsNext=document.querySelectorAll(t.spotControlSelectorNext),i=this.options.controlsPrev=document.querySelectorAll(t.spotControlSelectorPrev);document.addEventListener("click",this.clickOut.bind(this)),s.forEach(t=>{t.addEventListener("click",this.showSpotContent.bind(this))}),n.length&&i.length&&(n.forEach(t=>{t.addEventListener("click",this.next.bind(this))}),i.forEach(t=>{t.addEventListener("click",this.prev.bind(this))})),document.addEventListener("keydown",t=>{switch(t.code){case"ArrowLeft":this.prev();break;case"ArrowRight":this.next()}}),requestAnimationFrame(()=>{document.querySelector(".content h1").classList.add("is-animated"),o.forEach((t,e)=>{const o=t.firstElementChild;var s=o.getBoundingClientRect();const n={x:s.x-o.clientWidth/2};n.y=s.y;s=0<n.x?n.x+o.clientWidth>window.innerWidth?n.x-s.x+(window.innerWidth-(n.x+o.clientWidth)):n.x-s.x:-n.x-o.clientWidth/2;t.style.transform="translateX("+s+"px)"})})},current:-1,addAnimationClass:function(t,e){var o=this.options;const s=t?t.currentTarget:e,n=(console.log(t),s.closest(o.spotSelector)),i=n?n.querySelector(o.spotContentSelector):this.contentLookup(s);i&&(i.classList.add(o.animateClassName),s.removeEventListener("click",this.addAnimationClass))},showSpotContent:function(t,e){const o=this.options,s=t?t.currentTarget:e,n=this.spotLookup(s);this.contentLookup(s);let i=document.querySelectorAll(o.spotSelector+"."+o.activeClassName+","+o.spotControlSelector+"."+o.activeClassName);var c=!n.classList.contains(o.activeClassName);let r;for(item of o.spots.entries())n.isEqualNode(item[1])&&(r=item[0]);document.getElementById("spot-container").classList.remove("has-open-spot"),this.addAnimationClass(t,e),i.forEach(t=>{t.classList.remove(o.activeClassName)}),c&&(document.getElementById("spot-container").classList.add("has-open-spot"),n.classList.add(o.activeClassName),s.classList.add(o.activeClassName),this.current=r,fadein(document.querySelector("h1 .fade-in"),this.current),this.higlightNavItem())},higlightNavItem:function(){var t=this.options,e=this.current,e=t.spots[e].id,t=document.querySelectorAll(t.spotControlSelector+'[data-bind="#'+e+'"]');this.setActive(t)},spotLookup:function(t){var e=this.options;let o=t.closest(e.spotSelector);const s=this.contentLookup(t);return o=s?s.closest(e.spotSelector):o},contentLookup:function(t){var e=this.options,o=t.dataset.bind;return o?"spot-content"===document.querySelector(o).dataset.behavior?document.querySelector(o):document.querySelector(o).querySelector('[data-behavior="spot-content"]'):t.querySelector(e.spotContentSelector)},clickOut:function(t){const e=this.options;let o=document.querySelectorAll("."+e.activeClassName);t.target.closest('[data-behavior^="spot-control"]')||(o.forEach(t=>{t.classList.remove(e.activeClassName)}),document.getElementById("spot-container").classList.remove("has-open-spot"))},next:function(){var t=this.options;const e=t.spots;let o=this.current;o=this.current=e.length-1>o?o+1:0;t=e[o].querySelector(t.spotControlSelector);return this.showSpotContent(null,t),this.higlightNavItem(),o},prev:function(){var t=this.options;const e=t.spots;let o=this.current;o=this.current=o<1?e.length-1:o-1;t=e[o].querySelector(t.spotControlSelector);return this.showSpotContent(null,t),this.higlightNavItem(),o},clearActive:function(t){const e=this.options,o=t||document,s=o.querySelectorAll('[data-behavior*="spot"].'+e.activeClassName);s.forEach(t=>{t.classList.remove(e.activeClassName)}),document.getElementById("spot-container").classList.remove("has-open-spot")},setActive:function(t){console.log("setActive: ",t),t.forEach(t=>{t.classList.add(this.options.activeClassName)})}},nimbee_spots=Object.assign(spottery);function fadein(t,e){let o=t.parentNode.children;const s=Array.prototype.forEach;s.call(o,t=>{t.classList.remove("fade-in")}),o[e].classList.add("fade-in")}nimbee_spots.init();
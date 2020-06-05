window.onload = function() {
    
    var timeline = gsap.timeline({repeat:3, repeatDelay:3});

    timeline.to('.shadow', {right:-175, duration: 1})
            .to('.shine',  {left:80,    duration: 1})

            .to("#title-container", {ease:Power1.easeIn, opacity:1, scale:1, top:166, duration: 0.2})
    
            .to('#top-section', {ease:Power1.easeOut, top: -264, duration: 0.5, delay: 1})
    
            .to('#title-container', {ease:Power1.easeOut, scale:0.5, top:220, duration: 0.5, delay: -0.5})
            .to('#bottom-section', 0.5, {ease:Power1.easeOut, top:475}, "-=0.5")

            .to('#photo1', {ease:Linear.easeNone, left: -300, duration: 2, delay: -0.5})
            .to('#photo1', 0.4, {opacity:0}, "-=0.4")
    
            .to('#photo2', 0.4, {opacity:1}, "-=0.4")
            .to('#photo2', 2, {ease:Linear.easeNone, left: 0}, "-=0.5")

            .to('#photo3', 0.4, {opacity:1}, "-=0.4")
            .to('#photo3', 2, {ease:Linear.easeNone, left: -300}, "-=0.5")

            .to('#photo4', 0.4, {opacity:1}, "-=0.4")

            .to('#top-section', 0.3, {ease:Power1.easeOut, top: -500})
   
            .to('#last-screen', 0.3, {ease:Power1.easeIn, opacity: 1}, "-=0.3")
            .to('#upto-txt', 0.3, {ease:Power1.easeIn, opacity: 1})
            .to('#percent-txt', 0.3, {ease:Power1.easeIn, opacity: 1,scale:1})
            .to('#off-txt', 0.3, {ease:Power1.easeIn, opacity: 1})



}

window.onload = function() {
    
    const timeline = gsap.timeline({repeat:3, repeatDelay:3});

    timeline.to('.shadow', {right:-175, duration: 1, delay:0.5})
            .to('.shine',  {left:80,    duration: 1})
            .to("#title-container", {ease:Power1.easeIn, opacity:1, scale:1, top:166, duration: 0.2})
    
            .to('#top-section',     {ease:Power1.easeOut, top: -264, duration: 0.5, delay: 1})
            .to('#title-container', {ease:Power1.easeOut, scale:0.5, top:220, duration: 0.5, delay: -0.5})
            .to('#bottom-section',  {ease:Power1.easeOut, top:475, duration: 0.5, delay: -0.5})

            .to('#photo1', {ease:Linear.easeNone, left: -300, duration: 2, delay: -0.5})
            .to('#photo1', {opacity:0, duration: 0.4, delay: -0.4})
    
            .to('#photo2', {opacity:1, duration: 0.4, delay: -0.4})
            .to('#photo2', {ease:Linear.easeNone, left: 0, duration: 2, delay: -0.5})

            .to('#photo3', {opacity:1, duration: 0.4, delay: -0.4})
            .to('#photo3', {ease:Linear.easeNone, left: -300, duration: 2, delay: -0.5})

            .to('#photo4', {opacity:1, duration: 0.4, delay: -0.4})
            
            .to('#top-section', {ease:Power1.easeOut, top: -500, duration: 0.3})
            .to('#last-screen', {ease:Power1.easeIn, opacity: 1, duration: 0.3, delay: -0.3})
            .to('#upto-txt',    {ease:Power1.easeIn, opacity: 1, duration: 0.3})
            .to('#percent-txt', {ease:Power1.easeIn, opacity: 1, scale:1, duration: 0.3})
            .to('#off-txt',     {ease:Power1.easeIn, opacity: 1, duration: 0.3})
}

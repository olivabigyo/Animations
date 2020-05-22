window.onload = function() {
    
    var timeline = new TimelineMax({repeat:3, repeatDelay:3});

    timeline.to("#title-container", 0.2, {ease:Power1.easeIn, opacity:1, scale:1, top:166});
    
    timeline.to('#top-section', 0.5, {ease:Power1.easeOut, top: -264}, 1);
    
    timeline.to('#title-container', 0.5, {ease:Power1.easeOut, scale:0.5, top:220}, "-=0.5");
    timeline.to('#bottom-section', 0.5, {ease:Power1.easeOut, top:475}, "-=0.5");

    timeline.to('#photo1', 2, {ease:Linear.easeNone, left: -300}, "-=0.5");
    timeline.to('#photo1', 0.4, {opacity:0}, "-=0.4");
    
    timeline.to('#photo2', 0.4, {opacity:1}, "-=0.4");
    timeline.to('#photo2', 2, {ease:Linear.easeNone, left: 0}, "-=0.5");

    timeline.to('#photo3', 0.4, {opacity:1}, "-=0.4");
    timeline.to('#photo3', 2, {ease:Linear.easeNone, left: -300}, "-=0.5");

    timeline.to('#photo4', 0.4, {opacity:1}, "-=0.4");

    timeline.to('#top-section', 0.3, {ease:Power1.easeOut, top: -500});
   
    timeline.to('#last-screen', 0.3, {ease:Power1.easeIn, opacity: 1}, "-=0.3");
    timeline.to('#upto-txt', 0.3, {ease:Power1.easeIn, opacity: 1});
    timeline.to('#percent-txt', 0.3, {ease:Power1.easeIn, opacity: 1,scale:1});
    timeline.to('#off-txt', 0.3, {ease:Power1.easeIn, opacity: 1});



}

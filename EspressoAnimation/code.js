var timeline = new TimelineMax();

timeline.set('#bean1', { opacity: 1 });
timeline.from('#bean1', 1.2, { y: '-=90', ease: Bounce.easeOut });

timeline.set('#bean2', { opacity: 1 }, "-=1");
timeline.from('#bean2', 1.2, { y: '-=90', ease: Bounce.easeOut }, "-=1");

timeline.set('#bean3', { opacity: 1 }, "-=0.8");
timeline.from('#bean3', 1.2, {y: '-=90', ease: Bounce.easeOut }, "-=0.8");

timeline.set('#bean4', {opacity: 1}, "-=1.1");
timeline.from('#bean4', 1.2, {y: '-=90', ease: Bounce.easeOut }, "-=1.1");

timeline.set('#bean5', { opacity: 1 }, "-=1");
timeline.from('#bean5', 1.2, { y: '-=90', ease: Bounce.easeOut }, "-=1");

timeline.to('#roasting-fire', 1, {opacity:1});

timeline.to('.bean-fill', 2, { fill: "#584c3b" });
timeline.to('.bean-middle-line', 2, { stroke: '#373026' }, "-=2");

timeline.to('#roasting-fire', 0.3, { opacity:0 });

timeline.staggerTo(['#bean1', '#bean2', '#bean3', '#bean4','#bean5'], 0.8, { y: "+=120", ease: Back.easeIn }, 0.2);

timeline.set('#grinder', { opacity:1 });
timeline.from('#grinder', 0.4, { y:'-=130' },'+=0.1');

timeline.to('#grinder-crank', 0.6, { scaleX:-1 });
timeline.to('#grinder-crank', 0.15, { scaleX:1, ease:Power2.easeInOut, repeat: 5, yoyo: true });

timeline.to('#grinder', 0.1, { rotation:3, transformOrigin:"50% 50%" ,repeat: 7, yoyo:true }, '-=0.8')

timeline.to('#grinder', 0.7, { y:'+=160', ease: Back.easeIn }, '+=0.3');

timeline.set('#maker', { opacity:1 });
timeline.from('#maker', 1.3, { y:'-=160', ease:Elastic.easeOut }, "+=0.5");

timeline.set('#cup', { opacity:1 });
timeline.from('#cup', 0.7, { x:'-=160' }, "+=0.1");

timeline.set('#streams', { opacity:1, scaleY:0.1 });
timeline.to('#streams', 0.3, { scaleY:1 });
timeline.to('#streams', 0.3, { scaleY:0.1, transformOrigin:"50% 100%" }, '+=1.2');
timeline.set('#streams', { opacity:0 });

timeline.to('#maker', 0.7, { x:'-=130' }, "+=0.5");

timeline.to('#cup', 0.7, { y:'-=20', scale: '2', transformOrigin: "50% 50%" }, "+=0.1");
timeline.to('#cup-star', 1, { opacity:1 });
timeline.to('#cup-steam-lines', 2, { opacity:1 }, '+=0.1');

timeline.duration(12);

// GSDevTools.create();

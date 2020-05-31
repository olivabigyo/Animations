

const pupils = document.querySelectorAll('.pupil');
const brows = document.querySelectorAll('.brows');
const box = document.querySelector('.box');
let boxGrabbed = false;

// Input setup
let input = {
    mouseX: {
        start: 0,
        end: window.innerWidth,
        current: 0
    },
    mouseY: {
        start: 0,
        end: window.innerHeight,
        current: 0
    }
};
// Output setup
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

let output = {
    x: {
        start: -35,
        end: 35,
        current: 0
    },
    y: {
        start: -40,
        end: 40,
        current: 0
    },
    deg: {
        start: -15,
        end: 15,
        current: 0
    },
    boxX: {
        start: 0,
        current: 0,
        grabbedX: 0
    },
    boxY: {
        start: 0,
        current: 0,
        grabbedY: 0
    }
}
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;
output.deg.range = output.deg.end - output.deg.start;


const handleMouseMove = function (event) {
    event.preventDefault();
    // mouseX inputs
    input.mouseX.current = event.clientX;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
    // mouseY inputs
    input.mouseY.current = event.clientY;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
    // output x and y
    output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);
    output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);
    // output x inverz and y inverz
    output.x.inverz = output.x.end - (input.mouseX.fraction * output.x.range);
    output.y.inverz = output.y.end - (input.mouseY.fraction * output.y.range);
    // output deg
    output.deg.current = output.deg.end - (input.mouseX.fraction * output.deg.range);
    // output boxY, boxY

    console.log('start', output.boxX.start, output.boxY.start);

    output.boxX.current = input.mouseX.current - output.boxX.grabDiff;
    output.boxY.current = input.mouseY.current - output.boxY.grabDiff;

    console.log('current.mouseX', input.mouseX.current);
    console.log('graabDiff', output.boxX.grabDiff);

    if (output.boxX.current > window.innerWidth - 300) {
        output.boxX.current = window.innerWidth - 300;
    }
    if (output.boxX.current < 0) {
        output.boxX.current = 0;
    }
    if (output.boxY.current > window.innerHeight - 100) {
        output.boxY.current = window.innerHeight - 100;
    }
    if (output.boxY.current < 0) {
        output.boxY.current = 0;
    }
    // console.log('moving, boxXY:', output.boxX.grabbedX, output.boxY.grabbedY);

    // apply output to html
    pupils.forEach(function (pupil) {
        pupil.style.transform = 'translate(' + output.x.current + 'px, ' + output.y.current + 'px)';
    });
    brows.forEach(function (brow) {
        brow.style.transform = 'translateX( ' + output.x.inverz + 'px) rotate(' + output.deg.current + 'deg)';
        // brow.style.transform = 'translateX( ' + output.x.inverz + 'px)' ;
    });

    if (boxGrabbed) {
        box.style.transform = 'translate(' + output.boxX.current + 'px, ' + output.boxY.current + 'px)';
        output.boxX.start = output.boxX.current;
        output.boxY.start = output.boxY.current;
    }

    // console.log(output.x.current);
};

const handleResize = function () {

    input.mouseX.end = window.innerWidth;
    input.mouseY.end = window.innerHeight;

    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.mouseY.range = input.mouseY.end - input.mouseY.start;
}

const grab = function (event) {
    event.preventDefault();
    console.log('grabbed');
    output.boxX.grabbedX = event.clientX;
    output.boxX.grabDiff = output.boxX.grabbedX - output.boxX.start;
    output.boxY.grabbedY = event.clientY;
    output.boxY.grabDiff = output.boxY.grabbedY - output.boxY.start;
    boxGrabbed = true;
    console.log('grabbed XY :', output.boxX.grabbedX, output.boxY.grabbedY);
    console.log('grabDiff XY :', output.boxX.grabDiff, output.boxY.grabDiff);
}

const release = function (event) {
    console.log('released');
    console.log('releasing start', output.boxX.start, output.boxY.start);
    if (boxGrabbed) {

        let timeline = new TimelineMax();
        // timeline.to('.box', 0.0, );
        timeline.fromTo('.box', 0.5,
            { x: event.clientX - output.boxX.grabDiff, y: event.clientY - output.boxY.grabDiff },
            { x: event.clientX - output.boxX.grabDiff, y: window.innerHeight - 100, ease: Bounce.easeOut });
        output.boxX.start = event.clientX - output.boxX.grabDiff;
        output.boxY.start = window.innerHeight - 100;
        boxGrabbed = false;
    }
    console.log('released start', output.boxX.start, output.boxY.start);
}

const click = function () {
    console.log('clicked');
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);
box.addEventListener('mousedown', grab);
window.addEventListener('mouseup', release);
// box.addEventListener('click', click);

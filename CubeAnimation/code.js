
// 01 Declare Variables
// 02 Event Listeners
// 03 Functions


// 1. Variables

// global variables
let angle = 0, playOn = false, interval;
// buttons
const left = document.querySelector('.left-arrow');
const right = document.querySelector('.right-arrow');
const play = document.querySelector('.play-pause');
const icon = document.querySelector('.play-pause i');
// cubes
const cubes = document.querySelectorAll('.cube');

// 2. Event Listeners

left.addEventListener('click', () => {
    angle += 90;
    rotate();
    // stop autoplay
    if(playOn) {
        playPause();
    }
});

left.addEventListener('mouseover', () => {
    // small preview
    angle += 25;
    rotate();
});

left.addEventListener('mouseout', () => {
    angle -= 25;
    rotate();
});

right.addEventListener('click', () => {
    angle -= 90;
    rotate();
    // stop autoplay
    if(playOn) {
        playPause();
    }
});

right.addEventListener('mouseover', () => {
    // small preview
    angle -= 25;
    rotate();
});

right.addEventListener('mouseout', () => {
    angle += 25;
    rotate();
});

play.addEventListener('click', () => {
    playPause();
});

// 3. Functions

// Rotate all cubes with angle
const rotate = () => {
    cubes.forEach(cube => cube.style.transform = `rotateY(${angle}deg)`);
}

// Autoplay
const playPause = () => {
    if(!playOn) {
        // rotate cubes (90deg) in every 3 seconds
        interval = setInterval(() => {
            angle -= 90;
            rotate();
        }, 3000);
        changePlayPause();
        playOn = true;
    } else {
        // stop
        clearInterval(interval);
        changePlayPause();
        playOn = false;
    }
    
}

// Change icon on play button
const changePlayPause = () => { 
    const faClass = icon.classList[1];
    if(faClass === 'fa-play') {
        // change to pause
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        // change to play
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

"use strict";

class V2 {
    constructor(x, y) {
        this.x = x; this.y = y;
    }

    static fromEv(ev) { return new V2(ev.clientX, ev.clientY); }
    static zero() { return new V2(0, 0); }

    clone() { return new V2(this.x, this.y); }
    addM(that) { this.x += that.x; this.y += that.y; return this; }
    add(that) { return this.clone().addM(that); }
    subM(that) { this.x -= that.x; this.y -= that.y; return this; }
    sub(that) { return this.clone().subM(that); }
    mulM(c) { this.x *= c; this.y *= c; return this; }
    mul(c) { return this.clone().mulM(c); }
    divM(c) { this.x /= c; this.y /= c; return this; }
    div(c) { return this.clone().divM(c); }
    roundM() { this.x = Math.round(this.x); this.y = Math.round(this.y); return this; }
    length() { return Math.hypot(this.x, this.y); }
    dist(that) { return Math.hypot(that.x - this.x, that.y - this.y); }
    toString() { return "(" + this.x + "," + this.y + ")"; }
}

class Eye {
    constructor(selector) {
        this.eye = document.querySelector(selector);
        const eyeBox = this.eye.getBoundingClientRect();
        this.center = new V2((eyeBox.left + eyeBox.right) / 2, (eyeBox.top + eyeBox.bottom) / 2);
        console.log(this.center);
        this.pupil = this.eye.querySelector(".pupil");
        const pupilBox = this.pupil.getBoundingClientRect();
        this.scale = eyeBox.right - pupilBox.right;
        console.log(this.bounds);
    }

    lookAt(v) {
        const p = v.clone().subM(this.center);
        const l = p.length();
        p.mulM(Math.atan(l / this.scale) * this.scale / l / 1.5);
        this.pupil.style.transform = `translate(${p.x}px,${p.y}px)`;
    }

    lookAtEvent(ev) {
        this.lookAt(V2.fromEv(ev));
    }
}

const leftEye = new Eye(".eye1");
const rightEye = new Eye(".eye2");

class Box {
    constructor(selector) {
        this.box = document.querySelector(selector);
        this.grabbed = false;
        this.pos = V2.zero();  // TODO: query from DOM
    }

    updatePos() {
        const br = this.box.getBoundingClientRect();
        this.pos = new V2(br.left, br.top);
    }

    grab(ev) {
        this.updatePos();
        this.grabbed = true;
        this.grabbedAt = V2.fromEv(ev).subM(this.pos);
    }

    dragIfGrabbed(ev) {
        if (!this.grabbed) return;
        this.moveTo(V2.fromEv(ev).subM(this.grabbedAt));
    }

    moveTo(v) {
        v.x = Math.min(Math.max(v.x, 0), window.innerWidth - 200 - 100); // TODO
        v.y = Math.min(Math.max(v.y, 0), window.innerHeight - 100); // TODO
        this.pos = v;
        this.box.style.transform = `translate(${v.x}px,${v.y}px)`;
    }

    release() {
        if (!this.grabbed) return;
        this.grabbed = false;
        const self = this;
        const timeline = new TimelineMax({
            onComplete: this.updatePos.bind(this),
            onUpdate: () => {
                self.updatePos();
                leftEye.lookAt(self.pos);
                rightEye.lookAt(self.pos);
            },
        });
        timeline.fromTo('.box', 0.6, { x: this.pos.x, y: this.pos.y },
            { x: this.pos.x, y: window.innerHeight - 100, ease: Bounce.easeOut }
        );
    }
}

const box = new Box(".box");

window.addEventListener("pointermove", (event) => {
    leftEye.lookAtEvent(event);
    rightEye.lookAtEvent(event);
    box.dragIfGrabbed(event);
});

box.box.addEventListener("pointerdown", ev => {
    ev.preventDefault();
    box.grab(ev)
});
// TODO: document! It's important that the mouseup is on the whole window and not just the box
window.addEventListener("pointerup", () => box.release());

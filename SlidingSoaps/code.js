"use strict";

class V2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static fromEvent(event) {
    return new V2(event.clientX, event.clientY);
  }
  clone() {
    return new V2(this.x, this.y);
  }

  // Vector addition (v += u style)
  // Use:
  // const v = new V2(3,5);
  // v.addM(new V2(1,1));
  // v is now (4,6)
  addM(that) {
    this.x += that.x;
    this.y += that.y;
    // So we can write: v.addM(...).subM(...)
    return this;
    // onnmagat adta vissza
  }
  // Vector add (v + u style)
  // Use:
  // const v = new V2(3,5);
  // const u = v.add(new V2(1,1));
  // u is now (4,6), v is unchanged
  add(that) {
    return this.clone().addM(that);
    // uj vektort adott vissza
  }

  subM(that) { this.x -= that.x; this.y -= that.y; return this; }
  sub(that) { return this.clone().subM(that); }

  // Multiplication by a scalar
  mulM(s) { this.x *= s; this.y *= s; return this; }
  mul(s) { return this.clone().mulM(s); }
  divM(s) { this.x /= s; this.y /= s; return this; }
  div(s) { return this.clone().divM(s); }

  absM() { this.x = Math.abs(this.x); this.y = Math.abs(this.y); return this; }
  abs() { return this.clone().absM(); }

  under(that) { return this.x <= that.x && this.y <= that.y; }

}

class Rect {
  constructor(arg1, dimensions) {
    if (arg1 instanceof V2) {
      this.C = arg1;
      this.R = dimensions;
    } else if (arg1 instanceof HTMLElement) {
      // nem is keresunk masodik argumentumot
      this.initFromElement(arg1);
    } else if (typeof arg1 === "string") {
      // szelektorkent hasznaljuk
      this.initFromElement(document.querySelector(arg1));
    }
  }

  initFromElement(element) {
    // kiszamoljuk a kapott DOM element kozepet es dimenzio vektorat
    const br = element.getBoundingClientRect();
    this.R = new V2(br.width/2, br.height/2);
    // a sarkahoz adjuk a dimenziovektort: kozepe
    this.C = new V2(br.x, br.y).addM(this.R);
  }
  // brick maradjon a playgroundon belul
  forceInside(that) {
    // this a brick, that a playground
    const centersOff = this.C.sub(that.C);
    const dimsDiff = that.R.sub(this.R);
    if (centersOff.x > dimsDiff.x) { this.C.x = that.C.x + that.R.x - this.R.x; }
    if (centersOff.x < -dimsDiff.x) { this.C.x = that.C.x - that.R.x + this.R.x; }
    if (centersOff.y > dimsDiff.y) { this.C.y = that.C.y + that.R.y - this.R.y; }
    if (centersOff.y < -dimsDiff.y) { this.C.y = that.C.y - that.R.y + this.R.y; }
  }

  // brick ne masszon ra masokra
  forceOutside(that) {
    const centersOff = that.C.sub(this.C);
    const dimSum = that.R.add(this.R);
    const centersOffAbs = centersOff.abs();
    // ha nem log bele
    if (!centersOff.abs().under(dimSum)) return;
    // belogas merteke
    const distToBoundary = dimSum.sub(centersOffAbs);
    if (distToBoundary.x < distToBoundary.y) {
      // adjust x
      if (centersOff.x > 0) { this.C.x = that.C.x - that.R.x - this.R.x; }
      else { this.C.x = that.C.x + that.R.x + this.R.x }
    } else {
      // adjust y
      if (centersOff.y > 0) { this.C.y = that.C.y - that.R.y - this.R.y; }
      else { this.C.y = that.C.y + that.R.y + this.R.y }
    }
  }
}

class Brick extends Rect {
  constructor(element) {
    // super(arg) : a szulo osztaly ezekkel argumentummal hivodjon meg amikor kiterjesztjuk Brick-e
    super(element);
    this.origCenter = this.C.clone();
    this.element = element;
  }

  moveTo(v) {
    // update center
    this.C = v;
    // don't overlap
    for (const brick of bricks) {
      if (brick != this) this.forceOutside(brick);
    }
    // don't overflow
    this.forceInside(playground);
    // update offset az eredetitol
    const offset = this.C.sub(this.origCenter);
    // translete mindig az eredeti helyhez kepest szamolodik
    this.element.style.transform = `translate(${offset.x}px,${offset.y}px)`;
  }

  dragStart(ev) {
    this.grabDiff = V2.fromEvent(ev).subM(this.C);
  }
  drag(ev) {
    this.moveTo(V2.fromEvent(ev).subM(this.grabDiff));
  }
  dragEnd() {
    this.grabDiff = undefined;
  }
}

// document.querySelectorAll returns a NodeList, and it doesn't have a 'map' method.
// That's why we need Array.from
const bricks = Array.from(document.querySelectorAll(".brick")).map(element => new Brick(element));
const playground = new Rect(".playground");

let grabbedBrick;
bricks.forEach(brick => {
  brick.element.addEventListener("mousedown", event => {
    event.preventDefault();
    grabbedBrick = brick;
    brick.dragStart(event);
  });
});
window.addEventListener("mousemove", event => {
  if (!grabbedBrick) return;
  grabbedBrick.drag(event);
});
window.addEventListener("mouseup", event => {
  if (!grabbedBrick) return;
  grabbedBrick.dragEnd();
  grabbedBrick = undefined;
});

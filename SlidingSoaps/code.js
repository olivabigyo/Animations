"use strict";

class V2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
}

class Brick extends Rect {
  constructor(element) {
    // super(arg) : a szulo osztaly ezekkel argumentummal hivodjon meg amikor kiterjesztjuk Brick-e
    super(element);
    this.origCenter = this.C.clone();
    this.brick = element;
  }

  // a brick legyen elmozdithato v vektorral
  moveBy(v) {
    // update center
    this.C.addM(v);
    // update offset az eredetitol
    const offset = this.C.sub(this.origCenter);
    // translete mindig az eredeti helyhez kepest szamolodik
    this.brick.style.transform = `translate(${offset.x}px,${offset.y}px)`;
  }
}

// document.querySelectorAll returns a NodeList, and it doesn't have a 'map' method.
// That's why we need Array.from
const bricks = Array.from(document.querySelectorAll(".brick")).map(element => new Brick(element));
console.log(bricks);
bricks[0].moveBy(new V2(50,100));

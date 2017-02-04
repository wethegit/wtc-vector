import Vector from "../../src/wtc-vector";

class DrawingVector {
  constructor(x, y, color, lineWidth = 1) {
    this.v = new Vector(x, y);

    this.arrowheadV1 = new Vector(-10,-10);
    this.arrowheadV2 = new Vector(-10, 10);

    if( typeof color !== 'string' || !(/^#[0-9ABCDEFabcdef]*/.test(color)) ) {
      color = '#' + ('0'+(Math.round(Math.random()*255)).toString(16)).substr(-2) + ('0'+(Math.round(Math.random()*255)).toString(16)).substr(-2) + ('0'+(Math.round(Math.random()*255)).toString(16)).substr(-2);
    }

    this.color = color;
    this.lineWidth = lineWidth;
  }

  draw(playground) {
    let offset = playground.offset.addNew(this.offset);
    let x = offset.x;
    let y = offset.y;
    let ctx = playground.mainCtx;

    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.moveTo(x, y);
    x = this.v.x + offset.x;
    y = this.v.y + offset.y;
    ctx.lineTo(x, y);

    var av1 = this.arrowheadV1.rotateNew(this.v.angle);
    var av2 = this.arrowheadV2.rotateNew(this.v.angle);

    ctx.lineTo(av1.x + x, av1.y + y);
    ctx.moveTo(x, y);
    ctx.lineTo(av2.x + x, av2.y + y);

    ctx.stroke();

  }

  get playground() {
    return this._pg;
  }
  set playground(pg) {
    this._pg = pg;
  }

  set color(color) {
    if( typeof color == 'string' && /^#[0-9ABCDEFabcdef]*/.test(color) ) {
      this._color = color;
    }
  }
  get color() {
    return this._color || '#FFFFFF';
  }

  set offset(v) {
    if( v instanceof Vector ) {
      this._offset = v;
    }
  }
  get offset() {
    if( !(this._offset instanceof Vector) ) {
      this._offset = new Vector(0,0);
    }
    return this._offset;
  }
}

export default DrawingVector;

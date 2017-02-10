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
    let unitX = playground.scaledUnitVectorX; // iHat
    let unitY = playground.scaledUnitVectorY; // jHat
    let unitVector = unitX.addNew(unitY);
    let scale = playground.scale;
    // console.clear();
    // console.log(unitVector, unitX, unitY);
    let offset = playground.offset.addNew(this.offset.multiplyNew(unitVector)); // creating the offset
    let x = offset.x;
    let y = offset.y;
    let ctx = playground.mainCtx;

    if(this.outputVector instanceof Vector) {
      let unitX = playground.unitVectorX; // iHat
      let unitY = playground.unitVectorY; // jHat

      this.outputVector.x = (this.v.x * unitX.x) + (this.v.y * unitY.x);
      this.outputVector.y = (this.v.x * unitX.y) + (this.v.y * unitY.y);
    }

    // Translate the vector using linear transformation x(î) + y(j)
    // î = unix X
    // j = unit Y
    //  _       _    _       _
    // | x(î.x) | + | y(j.x) |
    // | x(i.y) | + | y(j.y) |
    //
    let translatedVector = new Vector(0, 0);
    translatedVector.x = (this.v.x * unitX.x) + (this.v.y * unitY.x);
    translatedVector.y = (this.v.x * unitX.y) + (this.v.y * unitY.y);

    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.moveTo(x, y);
    x = translatedVector.x + offset.x;
    y = translatedVector.y + offset.y;
    ctx.lineTo(x, y);

    this.translatedVector = translatedVector;

    // Create the arrow head vectors. These are not dependent upon the unit vector
    var av1 = this.arrowheadV1.rotateNew(translatedVector.angle);
    var av2 = this.arrowheadV2.rotateNew(translatedVector.angle);

    // Draw the arrowhead
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

import Vector from "../src/wtc-vector";

let colours = ['#c678dd', '#98c379', '#c34448', '#4e9c9e', '#d18549', '#abb2bf']

class DrawingVector {
  constructor(x, y, color) {
    this.v = new Vector(x, y);

    this.arrowheadV1 = new Vector(-10,-10);
    this.arrowheadV2 = new Vector(-10, 10);

    if( typeof color !== 'string' || !(/^#[0-9ABCDEFabcdef]*/.test(color)) ) {
      let color = '#' + ('0'+(Math.round(Math.random()*255)).toString(16)).substr(-2) + ('0'+(Math.round(Math.random()*255)).toString(16)).substr(-2) + ('0'+(Math.round(Math.random()*255)).toString(16)).substr(-2);
    }

    this.color = color;
  }

  draw(playground) {
    let offset = playground.offset;
    let x = offset.x;
    let y = offset.y;
    let ctx = playground.mainCtx;

    ctx.beginPath();
    ctx.lineWidth = 1;
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
}

class VectorPlayground {
  static init(drawing = true) {
    this.initialised = true;

    this.mainCanvas = document.createElement('canvas');
    this.mainCtx = this.mainCanvas.getContext('2d');
    this.secondaryCanvas = document.createElement('canvas');
    this.secondarCtx = this.secondaryCanvas.getContext('2d');

    document.body.appendChild(this.mainCanvas);
    document.body.appendChild(this.secondaryCanvas);

    window.addEventListener('resize', this.resizeListener);
    this.resizeListener();

    this.vectors = [];

    this.gridDistance = 100;

    this.drawing = drawing;
  }

  static resizeListener(e) {
    this.dimensions = new Vector(window.innerWidth, window.innerHeight);
    this.offset = this.dimensions.divideScalarNew(2);

    this.mainCanvas.width = this.secondaryCanvas.width = window.innerWidth;
    this.mainCanvas.height = this.secondaryCanvas.height = window.innerHeight;
  }

  static addVector(drawingVector) {
    if( ! (drawingVector instanceof DrawingVector) ) {
      return;
    }

    this.vectors.push(drawingVector);

    return drawingVector;
  }

  static draw() {
    // Clear the canvases before drawing
    this.mainCtx.fillStyle = this.bgColor;
    this.mainCtx.beginPath();
    this.mainCtx.rect(0,0, this.dimensions.width, this.dimensions.height);
    this.mainCtx.fill();
    // this.secondarCtx.clearRect(0,0,this.mainCanvas.width, this.mainCanvas.height);

    this.drawGrid();
    this.drawVectors();

    if( this.drawing ) {
      window.requestAnimationFrame(this.draw.bind(this));
    }
  }

  static drawVectors() {
    this.vectors.forEach(function(v) {
      v.draw(this);
    }.bind(this));
  }

  static drawGrid() {
    // draw the main grid lines

    this.mainCtx.lineWidth = 1;
    this.mainCtx.strokeStyle = this.gridColor;
    this.mainCtx.beginPath();

    let xPos = this.offset.x;
    while(xPos < this.dimensions.width) {
      xPos += this.gridDistance;
      this.mainCtx.moveTo(xPos, 0);
      this.mainCtx.lineTo(xPos, this.dimensions.height);
    }
    xPos = this.offset.x;
    while(xPos > 0) {
      xPos -= this.gridDistance;
      this.mainCtx.moveTo(xPos, 0);
      this.mainCtx.lineTo(xPos, this.dimensions.height);
    }
    let yPos = this.offset.y;
    while(yPos < this.dimensions.height) {
      yPos += this.gridDistance;
      this.mainCtx.moveTo(0, yPos);
      this.mainCtx.lineTo(this.dimensions.width, yPos);
    }
    yPos = this.offset.y;
    while(yPos > 0) {
      yPos -= this.gridDistance;
      this.mainCtx.moveTo(0, yPos);
      this.mainCtx.lineTo(this.dimensions.width, yPos);
    }
    this.mainCtx.stroke();


    this.mainCtx.strokeStyle = this.originColor;
    this.mainCtx.beginPath();

    this.mainCtx.moveTo(0, this.offset.y);
    this.mainCtx.lineTo(this.dimensions.width, this.offset.y);
    this.mainCtx.moveTo(this.offset.x, 0);
    this.mainCtx.lineTo(this.offset.x, this.dimensions.height);

    this.mainCtx.stroke();

  }

  static set drawing(d) {
    this._drawing = d === true;

    if(this._drawing === true) {
      this.draw();
    }
  }
  static get drawing() {
    return this._drawing === true;
  }

  static set bgColor(color) {
    if( typeof color == 'string' &&  /#[0-9ABCDEF]{6}/.test(color.toUpperCase())) {
      this._bgColor = color;
    }
  }
  static get bgColor() {
    return this._bgColor || '#282C34';
  }

  static set originColor(color) {
    if( typeof color == 'string' &&  /#[0-9ABCDEF]{6}/.test(color.toUpperCase())) {
      this._originColor = color;
    }
  }
  static get originColor() {
    return this._originColor || '#FFFFFF';
  }

  static set gridColor(color) {
    if( typeof color == 'string' &&  /#[0-9ABCDEF]{6}/.test(color.toUpperCase())) {
      this._gridColor = color;
    }
  }
  static get gridColor() {
    return this._gridColor || '#666666';
  }

  static set unitVectorX(v) {
    if( v instanceof Vector ) {
      this._unitVectorX = v
    }
  }
  static get unitVectorX() {
    return this._unitVectorX || new Vector(1, 0);
  }

  static set unitVectorY(v) {
    if( v instanceof Vector ) {
      this._unitVectorY = v
    }
  }
  static get unitVectorY() {
    return this._unitVectorY || new Vector(0, 1);
  }

  static set dimensions(dims) {
    if(dims instanceof Vector) {
      this._dimensions = dims;
    }
  }
  static get dimensions() {
    return this._dimensions || new Vector();
  }

  static set offset(dims) {
    if(dims instanceof Vector) {
      this._offset = dims;
    }
  }
  static get offset() {
    return this._offset || new Vector();
  }



}

export {DrawingVector, VectorPlayground};

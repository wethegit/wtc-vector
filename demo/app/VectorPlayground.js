import Vector from "../../src/wtc-vector";
import DrawingVector from "./DrawingVector";
import colours from './colours';

class VectorPlayground {
  static init(drawing = true, scale = 100, drawGrid = true) {
    this.initialised = true;

    this.mainCanvas = document.createElement('canvas');
    this.mainCtx = this.mainCanvas.getContext('2d');
    this.secondaryCanvas = document.createElement('canvas');
    this.secondarCtx = this.secondaryCanvas.getContext('2d');

    document.body.appendChild(this.mainCanvas);
    document.body.appendChild(this.secondaryCanvas);

    window.addEventListener('resize', this.resizeListener.bind(this));
    this.resizeListener();

    this.vectors = [];

    this.gridDistance = 1;

    this.doDrawGrid = drawGrid;
    this.scale = scale;
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

    if(this.doDrawGrid) this.drawGrid();
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
    let scale = this.scale;
    let gridDistance = this.gridDistance * scale;

    // draw the main grid lines

    this.mainCtx.lineWidth = 1;
    this.mainCtx.strokeStyle = this.gridColor;
    this.mainCtx.beginPath();

    let xPos = this.offset.x;
    while(xPos < this.dimensions.width) {
      xPos += gridDistance;
      this.mainCtx.moveTo(xPos, 0);
      this.mainCtx.lineTo(xPos, this.dimensions.height);
    }
    xPos = this.offset.x;
    while(xPos > 0) {
      xPos -= gridDistance;
      this.mainCtx.moveTo(xPos, 0);
      this.mainCtx.lineTo(xPos, this.dimensions.height);
    }
    let yPos = this.offset.y;
    while(yPos < this.dimensions.height) {
      yPos += gridDistance;
      this.mainCtx.moveTo(0, yPos);
      this.mainCtx.lineTo(this.dimensions.width, yPos);
    }
    yPos = this.offset.y;
    while(yPos > 0) {
      yPos -= gridDistance;
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
  static get scaledUnitVectorX() {
    let scale = this.scale;
    let uv = this.unitVectorX.clone();
    if(scale !== 1) uv.multiplyScalar(scale);
    return uv;
  }

  static set unitVectorY(v) {
    if( v instanceof Vector ) {
      this._unitVectorY = v
    }
  }
  static get unitVectorY() {
    return this._unitVectorY || new Vector(0, 1);
  }
  static get scaledUnitVectorY() {
    let scale = this.scale;
    let uv = this.unitVectorY.clone();
    if(scale !== 1) uv.multiplyScalar(scale);
    return uv;
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

  static set scale(scale) {
    if(typeof scale === 'number') {
      this._scale = scale;
    }
  }
  static get scale() {
    return this._scale || 1;
  }

  static set doDrawGrid(drawGrid) {
    this._drawGrid = drawGrid === true;
  }
  static get doDrawGrid() {
    return this._drawGrid || false;
  }


}

export default VectorPlayground;

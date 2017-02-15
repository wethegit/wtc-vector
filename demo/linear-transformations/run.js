import Vector from "../../src/wtc-vector";
import _DrawingVector from "../app/DrawingVector";
import _VectorPlayground from "../app/VectorPlayground";
import {colours} from '../app/colours';
import dat from 'dat-gui';
import updateCalculation from '../app/calcUpdate';

window.Vector = Vector;

let settings = {
  animating: false,
  time: 0,
  increments: 1000,
  scale: 100
}

class Gridline {
  constructor(x, y, v) {
    // The V indicates the directiont he dridline is pointing as well as its length
    this.v = v;
    // This class expects the gridline to be centered
    this.position = new Vector(x, y);
    this.startPosition = this.position.clone().subtract(this.v.divideScalarNew(2));
    this.endPosition = this.position.clone().add(this.v.divideScalarNew(2));

    this.lineWidth = 1;
    this.color = '#01a7f9';

    if(x == 0 && y == 0) {
      this.trace = true;
    }

  }
  draw(playground) {
    let unitX = playground.scaledUnitVectorX; // iHat
    let unitY = playground.scaledUnitVectorY; // jHat
    let unitVector = unitX.addNew(unitY);
    let scale = playground.scale;
    let offset = playground.offset; // creating the offset
    let ctx = playground.mainCtx;

    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;

    let translatedVectorA = this.startPosition.clone();
    translatedVectorA.x = offset.x + (this.startPosition.x * unitX.x) + (this.startPosition.y * unitY.x);
    translatedVectorA.y = offset.y + (this.startPosition.x * unitX.y) + (this.startPosition.y * unitY.y);
    let translatedVectorB = this.endPosition.clone();
    translatedVectorB.x = offset.x + (this.endPosition.x * unitX.x) + (this.endPosition.y * unitY.x);
    translatedVectorB.y = offset.y + (this.endPosition.x * unitX.y) + (this.endPosition.y * unitY.y);

    ctx.moveTo(translatedVectorA.x, translatedVectorA.y);
    ctx.lineTo(translatedVectorB.x, translatedVectorB.y);

    ctx.stroke();
  }
}

class VectorPlayground extends _VectorPlayground {
  static init() {
    super.init(...arguments);

    this.setupGridlines();
  }

  static setupGridlines() {
    this.gridlines = [];

    let xGridSize = 20;
    let yGridSize = 20;

    let xPos = 0;
    while(xPos < xGridSize / 2) {
      this.gridlines.push(new Gridline(xPos, 0, new Vector(0, yGridSize-2)));
      xPos++;
    }
    xPos = -1;
    while(xPos > -(xGridSize / 2)) {
      this.gridlines.push(new Gridline(xPos, 0, new Vector(0, yGridSize-2)));
      xPos--;
    }

    let yPos = 0;
    while(yPos < yGridSize / 2) {
      this.gridlines.push(new Gridline(0, yPos, new Vector(xGridSize-2, 0)));
      yPos++;
    }
    yPos = -1;
    while(yPos > -(yGridSize / 2)) {
      this.gridlines.push(new Gridline(0, yPos, new Vector(xGridSize-2, 0)));
      yPos--;
    }

  }

  static drawGrid() {
    super.drawGrid();

    this.gridlines.forEach(function(gridline) {
      gridline.draw(this);
    }.bind(this));
  }

  static set scale(scale) {
    if(typeof scale === 'number') {
      this._scale = scale;
      this.setupGridlines();
    }
  }
  static get scale() {
    return this._scale || 1;
  }
}

class DrawingVector extends _DrawingVector {

  constructor() {
    super(...arguments);

    this._v = this.v;
  }

  draw(playground) {
    let textLabel = '';
    if(this.textLabel) textLabel = `${this.textLabel} : `;
    this.label = `${textLabel}[ ${Math.round(this._v.x * 100) / 100}, ${Math.round(this._v.y * 100) / 100} ]`;
    super.draw(playground);
  }

  set textLabel(label) {
    this._textLabel = label;
  }
  get textLabel() {
    return this._textLabel || '';
  }
}

window.VectorPlayground = VectorPlayground;

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(function() {

  // Setting up our basic vectors
  // Notice that they are so much smaller than previously. This is because
  // we're going to rely on the "world's" unit vector to translate these into
  // visibly large values for rendering
  let va = new DrawingVector(2, -2, colours[0]); // The vector on the vector space
  let vb = new DrawingVector(1, 0, colours[1]); // A graphical representation of the X unit vector
  let vc = new DrawingVector(0, 1, colours[2]); // A graphical representation of the Y unit vector
  va.textLabel = 'Vc';
  vb.textLabel = 'i';
  vc.textLabel = 'j';

  // Initiallising the world
  VectorPlayground.init();
  // Adding the initial unit vectors
  // VectorPlayground.unitVectorX = new Vector(100, 0);
  // VectorPlayground.unitVectorY = new Vector(0, 100);
  settings._unitVectorX = VectorPlayground.unitVectorX;
  settings._unitVectorY = VectorPlayground.unitVectorY;
  settings._vector0 = va.v;
  settings._vector0translate = va.v.clone();
  va.outputVector = settings._vector0translate;
  settings.startUVX = VectorPlayground.unitVectorX.clone();
  settings.startUVY = VectorPlayground.unitVectorY.clone();
  settings.endUVX = new Vector(0, 1);
  settings.endUVY = new Vector(-1, 0);
  settings.vector = va.v;

  // Add the vectors to stage
  VectorPlayground.addVector(va);
  VectorPlayground.addVector(vb);
  VectorPlayground.addVector(vc);

  // Animation
  let update = function() {

    if(settings.animating) {

      // Update the angle of the vector
      va.v.angle += 0.01;

      requestAnimationFrame(update);
    }

  }

  update();

  // Set up the dat gui
  var gui = new dat.GUI();
  var animationControl = gui.add(settings, 'animating');
  animationControl.onChange(function(value) {
    if(value == true) {
      update();
    }
  });
  let prec = [];
  let f_unitX = gui.addFolder('End Unit X');
  prec.push(f_unitX.add(settings.endUVX, 'x'));
  prec.push(f_unitX.add(settings.endUVX, 'y'));
  let f_unitY = gui.addFolder('End Unit Y');
  prec.push(f_unitY.add(settings.endUVY, 'x'));
  prec.push(f_unitY.add(settings.endUVY, 'y'));
  let time = gui.add(settings, 'time', 0, settings.increments);
  time.onChange(function(value) {
    let diffX = settings.endUVX.subtractNew(settings.startUVX);
    let diffY = settings.endUVY.subtractNew(settings.startUVY);
    let incrementX = diffX.divideScalarNew(settings.increments);
    let incrementY = diffY.divideScalarNew(settings.increments);
    VectorPlayground.unitVectorX = settings.startUVX.addNew(incrementX.multiplyScalar(value));
    VectorPlayground.unitVectorY = settings.startUVY.addNew(incrementY.multiplyScalar(value));

    settings._unitVectorX.x = VectorPlayground.unitVectorX.x;
    settings._unitVectorX.y = VectorPlayground.unitVectorX.y;
    settings._unitVectorY.x = VectorPlayground.unitVectorY.x;
    settings._unitVectorY.y = VectorPlayground.unitVectorY.y;
    settings.vector.x = va.v.x;
    settings.vector.y = va.v.y;

    vb._v = settings._unitVectorX;
    vc._v = settings._unitVectorY;
  });
  // let t_unitX = gui.addFolder('Translated Unit X');
  // prec.push(t_unitX.add(settings._unitVectorX, 'x').listen());
  // prec.push(t_unitX.add(settings._unitVectorX, 'y').listen());
  // let t_unitY = gui.addFolder('Translated Unit Y');
  // prec.push(t_unitY.add(settings._unitVectorY, 'x').listen());
  // prec.push(t_unitY.add(settings._unitVectorY, 'y').listen());
  // t_unitY.open();
  // t_unitX.open();
  let t_V = gui.addFolder('Vector');
  prec.push(t_V.add(settings.vector, 'x').listen());
  prec.push(t_V.add(settings.vector, 'y').listen());
  var scaleControl = gui.add(settings, 'scale');
  scaleControl.onChange(function(value) {
    VectorPlayground.scale = value;
  });
  prec.forEach(function(control) {
    control.__precision = 3;
    control.__impliedStep = 0.1;
  });

  updateCalculation(settings);
});

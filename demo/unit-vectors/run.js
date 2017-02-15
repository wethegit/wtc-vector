import Vector from "../../src/wtc-vector";
import _DrawingVector from "../app/DrawingVector";
import VectorPlayground from "../app/VectorPlayground";
import {colours, namedColours} from '../app/colours';
import dat from 'dat-gui';

window.Vector = Vector;

let settings = {
  animating: false,
  unitX: 100,
  unitY: 100
}

class DrawingVector extends _DrawingVector {
  constructor(x, y, color, lineWidth = 2, secondary = false, basis, offset) {

    super(x, y, color, lineWidth);

    this.secondary = secondary;
    this.basis = basis;
    if(offset instanceof Vector) this.offset = offset;

    if(this.secondary) {
      this.label = ` ${basis === 'j' ? y : x}${basis} `;
    } else {
      this.label = `[ ${x}, ${y} ]`;
    }

  }

}

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
  // we're going to rely on the "world's" unit vector and scale to translate
  // these into visibly large values for rendering
  let vectors = [];
  vectors.push(new DrawingVector(1, -2, colours[0]));
  vectors.push(new DrawingVector(1, 0, namedColours.silver, 1, true, 'i'));
  vectors.push(new DrawingVector(0, -2, namedColours.silver, 1, true, 'j', new Vector(1, 0)));
  vectors.push(new DrawingVector(-3, 1, colours[1]));
  vectors.push(new DrawingVector(-3, 0, namedColours.silver, 1, true, 'i'));
  vectors.push(new DrawingVector(0, 1, namedColours.silver, 1, true, 'j', new Vector(-3, 0)));
  vectors.push(new DrawingVector(-0.5, -3, colours[2]));
  vectors.push(new DrawingVector(-0.5, 0, namedColours.silver, 1, true, 'i'));
  vectors.push(new DrawingVector(0, -3, namedColours.silver, 1, true, 'j', new Vector(-0.5, 0)));

  // Initiallising the world
  VectorPlayground.init();

  VectorPlayground.unitVectorX = new Vector(1, 0);
  VectorPlayground.unitVectorY = new Vector(0, 1);

  // Add the vectors to stage
  vectors.forEach(function(vector) {
    VectorPlayground.addVector(vector);
  });

  // Animation
  let update = function() {

    if(settings.animating) {

      // Update the angle of the vector
      vectors[0].v.angle += 0.01;

      requestAnimationFrame(update);
    }

  }

  update();

  // Set up the dat gui
  let prec = [];
  var gui = new dat.GUI();
  var animationControl = gui.add(settings, 'animating');
  animationControl.onChange(function(value) {
    if(value == true) {
      update();
    }
  });
  let f_unitX = gui.addFolder('Unit X (i)');
  prec.push(f_unitX.add(VectorPlayground.unitVectorX, 'x').listen());
  prec.push(f_unitX.add(VectorPlayground.unitVectorX, 'y').listen());
  prec.push(f_unitX.add(VectorPlayground.unitVectorX, 'length').listen());
  let f_unitY = gui.addFolder('Unit Y (j)');
  prec.push(f_unitY.add(VectorPlayground.unitVectorY, 'x').listen());
  prec.push(f_unitY.add(VectorPlayground.unitVectorY, 'y').listen());
  prec.push(f_unitY.add(VectorPlayground.unitVectorY, 'length').listen());
  prec.forEach(function(control) {
    control.__precision = 3;
    control.__impliedStep = 0.05;
  });
});

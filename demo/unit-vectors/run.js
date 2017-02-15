import Vector from "../../src/wtc-vector";
import DrawingVector from "../app/DrawingVector";
import VectorPlayground from "../app/VectorPlayground";
import {colours} from '../app/colours';
import dat from 'dat-gui';

window.Vector = Vector;

let settings = {
  animating: false,
  unitX: 100,
  unitY: 100
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
  // we're going to rely on the "world's" unit vector to translate these into
  // visibly large values for rendering
  let va = new DrawingVector(1, -2, colours[0]);
  let vb = new DrawingVector(-3, 1, colours[1]);
  let vc = new DrawingVector(0, -3, colours[2]);
  va.label = '[ 1, -2 ]';
  vb.label = '[ -3, 1 ]';
  vc.label = '[ 0, -3 ]';

  // Initiallising the world
  VectorPlayground.init();

  VectorPlayground.unitVectorX = new Vector(1, 0);
  VectorPlayground.unitVectorY = new Vector(0, 1);

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
  let prec = [];
  var gui = new dat.GUI();
  var animationControl = gui.add(settings, 'animating');
  animationControl.onChange(function(value) {
    if(value == true) {
      update();
    }
  });
  let f_unitX = gui.addFolder('Unit X');
  prec.push(f_unitX.add(VectorPlayground.unitVectorX, 'x').listen());
  prec.push(f_unitX.add(VectorPlayground.unitVectorX, 'y').listen());
  prec.push(f_unitX.add(VectorPlayground.unitVectorX, 'length').listen());
  let f_unitY = gui.addFolder('Unit Y');
  prec.push(f_unitY.add(VectorPlayground.unitVectorY, 'x').listen());
  prec.push(f_unitY.add(VectorPlayground.unitVectorY, 'y').listen());
  prec.push(f_unitY.add(VectorPlayground.unitVectorY, 'length').listen());
  prec.forEach(function(control) {
    control.__precision = 3;
    control.__impliedStep = 0.05;
  });
});

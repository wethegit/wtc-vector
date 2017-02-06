import Vector from "../../src/wtc-vector";
import DrawingVector from "../app/DrawingVector";
import VectorPlayground from "../app/VectorPlayground";
import colours from '../app/colours';
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

  // Initiallising the world
  VectorPlayground.init();
  // Adding the initial unit vectors
  VectorPlayground.unitVectorX = new Vector(settings.unitX, 0);
  VectorPlayground.unitVectorY = new Vector(0, settings.unitY);

  // Add the vectors to stage
  VectorPlayground.addVector(va);
  VectorPlayground.addVector(vb);

  // Mousemove to control the unit vectors
  window.addEventListener('mousemove', function(e) {
    var dimensions = new Vector(window.innerWidth, window.innerHeight).divideScalar(2);
    var mousepos = new Vector(e.clientX, e.clientY).subtract(VectorPlayground.offset).divide(dimensions).multiplyScalar(200);
    settings.unitX = mousepos.x;
    settings.unitY = mousepos.y;

    VectorPlayground.unitVectorX = new Vector(settings.unitX, 0);
    VectorPlayground.unitVectorY = new Vector(0, settings.unitY);
  });

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
  var unitX = gui.add(settings, 'unitX').listen();
  var unitY = gui.add(settings, 'unitY').listen();
  unitX.onChange(function(value) {
    if(typeof value !== 'number') return;
    VectorPlayground.unitVectorX = new Vector(value, 0);
  });
  unitY.onChange(function(value) {
    if(typeof value !== 'number') return;
    VectorPlayground.unitVectorY = new Vector(0, value);
  });
});

import Vector from "../src/wtc-vector";
import DrawingVector from "./app/DrawingVector";
import VectorPlayground from "./app/VectorPlayground";
import {colours} from './app/colours';

window.Vector = Vector;

let settings = {
  animating: false
}
window.settings = settings;

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {

  let va = new DrawingVector(-2, -2, colours[0]);
  let vb = new DrawingVector(1, 1, colours[1]);
  settings.va = va.v;
  settings.vb = vb.v;

  // Initiallising the world
  VectorPlayground.init();

  // Add the vectors to stage
  VectorPlayground.addVector(va);
  VectorPlayground.addVector(vb);

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
  let _va = gui.addFolder('Vector A');
  let unitX_x = _va.add(settings.va, '_x').listen();
  let unitX_y = _va.add(settings.va, '_y').listen();
  let _vb = gui.addFolder('Vector B');
  let unitY_x = _vb.add(settings.vb, 'x').listen();
  let unitY_y = _vb.add(settings.vb, 'y').listen();
  _va.open();
  _vb.open();
});

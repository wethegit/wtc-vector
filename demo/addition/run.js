import Vector from "../../src/wtc-vector";
import DrawingVector from "../app/DrawingVector";
import VectorPlayground from "../app/VectorPlayground";
import colours from '../app/colours';
import dat from 'dat-gui';

window.Vector = Vector;

let settings = {
  animating: false
}

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(function() {

  let va = new DrawingVector(100, -200, colours[0]);
  let vb = new DrawingVector(-300, 100, colours[1]);
  vb.offset = va.v;
  let vc = new DrawingVector(0, 0, '#CCCCCC');
  vc.v = va.v.addNew(vb.v);
  let vd = new DrawingVector(0, 0, '#777777');
  vd.v = va.v.subtractNew(vb.v);

  console.log(va.v.dot(vb.v));

  VectorPlayground.init();
  VectorPlayground.addVector(vc);
  VectorPlayground.addVector(va);
  VectorPlayground.addVector(vb);
  VectorPlayground.addVector(vd);

  let update = function() {

    if(settings.animating) {

      // Update the angle of the vector
      va.v.angle += 0.01;

      // Update Vector C based on the addition of the two components
      vc.v = va.v.addNew(vb.v);

      // Update Vector D based on the addition of the two components
      vd.v = va.v.subtractNew(vb.v);

      requestAnimationFrame(update);
    }

  }

  update();

  var gui = new dat.GUI();
  var animationControl = gui.add(settings, 'animating');
  animationControl.onChange(function(value) {
    if(value == true) {
      update();
    }
  });

});

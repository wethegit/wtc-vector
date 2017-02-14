import Vector from "../../src/wtc-vector";
import DrawingVector from "../app/DrawingVector";
import VectorPlayground from "../app/VectorPlayground";
import {colours} from '../app/colours';
import dat from 'dat-gui';
import updateCalculation from '../app/calcUpdate';

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

  let va = new DrawingVector(1, -2, colours[0]);
  va.label = `[ 1, -2 ]`;
  let vb = new DrawingVector(-3, 1, colours[1]);
  vb.label = `[ -3, 1 ]`;
  settings._vector0 = va.v;
  settings._vector1 = vb.v;
  vb.offset = va.v;
  let vc = new DrawingVector(0, 0, '#CCCCCC');
  vc.v = va.v.addNew(vb.v);
  settings._vector2 = vc.v;
  vc.label = `[ ${vc.v.x}, ${vc.v.y} ]`;
  let vd = new DrawingVector(0, 0, '#777777');
  vd.v = va.v.subtractNew(vb.v);
  vd.label = `subtraction`;

  VectorPlayground.init();
  VectorPlayground.addVector(vc);
  VectorPlayground.addVector(va);
  VectorPlayground.addVector(vb);
  VectorPlayground.addVector(vd);

  let update = function(animate = true) {

    if(settings.animating && animate === true) {

      // Update the angle of the vector
      va.v.angle += 0.01;

      requestAnimationFrame(function() { update(true); });
    }

    // Update Vector C based on the addition of the two components
    vc.v = va.v.addNew(vb.v);

    // Update Vector D based on the addition of the two components
    vd.v = va.v.subtractNew(vb.v);

    // Update the settings variables
    settings._vector0 = va.v;
    settings._vector2 = vc.v;

    // update the labels
    va.label = `[ ${Math.round(va.v.x * 100) / 100}, ${Math.round(va.v.y * 100) / 100} ]`;
    vb.label = `[ ${Math.round(vb.v.x * 100) / 100}, ${Math.round(vb.v.y * 100) / 100} ]`;
    vc.label = `[ ${Math.round(vc.v.x * 100) / 100}, ${Math.round(vc.v.y * 100) / 100} ]`;
    vd.label = `subtraction [ ${Math.round(vd.v.x * 100) / 100}, ${Math.round(vd.v.y * 100) / 100} ]`;

  }

  update();

  var gui = new dat.GUI();
  var animationControl = gui.add(settings, 'animating');
  animationControl.onChange(function(value) {
    if(value == true) {
      update();
    }
  });
  let t_V_onChange = function(val, item) {
    update(false);
  }
  let t_VA = gui.addFolder('Vector A');
  let t_VA_x = t_VA.add(settings._vector0, 'x').listen();
  let t_VA_y = t_VA.add(settings._vector0, 'y').listen();
  let t_VB = gui.addFolder('Vector B');
  let t_VB_x = t_VB.add(settings._vector1, 'x').listen();
  let t_VB_y = t_VB.add(settings._vector1, 'y').listen();
  let t_VC = gui.addFolder('Vector C');
  let t_VC_x = t_VC.add(settings._vector2, 'x').listen();
  let t_VC_y = t_VC.add(settings._vector2, 'y').listen();
  t_VA_x.onChange(t_V_onChange);
  t_VA_y.onChange(t_V_onChange);
  t_VB_x.onChange(t_V_onChange);
  t_VB_y.onChange(t_V_onChange);
  t_VA_x.__precision = t_VA_y.__precision = t_VB_x.__precision = t_VB_y.__precision = 3;
  t_VA_x.__impliedStep = t_VA_y.__impliedStep = t_VB_x.__impliedStep = t_VB_y.__impliedStep = 0.05;

  updateCalculation(settings);

});

import Vector from "../../src/wtc-vector";
import DrawingVector from "../app/DrawingVector";
import VectorPlayground from "../app/VectorPlayground";
import {colours} from '../app/colours';
import dat from 'dat-gui';
import updateCalculation from '../app/calcUpdate';

window.Vector = Vector;

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


let settings = {
  speed: 0.01,
}

ready(function() {


  let draw = function() {

    drawSnowflakes();

    requestAnimationFrame(draw);
  }

  // These are the vectors that affect the snowflake's movement
  let factor = 2;
  let gravity = new DrawingVector(0, 1);
  let float = new DrawingVector(0.5, 0.5);

  settings.gravityV = gravity.v;
  settings.floatV = float.v;

  // Initiallising the world
  VectorPlayground.init();

  let snowflakes = [];

  let addSnowklake = function(x, y) {
    let snowflake = {
      radius: 2 + Math.random() * 10,
      opacity: 20 + Math.random() * 60,
      pos: new Vector(x, y)
    }

    snowflakes.push(snowflake);
  }

  // Add the vectors to stage
  VectorPlayground.addVector(gravity);
  VectorPlayground.addVector(float);

  let ctx = VectorPlayground.mainCtx;
  let ctx2 = VectorPlayground.secondarCtx;

  let drawSnowflakes = function() {
    float.v.rotate(settings.speed);

    let dims = VectorPlayground.dimensions;
    let waveData = ctx2.getImageData(0,0,dims.width, dims.height);
    ctx2.clearRect(0,0,dims.width, dims.height0,0,dims.width, dims.height);
    ctx2.putImageData(waveData, 1, 0);
    ctx2.fillStyle = '#FFFFFF';
    let pointV = new Vector(VectorPlayground.offset.width + float.v.length * VectorPlayground.scale, VectorPlayground.offset.height + float.v.y * VectorPlayground.scale);
    ctx2.fillRect(pointV.x, pointV.y, 1, 1);

    ctx.strokeStyle = '#FFFFFF';
    let floatV = new Vector(VectorPlayground.offset.width + float.v.x * VectorPlayground.scale, VectorPlayground.offset.height + float.v.y * VectorPlayground.scale);
    ctx.moveTo(floatV.x, floatV.y+1);
    ctx.lineTo(pointV.x, pointV.y+1);
    ctx.stroke();

    snowflakes.forEach(function(flake, index) {
      // Apply our forces
      let forces = new Vector(0,0);
      forces.add(gravity.v.divideScalarNew(factor));
      forces.add(float.v.divideScalarNew(factor).multiply(new Vector(1, 0)));
      // Add our forces to the position
      flake.pos.add(forces);

      // draw the flake
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255," + flake.opacity / 100 + ")";
      ctx.arc(flake.pos.x, flake.pos.y, flake.radius, 0, 2 * Math.PI, false);
      ctx.fill();

      if(flake.pos.y > window.innerHeight) {
        snowflakes.splice(index, 1);
      }


    });
  }


  document.body.addEventListener('click', function(e) {
    addSnowklake(e.clientX, e.clientY);
  });





  draw();

  // Set up the dat gui
  let prec = [];
  var gui = new dat.GUI();
  var speedControl = gui.add(settings, 'speed');
  let t_gravV = gui.addFolder('Gravity Vector');
  prec.push(t_gravV.add(settings.gravityV, 'length').listen());
  let t_sinV = gui.addFolder('Sinewave Vector');
  prec.push(t_sinV.add(settings.floatV, 'length').listen());
  t_sinV.open();
  prec.forEach(function(control) {
    control.__precision = 3;
    control.__impliedStep = 0.01;
  });
});

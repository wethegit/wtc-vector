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

ready(function() {


  let draw = function() {

    drawSnowflakes();

    requestAnimationFrame(draw);
  }

  // These are the vectors that affect the snowflake's movement
  let factor = 2;
  let gravity = new DrawingVector(0, 1);
  let float = new DrawingVector(0.5, 0.5);

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

  let drawSnowflakes = function() {
    float.v.rotate(0.005);

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
});

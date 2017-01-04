import Vector from "../../src/wtc-vector";

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext("2d");
  let canvas2 = document.getElementById('canvas2');
  let ctx2 = canvas2.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  let offset = new Vector(window.innerWidth / 2, window.innerHeight / 2);

  var vectors = [];

  var colours = ['#c678dd', '#98c379', '#c34448', '#4e9c9e', '#d18549', '#abb2bf']

  var arrowV1 = new Vector(-10, -10);
  var arrowV2 = new Vector(-10, 10);

  window.addEventListener('resize', function(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    offset.reset(window.innerWidth / 2, window.innerHeight / 2);
  });

  window.addVector = function(x, y, moving = false) {

    var vectorObj = {
      v: new Vector(x, y),
      moving: moving
    }

    vectors.push(vectorObj);

    return vectorObj;
  }

  let drawScale = function() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666';

    ctx.moveTo(0, offset.y);
    ctx.lineTo(canvas.width, offset.y);
    ctx.moveTo(offset.x, 0);
    ctx.lineTo(offset.x, canvas.height);

    var x, y;

    x = offset.x;
    while(x < canvas.width) {
      x += 100;

      ctx.moveTo(x, offset.y);
      ctx.lineTo(x, offset.y - 10);
    }
    x = offset.x;
    while(x > 0) {
      x -= 100;

      ctx.moveTo(x, offset.y);
      ctx.lineTo(x, offset.y - 10);
    }
    y = offset.y;
    while(y < canvas.height) {
      y += 100;

      ctx.moveTo(offset.x, y);
      ctx.lineTo(offset.x + 10, y);
    }
    y = offset.y;
    while(y > 0) {
      y -= 100;

      ctx.moveTo(offset.x, y);
      ctx.lineTo(offset.x + 10, y);
    }

    ctx.stroke();
  }

  let drawVector = function(v, i, drawTrace = false, offsetX = offset.x, offsetY = offset.y) {
    var x = offsetX;
    var y = offsetY;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = colours[i % colours.length];
    ctx.moveTo(x, y);
    x = v.x + offsetX;
    y = v.y + offsetY;
    ctx.lineTo(x, y);

    var av1 = arrowV1.rotateNew(v.angle);
    var av2 = arrowV2.rotateNew(v.angle);

    ctx.lineTo(av1.x + x, av1.y + y);
    ctx.moveTo(x, y);
    ctx.lineTo(av2.x + x, av2.y + y);

    ctx.stroke();
  }

  let draw = function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#282c34";
    ctx.beginPath();
    ctx.rect(0,0, canvas.width, canvas.height);
    ctx.fill();

    drawScale();
    drawSnowflakes();

    for(var i =0; i < vectors.length; i++) {
      let v = vectors[i];
      let drawTrace = false;
      drawVector(v.v, i, drawTrace);
    }

    requestAnimationFrame(draw);
  }

  // These are the vectors that affect the snowflake's movement
  let factor = 200;
  let gravity = addVector(0, 100);
  let float = addVector(50, 50);

  let snowflakes = [];

  console.log(gravity.v, gravity.v.divideScalarNew(factor))

  let addSnowklake = function(x, y) {
    let snowflake = {
      radius: 2 + Math.random() * 10,
      opacity: 20 + Math.random() * 60,
      pos: new Vector(x, y)
    }

    console.log(snowflake);

    snowflakes.push(snowflake);
  }

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
      ctx.fillStyle = "#FFFFFF" + Math.round(flake.opacity / 100 * 255).toString(16);
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

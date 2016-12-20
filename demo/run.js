import Vector from "../src/wtc-vector";

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

  var colours = ['#c678dd', '#98c379', '#c34448', '#4e9c9e', '#d18549', 'abb2bf']

  var arrowV1 = new Vector(-10, -10);
  var arrowV2 = new Vector(-10, 10);

  window.addEventListener('resize', function(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    offset.reset(window.innerWidth / 2, window.innerHeight / 2);
  });

  document.body.addEventListener('click', function(e) {
    vectors.push({
      v: new Vector(e.clientX - offset.x, e.clientY - offset.y),
      moving: moving
    });
  });

  window.addVector = function(x, y, moving = false) {

    vectors.push({
      v: new Vector(x, y),
      moving: moving
    });
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

    // console.log(v.angle);

    var av1 = arrowV1.rotateNew(v.angle);
    var av2 = arrowV2.rotateNew(v.angle);

    // var v1 = arrowV1.clone();
    // var v2 = arrowV2.clone();

    ctx.lineTo(av1.x + x, av1.y + y);
    ctx.moveTo(x, y);
    ctx.lineTo(av2.x + x, av2.y + y);

    ctx.stroke();

    if(drawTrace) {
      ctx2.beginPath();
      ctx2.arc(x, y, 2, 0, 2 * Math.PI, false);
      ctx2.fillStyle = colours[i % colours.length];
      ctx2.fill();
    }

    if((i+1) % 2 === 0) {
      // Vector subtraction - finding the difference between two vectors
      // var v1 = vectors[i-1].v;
      // var v2 = v;
      // var v3 = v1.subtractNew(v2);
      //
      // drawVector(v3, i+1, x, y);

      // Vector addition - adding A to B
      var v1 = vectors[i-1].v;
      var v2 = v;
      var v3 = v1.addNew(v2);

      drawVector(v3, i+1);
    }
  }

  let draw = function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#282c34";
    ctx.beginPath();
    ctx.rect(0,0, canvas.width, canvas.height);
    ctx.fill();

    drawScale();

    for(var i =0; i < vectors.length; i++) {
      let v = vectors[i];
      if(v.moving) {
        v.v.rotate(0.005);
      }
      drawVector(v.v, i);
    }

    requestAnimationFrame(draw);
  }

  draw()
});

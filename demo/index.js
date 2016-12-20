(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _wtcVector = require('../src/wtc-vector');

var _wtcVector2 = _interopRequireDefault(_wtcVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  var canvas2 = document.getElementById('canvas2');
  var ctx2 = canvas2.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  var offset = new _wtcVector2.default(window.innerWidth / 2, window.innerHeight / 2);

  var vectors = [];

  var colours = ['#c678dd', '#98c379', '#c34448', '#4e9c9e', '#d18549', 'abb2bf'];

  var arrowV1 = new _wtcVector2.default(-10, -10);
  var arrowV2 = new _wtcVector2.default(-10, 10);

  window.addEventListener('resize', function (e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    offset.reset(window.innerWidth / 2, window.innerHeight / 2);
  });

  document.body.addEventListener('click', function (e) {
    vectors.push({
      v: new _wtcVector2.default(e.clientX - offset.x, e.clientY - offset.y),
      moving: moving
    });
  });

  window.addVector = function (x, y) {
    var moving = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


    vectors.push({
      v: new _wtcVector2.default(x, y),
      moving: moving
    });
  };

  var drawScale = function drawScale() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666';

    ctx.moveTo(0, offset.y);
    ctx.lineTo(canvas.width, offset.y);
    ctx.moveTo(offset.x, 0);
    ctx.lineTo(offset.x, canvas.height);

    var x, y;

    x = offset.x;
    while (x < canvas.width) {
      x += 100;

      ctx.moveTo(x, offset.y);
      ctx.lineTo(x, offset.y - 10);
    }
    x = offset.x;
    while (x > 0) {
      x -= 100;

      ctx.moveTo(x, offset.y);
      ctx.lineTo(x, offset.y - 10);
    }
    y = offset.y;
    while (y < canvas.height) {
      y += 100;

      ctx.moveTo(offset.x, y);
      ctx.lineTo(offset.x + 10, y);
    }
    y = offset.y;
    while (y > 0) {
      y -= 100;

      ctx.moveTo(offset.x, y);
      ctx.lineTo(offset.x + 10, y);
    }

    ctx.stroke();
  };

  var drawVector = function drawVector(v, i) {
    var drawTrace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var offsetX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : offset.x;
    var offsetY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : offset.y;

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

    if (drawTrace) {
      ctx2.beginPath();
      ctx2.arc(x, y, 1, 0, 2 * Math.PI, false);
      ctx2.fillStyle = colours[i % colours.length];
      ctx2.fill();
    }

    if ((i + 1) % 2 === 0) {
      // Vector subtraction - finding the difference between two vectors
      // var v1 = vectors[i-1].v;
      // var v2 = v;
      // var v3 = v1.subtractNew(v2);
      //
      // drawVector(v3, i+1, x, y);

      // Vector addition - adding A to B
      var v1 = vectors[i - 1].v;
      var v2 = v;
      var v3 = v1.addNew(v2);

      drawVector(v3, i + 1, true);
    }
  };

  var draw = function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#282c34";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    drawScale();

    for (var i = 0; i < vectors.length; i++) {
      var v = vectors[i];
      var drawTrace = false;
      if (v.moving) {
        v.v.rotate(0.005);
        drawTrace = true;
      }
      drawVector(v.v, i, drawTrace);
    }

    requestAnimationFrame(draw);
  };

  draw();

  // Add 2 vectors and have the second one move
  addVector(-200, -200);
  addVector(100, 100, true);
});

},{"../src/wtc-vector":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var conversionFactor = 180 / Math.PI;

var radianToDegrees = function radianToDegrees(radian) {
  return rad * conversionFactor;
};

var degreesToRadian = function degreesToRadian(degrees) {
  return deg / conversionFactor;
};

var Vector = function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: 'reset',
    value: function reset(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Vector(this.x, this.y);
    }
  }, {
    key: 'add',
    value: function add(vector) {
      this.x += vector.x;
      this.y += vector.y;
      return this;
    }
  }, {
    key: 'addNew',
    value: function addNew(vector) {
      var v = this.clone();
      return v.add(vector);
    }
  }, {
    key: 'addScalar',
    value: function addScalar(scalar) {
      return this.add(new Vector(scalar, scalar));
    }
  }, {
    key: 'addScalarNew',
    value: function addScalarNew(scalar) {
      var v = this.clone();
      return v.addScalar(scalar);
    }
  }, {
    key: 'subtract',
    value: function subtract(vector) {
      this.x -= vector.x;
      this.y -= vector.y;
      return this;
    }
  }, {
    key: 'subtractNew',
    value: function subtractNew(vector) {
      var v = this.clone();
      return v.subtract(vector);
    }
  }, {
    key: 'subtractScalar',
    value: function subtractScalar(scalar) {
      return this.subtract(new Vector(scalar, scalar));
    }
  }, {
    key: 'subtractScalarNew',
    value: function subtractScalarNew(scalar) {
      var v = this.clone();
      return v.subtractScalar(scalar);
    }
  }, {
    key: 'divide',
    value: function divide(vector) {
      if (vector.x !== 0) {
        this.x /= vector.x;
      } else {
        this.x = 0;
      }
      if (vector.y !== 0) {
        this.y /= vector.y;
      } else {
        this.y = 0;
      }
      return this;
    }
  }, {
    key: 'divideNew',
    value: function divideNew(vector) {
      var v = this.clone();
      return v.divide(vector);
    }
  }, {
    key: 'divideScalar',
    value: function divideScalar(scalar) {
      var v = new Vector(scalar, scalar);
      return this.divide(v);
    }
  }, {
    key: 'divideScalarNew',
    value: function divideScalarNew(scalar) {
      var v = this.clone();
      return v.divideScalar(scalar);
    }
  }, {
    key: 'multiply',
    value: function multiply(vector) {
      this.x *= vector.x;
      this.y *= vector.y;
      return this;
    }
  }, {
    key: 'multiplyNew',
    value: function multiplyNew(vector) {
      var v = this.clone();
      return v.multiply(vector);
    }
  }, {
    key: 'multiplyScalar',
    value: function multiplyScalar(scalar) {
      var v = new Vector(scalar, scalar);
      return this.multiply(v);
    }
  }, {
    key: 'multiplyScalarNew',
    value: function multiplyScalarNew(scalar) {
      var v = this.clone();
      return v.multiplyScalar(scalar);
    }
  }, {
    key: 'scale',
    value: function scale(scalar) {
      return this.multiplyScalar(scalar);
    }
  }, {
    key: 'scaleNew',
    value: function scaleNew(scalar) {
      return this.multiplyScalarNew(scalar);
    }
  }, {
    key: 'rotate',
    value: function rotate(radian) {
      var x = this.x * Math.cos(radian) - this.y * Math.sin(radian);
      var y = this.x * Math.sin(radian) + this.y * Math.cos(radian);

      this.x = x;
      this.y = y;

      return this;
    }
  }, {
    key: 'rotateNew',
    value: function rotateNew(radian) {
      var v = this.clone();
      return v.rotate(radian);
    }
  }, {
    key: 'rotateDeg',
    value: function rotateDeg(degrees) {
      this.rotate(degreesToRadian(degrees));
    }
  }, {
    key: 'rotateDegNew',
    value: function rotateDegNew(degrees) {
      return this.rotateNew(degreesToRadian(degrees));
    }
  }, {
    key: 'rotateBy',
    value: function rotateBy(radian) {
      var angle = this.angle + radian;
      return this.rotate(angle);
    }
  }, {
    key: 'rotateByNew',
    value: function rotateByNew(radian) {
      var v = this.clone();
      return v.rotateBy(radian);
    }
  }, {
    key: 'rotateTo',
    value: function rotateTo(radian) {
      return this.rotate(radian - this.angle);
    }
  }, {
    key: 'rotateToNew',
    value: function rotateToNew(radian) {
      var v = this.clone();
      return v.rotateTo(radian);
    }
  }, {
    key: 'x',
    set: function set(x) {
      if (typeof x == 'number') {
        this._x = x;
      } else {
        throw new TypeError('X should be a number');
      }
    },
    get: function get() {
      return this._x || 0;
    }
  }, {
    key: 'y',
    set: function set(y) {
      if (typeof y == 'number') {
        this._y = y;
      } else {
        throw new TypeError('Y should be a number');
      }
    },
    get: function get() {
      return this._y || 0;
    }
  }, {
    key: 'length',
    set: function set(length) {
      var factor;
      if (typeof length == 'number') {
        factor = length / this.length;
        this.multiplyScalar(factor);
      } else {
        throw new TypeError('length should be a number');
      }
    },
    get: function get() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: 'angle',
    set: function set(radian) {
      if (typeof radian == 'number') {
        this.rotate(radian);
      } else {
        throw new TypeError('angle should be a number');
      }
    },
    get: function get() {
      return Math.atan2(this.y, this.x);
    }
  }]);

  return Vector;
}();

exports.default = Vector;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL3J1bi5qcyIsInNyYy93dGMtdmVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsU0FBUyxLQUFULENBQWUsRUFBZixFQUFtQjtBQUNqQixNQUFJLFNBQVMsVUFBVCxJQUF1QixTQUEzQixFQUFxQztBQUNuQztBQUNELEdBRkQsTUFFTztBQUNMLGFBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLEVBQTlDO0FBQ0Q7QUFDRjs7QUFFRCxNQUFNLFlBQVc7O0FBRWYsTUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsTUFBSSxNQUFNLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFWO0FBQ0EsTUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkO0FBQ0EsTUFBSSxPQUFPLFFBQVEsVUFBUixDQUFtQixJQUFuQixDQUFYOztBQUVBLFNBQU8sS0FBUCxHQUFlLE9BQU8sVUFBdEI7QUFDQSxTQUFPLE1BQVAsR0FBZ0IsT0FBTyxXQUF2QjtBQUNBLFVBQVEsS0FBUixHQUFnQixPQUFPLFVBQXZCO0FBQ0EsVUFBUSxNQUFSLEdBQWlCLE9BQU8sV0FBeEI7O0FBRUEsTUFBSSxTQUFTLHdCQUFXLE9BQU8sVUFBUCxHQUFvQixDQUEvQixFQUFrQyxPQUFPLFdBQVAsR0FBcUIsQ0FBdkQsQ0FBYjs7QUFFQSxNQUFJLFVBQVUsRUFBZDs7QUFFQSxNQUFJLFVBQVUsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxRQUF4RCxDQUFkOztBQUVBLE1BQUksVUFBVSx3QkFBVyxDQUFDLEVBQVosRUFBZ0IsQ0FBQyxFQUFqQixDQUFkO0FBQ0EsTUFBSSxVQUFVLHdCQUFXLENBQUMsRUFBWixFQUFnQixFQUFoQixDQUFkOztBQUVBLFNBQU8sZ0JBQVAs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QUFMLENBQVcsS0FBSyxDQUFoQixFQUFtQixLQUFLLENBQXhCLENBQVA7QUFDRDs7Ozs7O2tCQUlZLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZlY3RvciBmcm9tIFwiLi4vc3JjL3d0Yy12ZWN0b3JcIjtcblxuZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gJ2xvYWRpbmcnKXtcbiAgICBmbigpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbik7XG4gIH1cbn1cblxucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIGxldCBjYW52YXMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhczInKTtcbiAgbGV0IGN0eDIgPSBjYW52YXMyLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgY2FudmFzMi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICBjYW52YXMyLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICBsZXQgb2Zmc2V0ID0gbmV3IFZlY3Rvcih3aW5kb3cuaW5uZXJXaWR0aCAvIDIsIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpO1xuXG4gIHZhciB2ZWN0b3JzID0gW107XG5cbiAgdmFyIGNvbG91cnMgPSBbJyNjNjc4ZGQnLCAnIzk4YzM3OScsICcjYzM0NDQ4JywgJyM0ZTljOWUnLCAnI2QxODU0OScsICdhYmIyYmYnXVxuXG4gIHZhciBhcnJvd1YxID0gbmV3IFZlY3RvcigtMTAsIC0xMCk7XG4gIHZhciBhcnJvd1YyID0gbmV3IFZlY3RvcigtMTAsIDEwKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oZSkge1xuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY2FudmFzMi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNhbnZhczIuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgb2Zmc2V0LnJlc2V0KHdpbmRvdy5pbm5lcldpZHRoIC8gMiwgd2luZG93LmlubmVySGVpZ2h0IC8gMik7XG4gIH0pO1xuXG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgdmVjdG9ycy5wdXNoKHtcbiAgICAgIHY6IG5ldyBWZWN0b3IoZS5jbGllbnRYIC0gb2Zmc2V0LngsIGUuY2xpZW50WSAtIG9mZnNldC55KSxcbiAgICAgIG1vdmluZzogbW92aW5nXG4gICAgfSk7XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRWZWN0b3IgPSBmdW5jdGlvbih4LCB5LCBtb3ZpbmcgPSBmYWxzZSkge1xuXG4gICAgdmVjdG9ycy5wdXNoKHtcbiAgICAgIHY6IG5ldyBWZWN0b3IoeCwgeSksXG4gICAgICBtb3Zpbmc6IG1vdmluZ1xuICAgIH0pO1xuICB9XG5cbiAgbGV0IGRyYXdTY2FsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzY2Nic7XG5cbiAgICBjdHgubW92ZVRvKDAsIG9mZnNldC55KTtcbiAgICBjdHgubGluZVRvKGNhbnZhcy53aWR0aCwgb2Zmc2V0LnkpO1xuICAgIGN0eC5tb3ZlVG8ob2Zmc2V0LngsIDApO1xuICAgIGN0eC5saW5lVG8ob2Zmc2V0LngsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgdmFyIHgsIHk7XG5cbiAgICB4ID0gb2Zmc2V0Lng7XG4gICAgd2hpbGUoeCA8IGNhbnZhcy53aWR0aCkge1xuICAgICAgeCArPSAxMDA7XG5cbiAgICAgIGN0eC5tb3ZlVG8oeCwgb2Zmc2V0LnkpO1xuICAgICAgY3R4LmxpbmVUbyh4LCBvZmZzZXQueSAtIDEwKTtcbiAgICB9XG4gICAgeCA9IG9mZnNldC54O1xuICAgIHdoaWxlKHggPiAwKSB7XG4gICAgICB4IC09IDEwMDtcblxuICAgICAgY3R4Lm1vdmVUbyh4LCBvZmZzZXQueSk7XG4gICAgICBjdHgubGluZVRvKHgsIG9mZnNldC55IC0gMTApO1xuICAgIH1cbiAgICB5ID0gb2Zmc2V0Lnk7XG4gICAgd2hpbGUoeSA8IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgIHkgKz0gMTAwO1xuXG4gICAgICBjdHgubW92ZVRvKG9mZnNldC54LCB5KTtcbiAgICAgIGN0eC5saW5lVG8ob2Zmc2V0LnggKyAxMCwgeSk7XG4gICAgfVxuICAgIHkgPSBvZmZzZXQueTtcbiAgICB3aGlsZSh5ID4gMCkge1xuICAgICAgeSAtPSAxMDA7XG5cbiAgICAgIGN0eC5tb3ZlVG8ob2Zmc2V0LngsIHkpO1xuICAgICAgY3R4LmxpbmVUbyhvZmZzZXQueCArIDEwLCB5KTtcbiAgICB9XG5cbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxuICBsZXQgZHJhd1ZlY3RvciA9IGZ1bmN0aW9uKHYsIGksIGRyYXdUcmFjZSA9IGZhbHNlLCBvZmZzZXRYID0gb2Zmc2V0LngsIG9mZnNldFkgPSBvZmZzZXQueSkge1xuICAgIHZhciB4ID0gb2Zmc2V0WDtcbiAgICB2YXIgeSA9IG9mZnNldFk7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3Vyc1tpICUgY29sb3Vycy5sZW5ndGhdO1xuICAgIGN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgeCA9IHYueCArIG9mZnNldFg7XG4gICAgeSA9IHYueSArIG9mZnNldFk7XG4gICAgY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgIHZhciBhdjEgPSBhcnJvd1YxLnJvdGF0ZU5ldyh2LmFuZ2xlKTtcbiAgICB2YXIgYXYyID0gYXJyb3dWMi5yb3RhdGVOZXcodi5hbmdsZSk7XG5cbiAgICBjdHgubGluZVRvKGF2MS54ICsgeCwgYXYxLnkgKyB5KTtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIGN0eC5saW5lVG8oYXYyLnggKyB4LCBhdjIueSArIHkpO1xuXG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgaWYoZHJhd1RyYWNlKSB7XG4gICAgICBjdHgyLmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Mi5hcmMoeCwgeSwgMSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgIGN0eDIuZmlsbFN0eWxlID0gY29sb3Vyc1tpICUgY29sb3Vycy5sZW5ndGhdO1xuICAgICAgY3R4Mi5maWxsKCk7XG4gICAgfVxuXG4gICAgaWYoKGkrMSkgJSAyID09PSAwKSB7XG4gICAgICAvLyBWZWN0b3Igc3VidHJhY3Rpb24gLSBmaW5kaW5nIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIHZlY3RvcnNcbiAgICAgIC8vIHZhciB2MSA9IHZlY3RvcnNbaS0xXS52O1xuICAgICAgLy8gdmFyIHYyID0gdjtcbiAgICAgIC8vIHZhciB2MyA9IHYxLnN1YnRyYWN0TmV3KHYyKTtcbiAgICAgIC8vXG4gICAgICAvLyBkcmF3VmVjdG9yKHYzLCBpKzEsIHgsIHkpO1xuXG4gICAgICAvLyBWZWN0b3IgYWRkaXRpb24gLSBhZGRpbmcgQSB0byBCXG4gICAgICB2YXIgdjEgPSB2ZWN0b3JzW2ktMV0udjtcbiAgICAgIHZhciB2MiA9IHY7XG4gICAgICB2YXIgdjMgPSB2MS5hZGROZXcodjIpO1xuXG4gICAgICBkcmF3VmVjdG9yKHYzLCBpKzEsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBkcmF3ID0gZnVuY3Rpb24oKSB7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzI4MmMzNFwiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdCgwLDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGRyYXdTY2FsZSgpO1xuXG4gICAgZm9yKHZhciBpID0wOyBpIDwgdmVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHYgPSB2ZWN0b3JzW2ldO1xuICAgICAgbGV0IGRyYXdUcmFjZSA9IGZhbHNlO1xuICAgICAgaWYodi5tb3ZpbmcpIHtcbiAgICAgICAgdi52LnJvdGF0ZSgwLjAwNSk7XG4gICAgICAgIGRyYXdUcmFjZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBkcmF3VmVjdG9yKHYudiwgaSwgZHJhd1RyYWNlKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gIH1cblxuICBkcmF3KCk7XG5cbiAgLy8gQWRkIDIgdmVjdG9ycyBhbmQgaGF2ZSB0aGUgc2Vjb25kIG9uZSBtb3ZlXG4gIGFkZFZlY3RvcigtMjAwLCAtMjAwKTtcbiAgYWRkVmVjdG9yKDEwMCwgMTAwLCB0cnVlKTtcbn0pO1xuIiwiXG5jb25zdCBjb252ZXJzaW9uRmFjdG9yID0gMTgwIC8gTWF0aC5QSTtcblxudmFyIHJhZGlhblRvRGVncmVlcyA9IGZ1bmN0aW9uKHJhZGlhbikge1xuXHRyZXR1cm4gcmFkICogY29udmVyc2lvbkZhY3Rvcjtcbn1cblxudmFyIGRlZ3JlZXNUb1JhZGlhbiA9IGZ1bmN0aW9uKGRlZ3JlZXMpIHtcblx0cmV0dXJuIGRlZyAvIGNvbnZlcnNpb25GYWN0b3I7XG59XG5cbmNsYXNzIFZlY3RvciB7XG5cbiAgY29uc3RydWN0b3IoeCwgeSl7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cblx0cmVzZXQoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblx0fVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55KTtcbiAgfVxuXG4gIGFkZCh2ZWN0b3IpIHtcbiAgICB0aGlzLnggKz0gdmVjdG9yLng7XG4gICAgdGhpcy55ICs9IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZE5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5hZGQodmVjdG9yKTtcbiAgfVxuXG4gIGFkZFNjYWxhcihzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5hZGQobmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcikpO1xuICB9XG4gIGFkZFNjYWxhck5ldyhzY2FsYXIpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5hZGRTY2FsYXIoc2NhbGFyKTtcbiAgfVxuXG4gIHN1YnRyYWN0KHZlY3Rvcikge1xuICAgIHRoaXMueCAtPSB2ZWN0b3IueDtcbiAgICB0aGlzLnkgLT0gdmVjdG9yLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc3VidHJhY3ROZXcodmVjdG9yKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuc3VidHJhY3QodmVjdG9yKTtcbiAgfVxuXG4gIHN1YnRyYWN0U2NhbGFyKHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLnN1YnRyYWN0KG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpKTtcbiAgfVxuICBzdWJ0cmFjdFNjYWxhck5ldyhzY2FsYXIpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5zdWJ0cmFjdFNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgZGl2aWRlKHZlY3Rvcikge1xuICAgIGlmKHZlY3Rvci54ICE9PSAwKSB7XG4gICAgICB0aGlzLnggLz0gdmVjdG9yLnhcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54ID0gMDtcbiAgICB9XG4gICAgaWYodmVjdG9yLnkgIT09IDApIHtcbiAgICAgIHRoaXMueSAvPSB2ZWN0b3IueVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnkgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkaXZpZGVOZXcodmVjdG9yKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuZGl2aWRlKHZlY3Rvcik7XG4gIH1cblxuICBkaXZpZGVTY2FsYXIoc2NhbGFyKSB7XG4gICAgdmFyIHYgPSBuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKTtcbiAgICByZXR1cm4gdGhpcy5kaXZpZGUodik7XG4gIH1cbiAgZGl2aWRlU2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmRpdmlkZVNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgbXVsdGlwbHkodmVjdG9yKSB7XG4gICAgdGhpcy54ICo9IHZlY3Rvci54O1xuICAgIHRoaXMueSAqPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBtdWx0aXBseU5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5tdWx0aXBseSh2ZWN0b3IpO1xuICB9XG5cbiAgbXVsdGlwbHlTY2FsYXIoc2NhbGFyKSB7XG4gICAgdmFyIHYgPSBuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKTtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseSh2KTtcbiAgfVxuICBtdWx0aXBseVNjYWxhck5ldyhzY2FsYXIpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5tdWx0aXBseVNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgc2NhbGUoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoc2NhbGFyKTtcbiAgfVxuICBzY2FsZU5ldyhzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhck5ldyhzY2FsYXIpO1xuICB9XG5cbiAgcm90YXRlKHJhZGlhbikge1xuICBcdHZhciB4ID0gKHRoaXMueCAqIE1hdGguY29zKHJhZGlhbikpIC0gKHRoaXMueSAqIE1hdGguc2luKHJhZGlhbikpO1xuICBcdHZhciB5ID0gKHRoaXMueCAqIE1hdGguc2luKHJhZGlhbikpICsgKHRoaXMueSAqIE1hdGguY29zKHJhZGlhbikpO1xuXG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXG4gIFx0cmV0dXJuIHRoaXM7XG4gIH1cbiAgcm90YXRlTmV3KHJhZGlhbikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnJvdGF0ZShyYWRpYW4pO1xuICB9XG5cbiAgcm90YXRlRGVnKGRlZ3JlZXMpIHtcbiAgICB0aGlzLnJvdGF0ZShkZWdyZWVzVG9SYWRpYW4oZGVncmVlcykpO1xuICB9XG4gIHJvdGF0ZURlZ05ldyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlTmV3KGRlZ3JlZXNUb1JhZGlhbihkZWdyZWVzKSk7XG4gIH1cblxuICByb3RhdGVCeShyYWRpYW4pIHtcblx0XHR2YXIgYW5nbGUgPSB0aGlzLmFuZ2xlICsgcmFkaWFuO1xuXHRcdHJldHVybiB0aGlzLnJvdGF0ZShhbmdsZSk7XG4gIH1cbiAgcm90YXRlQnlOZXcocmFkaWFuKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYucm90YXRlQnkocmFkaWFuKTtcbiAgfVxuXG5cdHJvdGF0ZVRvKHJhZGlhbikge1xuXHRcdHJldHVybiB0aGlzLnJvdGF0ZShyYWRpYW4tdGhpcy5hbmdsZSk7XG5cdH07XG5cdHJvdGF0ZVRvTmV3KHJhZGlhbikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnJvdGF0ZVRvKHJhZGlhbik7XG5cdH07XG5cbiAgc2V0IHgoeCkge1xuICAgIGlmKHR5cGVvZiB4ID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl94ID0geDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWCBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ggfHwgMDtcbiAgfVxuXG4gIHNldCB5KHkpIHtcbiAgICBpZih0eXBlb2YgeSA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5feSA9IHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1kgc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCB5KCkge1xuICAgIHJldHVybiB0aGlzLl95IHx8IDA7XG4gIH1cblxuICBzZXQgbGVuZ3RoKGxlbmd0aCkge1xuICAgIHZhciBmYWN0b3I7XG4gICAgaWYodHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJykge1xuICAgICAgZmFjdG9yID0gbGVuZ3RoIC8gdGhpcy5sZW5ndGg7XG4gICAgICB0aGlzLm11bHRpcGx5U2NhbGFyKGZhY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xlbmd0aCBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh0aGlzLnggKiB0aGlzLngpICsgKHRoaXMueSAqIHRoaXMueSkpO1xuICB9XG5cbiAgc2V0IGFuZ2xlKHJhZGlhbikge1xuICAgIGlmKHR5cGVvZiByYWRpYW4gPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucm90YXRlKHJhZGlhbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FuZ2xlIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgYW5nbGUoKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yO1xuIl19

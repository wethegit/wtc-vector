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

    // console.log(v.angle);

    var av1 = arrowV1.rotateNew(v.angle);
    var av2 = arrowV2.rotateNew(v.angle);

    // var v1 = arrowV1.clone();
    // var v2 = arrowV2.clone();

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
      if (v.moving) {
        v.v.rotate(0.005);
      }
      drawVector(v.v, i);
    }

    requestAnimationFrame(draw);
  };

  draw();

  // Add 2 vectors and have the second one move
  addVector(-100, -100);
  addVector(100, 200, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL3J1bi5qcyIsInNyYy93dGMtdmVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsU0FBUyxLQUFULENBQWUsRUFBZixFQUFtQjtBQUNqQixNQUFJLFNBQVMsVUFBVCxJQUF1QixTQUEzQixFQUFxQztBQUNuQztBQUNELEdBRkQsTUFFTztBQUNMLGFBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLEVBQTlDO0FBQ0Q7QUFDRjs7QUFFRCxNQUFNLFlBQVc7O0FBRWYsTUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsTUFBSSxNQUFNLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFWO0FBQ0EsTUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkO0FBQ0EsTUFBSSxPQUFPLFFBQVEsVUFBUixDQUFtQixJQUFuQixDQUFYOztBQUVBLFNBQU8sS0FBUCxHQUFlLE9BQU8sVUFBdEI7QUFDQSxTQUFPLE1BQVAsR0FBZ0IsT0FBTyxXQUF2QjtBQUNBLFVBQVEsS0FBUixHQUFnQixPQUFPLFVBQXZCO0FBQ0EsVUFBUSxNQUFSLEdBQWlCLE9BQU8sV0FBeEI7O0FBRUEsTUFBSSxTQUFTLHdCQUFXLE9BQU8sVUFBUCxHQUFvQixDQUEvQixFQUFrQyxPQUFPLFdBQVAsR0FBcUIsQ0FBdkQsQ0FBYjs7QUFFQSxNQUFJLFVBQVUsRUFBZDs7QUFFQSxNQUFJLFVBQVUsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxRQUF4RCxDQUFkOztBQUVBLE1BQUksVUFBVSx3QkFBVyxDQUFDLEVBQVosRUFBZ0IsQ0FBQyxFQUFqQixDQUFkO0FBQ0EsTUFBSSxVQUFVLHdCQUFXLENBQUMsRUFBWixFQUFnQixFQUFoQixDQUFkOztBQUVBLFNBQU8sZ0JBQVAs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QUF4QixDQUFQO0FBQ0Q7Ozs7OztrQkFJWSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4uL3NyYy93dGMtdmVjdG9yXCI7XG5cbmZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9ICdsb2FkaW5nJyl7XG4gICAgZm4oKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZm4pO1xuICB9XG59XG5cbnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBsZXQgY2FudmFzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMyJyk7XG4gIGxldCBjdHgyID0gY2FudmFzMi5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIGNhbnZhczIud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgY2FudmFzMi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgbGV0IG9mZnNldCA9IG5ldyBWZWN0b3Iod2luZG93LmlubmVyV2lkdGggLyAyLCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKTtcblxuICB2YXIgdmVjdG9ycyA9IFtdO1xuXG4gIHZhciBjb2xvdXJzID0gWycjYzY3OGRkJywgJyM5OGMzNzknLCAnI2MzNDQ0OCcsICcjNGU5YzllJywgJyNkMTg1NDknLCAnYWJiMmJmJ11cblxuICB2YXIgYXJyb3dWMSA9IG5ldyBWZWN0b3IoLTEwLCAtMTApO1xuICB2YXIgYXJyb3dWMiA9IG5ldyBWZWN0b3IoLTEwLCAxMCk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNhbnZhczIud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjYW52YXMyLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIG9mZnNldC5yZXNldCh3aW5kb3cuaW5uZXJXaWR0aCAvIDIsIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpO1xuICB9KTtcblxuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIHZlY3RvcnMucHVzaCh7XG4gICAgICB2OiBuZXcgVmVjdG9yKGUuY2xpZW50WCAtIG9mZnNldC54LCBlLmNsaWVudFkgLSBvZmZzZXQueSksXG4gICAgICBtb3Zpbmc6IG1vdmluZ1xuICAgIH0pO1xuICB9KTtcblxuICB3aW5kb3cuYWRkVmVjdG9yID0gZnVuY3Rpb24oeCwgeSwgbW92aW5nID0gZmFsc2UpIHtcblxuICAgIHZlY3RvcnMucHVzaCh7XG4gICAgICB2OiBuZXcgVmVjdG9yKHgsIHkpLFxuICAgICAgbW92aW5nOiBtb3ZpbmdcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBkcmF3U2NhbGUgPSBmdW5jdGlvbigpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyM2NjYnO1xuXG4gICAgY3R4Lm1vdmVUbygwLCBvZmZzZXQueSk7XG4gICAgY3R4LmxpbmVUbyhjYW52YXMud2lkdGgsIG9mZnNldC55KTtcbiAgICBjdHgubW92ZVRvKG9mZnNldC54LCAwKTtcbiAgICBjdHgubGluZVRvKG9mZnNldC54LCBjYW52YXMuaGVpZ2h0KTtcblxuICAgIHZhciB4LCB5O1xuXG4gICAgeCA9IG9mZnNldC54O1xuICAgIHdoaWxlKHggPCBjYW52YXMud2lkdGgpIHtcbiAgICAgIHggKz0gMTAwO1xuXG4gICAgICBjdHgubW92ZVRvKHgsIG9mZnNldC55KTtcbiAgICAgIGN0eC5saW5lVG8oeCwgb2Zmc2V0LnkgLSAxMCk7XG4gICAgfVxuICAgIHggPSBvZmZzZXQueDtcbiAgICB3aGlsZSh4ID4gMCkge1xuICAgICAgeCAtPSAxMDA7XG5cbiAgICAgIGN0eC5tb3ZlVG8oeCwgb2Zmc2V0LnkpO1xuICAgICAgY3R4LmxpbmVUbyh4LCBvZmZzZXQueSAtIDEwKTtcbiAgICB9XG4gICAgeSA9IG9mZnNldC55O1xuICAgIHdoaWxlKHkgPCBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICB5ICs9IDEwMDtcblxuICAgICAgY3R4Lm1vdmVUbyhvZmZzZXQueCwgeSk7XG4gICAgICBjdHgubGluZVRvKG9mZnNldC54ICsgMTAsIHkpO1xuICAgIH1cbiAgICB5ID0gb2Zmc2V0Lnk7XG4gICAgd2hpbGUoeSA+IDApIHtcbiAgICAgIHkgLT0gMTAwO1xuXG4gICAgICBjdHgubW92ZVRvKG9mZnNldC54LCB5KTtcbiAgICAgIGN0eC5saW5lVG8ob2Zmc2V0LnggKyAxMCwgeSk7XG4gICAgfVxuXG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgbGV0IGRyYXdWZWN0b3IgPSBmdW5jdGlvbih2LCBpLCBkcmF3VHJhY2UgPSBmYWxzZSwgb2Zmc2V0WCA9IG9mZnNldC54LCBvZmZzZXRZID0gb2Zmc2V0LnkpIHtcbiAgICB2YXIgeCA9IG9mZnNldFg7XG4gICAgdmFyIHkgPSBvZmZzZXRZO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG91cnNbaSAlIGNvbG91cnMubGVuZ3RoXTtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIHggPSB2LnggKyBvZmZzZXRYO1xuICAgIHkgPSB2LnkgKyBvZmZzZXRZO1xuICAgIGN0eC5saW5lVG8oeCwgeSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh2LmFuZ2xlKTtcblxuICAgIHZhciBhdjEgPSBhcnJvd1YxLnJvdGF0ZU5ldyh2LmFuZ2xlKTtcbiAgICB2YXIgYXYyID0gYXJyb3dWMi5yb3RhdGVOZXcodi5hbmdsZSk7XG5cbiAgICAvLyB2YXIgdjEgPSBhcnJvd1YxLmNsb25lKCk7XG4gICAgLy8gdmFyIHYyID0gYXJyb3dWMi5jbG9uZSgpO1xuXG4gICAgY3R4LmxpbmVUbyhhdjEueCArIHgsIGF2MS55ICsgeSk7XG4gICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICBjdHgubGluZVRvKGF2Mi54ICsgeCwgYXYyLnkgKyB5KTtcblxuICAgIGN0eC5zdHJva2UoKTtcblxuICAgIGlmKGRyYXdUcmFjZSkge1xuICAgICAgY3R4Mi5iZWdpblBhdGgoKTtcbiAgICAgIGN0eDIuYXJjKHgsIHksIDEsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICBjdHgyLmZpbGxTdHlsZSA9IGNvbG91cnNbaSAlIGNvbG91cnMubGVuZ3RoXTtcbiAgICAgIGN0eDIuZmlsbCgpO1xuICAgIH1cblxuICAgIGlmKChpKzEpICUgMiA9PT0gMCkge1xuICAgICAgLy8gVmVjdG9yIHN1YnRyYWN0aW9uIC0gZmluZGluZyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHR3byB2ZWN0b3JzXG4gICAgICAvLyB2YXIgdjEgPSB2ZWN0b3JzW2ktMV0udjtcbiAgICAgIC8vIHZhciB2MiA9IHY7XG4gICAgICAvLyB2YXIgdjMgPSB2MS5zdWJ0cmFjdE5ldyh2Mik7XG4gICAgICAvL1xuICAgICAgLy8gZHJhd1ZlY3Rvcih2MywgaSsxLCB4LCB5KTtcblxuICAgICAgLy8gVmVjdG9yIGFkZGl0aW9uIC0gYWRkaW5nIEEgdG8gQlxuICAgICAgdmFyIHYxID0gdmVjdG9yc1tpLTFdLnY7XG4gICAgICB2YXIgdjIgPSB2O1xuICAgICAgdmFyIHYzID0gdjEuYWRkTmV3KHYyKTtcblxuICAgICAgZHJhd1ZlY3Rvcih2MywgaSsxLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBsZXQgZHJhdyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMyODJjMzRcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QoMCwwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBkcmF3U2NhbGUoKTtcblxuICAgIGZvcih2YXIgaSA9MDsgaSA8IHZlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB2ID0gdmVjdG9yc1tpXTtcbiAgICAgIGlmKHYubW92aW5nKSB7XG4gICAgICAgIHYudi5yb3RhdGUoMC4wMDUpO1xuICAgICAgfVxuICAgICAgZHJhd1ZlY3Rvcih2LnYsIGkpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIGRyYXcoKTtcblxuICAvLyBBZGQgMiB2ZWN0b3JzIGFuZCBoYXZlIHRoZSBzZWNvbmQgb25lIG1vdmVcbiAgYWRkVmVjdG9yKC0xMDAsIC0xMDApO1xuICBhZGRWZWN0b3IoMTAwLCAyMDAsIHRydWUpO1xufSk7XG4iLCJcbmNvbnN0IGNvbnZlcnNpb25GYWN0b3IgPSAxODAgLyBNYXRoLlBJO1xuXG52YXIgcmFkaWFuVG9EZWdyZWVzID0gZnVuY3Rpb24ocmFkaWFuKSB7XG5cdHJldHVybiByYWQgKiBjb252ZXJzaW9uRmFjdG9yO1xufVxuXG52YXIgZGVncmVlc1RvUmFkaWFuID0gZnVuY3Rpb24oZGVncmVlcykge1xuXHRyZXR1cm4gZGVnIC8gY29udmVyc2lvbkZhY3Rvcjtcbn1cblxuY2xhc3MgVmVjdG9yIHtcblxuICBjb25zdHJ1Y3Rvcih4LCB5KXtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuXHRyZXNldCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXHR9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnkpO1xuICB9XG5cbiAgYWRkKHZlY3Rvcikge1xuICAgIHRoaXMueCArPSB2ZWN0b3IueDtcbiAgICB0aGlzLnkgKz0gdmVjdG9yLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWRkTmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmFkZCh2ZWN0b3IpO1xuICB9XG5cbiAgYWRkU2NhbGFyKHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLmFkZChuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKSk7XG4gIH1cbiAgYWRkU2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmFkZFNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgc3VidHJhY3QodmVjdG9yKSB7XG4gICAgdGhpcy54IC09IHZlY3Rvci54O1xuICAgIHRoaXMueSAtPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBzdWJ0cmFjdE5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5zdWJ0cmFjdCh2ZWN0b3IpO1xuICB9XG5cbiAgc3VidHJhY3RTY2FsYXIoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VidHJhY3QobmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcikpO1xuICB9XG4gIHN1YnRyYWN0U2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnN1YnRyYWN0U2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICBkaXZpZGUodmVjdG9yKSB7XG4gICAgaWYodmVjdG9yLnggIT09IDApIHtcbiAgICAgIHRoaXMueCAvPSB2ZWN0b3IueFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnggPSAwO1xuICAgIH1cbiAgICBpZih2ZWN0b3IueSAhPT0gMCkge1xuICAgICAgdGhpcy55IC89IHZlY3Rvci55XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueSA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGRpdmlkZU5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5kaXZpZGUodmVjdG9yKTtcbiAgfVxuXG4gIGRpdmlkZVNjYWxhcihzY2FsYXIpIHtcbiAgICB2YXIgdiA9IG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpO1xuICAgIHJldHVybiB0aGlzLmRpdmlkZSh2KTtcbiAgfVxuICBkaXZpZGVTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuZGl2aWRlU2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICBtdWx0aXBseSh2ZWN0b3IpIHtcbiAgICB0aGlzLnggKj0gdmVjdG9yLng7XG4gICAgdGhpcy55ICo9IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG11bHRpcGx5TmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2Lm11bHRpcGx5KHZlY3Rvcik7XG4gIH1cblxuICBtdWx0aXBseVNjYWxhcihzY2FsYXIpIHtcbiAgICB2YXIgdiA9IG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpO1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KHYpO1xuICB9XG4gIG11bHRpcGx5U2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2Lm11bHRpcGx5U2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICBzY2FsZShzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcihzY2FsYXIpO1xuICB9XG4gIHNjYWxlTmV3KHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyTmV3KHNjYWxhcik7XG4gIH1cblxuICByb3RhdGUocmFkaWFuKSB7XG4gIFx0dmFyIHggPSAodGhpcy54ICogTWF0aC5jb3MocmFkaWFuKSkgLSAodGhpcy55ICogTWF0aC5zaW4ocmFkaWFuKSk7XG4gIFx0dmFyIHkgPSAodGhpcy54ICogTWF0aC5zaW4ocmFkaWFuKSkgKyAodGhpcy55ICogTWF0aC5jb3MocmFkaWFuKSk7XG5cblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cbiAgXHRyZXR1cm4gdGhpcztcbiAgfVxuICByb3RhdGVOZXcocmFkaWFuKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYucm90YXRlKHJhZGlhbik7XG4gIH1cblxuICByb3RhdGVEZWcoZGVncmVlcykge1xuICAgIHRoaXMucm90YXRlKGRlZ3JlZXNUb1JhZGlhbihkZWdyZWVzKSk7XG4gIH1cbiAgcm90YXRlRGVnTmV3KGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGVOZXcoZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpKTtcbiAgfVxuXG4gIHJvdGF0ZUJ5KHJhZGlhbikge1xuXHRcdHZhciBhbmdsZSA9IHRoaXMuYW5nbGUgKyByYWRpYW47XG5cdFx0cmV0dXJuIHRoaXMucm90YXRlKGFuZ2xlKTtcbiAgfVxuICByb3RhdGVCeU5ldyhyYWRpYW4pIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5yb3RhdGVCeShyYWRpYW4pO1xuICB9XG5cblx0cm90YXRlVG8ocmFkaWFuKSB7XG5cdFx0cmV0dXJuIHRoaXMucm90YXRlKHJhZGlhbi10aGlzLmFuZ2xlKTtcblx0fTtcblx0cm90YXRlVG9OZXcocmFkaWFuKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYucm90YXRlVG8ocmFkaWFuKTtcblx0fTtcblxuICBzZXQgeCh4KSB7XG4gICAgaWYodHlwZW9mIHggPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3ggPSB4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdYIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgeCgpIHtcbiAgICByZXR1cm4gdGhpcy5feCB8fCAwO1xuICB9XG5cbiAgc2V0IHkoeSkge1xuICAgIGlmKHR5cGVvZiB5ID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl95ID0geTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWSBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kgfHwgMDtcbiAgfVxuXG4gIHNldCBsZW5ndGgobGVuZ3RoKSB7XG4gICAgdmFyIGZhY3RvcjtcbiAgICBpZih0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInKSB7XG4gICAgICBmYWN0b3IgPSBsZW5ndGggLyB0aGlzLmxlbmd0aDtcbiAgICAgIHRoaXMubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoKHRoaXMueCAqIHRoaXMueCkgKyAodGhpcy55ICogdGhpcy55KSk7XG4gIH1cblxuICBzZXQgYW5nbGUocmFkaWFuKSB7XG4gICAgaWYodHlwZW9mIHJhZGlhbiA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5yb3RhdGUocmFkaWFuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYW5nbGUgc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCBhbmdsZSgpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBWZWN0b3I7XG4iXX0=

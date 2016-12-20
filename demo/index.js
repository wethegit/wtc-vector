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

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var offset = new _wtcVector2.default(window.innerWidth / 2, window.innerHeight / 2);

  var vectors = [];

  var colours = ['#c678dd', '#98c379', '#c34448', '#4e9c9e', '#d18549', 'abb2bf'];

  var arrowV1 = new _wtcVector2.default(-10, -10);
  var arrowV2 = new _wtcVector2.default(-10, 10);

  window.addEventListener('resize', function (e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    offset.reset(window.innerWidth / 2, window.innerHeight / 2);
  });

  document.body.addEventListener('click', function (e) {
    vectors.push(new _wtcVector2.default(e.clientX - offset.x, e.clientY - offset.y));
  });

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
    var offsetX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : offset.x;
    var offsetY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : offset.y;

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

    if ((i + 1) % 2 === 0) {
      console.log('s');
      // Draw a third, relatable vecor
      var v1 = vectors[i - 1];
      var v2 = v;
      var v3 = v1.subtractNew(v2);

      drawVector(v3, i + 1, x, y);
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
      vectors[i].rotate(0.01);
      drawVector(vectors[i], i);
    }

    requestAnimationFrame(draw);
  };

  draw();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL3J1bi5qcyIsInNyYy93dGMtdmVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsU0FBUyxLQUFULENBQWUsRUFBZixFQUFtQjtBQUNqQixNQUFJLFNBQVMsVUFBVCxJQUF1QixTQUEzQixFQUFxQztBQUNuQztBQUNELEdBRkQsTUFFTztBQUNMLGFBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLEVBQTlDO0FBQ0Q7QUFDRjs7QUFFRCxNQUFNLFlBQVc7O0FBRWYsTUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsTUFBSSxNQUFNLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFWOztBQUVBLFNBQU8sS0FBUCxHQUFlLE9BQU8sVUFBdEI7QUFDQSxTQUFPLE1BQVAsR0FBZ0IsT0FBTyxXQUF2Qjs7QUFFQSxNQUFJLFNBQVMsd0JBQVcsT0FBTyxVQUFQLEdBQW9CLENBQS9CLEVBQWtDLE9BQU8sV0FBUCxHQUFxQixDQUF2RCxDQUFiOztBQUVBLE1BQUksVUFBVSxFQUFkOztBQUVBLE1BQUksVUFBVSxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdELFFBQXhELENBQWQ7O0FBRUEsTUFBSSxVQUFVLHdCQUFXLENBQUMsRUFBWixFQUFnQixDQUFDLEVBQWpCLENBQWQ7QUFDQSxNQUFJLFVBQVUsd0JBQVcsQ0FBQyxFQUFaLEVBQWdCLEVBQWhCLENBQWQ7O0FBRUEsU0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxVQUFTLENBQVQsRUFBWTtBQUM1QyxXQUFPLEtBQVAsR0FBZSxPQUFPLFVBQXRCO0FBQ0EsV0FBTyxNQUFQLEdBQWdCLE9BQU8sV0FBdkI7O0FBRUEsV0FBTyxLQUFQLENBQWEsT0FBTyxVQUFQLEdBQW9CLENBQWpDLEVBQW9DLE9B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QUssTUFBTCxDQUFZLE1BQVo7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNLElBQUksU0FBSixDQUFjLDBCQUFkLENBQU47QUFDRDtBQUNGLEs7d0JBQ1c7QUFDVixhQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssQ0FBaEIsRUFBbUIsS0FBSyxDQUF4QixDQUFQO0FBQ0Q7Ozs7OztrQkFJWSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4uL3NyYy93dGMtdmVjdG9yXCI7XG5cbmZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9ICdsb2FkaW5nJyl7XG4gICAgZm4oKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZm4pO1xuICB9XG59XG5cbnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gIGxldCBvZmZzZXQgPSBuZXcgVmVjdG9yKHdpbmRvdy5pbm5lcldpZHRoIC8gMiwgd2luZG93LmlubmVySGVpZ2h0IC8gMik7XG5cbiAgdmFyIHZlY3RvcnMgPSBbXTtcblxuICB2YXIgY29sb3VycyA9IFsnI2M2NzhkZCcsICcjOThjMzc5JywgJyNjMzQ0NDgnLCAnIzRlOWM5ZScsICcjZDE4NTQ5JywgJ2FiYjJiZiddXG5cbiAgdmFyIGFycm93VjEgPSBuZXcgVmVjdG9yKC0xMCwgLTEwKTtcbiAgdmFyIGFycm93VjIgPSBuZXcgVmVjdG9yKC0xMCwgMTApO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIG9mZnNldC5yZXNldCh3aW5kb3cuaW5uZXJXaWR0aCAvIDIsIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpO1xuICB9KTtcblxuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIHZlY3RvcnMucHVzaChuZXcgVmVjdG9yKGUuY2xpZW50WCAtIG9mZnNldC54LCBlLmNsaWVudFkgLSBvZmZzZXQueSkpO1xuICB9KTtcblxuICBsZXQgZHJhd1NjYWxlID0gZnVuY3Rpb24oKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNjY2JztcblxuICAgIGN0eC5tb3ZlVG8oMCwgb2Zmc2V0LnkpO1xuICAgIGN0eC5saW5lVG8oY2FudmFzLndpZHRoLCBvZmZzZXQueSk7XG4gICAgY3R4Lm1vdmVUbyhvZmZzZXQueCwgMCk7XG4gICAgY3R4LmxpbmVUbyhvZmZzZXQueCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICB2YXIgeCwgeTtcblxuICAgIHggPSBvZmZzZXQueDtcbiAgICB3aGlsZSh4IDwgY2FudmFzLndpZHRoKSB7XG4gICAgICB4ICs9IDEwMDtcblxuICAgICAgY3R4Lm1vdmVUbyh4LCBvZmZzZXQueSk7XG4gICAgICBjdHgubGluZVRvKHgsIG9mZnNldC55IC0gMTApO1xuICAgIH1cbiAgICB4ID0gb2Zmc2V0Lng7XG4gICAgd2hpbGUoeCA+IDApIHtcbiAgICAgIHggLT0gMTAwO1xuXG4gICAgICBjdHgubW92ZVRvKHgsIG9mZnNldC55KTtcbiAgICAgIGN0eC5saW5lVG8oeCwgb2Zmc2V0LnkgLSAxMCk7XG4gICAgfVxuICAgIHkgPSBvZmZzZXQueTtcbiAgICB3aGlsZSh5IDwgY2FudmFzLmhlaWdodCkge1xuICAgICAgeSArPSAxMDA7XG5cbiAgICAgIGN0eC5tb3ZlVG8ob2Zmc2V0LngsIHkpO1xuICAgICAgY3R4LmxpbmVUbyhvZmZzZXQueCArIDEwLCB5KTtcbiAgICB9XG4gICAgeSA9IG9mZnNldC55O1xuICAgIHdoaWxlKHkgPiAwKSB7XG4gICAgICB5IC09IDEwMDtcblxuICAgICAgY3R4Lm1vdmVUbyhvZmZzZXQueCwgeSk7XG4gICAgICBjdHgubGluZVRvKG9mZnNldC54ICsgMTAsIHkpO1xuICAgIH1cblxuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIGxldCBkcmF3VmVjdG9yID0gZnVuY3Rpb24odiwgaSwgb2Zmc2V0WCA9IG9mZnNldC54LCBvZmZzZXRZID0gb2Zmc2V0LnkpIHtcbiAgICB2YXIgeCA9IG9mZnNldFg7XG4gICAgdmFyIHkgPSBvZmZzZXRZO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG91cnNbaSAlIGNvbG91cnMubGVuZ3RoXTtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIHggPSB2LnggKyBvZmZzZXRYO1xuICAgIHkgPSB2LnkgKyBvZmZzZXRZO1xuICAgIGN0eC5saW5lVG8oeCwgeSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh2LmFuZ2xlKTtcblxuICAgIHZhciBhdjEgPSBhcnJvd1YxLnJvdGF0ZU5ldyh2LmFuZ2xlKTtcbiAgICB2YXIgYXYyID0gYXJyb3dWMi5yb3RhdGVOZXcodi5hbmdsZSk7XG5cbiAgICAvLyB2YXIgdjEgPSBhcnJvd1YxLmNsb25lKCk7XG4gICAgLy8gdmFyIHYyID0gYXJyb3dWMi5jbG9uZSgpO1xuXG4gICAgY3R4LmxpbmVUbyhhdjEueCArIHgsIGF2MS55ICsgeSk7XG4gICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICBjdHgubGluZVRvKGF2Mi54ICsgeCwgYXYyLnkgKyB5KTtcblxuICAgIGN0eC5zdHJva2UoKTtcblxuICAgIGlmKChpKzEpICUgMiA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ3MnKVxuICAgICAgLy8gRHJhdyBhIHRoaXJkLCByZWxhdGFibGUgdmVjb3JcbiAgICAgIHZhciB2MSA9IHZlY3RvcnNbaS0xXTtcbiAgICAgIHZhciB2MiA9IHY7XG4gICAgICB2YXIgdjMgPSB2MS5zdWJ0cmFjdE5ldyh2Mik7XG5cbiAgICAgIGRyYXdWZWN0b3IodjMsIGkrMSwgeCwgeSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IGRyYXcgPSBmdW5jdGlvbigpIHtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMjgyYzM0XCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KDAsMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgZHJhd1NjYWxlKCk7XG5cbiAgICBmb3IodmFyIGkgPTA7IGkgPCB2ZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2ZWN0b3JzW2ldLnJvdGF0ZSgwLjAxKTtcbiAgICAgIGRyYXdWZWN0b3IodmVjdG9yc1tpXSwgaSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICB9XG5cbiAgZHJhdygpXG59KTtcbiIsIlxuY29uc3QgY29udmVyc2lvbkZhY3RvciA9IDE4MCAvIE1hdGguUEk7XG5cbnZhciByYWRpYW5Ub0RlZ3JlZXMgPSBmdW5jdGlvbihyYWRpYW4pIHtcblx0cmV0dXJuIHJhZCAqIGNvbnZlcnNpb25GYWN0b3I7XG59XG5cbnZhciBkZWdyZWVzVG9SYWRpYW4gPSBmdW5jdGlvbihkZWdyZWVzKSB7XG5cdHJldHVybiBkZWcgLyBjb252ZXJzaW9uRmFjdG9yO1xufVxuXG5jbGFzcyBWZWN0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKHgsIHkpe1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG5cdHJlc2V0KHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cdH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XG4gIH1cblxuICBhZGQodmVjdG9yKSB7XG4gICAgdGhpcy54ICs9IHZlY3Rvci54O1xuICAgIHRoaXMueSArPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBhZGROZXcodmVjdG9yKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuYWRkKHZlY3Rvcik7XG4gIH1cblxuICBhZGRTY2FsYXIoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpKTtcbiAgfVxuICBhZGRTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuYWRkU2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICBzdWJ0cmFjdCh2ZWN0b3IpIHtcbiAgICB0aGlzLnggLT0gdmVjdG9yLng7XG4gICAgdGhpcy55IC09IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHN1YnRyYWN0TmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnN1YnRyYWN0KHZlY3Rvcik7XG4gIH1cblxuICBzdWJ0cmFjdFNjYWxhcihzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJ0cmFjdChuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKSk7XG4gIH1cbiAgc3VidHJhY3RTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuc3VidHJhY3RTY2FsYXIoc2NhbGFyKTtcbiAgfVxuXG4gIGRpdmlkZSh2ZWN0b3IpIHtcbiAgICBpZih2ZWN0b3IueCAhPT0gMCkge1xuICAgICAgdGhpcy54IC89IHZlY3Rvci54XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueCA9IDA7XG4gICAgfVxuICAgIGlmKHZlY3Rvci55ICE9PSAwKSB7XG4gICAgICB0aGlzLnkgLz0gdmVjdG9yLnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy55ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZGl2aWRlTmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmRpdmlkZSh2ZWN0b3IpO1xuICB9XG5cbiAgZGl2aWRlU2NhbGFyKHNjYWxhcikge1xuICAgIHZhciB2ID0gbmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcik7XG4gICAgcmV0dXJuIHRoaXMuZGl2aWRlKHYpO1xuICB9XG4gIGRpdmlkZVNjYWxhck5ldyhzY2FsYXIpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5kaXZpZGVTY2FsYXIoc2NhbGFyKTtcbiAgfVxuXG4gIG11bHRpcGx5KHZlY3Rvcikge1xuICAgIHRoaXMueCAqPSB2ZWN0b3IueDtcbiAgICB0aGlzLnkgKj0gdmVjdG9yLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgbXVsdGlwbHlOZXcodmVjdG9yKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYubXVsdGlwbHkodmVjdG9yKTtcbiAgfVxuXG4gIG11bHRpcGx5U2NhbGFyKHNjYWxhcikge1xuICAgIHZhciB2ID0gbmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcik7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkodik7XG4gIH1cbiAgbXVsdGlwbHlTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYubXVsdGlwbHlTY2FsYXIoc2NhbGFyKTtcbiAgfVxuXG4gIHNjYWxlKHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKHNjYWxhcik7XG4gIH1cbiAgc2NhbGVOZXcoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXJOZXcoc2NhbGFyKTtcbiAgfVxuXG4gIHJvdGF0ZShyYWRpYW4pIHtcbiAgXHR2YXIgeCA9ICh0aGlzLnggKiBNYXRoLmNvcyhyYWRpYW4pKSAtICh0aGlzLnkgKiBNYXRoLnNpbihyYWRpYW4pKTtcbiAgXHR2YXIgeSA9ICh0aGlzLnggKiBNYXRoLnNpbihyYWRpYW4pKSArICh0aGlzLnkgKiBNYXRoLmNvcyhyYWRpYW4pKTtcblxuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblxuICBcdHJldHVybiB0aGlzO1xuICB9XG4gIHJvdGF0ZU5ldyhyYWRpYW4pIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5yb3RhdGUocmFkaWFuKTtcbiAgfVxuXG4gIHJvdGF0ZURlZyhkZWdyZWVzKSB7XG4gICAgdGhpcy5yb3RhdGUoZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpKTtcbiAgfVxuICByb3RhdGVEZWdOZXcoZGVncmVlcykge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZU5ldyhkZWdyZWVzVG9SYWRpYW4oZGVncmVlcykpO1xuICB9XG5cbiAgcm90YXRlQnkocmFkaWFuKSB7XG5cdFx0dmFyIGFuZ2xlID0gdGhpcy5hbmdsZSArIHJhZGlhbjtcblx0XHRyZXR1cm4gdGhpcy5yb3RhdGUoYW5nbGUpO1xuICB9XG4gIHJvdGF0ZUJ5TmV3KHJhZGlhbikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnJvdGF0ZUJ5KHJhZGlhbik7XG4gIH1cblxuXHRyb3RhdGVUbyhyYWRpYW4pIHtcblx0XHRyZXR1cm4gdGhpcy5yb3RhdGUocmFkaWFuLXRoaXMuYW5nbGUpO1xuXHR9O1xuXHRyb3RhdGVUb05ldyhyYWRpYW4pIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5yb3RhdGVUbyhyYWRpYW4pO1xuXHR9O1xuXG4gIHNldCB4KHgpIHtcbiAgICBpZih0eXBlb2YgeCA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5feCA9IHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ggc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCB4KCkge1xuICAgIHJldHVybiB0aGlzLl94IHx8IDA7XG4gIH1cblxuICBzZXQgeSh5KSB7XG4gICAgaWYodHlwZW9mIHkgPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3kgPSB5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy5feSB8fCAwO1xuICB9XG5cbiAgc2V0IGxlbmd0aChsZW5ndGgpIHtcbiAgICB2YXIgZmFjdG9yO1xuICAgIGlmKHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicpIHtcbiAgICAgIGZhY3RvciA9IGxlbmd0aCAvIHRoaXMubGVuZ3RoO1xuICAgICAgdGhpcy5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdsZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgodGhpcy54ICogdGhpcy54KSArICh0aGlzLnkgKiB0aGlzLnkpKTtcbiAgfVxuXG4gIHNldCBhbmdsZShyYWRpYW4pIHtcbiAgICBpZih0eXBlb2YgcmFkaWFuID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnJvdGF0ZShyYWRpYW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhbmdsZSBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFuZ2xlKCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvcjtcbiJdfQ==

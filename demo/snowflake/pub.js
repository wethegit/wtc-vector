(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _wtcVector = require('../../src/wtc-vector');

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

  var colours = ['#c678dd', '#98c379', '#c34448', '#4e9c9e', '#d18549', '#abb2bf'];

  var arrowV1 = new _wtcVector2.default(-10, -10);
  var arrowV2 = new _wtcVector2.default(-10, 10);

  window.addEventListener('resize', function (e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    offset.reset(window.innerWidth / 2, window.innerHeight / 2);
  });

  window.addVector = function (x, y) {
    var moving = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


    var vectorObj = {
      v: new _wtcVector2.default(x, y),
      moving: moving
    };

    vectors.push(vectorObj);

    return vectorObj;
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
  };

  var draw = function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#282c34";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    drawScale();
    drawSnowflakes();

    for (var i = 0; i < vectors.length; i++) {
      var v = vectors[i];
      var drawTrace = false;
      drawVector(v.v, i, drawTrace);
    }

    requestAnimationFrame(draw);
  };

  // These are the vectors that affect the snowflake's movement
  var factor = 200;
  var gravity = addVector(0, 100);
  var float = addVector(50, 50);

  var snowflakes = [];

  console.log(gravity.v, gravity.v.divideScalarNew(factor));

  var addSnowklake = function addSnowklake(x, y) {
    var snowflake = {
      radius: 2 + Math.random() * 10,
      opacity: 20 + Math.random() * 60,
      pos: new _wtcVector2.default(x, y)
    };

    console.log(snowflake);

    snowflakes.push(snowflake);
  };

  var drawSnowflakes = function drawSnowflakes() {
    float.v.rotate(0.005);

    snowflakes.forEach(function (flake, index) {
      // Apply our forces
      var forces = new _wtcVector2.default(0, 0);
      forces.add(gravity.v.divideScalarNew(factor));
      forces.add(float.v.divideScalarNew(factor).multiply(new _wtcVector2.default(1, 0)));
      // Add our forces to the position
      flake.pos.add(forces);

      // draw the flake
      ctx.beginPath();
      ctx.fillStyle = "#FFFFFF" + Math.round(flake.opacity / 100 * 255).toString(16);
      ctx.arc(flake.pos.x, flake.pos.y, flake.radius, 0, 2 * Math.PI, false);
      ctx.fill();

      if (flake.pos.y > window.innerHeight) {
        snowflakes.splice(index, 1);
      }
    });
  };

  document.body.addEventListener('click', function (e) {
    addSnowklake(e.clientX, e.clientY);
  });

  draw();
});

},{"../../src/wtc-vector":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var conversionFactor = 180 / Math.PI;

var radianToDegrees = function radianToDegrees(radian) {
  return radian * conversionFactor;
};

var degreesToRadian = function degreesToRadian(degrees) {
  return degrees / conversionFactor;
};

/**
 * A basic 2D Vector class that provides simple algebraic functionality in the form
 * of 2D Vectors.
 *
 * We use Getters/setters for both principle properties (x & y) as well as virtual
 * properties (rotation, length etc.).
 *
 * @class Vector
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.1
 * @created Dec 19, 2016
 */

var Vector = function () {

  /**
   * The Vector Class constructor
   *
   * @constructor
   * @param {number} x 				The x coord
   * @param {number} y 				The y coord
   */
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  /**
   * Resets the vector coordinates
   *
   * @public
  * @param {number} x 				The x coord
  * @param {number} y 				The y coord
   */


  _createClass(Vector, [{
    key: 'reset',
    value: function reset(x, y) {
      this.x = x;
      this.y = y;
    }

    /**
     * Clones the vector
     *
     * @public
     * @return {Vector}					The cloned vector
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new Vector(this.x, this.y);
    }

    /**
     * Adds one vector to another.
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to add to this one
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'add',
    value: function add(vector) {
      this.x += vector.x;
      this.y += vector.y;
      return this;
    }
    /**
     * Clones the vector and adds the vector to it instead
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to add to this one
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: 'addNew',
    value: function addNew(vector) {
      var v = this.clone();
      return v.add(vector);
    }

    /**
     * Adds a scalar to the vector, modifying both the x and y
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to add to the vector
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'addScalar',
    value: function addScalar(scalar) {
      return this.add(new Vector(scalar, scalar));
    }
    /**
     * Clones the vector and adds the scalar to it instead
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to add to the vector
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: 'addScalarNew',
    value: function addScalarNew(scalar) {
      var v = this.clone();
      return v.addScalar(scalar);
    }

    /**
     * Subtracts one vector from another.
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to subtract from this one
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'subtract',
    value: function subtract(vector) {
      this.x -= vector.x;
      this.y -= vector.y;
      return this;
    }
    /**
     * Clones the vector and subtracts the vector from it instead
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to subtract from this one
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: 'subtractNew',
    value: function subtractNew(vector) {
      var v = this.clone();
      return v.subtract(vector);
    }

    /**
     * Subtracts a scalar from the vector, modifying both the x and y
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to subtract from the vector
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'subtractScalar',
    value: function subtractScalar(scalar) {
      return this.subtract(new Vector(scalar, scalar));
    }
    /**
     * Clones the vector and subtracts the scalar from it instead
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to add to the vector
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: 'subtractScalarNew',
    value: function subtractScalarNew(scalar) {
      var v = this.clone();
      return v.subtractScalar(scalar);
    }

    /**
     * Divides one vector by another.
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to divide this by
     * @return {Vector}					Returns itself, modified
     */

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
    /**
     * Clones the vector and divides it by the vector instead
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to divide the clone by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: 'divideNew',
    value: function divideNew(vector) {
      var v = this.clone();
      return v.divide(vector);
    }

    /**
     * Divides the vector by a scalar.
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to divide both x and y by
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'divideScalar',
    value: function divideScalar(scalar) {
      var v = new Vector(scalar, scalar);
      return this.divide(v);
    }
    /**
     * Clones the vector and divides it by the provided scalar.
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to divide both x and y by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: 'divideScalarNew',
    value: function divideScalarNew(scalar) {
      var v = this.clone();
      return v.divideScalar(scalar);
    }

    /**
     * Multiplies one vector by another.
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to multiply this by
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'multiply',
    value: function multiply(vector) {
      this.x *= vector.x;
      this.y *= vector.y;
      return this;
    }
    /**
     * Clones the vector and multiplies it by the vector instead
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to multiply the clone by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: 'multiplyNew',
    value: function multiplyNew(vector) {
      var v = this.clone();
      return v.multiply(vector);
    }

    /**
     * Multiplies the vector by a scalar.
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to multiply both x and y by
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'multiplyScalar',
    value: function multiplyScalar(scalar) {
      var v = new Vector(scalar, scalar);
      return this.multiply(v);
    }
    /**
     * Clones the vector and multiplies it by the provided scalar.
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to multiply both x and y by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: 'multiplyScalarNew',
    value: function multiplyScalarNew(scalar) {
      var v = this.clone();
      return v.multiplyScalar(scalar);
    }

    /**
     * Alias of {@link Vector#multiplyScalar__anchor multiplyScalar}
     */

  }, {
    key: 'scale',
    value: function scale(scalar) {
      return this.multiplyScalar(scalar);
    }
    /**
     * Alias of {@link Vector#multiplyScalarNew__anchor multiplyScalarNew}
     */

  }, {
    key: 'scaleNew',
    value: function scaleNew(scalar) {
      return this.multiplyScalarNew(scalar);
    }

    /**
     * Rotates a vecor by a given amount, provided in radians.
     *
     * @public
     * @chainable
     * @param  {number}  radian The angle, in radians, to rotate the vector by
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'rotate',
    value: function rotate(radian) {
      var x = this.x * Math.cos(radian) - this.y * Math.sin(radian);
      var y = this.x * Math.sin(radian) + this.y * Math.cos(radian);

      this.x = x;
      this.y = y;

      return this;
    }
    /**
     * Clones the vector and rotates it by the supplied radian value
     *
     * @public
     * @chainable
     * @param  {number}  radian The angle, in radians, to rotate the vector by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: 'rotateNew',
    value: function rotateNew(radian) {
      var v = this.clone();
      return v.rotate(radian);
    }

    /**
     * Rotates a vecor by a given amount, provided in degrees. Converts the degree
     * value to radians and runs the rotaet method.
     *
     * @public
     * @chainable
     * @param  {number}  degrees The angle, in degrees, to rotate the vector by
     * @return {Vector}						Returns itself, modified
     */

  }, {
    key: 'rotateDeg',
    value: function rotateDeg(degrees) {
      return this.rotate(degreesToRadian(degrees));
    }
    /**
     * Clones the vector and rotates it by the supplied degree value
     *
     * @public
     * @chainable
    * @param  {number}  degrees The angle, in degrees, to rotate the vector by
     * @return {Vector}					 Returns the clone of itself, modified
     */

  }, {
    key: 'rotateDegNew',
    value: function rotateDegNew(degrees) {
      return this.rotateNew(degreesToRadian(degrees));
    }

    /**
     * Alias of {@link Vector#rotate__anchor rotate}
     */

  }, {
    key: 'rotateBy',
    value: function rotateBy(radian) {
      return this.rotate(radian);
    }
    /**
     * Alias of {@link Vector#rotateNew__anchor rotateNew}
     */

  }, {
    key: 'rotateByNew',
    value: function rotateByNew(radian) {
      return this.rotateNew(radian);
    }

    /**
     * Alias of {@link Vector#rotateDeg__anchor rotateDeg}
     */

  }, {
    key: 'rotateDegBy',
    value: function rotateDegBy(degrees) {
      return this.rotateDeg(degrees);
    }
    /**
     * Alias of {@link Vector#rotateDegNew__anchor rotateDegNew}
     */

  }, {
    key: 'rotateDegByNew',
    value: function rotateDegByNew(radian) {
      return tjos.rotateDegNew(radian);
    }

    /**
     * Rotates a vector to a specific angle
     *
     * @public
     * @chainable
     * @param  {number}  radian The angle, in radians, to rotate the vector to
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'rotateTo',
    value: function rotateTo(radian) {
      return this.rotate(radian - this.angle);
    }
  }, {
    key: 'rotateToNew',

    /**
     * Clones the vector and rotates it to the supplied radian value
     *
     * @public
     * @chainable
     * @param  {number}  radian The angle, in radians, to rotate the vector to
     * @return {Vector}					Returns the clone of itself, modified
     */
    value: function rotateToNew(radian) {
      var v = this.clone();
      return v.rotateTo(radian);
    }
  }, {
    key: 'rotateToDeg',


    /**
     * Rotates a vecor to a given amount, provided in degrees. Converts the degree
     * value to radians and runs the rotateTo method.
     *
     * @public
     * @chainable
     * @param  {number}  degrees The angle, in degrees, to rotate the vector to
     * @return {Vector}						Returns itself, modified
     */
    value: function rotateToDeg(degrees) {
      return this.rotateTo(degreesToRadian(degrees));
    }
    /**
     * Clones the vector and rotates it to the supplied degree value
     *
     * @public
     * @chainable
    * @param  {number}  degrees The angle, in degrees, to rotate the vector to
     * @return {Vector}					 Returns the clone of itself, modified
     */

  }, {
    key: 'rotateToDegNew',
    value: function rotateToDegNew(degrees) {
      return this.rotateToNew(degreesToRadian(degrees));
    }
  }, {
    key: 'normalise',
    value: function normalise() {
      return this.divideScalar(this.length);
    }
  }, {
    key: 'normaliseNew',
    value: function normaliseNew() {
      return this.divideScalarNew(this.length);
    }
  }, {
    key: 'distance',
    value: function distance(vector) {
      return this.subtractNew(vector).length;
    }
  }, {
    key: 'distanceX',
    value: function distanceX(vector) {
      return this.x - vector.x;
    }
  }, {
    key: 'distanceY',
    value: function distanceY(vector) {
      return this.y - vector.y;
    }
  }, {
    key: 'dotProduct',
    value: function dotProduct(vector) {
      return this.x * vector.x + this.y * vector.y;
    }
  }, {
    key: 'crossProduct',
    value: function crossProduct(vector) {
      return this.x * vector.x - this.y * vector.y;
    }

    /**
     * Getters and setters
     */

    /**
     * (getter/setter) The x value of the vector.
     *
     * @type {number}
     * @default 0
     */

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

    /**
    * (getter/setter) The y value of the vector.
    *
    * @type {number}
    * @default 0
    */

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

    /**
    * (getter/setter) The length of the vector presented as a square. If you're using
    * length for comparison, this is quicker.
    *
    * @type {number}
    * @default 0
    */

  }, {
    key: 'lengthSquared',
    set: function set(length) {
      var factor;
      if (typeof length == 'number') {
        factor = length / this.lengthSquared;
        this.multiplyScalar(factor);
      } else {
        throw new TypeError('length should be a number');
      }
    },
    get: function get() {
      return this.x * this.x + this.y * this.y;
    }

    /**
    * (getter/setter) The length of the vector
    *
    * @type {number}
    * @default 0
    */

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
      return Math.sqrt(this.lengthSquared);
    }

    /**
    * (getter/setter) The angle of the vector, in radians
    *
    * @type {number}
    * @default 0
    */

  }, {
    key: 'angle',
    set: function set(radian) {
      if (typeof radian == 'number') {
        this.rotateTo(radian);
      } else {
        throw new TypeError('angle should be a number');
      }
    },
    get: function get() {
      return Math.atan2(this.y, this.x);
    }

    /**
    * (getter/setter) The angle of the vector, in radians
    *
    * @type {number}
    * @default 0
    */

  }, {
    key: 'angleInDegrees',
    set: function set(degrees) {
      if (typeof degrees == 'number') {
        this.rotateToDeg(degrees);
      } else {
        throw new TypeError('angle should be a number');
      }
    },
    get: function get() {
      return radianToDegrees(Math.atan2(this.y, this.x));
    }
  }]);

  return Vector;
}();

exports.default = Vector;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL3Nub3dmbGFrZS9ydW4uanMiLCJzcmMvd3RjLXZlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLFNBQVMsS0FBVCxDQUFlLEVBQWYsRUFBbUI7QUFDakIsTUFBSSxTQUFTLFVBQVQsSUFBdUIsU0FBM0IsRUFBcUM7QUFDbkM7QUFDRCxHQUZELE1BRU87QUFDTCxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxFQUE5QztBQUNEO0FBQ0Y7O0FBRUQsTUFBTSxZQUFXOztBQUVmLE1BQUksU0FBUyxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLE1BQUksTUFBTSxPQUFPLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBVjtBQUNBLE1BQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBZDtBQUNBLE1BQUksT0FBTyxRQUFRLFVBQVIsQ0FBbUIsSUFBbkIsQ0FBWDs7QUFFQSxTQUFPLEtBQVAsR0FBZSxPQUFPLFVBQXRCO0FBQ0EsU0FBTyxNQUFQLEdBQWdCLE9BQU8sV0FBdkI7QUFDQSxVQUFRLEtBQVIsR0FBZ0IsT0FBTyxVQUF2QjtBQUNBLFVBQVEsTUFBUixHQUFpQixPQUFPLFdBQXhCOztBQUVBLE1BQUksU0FBUyx3QkFBVyxPQUFPLFVBQVAsR0FBb0IsQ0FBL0IsRUFBa0MsT0FBTyxXQUFQLEdBQXFCLENBQXZELENBQWI7O0FBRUEsTUFBSSxVQUFVLEVBQWQ7O0FBRUEsTUFBSSxVQUFVLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0MsU0FBbEMsRUFBNkMsU0FBN0MsRUFBd0QsU0FBeEQsQ0FBZDs7QUFFQSxNQUFJLFVBQVUsd0JBQVcsQ0FBQyxFQUFaLEVBQWdCLENBQUMsRUFBakIsQ0FBZDtBQUNBLE1BQUksVUFBVSx3QkFBVyxDQUFDLEVBQVosRUFBZ0IsRUFBaEIsQ0FBZDs7QUFFQSxT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QUFFRjs7Ozs7Ozs7O3NCQU1XLE0sRUFBUTtBQUNoQixVQUFHLE9BQU8sTUFBUCxJQUFpQixRQUFwQixFQUE4QjtBQUM1QixhQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTSxJQUFJLFNBQUosQ0FBYywwQkFBZCxDQUFOO0FBQ0Q7QUFDRixLO3dCQUNXO0FBQ1YsYUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLENBQWhCLEVBQW1CLEtBQUssQ0FBeEIsQ0FBUDtBQUNEOztBQUVGOzs7Ozs7Ozs7c0JBTW9CLE8sRUFBUztBQUMxQixVQUFHLE9BQU8sT0FBUCxJQUFrQixRQUFyQixFQUErQjtBQUM3QixhQUFLLFdBQUwsQ0FBaUIsT0FBakI7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNLElBQUksU0FBSixDQUFjLDBCQUFkLENBQU47QUFDRDtBQUNGLEs7d0JBQ29CO0FBQ25CLGFBQU8sZ0JBQWdCLEtBQUssS0FBTCxDQUFXLEtBQUssQ0FBaEIsRUFBbUIsS0FBSyxDQUF4QixDQUFoQixDQUFQO0FBQ0Q7Ozs7OztrQkFJWSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4uLy4uL3NyYy93dGMtdmVjdG9yXCI7XG5cbmZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9ICdsb2FkaW5nJyl7XG4gICAgZm4oKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZm4pO1xuICB9XG59XG5cbnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBsZXQgY2FudmFzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMyJyk7XG4gIGxldCBjdHgyID0gY2FudmFzMi5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIGNhbnZhczIud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgY2FudmFzMi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgbGV0IG9mZnNldCA9IG5ldyBWZWN0b3Iod2luZG93LmlubmVyV2lkdGggLyAyLCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKTtcblxuICB2YXIgdmVjdG9ycyA9IFtdO1xuXG4gIHZhciBjb2xvdXJzID0gWycjYzY3OGRkJywgJyM5OGMzNzknLCAnI2MzNDQ0OCcsICcjNGU5YzllJywgJyNkMTg1NDknLCAnI2FiYjJiZiddXG5cbiAgdmFyIGFycm93VjEgPSBuZXcgVmVjdG9yKC0xMCwgLTEwKTtcbiAgdmFyIGFycm93VjIgPSBuZXcgVmVjdG9yKC0xMCwgMTApO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjYW52YXMyLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzMi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICBvZmZzZXQucmVzZXQod2luZG93LmlubmVyV2lkdGggLyAyLCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKTtcbiAgfSk7XG5cbiAgd2luZG93LmFkZFZlY3RvciA9IGZ1bmN0aW9uKHgsIHksIG1vdmluZyA9IGZhbHNlKSB7XG5cbiAgICB2YXIgdmVjdG9yT2JqID0ge1xuICAgICAgdjogbmV3IFZlY3Rvcih4LCB5KSxcbiAgICAgIG1vdmluZzogbW92aW5nXG4gICAgfVxuXG4gICAgdmVjdG9ycy5wdXNoKHZlY3Rvck9iaik7XG5cbiAgICByZXR1cm4gdmVjdG9yT2JqO1xuICB9XG5cbiAgbGV0IGRyYXdTY2FsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzY2Nic7XG5cbiAgICBjdHgubW92ZVRvKDAsIG9mZnNldC55KTtcbiAgICBjdHgubGluZVRvKGNhbnZhcy53aWR0aCwgb2Zmc2V0LnkpO1xuICAgIGN0eC5tb3ZlVG8ob2Zmc2V0LngsIDApO1xuICAgIGN0eC5saW5lVG8ob2Zmc2V0LngsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgdmFyIHgsIHk7XG5cbiAgICB4ID0gb2Zmc2V0Lng7XG4gICAgd2hpbGUoeCA8IGNhbnZhcy53aWR0aCkge1xuICAgICAgeCArPSAxMDA7XG5cbiAgICAgIGN0eC5tb3ZlVG8oeCwgb2Zmc2V0LnkpO1xuICAgICAgY3R4LmxpbmVUbyh4LCBvZmZzZXQueSAtIDEwKTtcbiAgICB9XG4gICAgeCA9IG9mZnNldC54O1xuICAgIHdoaWxlKHggPiAwKSB7XG4gICAgICB4IC09IDEwMDtcblxuICAgICAgY3R4Lm1vdmVUbyh4LCBvZmZzZXQueSk7XG4gICAgICBjdHgubGluZVRvKHgsIG9mZnNldC55IC0gMTApO1xuICAgIH1cbiAgICB5ID0gb2Zmc2V0Lnk7XG4gICAgd2hpbGUoeSA8IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgIHkgKz0gMTAwO1xuXG4gICAgICBjdHgubW92ZVRvKG9mZnNldC54LCB5KTtcbiAgICAgIGN0eC5saW5lVG8ob2Zmc2V0LnggKyAxMCwgeSk7XG4gICAgfVxuICAgIHkgPSBvZmZzZXQueTtcbiAgICB3aGlsZSh5ID4gMCkge1xuICAgICAgeSAtPSAxMDA7XG5cbiAgICAgIGN0eC5tb3ZlVG8ob2Zmc2V0LngsIHkpO1xuICAgICAgY3R4LmxpbmVUbyhvZmZzZXQueCArIDEwLCB5KTtcbiAgICB9XG5cbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxuICBsZXQgZHJhd1ZlY3RvciA9IGZ1bmN0aW9uKHYsIGksIGRyYXdUcmFjZSA9IGZhbHNlLCBvZmZzZXRYID0gb2Zmc2V0LngsIG9mZnNldFkgPSBvZmZzZXQueSkge1xuICAgIHZhciB4ID0gb2Zmc2V0WDtcbiAgICB2YXIgeSA9IG9mZnNldFk7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3Vyc1tpICUgY29sb3Vycy5sZW5ndGhdO1xuICAgIGN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgeCA9IHYueCArIG9mZnNldFg7XG4gICAgeSA9IHYueSArIG9mZnNldFk7XG4gICAgY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgIHZhciBhdjEgPSBhcnJvd1YxLnJvdGF0ZU5ldyh2LmFuZ2xlKTtcbiAgICB2YXIgYXYyID0gYXJyb3dWMi5yb3RhdGVOZXcodi5hbmdsZSk7XG5cbiAgICBjdHgubGluZVRvKGF2MS54ICsgeCwgYXYxLnkgKyB5KTtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIGN0eC5saW5lVG8oYXYyLnggKyB4LCBhdjIueSArIHkpO1xuXG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgbGV0IGRyYXcgPSBmdW5jdGlvbigpIHtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMjgyYzM0XCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KDAsMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgZHJhd1NjYWxlKCk7XG4gICAgZHJhd1Nub3dmbGFrZXMoKTtcblxuICAgIGZvcih2YXIgaSA9MDsgaSA8IHZlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB2ID0gdmVjdG9yc1tpXTtcbiAgICAgIGxldCBkcmF3VHJhY2UgPSBmYWxzZTtcbiAgICAgIGRyYXdWZWN0b3Iodi52LCBpLCBkcmF3VHJhY2UpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgfVxuXG4gIC8vIFRoZXNlIGFyZSB0aGUgdmVjdG9ycyB0aGF0IGFmZmVjdCB0aGUgc25vd2ZsYWtlJ3MgbW92ZW1lbnRcbiAgbGV0IGZhY3RvciA9IDIwMDtcbiAgbGV0IGdyYXZpdHkgPSBhZGRWZWN0b3IoMCwgMTAwKTtcbiAgbGV0IGZsb2F0ID0gYWRkVmVjdG9yKDUwLCA1MCk7XG5cbiAgbGV0IHNub3dmbGFrZXMgPSBbXTtcblxuICBjb25zb2xlLmxvZyhncmF2aXR5LnYsIGdyYXZpdHkudi5kaXZpZGVTY2FsYXJOZXcoZmFjdG9yKSlcblxuICBsZXQgYWRkU25vd2tsYWtlID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIGxldCBzbm93Zmxha2UgPSB7XG4gICAgICByYWRpdXM6IDIgKyBNYXRoLnJhbmRvbSgpICogMTAsXG4gICAgICBvcGFjaXR5OiAyMCArIE1hdGgucmFuZG9tKCkgKiA2MCxcbiAgICAgIHBvczogbmV3IFZlY3Rvcih4LCB5KVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHNub3dmbGFrZSk7XG5cbiAgICBzbm93Zmxha2VzLnB1c2goc25vd2ZsYWtlKTtcbiAgfVxuXG4gIGxldCBkcmF3U25vd2ZsYWtlcyA9IGZ1bmN0aW9uKCkge1xuICAgIGZsb2F0LnYucm90YXRlKDAuMDA1KTtcblxuICAgIHNub3dmbGFrZXMuZm9yRWFjaChmdW5jdGlvbihmbGFrZSwgaW5kZXgpIHtcbiAgICAgIC8vIEFwcGx5IG91ciBmb3JjZXNcbiAgICAgIGxldCBmb3JjZXMgPSBuZXcgVmVjdG9yKDAsMCk7XG4gICAgICBmb3JjZXMuYWRkKGdyYXZpdHkudi5kaXZpZGVTY2FsYXJOZXcoZmFjdG9yKSk7XG4gICAgICBmb3JjZXMuYWRkKGZsb2F0LnYuZGl2aWRlU2NhbGFyTmV3KGZhY3RvcikubXVsdGlwbHkobmV3IFZlY3RvcigxLCAwKSkpO1xuICAgICAgLy8gQWRkIG91ciBmb3JjZXMgdG8gdGhlIHBvc2l0aW9uXG4gICAgICBmbGFrZS5wb3MuYWRkKGZvcmNlcyk7XG5cbiAgICAgIC8vIGRyYXcgdGhlIGZsYWtlXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkZGRkZGXCIgKyBNYXRoLnJvdW5kKGZsYWtlLm9wYWNpdHkgLyAxMDAgKiAyNTUpLnRvU3RyaW5nKDE2KTtcbiAgICAgIGN0eC5hcmMoZmxha2UucG9zLngsIGZsYWtlLnBvcy55LCBmbGFrZS5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICBjdHguZmlsbCgpO1xuXG4gICAgICBpZihmbGFrZS5wb3MueSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICBzbm93Zmxha2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgYWRkU25vd2tsYWtlKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgfSk7XG5cblxuXG5cblxuICBkcmF3KCk7XG59KTtcbiIsIlxuY29uc3QgY29udmVyc2lvbkZhY3RvciA9IDE4MCAvIE1hdGguUEk7XG5cbnZhciByYWRpYW5Ub0RlZ3JlZXMgPSBmdW5jdGlvbihyYWRpYW4pIHtcblx0cmV0dXJuIHJhZGlhbiAqIGNvbnZlcnNpb25GYWN0b3I7XG59XG5cbnZhciBkZWdyZWVzVG9SYWRpYW4gPSBmdW5jdGlvbihkZWdyZWVzKSB7XG5cdHJldHVybiBkZWdyZWVzIC8gY29udmVyc2lvbkZhY3Rvcjtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIDJEIFZlY3RvciBjbGFzcyB0aGF0IHByb3ZpZGVzIHNpbXBsZSBhbGdlYnJhaWMgZnVuY3Rpb25hbGl0eSBpbiB0aGUgZm9ybVxuICogb2YgMkQgVmVjdG9ycy5cbiAqXG4gKiBXZSB1c2UgR2V0dGVycy9zZXR0ZXJzIGZvciBib3RoIHByaW5jaXBsZSBwcm9wZXJ0aWVzICh4ICYgeSkgYXMgd2VsbCBhcyB2aXJ0dWFsXG4gKiBwcm9wZXJ0aWVzIChyb3RhdGlvbiwgbGVuZ3RoIGV0Yy4pLlxuICpcbiAqIEBjbGFzcyBWZWN0b3JcbiAqIEBhdXRob3IgTGlhbSBFZ2FuIDxsaWFtQHdldGhlY29sbGVjdGl2ZS5jb20+XG4gKiBAdmVyc2lvbiAwLjEuMVxuICogQGNyZWF0ZWQgRGVjIDE5LCAyMDE2XG4gKi9cbmNsYXNzIFZlY3RvciB7XG5cblx0LyoqXG5cdCAqIFRoZSBWZWN0b3IgQ2xhc3MgY29uc3RydWN0b3Jcblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IFx0XHRcdFx0VGhlIHggY29vcmRcblx0ICogQHBhcmFtIHtudW1iZXJ9IHkgXHRcdFx0XHRUaGUgeSBjb29yZFxuXHQgKi9cbiAgY29uc3RydWN0b3IoeCwgeSl7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgdmVjdG9yIGNvb3JkaW5hdGVzXG4gICAqXG4gICAqIEBwdWJsaWNcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggXHRcdFx0XHRUaGUgeCBjb29yZFxuXHQgKiBAcGFyYW0ge251bWJlcn0geSBcdFx0XHRcdFRoZSB5IGNvb3JkXG4gICAqL1xuXHRyZXNldCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lcyB0aGUgdmVjdG9yXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRUaGUgY2xvbmVkIHZlY3RvclxuXHQgKi9cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgb25lIHZlY3RvciB0byBhbm90aGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gYWRkIHRvIHRoaXMgb25lXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBhZGQodmVjdG9yKSB7XG4gICAgdGhpcy54ICs9IHZlY3Rvci54O1xuICAgIHRoaXMueSArPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIGFkZHMgdGhlIHZlY3RvciB0byBpdCBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBhZGQgdG8gdGhpcyBvbmVcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBhZGROZXcodmVjdG9yKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuYWRkKHZlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHNjYWxhciB0byB0aGUgdmVjdG9yLCBtb2RpZnlpbmcgYm90aCB0aGUgeCBhbmQgeVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gYWRkIHRvIHRoZSB2ZWN0b3JcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGFkZFNjYWxhcihzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5hZGQobmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcikpO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgYWRkcyB0aGUgc2NhbGFyIHRvIGl0IGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZCB0byB0aGUgdmVjdG9yXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgYWRkU2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmFkZFNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gYW5vdGhlci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHN1YnRyYWN0KHZlY3Rvcikge1xuICAgIHRoaXMueCAtPSB2ZWN0b3IueDtcbiAgICB0aGlzLnkgLT0gdmVjdG9yLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBzdWJ0cmFjdHMgdGhlIHZlY3RvciBmcm9tIGl0IGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBzdWJ0cmFjdE5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5zdWJ0cmFjdCh2ZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBhIHNjYWxhciBmcm9tIHRoZSB2ZWN0b3IsIG1vZGlmeWluZyBib3RoIHRoZSB4IGFuZCB5XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBzdWJ0cmFjdCBmcm9tIHRoZSB2ZWN0b3JcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHN1YnRyYWN0U2NhbGFyKHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLnN1YnRyYWN0KG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpKTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHN1YnRyYWN0cyB0aGUgc2NhbGFyIGZyb20gaXQgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gYWRkIHRvIHRoZSB2ZWN0b3JcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBzdWJ0cmFjdFNjYWxhck5ldyhzY2FsYXIpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5zdWJ0cmFjdFNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpdmlkZXMgb25lIHZlY3RvciBieSBhbm90aGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIHRoaXMgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGRpdmlkZSh2ZWN0b3IpIHtcbiAgICBpZih2ZWN0b3IueCAhPT0gMCkge1xuICAgICAgdGhpcy54IC89IHZlY3Rvci54XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueCA9IDA7XG4gICAgfVxuICAgIGlmKHZlY3Rvci55ICE9PSAwKSB7XG4gICAgICB0aGlzLnkgLz0gdmVjdG9yLnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy55ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBkaXZpZGVzIGl0IGJ5IHRoZSB2ZWN0b3IgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIHRoZSBjbG9uZSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGRpdmlkZU5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5kaXZpZGUodmVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGVzIHRoZSB2ZWN0b3IgYnkgYSBzY2FsYXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBkaXZpZGUgYm90aCB4IGFuZCB5IGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBkaXZpZGVTY2FsYXIoc2NhbGFyKSB7XG4gICAgdmFyIHYgPSBuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKTtcbiAgICByZXR1cm4gdGhpcy5kaXZpZGUodik7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBkaXZpZGVzIGl0IGJ5IHRoZSBwcm92aWRlZCBzY2FsYXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBkaXZpZGUgYm90aCB4IGFuZCB5IGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgZGl2aWRlU2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmRpdmlkZVNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgb25lIHZlY3RvciBieSBhbm90aGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gbXVsdGlwbHkgdGhpcyBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgbXVsdGlwbHkodmVjdG9yKSB7XG4gICAgdGhpcy54ICo9IHZlY3Rvci54O1xuICAgIHRoaXMueSAqPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIG11bHRpcGxpZXMgaXQgYnkgdGhlIHZlY3RvciBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGUgY2xvbmUgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBtdWx0aXBseU5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5tdWx0aXBseSh2ZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgdGhlIHZlY3RvciBieSBhIHNjYWxhci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IGJvdGggeCBhbmQgeSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgbXVsdGlwbHlTY2FsYXIoc2NhbGFyKSB7XG4gICAgdmFyIHYgPSBuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKTtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseSh2KTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIG11bHRpcGxpZXMgaXQgYnkgdGhlIHByb3ZpZGVkIHNjYWxhci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IGJvdGggeCBhbmQgeSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIG11bHRpcGx5U2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2Lm11bHRpcGx5U2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNtdWx0aXBseVNjYWxhcl9fYW5jaG9yIG11bHRpcGx5U2NhbGFyfVxuICAgKi9cbiAgc2NhbGUoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoc2NhbGFyKTtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNtdWx0aXBseVNjYWxhck5ld19fYW5jaG9yIG11bHRpcGx5U2NhbGFyTmV3fVxuICAgKi9cbiAgc2NhbGVOZXcoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXJOZXcoc2NhbGFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgdmVjb3IgYnkgYSBnaXZlbiBhbW91bnQsIHByb3ZpZGVkIGluIHJhZGlhbnMuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICByYWRpYW4gVGhlIGFuZ2xlLCBpbiByYWRpYW5zLCB0byByb3RhdGUgdGhlIHZlY3RvciBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgcm90YXRlKHJhZGlhbikge1xuICBcdHZhciB4ID0gKHRoaXMueCAqIE1hdGguY29zKHJhZGlhbikpIC0gKHRoaXMueSAqIE1hdGguc2luKHJhZGlhbikpO1xuICBcdHZhciB5ID0gKHRoaXMueCAqIE1hdGguc2luKHJhZGlhbikpICsgKHRoaXMueSAqIE1hdGguY29zKHJhZGlhbikpO1xuXG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXG4gIFx0cmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCByb3RhdGVzIGl0IGJ5IHRoZSBzdXBwbGllZCByYWRpYW4gdmFsdWVcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHJhZGlhbiBUaGUgYW5nbGUsIGluIHJhZGlhbnMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgcm90YXRlTmV3KHJhZGlhbikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnJvdGF0ZShyYWRpYW4pO1xuICB9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgYSB2ZWNvciBieSBhIGdpdmVuIGFtb3VudCwgcHJvdmlkZWQgaW4gZGVncmVlcy4gQ29udmVydHMgdGhlIGRlZ3JlZVxuXHQgKiB2YWx1ZSB0byByYWRpYW5zIGFuZCBydW5zIHRoZSByb3RhZXQgbWV0aG9kLlxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqIEBjaGFpbmFibGVcblx0ICogQHBhcmFtICB7bnVtYmVyfSAgZGVncmVlcyBUaGUgYW5nbGUsIGluIGRlZ3JlZXMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5XG5cdCAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcblx0ICovXG4gIHJvdGF0ZURlZyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlKGRlZ3JlZXNUb1JhZGlhbihkZWdyZWVzKSk7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCByb3RhdGVzIGl0IGJ5IHRoZSBzdXBwbGllZCBkZWdyZWUgdmFsdWVcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG5cdCAqIEBwYXJhbSAge251bWJlcn0gIGRlZ3JlZXMgVGhlIGFuZ2xlLCBpbiBkZWdyZWVzLCB0byByb3RhdGUgdGhlIHZlY3RvciBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdCBSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICByb3RhdGVEZWdOZXcoZGVncmVlcykge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZU5ldyhkZWdyZWVzVG9SYWRpYW4oZGVncmVlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3Ijcm90YXRlX19hbmNob3Igcm90YXRlfVxuICAgKi9cbiAgcm90YXRlQnkocmFkaWFuKSB7XG5cdFx0cmV0dXJuIHRoaXMucm90YXRlKHJhZGlhbik7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3Ijcm90YXRlTmV3X19hbmNob3Igcm90YXRlTmV3fVxuICAgKi9cbiAgcm90YXRlQnlOZXcocmFkaWFuKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlTmV3KHJhZGlhbik7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNyb3RhdGVEZWdfX2FuY2hvciByb3RhdGVEZWd9XG4gICAqL1xuICByb3RhdGVEZWdCeShkZWdyZWVzKSB7XG5cdFx0cmV0dXJuIHRoaXMucm90YXRlRGVnKGRlZ3JlZXMpO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI3JvdGF0ZURlZ05ld19fYW5jaG9yIHJvdGF0ZURlZ05ld31cbiAgICovXG4gIHJvdGF0ZURlZ0J5TmV3KHJhZGlhbikge1xuICAgIHJldHVybiB0am9zLnJvdGF0ZURlZ05ldyhyYWRpYW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSB2ZWN0b3IgdG8gYSBzcGVjaWZpYyBhbmdsZVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgcmFkaWFuIFRoZSBhbmdsZSwgaW4gcmFkaWFucywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgdG9cbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG5cdHJvdGF0ZVRvKHJhZGlhbikge1xuXHRcdHJldHVybiB0aGlzLnJvdGF0ZShyYWRpYW4tdGhpcy5hbmdsZSk7XG5cdH07XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgcm90YXRlcyBpdCB0byB0aGUgc3VwcGxpZWQgcmFkaWFuIHZhbHVlXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICByYWRpYW4gVGhlIGFuZ2xlLCBpbiByYWRpYW5zLCB0byByb3RhdGUgdGhlIHZlY3RvciB0b1xuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG5cdHJvdGF0ZVRvTmV3KHJhZGlhbikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnJvdGF0ZVRvKHJhZGlhbik7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgYSB2ZWNvciB0byBhIGdpdmVuIGFtb3VudCwgcHJvdmlkZWQgaW4gZGVncmVlcy4gQ29udmVydHMgdGhlIGRlZ3JlZVxuXHQgKiB2YWx1ZSB0byByYWRpYW5zIGFuZCBydW5zIHRoZSByb3RhdGVUbyBtZXRob2QuXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICogQGNoYWluYWJsZVxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9ICBkZWdyZWVzIFRoZSBhbmdsZSwgaW4gZGVncmVlcywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgdG9cblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuXHQgKi9cbiAgcm90YXRlVG9EZWcoZGVncmVlcykge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZVRvKGRlZ3JlZXNUb1JhZGlhbihkZWdyZWVzKSk7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCByb3RhdGVzIGl0IHRvIHRoZSBzdXBwbGllZCBkZWdyZWUgdmFsdWVcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG5cdCAqIEBwYXJhbSAge251bWJlcn0gIGRlZ3JlZXMgVGhlIGFuZ2xlLCBpbiBkZWdyZWVzLCB0byByb3RhdGUgdGhlIHZlY3RvciB0b1xuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdCBSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICByb3RhdGVUb0RlZ05ldyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlVG9OZXcoZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpKTtcbiAgfVxuXG5cdG5vcm1hbGlzZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIodGhpcy5sZW5ndGgpO1xuXHR9XG5cdG5vcm1hbGlzZU5ldygpIHtcblx0XHRyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXJOZXcodGhpcy5sZW5ndGgpO1xuXHR9XG5cblx0ZGlzdGFuY2UodmVjdG9yKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3VidHJhY3ROZXcodmVjdG9yKS5sZW5ndGg7XG5cdH1cblxuXHRkaXN0YW5jZVgodmVjdG9yKSB7XG5cdFx0cmV0dXJuIHRoaXMueCAtIHZlY3Rvci54O1xuXHR9XG5cblx0ZGlzdGFuY2VZKHZlY3Rvcikge1xuXHRcdHJldHVybiB0aGlzLnkgLSB2ZWN0b3IueTtcblx0fVxuXG5cdGRvdFByb2R1Y3QodmVjdG9yKSB7XG5cdFx0cmV0dXJuICh0aGlzLnggKiB2ZWN0b3IueCkgKyAodGhpcy55ICogdmVjdG9yLnkpO1xuXHR9XG5cblx0Y3Jvc3NQcm9kdWN0KHZlY3Rvcikge1xuXHRcdHJldHVybiAodGhpcy54ICogdmVjdG9yLngpIC0gKHRoaXMueSAqIHZlY3Rvci55KTtcblx0fVxuXG5cbiAgLyoqXG4gICAqIEdldHRlcnMgYW5kIHNldHRlcnNcbiAgICovXG5cbiAgLyoqXG4gICAqIChnZXR0ZXIvc2V0dGVyKSBUaGUgeCB2YWx1ZSBvZiB0aGUgdmVjdG9yLlxuICAgKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBzZXQgeCh4KSB7XG4gICAgaWYodHlwZW9mIHggPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3ggPSB4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdYIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgeCgpIHtcbiAgICByZXR1cm4gdGhpcy5feCB8fCAwO1xuICB9XG5cbiAvKipcblx0KiAoZ2V0dGVyL3NldHRlcikgVGhlIHkgdmFsdWUgb2YgdGhlIHZlY3Rvci5cblx0KlxuXHQqIEB0eXBlIHtudW1iZXJ9XG5cdCogQGRlZmF1bHQgMFxuXHQqL1xuICBzZXQgeSh5KSB7XG4gICAgaWYodHlwZW9mIHkgPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3kgPSB5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy5feSB8fCAwO1xuICB9XG5cblx0LyoqXG5cdCogKGdldHRlci9zZXR0ZXIpIFRoZSBsZW5ndGggb2YgdGhlIHZlY3RvciBwcmVzZW50ZWQgYXMgYSBzcXVhcmUuIElmIHlvdSdyZSB1c2luZ1xuXHQqIGxlbmd0aCBmb3IgY29tcGFyaXNvbiwgdGhpcyBpcyBxdWlja2VyLlxuXHQqXG5cdCogQHR5cGUge251bWJlcn1cblx0KiBAZGVmYXVsdCAwXG5cdCovXG4gIHNldCBsZW5ndGhTcXVhcmVkKGxlbmd0aCkge1xuICAgIHZhciBmYWN0b3I7XG4gICAgaWYodHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJykge1xuICAgICAgZmFjdG9yID0gbGVuZ3RoIC8gdGhpcy5sZW5ndGhTcXVhcmVkO1xuICAgICAgdGhpcy5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdsZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCBsZW5ndGhTcXVhcmVkKCkge1xuICAgIHJldHVybiAodGhpcy54ICogdGhpcy54KSArICh0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cblx0LyoqXG5cdCogKGdldHRlci9zZXR0ZXIpIFRoZSBsZW5ndGggb2YgdGhlIHZlY3RvclxuXHQqXG5cdCogQHR5cGUge251bWJlcn1cblx0KiBAZGVmYXVsdCAwXG5cdCovXG4gIHNldCBsZW5ndGgobGVuZ3RoKSB7XG4gICAgdmFyIGZhY3RvcjtcbiAgICBpZih0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInKSB7XG4gICAgICBmYWN0b3IgPSBsZW5ndGggLyB0aGlzLmxlbmd0aDtcbiAgICAgIHRoaXMubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXVhcmVkKTtcbiAgfVxuXG5cdC8qKlxuXHQqIChnZXR0ZXIvc2V0dGVyKSBUaGUgYW5nbGUgb2YgdGhlIHZlY3RvciwgaW4gcmFkaWFuc1xuXHQqXG5cdCogQHR5cGUge251bWJlcn1cblx0KiBAZGVmYXVsdCAwXG5cdCovXG4gIHNldCBhbmdsZShyYWRpYW4pIHtcbiAgICBpZih0eXBlb2YgcmFkaWFuID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnJvdGF0ZVRvKHJhZGlhbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FuZ2xlIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgYW5nbGUoKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICB9XG5cblx0LyoqXG5cdCogKGdldHRlci9zZXR0ZXIpIFRoZSBhbmdsZSBvZiB0aGUgdmVjdG9yLCBpbiByYWRpYW5zXG5cdCpcblx0KiBAdHlwZSB7bnVtYmVyfVxuXHQqIEBkZWZhdWx0IDBcblx0Ki9cbiAgc2V0IGFuZ2xlSW5EZWdyZWVzKGRlZ3JlZXMpIHtcbiAgICBpZih0eXBlb2YgZGVncmVlcyA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5yb3RhdGVUb0RlZyhkZWdyZWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYW5nbGUgc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCBhbmdsZUluRGVncmVlcygpIHtcbiAgICByZXR1cm4gcmFkaWFuVG9EZWdyZWVzKE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvcjtcbiJdfQ==

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wtcVector = require('../../src/wtc-vector');

var _wtcVector2 = _interopRequireDefault(_wtcVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawingVector = function () {
  function DrawingVector(x, y, color) {
    var lineWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, DrawingVector);

    this.v = new _wtcVector2.default(x, y);

    this.arrowheadV1 = new _wtcVector2.default(-10, -10);
    this.arrowheadV2 = new _wtcVector2.default(-10, 10);

    if (typeof color !== 'string' || !/^#[0-9ABCDEFabcdef]*/.test(color)) {
      color = '#' + ('0' + Math.round(Math.random() * 255).toString(16)).substr(-2) + ('0' + Math.round(Math.random() * 255).toString(16)).substr(-2) + ('0' + Math.round(Math.random() * 255).toString(16)).substr(-2);
    }

    this.color = color;
    this.lineWidth = lineWidth;
  }

  _createClass(DrawingVector, [{
    key: 'draw',
    value: function draw(playground) {
      var unitX = playground.scaledUnitVectorX; // iHat
      var unitY = playground.scaledUnitVectorY; // jHat
      var unitVector = unitX.addNew(unitY);
      var scale = playground.scale;
      // console.clear();
      // console.log(unitVector, unitX, unitY);
      var offset = playground.offset.addNew(this.offset.multiplyNew(unitVector)); // creating the offset
      var x = offset.x;
      var y = offset.y;
      var ctx = playground.mainCtx;

      if (this.outputVector instanceof _wtcVector2.default) {
        var _unitX = playground.unitVectorX; // iHat
        var _unitY = playground.unitVectorY; // jHat

        this.outputVector.x = this.v.x * _unitX.x + this.v.y * _unitY.x;
        this.outputVector.y = this.v.x * _unitX.y + this.v.y * _unitY.y;
      }

      // Translate the vector using linear transformation x(î) + y(j)
      // î = unix X
      // j = unit Y
      //  _       _    _       _
      // | x(î.x) | + | y(j.x) |
      // | x(i.y) | + | y(j.y) |
      //
      var translatedVector = new _wtcVector2.default(0, 0);
      translatedVector.x = this.v.x * unitX.x + this.v.y * unitY.x;
      translatedVector.y = this.v.x * unitX.y + this.v.y * unitY.y;

      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.color;
      ctx.moveTo(x, y);
      x = translatedVector.x + offset.x;
      y = translatedVector.y + offset.y;
      ctx.lineTo(x, y);

      this.translatedVector = translatedVector;

      // Create the arrow head vectors. These are not dependent upon the unit vector
      var av1 = this.arrowheadV1.rotateNew(translatedVector.angle);
      var av2 = this.arrowheadV2.rotateNew(translatedVector.angle);

      // Draw the arrowhead
      ctx.lineTo(av1.x + x, av1.y + y);
      ctx.moveTo(x, y);
      ctx.lineTo(av2.x + x, av2.y + y);

      ctx.stroke();
    }
  }, {
    key: 'playground',
    get: function get() {
      return this._pg;
    },
    set: function set(pg) {
      this._pg = pg;
    }
  }, {
    key: 'color',
    set: function set(color) {
      if (typeof color == 'string' && /^#[0-9ABCDEFabcdef]*/.test(color)) {
        this._color = color;
      }
    },
    get: function get() {
      return this._color || '#FFFFFF';
    }
  }, {
    key: 'offset',
    set: function set(v) {
      if (v instanceof _wtcVector2.default) {
        this._offset = v;
      }
    },
    get: function get() {
      if (!(this._offset instanceof _wtcVector2.default)) {
        this._offset = new _wtcVector2.default(0, 0);
      }
      return this._offset;
    }
  }]);

  return DrawingVector;
}();

exports.default = DrawingVector;

},{"../../src/wtc-vector":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wtcVector = require("../../src/wtc-vector");

var _wtcVector2 = _interopRequireDefault(_wtcVector);

var _DrawingVector = require("./DrawingVector");

var _DrawingVector2 = _interopRequireDefault(_DrawingVector);

var _colours = require("./colours");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VectorPlayground = function () {
  function VectorPlayground() {
    _classCallCheck(this, VectorPlayground);
  }

  _createClass(VectorPlayground, null, [{
    key: "init",
    value: function init() {
      var drawing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      var drawGrid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this.initialised = true;

      this.mainCanvas = document.createElement('canvas');
      this.mainCtx = this.mainCanvas.getContext('2d');
      this.secondaryCanvas = document.createElement('canvas');
      this.secondarCtx = this.secondaryCanvas.getContext('2d');

      document.body.appendChild(this.mainCanvas);
      document.body.appendChild(this.secondaryCanvas);

      window.addEventListener('resize', this.resizeListener.bind(this));
      this.resizeListener();

      this.vectors = [];

      this.gridDistance = 1;

      this.doDrawGrid = drawGrid;
      this.scale = scale;
      this.drawing = drawing;
    }
  }, {
    key: "resizeListener",
    value: function resizeListener(e) {
      this.dimensions = new _wtcVector2.default(window.innerWidth, window.innerHeight);
      this.offset = this.dimensions.divideScalarNew(2);

      this.mainCanvas.width = this.secondaryCanvas.width = window.innerWidth;
      this.mainCanvas.height = this.secondaryCanvas.height = window.innerHeight;
    }
  }, {
    key: "addVector",
    value: function addVector(drawingVector) {
      if (!(drawingVector instanceof _DrawingVector2.default)) {
        return;
      }

      this.vectors.push(drawingVector);

      return drawingVector;
    }
  }, {
    key: "draw",
    value: function draw() {
      // Clear the canvases before drawing
      this.mainCtx.fillStyle = this.bgColor;
      this.mainCtx.beginPath();
      this.mainCtx.rect(0, 0, this.dimensions.width, this.dimensions.height);
      this.mainCtx.fill();
      // this.secondarCtx.clearRect(0,0,this.mainCanvas.width, this.mainCanvas.height);

      if (this.doDrawGrid) this.drawGrid();
      this.drawVectors();

      if (this.drawing) {
        window.requestAnimationFrame(this.draw.bind(this));
      }
    }
  }, {
    key: "drawVectors",
    value: function drawVectors() {
      this.vectors.forEach(function (v) {
        v.draw(this);
      }.bind(this));
    }
  }, {
    key: "drawGrid",
    value: function drawGrid() {
      var scale = this.scale;
      var gridDistance = this.gridDistance * scale;

      // draw the main grid lines

      this.mainCtx.lineWidth = 1;
      this.mainCtx.strokeStyle = this.gridColor;
      this.mainCtx.beginPath();

      var xPos = this.offset.x;
      while (xPos < this.dimensions.width) {
        xPos += gridDistance;
        this.mainCtx.moveTo(xPos, 0);
        this.mainCtx.lineTo(xPos, this.dimensions.height);
      }
      xPos = this.offset.x;
      while (xPos > 0) {
        xPos -= gridDistance;
        this.mainCtx.moveTo(xPos, 0);
        this.mainCtx.lineTo(xPos, this.dimensions.height);
      }
      var yPos = this.offset.y;
      while (yPos < this.dimensions.height) {
        yPos += gridDistance;
        this.mainCtx.moveTo(0, yPos);
        this.mainCtx.lineTo(this.dimensions.width, yPos);
      }
      yPos = this.offset.y;
      while (yPos > 0) {
        yPos -= gridDistance;
        this.mainCtx.moveTo(0, yPos);
        this.mainCtx.lineTo(this.dimensions.width, yPos);
      }
      this.mainCtx.stroke();

      this.mainCtx.strokeStyle = this.originColor;
      this.mainCtx.beginPath();

      this.mainCtx.moveTo(0, this.offset.y);
      this.mainCtx.lineTo(this.dimensions.width, this.offset.y);
      this.mainCtx.moveTo(this.offset.x, 0);
      this.mainCtx.lineTo(this.offset.x, this.dimensions.height);

      this.mainCtx.stroke();
    }
  }, {
    key: "drawing",
    set: function set(d) {
      this._drawing = d === true;

      if (this._drawing === true) {
        this.draw();
      }
    },
    get: function get() {
      return this._drawing === true;
    }
  }, {
    key: "bgColor",
    set: function set(color) {
      if (typeof color == 'string' && /#[0-9ABCDEF]{6}/.test(color.toUpperCase())) {
        this._bgColor = color;
      }
    },
    get: function get() {
      return this._bgColor || '#282C34';
    }
  }, {
    key: "originColor",
    set: function set(color) {
      if (typeof color == 'string' && /#[0-9ABCDEF]{6}/.test(color.toUpperCase())) {
        this._originColor = color;
      }
    },
    get: function get() {
      return this._originColor || '#FFFFFF';
    }
  }, {
    key: "gridColor",
    set: function set(color) {
      if (typeof color == 'string' && /#[0-9ABCDEF]{6}/.test(color.toUpperCase())) {
        this._gridColor = color;
      }
    },
    get: function get() {
      return this._gridColor || '#666666';
    }
  }, {
    key: "unitVectorX",
    set: function set(v) {
      if (v instanceof _wtcVector2.default) {
        this._unitVectorX = v;
      }
    },
    get: function get() {
      return this._unitVectorX || new _wtcVector2.default(1, 0);
    }
  }, {
    key: "scaledUnitVectorX",
    get: function get() {
      var scale = this.scale;
      var uv = this.unitVectorX.clone();
      if (scale !== 1) uv.multiplyScalar(scale);
      return uv;
    }
  }, {
    key: "unitVectorY",
    set: function set(v) {
      if (v instanceof _wtcVector2.default) {
        this._unitVectorY = v;
      }
    },
    get: function get() {
      return this._unitVectorY || new _wtcVector2.default(0, 1);
    }
  }, {
    key: "scaledUnitVectorY",
    get: function get() {
      var scale = this.scale;
      var uv = this.unitVectorY.clone();
      if (scale !== 1) uv.multiplyScalar(scale);
      return uv;
    }
  }, {
    key: "dimensions",
    set: function set(dims) {
      if (dims instanceof _wtcVector2.default) {
        this._dimensions = dims;
      }
    },
    get: function get() {
      return this._dimensions || new _wtcVector2.default();
    }
  }, {
    key: "offset",
    set: function set(dims) {
      if (dims instanceof _wtcVector2.default) {
        this._offset = dims;
      }
    },
    get: function get() {
      return this._offset || new _wtcVector2.default();
    }
  }, {
    key: "scale",
    set: function set(scale) {
      if (typeof scale === 'number') {
        this._scale = scale;
      }
    },
    get: function get() {
      return this._scale || 1;
    }
  }, {
    key: "doDrawGrid",
    set: function set(drawGrid) {
      this._drawGrid = drawGrid === true;
    },
    get: function get() {
      return this._drawGrid || false;
    }
  }]);

  return VectorPlayground;
}();

exports.default = VectorPlayground;

},{"../../src/wtc-vector":5,"./DrawingVector":1,"./colours":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var colours = ['#c678dd', '#98c379', '#c34448', '#4e9c9e', '#d18549', '#abb2bf'];
var namedColours = {};
exports.colours = colours;
exports.namedColours = namedColours;

},{}],4:[function(require,module,exports){
"use strict";

var _wtcVector = require("../src/wtc-vector");

var _wtcVector2 = _interopRequireDefault(_wtcVector);

var _DrawingVector = require("./app/DrawingVector");

var _DrawingVector2 = _interopRequireDefault(_DrawingVector);

var _VectorPlayground = require("./app/VectorPlayground");

var _VectorPlayground2 = _interopRequireDefault(_VectorPlayground);

var _colours = require("./app/colours");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Vector = _wtcVector2.default;

var settings = {
  animating: false
};
window.settings = settings;

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {

  var va = new _DrawingVector2.default(-2, -2, _colours.colours[0]);
  var vb = new _DrawingVector2.default(1, 1, _colours.colours[1]);
  settings.va = va.v;
  settings.vb = vb.v;

  // Initiallising the world
  _VectorPlayground2.default.init();

  // Add the vectors to stage
  _VectorPlayground2.default.addVector(va);
  _VectorPlayground2.default.addVector(vb);

  // Animation
  var update = function update() {

    if (settings.animating) {

      // Update the angle of the vector
      va.v.angle += 0.01;

      requestAnimationFrame(update);
    }
  };

  update();

  // Set up the dat gui
  var gui = new dat.GUI();
  var animationControl = gui.add(settings, 'animating');
  animationControl.onChange(function (value) {
    if (value == true) {
      update();
    }
  });
  var _va = gui.addFolder('Vector A');
  var unitX_x = _va.add(settings.va, '_x').listen();
  var unitX_y = _va.add(settings.va, '_y').listen();
  var _vb = gui.addFolder('Vector B');
  var unitY_x = _vb.add(settings.vb, 'x').listen();
  var unitY_y = _vb.add(settings.vb, 'y').listen();
  _va.open();
  _vb.open();
});

},{"../src/wtc-vector":5,"./app/DrawingVector":1,"./app/VectorPlayground":2,"./app/colours":3}],5:[function(require,module,exports){
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

    /**
     * Normalises the vector down to a length of 1 unit
     *
     * @public
     * @chainable
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: 'normalise',
    value: function normalise() {
      return this.divideScalar(this.length);
    }
    /**
     * Clones the vector and normalises it
     *
     * @public
     * @chainable
     * @return {Vector}					Returns a clone of itself, modified
     */

  }, {
    key: 'normaliseNew',
    value: function normaliseNew() {
      return this.divideScalarNew(this.length);
    }

    /**
     * Calculates the distance between this and the supplied vector
     *
     * @param  {Vector} vector The vector to calculate the distance from
     * @return {number}        The distance between this and the supplied vector
     */

  }, {
    key: 'distance',
    value: function distance(vector) {
      return this.subtractNew(vector).length;
    }

    /**
     * Calculates the distance on the X axis between this and the supplied vector
     *
     * @param  {Vector} vector The vector to calculate the distance from
     * @return {number}        The distance, along the x axis, between this and the supplied vector
     */

  }, {
    key: 'distanceX',
    value: function distanceX(vector) {
      return this.x - vector.x;
    }

    /**
     * Calculated the distance on the Y axis between this and the supplied vector
     *
     * @param  {Vector} vector The vector to calculate the distance from
     * @return {number}        The distance, along the y axis, between this and the supplied vector
     */

  }, {
    key: 'distanceY',
    value: function distanceY(vector) {
      return this.y - vector.y;
    }

    /**
     * Calculates the dot product between this and a supplied vector
     *
     * @example
     * // returns -14
     * new Vector(2, -3).dot(new Vector(-4, 2))
     * new Vector(-4, 2).dot(new Vector(2, -3))
     * new Vector(2, -4).dot(new Vector(-3, 2))
     *
     * @param  {Vector} vector The vector object against which to calculate the dot product
     * @return {number}        The dot product of the two vectors
     */

  }, {
    key: 'dot',
    value: function dot(vector) {
      return this.x * vector.x + this.y * vector.y;
    }

    /**
     * Calculates the cross product between this and the supplied vector.
     *
     * @example
     * // returns -2
     * new Vector(2, -3).cross(new Vector(-4, 2))
     * new Vector(-4, 2).cross(new Vector(2, -3))
     * // returns 2
     * new Vector(2, -4).cross(new Vector(-3, 2))
     *
     * @param  {Vector} vector The vector object against which to calculate the cross product
     * @return {number}        The cross product of the two vectors
     */

  }, {
    key: 'cross',
    value: function cross(vector) {
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

    /**
     * (getter/setter) Vector width.
      * Alias of {@link Vector#x x}
     *
     * @type {number}
     */

  }, {
    key: 'width',
    set: function set(w) {
      this.x = w;
    },
    get: function get() {
      return this.x;
    }

    /**
     * (getter/setter) Vector height.
      * Alias of {@link Vector#x x}
     *
     * @type {number}
     */

  }, {
    key: 'height',
    set: function set(h) {
      this.y = h;
    },
    get: function get() {
      return this.y;
    }
  }]);

  return Vector;
}();

exports.default = Vector;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2FwcC9EcmF3aW5nVmVjdG9yLmpzIiwiZGVtby9hcHAvVmVjdG9yUGxheWdyb3VuZC5qcyIsImRlbW8vYXBwL2NvbG91cnMuanMiLCJkZW1vL3J1bi5qcyIsInNyYy93dGMtdmVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFFTSxhO0FBQ0oseUJBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsS0FBbEIsRUFBd0M7QUFBQSxRQUFmLFNBQWUsdUVBQUgsQ0FBRzs7QUFBQTs7QUFDdEMsU0FBSyxDQUFMLEdBQVMsd0JBQVcsQ0FBWCxFQUFjLENBQWQsQ0FBVDs7QUFFQSxTQUFLLFdBQUwsR0FBbUIsd0JBQVcsQ0FBQyxFQUFaLEVBQWUsQ0FBQyxFQUFoQixDQUFuQjtBQUNBLFNBQUssV0FBTCxHQUFtQix3QkFBVyxDQUFDLEVBQVosRUFBZ0IsRUFBaEIsQ0FBbkI7O0FBRUEsUUFBSSxPQUFPLEtBQVAsS0FBaUIsUUFBakIsSUFBNkIsQ0FBRSx1QkFBdUIsSUFBdkIsQ0FBNEIsS0FBNUIsQ0FBbkMsRUFBeUU7QUFDdkUsY0FBUSxNQUFNLENBQUMsTUFBSyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBYyxHQUF6QixDQUFELENBQWdDLFFBQWhDLENBQXlDLEVBQXpDLENBQUwsRUFBbUQsTUFBbkQsQ0FBMEQsQ0FBQyxDQUEzRCxDQUFOLEdBQXNFLENBQUMsTUFBSyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBYyxHQUF6QixDQUFELENBQWdDLFFBQWhDLENBQXlDLEVBQXpDLENBQUwsRUFBbUQsTUFBbkQsQ0FBMEQsQ0FBQyxDQUEzRCxDQUF0RSxHQUFzSSxDQUFDLE1BQUssS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWMsR0FBekIsQ0FBRCxDQUFnQyxRQUFoQyxDQUF5QyxFQUF6QyxDQUFMLEVBQW1ELE1BQW5ELENBQTBELENBQUMsQ0FBM0QsQ0FBOUk7QUFDRDs7QUFFRCxTQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0Q7Ozs7eUJBRUksVSxFQUFZO0FBQ2YsVUFBSSxRQUFRLFdBQVcsaUJBQXZCLENBRGUsQ0FDMkI7QUFDMUMsVUFBSSxRQUFRLFdBQVcsaUJBQXZCLENBRmUsQ0FFMkI7QUFDMUMsVUFBSSxhQUFhLE1BQU0sTUFBTixDQUFhLEtBQWIsQ0FBakI7QUFDQSxVQUFJLFFBQVEsV0FBVyxLQUF2QjtBQUNBO0FBQ0E7QUFDQSxVQUFJLFNBQVMsV0FBVyxNQUFYLENBQWtCLE1BQWxCLENBQXlCLEtBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsVUFBeEIsQ0FBekIsQ0FBYixDQVBlLENBTzZEO0FBQzVFLFVBQUksSUFBSSxPQUFPLENBQWY7QUFDQSxVQUFJLElBQUksT0FBTyxDQUFmO0FBQ0EsVUFBSSxNQUFNLFdBQVcsT0FBckI7O0FBRUEsVUFBRyxLQUFLLFlBQUwsK0JBQUgsRUFBd0M7QUFDdEMsWUFBSSxTQUFRLFdBQVcsV0FBdkIsQ0FEc0MsQ0FDRjtBQUNwQyxZQUFJLFNBQVEsV0FBVyxXQUF2QixDQUZzQyxDQUVGOztBQUVwQyxhQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsR0FBdUIsS0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLE9BQU0sQ0FBbEIsR0FBd0IsS0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLE9BQU0sQ0FBL0Q7QUFDQSxhQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsR0FBdUIsS0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLE9BQU0sQ0FBbEIsR0FBd0IsS0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLE9BQU0sQ0FBL0Q7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQUksbUJBQW1CLHdCQUFXLENBQVgsRUFBYyxDQUFkLENBQXZCO0FBQ0EsdUJBQWlCLENBQWpCLEdBQXNCLEtBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxNQUFNLENBQWxCLEdBQXdCLEtBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxNQUFNLENBQTlEO0FBQ0EsdUJBQWlCLENBQWpCLEdBQXNCLEtBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxNQUFNLENBQWxCLEdBQXdCLEtBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxNQUFNLENBQTlEOztBQUVBLFVBQUksU0FBSjtBQUNBLFVBQUksU0FBSixHQUFnQixLQUFLLFNBQXJCO0FBQ0EsVUFBSSxXQUFKLEdBQWtCLEtBQUssS0FBdkI7QUFDQSxVQUFJLE1BQUosQ0FBVyxDQUFYLEVBQWMsQ0FBZDtBQUNBLFVBQUksaUJBQWlCLENBQWpCLEdBQXFCLE9BQU8sQ0FBaEM7QUFDQSxVQUFJLGlCQUFpQixDQUFqQixHQUFxQixPQUFPLENBQWhDO0FBQ0EsVUFBSSxNQUFKLENBQVcsQ0FBWCxFQUFjLENBQWQ7O0FBRUEsV0FBSyxnQkFBTCxHQUF3QixnQkFBeEI7O0FBRUE7QUFDQSxVQUFJLE1BQU0sS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLGlCQUFpQixLQUE1QyxDQUFWO0FBQ0EsVUFBSSxNQUFNLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUEyQixpQkFBaUIsS0FBNUMsQ0FBVjs7QUFFQTtBQUNBLFVBQUksTUFBSixDQUFXLElBQUksQ0FBSixHQUFRLENBQW5CLEVBQXNCLElBQUksQ0FBSixHQUFRLENBQTlCO0FBQ0EsVUFBSSxNQUFKLENBQVcsQ0FBWCxFQUFjLENBQWQ7QUFDQSxVQUFJLE1BQUosQ0FBVyxJQUFJLENBQUosR0FBUSxDQUFuQixFQUFzQixJQUFJLENBQUosR0FBUSxDQUE5Qjs7QUFFQSxVQUFJLE1BQUo7QUFFRDs7O3dCQUVnQjtBQUNmLGFBQU8sS0FBSyxHQUFaO0FBQ0QsSztzQkFDYyxFLEVBQUk7QUFDakIsV0FBSyxHQUFMLEdBQVcsRUFBWDtBQUNEOzs7c0JBRVMsSyxFQUFPO0FBQ2YsVUFBSSxPQUFPLEtBQVAsSUFBZ0IsUUFBaEIsSUFBNEIsdUJBQXVCLElBQXZCLENBQTRCLEtBQTVCLENBQWhDLEVBQXFFO0FBQ25FLGFBQUssTUFBTCxHQUFjLEtBQWQ7QUFDRDtBQUNGLEs7d0JBQ1c7QUFDVixhQUFPLEtBQUssTUFBTCxJQUFlLFNBQXRCO0FBQ0Q7OztzQkFFVSxDLEVBQUc7QUFDWixVQUFJLGdDQUFKLEVBQTBCO0FBQ3hCLGFBQUssT0FBTCxHQUFlLENBQWY7QUFDRDtBQUNGLEs7d0JBQ1k7QUFDWCxVQUFJLEVBQUUsS0FBSyxPQUFMLCtCQUFGLENBQUosRUFBd0M7QUFDdEMsYUFBSyxPQUFMLEdBQWUsd0JBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBZjtBQUNEO0FBQ0QsYUFBTyxLQUFLLE9BQVo7QUFDRDs7Ozs7O2tCQUdZLGE7Ozs7Ozs7Ozs7O0FDcEdmOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxnQjs7Ozs7OzsyQkFDc0Q7QUFBQSxVQUE5QyxPQUE4Qyx1RUFBcEMsSUFBb0M7QUFBQSxVQUE5QixLQUE4Qix1RUFBdEIsR0FBc0I7QUFBQSxVQUFqQixRQUFpQix1RUFBTixJQUFNOztBQUN4RCxXQUFLLFdBQUwsR0FBbUIsSUFBbkI7O0FBRUEsV0FBSyxVQUFMLEdBQWtCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFsQjtBQUNBLFdBQUssT0FBTCxHQUFlLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixJQUEzQixDQUFmO0FBQ0EsV0FBSyxlQUFMLEdBQXVCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUF2QjtBQUNBLFdBQUssV0FBTCxHQUFtQixLQUFLLGVBQUwsQ0FBcUIsVUFBckIsQ0FBZ0MsSUFBaEMsQ0FBbkI7O0FBRUEsZUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUFLLFVBQS9CO0FBQ0EsZUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUFLLGVBQS9COztBQUVBLGFBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQWxDO0FBQ0EsV0FBSyxjQUFMOztBQUVBLFdBQUssT0FBTCxHQUFlLEVBQWY7O0FBRUEsV0FBSyxZQUFMLEdBQW9CLENBQXBCOztBQUVBLFdBQUssVUFBTCxHQUFrQixRQUFsQjtBQUNBLFdBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxXQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7OzttQ0FFcUIsQyxFQUFHO0FBQ3ZCLFdBQUssVUFBTCxHQUFrQix3QkFBVyxPQUFPLFVBQWxCLEVBQThCLE9BQU8sV0FBckMsQ0FBbEI7QUFDQSxXQUFLLE1BQUwsR0FBYyxLQUFLLFVBQUwsQ0FBZ0IsZUFBaEIsQ0FBZ0MsQ0FBaEMsQ0FBZDs7QUFFQSxXQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsR0FBd0IsS0FBSyxlQUFMLENBQXFCLEtBQXJCLEdBQTZCLE9BQU8sVUFBNUQ7QUFDQSxXQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsS0FBSyxlQUFMLENBQXFCLE1BQXJCLEdBQThCLE9BQU8sV0FBOUQ7QUFDRDs7OzhCQUVnQixhLEVBQWU7QUFDOUIsVUFBSSxFQUFHLGdEQUFILENBQUosRUFBaUQ7QUFDL0M7QUFDRDs7QUFFRCxXQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLGFBQWxCOztBQUVBLGFBQU8sYUFBUDtBQUNEOzs7MkJBRWE7QUFDWjtBQUNBLFdBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsS0FBSyxPQUE5QjtBQUNBLFdBQUssT0FBTCxDQUFhLFNBQWI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLENBQWxCLEVBQW9CLENBQXBCLEVBQXVCLEtBQUssVUFBTCxDQUFnQixLQUF2QyxFQUE4QyxLQUFLLFVBQUwsQ0FBZ0IsTUFBOUQ7QUFDQSxXQUFLLE9BQUwsQ0FBYSxJQUFiO0FBQ0E7O0FBRUEsVUFBRyxLQUFLLFVBQVIsRUFBb0IsS0FBSyxRQUFMO0FBQ3BCLFdBQUssV0FBTDs7QUFFQSxVQUFJLEtBQUssT0FBVCxFQUFtQjtBQUNqQixlQUFPLHFCQUFQLENBQTZCLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxJQUFmLENBQTdCO0FBQ0Q7QUFDRjs7O2tDQUVvQjtBQUNuQixXQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQVMsQ0FBVCxFQUFZO0FBQy9CLFVBQUUsSUFBRixDQUFPLElBQVA7QUFDRCxPQUZvQixDQUVuQixJQUZtQixDQUVkLElBRmMsQ0FBckI7QUFHRDs7OytCQUVpQjtBQUNoQixVQUFJLFFBQVEsS0FBSyxLQUFqQjtBQUNBLFVBQUksZUFBZSxLQUFLLFlBQUwsR0FBb0IsS0FBdkM7O0FBRUE7O0FBRUEsV0FBSyxPQUFMLENBQWEsU0FBYixHQUF5QixDQUF6QjtBQUNBLFdBQUssT0FBTCxDQUFhLFdBQWIsR0FBMkIsS0FBSyxTQUFoQztBQUNBLFdBQUssT0FBTCxDQUFhLFNBQWI7O0FBRUEsVUFBSSxPQUFPLEtBQUssTUFBTCxDQUFZLENBQXZCO0FBQ0EsYUFBTSxPQUFPLEtBQUssVUFBTCxDQUFnQixLQUE3QixFQUFvQztBQUNsQyxnQkFBUSxZQUFSO0FBQ0EsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixFQUEwQixDQUExQjtBQUNBLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsRUFBMEIsS0FBSyxVQUFMLENBQWdCLE1BQTFDO0FBQ0Q7QUFDRCxhQUFPLEtBQUssTUFBTCxDQUFZLENBQW5CO0FBQ0EsYUFBTSxPQUFPLENBQWIsRUFBZ0I7QUFDZCxnQkFBUSxZQUFSO0FBQ0EsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixFQUEwQixDQUExQjtBQUNBLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsRUFBMEIsS0FBSyxVQUFMLENBQWdCLE1BQTFDO0FBQ0Q7QUFDRCxVQUFJLE9BQU8sS0FBSyxNQUFMLENBQVksQ0FBdkI7QUFDQSxhQUFNLE9BQU8sS0FBSyxVQUFMLENBQWdCLE1BQTdCLEVBQXFDO0FBQ25DLGdCQUFRLFlBQVI7QUFDQSxhQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLENBQXBCLEVBQXVCLElBQXZCO0FBQ0EsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLFVBQUwsQ0FBZ0IsS0FBcEMsRUFBMkMsSUFBM0M7QUFDRDtBQUNELGFBQU8sS0FBSyxNQUFMLENBQVksQ0FBbkI7QUFDQSxhQUFNLE9BQU8sQ0FBYixFQUFnQjtBQUNkLGdCQUFRLFlBQVI7QUFDQSxhQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLENBQXBCLEVBQXVCLElBQXZCO0FBQ0EsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLFVBQUwsQ0FBZ0IsS0FBcEMsRUFBMkMsSUFBM0M7QUFDRDtBQUNELFdBQUssT0FBTCxDQUFhLE1BQWI7O0FBR0EsV0FBSyxPQUFMLENBQWEsV0FBYixHQUEyQixLQUFLLFdBQWhDO0FBQ0EsV0FBSyxPQUFMLENBQWEsU0FBYjs7QUFFQSxXQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLENBQXBCLEVBQXVCLEtBQUssTUFBTCxDQUFZLENBQW5DO0FBQ0EsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLFVBQUwsQ0FBZ0IsS0FBcEMsRUFBMkMsS0FBSyxNQUFMLENBQVksQ0FBdkQ7QUFDQSxXQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssTUFBTCxDQUFZLENBQWhDLEVBQW1DLENBQW5DO0FBQ0EsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLE1BQUwsQ0FBWSxDQUFoQyxFQUFtQyxLQUFLLFVBQUwsQ0FBZ0IsTUFBbkQ7O0FBRUEsV0FBSyxPQUFMLENBQWEsTUFBYjtBQUVEOzs7c0JBRWtCLEMsRUFBRztBQUNwQixXQUFLLFFBQUwsR0FBZ0IsTUFBTSxJQUF0Qjs7QUFFQSxVQUFHLEtBQUssUUFBTCxLQUFrQixJQUFyQixFQUEyQjtBQUN6QixhQUFLLElBQUw7QUFDRDtBQUNGLEs7d0JBQ29CO0FBQ25CLGFBQU8sS0FBSyxRQUFMLEtBQWtCLElBQXpCO0FBQ0Q7OztzQkFFa0IsSyxFQUFPO0FBQ3hCLFVBQUksT0FBTyxLQUFQLElBQWdCLFFBQWhCLElBQTZCLGtCQUFrQixJQUFsQixDQUF1QixNQUFNLFdBQU4sRUFBdkIsQ0FBakMsRUFBOEU7QUFDNUUsYUFBSyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0Q7QUFDRixLO3dCQUNvQjtBQUNuQixhQUFPLEtBQUssUUFBTCxJQUFpQixTQUF4QjtBQUNEOzs7c0JBRXNCLEssRUFBTztBQUM1QixVQUFJLE9BQU8sS0FBUCxJQUFnQixRQUFoQixJQUE2QixrQkFBa0IsSUFBbEIsQ0FBdUIsTUFBTSxXQUFOLEVBQXZCLENBQWpDLEVBQThFO0FBQzVFLGFBQUssWUFBTCxHQUFvQixLQUFwQjtBQUNEO0FBQ0YsSzt3QkFDd0I7QUFDdkIsYUFBTyxLQUFLLFlBQUwsSUFBcUIsU0FBNUI7QUFDRDs7O3NCQUVvQixLLEVBQU87QUFDMUIsVUFBSSxPQUFPLEtBQVAsSUFBZ0IsUUFBaEIsSUFBNkIsa0JBQWtCLElBQWxCLENBQXVCLE1BQU0sV0FBTixFQUF2QixDQUFqQyxFQUE4RTtBQUM1RSxhQUFLLFVBQUwsR0FBa0IsS0FBbEI7QUFDRDtBQUNGLEs7d0JBQ3NCO0FBQ3JCLGFBQU8sS0FBSyxVQUFMLElBQW1CLFNBQTFCO0FBQ0Q7OztzQkFFc0IsQyxFQUFHO0FBQ3hCLFVBQUksZ0NBQUosRUFBMEI7QUFDeEIsYUFBSyxZQUFMLEdBQW9CLENBQXBCO0FBQ0Q7QUFDRixLO3dCQUN3QjtBQUN2QixhQUFPLEtBQUssWUFBTCxJQUFxQix3QkFBVyxDQUFYLEVBQWMsQ0FBZCxDQUE1QjtBQUNEOzs7d0JBQzhCO0FBQzdCLFVBQUksUUFBUSxLQUFLLEtBQWpCO0FBQ0EsVUFBSSxLQUFLLEtBQUssV0FBTCxDQUFpQixLQUFqQixFQUFUO0FBQ0EsVUFBRyxVQUFVLENBQWIsRUFBZ0IsR0FBRyxjQUFILENBQWtCLEtBQWxCO0FBQ2hCLGFBQU8sRUFBUDtBQUNEOzs7c0JBRXNCLEMsRUFBRztBQUN4QixVQUFJLGdDQUFKLEVBQTBCO0FBQ3hCLGFBQUssWUFBTCxHQUFvQixDQUFwQjtBQUNEO0FBQ0YsSzt3QkFDd0I7QUFDdkIsYUFBTyxLQUFLLFlBQUwsSUFBcUIsd0JBQVcsQ0FBWCxFQUFjLENBQWQsQ0FBNUI7QUFDRDs7O3dCQUM4QjtBQUM3QixVQUFJLFFBQVEsS0FBSyxLQUFqQjtBQUNBLFVBQUksS0FBSyxLQUFLLFdBQUwsQ0FBaUIsS0FBakIsRUFBVDtBQUNBLFVBQUcsVUFBVSxDQUFiLEVBQWdCLEdBQUcsY0FBSCxDQUFrQixLQUFsQjtBQUNoQixhQUFPLEVBQVA7QUFDRDs7O3NCQUVxQixJLEVBQU07QUFDMUIsVUFBRyxtQ0FBSCxFQUEyQjtBQUN6QixhQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDRDtBQUNGLEs7d0JBQ3VCO0FBQ3RCLGFBQU8sS0FBSyxXQUFMLElBQW9CLHlCQUEzQjtBQUNEOzs7c0JBRWlCLEksRUFBTTtBQUN0QixVQUFHLG1DQUFILEVBQTJCO0FBQ3pCLGFBQUssT0FBTCxHQUFlLElBQWY7QUFDRDtBQUNGLEs7d0JBQ21CO0FBQ2xCLGFBQU8sS0FBSyxPQUFMLElBQWdCLHlCQUF2QjtBQUNEOzs7c0JBRWdCLEssRUFBTztBQUN0QixVQUFHLE9BQU8sS0FBUCxLQUFpQixRQUFwQixFQUE4QjtBQUM1QixhQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0Q7QUFDRixLO3dCQUNrQjtBQUNqQixhQUFPLEtBQUssTUFBTCxJQUFlLENBQXRCO0FBQ0Q7OztzQkFFcUIsUSxFQUFVO0FBQzlCLFdBQUssU0FBTCxHQUFpQixhQUFhLElBQTlCO0FBQ0QsSzt3QkFDdUI7QUFDdEIsYUFBTyxLQUFLLFNBQUwsSUFBa0IsS0FBekI7QUFDRDs7Ozs7O2tCQUtZLGdCOzs7Ozs7Ozs7QUM3TmYsSUFBSSxVQUFVLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0MsU0FBbEMsRUFBNkMsU0FBN0MsRUFBd0QsU0FBeEQsQ0FBZDtBQUNBLElBQUksZUFBZSxFQUFuQjtRQUdTLE8sR0FBQSxPO1FBQVMsWSxHQUFBLFk7Ozs7O0FDTGxCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsT0FBTyxNQUFQOztBQUVBLElBQUksV0FBVztBQUNiLGFBQVc7QUFERSxDQUFmO0FBR0EsT0FBTyxRQUFQLEdBQWtCLFFBQWxCOztBQUVBLFNBQVMsS0FBVCxDQUFlLEVBQWYsRUFBbUI7QUFDakIsTUFBSSxTQUFTLFVBQVQsSUFBdUIsU0FBM0IsRUFBcUM7QUFDbkM7QUFDRCxHQUZELE1BRU87QUFDTCxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxFQUE5QztBQUNEO0FBQ0Y7O0FBRUQsTUFBTSxZQUFXOztBQUVmLE1BQUksS0FBSyw0QkFBa0IsQ0FBQyxDQUFuQixFQUFzQixDQUFDLENBQXZCLEVBQTBCLGlCQUFRLENBQVIsQ0FBMUIsQ0FBVDtBQUNBLE1BQUksS0FBSyw0QkFBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsaUJBQVEsQ0FBUixDQUF4QixDQUFUO0FBQ0EsV0FBUyxFQUFULEdBQWMsR0FBRyxDQUFqQjtBQUNBLFdBQVMsRUFBVCxHQUFjLEdBQUcsQ0FBakI7O0FBRUE7QUFDQSw2QkFBaUIsSUFBakI7O0FBRUE7QUFDQSw2QkFBaUIsU0FBakIsQ0FBMkIsRUFBM0I7QUFDQSw2QkFBaUIsU0FBakIsQ0FBMkIsRUFBM0I7O0FBRUE7QUFDQSxNQUFJLFNBQVMsU0FBVCxNQUFTLEdBQVc7O0FBRXRCLFFBQUcsU0FBUyxTQUFaLEVBQXVCOztBQUVyQjtBQUNBLFNBQUcsQ0FBSCxDQUFLLEtBQUwsSUFBYyxJQUFkOztBQUVBLDRCQUFzQixNQUF0QjtBQUNEO0FBRUYsR0FWRDs7QUFZQTs7QUFFQTtBQUNBLE1BQUksTUFBTSxJQUFJLElBQUksR0FBUixFQUFWO0FBQ0EsTUFBSSxtQkFBbUIsSUFBSSxHQUFKLENBQVEsUUFBUixFQUFrQixXQUFsQixDQUF2QjtBQUNBLG1CQUFpQixRQUFqQixDQUEwQixVQUFTLEtBQVQsRUFBZ0I7QUFDeEMsUUFBRyxTQUFTLElBQVosRUFBa0I7QUFDaEI7QUFDRDtBQUNGLEdBSkQ7QUFLQSxNQUFJLE1BQU0sSUFBSSxTQUFKLENBQWMsVUFBZCxDQUFWO0FBQ0EsTUFBSSxVQUFVLElBQUksR0FBSixDQUFRLFNBQVMsRUFBakIsRUFBcUIsSUFBckIsRUFBMkIsTUFBM0IsRUFBZDtBQUNBLE1BQUksVUFBVSxJQUFJLEdBQUosQ0FBUSxTQUFTLEVBQWpCLEVBQXFCLElBQXJCLEVBQTJCLE1BQTNCLEVBQWQ7QUFDQSxNQUFJLE1BQU0sSUFBSSxTQUFKLENBQWMsVUFBZCxDQUFWO0FBQ0EsTUFBSSxVQUFVLElBQUksR0FBSixDQUFRLFNBQVMsRUFBakIsRUFBcUIsR0FBckIsRUFBMEIsTUFBMUIsRUFBZDtBQUNBLE1BQUksVUFBVSxJQUFJLEdBQUosQ0FBUSxTQUFTLEVBQWpCLEVBQXFCLEdBQXJCLEVBQTBCLE1BQTFCLEVBQWQ7QUFDQSxNQUFJLElBQUo7QUFDQSxNQUFJLElBQUo7QUFDRCxDQTdDRDs7Ozs7Ozs7Ozs7OztBQ3BCQSxJQUFNLG1CQUFtQixNQUFNLEtBQUssRUFBcEM7O0FBRUEsSUFBSSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBUyxNQUFULEVBQWlCO0FBQ3RDLFNBQU8sU0FBUyxnQkFBaEI7QUFDQSxDQUZEOztBQUlBLElBQUksa0JBQWtCLFNBQWxCLGVBQWtCLENBQVMsT0FBVCxFQUFrQjtBQUN2QyxTQUFPLFVBQVUsZ0JBQWpCO0FBQ0EsQ0FGRDs7QUFJQTs7Ozs7Ozs7Ozs7OztJQVlNLE07O0FBRUw7Ozs7Ozs7QUFPQyxrQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFpQjtBQUFBOztBQUNmLFNBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxTQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7OzBCQU9LLEMsRUFBRyxDLEVBQUc7QUFDVCxXQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsV0FBSyxDQUFMLEdBQVMsQ0FBVDtBQUNGOztBQUVEOzs7Ozs7Ozs7NEJBTVM7QUFDTixhQUFPLElBQUksTUFBSixDQUFXLEtBQUssQ0FBaEIsRUFBbUIsS0FBSyxDQUF4QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O3dCQVFJLE0sRUFBUTtBQUNWLFdBQUssQ0FBTCxJQUFVLE9BQU8sQ0FBakI7QUFDQSxXQUFLLENBQUwsSUFBVSxPQUFPLENBQWpCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozs7MkJBUU8sTSxFQUFRO0FBQ2IsVUFBSSxJQUFJLEtBQUssS0FBTCxFQUFSO0FBQ0EsYUFBTyxFQUFFLEdBQUYsQ0FBTSxNQUFOLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7OEJBUVUsTSxFQUFRO0FBQ2hCLGFBQU8sS0FBSyxHQUFMLENBQVMsSUFBSSxNQUFKLENBQVcsTUFBWCxFQUFtQixNQUFuQixDQUFULENBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7OztpQ0FRYSxNLEVBQVE7QUFDbkIsVUFBSSxJQUFJLEtBQUssS0FBTCxFQUFSO0FBQ0EsYUFBTyxFQUFFLFNBQUYsQ0FBWSxNQUFaLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7NkJBUVMsTSxFQUFRO0FBQ2YsV0FBSyxDQUFMLElBQVUsT0FBTyxDQUFqQjtBQUNBLFdBQUssQ0FBTCxJQUFVLE9BQU8sQ0FBakI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7OztnQ0FRWSxNLEVBQVE7QUFDbEIsVUFBSSxJQUFJLEtBQUssS0FBTCxFQUFSO0FBQ0EsYUFBTyxFQUFFLFFBQUYsQ0FBVyxNQUFYLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7bUNBUWUsTSxFQUFRO0FBQ3JCLGFBQU8sS0FBSyxRQUFMLENBQWMsSUFBSSxNQUFKLENBQVcsTUFBWCxFQUFtQixNQUFuQixDQUFkLENBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7OztzQ0FRa0IsTSxFQUFRO0FBQ3hCLFVBQUksSUFBSSxLQUFLLEtBQUwsRUFBUjtBQUNBLGFBQU8sRUFBRSxjQUFGLENBQWlCLE1BQWpCLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7MkJBUU8sTSxFQUFRO0FBQ2IsVUFBRyxPQUFPLENBQVAsS0FBYSxDQUFoQixFQUFtQjtBQUNqQixhQUFLLENBQUwsSUFBVSxPQUFPLENBQWpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNEO0FBQ0QsVUFBRyxPQUFPLENBQVAsS0FBYSxDQUFoQixFQUFtQjtBQUNqQixhQUFLLENBQUwsSUFBVSxPQUFPLENBQWpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNEO0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozs7OEJBUVUsTSxFQUFRO0FBQ2hCLFVBQUksSUFBSSxLQUFLLEtBQUwsRUFBUjtBQUNBLGFBQU8sRUFBRSxNQUFGLENBQVMsTUFBVCxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O2lDQVFhLE0sRUFBUTtBQUNuQixVQUFJLElBQUksSUFBSSxNQUFKLENBQVcsTUFBWCxFQUFtQixNQUFuQixDQUFSO0FBQ0EsYUFBTyxLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7OztvQ0FRZ0IsTSxFQUFRO0FBQ3RCLFVBQUksSUFBSSxLQUFLLEtBQUwsRUFBUjtBQUNBLGFBQU8sRUFBRSxZQUFGLENBQWUsTUFBZixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7OzZCQVFTLE0sRUFBUTtBQUNmLFdBQUssQ0FBTCxJQUFVLE9BQU8sQ0FBakI7QUFDQSxXQUFLLENBQUwsSUFBVSxPQUFPLENBQWpCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozs7Z0NBUVksTSxFQUFRO0FBQ2xCLFVBQUksSUFBSSxLQUFLLEtBQUwsRUFBUjtBQUNBLGFBQU8sRUFBRSxRQUFGLENBQVcsTUFBWCxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O21DQVFlLE0sRUFBUTtBQUNyQixVQUFJLElBQUksSUFBSSxNQUFKLENBQVcsTUFBWCxFQUFtQixNQUFuQixDQUFSO0FBQ0EsYUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7OztzQ0FRa0IsTSxFQUFRO0FBQ3hCLFVBQUksSUFBSSxLQUFLLEtBQUwsRUFBUjtBQUNBLGFBQU8sRUFBRSxjQUFGLENBQWlCLE1BQWpCLENBQVA7QUFDRDs7QUFFRDs7Ozs7OzBCQUdNLE0sRUFBUTtBQUNaLGFBQU8sS0FBSyxjQUFMLENBQW9CLE1BQXBCLENBQVA7QUFDRDtBQUNEOzs7Ozs7NkJBR1MsTSxFQUFRO0FBQ2YsYUFBTyxLQUFLLGlCQUFMLENBQXVCLE1BQXZCLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7MkJBUU8sTSxFQUFRO0FBQ2QsVUFBSSxJQUFLLEtBQUssQ0FBTCxHQUFTLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBVixHQUErQixLQUFLLENBQUwsR0FBUyxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWhEO0FBQ0EsVUFBSSxJQUFLLEtBQUssQ0FBTCxHQUFTLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBVixHQUErQixLQUFLLENBQUwsR0FBUyxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWhEOztBQUVELFdBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxXQUFLLENBQUwsR0FBUyxDQUFUOztBQUVDLGFBQU8sSUFBUDtBQUNBO0FBQ0Q7Ozs7Ozs7Ozs7OzhCQVFVLE0sRUFBUTtBQUNoQixVQUFJLElBQUksS0FBSyxLQUFMLEVBQVI7QUFDQSxhQUFPLEVBQUUsTUFBRixDQUFTLE1BQVQsQ0FBUDtBQUNEOztBQUVGOzs7Ozs7Ozs7Ozs7OEJBU1csTyxFQUFTO0FBQ2pCLGFBQU8sS0FBSyxNQUFMLENBQVksZ0JBQWdCLE9BQWhCLENBQVosQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7O2lDQVFhLE8sRUFBUztBQUNwQixhQUFPLEtBQUssU0FBTCxDQUFlLGdCQUFnQixPQUFoQixDQUFmLENBQVA7QUFDRDs7QUFFRDs7Ozs7OzZCQUdTLE0sRUFBUTtBQUNqQixhQUFPLEtBQUssTUFBTCxDQUFZLE1BQVosQ0FBUDtBQUNDO0FBQ0Q7Ozs7OztnQ0FHWSxNLEVBQVE7QUFDbEIsYUFBTyxLQUFLLFNBQUwsQ0FBZSxNQUFmLENBQVA7QUFDRDs7QUFFRDs7Ozs7O2dDQUdZLE8sRUFBUztBQUNyQixhQUFPLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBUDtBQUNDO0FBQ0Q7Ozs7OzttQ0FHZSxNLEVBQVE7QUFDckIsYUFBTyxLQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs2QkFRUSxNLEVBQVE7QUFDaEIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxTQUFPLEtBQUssS0FBeEIsQ0FBUDtBQUNBOzs7O0FBQ0E7Ozs7Ozs7O2dDQVFXLE0sRUFBUTtBQUNqQixVQUFJLElBQUksS0FBSyxLQUFMLEVBQVI7QUFDQSxhQUFPLEVBQUUsUUFBRixDQUFXLE1BQVgsQ0FBUDtBQUNGOzs7OztBQUVEOzs7Ozs7Ozs7Z0NBU2EsTyxFQUFTO0FBQ25CLGFBQU8sS0FBSyxRQUFMLENBQWMsZ0JBQWdCLE9BQWhCLENBQWQsQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7O21DQVFlLE8sRUFBUztBQUN0QixhQUFPLEtBQUssV0FBTCxDQUFpQixnQkFBZ0IsT0FBaEIsQ0FBakIsQ0FBUDtBQUNEOztBQUVGOzs7Ozs7Ozs7O2dDQU9ZO0FBQ1gsYUFBTyxLQUFLLFlBQUwsQ0FBa0IsS0FBSyxNQUF2QixDQUFQO0FBQ0E7QUFDRDs7Ozs7Ozs7OzttQ0FPZTtBQUNkLGFBQU8sS0FBSyxlQUFMLENBQXFCLEtBQUssTUFBMUIsQ0FBUDtBQUNBOztBQUVEOzs7Ozs7Ozs7NkJBTVMsTSxFQUFRO0FBQ2hCLGFBQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCLEVBQXlCLE1BQWhDO0FBQ0E7O0FBRUQ7Ozs7Ozs7Ozs4QkFNVSxNLEVBQVE7QUFDakIsYUFBTyxLQUFLLENBQUwsR0FBUyxPQUFPLENBQXZCO0FBQ0E7O0FBRUQ7Ozs7Ozs7Ozs4QkFNVSxNLEVBQVE7QUFDakIsYUFBTyxLQUFLLENBQUwsR0FBUyxPQUFPLENBQXZCO0FBQ0E7O0FBR0Q7Ozs7Ozs7Ozs7Ozs7Ozt3QkFZSSxNLEVBQVE7QUFDWCxhQUFRLEtBQUssQ0FBTCxHQUFTLE9BQU8sQ0FBakIsR0FBdUIsS0FBSyxDQUFMLEdBQVMsT0FBTyxDQUE5QztBQUNBOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7OzBCQWFNLE0sRUFBUTtBQUNiLGFBQVEsS0FBSyxDQUFMLEdBQVMsT0FBTyxDQUFqQixHQUF1QixLQUFLLENBQUwsR0FBUyxPQUFPLENBQTlDO0FBQ0E7O0FBR0E7Ozs7QUFJQTs7Ozs7Ozs7O3NCQU1NLEMsRUFBRztBQUNQLFVBQUcsT0FBTyxDQUFQLElBQVksUUFBZixFQUF5QjtBQUN2QixhQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTSxJQUFJLFNBQUosQ0FBYyxzQkFBZCxDQUFOO0FBQ0Q7QUFDRixLO3dCQUNPO0FBQ04sYUFBTyxLQUFLLEVBQUwsSUFBVyxDQUFsQjtBQUNEOztBQUVGOzs7Ozs7Ozs7c0JBTU8sQyxFQUFHO0FBQ1AsVUFBRyxPQUFPLENBQVAsSUFBWSxRQUFmLEVBQXlCO0FBQ3ZCLGFBQUssRUFBTCxHQUFVLENBQVY7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNLElBQUksU0FBSixDQUFjLHNCQUFkLENBQU47QUFDRDtBQUNGLEs7d0JBQ087QUFDTixhQUFPLEtBQUssRUFBTCxJQUFXLENBQWxCO0FBQ0Q7O0FBRUY7Ozs7Ozs7Ozs7c0JBT21CLE0sRUFBUTtBQUN4QixVQUFJLE1BQUo7QUFDQSxVQUFHLE9BQU8sTUFBUCxJQUFpQixRQUFwQixFQUE4QjtBQUM1QixpQkFBUyxTQUFTLEtBQUssYUFBdkI7QUFDQSxhQUFLLGNBQUwsQ0FBb0IsTUFBcEI7QUFDRCxPQUhELE1BR087QUFDTCxjQUFNLElBQUksU0FBSixDQUFjLDJCQUFkLENBQU47QUFDRDtBQUNGLEs7d0JBQ21CO0FBQ2xCLGFBQVEsS0FBSyxDQUFMLEdBQVMsS0FBSyxDQUFmLEdBQXFCLEtBQUssQ0FBTCxHQUFTLEtBQUssQ0FBMUM7QUFDRDs7QUFFRjs7Ozs7Ozs7O3NCQU1ZLE0sRUFBUTtBQUNqQixVQUFJLE1BQUo7QUFDQSxVQUFHLE9BQU8sTUFBUCxJQUFpQixRQUFwQixFQUE4QjtBQUM1QixpQkFBUyxTQUFTLEtBQUssTUFBdkI7QUFDQSxhQUFLLGNBQUwsQ0FBb0IsTUFBcEI7QUFDRCxPQUhELE1BR087QUFDTCxjQUFNLElBQUksU0FBSixDQUFjLDJCQUFkLENBQU47QUFDRDtBQUNGLEs7d0JBQ1k7QUFDWCxhQUFPLEtBQUssSUFBTCxDQUFVLEtBQUssYUFBZixDQUFQO0FBQ0Q7O0FBRUY7Ozs7Ozs7OztzQkFNVyxNLEVBQVE7QUFDaEIsVUFBRyxPQUFPLE1BQVAsSUFBaUIsUUFBcEIsRUFBOEI7QUFDNUIsYUFBSyxRQUFMLENBQWMsTUFBZDtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU0sSUFBSSxTQUFKLENBQWMsMEJBQWQsQ0FBTjtBQUNEO0FBQ0YsSzt3QkFDVztBQUNWLGFBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxDQUFoQixFQUFtQixLQUFLLENBQXhCLENBQVA7QUFDRDs7QUFFRjs7Ozs7Ozs7O3NCQU1vQixPLEVBQVM7QUFDMUIsVUFBRyxPQUFPLE9BQVAsSUFBa0IsUUFBckIsRUFBK0I7QUFDN0IsYUFBSyxXQUFMLENBQWlCLE9BQWpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTSxJQUFJLFNBQUosQ0FBYywwQkFBZCxDQUFOO0FBQ0Q7QUFDRixLO3dCQUNvQjtBQUNuQixhQUFPLGdCQUFnQixLQUFLLEtBQUwsQ0FBVyxLQUFLLENBQWhCLEVBQW1CLEtBQUssQ0FBeEIsQ0FBaEIsQ0FBUDtBQUNEOztBQUVGOzs7Ozs7Ozs7c0JBTVUsQyxFQUFHO0FBQ1osV0FBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLEs7d0JBQ1c7QUFDWCxhQUFPLEtBQUssQ0FBWjtBQUNBOztBQUVEOzs7Ozs7Ozs7c0JBTVcsQyxFQUFHO0FBQ2IsV0FBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLEs7d0JBQ1k7QUFDWixhQUFPLEtBQUssQ0FBWjtBQUNBOzs7Ozs7a0JBSWEsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuLi8uLi9zcmMvd3RjLXZlY3RvclwiO1xuXG5jbGFzcyBEcmF3aW5nVmVjdG9yIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgY29sb3IsIGxpbmVXaWR0aCA9IDEpIHtcbiAgICB0aGlzLnYgPSBuZXcgVmVjdG9yKHgsIHkpO1xuXG4gICAgdGhpcy5hcnJvd2hlYWRWMSA9IG5ldyBWZWN0b3IoLTEwLC0xMCk7XG4gICAgdGhpcy5hcnJvd2hlYWRWMiA9IG5ldyBWZWN0b3IoLTEwLCAxMCk7XG5cbiAgICBpZiggdHlwZW9mIGNvbG9yICE9PSAnc3RyaW5nJyB8fCAhKC9eI1swLTlBQkNERUZhYmNkZWZdKi8udGVzdChjb2xvcikpICkge1xuICAgICAgY29sb3IgPSAnIycgKyAoJzAnKyhNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMjU1KSkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpICsgKCcwJysoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjI1NSkpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKSArICgnMCcrKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSoyNTUpKS50b1N0cmluZygxNikpLnN1YnN0cigtMik7XG4gICAgfVxuXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICB9XG5cbiAgZHJhdyhwbGF5Z3JvdW5kKSB7XG4gICAgbGV0IHVuaXRYID0gcGxheWdyb3VuZC5zY2FsZWRVbml0VmVjdG9yWDsgLy8gaUhhdFxuICAgIGxldCB1bml0WSA9IHBsYXlncm91bmQuc2NhbGVkVW5pdFZlY3Rvclk7IC8vIGpIYXRcbiAgICBsZXQgdW5pdFZlY3RvciA9IHVuaXRYLmFkZE5ldyh1bml0WSk7XG4gICAgbGV0IHNjYWxlID0gcGxheWdyb3VuZC5zY2FsZTtcbiAgICAvLyBjb25zb2xlLmNsZWFyKCk7XG4gICAgLy8gY29uc29sZS5sb2codW5pdFZlY3RvciwgdW5pdFgsIHVuaXRZKTtcbiAgICBsZXQgb2Zmc2V0ID0gcGxheWdyb3VuZC5vZmZzZXQuYWRkTmV3KHRoaXMub2Zmc2V0Lm11bHRpcGx5TmV3KHVuaXRWZWN0b3IpKTsgLy8gY3JlYXRpbmcgdGhlIG9mZnNldFxuICAgIGxldCB4ID0gb2Zmc2V0Lng7XG4gICAgbGV0IHkgPSBvZmZzZXQueTtcbiAgICBsZXQgY3R4ID0gcGxheWdyb3VuZC5tYWluQ3R4O1xuXG4gICAgaWYodGhpcy5vdXRwdXRWZWN0b3IgaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgIGxldCB1bml0WCA9IHBsYXlncm91bmQudW5pdFZlY3Rvclg7IC8vIGlIYXRcbiAgICAgIGxldCB1bml0WSA9IHBsYXlncm91bmQudW5pdFZlY3Rvclk7IC8vIGpIYXRcblxuICAgICAgdGhpcy5vdXRwdXRWZWN0b3IueCA9ICh0aGlzLnYueCAqIHVuaXRYLngpICsgKHRoaXMudi55ICogdW5pdFkueCk7XG4gICAgICB0aGlzLm91dHB1dFZlY3Rvci55ID0gKHRoaXMudi54ICogdW5pdFgueSkgKyAodGhpcy52LnkgKiB1bml0WS55KTtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2xhdGUgdGhlIHZlY3RvciB1c2luZyBsaW5lYXIgdHJhbnNmb3JtYXRpb24geCjDrikgKyB5KGopXG4gICAgLy8gw64gPSB1bml4IFhcbiAgICAvLyBqID0gdW5pdCBZXG4gICAgLy8gIF8gICAgICAgXyAgICBfICAgICAgIF9cbiAgICAvLyB8IHgow64ueCkgfCArIHwgeShqLngpIHxcbiAgICAvLyB8IHgoaS55KSB8ICsgfCB5KGoueSkgfFxuICAgIC8vXG4gICAgbGV0IHRyYW5zbGF0ZWRWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgIHRyYW5zbGF0ZWRWZWN0b3IueCA9ICh0aGlzLnYueCAqIHVuaXRYLngpICsgKHRoaXMudi55ICogdW5pdFkueCk7XG4gICAgdHJhbnNsYXRlZFZlY3Rvci55ID0gKHRoaXMudi54ICogdW5pdFgueSkgKyAodGhpcy52LnkgKiB1bml0WS55KTtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubGluZVdpZHRoID0gdGhpcy5saW5lV2lkdGg7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIHggPSB0cmFuc2xhdGVkVmVjdG9yLnggKyBvZmZzZXQueDtcbiAgICB5ID0gdHJhbnNsYXRlZFZlY3Rvci55ICsgb2Zmc2V0Lnk7XG4gICAgY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgIHRoaXMudHJhbnNsYXRlZFZlY3RvciA9IHRyYW5zbGF0ZWRWZWN0b3I7XG5cbiAgICAvLyBDcmVhdGUgdGhlIGFycm93IGhlYWQgdmVjdG9ycy4gVGhlc2UgYXJlIG5vdCBkZXBlbmRlbnQgdXBvbiB0aGUgdW5pdCB2ZWN0b3JcbiAgICB2YXIgYXYxID0gdGhpcy5hcnJvd2hlYWRWMS5yb3RhdGVOZXcodHJhbnNsYXRlZFZlY3Rvci5hbmdsZSk7XG4gICAgdmFyIGF2MiA9IHRoaXMuYXJyb3doZWFkVjIucm90YXRlTmV3KHRyYW5zbGF0ZWRWZWN0b3IuYW5nbGUpO1xuXG4gICAgLy8gRHJhdyB0aGUgYXJyb3doZWFkXG4gICAgY3R4LmxpbmVUbyhhdjEueCArIHgsIGF2MS55ICsgeSk7XG4gICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICBjdHgubGluZVRvKGF2Mi54ICsgeCwgYXYyLnkgKyB5KTtcblxuICAgIGN0eC5zdHJva2UoKTtcblxuICB9XG5cbiAgZ2V0IHBsYXlncm91bmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BnO1xuICB9XG4gIHNldCBwbGF5Z3JvdW5kKHBnKSB7XG4gICAgdGhpcy5fcGcgPSBwZztcbiAgfVxuXG4gIHNldCBjb2xvcihjb2xvcikge1xuICAgIGlmKCB0eXBlb2YgY29sb3IgPT0gJ3N0cmluZycgJiYgL14jWzAtOUFCQ0RFRmFiY2RlZl0qLy50ZXN0KGNvbG9yKSApIHtcbiAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG4gICAgfVxuICB9XG4gIGdldCBjb2xvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3IgfHwgJyNGRkZGRkYnO1xuICB9XG5cbiAgc2V0IG9mZnNldCh2KSB7XG4gICAgaWYoIHYgaW5zdGFuY2VvZiBWZWN0b3IgKSB7XG4gICAgICB0aGlzLl9vZmZzZXQgPSB2O1xuICAgIH1cbiAgfVxuICBnZXQgb2Zmc2V0KCkge1xuICAgIGlmKCAhKHRoaXMuX29mZnNldCBpbnN0YW5jZW9mIFZlY3RvcikgKSB7XG4gICAgICB0aGlzLl9vZmZzZXQgPSBuZXcgVmVjdG9yKDAsMCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd2luZ1ZlY3RvcjtcbiIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4uLy4uL3NyYy93dGMtdmVjdG9yXCI7XG5pbXBvcnQgRHJhd2luZ1ZlY3RvciBmcm9tIFwiLi9EcmF3aW5nVmVjdG9yXCI7XG5pbXBvcnQgY29sb3VycyBmcm9tICcuL2NvbG91cnMnO1xuXG5jbGFzcyBWZWN0b3JQbGF5Z3JvdW5kIHtcbiAgc3RhdGljIGluaXQoZHJhd2luZyA9IHRydWUsIHNjYWxlID0gMTAwLCBkcmF3R3JpZCA9IHRydWUpIHtcbiAgICB0aGlzLmluaXRpYWxpc2VkID0gdHJ1ZTtcblxuICAgIHRoaXMubWFpbkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMubWFpbkN0eCA9IHRoaXMubWFpbkNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuc2Vjb25kYXJ5Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5zZWNvbmRhckN0eCA9IHRoaXMuc2Vjb25kYXJ5Q2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWFpbkNhbnZhcyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnNlY29uZGFyeUNhbnZhcyk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyKCk7XG5cbiAgICB0aGlzLnZlY3RvcnMgPSBbXTtcblxuICAgIHRoaXMuZ3JpZERpc3RhbmNlID0gMTtcblxuICAgIHRoaXMuZG9EcmF3R3JpZCA9IGRyYXdHcmlkO1xuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLmRyYXdpbmcgPSBkcmF3aW5nO1xuICB9XG5cbiAgc3RhdGljIHJlc2l6ZUxpc3RlbmVyKGUpIHtcbiAgICB0aGlzLmRpbWVuc2lvbnMgPSBuZXcgVmVjdG9yKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5kaW1lbnNpb25zLmRpdmlkZVNjYWxhck5ldygyKTtcblxuICAgIHRoaXMubWFpbkNhbnZhcy53aWR0aCA9IHRoaXMuc2Vjb25kYXJ5Q2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5tYWluQ2FudmFzLmhlaWdodCA9IHRoaXMuc2Vjb25kYXJ5Q2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgfVxuXG4gIHN0YXRpYyBhZGRWZWN0b3IoZHJhd2luZ1ZlY3Rvcikge1xuICAgIGlmKCAhIChkcmF3aW5nVmVjdG9yIGluc3RhbmNlb2YgRHJhd2luZ1ZlY3RvcikgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52ZWN0b3JzLnB1c2goZHJhd2luZ1ZlY3Rvcik7XG5cbiAgICByZXR1cm4gZHJhd2luZ1ZlY3RvcjtcbiAgfVxuXG4gIHN0YXRpYyBkcmF3KCkge1xuICAgIC8vIENsZWFyIHRoZSBjYW52YXNlcyBiZWZvcmUgZHJhd2luZ1xuICAgIHRoaXMubWFpbkN0eC5maWxsU3R5bGUgPSB0aGlzLmJnQ29sb3I7XG4gICAgdGhpcy5tYWluQ3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMubWFpbkN0eC5yZWN0KDAsMCwgdGhpcy5kaW1lbnNpb25zLndpZHRoLCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KTtcbiAgICB0aGlzLm1haW5DdHguZmlsbCgpO1xuICAgIC8vIHRoaXMuc2Vjb25kYXJDdHguY2xlYXJSZWN0KDAsMCx0aGlzLm1haW5DYW52YXMud2lkdGgsIHRoaXMubWFpbkNhbnZhcy5oZWlnaHQpO1xuXG4gICAgaWYodGhpcy5kb0RyYXdHcmlkKSB0aGlzLmRyYXdHcmlkKCk7XG4gICAgdGhpcy5kcmF3VmVjdG9ycygpO1xuXG4gICAgaWYoIHRoaXMuZHJhd2luZyApIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5kcmF3LmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkcmF3VmVjdG9ycygpIHtcbiAgICB0aGlzLnZlY3RvcnMuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICB2LmRyYXcodGhpcyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHN0YXRpYyBkcmF3R3JpZCgpIHtcbiAgICBsZXQgc2NhbGUgPSB0aGlzLnNjYWxlO1xuICAgIGxldCBncmlkRGlzdGFuY2UgPSB0aGlzLmdyaWREaXN0YW5jZSAqIHNjYWxlO1xuXG4gICAgLy8gZHJhdyB0aGUgbWFpbiBncmlkIGxpbmVzXG5cbiAgICB0aGlzLm1haW5DdHgubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLm1haW5DdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmdyaWRDb2xvcjtcbiAgICB0aGlzLm1haW5DdHguYmVnaW5QYXRoKCk7XG5cbiAgICBsZXQgeFBvcyA9IHRoaXMub2Zmc2V0Lng7XG4gICAgd2hpbGUoeFBvcyA8IHRoaXMuZGltZW5zaW9ucy53aWR0aCkge1xuICAgICAgeFBvcyArPSBncmlkRGlzdGFuY2U7XG4gICAgICB0aGlzLm1haW5DdHgubW92ZVRvKHhQb3MsIDApO1xuICAgICAgdGhpcy5tYWluQ3R4LmxpbmVUbyh4UG9zLCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KTtcbiAgICB9XG4gICAgeFBvcyA9IHRoaXMub2Zmc2V0Lng7XG4gICAgd2hpbGUoeFBvcyA+IDApIHtcbiAgICAgIHhQb3MgLT0gZ3JpZERpc3RhbmNlO1xuICAgICAgdGhpcy5tYWluQ3R4Lm1vdmVUbyh4UG9zLCAwKTtcbiAgICAgIHRoaXMubWFpbkN0eC5saW5lVG8oeFBvcywgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XG4gICAgfVxuICAgIGxldCB5UG9zID0gdGhpcy5vZmZzZXQueTtcbiAgICB3aGlsZSh5UG9zIDwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCkge1xuICAgICAgeVBvcyArPSBncmlkRGlzdGFuY2U7XG4gICAgICB0aGlzLm1haW5DdHgubW92ZVRvKDAsIHlQb3MpO1xuICAgICAgdGhpcy5tYWluQ3R4LmxpbmVUbyh0aGlzLmRpbWVuc2lvbnMud2lkdGgsIHlQb3MpO1xuICAgIH1cbiAgICB5UG9zID0gdGhpcy5vZmZzZXQueTtcbiAgICB3aGlsZSh5UG9zID4gMCkge1xuICAgICAgeVBvcyAtPSBncmlkRGlzdGFuY2U7XG4gICAgICB0aGlzLm1haW5DdHgubW92ZVRvKDAsIHlQb3MpO1xuICAgICAgdGhpcy5tYWluQ3R4LmxpbmVUbyh0aGlzLmRpbWVuc2lvbnMud2lkdGgsIHlQb3MpO1xuICAgIH1cbiAgICB0aGlzLm1haW5DdHguc3Ryb2tlKCk7XG5cblxuICAgIHRoaXMubWFpbkN0eC5zdHJva2VTdHlsZSA9IHRoaXMub3JpZ2luQ29sb3I7XG4gICAgdGhpcy5tYWluQ3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgdGhpcy5tYWluQ3R4Lm1vdmVUbygwLCB0aGlzLm9mZnNldC55KTtcbiAgICB0aGlzLm1haW5DdHgubGluZVRvKHRoaXMuZGltZW5zaW9ucy53aWR0aCwgdGhpcy5vZmZzZXQueSk7XG4gICAgdGhpcy5tYWluQ3R4Lm1vdmVUbyh0aGlzLm9mZnNldC54LCAwKTtcbiAgICB0aGlzLm1haW5DdHgubGluZVRvKHRoaXMub2Zmc2V0LngsIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpO1xuXG4gICAgdGhpcy5tYWluQ3R4LnN0cm9rZSgpO1xuXG4gIH1cblxuICBzdGF0aWMgc2V0IGRyYXdpbmcoZCkge1xuICAgIHRoaXMuX2RyYXdpbmcgPSBkID09PSB0cnVlO1xuXG4gICAgaWYodGhpcy5fZHJhd2luZyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgZHJhd2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJhd2luZyA9PT0gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgYmdDb2xvcihjb2xvcikge1xuICAgIGlmKCB0eXBlb2YgY29sb3IgPT0gJ3N0cmluZycgJiYgIC8jWzAtOUFCQ0RFRl17Nn0vLnRlc3QoY29sb3IudG9VcHBlckNhc2UoKSkpIHtcbiAgICAgIHRoaXMuX2JnQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBiZ0NvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9iZ0NvbG9yIHx8ICcjMjgyQzM0JztcbiAgfVxuXG4gIHN0YXRpYyBzZXQgb3JpZ2luQ29sb3IoY29sb3IpIHtcbiAgICBpZiggdHlwZW9mIGNvbG9yID09ICdzdHJpbmcnICYmICAvI1swLTlBQkNERUZdezZ9Ly50ZXN0KGNvbG9yLnRvVXBwZXJDYXNlKCkpKSB7XG4gICAgICB0aGlzLl9vcmlnaW5Db2xvciA9IGNvbG9yO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IG9yaWdpbkNvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW5Db2xvciB8fCAnI0ZGRkZGRic7XG4gIH1cblxuICBzdGF0aWMgc2V0IGdyaWRDb2xvcihjb2xvcikge1xuICAgIGlmKCB0eXBlb2YgY29sb3IgPT0gJ3N0cmluZycgJiYgIC8jWzAtOUFCQ0RFRl17Nn0vLnRlc3QoY29sb3IudG9VcHBlckNhc2UoKSkpIHtcbiAgICAgIHRoaXMuX2dyaWRDb2xvciA9IGNvbG9yO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IGdyaWRDb2xvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JpZENvbG9yIHx8ICcjNjY2NjY2JztcbiAgfVxuXG4gIHN0YXRpYyBzZXQgdW5pdFZlY3Rvclgodikge1xuICAgIGlmKCB2IGluc3RhbmNlb2YgVmVjdG9yICkge1xuICAgICAgdGhpcy5fdW5pdFZlY3RvclggPSB2XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgdW5pdFZlY3RvclgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VuaXRWZWN0b3JYIHx8IG5ldyBWZWN0b3IoMSwgMCk7XG4gIH1cbiAgc3RhdGljIGdldCBzY2FsZWRVbml0VmVjdG9yWCgpIHtcbiAgICBsZXQgc2NhbGUgPSB0aGlzLnNjYWxlO1xuICAgIGxldCB1diA9IHRoaXMudW5pdFZlY3RvclguY2xvbmUoKTtcbiAgICBpZihzY2FsZSAhPT0gMSkgdXYubXVsdGlwbHlTY2FsYXIoc2NhbGUpO1xuICAgIHJldHVybiB1djtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgdW5pdFZlY3Rvclkodikge1xuICAgIGlmKCB2IGluc3RhbmNlb2YgVmVjdG9yICkge1xuICAgICAgdGhpcy5fdW5pdFZlY3RvclkgPSB2XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgdW5pdFZlY3RvclkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VuaXRWZWN0b3JZIHx8IG5ldyBWZWN0b3IoMCwgMSk7XG4gIH1cbiAgc3RhdGljIGdldCBzY2FsZWRVbml0VmVjdG9yWSgpIHtcbiAgICBsZXQgc2NhbGUgPSB0aGlzLnNjYWxlO1xuICAgIGxldCB1diA9IHRoaXMudW5pdFZlY3RvclkuY2xvbmUoKTtcbiAgICBpZihzY2FsZSAhPT0gMSkgdXYubXVsdGlwbHlTY2FsYXIoc2NhbGUpO1xuICAgIHJldHVybiB1djtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgZGltZW5zaW9ucyhkaW1zKSB7XG4gICAgaWYoZGltcyBpbnN0YW5jZW9mIFZlY3Rvcikge1xuICAgICAgdGhpcy5fZGltZW5zaW9ucyA9IGRpbXM7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgZGltZW5zaW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyB8fCBuZXcgVmVjdG9yKCk7XG4gIH1cblxuICBzdGF0aWMgc2V0IG9mZnNldChkaW1zKSB7XG4gICAgaWYoZGltcyBpbnN0YW5jZW9mIFZlY3Rvcikge1xuICAgICAgdGhpcy5fb2Zmc2V0ID0gZGltcztcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBvZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29mZnNldCB8fCBuZXcgVmVjdG9yKCk7XG4gIH1cblxuICBzdGF0aWMgc2V0IHNjYWxlKHNjYWxlKSB7XG4gICAgaWYodHlwZW9mIHNjYWxlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBzY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGUgfHwgMTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgZG9EcmF3R3JpZChkcmF3R3JpZCkge1xuICAgIHRoaXMuX2RyYXdHcmlkID0gZHJhd0dyaWQgPT09IHRydWU7XG4gIH1cbiAgc3RhdGljIGdldCBkb0RyYXdHcmlkKCkge1xuICAgIHJldHVybiB0aGlzLl9kcmF3R3JpZCB8fCBmYWxzZTtcbiAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yUGxheWdyb3VuZDtcbiIsIlxubGV0IGNvbG91cnMgPSBbJyNjNjc4ZGQnLCAnIzk4YzM3OScsICcjYzM0NDQ4JywgJyM0ZTljOWUnLCAnI2QxODU0OScsICcjYWJiMmJmJ107XG5sZXQgbmFtZWRDb2xvdXJzID0ge1xuICBcbn07XG5leHBvcnQgeyBjb2xvdXJzLCBuYW1lZENvbG91cnMgfVxuIiwiaW1wb3J0IFZlY3RvciBmcm9tIFwiLi4vc3JjL3d0Yy12ZWN0b3JcIjtcbmltcG9ydCBEcmF3aW5nVmVjdG9yIGZyb20gXCIuL2FwcC9EcmF3aW5nVmVjdG9yXCI7XG5pbXBvcnQgVmVjdG9yUGxheWdyb3VuZCBmcm9tIFwiLi9hcHAvVmVjdG9yUGxheWdyb3VuZFwiO1xuaW1wb3J0IHtjb2xvdXJzfSBmcm9tICcuL2FwcC9jb2xvdXJzJztcblxud2luZG93LlZlY3RvciA9IFZlY3RvcjtcblxubGV0IHNldHRpbmdzID0ge1xuICBhbmltYXRpbmc6IGZhbHNlXG59XG53aW5kb3cuc2V0dGluZ3MgPSBzZXR0aW5ncztcblxuZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gJ2xvYWRpbmcnKXtcbiAgICBmbigpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbik7XG4gIH1cbn1cblxucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgbGV0IHZhID0gbmV3IERyYXdpbmdWZWN0b3IoLTIsIC0yLCBjb2xvdXJzWzBdKTtcbiAgbGV0IHZiID0gbmV3IERyYXdpbmdWZWN0b3IoMSwgMSwgY29sb3Vyc1sxXSk7XG4gIHNldHRpbmdzLnZhID0gdmEudjtcbiAgc2V0dGluZ3MudmIgPSB2Yi52O1xuXG4gIC8vIEluaXRpYWxsaXNpbmcgdGhlIHdvcmxkXG4gIFZlY3RvclBsYXlncm91bmQuaW5pdCgpO1xuXG4gIC8vIEFkZCB0aGUgdmVjdG9ycyB0byBzdGFnZVxuICBWZWN0b3JQbGF5Z3JvdW5kLmFkZFZlY3Rvcih2YSk7XG4gIFZlY3RvclBsYXlncm91bmQuYWRkVmVjdG9yKHZiKTtcblxuICAvLyBBbmltYXRpb25cbiAgbGV0IHVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYoc2V0dGluZ3MuYW5pbWF0aW5nKSB7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgYW5nbGUgb2YgdGhlIHZlY3RvclxuICAgICAgdmEudi5hbmdsZSArPSAwLjAxO1xuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZSgpO1xuXG4gIC8vIFNldCB1cCB0aGUgZGF0IGd1aVxuICB2YXIgZ3VpID0gbmV3IGRhdC5HVUkoKTtcbiAgdmFyIGFuaW1hdGlvbkNvbnRyb2wgPSBndWkuYWRkKHNldHRpbmdzLCAnYW5pbWF0aW5nJyk7XG4gIGFuaW1hdGlvbkNvbnRyb2wub25DaGFuZ2UoZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZih2YWx1ZSA9PSB0cnVlKSB7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG4gIH0pO1xuICBsZXQgX3ZhID0gZ3VpLmFkZEZvbGRlcignVmVjdG9yIEEnKTtcbiAgbGV0IHVuaXRYX3ggPSBfdmEuYWRkKHNldHRpbmdzLnZhLCAnX3gnKS5saXN0ZW4oKTtcbiAgbGV0IHVuaXRYX3kgPSBfdmEuYWRkKHNldHRpbmdzLnZhLCAnX3knKS5saXN0ZW4oKTtcbiAgbGV0IF92YiA9IGd1aS5hZGRGb2xkZXIoJ1ZlY3RvciBCJyk7XG4gIGxldCB1bml0WV94ID0gX3ZiLmFkZChzZXR0aW5ncy52YiwgJ3gnKS5saXN0ZW4oKTtcbiAgbGV0IHVuaXRZX3kgPSBfdmIuYWRkKHNldHRpbmdzLnZiLCAneScpLmxpc3RlbigpO1xuICBfdmEub3BlbigpO1xuICBfdmIub3BlbigpO1xufSk7XG4iLCJjb25zdCBjb252ZXJzaW9uRmFjdG9yID0gMTgwIC8gTWF0aC5QSTtcblxudmFyIHJhZGlhblRvRGVncmVlcyA9IGZ1bmN0aW9uKHJhZGlhbikge1xuXHRyZXR1cm4gcmFkaWFuICogY29udmVyc2lvbkZhY3Rvcjtcbn1cblxudmFyIGRlZ3JlZXNUb1JhZGlhbiA9IGZ1bmN0aW9uKGRlZ3JlZXMpIHtcblx0cmV0dXJuIGRlZ3JlZXMgLyBjb252ZXJzaW9uRmFjdG9yO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgMkQgVmVjdG9yIGNsYXNzIHRoYXQgcHJvdmlkZXMgc2ltcGxlIGFsZ2VicmFpYyBmdW5jdGlvbmFsaXR5IGluIHRoZSBmb3JtXG4gKiBvZiAyRCBWZWN0b3JzLlxuICpcbiAqIFdlIHVzZSBHZXR0ZXJzL3NldHRlcnMgZm9yIGJvdGggcHJpbmNpcGxlIHByb3BlcnRpZXMgKHggJiB5KSBhcyB3ZWxsIGFzIHZpcnR1YWxcbiAqIHByb3BlcnRpZXMgKHJvdGF0aW9uLCBsZW5ndGggZXRjLikuXG4gKlxuICogQGNsYXNzIFZlY3RvclxuICogQGF1dGhvciBMaWFtIEVnYW4gPGxpYW1Ad2V0aGVjb2xsZWN0aXZlLmNvbT5cbiAqIEB2ZXJzaW9uIDAuMS4xXG4gKiBAY3JlYXRlZCBEZWMgMTksIDIwMTZcbiAqL1xuY2xhc3MgVmVjdG9yIHtcblxuXHQvKipcblx0ICogVGhlIFZlY3RvciBDbGFzcyBjb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggXHRcdFx0XHRUaGUgeCBjb29yZFxuXHQgKiBAcGFyYW0ge251bWJlcn0geSBcdFx0XHRcdFRoZSB5IGNvb3JkXG5cdCAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5KXtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSB2ZWN0b3IgY29vcmRpbmF0ZXNcbiAgICpcbiAgICogQHB1YmxpY1xuXHQgKiBAcGFyYW0ge251bWJlcn0geCBcdFx0XHRcdFRoZSB4IGNvb3JkXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB5IFx0XHRcdFx0VGhlIHkgY29vcmRcbiAgICovXG5cdHJlc2V0KHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSB2ZWN0b3Jcblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFRoZSBjbG9uZWQgdmVjdG9yXG5cdCAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBvbmUgdmVjdG9yIHRvIGFub3RoZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBhZGQgdG8gdGhpcyBvbmVcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGFkZCh2ZWN0b3IpIHtcbiAgICB0aGlzLnggKz0gdmVjdG9yLng7XG4gICAgdGhpcy55ICs9IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgYWRkcyB0aGUgdmVjdG9yIHRvIGl0IGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIGFkZCB0byB0aGlzIG9uZVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGFkZE5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5hZGQodmVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgc2NhbGFyIHRvIHRoZSB2ZWN0b3IsIG1vZGlmeWluZyBib3RoIHRoZSB4IGFuZCB5XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGQgdG8gdGhlIHZlY3RvclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgYWRkU2NhbGFyKHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLmFkZChuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKSk7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBhZGRzIHRoZSBzY2FsYXIgdG8gaXQgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gYWRkIHRvIHRoZSB2ZWN0b3JcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBhZGRTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuYWRkU2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICAvKipcbiAgICogU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSBhbm90aGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QgZnJvbSB0aGlzIG9uZVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgc3VidHJhY3QodmVjdG9yKSB7XG4gICAgdGhpcy54IC09IHZlY3Rvci54O1xuICAgIHRoaXMueSAtPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHN1YnRyYWN0cyB0aGUgdmVjdG9yIGZyb20gaXQgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QgZnJvbSB0aGlzIG9uZVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHN1YnRyYWN0TmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnN1YnRyYWN0KHZlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogU3VidHJhY3RzIGEgc2NhbGFyIGZyb20gdGhlIHZlY3RvciwgbW9kaWZ5aW5nIGJvdGggdGhlIHggYW5kIHlcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIHN1YnRyYWN0IGZyb20gdGhlIHZlY3RvclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgc3VidHJhY3RTY2FsYXIoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VidHJhY3QobmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcikpO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgc3VidHJhY3RzIHRoZSBzY2FsYXIgZnJvbSBpdCBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGQgdG8gdGhlIHZlY3RvclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHN1YnRyYWN0U2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnN1YnRyYWN0U2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICAvKipcbiAgICogRGl2aWRlcyBvbmUgdmVjdG9yIGJ5IGFub3RoZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBkaXZpZGUgdGhpcyBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgZGl2aWRlKHZlY3Rvcikge1xuICAgIGlmKHZlY3Rvci54ICE9PSAwKSB7XG4gICAgICB0aGlzLnggLz0gdmVjdG9yLnhcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54ID0gMDtcbiAgICB9XG4gICAgaWYodmVjdG9yLnkgIT09IDApIHtcbiAgICAgIHRoaXMueSAvPSB2ZWN0b3IueVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnkgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIGRpdmlkZXMgaXQgYnkgdGhlIHZlY3RvciBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBkaXZpZGUgdGhlIGNsb25lIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgZGl2aWRlTmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmRpdmlkZSh2ZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpdmlkZXMgdGhlIHZlY3RvciBieSBhIHNjYWxhci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIGRpdmlkZSBib3RoIHggYW5kIHkgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGRpdmlkZVNjYWxhcihzY2FsYXIpIHtcbiAgICB2YXIgdiA9IG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpO1xuICAgIHJldHVybiB0aGlzLmRpdmlkZSh2KTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIGRpdmlkZXMgaXQgYnkgdGhlIHByb3ZpZGVkIHNjYWxhci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIGRpdmlkZSBib3RoIHggYW5kIHkgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBkaXZpZGVTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuZGl2aWRlU2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbGllcyBvbmUgdmVjdG9yIGJ5IGFub3RoZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGlzIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBtdWx0aXBseSh2ZWN0b3IpIHtcbiAgICB0aGlzLnggKj0gdmVjdG9yLng7XG4gICAgdGhpcy55ICo9IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgbXVsdGlwbGllcyBpdCBieSB0aGUgdmVjdG9yIGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IHRoZSBjbG9uZSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIG11bHRpcGx5TmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2Lm11bHRpcGx5KHZlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbGllcyB0aGUgdmVjdG9yIGJ5IGEgc2NhbGFyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgYm90aCB4IGFuZCB5IGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBtdWx0aXBseVNjYWxhcihzY2FsYXIpIHtcbiAgICB2YXIgdiA9IG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpO1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KHYpO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgbXVsdGlwbGllcyBpdCBieSB0aGUgcHJvdmlkZWQgc2NhbGFyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgYm90aCB4IGFuZCB5IGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgbXVsdGlwbHlTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYubXVsdGlwbHlTY2FsYXIoc2NhbGFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI211bHRpcGx5U2NhbGFyX19hbmNob3IgbXVsdGlwbHlTY2FsYXJ9XG4gICAqL1xuICBzY2FsZShzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcihzY2FsYXIpO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI211bHRpcGx5U2NhbGFyTmV3X19hbmNob3IgbXVsdGlwbHlTY2FsYXJOZXd9XG4gICAqL1xuICBzY2FsZU5ldyhzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhck5ldyhzY2FsYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSB2ZWNvciBieSBhIGdpdmVuIGFtb3VudCwgcHJvdmlkZWQgaW4gcmFkaWFucy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHJhZGlhbiBUaGUgYW5nbGUsIGluIHJhZGlhbnMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICByb3RhdGUocmFkaWFuKSB7XG4gIFx0dmFyIHggPSAodGhpcy54ICogTWF0aC5jb3MocmFkaWFuKSkgLSAodGhpcy55ICogTWF0aC5zaW4ocmFkaWFuKSk7XG4gIFx0dmFyIHkgPSAodGhpcy54ICogTWF0aC5zaW4ocmFkaWFuKSkgKyAodGhpcy55ICogTWF0aC5jb3MocmFkaWFuKSk7XG5cblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cbiAgXHRyZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHJvdGF0ZXMgaXQgYnkgdGhlIHN1cHBsaWVkIHJhZGlhbiB2YWx1ZVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgcmFkaWFuIFRoZSBhbmdsZSwgaW4gcmFkaWFucywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICByb3RhdGVOZXcocmFkaWFuKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYucm90YXRlKHJhZGlhbik7XG4gIH1cblxuXHQvKipcblx0ICogUm90YXRlcyBhIHZlY29yIGJ5IGEgZ2l2ZW4gYW1vdW50LCBwcm92aWRlZCBpbiBkZWdyZWVzLiBDb252ZXJ0cyB0aGUgZGVncmVlXG5cdCAqIHZhbHVlIHRvIHJhZGlhbnMgYW5kIHJ1bnMgdGhlIHJvdGFldCBtZXRob2QuXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICogQGNoYWluYWJsZVxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9ICBkZWdyZWVzIFRoZSBhbmdsZSwgaW4gZGVncmVlcywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgYnlcblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuXHQgKi9cbiAgcm90YXRlRGVnKGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGUoZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpKTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHJvdGF0ZXMgaXQgYnkgdGhlIHN1cHBsaWVkIGRlZ3JlZSB2YWx1ZVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcblx0ICogQHBhcmFtICB7bnVtYmVyfSAgZGVncmVlcyBUaGUgYW5nbGUsIGluIGRlZ3JlZXMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0IFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHJvdGF0ZURlZ05ldyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlTmV3KGRlZ3JlZXNUb1JhZGlhbihkZWdyZWVzKSk7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNyb3RhdGVfX2FuY2hvciByb3RhdGV9XG4gICAqL1xuICByb3RhdGVCeShyYWRpYW4pIHtcblx0XHRyZXR1cm4gdGhpcy5yb3RhdGUocmFkaWFuKTtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNyb3RhdGVOZXdfX2FuY2hvciByb3RhdGVOZXd9XG4gICAqL1xuICByb3RhdGVCeU5ldyhyYWRpYW4pIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGVOZXcocmFkaWFuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI3JvdGF0ZURlZ19fYW5jaG9yIHJvdGF0ZURlZ31cbiAgICovXG4gIHJvdGF0ZURlZ0J5KGRlZ3JlZXMpIHtcblx0XHRyZXR1cm4gdGhpcy5yb3RhdGVEZWcoZGVncmVlcyk7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3Ijcm90YXRlRGVnTmV3X19hbmNob3Igcm90YXRlRGVnTmV3fVxuICAgKi9cbiAgcm90YXRlRGVnQnlOZXcocmFkaWFuKSB7XG4gICAgcmV0dXJuIHRqb3Mucm90YXRlRGVnTmV3KHJhZGlhbik7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRlcyBhIHZlY3RvciB0byBhIHNwZWNpZmljIGFuZ2xlXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICByYWRpYW4gVGhlIGFuZ2xlLCBpbiByYWRpYW5zLCB0byByb3RhdGUgdGhlIHZlY3RvciB0b1xuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cblx0cm90YXRlVG8ocmFkaWFuKSB7XG5cdFx0cmV0dXJuIHRoaXMucm90YXRlKHJhZGlhbi10aGlzLmFuZ2xlKTtcblx0fTtcbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCByb3RhdGVzIGl0IHRvIHRoZSBzdXBwbGllZCByYWRpYW4gdmFsdWVcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHJhZGlhbiBUaGUgYW5nbGUsIGluIHJhZGlhbnMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIHRvXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cblx0cm90YXRlVG9OZXcocmFkaWFuKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYucm90YXRlVG8ocmFkaWFuKTtcblx0fTtcblxuXHQvKipcblx0ICogUm90YXRlcyBhIHZlY29yIHRvIGEgZ2l2ZW4gYW1vdW50LCBwcm92aWRlZCBpbiBkZWdyZWVzLiBDb252ZXJ0cyB0aGUgZGVncmVlXG5cdCAqIHZhbHVlIHRvIHJhZGlhbnMgYW5kIHJ1bnMgdGhlIHJvdGF0ZVRvIG1ldGhvZC5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKiBAY2hhaW5hYmxlXG5cdCAqIEBwYXJhbSAge251bWJlcn0gIGRlZ3JlZXMgVGhlIGFuZ2xlLCBpbiBkZWdyZWVzLCB0byByb3RhdGUgdGhlIHZlY3RvciB0b1xuXHQgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG5cdCAqL1xuICByb3RhdGVUb0RlZyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlVG8oZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpKTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHJvdGF0ZXMgaXQgdG8gdGhlIHN1cHBsaWVkIGRlZ3JlZSB2YWx1ZVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcblx0ICogQHBhcmFtICB7bnVtYmVyfSAgZGVncmVlcyBUaGUgYW5nbGUsIGluIGRlZ3JlZXMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIHRvXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0IFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHJvdGF0ZVRvRGVnTmV3KGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGVUb05ldyhkZWdyZWVzVG9SYWRpYW4oZGVncmVlcykpO1xuICB9XG5cblx0LyoqXG5cdCAqIE5vcm1hbGlzZXMgdGhlIHZlY3RvciBkb3duIHRvIGEgbGVuZ3RoIG9mIDEgdW5pdFxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqIEBjaGFpbmFibGVcblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcblx0ICovXG5cdG5vcm1hbGlzZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIodGhpcy5sZW5ndGgpO1xuXHR9XG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgbm9ybWFsaXNlcyBpdFxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqIEBjaGFpbmFibGVcblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGEgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuXHQgKi9cblx0bm9ybWFsaXNlTmV3KCkge1xuXHRcdHJldHVybiB0aGlzLmRpdmlkZVNjYWxhck5ldyh0aGlzLmxlbmd0aCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSAge1ZlY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tXG5cdCAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzdXBwbGllZCB2ZWN0b3Jcblx0ICovXG5cdGRpc3RhbmNlKHZlY3Rvcikge1xuXHRcdHJldHVybiB0aGlzLnN1YnRyYWN0TmV3KHZlY3RvcikubGVuZ3RoO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9uIHRoZSBYIGF4aXMgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSAge1ZlY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tXG5cdCAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFRoZSBkaXN0YW5jZSwgYWxvbmcgdGhlIHggYXhpcywgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqL1xuXHRkaXN0YW5jZVgodmVjdG9yKSB7XG5cdFx0cmV0dXJuIHRoaXMueCAtIHZlY3Rvci54O1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZWQgdGhlIGRpc3RhbmNlIG9uIHRoZSBZIGF4aXMgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSAge1ZlY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tXG5cdCAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFRoZSBkaXN0YW5jZSwgYWxvbmcgdGhlIHkgYXhpcywgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqL1xuXHRkaXN0YW5jZVkodmVjdG9yKSB7XG5cdFx0cmV0dXJuIHRoaXMueSAtIHZlY3Rvci55O1xuXHR9XG5cblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3QgYmV0d2VlbiB0aGlzIGFuZCBhIHN1cHBsaWVkIHZlY3RvclxuXHQgKlxuXHQgKiBAZXhhbXBsZVxuXHQgKiAvLyByZXR1cm5zIC0xNFxuXHQgKiBuZXcgVmVjdG9yKDIsIC0zKS5kb3QobmV3IFZlY3RvcigtNCwgMikpXG5cdCAqIG5ldyBWZWN0b3IoLTQsIDIpLmRvdChuZXcgVmVjdG9yKDIsIC0zKSlcblx0ICogbmV3IFZlY3RvcigyLCAtNCkuZG90KG5ldyBWZWN0b3IoLTMsIDIpKVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtWZWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIG9iamVjdCBhZ2FpbnN0IHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgZG90IHByb2R1Y3Rcblx0ICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgVGhlIGRvdCBwcm9kdWN0IG9mIHRoZSB0d28gdmVjdG9yc1xuXHQgKi9cblx0ZG90KHZlY3Rvcikge1xuXHRcdHJldHVybiAodGhpcy54ICogdmVjdG9yLngpICsgKHRoaXMueSAqIHZlY3Rvci55KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBjcm9zcyBwcm9kdWN0IGJldHdlZW4gdGhpcyBhbmQgdGhlIHN1cHBsaWVkIHZlY3Rvci5cblx0ICpcblx0ICogQGV4YW1wbGVcblx0ICogLy8gcmV0dXJucyAtMlxuXHQgKiBuZXcgVmVjdG9yKDIsIC0zKS5jcm9zcyhuZXcgVmVjdG9yKC00LCAyKSlcblx0ICogbmV3IFZlY3RvcigtNCwgMikuY3Jvc3MobmV3IFZlY3RvcigyLCAtMykpXG5cdCAqIC8vIHJldHVybnMgMlxuXHQgKiBuZXcgVmVjdG9yKDIsIC00KS5jcm9zcyhuZXcgVmVjdG9yKC0zLCAyKSlcblx0ICpcblx0ICogQHBhcmFtICB7VmVjdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciBvYmplY3QgYWdhaW5zdCB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGNyb3NzIHByb2R1Y3Rcblx0ICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgVGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHR3byB2ZWN0b3JzXG5cdCAqL1xuXHRjcm9zcyh2ZWN0b3IpIHtcblx0XHRyZXR1cm4gKHRoaXMueCAqIHZlY3Rvci54KSAtICh0aGlzLnkgKiB2ZWN0b3IueSk7XG5cdH1cblxuXG4gIC8qKlxuICAgKiBHZXR0ZXJzIGFuZCBzZXR0ZXJzXG4gICAqL1xuXG4gIC8qKlxuICAgKiAoZ2V0dGVyL3NldHRlcikgVGhlIHggdmFsdWUgb2YgdGhlIHZlY3Rvci5cbiAgICpcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgc2V0IHgoeCkge1xuICAgIGlmKHR5cGVvZiB4ID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl94ID0geDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWCBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ggfHwgMDtcbiAgfVxuXG4gLyoqXG5cdCogKGdldHRlci9zZXR0ZXIpIFRoZSB5IHZhbHVlIG9mIHRoZSB2ZWN0b3IuXG5cdCpcblx0KiBAdHlwZSB7bnVtYmVyfVxuXHQqIEBkZWZhdWx0IDBcblx0Ki9cbiAgc2V0IHkoeSkge1xuICAgIGlmKHR5cGVvZiB5ID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl95ID0geTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWSBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kgfHwgMDtcbiAgfVxuXG5cdC8qKlxuXHQqIChnZXR0ZXIvc2V0dGVyKSBUaGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgcHJlc2VudGVkIGFzIGEgc3F1YXJlLiBJZiB5b3UncmUgdXNpbmdcblx0KiBsZW5ndGggZm9yIGNvbXBhcmlzb24sIHRoaXMgaXMgcXVpY2tlci5cblx0KlxuXHQqIEB0eXBlIHtudW1iZXJ9XG5cdCogQGRlZmF1bHQgMFxuXHQqL1xuICBzZXQgbGVuZ3RoU3F1YXJlZChsZW5ndGgpIHtcbiAgICB2YXIgZmFjdG9yO1xuICAgIGlmKHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicpIHtcbiAgICAgIGZhY3RvciA9IGxlbmd0aCAvIHRoaXMubGVuZ3RoU3F1YXJlZDtcbiAgICAgIHRoaXMubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgbGVuZ3RoU3F1YXJlZCgpIHtcbiAgICByZXR1cm4gKHRoaXMueCAqIHRoaXMueCkgKyAodGhpcy55ICogdGhpcy55KTtcbiAgfVxuXG5cdC8qKlxuXHQqIChnZXR0ZXIvc2V0dGVyKSBUaGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3Jcblx0KlxuXHQqIEB0eXBlIHtudW1iZXJ9XG5cdCogQGRlZmF1bHQgMFxuXHQqL1xuICBzZXQgbGVuZ3RoKGxlbmd0aCkge1xuICAgIHZhciBmYWN0b3I7XG4gICAgaWYodHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJykge1xuICAgICAgZmFjdG9yID0gbGVuZ3RoIC8gdGhpcy5sZW5ndGg7XG4gICAgICB0aGlzLm11bHRpcGx5U2NhbGFyKGZhY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xlbmd0aCBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCk7XG4gIH1cblxuXHQvKipcblx0KiAoZ2V0dGVyL3NldHRlcikgVGhlIGFuZ2xlIG9mIHRoZSB2ZWN0b3IsIGluIHJhZGlhbnNcblx0KlxuXHQqIEB0eXBlIHtudW1iZXJ9XG5cdCogQGRlZmF1bHQgMFxuXHQqL1xuICBzZXQgYW5nbGUocmFkaWFuKSB7XG4gICAgaWYodHlwZW9mIHJhZGlhbiA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5yb3RhdGVUbyhyYWRpYW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhbmdsZSBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFuZ2xlKCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgfVxuXG5cdC8qKlxuXHQqIChnZXR0ZXIvc2V0dGVyKSBUaGUgYW5nbGUgb2YgdGhlIHZlY3RvciwgaW4gcmFkaWFuc1xuXHQqXG5cdCogQHR5cGUge251bWJlcn1cblx0KiBAZGVmYXVsdCAwXG5cdCovXG4gIHNldCBhbmdsZUluRGVncmVlcyhkZWdyZWVzKSB7XG4gICAgaWYodHlwZW9mIGRlZ3JlZXMgPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucm90YXRlVG9EZWcoZGVncmVlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FuZ2xlIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgYW5nbGVJbkRlZ3JlZXMoKSB7XG4gICAgcmV0dXJuIHJhZGlhblRvRGVncmVlcyhNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KSk7XG4gIH1cblxuXHQvKipcblx0ICogKGdldHRlci9zZXR0ZXIpIFZlY3RvciB3aWR0aC5cbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciN4IHh9XG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzZXQgd2lkdGgodykge1xuXHRcdHRoaXMueCA9IHc7XG5cdH1cblx0Z2V0IHdpZHRoKCkge1xuXHRcdHJldHVybiB0aGlzLng7XG5cdH1cblxuXHQvKipcblx0ICogKGdldHRlci9zZXR0ZXIpIFZlY3RvciBoZWlnaHQuXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3IjeCB4fVxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c2V0IGhlaWdodChoKSB7XG5cdFx0dGhpcy55ID0gaDtcblx0fVxuXHRnZXQgaGVpZ2h0KCkge1xuXHRcdHJldHVybiB0aGlzLnk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBWZWN0b3I7XG4iXX0=

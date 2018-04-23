(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      var isCartesian = playground.cartesian;
      var unitX = playground.scaledUnitVectorX; // iHat
      var unitY = playground.scaledUnitVectorY; // jHat
      var scale = playground.scale;
      var offset = new _wtcVector2.default(0, 0);
      // Gtting the offset of the vector and, if it has length, setting up the
      // translated offset
      if (this.offset instanceof _wtcVector2.default) {
        var _offset = this.offset.clone();
        if (isCartesian) {
          _offset.y *= -1;
        }
        offset.x = _offset.x * unitX.x + _offset.y * unitY.x;
        offset.y = _offset.x * unitX.y + _offset.y * unitY.y;
      }
      // Adding the playground's offset to it (origin point)
      var pgOffset = playground.offset;
      // if(isCartesian) pgOffset.y *= -1; // reversing the output Y if we're set to cartesian coords
      offset.add(pgOffset);
      var x = offset.x;
      var y = offset.y;
      var ctx = playground.mainCtx;

      if (this.outputVector instanceof _wtcVector2.default) {
        var _unitX = playground.unitVectorX.clone(); // iHat
        var _unitY = playground.unitVectorY.clone(); // jHat
        var _V = this.v.clone();

        if (isCartesian) {
          _unitX.y *= -1; // reversing the output Y if we're set to cartesian coords
          _unitY.y *= -1;
          _V.y *= -1;
        }

        this.outputVector.x = _V.x * _unitX.x + _V.y * _unitY.x;
        this.outputVector.y = _V.x * _unitX.y + _V.y * _unitY.y;
      }

      // Translate the vector using linear transformation x(î) + y(j)
      // î = unix X
      // j = unit Y
      //  _       _    _       _
      // | x(î.x) | + | y(j.x) |
      // | x(i.y) | + | y(j.y) |
      //
      var V = this.v.clone();
      if (isCartesian) {
        V.y *= -1; // Reverse the Y coord if this is a cartesian system
      }
      var translatedVector = new _wtcVector2.default(0, 0);
      translatedVector.x = V.x * unitX.x + V.y * unitY.x;
      translatedVector.y = V.x * unitX.y + V.y * unitY.y;

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

      var label = this.label;
      if (label) {
        var labelPoint = this.v.divideScalarNew(2);
        var textloc = new _wtcVector2.default(0, 0);
        if (isCartesian) {
          labelPoint.y *= -1; // Reverse the Y coord if this is a cartesian system
        }
        textloc.x = labelPoint.x * unitX.x + labelPoint.y * unitY.x + offset.x;
        textloc.y = labelPoint.x * unitX.y + labelPoint.y * unitY.y + offset.y;

        ctx.font = "10px Helvetica, Arial, sans-serif";
        var textdims = ctx.measureText(label);
        var padding = 3;
        textdims.height = 10;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(textloc.x - padding - textdims.width / 2, textloc.y - padding - textdims.height / 2, textdims.width + padding * 2, textdims.height + padding * 2);
        ctx.fillStyle = this.color;
        ctx.fillText(label, textloc.x - textdims.width / 2, textloc.y - textdims.height / 2 + textdims.height - textdims.height / 4);
      }
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
      // if( !(this._offset instanceof Vector) ) {
      //   this._offset = new Vector(0,0);
      // }
      return this._offset || false;
    }
  }, {
    key: 'label',
    set: function set(label) {
      if (label) {
        this._label = label;
      } else {
        this._label = null;
      }
    },
    get: function get() {
      return this._label || null;
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
      var offset = this._offset || new _wtcVector2.default();
      return offset;
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
  }, {
    key: "cartesian",
    set: function set(isCartesian) {
      this.isCartesian = isCartesian === true;
    },
    get: function get() {
      return this.isCartesian || false;
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
var namedColours = {
  silver: '#CCCCCC'
};
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

    /**
     * (getter/setter) Vector area.
     * @readonly
     *
     * @type {number}
     */

  }, {
    key: 'area',
    get: function get() {
      return this.x * this.y;
    }
  }]);

  return Vector;
}();

exports.default = Vector;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2FwcC9EcmF3aW5nVmVjdG9yLmpzIiwiZGVtby9hcHAvVmVjdG9yUGxheWdyb3VuZC5qcyIsImRlbW8vYXBwL2NvbG91cnMuanMiLCJkZW1vL3J1bi5qcyIsInNyYy93dGMtdmVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFFTSxhO0FBQ0oseUJBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsS0FBbEIsRUFBd0M7QUFBQSxRQUFmLFNBQWUsdUVBQUgsQ0FBRzs7QUFBQTs7QUFDdEMsU0FBSyxDQUFMLEdBQVMsd0JBQVcsQ0FBWCxFQUFjLENBQWQsQ0FBVDs7QUFFQSxTQUFLLFdBQUwsR0FBbUIsd0JBQVcsQ0FBQyxFQUFaLEVBQWUsQ0FBQyxFQUFoQixDQUFuQjtBQUNBLFNBQUssV0FBTCxHQUFtQix3QkFBVyxDQUFDLEVBQVosRUFBZ0IsRUFBaEIsQ0FBbkI7O0FBRUEsUUFBSSxPQUFPLEtBQVAsS0FBaUIsUUFBakIsSUFBNkIsQ0FBRSx1QkFBdUIsSUFBdkIsQ0FBNEIsS0FBNUIsQ0FBbkMsRUFBeUU7QUFDdkUsY0FBUSxNQUFNLENBQUMsTUFBSyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBYyxHQUF6QixDQUFELENBQWdDLFFBQWhDLENBQXlDLEVBQXpDLENBQUwsRUFBbUQsTUFBbkQsQ0FBMEQsQ0FBQyxDQUEzRCxDQUFOLEdBQXNFLENBQUMsTUFBSyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBYyxHQUF6QixDQUFELENBQWdDLFFBQWhDLENBQXlDLEVBQXpDLENBQUwsRUFBbUQsTUFBbkQsQ0FBMEQsQ0FBQyxDQUEzRCxDQUF0RSxHQUFzSSxDQUFDLE1BQUssS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWMsR0FBekIsQ0FBRCxDQUFnQyxRQUFoQyxDQUF5QyxFQUF6QyxDQUFMLEVBQW1ELE1BQW5ELENBQTBELENBQUMsQ0FBM0QsQ0FBOUk7QUFDRDs7QUFFRCxTQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0Q7Ozs7eUJBRUksVSxFQUFZO0FBQ2YsVUFBSSxjQUFjLFdBQVcsU0FBN0I7QUFDQSxVQUFJLFFBQVEsV0FBVyxpQkFBdkIsQ0FGZSxDQUUyQjtBQUMxQyxVQUFJLFFBQVEsV0FBVyxpQkFBdkIsQ0FIZSxDQUcyQjtBQUMxQyxVQUFJLFFBQVEsV0FBVyxLQUF2QjtBQUNBLFVBQUksU0FBUyx3QkFBVyxDQUFYLEVBQWMsQ0FBZCxDQUFiO0FBQ0E7QUFDQTtBQUNBLFVBQUcsS0FBSyxNQUFMLCtCQUFILEVBQWtDO0FBQ2hDLFlBQUksVUFBVSxLQUFLLE1BQUwsQ0FBWSxLQUFaLEVBQWQ7QUFDQSxZQUFHLFdBQUgsRUFBZ0I7QUFDZCxrQkFBUSxDQUFSLElBQWEsQ0FBQyxDQUFkO0FBQ0Q7QUFDRCxlQUFPLENBQVAsR0FBWSxRQUFRLENBQVIsR0FBWSxNQUFNLENBQW5CLEdBQXlCLFFBQVEsQ0FBUixHQUFZLE1BQU0sQ0FBdEQ7QUFDQSxlQUFPLENBQVAsR0FBWSxRQUFRLENBQVIsR0FBWSxNQUFNLENBQW5CLEdBQXlCLFFBQVEsQ0FBUixHQUFZLE1BQU0sQ0FBdEQ7QUFDRDtBQUNEO0FBQ0EsVUFBSSxXQUFXLFdBQVcsTUFBMUI7QUFDQTtBQUNBLGFBQU8sR0FBUCxDQUFXLFFBQVg7QUFDQSxVQUFJLElBQUksT0FBTyxDQUFmO0FBQ0EsVUFBSSxJQUFJLE9BQU8sQ0FBZjtBQUNBLFVBQUksTUFBTSxXQUFXLE9BQXJCOztBQUVBLFVBQUcsS0FBSyxZQUFMLCtCQUFILEVBQXdDO0FBQ3RDLFlBQUksU0FBUSxXQUFXLFdBQVgsQ0FBdUIsS0FBdkIsRUFBWixDQURzQyxDQUNNO0FBQzVDLFlBQUksU0FBUSxXQUFXLFdBQVgsQ0FBdUIsS0FBdkIsRUFBWixDQUZzQyxDQUVNO0FBQzVDLFlBQUksS0FBSSxLQUFLLENBQUwsQ0FBTyxLQUFQLEVBQVI7O0FBRUEsWUFBRyxXQUFILEVBQWdCO0FBQ2QsaUJBQU0sQ0FBTixJQUFXLENBQUMsQ0FBWixDQURjLENBQ0M7QUFDZixpQkFBTSxDQUFOLElBQVcsQ0FBQyxDQUFaO0FBQ0EsYUFBRSxDQUFGLElBQU8sQ0FBQyxDQUFSO0FBQ0Q7O0FBRUQsYUFBSyxZQUFMLENBQWtCLENBQWxCLEdBQXVCLEdBQUUsQ0FBRixHQUFNLE9BQU0sQ0FBYixHQUFtQixHQUFFLENBQUYsR0FBTSxPQUFNLENBQXJEO0FBQ0EsYUFBSyxZQUFMLENBQWtCLENBQWxCLEdBQXVCLEdBQUUsQ0FBRixHQUFNLE9BQU0sQ0FBYixHQUFtQixHQUFFLENBQUYsR0FBTSxPQUFNLENBQXJEO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFJLElBQUksS0FBSyxDQUFMLENBQU8sS0FBUCxFQUFSO0FBQ0EsVUFBRyxXQUFILEVBQWdCO0FBQ2QsVUFBRSxDQUFGLElBQU8sQ0FBQyxDQUFSLENBRGMsQ0FDSDtBQUNaO0FBQ0QsVUFBSSxtQkFBbUIsd0JBQVcsQ0FBWCxFQUFjLENBQWQsQ0FBdkI7QUFDQSx1QkFBaUIsQ0FBakIsR0FBc0IsRUFBRSxDQUFGLEdBQU0sTUFBTSxDQUFiLEdBQW1CLEVBQUUsQ0FBRixHQUFNLE1BQU0sQ0FBcEQ7QUFDQSx1QkFBaUIsQ0FBakIsR0FBc0IsRUFBRSxDQUFGLEdBQU0sTUFBTSxDQUFiLEdBQW1CLEVBQUUsQ0FBRixHQUFNLE1BQU0sQ0FBcEQ7O0FBRUEsVUFBSSxTQUFKO0FBQ0EsVUFBSSxTQUFKLEdBQWdCLEtBQUssU0FBckI7QUFDQSxVQUFJLFdBQUosR0FBa0IsS0FBSyxLQUF2QjtBQUNBLFVBQUksTUFBSixDQUFXLENBQVgsRUFBYyxDQUFkO0FBQ0EsVUFBSSxpQkFBaUIsQ0FBakIsR0FBcUIsT0FBTyxDQUFoQztBQUNBLFVBQUksaUJBQWlCLENBQWpCLEdBQXFCLE9BQU8sQ0FBaEM7QUFDQSxVQUFJLE1BQUosQ0FBVyxDQUFYLEVBQWMsQ0FBZDs7QUFFQSxXQUFLLGdCQUFMLEdBQXdCLGdCQUF4Qjs7QUFFQTtBQUNBLFVBQUksTUFBTSxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBMkIsaUJBQWlCLEtBQTVDLENBQVY7QUFDQSxVQUFJLE1BQU0sS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLGlCQUFpQixLQUE1QyxDQUFWOztBQUVBO0FBQ0EsVUFBSSxNQUFKLENBQVcsSUFBSSxDQUFKLEdBQVEsQ0FBbkIsRUFBc0IsSUFBSSxDQUFKLEdBQVEsQ0FBOUI7QUFDQSxVQUFJLE1BQUosQ0FBVyxDQUFYLEVBQWMsQ0FBZDtBQUNBLFVBQUksTUFBSixDQUFXLElBQUksQ0FBSixHQUFRLENBQW5CLEVBQXNCLElBQUksQ0FBSixHQUFRLENBQTlCOztBQUVBLFVBQUksTUFBSjs7QUFFQSxVQUFJLFFBQVEsS0FBSyxLQUFqQjtBQUNBLFVBQUcsS0FBSCxFQUFVO0FBQ1IsWUFBSSxhQUFhLEtBQUssQ0FBTCxDQUFPLGVBQVAsQ0FBdUIsQ0FBdkIsQ0FBakI7QUFDQSxZQUFJLFVBQVUsd0JBQVcsQ0FBWCxFQUFjLENBQWQsQ0FBZDtBQUNBLFlBQUcsV0FBSCxFQUFnQjtBQUNkLHFCQUFXLENBQVgsSUFBZ0IsQ0FBQyxDQUFqQixDQURjLENBQ007QUFDckI7QUFDRCxnQkFBUSxDQUFSLEdBQWEsV0FBVyxDQUFYLEdBQWUsTUFBTSxDQUF0QixHQUE0QixXQUFXLENBQVgsR0FBZSxNQUFNLENBQWpELEdBQXNELE9BQU8sQ0FBekU7QUFDQSxnQkFBUSxDQUFSLEdBQWEsV0FBVyxDQUFYLEdBQWUsTUFBTSxDQUF0QixHQUE0QixXQUFXLENBQVgsR0FBZSxNQUFNLENBQWpELEdBQXNELE9BQU8sQ0FBekU7O0FBRUEsWUFBSSxJQUFKLEdBQVcsbUNBQVg7QUFDQSxZQUFJLFdBQVcsSUFBSSxXQUFKLENBQWdCLEtBQWhCLENBQWY7QUFDQSxZQUFJLFVBQVUsQ0FBZDtBQUNBLGlCQUFTLE1BQVQsR0FBa0IsRUFBbEI7QUFDQSxZQUFJLFNBQUosR0FBZ0IsaUJBQWhCO0FBQ0EsWUFBSSxRQUFKLENBQWEsUUFBUSxDQUFSLEdBQVksT0FBWixHQUFzQixTQUFTLEtBQVQsR0FBaUIsQ0FBcEQsRUFBdUQsUUFBUSxDQUFSLEdBQVksT0FBWixHQUFzQixTQUFTLE1BQVQsR0FBa0IsQ0FBL0YsRUFBa0csU0FBUyxLQUFULEdBQWlCLFVBQVUsQ0FBN0gsRUFBZ0ksU0FBUyxNQUFULEdBQWtCLFVBQVUsQ0FBNUo7QUFDQSxZQUFJLFNBQUosR0FBZ0IsS0FBSyxLQUFyQjtBQUNBLFlBQUksUUFBSixDQUFhLEtBQWIsRUFBbUIsUUFBUSxDQUFSLEdBQVksU0FBUyxLQUFULEdBQWlCLENBQWhELEVBQW1ELFFBQVEsQ0FBUixHQUFZLFNBQVMsTUFBVCxHQUFrQixDQUE5QixHQUFrQyxTQUFTLE1BQTNDLEdBQW9ELFNBQVMsTUFBVCxHQUFrQixDQUF6SDtBQUNEO0FBRUY7Ozt3QkFFZ0I7QUFDZixhQUFPLEtBQUssR0FBWjtBQUNELEs7c0JBQ2MsRSxFQUFJO0FBQ2pCLFdBQUssR0FBTCxHQUFXLEVBQVg7QUFDRDs7O3NCQUVTLEssRUFBTztBQUNmLFVBQUksT0FBTyxLQUFQLElBQWdCLFFBQWhCLElBQTRCLHVCQUF1QixJQUF2QixDQUE0QixLQUE1QixDQUFoQyxFQUFxRTtBQUNuRSxhQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0Q7QUFDRixLO3dCQUNXO0FBQ1YsYUFBTyxLQUFLLE1BQUwsSUFBZSxTQUF0QjtBQUNEOzs7c0JBRVUsQyxFQUFHO0FBQ1osVUFBSSxnQ0FBSixFQUEwQjtBQUN4QixhQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0Q7QUFDRixLO3dCQUNZO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsYUFBTyxLQUFLLE9BQUwsSUFBZ0IsS0FBdkI7QUFDRDs7O3NCQUVTLEssRUFBTztBQUNmLFVBQUcsS0FBSCxFQUFVO0FBQ1IsYUFBSyxNQUFMLEdBQWMsS0FBZDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGLEs7d0JBQ1c7QUFDVixhQUFPLEtBQUssTUFBTCxJQUFlLElBQXRCO0FBQ0Q7Ozs7OztrQkFHWSxhOzs7Ozs7Ozs7OztBQzFKZjs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sZ0I7Ozs7Ozs7MkJBQ3NEO0FBQUEsVUFBOUMsT0FBOEMsdUVBQXBDLElBQW9DO0FBQUEsVUFBOUIsS0FBOEIsdUVBQXRCLEdBQXNCO0FBQUEsVUFBakIsUUFBaUIsdUVBQU4sSUFBTTs7QUFDeEQsV0FBSyxXQUFMLEdBQW1CLElBQW5COztBQUVBLFdBQUssVUFBTCxHQUFrQixTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBbEI7QUFDQSxXQUFLLE9BQUwsR0FBZSxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FBZjtBQUNBLFdBQUssZUFBTCxHQUF1QixTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdkI7QUFDQSxXQUFLLFdBQUwsR0FBbUIsS0FBSyxlQUFMLENBQXFCLFVBQXJCLENBQWdDLElBQWhDLENBQW5COztBQUVBLGVBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxVQUEvQjtBQUNBLGVBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxlQUEvQjs7QUFFQSxhQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixJQUF6QixDQUFsQztBQUNBLFdBQUssY0FBTDs7QUFFQSxXQUFLLE9BQUwsR0FBZSxFQUFmOztBQUVBLFdBQUssWUFBTCxHQUFvQixDQUFwQjs7QUFFQSxXQUFLLFVBQUwsR0FBa0IsUUFBbEI7QUFDQSxXQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsV0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNEOzs7bUNBRXFCLEMsRUFBRztBQUN2QixXQUFLLFVBQUwsR0FBa0Isd0JBQVcsT0FBTyxVQUFsQixFQUE4QixPQUFPLFdBQXJDLENBQWxCO0FBQ0EsV0FBSyxNQUFMLEdBQWMsS0FBSyxVQUFMLENBQWdCLGVBQWhCLENBQWdDLENBQWhDLENBQWQ7O0FBRUEsV0FBSyxVQUFMLENBQWdCLEtBQWhCLEdBQXdCLEtBQUssZUFBTCxDQUFxQixLQUFyQixHQUE2QixPQUFPLFVBQTVEO0FBQ0EsV0FBSyxVQUFMLENBQWdCLE1BQWhCLEdBQXlCLEtBQUssZUFBTCxDQUFxQixNQUFyQixHQUE4QixPQUFPLFdBQTlEO0FBQ0Q7Ozs4QkFFZ0IsYSxFQUFlO0FBQzlCLFVBQUksRUFBRyxnREFBSCxDQUFKLEVBQWlEO0FBQy9DO0FBQ0Q7O0FBRUQsV0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixhQUFsQjs7QUFFQSxhQUFPLGFBQVA7QUFDRDs7OzJCQUVhO0FBQ1o7QUFDQSxXQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLEtBQUssT0FBOUI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxTQUFiO0FBQ0EsV0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUF1QixLQUFLLFVBQUwsQ0FBZ0IsS0FBdkMsRUFBOEMsS0FBSyxVQUFMLENBQWdCLE1BQTlEO0FBQ0EsV0FBSyxPQUFMLENBQWEsSUFBYjtBQUNBOztBQUVBLFVBQUcsS0FBSyxVQUFSLEVBQW9CLEtBQUssUUFBTDtBQUNwQixXQUFLLFdBQUw7O0FBRUEsVUFBSSxLQUFLLE9BQVQsRUFBbUI7QUFDakIsZUFBTyxxQkFBUCxDQUE2QixLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsSUFBZixDQUE3QjtBQUNEO0FBQ0Y7OztrQ0FFb0I7QUFDbkIsV0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixVQUFTLENBQVQsRUFBWTtBQUMvQixVQUFFLElBQUYsQ0FBTyxJQUFQO0FBQ0QsT0FGb0IsQ0FFbkIsSUFGbUIsQ0FFZCxJQUZjLENBQXJCO0FBR0Q7OzsrQkFFaUI7QUFDaEIsVUFBSSxRQUFRLEtBQUssS0FBakI7QUFDQSxVQUFJLGVBQWUsS0FBSyxZQUFMLEdBQW9CLEtBQXZDOztBQUVBOztBQUVBLFdBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsQ0FBekI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxXQUFiLEdBQTJCLEtBQUssU0FBaEM7QUFDQSxXQUFLLE9BQUwsQ0FBYSxTQUFiOztBQUVBLFVBQUksT0FBTyxLQUFLLE1BQUwsQ0FBWSxDQUF2QjtBQUNBLGFBQU0sT0FBTyxLQUFLLFVBQUwsQ0FBZ0IsS0FBN0IsRUFBb0M7QUFDbEMsZ0JBQVEsWUFBUjtBQUNBLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsRUFBMEIsQ0FBMUI7QUFDQSxhQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLEVBQTBCLEtBQUssVUFBTCxDQUFnQixNQUExQztBQUNEO0FBQ0QsYUFBTyxLQUFLLE1BQUwsQ0FBWSxDQUFuQjtBQUNBLGFBQU0sT0FBTyxDQUFiLEVBQWdCO0FBQ2QsZ0JBQVEsWUFBUjtBQUNBLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsRUFBMEIsQ0FBMUI7QUFDQSxhQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLEVBQTBCLEtBQUssVUFBTCxDQUFnQixNQUExQztBQUNEO0FBQ0QsVUFBSSxPQUFPLEtBQUssTUFBTCxDQUFZLENBQXZCO0FBQ0EsYUFBTSxPQUFPLEtBQUssVUFBTCxDQUFnQixNQUE3QixFQUFxQztBQUNuQyxnQkFBUSxZQUFSO0FBQ0EsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixDQUFwQixFQUF1QixJQUF2QjtBQUNBLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBSyxVQUFMLENBQWdCLEtBQXBDLEVBQTJDLElBQTNDO0FBQ0Q7QUFDRCxhQUFPLEtBQUssTUFBTCxDQUFZLENBQW5CO0FBQ0EsYUFBTSxPQUFPLENBQWIsRUFBZ0I7QUFDZCxnQkFBUSxZQUFSO0FBQ0EsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixDQUFwQixFQUF1QixJQUF2QjtBQUNBLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBSyxVQUFMLENBQWdCLEtBQXBDLEVBQTJDLElBQTNDO0FBQ0Q7QUFDRCxXQUFLLE9BQUwsQ0FBYSxNQUFiOztBQUdBLFdBQUssT0FBTCxDQUFhLFdBQWIsR0FBMkIsS0FBSyxXQUFoQztBQUNBLFdBQUssT0FBTCxDQUFhLFNBQWI7O0FBRUEsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixDQUFwQixFQUF1QixLQUFLLE1BQUwsQ0FBWSxDQUFuQztBQUNBLFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBSyxVQUFMLENBQWdCLEtBQXBDLEVBQTJDLEtBQUssTUFBTCxDQUFZLENBQXZEO0FBQ0EsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLE1BQUwsQ0FBWSxDQUFoQyxFQUFtQyxDQUFuQztBQUNBLFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBSyxNQUFMLENBQVksQ0FBaEMsRUFBbUMsS0FBSyxVQUFMLENBQWdCLE1BQW5EOztBQUVBLFdBQUssT0FBTCxDQUFhLE1BQWI7QUFFRDs7O3NCQUVrQixDLEVBQUc7QUFDcEIsV0FBSyxRQUFMLEdBQWdCLE1BQU0sSUFBdEI7O0FBRUEsVUFBRyxLQUFLLFFBQUwsS0FBa0IsSUFBckIsRUFBMkI7QUFDekIsYUFBSyxJQUFMO0FBQ0Q7QUFDRixLO3dCQUNvQjtBQUNuQixhQUFPLEtBQUssUUFBTCxLQUFrQixJQUF6QjtBQUNEOzs7c0JBRWtCLEssRUFBTztBQUN4QixVQUFJLE9BQU8sS0FBUCxJQUFnQixRQUFoQixJQUE2QixrQkFBa0IsSUFBbEIsQ0FBdUIsTUFBTSxXQUFOLEVBQXZCLENBQWpDLEVBQThFO0FBQzVFLGFBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNEO0FBQ0YsSzt3QkFDb0I7QUFDbkIsYUFBTyxLQUFLLFFBQUwsSUFBaUIsU0FBeEI7QUFDRDs7O3NCQUVzQixLLEVBQU87QUFDNUIsVUFBSSxPQUFPLEtBQVAsSUFBZ0IsUUFBaEIsSUFBNkIsa0JBQWtCLElBQWxCLENBQXVCLE1BQU0sV0FBTixFQUF2QixDQUFqQyxFQUE4RTtBQUM1RSxhQUFLLFlBQUwsR0FBb0IsS0FBcEI7QUFDRDtBQUNGLEs7d0JBQ3dCO0FBQ3ZCLGFBQU8sS0FBSyxZQUFMLElBQXFCLFNBQTVCO0FBQ0Q7OztzQkFFb0IsSyxFQUFPO0FBQzFCLFVBQUksT0FBTyxLQUFQLElBQWdCLFFBQWhCLElBQTZCLGtCQUFrQixJQUFsQixDQUF1QixNQUFNLFdBQU4sRUFBdkIsQ0FBakMsRUFBOEU7QUFDNUUsYUFBSyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0Q7QUFDRixLO3dCQUNzQjtBQUNyQixhQUFPLEtBQUssVUFBTCxJQUFtQixTQUExQjtBQUNEOzs7c0JBRXNCLEMsRUFBRztBQUN4QixVQUFJLGdDQUFKLEVBQTBCO0FBQ3hCLGFBQUssWUFBTCxHQUFvQixDQUFwQjtBQUNEO0FBQ0YsSzt3QkFDd0I7QUFDdkIsYUFBTyxLQUFLLFlBQUwsSUFBcUIsd0JBQVcsQ0FBWCxFQUFjLENBQWQsQ0FBNUI7QUFDRDs7O3dCQUM4QjtBQUM3QixVQUFJLFFBQVEsS0FBSyxLQUFqQjtBQUNBLFVBQUksS0FBSyxLQUFLLFdBQUwsQ0FBaUIsS0FBakIsRUFBVDtBQUNBLFVBQUcsVUFBVSxDQUFiLEVBQWdCLEdBQUcsY0FBSCxDQUFrQixLQUFsQjtBQUNoQixhQUFPLEVBQVA7QUFDRDs7O3NCQUVzQixDLEVBQUc7QUFDeEIsVUFBSSxnQ0FBSixFQUEwQjtBQUN4QixhQUFLLFlBQUwsR0FBb0IsQ0FBcEI7QUFDRDtBQUNGLEs7d0JBQ3dCO0FBQ3ZCLGFBQU8sS0FBSyxZQUFMLElBQXFCLHdCQUFXLENBQVgsRUFBYyxDQUFkLENBQTVCO0FBQ0Q7Ozt3QkFDOEI7QUFDN0IsVUFBSSxRQUFRLEtBQUssS0FBakI7QUFDQSxVQUFJLEtBQUssS0FBSyxXQUFMLENBQWlCLEtBQWpCLEVBQVQ7QUFDQSxVQUFHLFVBQVUsQ0FBYixFQUFnQixHQUFHLGNBQUgsQ0FBa0IsS0FBbEI7QUFDaEIsYUFBTyxFQUFQO0FBQ0Q7OztzQkFFcUIsSSxFQUFNO0FBQzFCLFVBQUcsbUNBQUgsRUFBMkI7QUFDekIsYUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0Q7QUFDRixLO3dCQUN1QjtBQUN0QixhQUFPLEtBQUssV0FBTCxJQUFvQix5QkFBM0I7QUFDRDs7O3NCQUVpQixJLEVBQU07QUFDdEIsVUFBRyxtQ0FBSCxFQUEyQjtBQUN6QixhQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUFDRixLO3dCQUNtQjtBQUNsQixVQUFJLFNBQVMsS0FBSyxPQUFMLElBQWdCLHlCQUE3QjtBQUNBLGFBQU8sTUFBUDtBQUNEOzs7c0JBRWdCLEssRUFBTztBQUN0QixVQUFHLE9BQU8sS0FBUCxLQUFpQixRQUFwQixFQUE4QjtBQUM1QixhQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0Q7QUFDRixLO3dCQUNrQjtBQUNqQixhQUFPLEtBQUssTUFBTCxJQUFlLENBQXRCO0FBQ0Q7OztzQkFFcUIsUSxFQUFVO0FBQzlCLFdBQUssU0FBTCxHQUFpQixhQUFhLElBQTlCO0FBQ0QsSzt3QkFDdUI7QUFDdEIsYUFBTyxLQUFLLFNBQUwsSUFBa0IsS0FBekI7QUFDRDs7O3NCQUVvQixXLEVBQWE7QUFDaEMsV0FBSyxXQUFMLEdBQW1CLGdCQUFnQixJQUFuQztBQUNELEs7d0JBQ3NCO0FBQ3JCLGFBQU8sS0FBSyxXQUFMLElBQW9CLEtBQTNCO0FBQ0Q7Ozs7OztrQkFLWSxnQjs7Ozs7Ozs7O0FDck9mLElBQUksVUFBVSxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdELFNBQXhELENBQWQ7QUFDQSxJQUFJLGVBQWU7QUFDakIsVUFBUTtBQURTLENBQW5CO1FBR1MsTyxHQUFBLE87UUFBUyxZLEdBQUEsWTs7Ozs7QUNMbEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxPQUFPLE1BQVA7O0FBRUEsSUFBSSxXQUFXO0FBQ2IsYUFBVztBQURFLENBQWY7QUFHQSxPQUFPLFFBQVAsR0FBa0IsUUFBbEI7O0FBRUEsU0FBUyxLQUFULENBQWUsRUFBZixFQUFtQjtBQUNqQixNQUFJLFNBQVMsVUFBVCxJQUF1QixTQUEzQixFQUFxQztBQUNuQztBQUNELEdBRkQsTUFFTztBQUNMLGFBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLEVBQTlDO0FBQ0Q7QUFDRjs7QUFFRCxNQUFNLFlBQVc7O0FBRWYsTUFBSSxLQUFLLDRCQUFrQixDQUFDLENBQW5CLEVBQXNCLENBQUMsQ0FBdkIsRUFBMEIsaUJBQVEsQ0FBUixDQUExQixDQUFUO0FBQ0EsTUFBSSxLQUFLLDRCQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixpQkFBUSxDQUFSLENBQXhCLENBQVQ7QUFDQSxXQUFTLEVBQVQsR0FBYyxHQUFHLENBQWpCO0FBQ0EsV0FBUyxFQUFULEdBQWMsR0FBRyxDQUFqQjs7QUFFQTtBQUNBLDZCQUFpQixJQUFqQjs7QUFFQTtBQUNBLDZCQUFpQixTQUFqQixDQUEyQixFQUEzQjtBQUNBLDZCQUFpQixTQUFqQixDQUEyQixFQUEzQjs7QUFFQTtBQUNBLE1BQUksU0FBUyxTQUFULE1BQVMsR0FBVzs7QUFFdEIsUUFBRyxTQUFTLFNBQVosRUFBdUI7O0FBRXJCO0FBQ0EsU0FBRyxDQUFILENBQUssS0FBTCxJQUFjLElBQWQ7O0FBRUEsNEJBQXNCLE1BQXRCO0FBQ0Q7QUFFRixHQVZEOztBQVlBOztBQUVBO0FBQ0EsTUFBSSxNQUFNLElBQUksSUFBSSxHQUFSLEVBQVY7QUFDQSxNQUFJLG1CQUFtQixJQUFJLEdBQUosQ0FBUSxRQUFSLEVBQWtCLFdBQWxCLENBQXZCO0FBQ0EsbUJBQWlCLFFBQWpCLENBQTBCLFVBQVMsS0FBVCxFQUFnQjtBQUN4QyxRQUFHLFNBQVMsSUFBWixFQUFrQjtBQUNoQjtBQUNEO0FBQ0YsR0FKRDtBQUtBLE1BQUksTUFBTSxJQUFJLFNBQUosQ0FBYyxVQUFkLENBQVY7QUFDQSxNQUFJLFVBQVUsSUFBSSxHQUFKLENBQVEsU0FBUyxFQUFqQixFQUFxQixJQUFyQixFQUEyQixNQUEzQixFQUFkO0FBQ0EsTUFBSSxVQUFVLElBQUksR0FBSixDQUFRLFNBQVMsRUFBakIsRUFBcUIsSUFBckIsRUFBMkIsTUFBM0IsRUFBZDtBQUNBLE1BQUksTUFBTSxJQUFJLFNBQUosQ0FBYyxVQUFkLENBQVY7QUFDQSxNQUFJLFVBQVUsSUFBSSxHQUFKLENBQVEsU0FBUyxFQUFqQixFQUFxQixHQUFyQixFQUEwQixNQUExQixFQUFkO0FBQ0EsTUFBSSxVQUFVLElBQUksR0FBSixDQUFRLFNBQVMsRUFBakIsRUFBcUIsR0FBckIsRUFBMEIsTUFBMUIsRUFBZDtBQUNBLE1BQUksSUFBSjtBQUNBLE1BQUksSUFBSjtBQUNELENBN0NEOzs7Ozs7Ozs7Ozs7O0FDcEJBLElBQU0sbUJBQW1CLE1BQU0sS0FBSyxFQUFwQzs7QUFFQSxJQUFJLGtCQUFrQixTQUFsQixlQUFrQixDQUFTLE1BQVQsRUFBaUI7QUFDdEMsU0FBTyxTQUFTLGdCQUFoQjtBQUNBLENBRkQ7O0FBSUEsSUFBSSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBUyxPQUFULEVBQWtCO0FBQ3ZDLFNBQU8sVUFBVSxnQkFBakI7QUFDQSxDQUZEOztBQUlBOzs7Ozs7Ozs7Ozs7O0lBWU0sTTs7QUFFTDs7Ozs7OztBQU9DLGtCQUFZLENBQVosRUFBZSxDQUFmLEVBQWlCO0FBQUE7O0FBQ2YsU0FBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLFNBQUssQ0FBTCxHQUFTLENBQVQ7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7MEJBT0ssQyxFQUFHLEMsRUFBRztBQUNULFdBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxXQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs0QkFNUztBQUNOLGFBQU8sSUFBSSxNQUFKLENBQVcsS0FBSyxDQUFoQixFQUFtQixLQUFLLENBQXhCLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7d0JBUUksTSxFQUFRO0FBQ1YsV0FBSyxDQUFMLElBQVUsT0FBTyxDQUFqQjtBQUNBLFdBQUssQ0FBTCxJQUFVLE9BQU8sQ0FBakI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7OzsyQkFRTyxNLEVBQVE7QUFDYixVQUFJLElBQUksS0FBSyxLQUFMLEVBQVI7QUFDQSxhQUFPLEVBQUUsR0FBRixDQUFNLE1BQU4sQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs4QkFRVSxNLEVBQVE7QUFDaEIsYUFBTyxLQUFLLEdBQUwsQ0FBUyxJQUFJLE1BQUosQ0FBVyxNQUFYLEVBQW1CLE1BQW5CLENBQVQsQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7O2lDQVFhLE0sRUFBUTtBQUNuQixVQUFJLElBQUksS0FBSyxLQUFMLEVBQVI7QUFDQSxhQUFPLEVBQUUsU0FBRixDQUFZLE1BQVosQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs2QkFRUyxNLEVBQVE7QUFDZixXQUFLLENBQUwsSUFBVSxPQUFPLENBQWpCO0FBQ0EsV0FBSyxDQUFMLElBQVUsT0FBTyxDQUFqQjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7O2dDQVFZLE0sRUFBUTtBQUNsQixVQUFJLElBQUksS0FBSyxLQUFMLEVBQVI7QUFDQSxhQUFPLEVBQUUsUUFBRixDQUFXLE1BQVgsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OzttQ0FRZSxNLEVBQVE7QUFDckIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxJQUFJLE1BQUosQ0FBVyxNQUFYLEVBQW1CLE1BQW5CLENBQWQsQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7O3NDQVFrQixNLEVBQVE7QUFDeEIsVUFBSSxJQUFJLEtBQUssS0FBTCxFQUFSO0FBQ0EsYUFBTyxFQUFFLGNBQUYsQ0FBaUIsTUFBakIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OzsyQkFRTyxNLEVBQVE7QUFDYixVQUFHLE9BQU8sQ0FBUCxLQUFhLENBQWhCLEVBQW1CO0FBQ2pCLGFBQUssQ0FBTCxJQUFVLE9BQU8sQ0FBakI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0Q7QUFDRCxVQUFHLE9BQU8sQ0FBUCxLQUFhLENBQWhCLEVBQW1CO0FBQ2pCLGFBQUssQ0FBTCxJQUFVLE9BQU8sQ0FBakI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7Ozs4QkFRVSxNLEVBQVE7QUFDaEIsVUFBSSxJQUFJLEtBQUssS0FBTCxFQUFSO0FBQ0EsYUFBTyxFQUFFLE1BQUYsQ0FBUyxNQUFULENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7aUNBUWEsTSxFQUFRO0FBQ25CLFVBQUksSUFBSSxJQUFJLE1BQUosQ0FBVyxNQUFYLEVBQW1CLE1BQW5CLENBQVI7QUFDQSxhQUFPLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7O29DQVFnQixNLEVBQVE7QUFDdEIsVUFBSSxJQUFJLEtBQUssS0FBTCxFQUFSO0FBQ0EsYUFBTyxFQUFFLFlBQUYsQ0FBZSxNQUFmLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7NkJBUVMsTSxFQUFRO0FBQ2YsV0FBSyxDQUFMLElBQVUsT0FBTyxDQUFqQjtBQUNBLFdBQUssQ0FBTCxJQUFVLE9BQU8sQ0FBakI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7OztnQ0FRWSxNLEVBQVE7QUFDbEIsVUFBSSxJQUFJLEtBQUssS0FBTCxFQUFSO0FBQ0EsYUFBTyxFQUFFLFFBQUYsQ0FBVyxNQUFYLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7bUNBUWUsTSxFQUFRO0FBQ3JCLFVBQUksSUFBSSxJQUFJLE1BQUosQ0FBVyxNQUFYLEVBQW1CLE1BQW5CLENBQVI7QUFDQSxhQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7O3NDQVFrQixNLEVBQVE7QUFDeEIsVUFBSSxJQUFJLEtBQUssS0FBTCxFQUFSO0FBQ0EsYUFBTyxFQUFFLGNBQUYsQ0FBaUIsTUFBakIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7MEJBR00sTSxFQUFRO0FBQ1osYUFBTyxLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs2QkFHUyxNLEVBQVE7QUFDZixhQUFPLEtBQUssaUJBQUwsQ0FBdUIsTUFBdkIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OzsyQkFRTyxNLEVBQVE7QUFDZCxVQUFJLElBQUssS0FBSyxDQUFMLEdBQVMsS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFWLEdBQStCLEtBQUssQ0FBTCxHQUFTLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBaEQ7QUFDQSxVQUFJLElBQUssS0FBSyxDQUFMLEdBQVMsS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFWLEdBQStCLEtBQUssQ0FBTCxHQUFTLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBaEQ7O0FBRUQsV0FBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLFdBQUssQ0FBTCxHQUFTLENBQVQ7O0FBRUMsYUFBTyxJQUFQO0FBQ0E7QUFDRDs7Ozs7Ozs7Ozs7OEJBUVUsTSxFQUFRO0FBQ2hCLFVBQUksSUFBSSxLQUFLLEtBQUwsRUFBUjtBQUNBLGFBQU8sRUFBRSxNQUFGLENBQVMsTUFBVCxDQUFQO0FBQ0Q7O0FBRUY7Ozs7Ozs7Ozs7Ozs4QkFTVyxPLEVBQVM7QUFDakIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxnQkFBZ0IsT0FBaEIsQ0FBWixDQUFQO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozs7aUNBUWEsTyxFQUFTO0FBQ3BCLGFBQU8sS0FBSyxTQUFMLENBQWUsZ0JBQWdCLE9BQWhCLENBQWYsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7NkJBR1MsTSxFQUFRO0FBQ2pCLGFBQU8sS0FBSyxNQUFMLENBQVksTUFBWixDQUFQO0FBQ0M7QUFDRDs7Ozs7O2dDQUdZLE0sRUFBUTtBQUNsQixhQUFPLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Z0NBR1ksTyxFQUFTO0FBQ3JCLGFBQU8sS0FBSyxTQUFMLENBQWUsT0FBZixDQUFQO0FBQ0M7QUFDRDs7Ozs7O21DQUdlLE0sRUFBUTtBQUNyQixhQUFPLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7OzZCQVFRLE0sRUFBUTtBQUNoQixhQUFPLEtBQUssTUFBTCxDQUFZLFNBQU8sS0FBSyxLQUF4QixDQUFQO0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Z0NBUVcsTSxFQUFRO0FBQ2pCLFVBQUksSUFBSSxLQUFLLEtBQUwsRUFBUjtBQUNBLGFBQU8sRUFBRSxRQUFGLENBQVcsTUFBWCxDQUFQO0FBQ0Y7Ozs7O0FBRUQ7Ozs7Ozs7OztnQ0FTYSxPLEVBQVM7QUFDbkIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxnQkFBZ0IsT0FBaEIsQ0FBZCxDQUFQO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozs7bUNBUWUsTyxFQUFTO0FBQ3RCLGFBQU8sS0FBSyxXQUFMLENBQWlCLGdCQUFnQixPQUFoQixDQUFqQixDQUFQO0FBQ0Q7O0FBRUY7Ozs7Ozs7Ozs7Z0NBT1k7QUFDWCxhQUFPLEtBQUssWUFBTCxDQUFrQixLQUFLLE1BQXZCLENBQVA7QUFDQTtBQUNEOzs7Ozs7Ozs7O21DQU9lO0FBQ2QsYUFBTyxLQUFLLGVBQUwsQ0FBcUIsS0FBSyxNQUExQixDQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7Ozs2QkFNUyxNLEVBQVE7QUFDaEIsYUFBTyxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsRUFBeUIsTUFBaEM7QUFDQTs7QUFFRDs7Ozs7Ozs7OzhCQU1VLE0sRUFBUTtBQUNqQixhQUFPLEtBQUssQ0FBTCxHQUFTLE9BQU8sQ0FBdkI7QUFDQTs7QUFFRDs7Ozs7Ozs7OzhCQU1VLE0sRUFBUTtBQUNqQixhQUFPLEtBQUssQ0FBTCxHQUFTLE9BQU8sQ0FBdkI7QUFDQTs7QUFHRDs7Ozs7Ozs7Ozs7Ozs7O3dCQVlJLE0sRUFBUTtBQUNYLGFBQVEsS0FBSyxDQUFMLEdBQVMsT0FBTyxDQUFqQixHQUF1QixLQUFLLENBQUwsR0FBUyxPQUFPLENBQTlDO0FBQ0E7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBYU0sTSxFQUFRO0FBQ2IsYUFBUSxLQUFLLENBQUwsR0FBUyxPQUFPLENBQWpCLEdBQXVCLEtBQUssQ0FBTCxHQUFTLE9BQU8sQ0FBOUM7QUFDQTs7QUFHQTs7OztBQUlBOzs7Ozs7Ozs7c0JBTU0sQyxFQUFHO0FBQ1AsVUFBRyxPQUFPLENBQVAsSUFBWSxRQUFmLEVBQXlCO0FBQ3ZCLGFBQUssRUFBTCxHQUFVLENBQVY7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNLElBQUksU0FBSixDQUFjLHNCQUFkLENBQU47QUFDRDtBQUNGLEs7d0JBQ087QUFDTixhQUFPLEtBQUssRUFBTCxJQUFXLENBQWxCO0FBQ0Q7O0FBRUY7Ozs7Ozs7OztzQkFNTyxDLEVBQUc7QUFDUCxVQUFHLE9BQU8sQ0FBUCxJQUFZLFFBQWYsRUFBeUI7QUFDdkIsYUFBSyxFQUFMLEdBQVUsQ0FBVjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU0sSUFBSSxTQUFKLENBQWMsc0JBQWQsQ0FBTjtBQUNEO0FBQ0YsSzt3QkFDTztBQUNOLGFBQU8sS0FBSyxFQUFMLElBQVcsQ0FBbEI7QUFDRDs7QUFFRjs7Ozs7Ozs7OztzQkFPbUIsTSxFQUFRO0FBQ3hCLFVBQUksTUFBSjtBQUNBLFVBQUcsT0FBTyxNQUFQLElBQWlCLFFBQXBCLEVBQThCO0FBQzVCLGlCQUFTLFNBQVMsS0FBSyxhQUF2QjtBQUNBLGFBQUssY0FBTCxDQUFvQixNQUFwQjtBQUNELE9BSEQsTUFHTztBQUNMLGNBQU0sSUFBSSxTQUFKLENBQWMsMkJBQWQsQ0FBTjtBQUNEO0FBQ0YsSzt3QkFDbUI7QUFDbEIsYUFBUSxLQUFLLENBQUwsR0FBUyxLQUFLLENBQWYsR0FBcUIsS0FBSyxDQUFMLEdBQVMsS0FBSyxDQUExQztBQUNEOztBQUVGOzs7Ozs7Ozs7c0JBTVksTSxFQUFRO0FBQ2pCLFVBQUksTUFBSjtBQUNBLFVBQUcsT0FBTyxNQUFQLElBQWlCLFFBQXBCLEVBQThCO0FBQzVCLGlCQUFTLFNBQVMsS0FBSyxNQUF2QjtBQUNBLGFBQUssY0FBTCxDQUFvQixNQUFwQjtBQUNELE9BSEQsTUFHTztBQUNMLGNBQU0sSUFBSSxTQUFKLENBQWMsMkJBQWQsQ0FBTjtBQUNEO0FBQ0YsSzt3QkFDWTtBQUNYLGFBQU8sS0FBSyxJQUFMLENBQVUsS0FBSyxhQUFmLENBQVA7QUFDRDs7QUFFRjs7Ozs7Ozs7O3NCQU1XLE0sRUFBUTtBQUNoQixVQUFHLE9BQU8sTUFBUCxJQUFpQixRQUFwQixFQUE4QjtBQUM1QixhQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTSxJQUFJLFNBQUosQ0FBYywwQkFBZCxDQUFOO0FBQ0Q7QUFDRixLO3dCQUNXO0FBQ1YsYUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLENBQWhCLEVBQW1CLEtBQUssQ0FBeEIsQ0FBUDtBQUNEOztBQUVGOzs7Ozs7Ozs7c0JBTW9CLE8sRUFBUztBQUMxQixVQUFHLE9BQU8sT0FBUCxJQUFrQixRQUFyQixFQUErQjtBQUM3QixhQUFLLFdBQUwsQ0FBaUIsT0FBakI7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNLElBQUksU0FBSixDQUFjLDBCQUFkLENBQU47QUFDRDtBQUNGLEs7d0JBQ29CO0FBQ25CLGFBQU8sZ0JBQWdCLEtBQUssS0FBTCxDQUFXLEtBQUssQ0FBaEIsRUFBbUIsS0FBSyxDQUF4QixDQUFoQixDQUFQO0FBQ0Q7O0FBRUY7Ozs7Ozs7OztzQkFNVSxDLEVBQUc7QUFDWixXQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsSzt3QkFDVztBQUNYLGFBQU8sS0FBSyxDQUFaO0FBQ0E7O0FBRUQ7Ozs7Ozs7OztzQkFNVyxDLEVBQUc7QUFDYixXQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsSzt3QkFDWTtBQUNaLGFBQU8sS0FBSyxDQUFaO0FBQ0E7O0FBRUQ7Ozs7Ozs7Ozt3QkFNVztBQUNWLGFBQU8sS0FBSyxDQUFMLEdBQVMsS0FBSyxDQUFyQjtBQUNBOzs7Ozs7a0JBSWEsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4uLy4uL3NyYy93dGMtdmVjdG9yXCI7XG5cbmNsYXNzIERyYXdpbmdWZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBjb2xvciwgbGluZVdpZHRoID0gMSkge1xuICAgIHRoaXMudiA9IG5ldyBWZWN0b3IoeCwgeSk7XG5cbiAgICB0aGlzLmFycm93aGVhZFYxID0gbmV3IFZlY3RvcigtMTAsLTEwKTtcbiAgICB0aGlzLmFycm93aGVhZFYyID0gbmV3IFZlY3RvcigtMTAsIDEwKTtcblxuICAgIGlmKCB0eXBlb2YgY29sb3IgIT09ICdzdHJpbmcnIHx8ICEoL14jWzAtOUFCQ0RFRmFiY2RlZl0qLy50ZXN0KGNvbG9yKSkgKSB7XG4gICAgICBjb2xvciA9ICcjJyArICgnMCcrKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSoyNTUpKS50b1N0cmluZygxNikpLnN1YnN0cigtMikgKyAoJzAnKyhNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMjU1KSkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpICsgKCcwJysoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjI1NSkpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gIH1cblxuICBkcmF3KHBsYXlncm91bmQpIHtcbiAgICBsZXQgaXNDYXJ0ZXNpYW4gPSBwbGF5Z3JvdW5kLmNhcnRlc2lhbjtcbiAgICBsZXQgdW5pdFggPSBwbGF5Z3JvdW5kLnNjYWxlZFVuaXRWZWN0b3JYOyAvLyBpSGF0XG4gICAgbGV0IHVuaXRZID0gcGxheWdyb3VuZC5zY2FsZWRVbml0VmVjdG9yWTsgLy8gakhhdFxuICAgIGxldCBzY2FsZSA9IHBsYXlncm91bmQuc2NhbGU7XG4gICAgbGV0IG9mZnNldCA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgLy8gR3R0aW5nIHRoZSBvZmZzZXQgb2YgdGhlIHZlY3RvciBhbmQsIGlmIGl0IGhhcyBsZW5ndGgsIHNldHRpbmcgdXAgdGhlXG4gICAgLy8gdHJhbnNsYXRlZCBvZmZzZXRcbiAgICBpZih0aGlzLm9mZnNldCBpbnN0YW5jZW9mIFZlY3Rvcikge1xuICAgICAgbGV0IF9vZmZzZXQgPSB0aGlzLm9mZnNldC5jbG9uZSgpO1xuICAgICAgaWYoaXNDYXJ0ZXNpYW4pIHtcbiAgICAgICAgX29mZnNldC55ICo9IC0xXG4gICAgICB9XG4gICAgICBvZmZzZXQueCA9IChfb2Zmc2V0LnggKiB1bml0WC54KSArIChfb2Zmc2V0LnkgKiB1bml0WS54KTtcbiAgICAgIG9mZnNldC55ID0gKF9vZmZzZXQueCAqIHVuaXRYLnkpICsgKF9vZmZzZXQueSAqIHVuaXRZLnkpO1xuICAgIH1cbiAgICAvLyBBZGRpbmcgdGhlIHBsYXlncm91bmQncyBvZmZzZXQgdG8gaXQgKG9yaWdpbiBwb2ludClcbiAgICBsZXQgcGdPZmZzZXQgPSBwbGF5Z3JvdW5kLm9mZnNldDtcbiAgICAvLyBpZihpc0NhcnRlc2lhbikgcGdPZmZzZXQueSAqPSAtMTsgLy8gcmV2ZXJzaW5nIHRoZSBvdXRwdXQgWSBpZiB3ZSdyZSBzZXQgdG8gY2FydGVzaWFuIGNvb3Jkc1xuICAgIG9mZnNldC5hZGQocGdPZmZzZXQpO1xuICAgIGxldCB4ID0gb2Zmc2V0Lng7XG4gICAgbGV0IHkgPSBvZmZzZXQueTtcbiAgICBsZXQgY3R4ID0gcGxheWdyb3VuZC5tYWluQ3R4O1xuXG4gICAgaWYodGhpcy5vdXRwdXRWZWN0b3IgaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgIGxldCB1bml0WCA9IHBsYXlncm91bmQudW5pdFZlY3RvclguY2xvbmUoKTsgLy8gaUhhdFxuICAgICAgbGV0IHVuaXRZID0gcGxheWdyb3VuZC51bml0VmVjdG9yWS5jbG9uZSgpOyAvLyBqSGF0XG4gICAgICBsZXQgViA9IHRoaXMudi5jbG9uZSgpO1xuXG4gICAgICBpZihpc0NhcnRlc2lhbikge1xuICAgICAgICB1bml0WC55ICo9IC0xOyAvLyByZXZlcnNpbmcgdGhlIG91dHB1dCBZIGlmIHdlJ3JlIHNldCB0byBjYXJ0ZXNpYW4gY29vcmRzXG4gICAgICAgIHVuaXRZLnkgKj0gLTE7XG4gICAgICAgIFYueSAqPSAtMTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vdXRwdXRWZWN0b3IueCA9IChWLnggKiB1bml0WC54KSArIChWLnkgKiB1bml0WS54KTtcbiAgICAgIHRoaXMub3V0cHV0VmVjdG9yLnkgPSAoVi54ICogdW5pdFgueSkgKyAoVi55ICogdW5pdFkueSk7XG4gICAgfVxuXG4gICAgLy8gVHJhbnNsYXRlIHRoZSB2ZWN0b3IgdXNpbmcgbGluZWFyIHRyYW5zZm9ybWF0aW9uIHgow64pICsgeShqKVxuICAgIC8vIMOuID0gdW5peCBYXG4gICAgLy8gaiA9IHVuaXQgWVxuICAgIC8vICBfICAgICAgIF8gICAgXyAgICAgICBfXG4gICAgLy8gfCB4KMOuLngpIHwgKyB8IHkoai54KSB8XG4gICAgLy8gfCB4KGkueSkgfCArIHwgeShqLnkpIHxcbiAgICAvL1xuICAgIGxldCBWID0gdGhpcy52LmNsb25lKCk7XG4gICAgaWYoaXNDYXJ0ZXNpYW4pIHtcbiAgICAgIFYueSAqPSAtMTsgLy8gUmV2ZXJzZSB0aGUgWSBjb29yZCBpZiB0aGlzIGlzIGEgY2FydGVzaWFuIHN5c3RlbVxuICAgIH1cbiAgICBsZXQgdHJhbnNsYXRlZFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgdHJhbnNsYXRlZFZlY3Rvci54ID0gKFYueCAqIHVuaXRYLngpICsgKFYueSAqIHVuaXRZLngpO1xuICAgIHRyYW5zbGF0ZWRWZWN0b3IueSA9IChWLnggKiB1bml0WC55KSArIChWLnkgKiB1bml0WS55KTtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubGluZVdpZHRoID0gdGhpcy5saW5lV2lkdGg7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIHggPSB0cmFuc2xhdGVkVmVjdG9yLnggKyBvZmZzZXQueDtcbiAgICB5ID0gdHJhbnNsYXRlZFZlY3Rvci55ICsgb2Zmc2V0Lnk7XG4gICAgY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgIHRoaXMudHJhbnNsYXRlZFZlY3RvciA9IHRyYW5zbGF0ZWRWZWN0b3I7XG5cbiAgICAvLyBDcmVhdGUgdGhlIGFycm93IGhlYWQgdmVjdG9ycy4gVGhlc2UgYXJlIG5vdCBkZXBlbmRlbnQgdXBvbiB0aGUgdW5pdCB2ZWN0b3JcbiAgICB2YXIgYXYxID0gdGhpcy5hcnJvd2hlYWRWMS5yb3RhdGVOZXcodHJhbnNsYXRlZFZlY3Rvci5hbmdsZSk7XG4gICAgdmFyIGF2MiA9IHRoaXMuYXJyb3doZWFkVjIucm90YXRlTmV3KHRyYW5zbGF0ZWRWZWN0b3IuYW5nbGUpO1xuXG4gICAgLy8gRHJhdyB0aGUgYXJyb3doZWFkXG4gICAgY3R4LmxpbmVUbyhhdjEueCArIHgsIGF2MS55ICsgeSk7XG4gICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICBjdHgubGluZVRvKGF2Mi54ICsgeCwgYXYyLnkgKyB5KTtcblxuICAgIGN0eC5zdHJva2UoKTtcblxuICAgIGxldCBsYWJlbCA9IHRoaXMubGFiZWw7XG4gICAgaWYobGFiZWwpIHtcbiAgICAgIGxldCBsYWJlbFBvaW50ID0gdGhpcy52LmRpdmlkZVNjYWxhck5ldygyKTtcbiAgICAgIGxldCB0ZXh0bG9jID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgICAgIGlmKGlzQ2FydGVzaWFuKSB7XG4gICAgICAgIGxhYmVsUG9pbnQueSAqPSAtMTsgLy8gUmV2ZXJzZSB0aGUgWSBjb29yZCBpZiB0aGlzIGlzIGEgY2FydGVzaWFuIHN5c3RlbVxuICAgICAgfVxuICAgICAgdGV4dGxvYy54ID0gKGxhYmVsUG9pbnQueCAqIHVuaXRYLngpICsgKGxhYmVsUG9pbnQueSAqIHVuaXRZLngpICsgb2Zmc2V0Lng7XG4gICAgICB0ZXh0bG9jLnkgPSAobGFiZWxQb2ludC54ICogdW5pdFgueSkgKyAobGFiZWxQb2ludC55ICogdW5pdFkueSkgKyBvZmZzZXQueTtcblxuICAgICAgY3R4LmZvbnQgPSBcIjEwcHggSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiO1xuICAgICAgbGV0IHRleHRkaW1zID0gY3R4Lm1lYXN1cmVUZXh0KGxhYmVsKTtcbiAgICAgIGxldCBwYWRkaW5nID0gMztcbiAgICAgIHRleHRkaW1zLmhlaWdodCA9IDEwO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuNyknO1xuICAgICAgY3R4LmZpbGxSZWN0KHRleHRsb2MueCAtIHBhZGRpbmcgLSB0ZXh0ZGltcy53aWR0aCAvIDIsIHRleHRsb2MueSAtIHBhZGRpbmcgLSB0ZXh0ZGltcy5oZWlnaHQgLyAyLCB0ZXh0ZGltcy53aWR0aCArIHBhZGRpbmcgKiAyLCB0ZXh0ZGltcy5oZWlnaHQgKyBwYWRkaW5nICogMik7XG4gICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgIGN0eC5maWxsVGV4dChsYWJlbCx0ZXh0bG9jLnggLSB0ZXh0ZGltcy53aWR0aCAvIDIsIHRleHRsb2MueSAtIHRleHRkaW1zLmhlaWdodCAvIDIgKyB0ZXh0ZGltcy5oZWlnaHQgLSB0ZXh0ZGltcy5oZWlnaHQgLyA0KTtcbiAgICB9XG5cbiAgfVxuXG4gIGdldCBwbGF5Z3JvdW5kKCkge1xuICAgIHJldHVybiB0aGlzLl9wZztcbiAgfVxuICBzZXQgcGxheWdyb3VuZChwZykge1xuICAgIHRoaXMuX3BnID0gcGc7XG4gIH1cblxuICBzZXQgY29sb3IoY29sb3IpIHtcbiAgICBpZiggdHlwZW9mIGNvbG9yID09ICdzdHJpbmcnICYmIC9eI1swLTlBQkNERUZhYmNkZWZdKi8udGVzdChjb2xvcikgKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuICAgIH1cbiAgfVxuICBnZXQgY29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yIHx8ICcjRkZGRkZGJztcbiAgfVxuXG4gIHNldCBvZmZzZXQodikge1xuICAgIGlmKCB2IGluc3RhbmNlb2YgVmVjdG9yICkge1xuICAgICAgdGhpcy5fb2Zmc2V0ID0gdjtcbiAgICB9XG4gIH1cbiAgZ2V0IG9mZnNldCgpIHtcbiAgICAvLyBpZiggISh0aGlzLl9vZmZzZXQgaW5zdGFuY2VvZiBWZWN0b3IpICkge1xuICAgIC8vICAgdGhpcy5fb2Zmc2V0ID0gbmV3IFZlY3RvcigwLDApO1xuICAgIC8vIH1cbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0IHx8IGZhbHNlO1xuICB9XG5cbiAgc2V0IGxhYmVsKGxhYmVsKSB7XG4gICAgaWYobGFiZWwpIHtcbiAgICAgIHRoaXMuX2xhYmVsID0gbGFiZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgZ2V0IGxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbCB8fCBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYXdpbmdWZWN0b3I7XG4iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuLi8uLi9zcmMvd3RjLXZlY3RvclwiO1xuaW1wb3J0IERyYXdpbmdWZWN0b3IgZnJvbSBcIi4vRHJhd2luZ1ZlY3RvclwiO1xuaW1wb3J0IGNvbG91cnMgZnJvbSAnLi9jb2xvdXJzJztcblxuY2xhc3MgVmVjdG9yUGxheWdyb3VuZCB7XG4gIHN0YXRpYyBpbml0KGRyYXdpbmcgPSB0cnVlLCBzY2FsZSA9IDEwMCwgZHJhd0dyaWQgPSB0cnVlKSB7XG4gICAgdGhpcy5pbml0aWFsaXNlZCA9IHRydWU7XG5cbiAgICB0aGlzLm1haW5DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLm1haW5DdHggPSB0aGlzLm1haW5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLnNlY29uZGFyeUNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuc2Vjb25kYXJDdHggPSB0aGlzLnNlY29uZGFyeUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1haW5DYW52YXMpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zZWNvbmRhcnlDYW52YXMpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5yZXNpemVMaXN0ZW5lcigpO1xuXG4gICAgdGhpcy52ZWN0b3JzID0gW107XG5cbiAgICB0aGlzLmdyaWREaXN0YW5jZSA9IDE7XG5cbiAgICB0aGlzLmRvRHJhd0dyaWQgPSBkcmF3R3JpZDtcbiAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5kcmF3aW5nID0gZHJhd2luZztcbiAgfVxuXG4gIHN0YXRpYyByZXNpemVMaXN0ZW5lcihlKSB7XG4gICAgdGhpcy5kaW1lbnNpb25zID0gbmV3IFZlY3Rvcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICB0aGlzLm9mZnNldCA9IHRoaXMuZGltZW5zaW9ucy5kaXZpZGVTY2FsYXJOZXcoMik7XG5cbiAgICB0aGlzLm1haW5DYW52YXMud2lkdGggPSB0aGlzLnNlY29uZGFyeUNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMubWFpbkNhbnZhcy5oZWlnaHQgPSB0aGlzLnNlY29uZGFyeUNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIH1cblxuICBzdGF0aWMgYWRkVmVjdG9yKGRyYXdpbmdWZWN0b3IpIHtcbiAgICBpZiggISAoZHJhd2luZ1ZlY3RvciBpbnN0YW5jZW9mIERyYXdpbmdWZWN0b3IpICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudmVjdG9ycy5wdXNoKGRyYXdpbmdWZWN0b3IpO1xuXG4gICAgcmV0dXJuIGRyYXdpbmdWZWN0b3I7XG4gIH1cblxuICBzdGF0aWMgZHJhdygpIHtcbiAgICAvLyBDbGVhciB0aGUgY2FudmFzZXMgYmVmb3JlIGRyYXdpbmdcbiAgICB0aGlzLm1haW5DdHguZmlsbFN0eWxlID0gdGhpcy5iZ0NvbG9yO1xuICAgIHRoaXMubWFpbkN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLm1haW5DdHgucmVjdCgwLDAsIHRoaXMuZGltZW5zaW9ucy53aWR0aCwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XG4gICAgdGhpcy5tYWluQ3R4LmZpbGwoKTtcbiAgICAvLyB0aGlzLnNlY29uZGFyQ3R4LmNsZWFyUmVjdCgwLDAsdGhpcy5tYWluQ2FudmFzLndpZHRoLCB0aGlzLm1haW5DYW52YXMuaGVpZ2h0KTtcblxuICAgIGlmKHRoaXMuZG9EcmF3R3JpZCkgdGhpcy5kcmF3R3JpZCgpO1xuICAgIHRoaXMuZHJhd1ZlY3RvcnMoKTtcblxuICAgIGlmKCB0aGlzLmRyYXdpbmcgKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZHJhdy5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZHJhd1ZlY3RvcnMoKSB7XG4gICAgdGhpcy52ZWN0b3JzLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgdi5kcmF3KHRoaXMpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBzdGF0aWMgZHJhd0dyaWQoKSB7XG4gICAgbGV0IHNjYWxlID0gdGhpcy5zY2FsZTtcbiAgICBsZXQgZ3JpZERpc3RhbmNlID0gdGhpcy5ncmlkRGlzdGFuY2UgKiBzY2FsZTtcblxuICAgIC8vIGRyYXcgdGhlIG1haW4gZ3JpZCBsaW5lc1xuXG4gICAgdGhpcy5tYWluQ3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5tYWluQ3R4LnN0cm9rZVN0eWxlID0gdGhpcy5ncmlkQ29sb3I7XG4gICAgdGhpcy5tYWluQ3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgbGV0IHhQb3MgPSB0aGlzLm9mZnNldC54O1xuICAgIHdoaWxlKHhQb3MgPCB0aGlzLmRpbWVuc2lvbnMud2lkdGgpIHtcbiAgICAgIHhQb3MgKz0gZ3JpZERpc3RhbmNlO1xuICAgICAgdGhpcy5tYWluQ3R4Lm1vdmVUbyh4UG9zLCAwKTtcbiAgICAgIHRoaXMubWFpbkN0eC5saW5lVG8oeFBvcywgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XG4gICAgfVxuICAgIHhQb3MgPSB0aGlzLm9mZnNldC54O1xuICAgIHdoaWxlKHhQb3MgPiAwKSB7XG4gICAgICB4UG9zIC09IGdyaWREaXN0YW5jZTtcbiAgICAgIHRoaXMubWFpbkN0eC5tb3ZlVG8oeFBvcywgMCk7XG4gICAgICB0aGlzLm1haW5DdHgubGluZVRvKHhQb3MsIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgIH1cbiAgICBsZXQgeVBvcyA9IHRoaXMub2Zmc2V0Lnk7XG4gICAgd2hpbGUoeVBvcyA8IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpIHtcbiAgICAgIHlQb3MgKz0gZ3JpZERpc3RhbmNlO1xuICAgICAgdGhpcy5tYWluQ3R4Lm1vdmVUbygwLCB5UG9zKTtcbiAgICAgIHRoaXMubWFpbkN0eC5saW5lVG8odGhpcy5kaW1lbnNpb25zLndpZHRoLCB5UG9zKTtcbiAgICB9XG4gICAgeVBvcyA9IHRoaXMub2Zmc2V0Lnk7XG4gICAgd2hpbGUoeVBvcyA+IDApIHtcbiAgICAgIHlQb3MgLT0gZ3JpZERpc3RhbmNlO1xuICAgICAgdGhpcy5tYWluQ3R4Lm1vdmVUbygwLCB5UG9zKTtcbiAgICAgIHRoaXMubWFpbkN0eC5saW5lVG8odGhpcy5kaW1lbnNpb25zLndpZHRoLCB5UG9zKTtcbiAgICB9XG4gICAgdGhpcy5tYWluQ3R4LnN0cm9rZSgpO1xuXG5cbiAgICB0aGlzLm1haW5DdHguc3Ryb2tlU3R5bGUgPSB0aGlzLm9yaWdpbkNvbG9yO1xuICAgIHRoaXMubWFpbkN0eC5iZWdpblBhdGgoKTtcblxuICAgIHRoaXMubWFpbkN0eC5tb3ZlVG8oMCwgdGhpcy5vZmZzZXQueSk7XG4gICAgdGhpcy5tYWluQ3R4LmxpbmVUbyh0aGlzLmRpbWVuc2lvbnMud2lkdGgsIHRoaXMub2Zmc2V0LnkpO1xuICAgIHRoaXMubWFpbkN0eC5tb3ZlVG8odGhpcy5vZmZzZXQueCwgMCk7XG4gICAgdGhpcy5tYWluQ3R4LmxpbmVUbyh0aGlzLm9mZnNldC54LCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgIHRoaXMubWFpbkN0eC5zdHJva2UoKTtcblxuICB9XG5cbiAgc3RhdGljIHNldCBkcmF3aW5nKGQpIHtcbiAgICB0aGlzLl9kcmF3aW5nID0gZCA9PT0gdHJ1ZTtcblxuICAgIGlmKHRoaXMuX2RyYXdpbmcgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuZHJhdygpO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IGRyYXdpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYXdpbmcgPT09IHRydWU7XG4gIH1cblxuICBzdGF0aWMgc2V0IGJnQ29sb3IoY29sb3IpIHtcbiAgICBpZiggdHlwZW9mIGNvbG9yID09ICdzdHJpbmcnICYmICAvI1swLTlBQkNERUZdezZ9Ly50ZXN0KGNvbG9yLnRvVXBwZXJDYXNlKCkpKSB7XG4gICAgICB0aGlzLl9iZ0NvbG9yID0gY29sb3I7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgYmdDb2xvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYmdDb2xvciB8fCAnIzI4MkMzNCc7XG4gIH1cblxuICBzdGF0aWMgc2V0IG9yaWdpbkNvbG9yKGNvbG9yKSB7XG4gICAgaWYoIHR5cGVvZiBjb2xvciA9PSAnc3RyaW5nJyAmJiAgLyNbMC05QUJDREVGXXs2fS8udGVzdChjb2xvci50b1VwcGVyQ2FzZSgpKSkge1xuICAgICAgdGhpcy5fb3JpZ2luQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBvcmlnaW5Db2xvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luQ29sb3IgfHwgJyNGRkZGRkYnO1xuICB9XG5cbiAgc3RhdGljIHNldCBncmlkQ29sb3IoY29sb3IpIHtcbiAgICBpZiggdHlwZW9mIGNvbG9yID09ICdzdHJpbmcnICYmICAvI1swLTlBQkNERUZdezZ9Ly50ZXN0KGNvbG9yLnRvVXBwZXJDYXNlKCkpKSB7XG4gICAgICB0aGlzLl9ncmlkQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBncmlkQ29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWRDb2xvciB8fCAnIzY2NjY2Nic7XG4gIH1cblxuICBzdGF0aWMgc2V0IHVuaXRWZWN0b3JYKHYpIHtcbiAgICBpZiggdiBpbnN0YW5jZW9mIFZlY3RvciApIHtcbiAgICAgIHRoaXMuX3VuaXRWZWN0b3JYID0gdlxuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IHVuaXRWZWN0b3JYKCkge1xuICAgIHJldHVybiB0aGlzLl91bml0VmVjdG9yWCB8fCBuZXcgVmVjdG9yKDEsIDApO1xuICB9XG4gIHN0YXRpYyBnZXQgc2NhbGVkVW5pdFZlY3RvclgoKSB7XG4gICAgbGV0IHNjYWxlID0gdGhpcy5zY2FsZTtcbiAgICBsZXQgdXYgPSB0aGlzLnVuaXRWZWN0b3JYLmNsb25lKCk7XG4gICAgaWYoc2NhbGUgIT09IDEpIHV2Lm11bHRpcGx5U2NhbGFyKHNjYWxlKTtcbiAgICByZXR1cm4gdXY7XG4gIH1cblxuICBzdGF0aWMgc2V0IHVuaXRWZWN0b3JZKHYpIHtcbiAgICBpZiggdiBpbnN0YW5jZW9mIFZlY3RvciApIHtcbiAgICAgIHRoaXMuX3VuaXRWZWN0b3JZID0gdlxuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IHVuaXRWZWN0b3JZKCkge1xuICAgIHJldHVybiB0aGlzLl91bml0VmVjdG9yWSB8fCBuZXcgVmVjdG9yKDAsIDEpO1xuICB9XG4gIHN0YXRpYyBnZXQgc2NhbGVkVW5pdFZlY3RvclkoKSB7XG4gICAgbGV0IHNjYWxlID0gdGhpcy5zY2FsZTtcbiAgICBsZXQgdXYgPSB0aGlzLnVuaXRWZWN0b3JZLmNsb25lKCk7XG4gICAgaWYoc2NhbGUgIT09IDEpIHV2Lm11bHRpcGx5U2NhbGFyKHNjYWxlKTtcbiAgICByZXR1cm4gdXY7XG4gIH1cblxuICBzdGF0aWMgc2V0IGRpbWVuc2lvbnMoZGltcykge1xuICAgIGlmKGRpbXMgaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBkaW1zO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IGRpbWVuc2lvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnMgfHwgbmV3IFZlY3RvcigpO1xuICB9XG5cbiAgc3RhdGljIHNldCBvZmZzZXQoZGltcykge1xuICAgIGlmKGRpbXMgaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgIHRoaXMuX29mZnNldCA9IGRpbXM7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgb2Zmc2V0KCkge1xuICAgIGxldCBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgbmV3IFZlY3RvcigpO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBzdGF0aWMgc2V0IHNjYWxlKHNjYWxlKSB7XG4gICAgaWYodHlwZW9mIHNjYWxlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBzY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGUgfHwgMTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgZG9EcmF3R3JpZChkcmF3R3JpZCkge1xuICAgIHRoaXMuX2RyYXdHcmlkID0gZHJhd0dyaWQgPT09IHRydWU7XG4gIH1cbiAgc3RhdGljIGdldCBkb0RyYXdHcmlkKCkge1xuICAgIHJldHVybiB0aGlzLl9kcmF3R3JpZCB8fCBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgY2FydGVzaWFuKGlzQ2FydGVzaWFuKSB7XG4gICAgdGhpcy5pc0NhcnRlc2lhbiA9IGlzQ2FydGVzaWFuID09PSB0cnVlO1xuICB9XG4gIHN0YXRpYyBnZXQgY2FydGVzaWFuKCkge1xuICAgIHJldHVybiB0aGlzLmlzQ2FydGVzaWFuIHx8IGZhbHNlO1xuICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBWZWN0b3JQbGF5Z3JvdW5kO1xuIiwiXG5sZXQgY29sb3VycyA9IFsnI2M2NzhkZCcsICcjOThjMzc5JywgJyNjMzQ0NDgnLCAnIzRlOWM5ZScsICcjZDE4NTQ5JywgJyNhYmIyYmYnXTtcbmxldCBuYW1lZENvbG91cnMgPSB7XG4gIHNpbHZlcjogJyNDQ0NDQ0MnXG59O1xuZXhwb3J0IHsgY29sb3VycywgbmFtZWRDb2xvdXJzIH1cbiIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4uL3NyYy93dGMtdmVjdG9yXCI7XG5pbXBvcnQgRHJhd2luZ1ZlY3RvciBmcm9tIFwiLi9hcHAvRHJhd2luZ1ZlY3RvclwiO1xuaW1wb3J0IFZlY3RvclBsYXlncm91bmQgZnJvbSBcIi4vYXBwL1ZlY3RvclBsYXlncm91bmRcIjtcbmltcG9ydCB7Y29sb3Vyc30gZnJvbSAnLi9hcHAvY29sb3Vycyc7XG5cbndpbmRvdy5WZWN0b3IgPSBWZWN0b3I7XG5cbmxldCBzZXR0aW5ncyA9IHtcbiAgYW5pbWF0aW5nOiBmYWxzZVxufVxud2luZG93LnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbmZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9ICdsb2FkaW5nJyl7XG4gICAgZm4oKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZm4pO1xuICB9XG59XG5cbnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gIGxldCB2YSA9IG5ldyBEcmF3aW5nVmVjdG9yKC0yLCAtMiwgY29sb3Vyc1swXSk7XG4gIGxldCB2YiA9IG5ldyBEcmF3aW5nVmVjdG9yKDEsIDEsIGNvbG91cnNbMV0pO1xuICBzZXR0aW5ncy52YSA9IHZhLnY7XG4gIHNldHRpbmdzLnZiID0gdmIudjtcblxuICAvLyBJbml0aWFsbGlzaW5nIHRoZSB3b3JsZFxuICBWZWN0b3JQbGF5Z3JvdW5kLmluaXQoKTtcblxuICAvLyBBZGQgdGhlIHZlY3RvcnMgdG8gc3RhZ2VcbiAgVmVjdG9yUGxheWdyb3VuZC5hZGRWZWN0b3IodmEpO1xuICBWZWN0b3JQbGF5Z3JvdW5kLmFkZFZlY3Rvcih2Yik7XG5cbiAgLy8gQW5pbWF0aW9uXG4gIGxldCB1cGRhdGUgPSBmdW5jdGlvbigpIHtcblxuICAgIGlmKHNldHRpbmdzLmFuaW1hdGluZykge1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIGFuZ2xlIG9mIHRoZSB2ZWN0b3JcbiAgICAgIHZhLnYuYW5nbGUgKz0gMC4wMTtcblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGUoKTtcblxuICAvLyBTZXQgdXAgdGhlIGRhdCBndWlcbiAgdmFyIGd1aSA9IG5ldyBkYXQuR1VJKCk7XG4gIHZhciBhbmltYXRpb25Db250cm9sID0gZ3VpLmFkZChzZXR0aW5ncywgJ2FuaW1hdGluZycpO1xuICBhbmltYXRpb25Db250cm9sLm9uQ2hhbmdlKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYodmFsdWUgPT0gdHJ1ZSkge1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuICB9KTtcbiAgbGV0IF92YSA9IGd1aS5hZGRGb2xkZXIoJ1ZlY3RvciBBJyk7XG4gIGxldCB1bml0WF94ID0gX3ZhLmFkZChzZXR0aW5ncy52YSwgJ194JykubGlzdGVuKCk7XG4gIGxldCB1bml0WF95ID0gX3ZhLmFkZChzZXR0aW5ncy52YSwgJ195JykubGlzdGVuKCk7XG4gIGxldCBfdmIgPSBndWkuYWRkRm9sZGVyKCdWZWN0b3IgQicpO1xuICBsZXQgdW5pdFlfeCA9IF92Yi5hZGQoc2V0dGluZ3MudmIsICd4JykubGlzdGVuKCk7XG4gIGxldCB1bml0WV95ID0gX3ZiLmFkZChzZXR0aW5ncy52YiwgJ3knKS5saXN0ZW4oKTtcbiAgX3ZhLm9wZW4oKTtcbiAgX3ZiLm9wZW4oKTtcbn0pO1xuIiwiY29uc3QgY29udmVyc2lvbkZhY3RvciA9IDE4MCAvIE1hdGguUEk7XG5cbnZhciByYWRpYW5Ub0RlZ3JlZXMgPSBmdW5jdGlvbihyYWRpYW4pIHtcblx0cmV0dXJuIHJhZGlhbiAqIGNvbnZlcnNpb25GYWN0b3I7XG59XG5cbnZhciBkZWdyZWVzVG9SYWRpYW4gPSBmdW5jdGlvbihkZWdyZWVzKSB7XG5cdHJldHVybiBkZWdyZWVzIC8gY29udmVyc2lvbkZhY3Rvcjtcbn1cblxuLyoqXG4gKiBBIGJhc2ljIDJEIFZlY3RvciBjbGFzcyB0aGF0IHByb3ZpZGVzIHNpbXBsZSBhbGdlYnJhaWMgZnVuY3Rpb25hbGl0eSBpbiB0aGUgZm9ybVxuICogb2YgMkQgVmVjdG9ycy5cbiAqXG4gKiBXZSB1c2UgR2V0dGVycy9zZXR0ZXJzIGZvciBib3RoIHByaW5jaXBsZSBwcm9wZXJ0aWVzICh4ICYgeSkgYXMgd2VsbCBhcyB2aXJ0dWFsXG4gKiBwcm9wZXJ0aWVzIChyb3RhdGlvbiwgbGVuZ3RoIGV0Yy4pLlxuICpcbiAqIEBjbGFzcyBWZWN0b3JcbiAqIEBhdXRob3IgTGlhbSBFZ2FuIDxsaWFtQHdldGhlY29sbGVjdGl2ZS5jb20+XG4gKiBAdmVyc2lvbiAwLjEuMVxuICogQGNyZWF0ZWQgRGVjIDE5LCAyMDE2XG4gKi9cbmNsYXNzIFZlY3RvciB7XG5cblx0LyoqXG5cdCAqIFRoZSBWZWN0b3IgQ2xhc3MgY29uc3RydWN0b3Jcblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IFx0XHRcdFx0VGhlIHggY29vcmRcblx0ICogQHBhcmFtIHtudW1iZXJ9IHkgXHRcdFx0XHRUaGUgeSBjb29yZFxuXHQgKi9cbiAgY29uc3RydWN0b3IoeCwgeSl7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgdmVjdG9yIGNvb3JkaW5hdGVzXG4gICAqXG4gICAqIEBwdWJsaWNcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggXHRcdFx0XHRUaGUgeCBjb29yZFxuXHQgKiBAcGFyYW0ge251bWJlcn0geSBcdFx0XHRcdFRoZSB5IGNvb3JkXG4gICAqL1xuXHRyZXNldCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lcyB0aGUgdmVjdG9yXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRUaGUgY2xvbmVkIHZlY3RvclxuXHQgKi9cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgb25lIHZlY3RvciB0byBhbm90aGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gYWRkIHRvIHRoaXMgb25lXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBhZGQodmVjdG9yKSB7XG4gICAgdGhpcy54ICs9IHZlY3Rvci54O1xuICAgIHRoaXMueSArPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIGFkZHMgdGhlIHZlY3RvciB0byBpdCBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBhZGQgdG8gdGhpcyBvbmVcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBhZGROZXcodmVjdG9yKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuYWRkKHZlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHNjYWxhciB0byB0aGUgdmVjdG9yLCBtb2RpZnlpbmcgYm90aCB0aGUgeCBhbmQgeVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gYWRkIHRvIHRoZSB2ZWN0b3JcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGFkZFNjYWxhcihzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5hZGQobmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcikpO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgYWRkcyB0aGUgc2NhbGFyIHRvIGl0IGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZCB0byB0aGUgdmVjdG9yXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgYWRkU2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmFkZFNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gYW5vdGhlci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHN1YnRyYWN0KHZlY3Rvcikge1xuICAgIHRoaXMueCAtPSB2ZWN0b3IueDtcbiAgICB0aGlzLnkgLT0gdmVjdG9yLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBzdWJ0cmFjdHMgdGhlIHZlY3RvciBmcm9tIGl0IGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBzdWJ0cmFjdE5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5zdWJ0cmFjdCh2ZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBhIHNjYWxhciBmcm9tIHRoZSB2ZWN0b3IsIG1vZGlmeWluZyBib3RoIHRoZSB4IGFuZCB5XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBzdWJ0cmFjdCBmcm9tIHRoZSB2ZWN0b3JcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHN1YnRyYWN0U2NhbGFyKHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLnN1YnRyYWN0KG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpKTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHN1YnRyYWN0cyB0aGUgc2NhbGFyIGZyb20gaXQgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gYWRkIHRvIHRoZSB2ZWN0b3JcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBzdWJ0cmFjdFNjYWxhck5ldyhzY2FsYXIpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5zdWJ0cmFjdFNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpdmlkZXMgb25lIHZlY3RvciBieSBhbm90aGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIHRoaXMgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGRpdmlkZSh2ZWN0b3IpIHtcbiAgICBpZih2ZWN0b3IueCAhPT0gMCkge1xuICAgICAgdGhpcy54IC89IHZlY3Rvci54XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueCA9IDA7XG4gICAgfVxuICAgIGlmKHZlY3Rvci55ICE9PSAwKSB7XG4gICAgICB0aGlzLnkgLz0gdmVjdG9yLnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy55ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBkaXZpZGVzIGl0IGJ5IHRoZSB2ZWN0b3IgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIHRoZSBjbG9uZSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGRpdmlkZU5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5kaXZpZGUodmVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGVzIHRoZSB2ZWN0b3IgYnkgYSBzY2FsYXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBkaXZpZGUgYm90aCB4IGFuZCB5IGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBkaXZpZGVTY2FsYXIoc2NhbGFyKSB7XG4gICAgdmFyIHYgPSBuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKTtcbiAgICByZXR1cm4gdGhpcy5kaXZpZGUodik7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBkaXZpZGVzIGl0IGJ5IHRoZSBwcm92aWRlZCBzY2FsYXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBkaXZpZGUgYm90aCB4IGFuZCB5IGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgZGl2aWRlU2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmRpdmlkZVNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgb25lIHZlY3RvciBieSBhbm90aGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gbXVsdGlwbHkgdGhpcyBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgbXVsdGlwbHkodmVjdG9yKSB7XG4gICAgdGhpcy54ICo9IHZlY3Rvci54O1xuICAgIHRoaXMueSAqPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIG11bHRpcGxpZXMgaXQgYnkgdGhlIHZlY3RvciBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGUgY2xvbmUgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBtdWx0aXBseU5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5tdWx0aXBseSh2ZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgdGhlIHZlY3RvciBieSBhIHNjYWxhci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IGJvdGggeCBhbmQgeSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgbXVsdGlwbHlTY2FsYXIoc2NhbGFyKSB7XG4gICAgdmFyIHYgPSBuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKTtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseSh2KTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIG11bHRpcGxpZXMgaXQgYnkgdGhlIHByb3ZpZGVkIHNjYWxhci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IGJvdGggeCBhbmQgeSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIG11bHRpcGx5U2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2Lm11bHRpcGx5U2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNtdWx0aXBseVNjYWxhcl9fYW5jaG9yIG11bHRpcGx5U2NhbGFyfVxuICAgKi9cbiAgc2NhbGUoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoc2NhbGFyKTtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNtdWx0aXBseVNjYWxhck5ld19fYW5jaG9yIG11bHRpcGx5U2NhbGFyTmV3fVxuICAgKi9cbiAgc2NhbGVOZXcoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXJOZXcoc2NhbGFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgdmVjb3IgYnkgYSBnaXZlbiBhbW91bnQsIHByb3ZpZGVkIGluIHJhZGlhbnMuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICByYWRpYW4gVGhlIGFuZ2xlLCBpbiByYWRpYW5zLCB0byByb3RhdGUgdGhlIHZlY3RvciBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgcm90YXRlKHJhZGlhbikge1xuICBcdHZhciB4ID0gKHRoaXMueCAqIE1hdGguY29zKHJhZGlhbikpIC0gKHRoaXMueSAqIE1hdGguc2luKHJhZGlhbikpO1xuICBcdHZhciB5ID0gKHRoaXMueCAqIE1hdGguc2luKHJhZGlhbikpICsgKHRoaXMueSAqIE1hdGguY29zKHJhZGlhbikpO1xuXG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXG4gIFx0cmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCByb3RhdGVzIGl0IGJ5IHRoZSBzdXBwbGllZCByYWRpYW4gdmFsdWVcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHJhZGlhbiBUaGUgYW5nbGUsIGluIHJhZGlhbnMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgcm90YXRlTmV3KHJhZGlhbikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnJvdGF0ZShyYWRpYW4pO1xuICB9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgYSB2ZWNvciBieSBhIGdpdmVuIGFtb3VudCwgcHJvdmlkZWQgaW4gZGVncmVlcy4gQ29udmVydHMgdGhlIGRlZ3JlZVxuXHQgKiB2YWx1ZSB0byByYWRpYW5zIGFuZCBydW5zIHRoZSByb3RhZXQgbWV0aG9kLlxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqIEBjaGFpbmFibGVcblx0ICogQHBhcmFtICB7bnVtYmVyfSAgZGVncmVlcyBUaGUgYW5nbGUsIGluIGRlZ3JlZXMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5XG5cdCAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcblx0ICovXG4gIHJvdGF0ZURlZyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlKGRlZ3JlZXNUb1JhZGlhbihkZWdyZWVzKSk7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCByb3RhdGVzIGl0IGJ5IHRoZSBzdXBwbGllZCBkZWdyZWUgdmFsdWVcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG5cdCAqIEBwYXJhbSAge251bWJlcn0gIGRlZ3JlZXMgVGhlIGFuZ2xlLCBpbiBkZWdyZWVzLCB0byByb3RhdGUgdGhlIHZlY3RvciBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdCBSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICByb3RhdGVEZWdOZXcoZGVncmVlcykge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZU5ldyhkZWdyZWVzVG9SYWRpYW4oZGVncmVlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3Ijcm90YXRlX19hbmNob3Igcm90YXRlfVxuICAgKi9cbiAgcm90YXRlQnkocmFkaWFuKSB7XG5cdFx0cmV0dXJuIHRoaXMucm90YXRlKHJhZGlhbik7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3Ijcm90YXRlTmV3X19hbmNob3Igcm90YXRlTmV3fVxuICAgKi9cbiAgcm90YXRlQnlOZXcocmFkaWFuKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlTmV3KHJhZGlhbik7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNyb3RhdGVEZWdfX2FuY2hvciByb3RhdGVEZWd9XG4gICAqL1xuICByb3RhdGVEZWdCeShkZWdyZWVzKSB7XG5cdFx0cmV0dXJuIHRoaXMucm90YXRlRGVnKGRlZ3JlZXMpO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI3JvdGF0ZURlZ05ld19fYW5jaG9yIHJvdGF0ZURlZ05ld31cbiAgICovXG4gIHJvdGF0ZURlZ0J5TmV3KHJhZGlhbikge1xuICAgIHJldHVybiB0am9zLnJvdGF0ZURlZ05ldyhyYWRpYW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSB2ZWN0b3IgdG8gYSBzcGVjaWZpYyBhbmdsZVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgcmFkaWFuIFRoZSBhbmdsZSwgaW4gcmFkaWFucywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgdG9cbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG5cdHJvdGF0ZVRvKHJhZGlhbikge1xuXHRcdHJldHVybiB0aGlzLnJvdGF0ZShyYWRpYW4tdGhpcy5hbmdsZSk7XG5cdH07XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgcm90YXRlcyBpdCB0byB0aGUgc3VwcGxpZWQgcmFkaWFuIHZhbHVlXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICByYWRpYW4gVGhlIGFuZ2xlLCBpbiByYWRpYW5zLCB0byByb3RhdGUgdGhlIHZlY3RvciB0b1xuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG5cdHJvdGF0ZVRvTmV3KHJhZGlhbikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnJvdGF0ZVRvKHJhZGlhbik7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgYSB2ZWNvciB0byBhIGdpdmVuIGFtb3VudCwgcHJvdmlkZWQgaW4gZGVncmVlcy4gQ29udmVydHMgdGhlIGRlZ3JlZVxuXHQgKiB2YWx1ZSB0byByYWRpYW5zIGFuZCBydW5zIHRoZSByb3RhdGVUbyBtZXRob2QuXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICogQGNoYWluYWJsZVxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9ICBkZWdyZWVzIFRoZSBhbmdsZSwgaW4gZGVncmVlcywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgdG9cblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuXHQgKi9cbiAgcm90YXRlVG9EZWcoZGVncmVlcykge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZVRvKGRlZ3JlZXNUb1JhZGlhbihkZWdyZWVzKSk7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCByb3RhdGVzIGl0IHRvIHRoZSBzdXBwbGllZCBkZWdyZWUgdmFsdWVcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG5cdCAqIEBwYXJhbSAge251bWJlcn0gIGRlZ3JlZXMgVGhlIGFuZ2xlLCBpbiBkZWdyZWVzLCB0byByb3RhdGUgdGhlIHZlY3RvciB0b1xuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdCBSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICByb3RhdGVUb0RlZ05ldyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlVG9OZXcoZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpKTtcbiAgfVxuXG5cdC8qKlxuXHQgKiBOb3JtYWxpc2VzIHRoZSB2ZWN0b3IgZG93biB0byBhIGxlbmd0aCBvZiAxIHVuaXRcblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKiBAY2hhaW5hYmxlXG5cdCAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG5cdCAqL1xuXHRub3JtYWxpc2UoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKHRoaXMubGVuZ3RoKTtcblx0fVxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIG5vcm1hbGlzZXMgaXRcblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKiBAY2hhaW5hYmxlXG5cdCAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBhIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcblx0ICovXG5cdG5vcm1hbGlzZU5ldygpIHtcblx0XHRyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXJOZXcodGhpcy5sZW5ndGgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhpcyBhbmQgdGhlIHN1cHBsaWVkIHZlY3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gIHtWZWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgZnJvbVxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqL1xuXHRkaXN0YW5jZSh2ZWN0b3IpIHtcblx0XHRyZXR1cm4gdGhpcy5zdWJ0cmFjdE5ldyh2ZWN0b3IpLmxlbmd0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBvbiB0aGUgWCBheGlzIGJldHdlZW4gdGhpcyBhbmQgdGhlIHN1cHBsaWVkIHZlY3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gIHtWZWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgZnJvbVxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBUaGUgZGlzdGFuY2UsIGFsb25nIHRoZSB4IGF4aXMsIGJldHdlZW4gdGhpcyBhbmQgdGhlIHN1cHBsaWVkIHZlY3RvclxuXHQgKi9cblx0ZGlzdGFuY2VYKHZlY3Rvcikge1xuXHRcdHJldHVybiB0aGlzLnggLSB2ZWN0b3IueDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVkIHRoZSBkaXN0YW5jZSBvbiB0aGUgWSBheGlzIGJldHdlZW4gdGhpcyBhbmQgdGhlIHN1cHBsaWVkIHZlY3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gIHtWZWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgZnJvbVxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBUaGUgZGlzdGFuY2UsIGFsb25nIHRoZSB5IGF4aXMsIGJldHdlZW4gdGhpcyBhbmQgdGhlIHN1cHBsaWVkIHZlY3RvclxuXHQgKi9cblx0ZGlzdGFuY2VZKHZlY3Rvcikge1xuXHRcdHJldHVybiB0aGlzLnkgLSB2ZWN0b3IueTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IGJldHdlZW4gdGhpcyBhbmQgYSBzdXBwbGllZCB2ZWN0b3Jcblx0ICpcblx0ICogQGV4YW1wbGVcblx0ICogLy8gcmV0dXJucyAtMTRcblx0ICogbmV3IFZlY3RvcigyLCAtMykuZG90KG5ldyBWZWN0b3IoLTQsIDIpKVxuXHQgKiBuZXcgVmVjdG9yKC00LCAyKS5kb3QobmV3IFZlY3RvcigyLCAtMykpXG5cdCAqIG5ldyBWZWN0b3IoMiwgLTQpLmRvdChuZXcgVmVjdG9yKC0zLCAyKSlcblx0ICpcblx0ICogQHBhcmFtICB7VmVjdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciBvYmplY3QgYWdhaW5zdCB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGRvdCBwcm9kdWN0XG5cdCAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgdHdvIHZlY3RvcnNcblx0ICovXG5cdGRvdCh2ZWN0b3IpIHtcblx0XHRyZXR1cm4gKHRoaXMueCAqIHZlY3Rvci54KSArICh0aGlzLnkgKiB2ZWN0b3IueSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzdXBwbGllZCB2ZWN0b3IuXG5cdCAqXG5cdCAqIEBleGFtcGxlXG5cdCAqIC8vIHJldHVybnMgLTJcblx0ICogbmV3IFZlY3RvcigyLCAtMykuY3Jvc3MobmV3IFZlY3RvcigtNCwgMikpXG5cdCAqIG5ldyBWZWN0b3IoLTQsIDIpLmNyb3NzKG5ldyBWZWN0b3IoMiwgLTMpKVxuXHQgKiAvLyByZXR1cm5zIDJcblx0ICogbmV3IFZlY3RvcigyLCAtNCkuY3Jvc3MobmV3IFZlY3RvcigtMywgMikpXG5cdCAqXG5cdCAqIEBwYXJhbSAge1ZlY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3Igb2JqZWN0IGFnYWluc3Qgd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBjcm9zcyBwcm9kdWN0XG5cdCAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFRoZSBjcm9zcyBwcm9kdWN0IG9mIHRoZSB0d28gdmVjdG9yc1xuXHQgKi9cblx0Y3Jvc3ModmVjdG9yKSB7XG5cdFx0cmV0dXJuICh0aGlzLnggKiB2ZWN0b3IueCkgLSAodGhpcy55ICogdmVjdG9yLnkpO1xuXHR9XG5cblxuICAvKipcbiAgICogR2V0dGVycyBhbmQgc2V0dGVyc1xuICAgKi9cblxuICAvKipcbiAgICogKGdldHRlci9zZXR0ZXIpIFRoZSB4IHZhbHVlIG9mIHRoZSB2ZWN0b3IuXG4gICAqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHNldCB4KHgpIHtcbiAgICBpZih0eXBlb2YgeCA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5feCA9IHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ggc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCB4KCkge1xuICAgIHJldHVybiB0aGlzLl94IHx8IDA7XG4gIH1cblxuIC8qKlxuXHQqIChnZXR0ZXIvc2V0dGVyKSBUaGUgeSB2YWx1ZSBvZiB0aGUgdmVjdG9yLlxuXHQqXG5cdCogQHR5cGUge251bWJlcn1cblx0KiBAZGVmYXVsdCAwXG5cdCovXG4gIHNldCB5KHkpIHtcbiAgICBpZih0eXBlb2YgeSA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5feSA9IHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1kgc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCB5KCkge1xuICAgIHJldHVybiB0aGlzLl95IHx8IDA7XG4gIH1cblxuXHQvKipcblx0KiAoZ2V0dGVyL3NldHRlcikgVGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yIHByZXNlbnRlZCBhcyBhIHNxdWFyZS4gSWYgeW91J3JlIHVzaW5nXG5cdCogbGVuZ3RoIGZvciBjb21wYXJpc29uLCB0aGlzIGlzIHF1aWNrZXIuXG5cdCpcblx0KiBAdHlwZSB7bnVtYmVyfVxuXHQqIEBkZWZhdWx0IDBcblx0Ki9cbiAgc2V0IGxlbmd0aFNxdWFyZWQobGVuZ3RoKSB7XG4gICAgdmFyIGZhY3RvcjtcbiAgICBpZih0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInKSB7XG4gICAgICBmYWN0b3IgPSBsZW5ndGggLyB0aGlzLmxlbmd0aFNxdWFyZWQ7XG4gICAgICB0aGlzLm11bHRpcGx5U2NhbGFyKGZhY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xlbmd0aCBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGxlbmd0aFNxdWFyZWQoKSB7XG4gICAgcmV0dXJuICh0aGlzLnggKiB0aGlzLngpICsgKHRoaXMueSAqIHRoaXMueSk7XG4gIH1cblxuXHQvKipcblx0KiAoZ2V0dGVyL3NldHRlcikgVGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yXG5cdCpcblx0KiBAdHlwZSB7bnVtYmVyfVxuXHQqIEBkZWZhdWx0IDBcblx0Ki9cbiAgc2V0IGxlbmd0aChsZW5ndGgpIHtcbiAgICB2YXIgZmFjdG9yO1xuICAgIGlmKHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicpIHtcbiAgICAgIGZhY3RvciA9IGxlbmd0aCAvIHRoaXMubGVuZ3RoO1xuICAgICAgdGhpcy5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdsZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbmd0aFNxdWFyZWQpO1xuICB9XG5cblx0LyoqXG5cdCogKGdldHRlci9zZXR0ZXIpIFRoZSBhbmdsZSBvZiB0aGUgdmVjdG9yLCBpbiByYWRpYW5zXG5cdCpcblx0KiBAdHlwZSB7bnVtYmVyfVxuXHQqIEBkZWZhdWx0IDBcblx0Ki9cbiAgc2V0IGFuZ2xlKHJhZGlhbikge1xuICAgIGlmKHR5cGVvZiByYWRpYW4gPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucm90YXRlVG8ocmFkaWFuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYW5nbGUgc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCBhbmdsZSgpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gIH1cblxuXHQvKipcblx0KiAoZ2V0dGVyL3NldHRlcikgVGhlIGFuZ2xlIG9mIHRoZSB2ZWN0b3IsIGluIHJhZGlhbnNcblx0KlxuXHQqIEB0eXBlIHtudW1iZXJ9XG5cdCogQGRlZmF1bHQgMFxuXHQqL1xuICBzZXQgYW5nbGVJbkRlZ3JlZXMoZGVncmVlcykge1xuICAgIGlmKHR5cGVvZiBkZWdyZWVzID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnJvdGF0ZVRvRGVnKGRlZ3JlZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhbmdsZSBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFuZ2xlSW5EZWdyZWVzKCkge1xuICAgIHJldHVybiByYWRpYW5Ub0RlZ3JlZXMoTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCkpO1xuICB9XG5cblx0LyoqXG5cdCAqIChnZXR0ZXIvc2V0dGVyKSBWZWN0b3Igd2lkdGguXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3IjeCB4fVxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c2V0IHdpZHRoKHcpIHtcblx0XHR0aGlzLnggPSB3O1xuXHR9XG5cdGdldCB3aWR0aCgpIHtcblx0XHRyZXR1cm4gdGhpcy54O1xuXHR9XG5cblx0LyoqXG5cdCAqIChnZXR0ZXIvc2V0dGVyKSBWZWN0b3IgaGVpZ2h0LlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI3ggeH1cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHNldCBoZWlnaHQoaCkge1xuXHRcdHRoaXMueSA9IGg7XG5cdH1cblx0Z2V0IGhlaWdodCgpIHtcblx0XHRyZXR1cm4gdGhpcy55O1xuXHR9XG5cblx0LyoqXG5cdCAqIChnZXR0ZXIvc2V0dGVyKSBWZWN0b3IgYXJlYS5cblx0ICogQHJlYWRvbmx5XG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRnZXQgYXJlYSgpIHtcblx0XHRyZXR1cm4gdGhpcy54ICogdGhpcy55O1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yO1xuIl19

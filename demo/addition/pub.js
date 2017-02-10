(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _wtcVector = require("../../src/wtc-vector");

var _wtcVector2 = _interopRequireDefault(_wtcVector);

var _DrawingVector = require("../app/DrawingVector");

var _DrawingVector2 = _interopRequireDefault(_DrawingVector);

var _VectorPlayground = require("../app/VectorPlayground");

var _VectorPlayground2 = _interopRequireDefault(_VectorPlayground);

var _colours = require("../app/colours");

var _colours2 = _interopRequireDefault(_colours);

var _datGui = require("dat-gui");

var _datGui2 = _interopRequireDefault(_datGui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Vector = _wtcVector2.default;

var settings = {
  animating: false
};

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(function () {

  var va = new _DrawingVector2.default(100, -200, _colours2.default[0]);
  var vb = new _DrawingVector2.default(-300, 100, _colours2.default[1]);
  vb.offset = va.v;
  var vc = new _DrawingVector2.default(0, 0, '#CCCCCC');
  vc.v = va.v.addNew(vb.v);
  var vd = new _DrawingVector2.default(0, 0, '#777777');
  vd.v = va.v.subtractNew(vb.v);

  _VectorPlayground2.default.init();
  _VectorPlayground2.default.addVector(vc);
  _VectorPlayground2.default.addVector(va);
  _VectorPlayground2.default.addVector(vb);
  _VectorPlayground2.default.addVector(vd);

  var update = function update() {

    if (settings.animating) {

      // Update the angle of the vector
      va.v.angle += 0.01;

      // Update Vector C based on the addition of the two components
      vc.v = va.v.addNew(vb.v);

      // Update Vector D based on the addition of the two components
      vd.v = va.v.subtractNew(vb.v);

      requestAnimationFrame(update);
    }
  };

  update();

  var gui = new _datGui2.default.GUI();
  var animationControl = gui.add(settings, 'animating');
  animationControl.onChange(function (value) {
    if (value == true) {
      update();
    }
  });
});

},{"../../src/wtc-vector":8,"../app/DrawingVector":2,"../app/VectorPlayground":3,"../app/colours":4,"dat-gui":5}],2:[function(require,module,exports){
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

},{"../../src/wtc-vector":8}],3:[function(require,module,exports){
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

},{"../../src/wtc-vector":8,"./DrawingVector":2,"./colours":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var colours = ['#c678dd', '#98c379', '#c34448', '#4e9c9e', '#d18549', '#abb2bf'];
var namedColours = {};
exports.colours = colours;
exports.namedColours = namedColours;

},{}],5:[function(require,module,exports){
module.exports = require('./vendor/dat.gui')
module.exports.color = require('./vendor/dat.color')
},{"./vendor/dat.color":6,"./vendor/dat.gui":7}],6:[function(require,module,exports){
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.color = dat.color || {};

/** @namespace */
dat.utils = dat.utils || {};

dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.Color = dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common),
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common);
},{}],7:[function(require,module,exports){
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.gui = dat.gui || {};

/** @namespace */
dat.utils = dat.utils || {};

/** @namespace */
dat.controllers = dat.controllers || {};

/** @namespace */
dat.dom = dat.dom || {};

/** @namespace */
dat.color = dat.color || {};

dat.utils.css = (function () {
  return {
    load: function (url, doc) {
      doc = doc || document;
      var link = doc.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      doc.getElementsByTagName('head')[0].appendChild(link);
    },
    inject: function(css, doc) {
      doc = doc || document;
      var injected = document.createElement('style');
      injected.type = 'text/css';
      injected.innerHTML = css;
      doc.getElementsByTagName('head')[0].appendChild(injected);
    }
  }
})();


dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.controllers.Controller = (function (common) {

  /**
   * @class An "abstract" class that represents a given property of an object.
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var Controller = function(object, property) {

    this.initialValue = object[property];

    /**
     * Those who extend this class will put their DOM elements in here.
     * @type {DOMElement}
     */
    this.domElement = document.createElement('div');

    /**
     * The object to manipulate
     * @type {Object}
     */
    this.object = object;

    /**
     * The name of the property to manipulate
     * @type {String}
     */
    this.property = property;

    /**
     * The function to be called on change.
     * @type {Function}
     * @ignore
     */
    this.__onChange = undefined;

    /**
     * The function to be called on finishing change.
     * @type {Function}
     * @ignore
     */
    this.__onFinishChange = undefined;

  };

  common.extend(

      Controller.prototype,

      /** @lends dat.controllers.Controller.prototype */
      {

        /**
         * Specify that a function fire every time someone changes the value with
         * this Controller.
         *
         * @param {Function} fnc This function will be called whenever the value
         * is modified via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onChange: function(fnc) {
          this.__onChange = fnc;
          return this;
        },

        /**
         * Specify that a function fire every time someone "finishes" changing
         * the value wih this Controller. Useful for values that change
         * incrementally like numbers or strings.
         *
         * @param {Function} fnc This function will be called whenever
         * someone "finishes" changing the value via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onFinishChange: function(fnc) {
          this.__onFinishChange = fnc;
          return this;
        },

        /**
         * Change the value of <code>object[property]</code>
         *
         * @param {Object} newValue The new value of <code>object[property]</code>
         */
        setValue: function(newValue) {
          this.object[this.property] = newValue;
          if (this.__onChange) {
            this.__onChange.call(this, newValue);
          }
          this.updateDisplay();
          return this;
        },

        /**
         * Gets the value of <code>object[property]</code>
         *
         * @returns {Object} The current value of <code>object[property]</code>
         */
        getValue: function() {
          return this.object[this.property];
        },

        /**
         * Refreshes the visual display of a Controller in order to keep sync
         * with the object's current value.
         * @returns {dat.controllers.Controller} this
         */
        updateDisplay: function() {
          return this;
        },

        /**
         * @returns {Boolean} true if the value has deviated from initialValue
         */
        isModified: function() {
          return this.initialValue !== this.getValue()
        }

      }

  );

  return Controller;


})(dat.utils.common);


dat.dom.dom = (function (common) {

  var EVENT_MAP = {
    'HTMLEvents': ['change'],
    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
    'KeyboardEvents': ['keydown']
  };

  var EVENT_MAP_INV = {};
  common.each(EVENT_MAP, function(v, k) {
    common.each(v, function(e) {
      EVENT_MAP_INV[e] = k;
    });
  });

  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

  function cssValueToPixels(val) {

    if (val === '0' || common.isUndefined(val)) return 0;

    var match = val.match(CSS_VALUE_PIXELS);

    if (!common.isNull(match)) {
      return parseFloat(match[1]);
    }

    // TODO ...ems? %?

    return 0;

  }

  /**
   * @namespace
   * @member dat.dom
   */
  var dom = {

    /**
     * 
     * @param elem
     * @param selectable
     */
    makeSelectable: function(elem, selectable) {

      if (elem === undefined || elem.style === undefined) return;

      elem.onselectstart = selectable ? function() {
        return false;
      } : function() {
      };

      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
      elem.unselectable = selectable ? 'on' : 'off';

    },

    /**
     *
     * @param elem
     * @param horizontal
     * @param vertical
     */
    makeFullscreen: function(elem, horizontal, vertical) {

      if (common.isUndefined(horizontal)) horizontal = true;
      if (common.isUndefined(vertical)) vertical = true;

      elem.style.position = 'absolute';

      if (horizontal) {
        elem.style.left = 0;
        elem.style.right = 0;
      }
      if (vertical) {
        elem.style.top = 0;
        elem.style.bottom = 0;
      }

    },

    /**
     *
     * @param elem
     * @param eventType
     * @param params
     */
    fakeEvent: function(elem, eventType, params, aux) {
      params = params || {};
      var className = EVENT_MAP_INV[eventType];
      if (!className) {
        throw new Error('Event type ' + eventType + ' not supported.');
      }
      var evt = document.createEvent(className);
      switch (className) {
        case 'MouseEvents':
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false,
              params.cancelable || true, window, params.clickCount || 1,
              0, //screen X
              0, //screen Y
              clientX, //client X
              clientY, //client Y
              false, false, false, false, 0, null);
          break;
        case 'KeyboardEvents':
          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
          common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false,
              params.cancelable, window,
              params.ctrlKey, params.altKey,
              params.shiftKey, params.metaKey,
              params.keyCode, params.charCode);
          break;
        default:
          evt.initEvent(eventType, params.bubbles || false,
              params.cancelable || true);
          break;
      }
      common.defaults(evt, aux);
      elem.dispatchEvent(evt);
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    bind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.addEventListener)
        elem.addEventListener(event, func, bool);
      else if (elem.attachEvent)
        elem.attachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    unbind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.removeEventListener)
        elem.removeEventListener(event, func, bool);
      else if (elem.detachEvent)
        elem.detachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    addClass: function(elem, className) {
      if (elem.className === undefined) {
        elem.className = className;
      } else if (elem.className !== className) {
        var classes = elem.className.split(/ +/);
        if (classes.indexOf(className) == -1) {
          classes.push(className);
          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
        }
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    removeClass: function(elem, className) {
      if (className) {
        if (elem.className === undefined) {
          // elem.className = className;
        } else if (elem.className === className) {
          elem.removeAttribute('class');
        } else {
          var classes = elem.className.split(/ +/);
          var index = classes.indexOf(className);
          if (index != -1) {
            classes.splice(index, 1);
            elem.className = classes.join(' ');
          }
        }
      } else {
        elem.className = undefined;
      }
      return dom;
    },

    hasClass: function(elem, className) {
      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
    },

    /**
     *
     * @param elem
     */
    getWidth: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-left-width']) +
          cssValueToPixels(style['border-right-width']) +
          cssValueToPixels(style['padding-left']) +
          cssValueToPixels(style['padding-right']) +
          cssValueToPixels(style['width']);
    },

    /**
     *
     * @param elem
     */
    getHeight: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-top-width']) +
          cssValueToPixels(style['border-bottom-width']) +
          cssValueToPixels(style['padding-top']) +
          cssValueToPixels(style['padding-bottom']) +
          cssValueToPixels(style['height']);
    },

    /**
     *
     * @param elem
     */
    getOffset: function(elem) {
      var offset = {left: 0, top:0};
      if (elem.offsetParent) {
        do {
          offset.left += elem.offsetLeft;
          offset.top += elem.offsetTop;
        } while (elem = elem.offsetParent);
      }
      return offset;
    },

    // http://stackoverflow.com/posts/2684561/revisions
    /**
     * 
     * @param elem
     */
    isActive: function(elem) {
      return elem === document.activeElement && ( elem.type || elem.href );
    }

  };

  return dom;

})(dat.utils.common);


dat.controllers.OptionController = (function (Controller, dom, common) {

  /**
   * @class Provides a select input to alter the property of an object, using a
   * list of accepted values.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object|string[]} options A map of labels to acceptable values, or
   * a list of acceptable string values.
   *
   * @member dat.controllers
   */
  var OptionController = function(object, property, options) {

    OptionController.superclass.call(this, object, property);

    var _this = this;

    /**
     * The drop down menu
     * @ignore
     */
    this.__select = document.createElement('select');

    if (common.isArray(options)) {
      var map = {};
      common.each(options, function(element) {
        map[element] = element;
      });
      options = map;
    }

    common.each(options, function(value, key) {

      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);

    });

    // Acknowledge original value
    this.updateDisplay();

    dom.bind(this.__select, 'change', function() {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });

    this.domElement.appendChild(this.__select);

  };

  OptionController.superclass = Controller;

  common.extend(

      OptionController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          return toReturn;
        },

        updateDisplay: function() {
          this.__select.value = this.getValue();
          return OptionController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return OptionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberController = (function (Controller, common) {

  /**
   * @class Represents a given property of an object that is a number.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberController = function(object, property, params) {

    NumberController.superclass.call(this, object, property);

    params = params || {};

    this.__min = params.min;
    this.__max = params.max;
    this.__step = params.step;

    if (common.isUndefined(this.__step)) {

      if (this.initialValue == 0) {
        this.__impliedStep = 1; // What are we, psychics?
      } else {
        // Hey Doug, check this out.
        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
      }

    } else {

      this.__impliedStep = this.__step;

    }

    this.__precision = numDecimals(this.__impliedStep);


  };

  NumberController.superclass = Controller;

  common.extend(

      NumberController.prototype,
      Controller.prototype,

      /** @lends dat.controllers.NumberController.prototype */
      {

        setValue: function(v) {

          if (this.__min !== undefined && v < this.__min) {
            v = this.__min;
          } else if (this.__max !== undefined && v > this.__max) {
            v = this.__max;
          }

          if (this.__step !== undefined && v % this.__step != 0) {
            v = Math.round(v / this.__step) * this.__step;
          }

          return NumberController.superclass.prototype.setValue.call(this, v);

        },

        /**
         * Specify a minimum value for <code>object[property]</code>.
         *
         * @param {Number} minValue The minimum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        min: function(v) {
          this.__min = v;
          return this;
        },

        /**
         * Specify a maximum value for <code>object[property]</code>.
         *
         * @param {Number} maxValue The maximum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        max: function(v) {
          this.__max = v;
          return this;
        },

        /**
         * Specify a step value that dat.controllers.NumberController
         * increments by.
         *
         * @param {Number} stepValue The step value for
         * dat.controllers.NumberController
         * @default if minimum and maximum specified increment is 1% of the
         * difference otherwise stepValue is 1
         * @returns {dat.controllers.NumberController} this
         */
        step: function(v) {
          this.__step = v;
          return this;
        }

      }

  );

  function numDecimals(x) {
    x = x.toString();
    if (x.indexOf('.') > -1) {
      return x.length - x.indexOf('.') - 1;
    } else {
      return 0;
    }
  }

  return NumberController;

})(dat.controllers.Controller,
dat.utils.common);


dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {

  /**
   * @class Represents a given property of an object that is a number and
   * provides an input element with which to manipulate it.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerBox = function(object, property, params) {

    this.__truncationSuspended = false;

    NumberControllerBox.superclass.call(this, object, property, params);

    var _this = this;

    /**
     * {Number} Previous mouse y position
     * @ignore
     */
    var prev_y;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    // Makes it so manually specified values are not truncated.

    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'mousedown', onMouseDown);
    dom.bind(this.__input, 'keydown', function(e) {

      // When pressing entire, you can be as precise as you want.
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
      }

    });

    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!common.isNaN(attempted)) _this.setValue(attempted);
    }

    function onBlur() {
      onChange();
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prev_y = e.clientY;
    }

    function onMouseDrag(e) {

      var diff = prev_y - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prev_y = e.clientY;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  NumberControllerBox.superclass = NumberController;

  common.extend(

      NumberControllerBox.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {

          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  function roundToDecimal(value, decimals) {
    var tenTo = Math.pow(10, decimals);
    return Math.round(value * tenTo) / tenTo;
  }

  return NumberControllerBox;

})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {

  /**
   * @class Represents a given property of an object that is a number, contains
   * a minimum and maximum, and provides a slider element with which to
   * manipulate it. It should be noted that the slider element is made up of
   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
   * <code>&lt;slider&gt;</code> element.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   * 
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Number} minValue Minimum allowed value
   * @param {Number} maxValue Maximum allowed value
   * @param {Number} stepValue Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerSlider = function(object, property, min, max, step) {

    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });

    var _this = this;

    this.__background = document.createElement('div');
    this.__foreground = document.createElement('div');
    


    dom.bind(this.__background, 'mousedown', onMouseDown);
    
    dom.addClass(this.__background, 'slider');
    dom.addClass(this.__foreground, 'slider-fg');

    function onMouseDown(e) {

      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);

      onMouseDrag(e);
    }

    function onMouseDrag(e) {

      e.preventDefault();

      var offset = dom.getOffset(_this.__background);
      var width = dom.getWidth(_this.__background);
      
      _this.setValue(
        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
      );

      return false;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.__background.appendChild(this.__foreground);
    this.domElement.appendChild(this.__background);

  };

  NumberControllerSlider.superclass = NumberController;

  /**
   * Injects default stylesheet for slider elements.
   */
  NumberControllerSlider.useDefaultStyles = function() {
    css.inject(styleSheet);
  };

  common.extend(

      NumberControllerSlider.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {
          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
          this.__foreground.style.width = pct*100+'%';
          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
        }

      }



  );

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

  return NumberControllerSlider;
  
})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.css,
dat.utils.common,
".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");


dat.controllers.FunctionController = (function (Controller, dom, common) {

  /**
   * @class Provides a GUI interface to fire a specified method, a property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var FunctionController = function(object, property, text) {

    FunctionController.superclass.call(this, object, property);

    var _this = this;

    this.__button = document.createElement('div');
    this.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(this.__button, 'click', function(e) {
      e.preventDefault();
      _this.fire();
      return false;
    });

    dom.addClass(this.__button, 'button');

    this.domElement.appendChild(this.__button);


  };

  FunctionController.superclass = Controller;

  common.extend(

      FunctionController.prototype,
      Controller.prototype,
      {
        
        fire: function() {
          if (this.__onChange) {
            this.__onChange.call(this);
          }
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.getValue().call(this.object);
        }
      }

  );

  return FunctionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.BooleanController = (function (Controller, dom, common) {

  /**
   * @class Provides a checkbox input to alter the boolean property of an object.
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var BooleanController = function(object, property) {

    BooleanController.superclass.call(this, object, property);

    var _this = this;
    this.__prev = this.getValue();

    this.__checkbox = document.createElement('input');
    this.__checkbox.setAttribute('type', 'checkbox');


    dom.bind(this.__checkbox, 'change', onChange, false);

    this.domElement.appendChild(this.__checkbox);

    // Match original value
    this.updateDisplay();

    function onChange() {
      _this.setValue(!_this.__prev);
    }

  };

  BooleanController.superclass = Controller;

  common.extend(

      BooleanController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.__prev = this.getValue();
          return toReturn;
        },

        updateDisplay: function() {
          
          if (this.getValue() === true) {
            this.__checkbox.setAttribute('checked', 'checked');
            this.__checkbox.checked = true;    
          } else {
              this.__checkbox.checked = false;
          }

          return BooleanController.superclass.prototype.updateDisplay.call(this);

        }


      }

  );

  return BooleanController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common);


dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {

  css.inject(styleSheet);

  /** Outer-most className for GUI's */
  var CSS_NAMESPACE = 'dg';

  var HIDE_KEY_CODE = 72;

  /** The only value shared between the JS and SCSS. Use caution. */
  var CLOSE_BUTTON_HEIGHT = 20;

  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

  var SUPPORTS_LOCAL_STORAGE = (function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  })();

  var SAVE_DIALOGUE;

  /** Have we yet to create an autoPlace GUI? */
  var auto_place_virgin = true;

  /** Fixed position div that auto place GUI's go inside */
  var auto_place_container;

  /** Are we hiding the GUI's ? */
  var hide = false;

  /** GUI's which should be hidden */
  var hideable_guis = [];

  /**
   * A lightweight controller library for JavaScript. It allows you to easily
   * manipulate variables and fire functions on the fly.
   * @class
   *
   * @member dat.gui
   *
   * @param {Object} [params]
   * @param {String} [params.name] The name of this GUI.
   * @param {Object} [params.load] JSON object representing the saved state of
   * this GUI.
   * @param {Boolean} [params.auto=true]
   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
   * @param {Boolean} [params.closed] If true, starts closed
   */
  var GUI = function(params) {

    var _this = this;

    /**
     * Outermost DOM Element
     * @type DOMElement
     */
    this.domElement = document.createElement('div');
    this.__ul = document.createElement('ul');
    this.domElement.appendChild(this.__ul);

    dom.addClass(this.domElement, CSS_NAMESPACE);

    /**
     * Nested GUI's by name
     * @ignore
     */
    this.__folders = {};

    this.__controllers = [];

    /**
     * List of objects I'm remembering for save, only used in top level GUI
     * @ignore
     */
    this.__rememberedObjects = [];

    /**
     * Maps the index of remembered objects to a map of controllers, only used
     * in top level GUI.
     *
     * @private
     * @ignore
     *
     * @example
     * [
     *  {
     *    propertyName: Controller,
     *    anotherPropertyName: Controller
     *  },
     *  {
     *    propertyName: Controller
     *  }
     * ]
     */
    this.__rememberedObjectIndecesToControllers = [];

    this.__listening = [];

    params = params || {};

    // Default parameters
    params = common.defaults(params, {
      autoPlace: true,
      width: GUI.DEFAULT_WIDTH
    });

    params = common.defaults(params, {
      resizable: params.autoPlace,
      hideable: params.autoPlace
    });


    if (!common.isUndefined(params.load)) {

      // Explicit preset
      if (params.preset) params.load.preset = params.preset;

    } else {

      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };

    }

    if (common.isUndefined(params.parent) && params.hideable) {
      hideable_guis.push(this);
    }

    // Only root level GUI's are resizable.
    params.resizable = common.isUndefined(params.parent) && params.resizable;


    if (params.autoPlace && common.isUndefined(params.scrollable)) {
      params.scrollable = true;
    }
//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

    // Not part of params because I don't want people passing this in via
    // constructor. Should be a 'remembered' value.
    var use_local_storage =
        SUPPORTS_LOCAL_STORAGE &&
            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

    Object.defineProperties(this,

        /** @lends dat.gui.GUI.prototype */
        {

          /**
           * The parent <code>GUI</code>
           * @type dat.gui.GUI
           */
          parent: {
            get: function() {
              return params.parent;
            }
          },

          scrollable: {
            get: function() {
              return params.scrollable;
            }
          },

          /**
           * Handles <code>GUI</code>'s element placement for you
           * @type Boolean
           */
          autoPlace: {
            get: function() {
              return params.autoPlace;
            }
          },

          /**
           * The identifier for a set of saved values
           * @type String
           */
          preset: {

            get: function() {
              if (_this.parent) {
                return _this.getRoot().preset;
              } else {
                return params.load.preset;
              }
            },

            set: function(v) {
              if (_this.parent) {
                _this.getRoot().preset = v;
              } else {
                params.load.preset = v;
              }
              setPresetSelectIndex(this);
              _this.revert();
            }

          },

          /**
           * The width of <code>GUI</code> element
           * @type Number
           */
          width: {
            get: function() {
              return params.width;
            },
            set: function(v) {
              params.width = v;
              setWidth(_this, v);
            }
          },

          /**
           * The name of <code>GUI</code>. Used for folders. i.e
           * a folder's name
           * @type String
           */
          name: {
            get: function() {
              return params.name;
            },
            set: function(v) {
              // TODO Check for collisions among sibling folders
              params.name = v;
              if (title_row_name) {
                title_row_name.innerHTML = params.name;
              }
            }
          },

          /**
           * Whether the <code>GUI</code> is collapsed or not
           * @type Boolean
           */
          closed: {
            get: function() {
              return params.closed;
            },
            set: function(v) {
              params.closed = v;
              if (params.closed) {
                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
              } else {
                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
              }
              // For browsers that aren't going to respect the CSS transition,
              // Lets just check our height against the window height right off
              // the bat.
              this.onResize();

              if (_this.__closeButton) {
                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
              }
            }
          },

          /**
           * Contains all presets
           * @type Object
           */
          load: {
            get: function() {
              return params.load;
            }
          },

          /**
           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
           * <code>remember</code>ing
           * @type Boolean
           */
          useLocalStorage: {

            get: function() {
              return use_local_storage;
            },
            set: function(bool) {
              if (SUPPORTS_LOCAL_STORAGE) {
                use_local_storage = bool;
                if (bool) {
                  dom.bind(window, 'unload', saveToLocalStorage);
                } else {
                  dom.unbind(window, 'unload', saveToLocalStorage);
                }
                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
              }
            }

          }

        });

    // Are we a root level GUI?
    if (common.isUndefined(params.parent)) {

      params.closed = false;

      dom.addClass(this.domElement, GUI.CLASS_MAIN);
      dom.makeSelectable(this.domElement, false);

      // Are we supposed to be loading locally?
      if (SUPPORTS_LOCAL_STORAGE) {

        if (use_local_storage) {

          _this.useLocalStorage = true;

          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

          if (saved_gui) {
            params.load = JSON.parse(saved_gui);
          }

        }

      }

      this.__closeButton = document.createElement('div');
      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
      this.domElement.appendChild(this.__closeButton);

      dom.bind(this.__closeButton, 'click', function() {

        _this.closed = !_this.closed;


      });


      // Oh, you're a nested GUI!
    } else {

      if (params.closed === undefined) {
        params.closed = true;
      }

      var title_row_name = document.createTextNode(params.name);
      dom.addClass(title_row_name, 'controller-name');

      var title_row = addRow(_this, title_row_name);

      var on_click_title = function(e) {
        e.preventDefault();
        _this.closed = !_this.closed;
        return false;
      };

      dom.addClass(this.__ul, GUI.CLASS_CLOSED);

      dom.addClass(title_row, 'title');
      dom.bind(title_row, 'click', on_click_title);

      if (!params.closed) {
        this.closed = false;
      }

    }

    if (params.autoPlace) {

      if (common.isUndefined(params.parent)) {

        if (auto_place_virgin) {
          auto_place_container = document.createElement('div');
          dom.addClass(auto_place_container, CSS_NAMESPACE);
          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(auto_place_container);
          auto_place_virgin = false;
        }

        // Put it in the dom for you.
        auto_place_container.appendChild(this.domElement);

        // Apply the auto styles
        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);

      }


      // Make it not elastic.
      if (!this.parent) setWidth(_this, params.width);

    }

    dom.bind(window, 'resize', function() { _this.onResize() });
    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
    this.onResize();


    if (params.resizable) {
      addResizeHandle(this);
    }

    function saveToLocalStorage() {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }

    var root = _this.getRoot();
    function resetWidth() {
        var root = _this.getRoot();
        root.width += 1;
        common.defer(function() {
          root.width -= 1;
        });
      }

      if (!params.parent) {
        resetWidth();
      }

  };

  GUI.toggleHide = function() {

    hide = !hide;
    common.each(hideable_guis, function(gui) {
      gui.domElement.style.zIndex = hide ? -999 : 999;
      gui.domElement.style.opacity = hide ? 0 : 1;
    });
  };

  GUI.CLASS_AUTO_PLACE = 'a';
  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
  GUI.CLASS_MAIN = 'main';
  GUI.CLASS_CONTROLLER_ROW = 'cr';
  GUI.CLASS_TOO_TALL = 'taller-than-window';
  GUI.CLASS_CLOSED = 'closed';
  GUI.CLASS_CLOSE_BUTTON = 'close-button';
  GUI.CLASS_DRAG = 'drag';

  GUI.DEFAULT_WIDTH = 245;
  GUI.TEXT_CLOSED = 'Close Controls';
  GUI.TEXT_OPEN = 'Open Controls';

  dom.bind(window, 'keydown', function(e) {

    if (document.activeElement.type !== 'text' &&
        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
      GUI.toggleHide();
    }

  }, false);

  common.extend(

      GUI.prototype,

      /** @lends dat.gui.GUI */
      {

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.Controller} The new controller that was added.
         * @instance
         */
        add: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
              }
          );

        },

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.ColorController} The new controller that was added.
         * @instance
         */
        addColor: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                color: true
              }
          );

        },

        /**
         * @param controller
         * @instance
         */
        remove: function(controller) {

          // TODO listening?
          this.__ul.removeChild(controller.__li);
          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
          var _this = this;
          common.defer(function() {
            _this.onResize();
          });

        },

        destroy: function() {

          if (this.autoPlace) {
            auto_place_container.removeChild(this.domElement);
          }

        },

        /**
         * @param name
         * @returns {dat.gui.GUI} The new folder.
         * @throws {Error} if this GUI already has a folder by the specified
         * name
         * @instance
         */
        addFolder: function(name) {

          // We have to prevent collisions on names in order to have a key
          // by which to remember saved values
          if (this.__folders[name] !== undefined) {
            throw new Error('You already have a folder in this GUI by the' +
                ' name "' + name + '"');
          }

          var new_gui_params = { name: name, parent: this };

          // We need to pass down the autoPlace trait so that we can
          // attach event listeners to open/close folder actions to
          // ensure that a scrollbar appears if the window is too short.
          new_gui_params.autoPlace = this.autoPlace;

          // Do we have saved appearance data for this folder?

          if (this.load && // Anything loaded?
              this.load.folders && // Was my parent a dead-end?
              this.load.folders[name]) { // Did daddy remember me?

            // Start me closed if I was closed
            new_gui_params.closed = this.load.folders[name].closed;

            // Pass down the loaded data
            new_gui_params.load = this.load.folders[name];

          }

          var gui = new GUI(new_gui_params);
          this.__folders[name] = gui;

          var li = addRow(this, gui.domElement);
          dom.addClass(li, 'folder');
          return gui;

        },

        open: function() {
          this.closed = false;
        },

        close: function() {
          this.closed = true;
        },

        onResize: function() {

          var root = this.getRoot();

          if (root.scrollable) {

            var top = dom.getOffset(root.__ul).top;
            var h = 0;

            common.each(root.__ul.childNodes, function(node) {
              if (! (root.autoPlace && node === root.__save_row))
                h += dom.getHeight(node);
            });

            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
            } else {
              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = 'auto';
            }

          }

          if (root.__resize_handle) {
            common.defer(function() {
              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
            });
          }

          if (root.__closeButton) {
            root.__closeButton.style.width = root.width + 'px';
          }

        },

        /**
         * Mark objects for saving. The order of these objects cannot change as
         * the GUI grows. When remembering new objects, append them to the end
         * of the list.
         *
         * @param {Object...} objects
         * @throws {Error} if not called on a top level GUI.
         * @instance
         */
        remember: function() {

          if (common.isUndefined(SAVE_DIALOGUE)) {
            SAVE_DIALOGUE = new CenteredDiv();
            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
          }

          if (this.parent) {
            throw new Error("You can only call remember on a top level GUI.");
          }

          var _this = this;

          common.each(Array.prototype.slice.call(arguments), function(object) {
            if (_this.__rememberedObjects.length == 0) {
              addSaveMenu(_this);
            }
            if (_this.__rememberedObjects.indexOf(object) == -1) {
              _this.__rememberedObjects.push(object);
            }
          });

          if (this.autoPlace) {
            // Set save row width
            setWidth(this, this.width);
          }

        },

        /**
         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
         * @instance
         */
        getRoot: function() {
          var gui = this;
          while (gui.parent) {
            gui = gui.parent;
          }
          return gui;
        },

        /**
         * @returns {Object} a JSON object representing the current state of
         * this GUI as well as its remembered properties.
         * @instance
         */
        getSaveObject: function() {

          var toReturn = this.load;

          toReturn.closed = this.closed;

          // Am I remembering any values?
          if (this.__rememberedObjects.length > 0) {

            toReturn.preset = this.preset;

            if (!toReturn.remembered) {
              toReturn.remembered = {};
            }

            toReturn.remembered[this.preset] = getCurrentPreset(this);

          }

          toReturn.folders = {};
          common.each(this.__folders, function(element, key) {
            toReturn.folders[key] = element.getSaveObject();
          });

          return toReturn;

        },

        save: function() {

          if (!this.load.remembered) {
            this.load.remembered = {};
          }

          this.load.remembered[this.preset] = getCurrentPreset(this);
          markPresetModified(this, false);

        },

        saveAs: function(presetName) {

          if (!this.load.remembered) {

            // Retain default values upon first save
            this.load.remembered = {};
            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);

          }

          this.load.remembered[presetName] = getCurrentPreset(this);
          this.preset = presetName;
          addPresetOption(this, presetName, true);

        },

        revert: function(gui) {

          common.each(this.__controllers, function(controller) {
            // Make revert work on Default.
            if (!this.getRoot().load.remembered) {
              controller.setValue(controller.initialValue);
            } else {
              recallSavedValue(gui || this.getRoot(), controller);
            }
          }, this);

          common.each(this.__folders, function(folder) {
            folder.revert(folder);
          });

          if (!gui) {
            markPresetModified(this.getRoot(), false);
          }


        },

        listen: function(controller) {

          var init = this.__listening.length == 0;
          this.__listening.push(controller);
          if (init) updateDisplays(this.__listening);

        }

      }

  );

  function add(gui, object, property, params) {

    if (object[property] === undefined) {
      throw new Error("Object " + object + " has no property \"" + property + "\"");
    }

    var controller;

    if (params.color) {

      controller = new ColorController(object, property);

    } else {

      var factoryArgs = [object,property].concat(params.factoryArgs);
      controller = controllerFactory.apply(gui, factoryArgs);

    }

    if (params.before instanceof Controller) {
      params.before = params.before.__li;
    }

    recallSavedValue(gui, controller);

    dom.addClass(controller.domElement, 'c');

    var name = document.createElement('span');
    dom.addClass(name, 'property-name');
    name.innerHTML = controller.property;

    var container = document.createElement('div');
    container.appendChild(name);
    container.appendChild(controller.domElement);

    var li = addRow(gui, container, params.before);

    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
    dom.addClass(li, typeof controller.getValue());

    augmentController(gui, li, controller);

    gui.__controllers.push(controller);

    return controller;

  }

  /**
   * Add a row to the end of the GUI or before another row.
   *
   * @param gui
   * @param [dom] If specified, inserts the dom content in the new row
   * @param [liBefore] If specified, places the new row before another row
   */
  function addRow(gui, dom, liBefore) {
    var li = document.createElement('li');
    if (dom) li.appendChild(dom);
    if (liBefore) {
      gui.__ul.insertBefore(li, params.before);
    } else {
      gui.__ul.appendChild(li);
    }
    gui.onResize();
    return li;
  }

  function augmentController(gui, li, controller) {

    controller.__li = li;
    controller.__gui = gui;

    common.extend(controller, {

      options: function(options) {

        if (arguments.length > 1) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [common.toArray(arguments)]
              }
          );

        }

        if (common.isArray(options) || common.isObject(options)) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [options]
              }
          );

        }

      },

      name: function(v) {
        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
        return controller;
      },

      listen: function() {
        controller.__gui.listen(controller);
        return controller;
      },

      remove: function() {
        controller.__gui.remove(controller);
        return controller;
      }

    });

    // All sliders should be accompanied by a box.
    if (controller instanceof NumberControllerSlider) {

      var box = new NumberControllerBox(controller.object, controller.property,
          { min: controller.__min, max: controller.__max, step: controller.__step });

      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
        var pc = controller[method];
        var pb = box[method];
        controller[method] = box[method] = function() {
          var args = Array.prototype.slice.call(arguments);
          pc.apply(controller, args);
          return pb.apply(box, args);
        }
      });

      dom.addClass(li, 'has-slider');
      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);

    }
    else if (controller instanceof NumberControllerBox) {

      var r = function(returned) {

        // Have we defined both boundaries?
        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {

          // Well, then lets just replace this with a slider.
          controller.remove();
          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [controller.__min, controller.__max, controller.__step]
              });

        }

        return returned;

      };

      controller.min = common.compose(r, controller.min);
      controller.max = common.compose(r, controller.max);

    }
    else if (controller instanceof BooleanController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__checkbox, 'click');
      });

      dom.bind(controller.__checkbox, 'click', function(e) {
        e.stopPropagation(); // Prevents double-toggle
      })

    }
    else if (controller instanceof FunctionController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__button, 'click');
      });

      dom.bind(li, 'mouseover', function() {
        dom.addClass(controller.__button, 'hover');
      });

      dom.bind(li, 'mouseout', function() {
        dom.removeClass(controller.__button, 'hover');
      });

    }
    else if (controller instanceof ColorController) {

      dom.addClass(li, 'color');
      controller.updateDisplay = common.compose(function(r) {
        li.style.borderLeftColor = controller.__color.toString();
        return r;
      }, controller.updateDisplay);

      controller.updateDisplay();

    }

    controller.setValue = common.compose(function(r) {
      if (gui.getRoot().__preset_select && controller.isModified()) {
        markPresetModified(gui.getRoot(), true);
      }
      return r;
    }, controller.setValue);

  }

  function recallSavedValue(gui, controller) {

    // Find the topmost GUI, that's where remembered objects live.
    var root = gui.getRoot();

    // Does the object we're controlling match anything we've been told to
    // remember?
    var matched_index = root.__rememberedObjects.indexOf(controller.object);

    // Why yes, it does!
    if (matched_index != -1) {

      // Let me fetch a map of controllers for thcommon.isObject.
      var controller_map =
          root.__rememberedObjectIndecesToControllers[matched_index];

      // Ohp, I believe this is the first controller we've created for this
      // object. Lets make the map fresh.
      if (controller_map === undefined) {
        controller_map = {};
        root.__rememberedObjectIndecesToControllers[matched_index] =
            controller_map;
      }

      // Keep track of this controller
      controller_map[controller.property] = controller;

      // Okay, now have we saved any values for this controller?
      if (root.load && root.load.remembered) {

        var preset_map = root.load.remembered;

        // Which preset are we trying to load?
        var preset;

        if (preset_map[gui.preset]) {

          preset = preset_map[gui.preset];

        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {

          // Uhh, you can have the default instead?
          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];

        } else {

          // Nada.

          return;

        }


        // Did the loaded object remember thcommon.isObject?
        if (preset[matched_index] &&

          // Did we remember this particular property?
            preset[matched_index][controller.property] !== undefined) {

          // We did remember something for this guy ...
          var value = preset[matched_index][controller.property];

          // And that's what it is.
          controller.initialValue = value;
          controller.setValue(value);

        }

      }

    }

  }

  function getLocalStorageHash(gui, key) {
    // TODO how does this deal with multiple GUI's?
    return document.location.href + '.' + key;

  }

  function addSaveMenu(gui) {

    var div = gui.__save_row = document.createElement('li');

    dom.addClass(gui.domElement, 'has-save');

    gui.__ul.insertBefore(div, gui.__ul.firstChild);

    dom.addClass(div, 'save-row');

    var gears = document.createElement('span');
    gears.innerHTML = '&nbsp;';
    dom.addClass(gears, 'button gears');

    // TODO replace with FunctionController
    var button = document.createElement('span');
    button.innerHTML = 'Save';
    dom.addClass(button, 'button');
    dom.addClass(button, 'save');

    var button2 = document.createElement('span');
    button2.innerHTML = 'New';
    dom.addClass(button2, 'button');
    dom.addClass(button2, 'save-as');

    var button3 = document.createElement('span');
    button3.innerHTML = 'Revert';
    dom.addClass(button3, 'button');
    dom.addClass(button3, 'revert');

    var select = gui.__preset_select = document.createElement('select');

    if (gui.load && gui.load.remembered) {

      common.each(gui.load.remembered, function(value, key) {
        addPresetOption(gui, key, key == gui.preset);
      });

    } else {
      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
    }

    dom.bind(select, 'change', function() {


      for (var index = 0; index < gui.__preset_select.length; index++) {
        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
      }

      gui.preset = this.value;

    });

    div.appendChild(select);
    div.appendChild(gears);
    div.appendChild(button);
    div.appendChild(button2);
    div.appendChild(button3);

    if (SUPPORTS_LOCAL_STORAGE) {

      var saveLocally = document.getElementById('dg-save-locally');
      var explain = document.getElementById('dg-local-explain');

      saveLocally.style.display = 'block';

      var localStorageCheckBox = document.getElementById('dg-local-storage');

      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
        localStorageCheckBox.setAttribute('checked', 'checked');
      }

      function showHideExplain() {
        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
      }

      showHideExplain();

      // TODO: Use a boolean controller, fool!
      dom.bind(localStorageCheckBox, 'change', function() {
        gui.useLocalStorage = !gui.useLocalStorage;
        showHideExplain();
      });

    }

    var newConstructorTextArea = document.getElementById('dg-new-constructor');

    dom.bind(newConstructorTextArea, 'keydown', function(e) {
      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
        SAVE_DIALOGUE.hide();
      }
    });

    dom.bind(gears, 'click', function() {
      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
      SAVE_DIALOGUE.show();
      newConstructorTextArea.focus();
      newConstructorTextArea.select();
    });

    dom.bind(button, 'click', function() {
      gui.save();
    });

    dom.bind(button2, 'click', function() {
      var presetName = prompt('Enter a new preset name.');
      if (presetName) gui.saveAs(presetName);
    });

    dom.bind(button3, 'click', function() {
      gui.revert();
    });

//    div.appendChild(button2);

  }

  function addResizeHandle(gui) {

    gui.__resize_handle = document.createElement('div');

    common.extend(gui.__resize_handle.style, {

      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute'
//      border: '1px solid blue'

    });

    var pmouseX;

    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
    dom.bind(gui.__closeButton, 'mousedown', dragStart);

    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);

    function dragStart(e) {

      e.preventDefault();

      pmouseX = e.clientX;

      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.bind(window, 'mousemove', drag);
      dom.bind(window, 'mouseup', dragStop);

      return false;

    }

    function drag(e) {

      e.preventDefault();

      gui.width += pmouseX - e.clientX;
      gui.onResize();
      pmouseX = e.clientX;

      return false;

    }

    function dragStop() {

      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.unbind(window, 'mousemove', drag);
      dom.unbind(window, 'mouseup', dragStop);

    }

  }

  function setWidth(gui, w) {
    gui.domElement.style.width = w + 'px';
    // Auto placed save-rows are position fixed, so we have to
    // set the width manually if we want it to bleed to the edge
    if (gui.__save_row && gui.autoPlace) {
      gui.__save_row.style.width = w + 'px';
    }if (gui.__closeButton) {
      gui.__closeButton.style.width = w + 'px';
    }
  }

  function getCurrentPreset(gui, useInitialValues) {

    var toReturn = {};

    // For each object I'm remembering
    common.each(gui.__rememberedObjects, function(val, index) {

      var saved_values = {};

      // The controllers I've made for thcommon.isObject by property
      var controller_map =
          gui.__rememberedObjectIndecesToControllers[index];

      // Remember each value for each property
      common.each(controller_map, function(controller, property) {
        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
      });

      // Save the values for thcommon.isObject
      toReturn[index] = saved_values;

    });

    return toReturn;

  }

  function addPresetOption(gui, name, setSelected) {
    var opt = document.createElement('option');
    opt.innerHTML = name;
    opt.value = name;
    gui.__preset_select.appendChild(opt);
    if (setSelected) {
      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
    }
  }

  function setPresetSelectIndex(gui) {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      if (gui.__preset_select[index].value == gui.preset) {
        gui.__preset_select.selectedIndex = index;
      }
    }
  }

  function markPresetModified(gui, modified) {
    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
//    console.log('mark', modified, opt);
    if (modified) {
      opt.innerHTML = opt.value + "*";
    } else {
      opt.innerHTML = opt.value;
    }
  }

  function updateDisplays(controllerArray) {


    if (controllerArray.length != 0) {

      requestAnimationFrame(function() {
        updateDisplays(controllerArray);
      });

    }

    common.each(controllerArray, function(c) {
      c.updateDisplay();
    });

  }

  return GUI;

})(dat.utils.css,
"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {

      return function(object, property) {

        var initialValue = object[property];

        // Providing options?
        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
          return new OptionController(object, property, arguments[2]);
        }

        // Providing a map?

        if (common.isNumber(initialValue)) {

          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {

            // Has min and max.
            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);

          } else {

            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });

          }

        }

        if (common.isString(initialValue)) {
          return new StringController(object, property);
        }

        if (common.isFunction(initialValue)) {
          return new FunctionController(object, property, '');
        }

        if (common.isBoolean(initialValue)) {
          return new BooleanController(object, property);
        }

      }

    })(dat.controllers.OptionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.StringController = (function (Controller, dom, common) {

  /**
   * @class Provides a text input to alter the string property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var StringController = function(object, property) {

    StringController.superclass.call(this, object, property);

    var _this = this;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    dom.bind(this.__input, 'keyup', onChange);
    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  StringController.superclass = Controller;

  common.extend(

      StringController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {
          // Stops the caret from moving on account of:
          // keyup -> setValue -> updateDisplay
          if (!dom.isActive(this.__input)) {
            this.__input.value = this.getValue();
          }
          return StringController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return StringController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common),
dat.controllers.FunctionController,
dat.controllers.BooleanController,
dat.utils.common),
dat.controllers.Controller,
dat.controllers.BooleanController,
dat.controllers.FunctionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.OptionController,
dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {

  var ColorController = function(object, property) {

    ColorController.superclass.call(this, object, property);

    this.__color = new Color(this.getValue());
    this.__temp = new Color(0);

    var _this = this;

    this.domElement = document.createElement('div');

    dom.makeSelectable(this.domElement, false);

    this.__selector = document.createElement('div');
    this.__selector.className = 'selector';

    this.__saturation_field = document.createElement('div');
    this.__saturation_field.className = 'saturation-field';

    this.__field_knob = document.createElement('div');
    this.__field_knob.className = 'field-knob';
    this.__field_knob_border = '2px solid ';

    this.__hue_knob = document.createElement('div');
    this.__hue_knob.className = 'hue-knob';

    this.__hue_field = document.createElement('div');
    this.__hue_field.className = 'hue-field';

    this.__input = document.createElement('input');
    this.__input.type = 'text';
    this.__input_textShadow = '0 1px 1px ';

    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) { // on enter
        onBlur.call(this);
      }
    });

    dom.bind(this.__input, 'blur', onBlur);

    dom.bind(this.__selector, 'mousedown', function(e) {

      dom
        .addClass(this, 'drag')
        .bind(window, 'mouseup', function(e) {
          dom.removeClass(_this.__selector, 'drag');
        });

    });

    var value_field = document.createElement('div');

    common.extend(this.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });

    common.extend(this.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    
    common.extend(this.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });

    common.extend(this.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    common.extend(value_field.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    
    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');

    common.extend(this.__hue_field.style, {
      width: '15px',
      height: '100px',
      display: 'inline-block',
      border: '1px solid #555',
      cursor: 'ns-resize'
    });

    hueGradient(this.__hue_field);

    common.extend(this.__input.style, {
      outline: 'none',
//      width: '120px',
      textAlign: 'center',
//      padding: '4px',
//      marginBottom: '6px',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
    });

    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
    dom.bind(this.__field_knob, 'mousedown', fieldDown);

    dom.bind(this.__hue_field, 'mousedown', function(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'mouseup', unbindH);
    });

    function fieldDown(e) {
      setSV(e);
      // document.body.style.cursor = 'none';
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'mouseup', unbindSV);
    }

    function unbindSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'mouseup', unbindSV);
      // document.body.style.cursor = 'default';
    }

    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function unbindH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'mouseup', unbindH);
    }

    this.__saturation_field.appendChild(value_field);
    this.__selector.appendChild(this.__field_knob);
    this.__selector.appendChild(this.__saturation_field);
    this.__selector.appendChild(this.__hue_field);
    this.__hue_field.appendChild(this.__hue_knob);

    this.domElement.appendChild(this.__input);
    this.domElement.appendChild(this.__selector);

    this.updateDisplay();

    function setSV(e) {

      e.preventDefault();

      var w = dom.getWidth(_this.__saturation_field);
      var o = dom.getOffset(_this.__saturation_field);
      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;

      if (v > 1) v = 1;
      else if (v < 0) v = 0;

      if (s > 1) s = 1;
      else if (s < 0) s = 0;

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());


      return false;

    }

    function setH(e) {

      e.preventDefault();

      var s = dom.getHeight(_this.__hue_field);
      var o = dom.getOffset(_this.__hue_field);
      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;

      if (h > 1) h = 1;
      else if (h < 0) h = 0;

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;

    }

  };

  ColorController.superclass = Controller;

  common.extend(

      ColorController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {

          var i = interpret(this.getValue());

          if (i !== false) {

            var mismatch = false;

            // Check for mismatch on the interpreted value.

            common.each(Color.COMPONENTS, function(component) {
              if (!common.isUndefined(i[component]) &&
                  !common.isUndefined(this.__color.__state[component]) &&
                  i[component] !== this.__color.__state[component]) {
                mismatch = true;
                return {}; // break
              }
            }, this);

            // If nothing diverges, we keep our previous values
            // for statefulness, otherwise we recalculate fresh
            if (mismatch) {
              common.extend(this.__color.__state, i);
            }

          }

          common.extend(this.__temp.__state, this.__color.__state);

          this.__temp.a = 1;

          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
          var _flip = 255 - flip;

          common.extend(this.__field_knob.style, {
            marginLeft: 100 * this.__color.s - 7 + 'px',
            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
            backgroundColor: this.__temp.toString(),
            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
          });

          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'

          this.__temp.s = 1;
          this.__temp.v = 1;

          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

          common.extend(this.__input.style, {
            backgroundColor: this.__input.value = this.__color.toString(),
            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
          });

        }

      }

  );
  
  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
  
  function linearGradient(elem, x, a, b) {
    elem.style.background = '';
    common.each(vendors, function(vendor) {
      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
    });
  }
  
  function hueGradient(elem) {
    elem.style.background = '';
    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
  }


  return ColorController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret,
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common),
dat.color.interpret,
dat.utils.common),
dat.utils.requestAnimationFrame = (function () {

  /**
   * requirejs version of Paul Irish's RequestAnimationFrame
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {

        window.setTimeout(callback, 1000 / 60);

      };
})(),
dat.dom.CenteredDiv = (function (dom, common) {


  var CenteredDiv = function() {

    this.backgroundElement = document.createElement('div');
    common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear'
    });

    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';

    this.domElement = document.createElement('div');
    common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
    });


    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;
    dom.bind(this.backgroundElement, 'click', function() {
      _this.hide();
    });


  };

  CenteredDiv.prototype.show = function() {

    var _this = this;
    


    this.backgroundElement.style.display = 'block';

    this.domElement.style.display = 'block';
    this.domElement.style.opacity = 0;
//    this.domElement.style.top = '52%';
    this.domElement.style.webkitTransform = 'scale(1.1)';

    this.layout();

    common.defer(function() {
      _this.backgroundElement.style.opacity = 1;
      _this.domElement.style.opacity = 1;
      _this.domElement.style.webkitTransform = 'scale(1)';
    });

  };

  CenteredDiv.prototype.hide = function() {

    var _this = this;

    var hide = function() {

      _this.domElement.style.display = 'none';
      _this.backgroundElement.style.display = 'none';

      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
      dom.unbind(_this.domElement, 'transitionend', hide);
      dom.unbind(_this.domElement, 'oTransitionEnd', hide);

    };

    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
    dom.bind(this.domElement, 'transitionend', hide);
    dom.bind(this.domElement, 'oTransitionEnd', hide);

    this.backgroundElement.style.opacity = 0;
//    this.domElement.style.top = '48%';
    this.domElement.style.opacity = 0;
    this.domElement.style.webkitTransform = 'scale(1.1)';

  };

  CenteredDiv.prototype.layout = function() {
    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
  };
  
  function lockScroll(e) {
    console.log(e);
  }

  return CenteredDiv;

})(dat.dom.dom,
dat.utils.common),
dat.dom.dom,
dat.utils.common);
},{}],8:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2FkZGl0aW9uL3J1bi5qcyIsImRlbW8vYXBwL0RyYXdpbmdWZWN0b3IuanMiLCJkZW1vL2FwcC9WZWN0b3JQbGF5Z3JvdW5kLmpzIiwiZGVtby9hcHAvY29sb3Vycy5qcyIsIm5vZGVfbW9kdWxlcy9kYXQtZ3VpL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RhdC1ndWkvdmVuZG9yL2RhdC5jb2xvci5qcyIsIm5vZGVfbW9kdWxlcy9kYXQtZ3VpL3ZlbmRvci9kYXQuZ3VpLmpzIiwic3JjL3d0Yy12ZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE9BQU8sTUFBUDs7QUFFQSxJQUFJLFdBQVc7QUFDYixhQUFXO0FBREUsQ0FBZjs7QUFJQSxTQUFTLEtBQVQsQ0FBZSxFQUFmLEVBQW1CO0FBQ2pCLE1BQUksU0FBUyxVQUFULElBQXVCLFNBQTNCLEVBQXFDO0FBQ25DO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsYUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsRUFBOUM7QUFDRDtBQUNGO0FBQ0QsTUFBTSxZQUFXOztBQUVmLE1BQUksS0FBSyw0QkFBa0IsR0FBbEIsRUFBdUIsQ0FBQyxHQUF4QixFQUE2QixrQkFBUSxDQUFSLENBQTdCLENBQVQ7QUFDQSxNQUFJLEtBQUssNEJBQWtCLENBQUMsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkIsa0JBQVEsQ0FBUixDQUE3QixDQUFUO0FBQ0EsS0FBRyxNQUFILEdBQVksR0FBRyxDQUFmO0FBQ0EsTUFBSSxLQUFLLDRCQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixTQUF4QixDQUFUO0FBQ0EsS0FBRyxDQUFILEdBQU8sR0FBRyxDQUFILENBQUssTUFBTCxDQUFZLEdBQUcsQ0FBZixDQUFQO0FBQ0EsTUFBSSxLQUFLLDRCQUFr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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbHZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNrSEEsSUFBTSxtQkFBbUIsTUFB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QUFQLElBQWtCLFFBQXJCLEVBQStCO0FBQzdCLGFBQUssV0FBTCxDQUFpQixPQUFqQjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU0sSUFBSSxTQUFKLENBQWMsMEJBQWQsQ0FBTjtBQUNEO0FBQ0YsSzt3QkFDb0I7QUFDbkIsYUFBTyxnQkFBZ0IsS0FBSyxLQUFMLENBQVcsS0FBSyxDQUFoQixFQUFtQixLQUFLLENBQXhCLENBQWhCLENBQVA7QUFDRDs7QUFFRjs7Ozs7Ozs7O3NCQU1VLEMsRUFBRztBQUNaLFdBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxLO3dCQUNXO0FBQ1gsYUFBTyxLQUFLLENBQVo7QUFDQTs7QUFFRDs7Ozs7Ozs7O3NCQU1XLEMsRUFBRztBQUNiLFdBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxLO3dCQUNZO0FBQ1osYUFBTyxLQUFLLENBQVo7QUFDQTs7Ozs7O2tCQUlhLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZlY3RvciBmcm9tIFwiLi4vLi4vc3JjL3d0Yy12ZWN0b3JcIjtcbmltcG9ydCBEcmF3aW5nVmVjdG9yIGZyb20gXCIuLi9hcHAvRHJhd2luZ1ZlY3RvclwiO1xuaW1wb3J0IFZlY3RvclBsYXlncm91bmQgZnJvbSBcIi4uL2FwcC9WZWN0b3JQbGF5Z3JvdW5kXCI7XG5pbXBvcnQgY29sb3VycyBmcm9tICcuLi9hcHAvY29sb3Vycyc7XG5pbXBvcnQgZGF0IGZyb20gJ2RhdC1ndWknO1xuXG53aW5kb3cuVmVjdG9yID0gVmVjdG9yO1xuXG5sZXQgc2V0dGluZ3MgPSB7XG4gIGFuaW1hdGluZzogZmFsc2Vcbn1cblxuZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gJ2xvYWRpbmcnKXtcbiAgICBmbigpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbik7XG4gIH1cbn1cbnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gIGxldCB2YSA9IG5ldyBEcmF3aW5nVmVjdG9yKDEwMCwgLTIwMCwgY29sb3Vyc1swXSk7XG4gIGxldCB2YiA9IG5ldyBEcmF3aW5nVmVjdG9yKC0zMDAsIDEwMCwgY29sb3Vyc1sxXSk7XG4gIHZiLm9mZnNldCA9IHZhLnY7XG4gIGxldCB2YyA9IG5ldyBEcmF3aW5nVmVjdG9yKDAsIDAsICcjQ0NDQ0NDJyk7XG4gIHZjLnYgPSB2YS52LmFkZE5ldyh2Yi52KTtcbiAgbGV0IHZkID0gbmV3IERyYXdpbmdWZWN0b3IoMCwgMCwgJyM3Nzc3NzcnKTtcbiAgdmQudiA9IHZhLnYuc3VidHJhY3ROZXcodmIudik7XG5cbiAgVmVjdG9yUGxheWdyb3VuZC5pbml0KCk7XG4gIFZlY3RvclBsYXlncm91bmQuYWRkVmVjdG9yKHZjKTtcbiAgVmVjdG9yUGxheWdyb3VuZC5hZGRWZWN0b3IodmEpO1xuICBWZWN0b3JQbGF5Z3JvdW5kLmFkZFZlY3Rvcih2Yik7XG4gIFZlY3RvclBsYXlncm91bmQuYWRkVmVjdG9yKHZkKTtcblxuICBsZXQgdXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZihzZXR0aW5ncy5hbmltYXRpbmcpIHtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBhbmdsZSBvZiB0aGUgdmVjdG9yXG4gICAgICB2YS52LmFuZ2xlICs9IDAuMDE7XG5cbiAgICAgIC8vIFVwZGF0ZSBWZWN0b3IgQyBiYXNlZCBvbiB0aGUgYWRkaXRpb24gb2YgdGhlIHR3byBjb21wb25lbnRzXG4gICAgICB2Yy52ID0gdmEudi5hZGROZXcodmIudik7XG5cbiAgICAgIC8vIFVwZGF0ZSBWZWN0b3IgRCBiYXNlZCBvbiB0aGUgYWRkaXRpb24gb2YgdGhlIHR3byBjb21wb25lbnRzXG4gICAgICB2ZC52ID0gdmEudi5zdWJ0cmFjdE5ldyh2Yi52KTtcblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGUoKTtcblxuICB2YXIgZ3VpID0gbmV3IGRhdC5HVUkoKTtcbiAgdmFyIGFuaW1hdGlvbkNvbnRyb2wgPSBndWkuYWRkKHNldHRpbmdzLCAnYW5pbWF0aW5nJyk7XG4gIGFuaW1hdGlvbkNvbnRyb2wub25DaGFuZ2UoZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZih2YWx1ZSA9PSB0cnVlKSB7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG4gIH0pO1xuXG59KTtcbiIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4uLy4uL3NyYy93dGMtdmVjdG9yXCI7XG5cbmNsYXNzIERyYXdpbmdWZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBjb2xvciwgbGluZVdpZHRoID0gMSkge1xuICAgIHRoaXMudiA9IG5ldyBWZWN0b3IoeCwgeSk7XG5cbiAgICB0aGlzLmFycm93aGVhZFYxID0gbmV3IFZlY3RvcigtMTAsLTEwKTtcbiAgICB0aGlzLmFycm93aGVhZFYyID0gbmV3IFZlY3RvcigtMTAsIDEwKTtcblxuICAgIGlmKCB0eXBlb2YgY29sb3IgIT09ICdzdHJpbmcnIHx8ICEoL14jWzAtOUFCQ0RFRmFiY2RlZl0qLy50ZXN0KGNvbG9yKSkgKSB7XG4gICAgICBjb2xvciA9ICcjJyArICgnMCcrKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSoyNTUpKS50b1N0cmluZygxNikpLnN1YnN0cigtMikgKyAoJzAnKyhNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMjU1KSkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpICsgKCcwJysoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjI1NSkpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gIH1cblxuICBkcmF3KHBsYXlncm91bmQpIHtcbiAgICBsZXQgdW5pdFggPSBwbGF5Z3JvdW5kLnNjYWxlZFVuaXRWZWN0b3JYOyAvLyBpSGF0XG4gICAgbGV0IHVuaXRZID0gcGxheWdyb3VuZC5zY2FsZWRVbml0VmVjdG9yWTsgLy8gakhhdFxuICAgIGxldCB1bml0VmVjdG9yID0gdW5pdFguYWRkTmV3KHVuaXRZKTtcbiAgICBsZXQgc2NhbGUgPSBwbGF5Z3JvdW5kLnNjYWxlO1xuICAgIC8vIGNvbnNvbGUuY2xlYXIoKTtcbiAgICAvLyBjb25zb2xlLmxvZyh1bml0VmVjdG9yLCB1bml0WCwgdW5pdFkpO1xuICAgIGxldCBvZmZzZXQgPSBwbGF5Z3JvdW5kLm9mZnNldC5hZGROZXcodGhpcy5vZmZzZXQubXVsdGlwbHlOZXcodW5pdFZlY3RvcikpOyAvLyBjcmVhdGluZyB0aGUgb2Zmc2V0XG4gICAgbGV0IHggPSBvZmZzZXQueDtcbiAgICBsZXQgeSA9IG9mZnNldC55O1xuICAgIGxldCBjdHggPSBwbGF5Z3JvdW5kLm1haW5DdHg7XG5cbiAgICBpZih0aGlzLm91dHB1dFZlY3RvciBpbnN0YW5jZW9mIFZlY3Rvcikge1xuICAgICAgbGV0IHVuaXRYID0gcGxheWdyb3VuZC51bml0VmVjdG9yWDsgLy8gaUhhdFxuICAgICAgbGV0IHVuaXRZID0gcGxheWdyb3VuZC51bml0VmVjdG9yWTsgLy8gakhhdFxuXG4gICAgICB0aGlzLm91dHB1dFZlY3Rvci54ID0gKHRoaXMudi54ICogdW5pdFgueCkgKyAodGhpcy52LnkgKiB1bml0WS54KTtcbiAgICAgIHRoaXMub3V0cHV0VmVjdG9yLnkgPSAodGhpcy52LnggKiB1bml0WC55KSArICh0aGlzLnYueSAqIHVuaXRZLnkpO1xuICAgIH1cblxuICAgIC8vIFRyYW5zbGF0ZSB0aGUgdmVjdG9yIHVzaW5nIGxpbmVhciB0cmFuc2Zvcm1hdGlvbiB4KMOuKSArIHkoailcbiAgICAvLyDDriA9IHVuaXggWFxuICAgIC8vIGogPSB1bml0IFlcbiAgICAvLyAgXyAgICAgICBfICAgIF8gICAgICAgX1xuICAgIC8vIHwgeCjDri54KSB8ICsgfCB5KGoueCkgfFxuICAgIC8vIHwgeChpLnkpIHwgKyB8IHkoai55KSB8XG4gICAgLy9cbiAgICBsZXQgdHJhbnNsYXRlZFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgdHJhbnNsYXRlZFZlY3Rvci54ID0gKHRoaXMudi54ICogdW5pdFgueCkgKyAodGhpcy52LnkgKiB1bml0WS54KTtcbiAgICB0cmFuc2xhdGVkVmVjdG9yLnkgPSAodGhpcy52LnggKiB1bml0WC55KSArICh0aGlzLnYueSAqIHVuaXRZLnkpO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aDtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIGN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgeCA9IHRyYW5zbGF0ZWRWZWN0b3IueCArIG9mZnNldC54O1xuICAgIHkgPSB0cmFuc2xhdGVkVmVjdG9yLnkgKyBvZmZzZXQueTtcbiAgICBjdHgubGluZVRvKHgsIHkpO1xuXG4gICAgdGhpcy50cmFuc2xhdGVkVmVjdG9yID0gdHJhbnNsYXRlZFZlY3RvcjtcblxuICAgIC8vIENyZWF0ZSB0aGUgYXJyb3cgaGVhZCB2ZWN0b3JzLiBUaGVzZSBhcmUgbm90IGRlcGVuZGVudCB1cG9uIHRoZSB1bml0IHZlY3RvclxuICAgIHZhciBhdjEgPSB0aGlzLmFycm93aGVhZFYxLnJvdGF0ZU5ldyh0cmFuc2xhdGVkVmVjdG9yLmFuZ2xlKTtcbiAgICB2YXIgYXYyID0gdGhpcy5hcnJvd2hlYWRWMi5yb3RhdGVOZXcodHJhbnNsYXRlZFZlY3Rvci5hbmdsZSk7XG5cbiAgICAvLyBEcmF3IHRoZSBhcnJvd2hlYWRcbiAgICBjdHgubGluZVRvKGF2MS54ICsgeCwgYXYxLnkgKyB5KTtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIGN0eC5saW5lVG8oYXYyLnggKyB4LCBhdjIueSArIHkpO1xuXG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gIH1cblxuICBnZXQgcGxheWdyb3VuZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGc7XG4gIH1cbiAgc2V0IHBsYXlncm91bmQocGcpIHtcbiAgICB0aGlzLl9wZyA9IHBnO1xuICB9XG5cbiAgc2V0IGNvbG9yKGNvbG9yKSB7XG4gICAgaWYoIHR5cGVvZiBjb2xvciA9PSAnc3RyaW5nJyAmJiAvXiNbMC05QUJDREVGYWJjZGVmXSovLnRlc3QoY29sb3IpICkge1xuICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cbiAgZ2V0IGNvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9jb2xvciB8fCAnI0ZGRkZGRic7XG4gIH1cblxuICBzZXQgb2Zmc2V0KHYpIHtcbiAgICBpZiggdiBpbnN0YW5jZW9mIFZlY3RvciApIHtcbiAgICAgIHRoaXMuX29mZnNldCA9IHY7XG4gICAgfVxuICB9XG4gIGdldCBvZmZzZXQoKSB7XG4gICAgaWYoICEodGhpcy5fb2Zmc2V0IGluc3RhbmNlb2YgVmVjdG9yKSApIHtcbiAgICAgIHRoaXMuX29mZnNldCA9IG5ldyBWZWN0b3IoMCwwKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3aW5nVmVjdG9yO1xuIiwiaW1wb3J0IFZlY3RvciBmcm9tIFwiLi4vLi4vc3JjL3d0Yy12ZWN0b3JcIjtcbmltcG9ydCBEcmF3aW5nVmVjdG9yIGZyb20gXCIuL0RyYXdpbmdWZWN0b3JcIjtcbmltcG9ydCBjb2xvdXJzIGZyb20gJy4vY29sb3Vycyc7XG5cbmNsYXNzIFZlY3RvclBsYXlncm91bmQge1xuICBzdGF0aWMgaW5pdChkcmF3aW5nID0gdHJ1ZSwgc2NhbGUgPSAxMDAsIGRyYXdHcmlkID0gdHJ1ZSkge1xuICAgIHRoaXMuaW5pdGlhbGlzZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5tYWluQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5tYWluQ3R4ID0gdGhpcy5tYWluQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5zZWNvbmRhcnlDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLnNlY29uZGFyQ3R4ID0gdGhpcy5zZWNvbmRhcnlDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tYWluQ2FudmFzKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc2Vjb25kYXJ5Q2FudmFzKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMucmVzaXplTGlzdGVuZXIoKTtcblxuICAgIHRoaXMudmVjdG9ycyA9IFtdO1xuXG4gICAgdGhpcy5ncmlkRGlzdGFuY2UgPSAxO1xuXG4gICAgdGhpcy5kb0RyYXdHcmlkID0gZHJhd0dyaWQ7XG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMuZHJhd2luZyA9IGRyYXdpbmc7XG4gIH1cblxuICBzdGF0aWMgcmVzaXplTGlzdGVuZXIoZSkge1xuICAgIHRoaXMuZGltZW5zaW9ucyA9IG5ldyBWZWN0b3Iod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgdGhpcy5vZmZzZXQgPSB0aGlzLmRpbWVuc2lvbnMuZGl2aWRlU2NhbGFyTmV3KDIpO1xuXG4gICAgdGhpcy5tYWluQ2FudmFzLndpZHRoID0gdGhpcy5zZWNvbmRhcnlDYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB0aGlzLm1haW5DYW52YXMuaGVpZ2h0ID0gdGhpcy5zZWNvbmRhcnlDYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG5cbiAgc3RhdGljIGFkZFZlY3RvcihkcmF3aW5nVmVjdG9yKSB7XG4gICAgaWYoICEgKGRyYXdpbmdWZWN0b3IgaW5zdGFuY2VvZiBEcmF3aW5nVmVjdG9yKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnZlY3RvcnMucHVzaChkcmF3aW5nVmVjdG9yKTtcblxuICAgIHJldHVybiBkcmF3aW5nVmVjdG9yO1xuICB9XG5cbiAgc3RhdGljIGRyYXcoKSB7XG4gICAgLy8gQ2xlYXIgdGhlIGNhbnZhc2VzIGJlZm9yZSBkcmF3aW5nXG4gICAgdGhpcy5tYWluQ3R4LmZpbGxTdHlsZSA9IHRoaXMuYmdDb2xvcjtcbiAgICB0aGlzLm1haW5DdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5tYWluQ3R4LnJlY3QoMCwwLCB0aGlzLmRpbWVuc2lvbnMud2lkdGgsIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgIHRoaXMubWFpbkN0eC5maWxsKCk7XG4gICAgLy8gdGhpcy5zZWNvbmRhckN0eC5jbGVhclJlY3QoMCwwLHRoaXMubWFpbkNhbnZhcy53aWR0aCwgdGhpcy5tYWluQ2FudmFzLmhlaWdodCk7XG5cbiAgICBpZih0aGlzLmRvRHJhd0dyaWQpIHRoaXMuZHJhd0dyaWQoKTtcbiAgICB0aGlzLmRyYXdWZWN0b3JzKCk7XG5cbiAgICBpZiggdGhpcy5kcmF3aW5nICkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmRyYXcuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRyYXdWZWN0b3JzKCkge1xuICAgIHRoaXMudmVjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgIHYuZHJhdyh0aGlzKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgc3RhdGljIGRyYXdHcmlkKCkge1xuICAgIGxldCBzY2FsZSA9IHRoaXMuc2NhbGU7XG4gICAgbGV0IGdyaWREaXN0YW5jZSA9IHRoaXMuZ3JpZERpc3RhbmNlICogc2NhbGU7XG5cbiAgICAvLyBkcmF3IHRoZSBtYWluIGdyaWQgbGluZXNcblxuICAgIHRoaXMubWFpbkN0eC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMubWFpbkN0eC5zdHJva2VTdHlsZSA9IHRoaXMuZ3JpZENvbG9yO1xuICAgIHRoaXMubWFpbkN0eC5iZWdpblBhdGgoKTtcblxuICAgIGxldCB4UG9zID0gdGhpcy5vZmZzZXQueDtcbiAgICB3aGlsZSh4UG9zIDwgdGhpcy5kaW1lbnNpb25zLndpZHRoKSB7XG4gICAgICB4UG9zICs9IGdyaWREaXN0YW5jZTtcbiAgICAgIHRoaXMubWFpbkN0eC5tb3ZlVG8oeFBvcywgMCk7XG4gICAgICB0aGlzLm1haW5DdHgubGluZVRvKHhQb3MsIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgIH1cbiAgICB4UG9zID0gdGhpcy5vZmZzZXQueDtcbiAgICB3aGlsZSh4UG9zID4gMCkge1xuICAgICAgeFBvcyAtPSBncmlkRGlzdGFuY2U7XG4gICAgICB0aGlzLm1haW5DdHgubW92ZVRvKHhQb3MsIDApO1xuICAgICAgdGhpcy5tYWluQ3R4LmxpbmVUbyh4UG9zLCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KTtcbiAgICB9XG4gICAgbGV0IHlQb3MgPSB0aGlzLm9mZnNldC55O1xuICAgIHdoaWxlKHlQb3MgPCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KSB7XG4gICAgICB5UG9zICs9IGdyaWREaXN0YW5jZTtcbiAgICAgIHRoaXMubWFpbkN0eC5tb3ZlVG8oMCwgeVBvcyk7XG4gICAgICB0aGlzLm1haW5DdHgubGluZVRvKHRoaXMuZGltZW5zaW9ucy53aWR0aCwgeVBvcyk7XG4gICAgfVxuICAgIHlQb3MgPSB0aGlzLm9mZnNldC55O1xuICAgIHdoaWxlKHlQb3MgPiAwKSB7XG4gICAgICB5UG9zIC09IGdyaWREaXN0YW5jZTtcbiAgICAgIHRoaXMubWFpbkN0eC5tb3ZlVG8oMCwgeVBvcyk7XG4gICAgICB0aGlzLm1haW5DdHgubGluZVRvKHRoaXMuZGltZW5zaW9ucy53aWR0aCwgeVBvcyk7XG4gICAgfVxuICAgIHRoaXMubWFpbkN0eC5zdHJva2UoKTtcblxuXG4gICAgdGhpcy5tYWluQ3R4LnN0cm9rZVN0eWxlID0gdGhpcy5vcmlnaW5Db2xvcjtcbiAgICB0aGlzLm1haW5DdHguYmVnaW5QYXRoKCk7XG5cbiAgICB0aGlzLm1haW5DdHgubW92ZVRvKDAsIHRoaXMub2Zmc2V0LnkpO1xuICAgIHRoaXMubWFpbkN0eC5saW5lVG8odGhpcy5kaW1lbnNpb25zLndpZHRoLCB0aGlzLm9mZnNldC55KTtcbiAgICB0aGlzLm1haW5DdHgubW92ZVRvKHRoaXMub2Zmc2V0LngsIDApO1xuICAgIHRoaXMubWFpbkN0eC5saW5lVG8odGhpcy5vZmZzZXQueCwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICB0aGlzLm1haW5DdHguc3Ryb2tlKCk7XG5cbiAgfVxuXG4gIHN0YXRpYyBzZXQgZHJhd2luZyhkKSB7XG4gICAgdGhpcy5fZHJhd2luZyA9IGQgPT09IHRydWU7XG5cbiAgICBpZih0aGlzLl9kcmF3aW5nID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmRyYXcoKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBkcmF3aW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9kcmF3aW5nID09PSB0cnVlO1xuICB9XG5cbiAgc3RhdGljIHNldCBiZ0NvbG9yKGNvbG9yKSB7XG4gICAgaWYoIHR5cGVvZiBjb2xvciA9PSAnc3RyaW5nJyAmJiAgLyNbMC05QUJDREVGXXs2fS8udGVzdChjb2xvci50b1VwcGVyQ2FzZSgpKSkge1xuICAgICAgdGhpcy5fYmdDb2xvciA9IGNvbG9yO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IGJnQ29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JnQ29sb3IgfHwgJyMyODJDMzQnO1xuICB9XG5cbiAgc3RhdGljIHNldCBvcmlnaW5Db2xvcihjb2xvcikge1xuICAgIGlmKCB0eXBlb2YgY29sb3IgPT0gJ3N0cmluZycgJiYgIC8jWzAtOUFCQ0RFRl17Nn0vLnRlc3QoY29sb3IudG9VcHBlckNhc2UoKSkpIHtcbiAgICAgIHRoaXMuX29yaWdpbkNvbG9yID0gY29sb3I7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgb3JpZ2luQ29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbkNvbG9yIHx8ICcjRkZGRkZGJztcbiAgfVxuXG4gIHN0YXRpYyBzZXQgZ3JpZENvbG9yKGNvbG9yKSB7XG4gICAgaWYoIHR5cGVvZiBjb2xvciA9PSAnc3RyaW5nJyAmJiAgLyNbMC05QUJDREVGXXs2fS8udGVzdChjb2xvci50b1VwcGVyQ2FzZSgpKSkge1xuICAgICAgdGhpcy5fZ3JpZENvbG9yID0gY29sb3I7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgZ3JpZENvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9ncmlkQ29sb3IgfHwgJyM2NjY2NjYnO1xuICB9XG5cbiAgc3RhdGljIHNldCB1bml0VmVjdG9yWCh2KSB7XG4gICAgaWYoIHYgaW5zdGFuY2VvZiBWZWN0b3IgKSB7XG4gICAgICB0aGlzLl91bml0VmVjdG9yWCA9IHZcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCB1bml0VmVjdG9yWCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdW5pdFZlY3RvclggfHwgbmV3IFZlY3RvcigxLCAwKTtcbiAgfVxuICBzdGF0aWMgZ2V0IHNjYWxlZFVuaXRWZWN0b3JYKCkge1xuICAgIGxldCBzY2FsZSA9IHRoaXMuc2NhbGU7XG4gICAgbGV0IHV2ID0gdGhpcy51bml0VmVjdG9yWC5jbG9uZSgpO1xuICAgIGlmKHNjYWxlICE9PSAxKSB1di5tdWx0aXBseVNjYWxhcihzY2FsZSk7XG4gICAgcmV0dXJuIHV2O1xuICB9XG5cbiAgc3RhdGljIHNldCB1bml0VmVjdG9yWSh2KSB7XG4gICAgaWYoIHYgaW5zdGFuY2VvZiBWZWN0b3IgKSB7XG4gICAgICB0aGlzLl91bml0VmVjdG9yWSA9IHZcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCB1bml0VmVjdG9yWSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdW5pdFZlY3RvclkgfHwgbmV3IFZlY3RvcigwLCAxKTtcbiAgfVxuICBzdGF0aWMgZ2V0IHNjYWxlZFVuaXRWZWN0b3JZKCkge1xuICAgIGxldCBzY2FsZSA9IHRoaXMuc2NhbGU7XG4gICAgbGV0IHV2ID0gdGhpcy51bml0VmVjdG9yWS5jbG9uZSgpO1xuICAgIGlmKHNjYWxlICE9PSAxKSB1di5tdWx0aXBseVNjYWxhcihzY2FsZSk7XG4gICAgcmV0dXJuIHV2O1xuICB9XG5cbiAgc3RhdGljIHNldCBkaW1lbnNpb25zKGRpbXMpIHtcbiAgICBpZihkaW1zIGluc3RhbmNlb2YgVmVjdG9yKSB7XG4gICAgICB0aGlzLl9kaW1lbnNpb25zID0gZGltcztcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBkaW1lbnNpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zIHx8IG5ldyBWZWN0b3IoKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgb2Zmc2V0KGRpbXMpIHtcbiAgICBpZihkaW1zIGluc3RhbmNlb2YgVmVjdG9yKSB7XG4gICAgICB0aGlzLl9vZmZzZXQgPSBkaW1zO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IG9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0IHx8IG5ldyBWZWN0b3IoKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgc2NhbGUoc2NhbGUpIHtcbiAgICBpZih0eXBlb2Ygc2NhbGUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IHNjYWxlKCkge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZSB8fCAxO1xuICB9XG5cbiAgc3RhdGljIHNldCBkb0RyYXdHcmlkKGRyYXdHcmlkKSB7XG4gICAgdGhpcy5fZHJhd0dyaWQgPSBkcmF3R3JpZCA9PT0gdHJ1ZTtcbiAgfVxuICBzdGF0aWMgZ2V0IGRvRHJhd0dyaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYXdHcmlkIHx8IGZhbHNlO1xuICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBWZWN0b3JQbGF5Z3JvdW5kO1xuIiwiXG5sZXQgY29sb3VycyA9IFsnI2M2NzhkZCcsICcjOThjMzc5JywgJyNjMzQ0NDgnLCAnIzRlOWM5ZScsICcjZDE4NTQ5JywgJyNhYmIyYmYnXTtcbmxldCBuYW1lZENvbG91cnMgPSB7XG4gIFxufTtcbmV4cG9ydCB7IGNvbG91cnMsIG5hbWVkQ29sb3VycyB9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vdmVuZG9yL2RhdC5ndWknKVxubW9kdWxlLmV4cG9ydHMuY29sb3IgPSByZXF1aXJlKCcuL3ZlbmRvci9kYXQuY29sb3InKSIsIi8qKlxuICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxuICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqL1xuXG4vKiogQG5hbWVzcGFjZSAqL1xudmFyIGRhdCA9IG1vZHVsZS5leHBvcnRzID0gZGF0IHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmNvbG9yID0gZGF0LmNvbG9yIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LnV0aWxzID0gZGF0LnV0aWxzIHx8IHt9O1xuXG5kYXQudXRpbHMuY29tbW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgXG4gIHZhciBBUlJfRUFDSCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuICB2YXIgQVJSX1NMSUNFID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBCYW5kLWFpZCBtZXRob2RzIGZvciB0aGluZ3MgdGhhdCBzaG91bGQgYmUgYSBsb3QgZWFzaWVyIGluIEphdmFTY3JpcHQuXG4gICAqIEltcGxlbWVudGF0aW9uIGFuZCBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgdW5kZXJzY29yZS5qc1xuICAgKiBodHRwOi8vZG9jdW1lbnRjbG91ZC5naXRodWIuY29tL3VuZGVyc2NvcmUvXG4gICAqL1xuXG4gIHJldHVybiB7IFxuICAgIFxuICAgIEJSRUFLOiB7fSxcbiAgXG4gICAgZXh0ZW5kOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAoIXRoaXMuaXNVbmRlZmluZWQob2JqW2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmF1bHRzOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZCh0YXJnZXRba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICBcbiAgICB9LFxuICAgIFxuICAgIGNvbXBvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRvQ2FsbCA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRvQ2FsbC5sZW5ndGggLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IFt0b0NhbGxbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdHIsIHNjb3BlKSB7XG5cbiAgICAgIFxuICAgICAgaWYgKEFSUl9FQUNIICYmIG9iai5mb3JFYWNoID09PSBBUlJfRUFDSCkgeyBcbiAgICAgICAgXG4gICAgICAgIG9iai5mb3JFYWNoKGl0ciwgc2NvcGUpO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gb2JqLmxlbmd0aCArIDApIHsgLy8gSXMgbnVtYmVyIGJ1dCBub3QgTmFOXG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgPSAwLCBsID0gb2JqLmxlbmd0aDsga2V5IDwgbDsga2V5KyspXG4gICAgICAgICAgaWYgKGtleSBpbiBvYmogJiYgaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBcbiAgICAgICAgICBpZiAoaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9XG4gICAgICAgICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmVyOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgIHNldFRpbWVvdXQoZm5jLCAwKTtcbiAgICB9LFxuICAgIFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iai50b0FycmF5KSByZXR1cm4gb2JqLnRvQXJyYXkoKTtcbiAgICAgIHJldHVybiBBUlJfU0xJQ0UuY2FsbChvYmopO1xuICAgIH0sXG5cbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBcbiAgICBpc051bGw6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgICB9LFxuICAgIFxuICAgIGlzTmFOOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogIT09IG9iajtcbiAgICB9LFxuICAgIFxuICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbiAgICB9LFxuICAgIFxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKzA7XG4gICAgfSxcbiAgICBcbiAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorJyc7XG4gICAgfSxcbiAgICBcbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gZmFsc2UgfHwgb2JqID09PSB0cnVlO1xuICAgIH0sXG4gICAgXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfVxuICBcbiAgfTtcbiAgICBcbn0pKCk7XG5cblxuZGF0LmNvbG9yLnRvU3RyaW5nID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICByZXR1cm4gZnVuY3Rpb24oY29sb3IpIHtcblxuICAgIGlmIChjb2xvci5hID09IDEgfHwgY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLmEpKSB7XG5cbiAgICAgIHZhciBzID0gY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcbiAgICAgIHdoaWxlIChzLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcyA9ICcwJyArIHM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnIycgKyBzO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBNYXRoLnJvdW5kKGNvbG9yLnIpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5nKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuYikgKyAnLCcgKyBjb2xvci5hICsgJyknO1xuXG4gICAgfVxuXG4gIH1cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LkNvbG9yID0gZGF0LmNvbG9yLkNvbG9yID0gKGZ1bmN0aW9uIChpbnRlcnByZXQsIG1hdGgsIHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgQ29sb3IgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuX19zdGF0ZSA9IGludGVycHJldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHRoaXMuX19zdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93ICdGYWlsZWQgdG8gaW50ZXJwcmV0IGNvbG9yIGFyZ3VtZW50cyc7XG4gICAgfVxuXG4gICAgdGhpcy5fX3N0YXRlLmEgPSB0aGlzLl9fc3RhdGUuYSB8fCAxO1xuXG5cbiAgfTtcblxuICBDb2xvci5DT01QT05FTlRTID0gWydyJywnZycsJ2InLCdoJywncycsJ3YnLCdoZXgnLCdhJ107XG5cbiAgY29tbW9uLmV4dGVuZChDb2xvci5wcm90b3R5cGUsIHtcblxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0b1N0cmluZyh0aGlzKTtcbiAgICB9LFxuXG4gICAgdG9PcmlnaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmNvbnZlcnNpb24ud3JpdGUodGhpcyk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdyJywgMik7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdnJywgMSk7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdiJywgMCk7XG5cbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2gnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3MnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3YnKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnYScsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmE7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgdGhpcy5fX3N0YXRlLmEgPSB2O1xuICAgIH1cblxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnaGV4Jywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCF0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIRVgnKSB7XG4gICAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSBtYXRoLnJnYl90b19oZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuaGV4O1xuXG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSEVYJztcbiAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSB2O1xuXG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRlZmluZVJHQkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdSR0InKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnUkdCJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdSR0InO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZGVmaW5lSFNWQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnSFNWJylcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSFNWJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIU1YnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVSR0IoY29sb3IsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSEVYJykge1xuXG4gICAgICBjb2xvci5fX3N0YXRlW2NvbXBvbmVudF0gPSBtYXRoLmNvbXBvbmVudF9mcm9tX2hleChjb2xvci5fX3N0YXRlLmhleCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgfSBlbHNlIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xuXG4gICAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIG1hdGguaHN2X3RvX3JnYihjb2xvci5fX3N0YXRlLmgsIGNvbG9yLl9fc3RhdGUucywgY29sb3IuX19zdGF0ZS52KSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyAnQ29ycnVwdGVkIGNvbG9yIHN0YXRlJztcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVIU1YoY29sb3IpIHtcblxuICAgIHZhciByZXN1bHQgPSBtYXRoLnJnYl90b19oc3YoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBzOiByZXN1bHQucyxcbiAgICAgICAgICB2OiByZXN1bHQudlxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGlmICghY29tbW9uLmlzTmFOKHJlc3VsdC5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gcmVzdWx0Lmg7XG4gICAgfSBlbHNlIGlmIChjb21tb24uaXNVbmRlZmluZWQoY29sb3IuX19zdGF0ZS5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gMDtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBDb2xvcjtcblxufSkoZGF0LmNvbG9yLmludGVycHJldCA9IChmdW5jdGlvbiAodG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciByZXN1bHQsIHRvUmV0dXJuO1xuXG4gIHZhciBpbnRlcnByZXQgPSBmdW5jdGlvbigpIHtcblxuICAgIHRvUmV0dXJuID0gZmFsc2U7XG5cbiAgICB2YXIgb3JpZ2luYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGNvbW1vbi50b0FycmF5KGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XG5cbiAgICBjb21tb24uZWFjaChJTlRFUlBSRVRBVElPTlMsIGZ1bmN0aW9uKGZhbWlseSkge1xuXG4gICAgICBpZiAoZmFtaWx5LmxpdG11cyhvcmlnaW5hbCkpIHtcblxuICAgICAgICBjb21tb24uZWFjaChmYW1pbHkuY29udmVyc2lvbnMsIGZ1bmN0aW9uKGNvbnZlcnNpb24sIGNvbnZlcnNpb25OYW1lKSB7XG5cbiAgICAgICAgICByZXN1bHQgPSBjb252ZXJzaW9uLnJlYWQob3JpZ2luYWwpO1xuXG4gICAgICAgICAgaWYgKHRvUmV0dXJuID09PSBmYWxzZSAmJiByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0b1JldHVybiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uTmFtZSA9IGNvbnZlcnNpb25OYW1lO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9O1xuXG4gIHZhciBJTlRFUlBSRVRBVElPTlMgPSBbXG5cbiAgICAvLyBTdHJpbmdzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc1N0cmluZyxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBUSFJFRV9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV0pKFtBLUYwLTldKShbQS1GMC05XSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KFxuICAgICAgICAgICAgICAgICAgJzB4JyArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsxXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzJdLnRvU3RyaW5nKCkgKyB0ZXN0WzJdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbM10udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBTSVhfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldezZ9KSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0JBOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiYVxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwsXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSksXG4gICAgICAgICAgICAgIGE6IHBhcnNlRmxvYXQodGVzdFs0XSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gTnVtYmVyc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNOdW1iZXIsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgSEVYOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBvcmlnaW5hbCxcbiAgICAgICAgICAgICAgY29udmVyc2lvbk5hbWU6ICdIRVgnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yLmhleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIEFycmF5c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNBcnJheSxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSAzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JBX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gNCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdLFxuICAgICAgICAgICAgICBhOiBvcmlnaW5hbFszXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmFdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBPYmplY3RzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc09iamVjdCxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iLFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmIsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnYsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cblxuICBdO1xuXG4gIHJldHVybiBpbnRlcnByZXQ7XG5cblxufSkoZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29sb3IubWF0aCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHRtcENvbXBvbmVudDtcblxuICByZXR1cm4ge1xuXG4gICAgaHN2X3RvX3JnYjogZnVuY3Rpb24oaCwgcywgdikge1xuXG4gICAgICB2YXIgaGkgPSBNYXRoLmZsb29yKGggLyA2MCkgJSA2O1xuXG4gICAgICB2YXIgZiA9IGggLyA2MCAtIE1hdGguZmxvb3IoaCAvIDYwKTtcbiAgICAgIHZhciBwID0gdiAqICgxLjAgLSBzKTtcbiAgICAgIHZhciBxID0gdiAqICgxLjAgLSAoZiAqIHMpKTtcbiAgICAgIHZhciB0ID0gdiAqICgxLjAgLSAoKDEuMCAtIGYpICogcykpO1xuICAgICAgdmFyIGMgPSBbXG4gICAgICAgIFt2LCB0LCBwXSxcbiAgICAgICAgW3EsIHYsIHBdLFxuICAgICAgICBbcCwgdiwgdF0sXG4gICAgICAgIFtwLCBxLCB2XSxcbiAgICAgICAgW3QsIHAsIHZdLFxuICAgICAgICBbdiwgcCwgcV1cbiAgICAgIF1baGldO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiBjWzBdICogMjU1LFxuICAgICAgICBnOiBjWzFdICogMjU1LFxuICAgICAgICBiOiBjWzJdICogMjU1XG4gICAgICB9O1xuXG4gICAgfSxcblxuICAgIHJnYl90b19oc3Y6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcblxuICAgICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgICAgIGRlbHRhID0gbWF4IC0gbWluLFxuICAgICAgICAgIGgsIHM7XG5cbiAgICAgIGlmIChtYXggIT0gMCkge1xuICAgICAgICBzID0gZGVsdGEgLyBtYXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGg6IE5hTixcbiAgICAgICAgICBzOiAwLFxuICAgICAgICAgIHY6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHIgPT0gbWF4KSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2UgaWYgKGcgPT0gbWF4KSB7XG4gICAgICAgIGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgICB9XG4gICAgICBoIC89IDY7XG4gICAgICBpZiAoaCA8IDApIHtcbiAgICAgICAgaCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBoOiBoICogMzYwLFxuICAgICAgICBzOiBzLFxuICAgICAgICB2OiBtYXggLyAyNTVcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHJnYl90b19oZXg6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcbiAgICAgIHZhciBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudCgwLCAyLCByKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMSwgZyk7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDAsIGIpO1xuICAgICAgcmV0dXJuIGhleDtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50X2Zyb21faGV4OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4KSB7XG4gICAgICByZXR1cm4gKGhleCA+PiAoY29tcG9uZW50SW5kZXggKiA4KSkgJiAweEZGO1xuICAgIH0sXG5cbiAgICBoZXhfd2l0aF9jb21wb25lbnQ6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPDwgKHRtcENvbXBvbmVudCA9IGNvbXBvbmVudEluZGV4ICogOCkgfCAoaGV4ICYgfiAoMHhGRiA8PCB0bXBDb21wb25lbnQpKTtcbiAgICB9XG5cbiAgfVxuXG59KSgpLFxuZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbik7IiwiLyoqXG4gKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XG4gKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxuICpcbiAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICovXG5cbi8qKiBAbmFtZXNwYWNlICovXG52YXIgZGF0ID0gbW9kdWxlLmV4cG9ydHMgPSBkYXQgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuZ3VpID0gZGF0Lmd1aSB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC51dGlscyA9IGRhdC51dGlscyB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb250cm9sbGVycyA9IGRhdC5jb250cm9sbGVycyB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5kb20gPSBkYXQuZG9tIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmNvbG9yID0gZGF0LmNvbG9yIHx8IHt9O1xuXG5kYXQudXRpbHMuY3NzID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBsb2FkOiBmdW5jdGlvbiAodXJsLCBkb2MpIHtcbiAgICAgIGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcbiAgICAgIHZhciBsaW5rID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0sXG4gICAgaW5qZWN0OiBmdW5jdGlvbihjc3MsIGRvYykge1xuICAgICAgZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuICAgICAgdmFyIGluamVjdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIGluamVjdGVkLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgaW5qZWN0ZWQuaW5uZXJIVE1MID0gY3NzO1xuICAgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoaW5qZWN0ZWQpO1xuICAgIH1cbiAgfVxufSkoKTtcblxuXG5kYXQudXRpbHMuY29tbW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgXG4gIHZhciBBUlJfRUFDSCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuICB2YXIgQVJSX1NMSUNFID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBCYW5kLWFpZCBtZXRob2RzIGZvciB0aGluZ3MgdGhhdCBzaG91bGQgYmUgYSBsb3QgZWFzaWVyIGluIEphdmFTY3JpcHQuXG4gICAqIEltcGxlbWVudGF0aW9uIGFuZCBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgdW5kZXJzY29yZS5qc1xuICAgKiBodHRwOi8vZG9jdW1lbnRjbG91ZC5naXRodWIuY29tL3VuZGVyc2NvcmUvXG4gICAqL1xuXG4gIHJldHVybiB7IFxuICAgIFxuICAgIEJSRUFLOiB7fSxcbiAgXG4gICAgZXh0ZW5kOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAoIXRoaXMuaXNVbmRlZmluZWQob2JqW2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmF1bHRzOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZCh0YXJnZXRba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICBcbiAgICB9LFxuICAgIFxuICAgIGNvbXBvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRvQ2FsbCA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRvQ2FsbC5sZW5ndGggLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IFt0b0NhbGxbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdHIsIHNjb3BlKSB7XG5cbiAgICAgIFxuICAgICAgaWYgKEFSUl9FQUNIICYmIG9iai5mb3JFYWNoID09PSBBUlJfRUFDSCkgeyBcbiAgICAgICAgXG4gICAgICAgIG9iai5mb3JFYWNoKGl0ciwgc2NvcGUpO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gb2JqLmxlbmd0aCArIDApIHsgLy8gSXMgbnVtYmVyIGJ1dCBub3QgTmFOXG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgPSAwLCBsID0gb2JqLmxlbmd0aDsga2V5IDwgbDsga2V5KyspXG4gICAgICAgICAgaWYgKGtleSBpbiBvYmogJiYgaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBcbiAgICAgICAgICBpZiAoaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9XG4gICAgICAgICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmVyOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgIHNldFRpbWVvdXQoZm5jLCAwKTtcbiAgICB9LFxuICAgIFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iai50b0FycmF5KSByZXR1cm4gb2JqLnRvQXJyYXkoKTtcbiAgICAgIHJldHVybiBBUlJfU0xJQ0UuY2FsbChvYmopO1xuICAgIH0sXG5cbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBcbiAgICBpc051bGw6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgICB9LFxuICAgIFxuICAgIGlzTmFOOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogIT09IG9iajtcbiAgICB9LFxuICAgIFxuICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbiAgICB9LFxuICAgIFxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKzA7XG4gICAgfSxcbiAgICBcbiAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorJyc7XG4gICAgfSxcbiAgICBcbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gZmFsc2UgfHwgb2JqID09PSB0cnVlO1xuICAgIH0sXG4gICAgXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfVxuICBcbiAgfTtcbiAgICBcbn0pKCk7XG5cblxuZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgQW4gXCJhYnN0cmFjdFwiIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgdGhpcy5pbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgLyoqXG4gICAgICogVGhvc2Ugd2hvIGV4dGVuZCB0aGlzIGNsYXNzIHdpbGwgcHV0IHRoZWlyIERPTSBlbGVtZW50cyBpbiBoZXJlLlxuICAgICAqIEB0eXBlIHtET01FbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9iamVjdCB0byBtYW5pcHVsYXRlXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYW5pcHVsYXRlXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGNoYW5nZS5cbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19vbkNoYW5nZSA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZmluaXNoaW5nIGNoYW5nZS5cbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IHVuZGVmaW5lZDtcblxuICB9O1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICAvKiogQGxlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLnByb3RvdHlwZSAqL1xuICAgICAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IHRoYXQgYSBmdW5jdGlvbiBmaXJlIGV2ZXJ5IHRpbWUgc29tZW9uZSBjaGFuZ2VzIHRoZSB2YWx1ZSB3aXRoXG4gICAgICAgICAqIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5jIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHZhbHVlXG4gICAgICAgICAqIGlzIG1vZGlmaWVkIHZpYSB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgICAgIHRoaXMuX19vbkNoYW5nZSA9IGZuYztcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSB0aGF0IGEgZnVuY3Rpb24gZmlyZSBldmVyeSB0aW1lIHNvbWVvbmUgXCJmaW5pc2hlc1wiIGNoYW5naW5nXG4gICAgICAgICAqIHRoZSB2YWx1ZSB3aWggdGhpcyBDb250cm9sbGVyLiBVc2VmdWwgZm9yIHZhbHVlcyB0aGF0IGNoYW5nZVxuICAgICAgICAgKiBpbmNyZW1lbnRhbGx5IGxpa2UgbnVtYmVycyBvciBzdHJpbmdzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbmMgVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlclxuICAgICAgICAgKiBzb21lb25lIFwiZmluaXNoZXNcIiBjaGFuZ2luZyB0aGUgdmFsdWUgdmlhIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBvbkZpbmlzaENoYW5nZTogZnVuY3Rpb24oZm5jKSB7XG4gICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gZm5jO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGFuZ2UgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdWYWx1ZSBUaGUgbmV3IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqL1xuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkNoYW5nZS5jYWxsKHRoaXMsIG5ld1ZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBjdXJyZW50IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqL1xuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWZyZXNoZXMgdGhlIHZpc3VhbCBkaXNwbGF5IG9mIGEgQ29udHJvbGxlciBpbiBvcmRlciB0byBrZWVwIHN5bmNcbiAgICAgICAgICogd2l0aCB0aGUgb2JqZWN0J3MgY3VycmVudCB2YWx1ZS5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIHZhbHVlIGhhcyBkZXZpYXRlZCBmcm9tIGluaXRpYWxWYWx1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNb2RpZmllZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbFZhbHVlICE9PSB0aGlzLmdldFZhbHVlKClcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcblxuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuZG9tLmRvbSA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgdmFyIEVWRU5UX01BUCA9IHtcbiAgICAnSFRNTEV2ZW50cyc6IFsnY2hhbmdlJ10sXG4gICAgJ01vdXNlRXZlbnRzJzogWydjbGljaycsJ21vdXNlbW92ZScsJ21vdXNlZG93bicsJ21vdXNldXAnLCAnbW91c2VvdmVyJ10sXG4gICAgJ0tleWJvYXJkRXZlbnRzJzogWydrZXlkb3duJ11cbiAgfTtcblxuICB2YXIgRVZFTlRfTUFQX0lOViA9IHt9O1xuICBjb21tb24uZWFjaChFVkVOVF9NQVAsIGZ1bmN0aW9uKHYsIGspIHtcbiAgICBjb21tb24uZWFjaCh2LCBmdW5jdGlvbihlKSB7XG4gICAgICBFVkVOVF9NQVBfSU5WW2VdID0gaztcbiAgICB9KTtcbiAgfSk7XG5cbiAgdmFyIENTU19WQUxVRV9QSVhFTFMgPSAvKFxcZCsoXFwuXFxkKyk/KXB4LztcblxuICBmdW5jdGlvbiBjc3NWYWx1ZVRvUGl4ZWxzKHZhbCkge1xuXG4gICAgaWYgKHZhbCA9PT0gJzAnIHx8IGNvbW1vbi5pc1VuZGVmaW5lZCh2YWwpKSByZXR1cm4gMDtcblxuICAgIHZhciBtYXRjaCA9IHZhbC5tYXRjaChDU1NfVkFMVUVfUElYRUxTKTtcblxuICAgIGlmICghY29tbW9uLmlzTnVsbChtYXRjaCkpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIC4uLmVtcz8gJT9cblxuICAgIHJldHVybiAwO1xuXG4gIH1cblxuICAvKipcbiAgICogQG5hbWVzcGFjZVxuICAgKiBAbWVtYmVyIGRhdC5kb21cbiAgICovXG4gIHZhciBkb20gPSB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBzZWxlY3RhYmxlXG4gICAgICovXG4gICAgbWFrZVNlbGVjdGFibGU6IGZ1bmN0aW9uKGVsZW0sIHNlbGVjdGFibGUpIHtcblxuICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCB8fCBlbGVtLnN0eWxlID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgZWxlbS5vbnNlbGVjdHN0YXJ0ID0gc2VsZWN0YWJsZSA/IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IDogZnVuY3Rpb24oKSB7XG4gICAgICB9O1xuXG4gICAgICBlbGVtLnN0eWxlLk1velVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgICAgZWxlbS5zdHlsZS5LaHRtbFVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgICAgZWxlbS51bnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlID8gJ29uJyA6ICdvZmYnO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gaG9yaXpvbnRhbFxuICAgICAqIEBwYXJhbSB2ZXJ0aWNhbFxuICAgICAqL1xuICAgIG1ha2VGdWxsc2NyZWVuOiBmdW5jdGlvbihlbGVtLCBob3Jpem9udGFsLCB2ZXJ0aWNhbCkge1xuXG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGhvcml6b250YWwpKSBob3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQodmVydGljYWwpKSB2ZXJ0aWNhbCA9IHRydWU7XG5cbiAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICBlbGVtLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICBlbGVtLnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgICBlbGVtLnN0eWxlLnRvcCA9IDA7XG4gICAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gMDtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZVxuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKi9cbiAgICBmYWtlRXZlbnQ6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50VHlwZSwgcGFyYW1zLCBhdXgpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgIHZhciBjbGFzc05hbWUgPSBFVkVOVF9NQVBfSU5WW2V2ZW50VHlwZV07XG4gICAgICBpZiAoIWNsYXNzTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50IHR5cGUgJyArIGV2ZW50VHlwZSArICcgbm90IHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChjbGFzc05hbWUpO1xuICAgICAgc3dpdGNoIChjbGFzc05hbWUpIHtcbiAgICAgICAgY2FzZSAnTW91c2VFdmVudHMnOlxuICAgICAgICAgIHZhciBjbGllbnRYID0gcGFyYW1zLnggfHwgcGFyYW1zLmNsaWVudFggfHwgMDtcbiAgICAgICAgICB2YXIgY2xpZW50WSA9IHBhcmFtcy55IHx8IHBhcmFtcy5jbGllbnRZIHx8IDA7XG4gICAgICAgICAgZXZ0LmluaXRNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUsIHdpbmRvdywgcGFyYW1zLmNsaWNrQ291bnQgfHwgMSxcbiAgICAgICAgICAgICAgMCwgLy9zY3JlZW4gWFxuICAgICAgICAgICAgICAwLCAvL3NjcmVlbiBZXG4gICAgICAgICAgICAgIGNsaWVudFgsIC8vY2xpZW50IFhcbiAgICAgICAgICAgICAgY2xpZW50WSwgLy9jbGllbnQgWVxuICAgICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0tleWJvYXJkRXZlbnRzJzpcbiAgICAgICAgICB2YXIgaW5pdCA9IGV2dC5pbml0S2V5Ym9hcmRFdmVudCB8fCBldnQuaW5pdEtleUV2ZW50OyAvLyB3ZWJraXQgfHwgbW96XG4gICAgICAgICAgY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGN0cmxLZXk6IGZhbHNlLFxuICAgICAgICAgICAgYWx0S2V5OiBmYWxzZSxcbiAgICAgICAgICAgIHNoaWZ0S2V5OiBmYWxzZSxcbiAgICAgICAgICAgIG1ldGFLZXk6IGZhbHNlLFxuICAgICAgICAgICAga2V5Q29kZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY2hhckNvZGU6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGluaXQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUsIHdpbmRvdyxcbiAgICAgICAgICAgICAgcGFyYW1zLmN0cmxLZXksIHBhcmFtcy5hbHRLZXksXG4gICAgICAgICAgICAgIHBhcmFtcy5zaGlmdEtleSwgcGFyYW1zLm1ldGFLZXksXG4gICAgICAgICAgICAgIHBhcmFtcy5rZXlDb2RlLCBwYXJhbXMuY2hhckNvZGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb21tb24uZGVmYXVsdHMoZXZ0LCBhdXgpO1xuICAgICAgZWxlbS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqIEBwYXJhbSBib29sXG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24oZWxlbSwgZXZlbnQsIGZ1bmMsIGJvb2wpIHtcbiAgICAgIGJvb2wgPSBib29sIHx8IGZhbHNlO1xuICAgICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcbiAgICAgIGVsc2UgaWYgKGVsZW0uYXR0YWNoRXZlbnQpXG4gICAgICAgIGVsZW0uYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqIEBwYXJhbSBib29sXG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbGVtLCBldmVudCwgZnVuYywgYm9vbCkge1xuICAgICAgYm9vbCA9IGJvb2wgfHwgZmFsc2U7XG4gICAgICBpZiAoZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5kZXRhY2hFdmVudClcbiAgICAgICAgZWxlbS5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKi9cbiAgICBhZGRDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgIT09IGNsYXNzTmFtZSkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW0uY2xhc3NOYW1lLnNwbGl0KC8gKy8pO1xuICAgICAgICBpZiAoY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSkgPT0gLTEpIHtcbiAgICAgICAgICBjbGFzc2VzLnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpLnJlcGxhY2UoL15cXHMrLywgJycpLnJlcGxhY2UoL1xccyskLywgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gY2xhc3NOYW1lKSB7XG4gICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcbiAgICAgICAgICB2YXIgaW5kZXggPSBjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIGhhc0NsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoPzpefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzK3wkKScpLnRlc3QoZWxlbS5jbGFzc05hbWUpIHx8IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0V2lkdGg6IGZ1bmN0aW9uKGVsZW0pIHtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcblxuICAgICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1sZWZ0LXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItcmlnaHQtd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctbGVmdCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1yaWdodCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnd2lkdGgnXSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBnZXRIZWlnaHQ6IGZ1bmN0aW9uKGVsZW0pIHtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcblxuICAgICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci10b3Atd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1ib3R0b20td2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctdG9wJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWJvdHRvbSddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnaGVpZ2h0J10pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0T2Zmc2V0OiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0ge2xlZnQ6IDAsIHRvcDowfTtcbiAgICAgIGlmIChlbGVtLm9mZnNldFBhcmVudCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb2Zmc2V0LmxlZnQgKz0gZWxlbS5vZmZzZXRMZWZ0O1xuICAgICAgICAgIG9mZnNldC50b3AgKz0gZWxlbS5vZmZzZXRUb3A7XG4gICAgICAgIH0gd2hpbGUgKGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH0sXG5cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcG9zdHMvMjY4NDU2MS9yZXZpc2lvbnNcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGlzQWN0aXZlOiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgKTtcbiAgICB9XG5cbiAgfTtcblxuICByZXR1cm4gZG9tO1xuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgc2VsZWN0IGlucHV0IHRvIGFsdGVyIHRoZSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QsIHVzaW5nIGFcbiAgICogbGlzdCBvZiBhY2NlcHRlZCB2YWx1ZXMuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ1tdfSBvcHRpb25zIEEgbWFwIG9mIGxhYmVscyB0byBhY2NlcHRhYmxlIHZhbHVlcywgb3JcbiAgICogYSBsaXN0IG9mIGFjY2VwdGFibGUgc3RyaW5nIHZhbHVlcy5cbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBPcHRpb25Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgb3B0aW9ucykge1xuXG4gICAgT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRyb3AgZG93biBtZW51XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcblxuICAgIGlmIChjb21tb24uaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgY29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBtYXBbZWxlbWVudF0gPSBlbGVtZW50O1xuICAgICAgfSk7XG4gICAgICBvcHRpb25zID0gbWFwO1xuICAgIH1cblxuICAgIGNvbW1vbi5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcblxuICAgICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgb3B0LmlubmVySFRNTCA9IGtleTtcbiAgICAgIG9wdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgX3RoaXMuX19zZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIH0pO1xuXG4gICAgLy8gQWNrbm93bGVkZ2Ugb3JpZ2luYWwgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19zZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXNpcmVkVmFsdWUgPSB0aGlzLm9wdGlvbnNbdGhpcy5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgICAgIF90aGlzLnNldFZhbHVlKGRlc2lyZWRWYWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3NlbGVjdCk7XG5cbiAgfTtcblxuICBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE9wdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuICAgICAgICAgIHZhciB0b1JldHVybiA9IE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5fX3NlbGVjdC52YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIE9wdGlvbkNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1pbl0gTWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1heF0gTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLnN0ZXBdIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBOdW1iZXJDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgIHRoaXMuX19taW4gPSBwYXJhbXMubWluO1xuICAgIHRoaXMuX19tYXggPSBwYXJhbXMubWF4O1xuICAgIHRoaXMuX19zdGVwID0gcGFyYW1zLnN0ZXA7XG5cbiAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHRoaXMuX19zdGVwKSkge1xuXG4gICAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUgPT0gMCkge1xuICAgICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSAxOyAvLyBXaGF0IGFyZSB3ZSwgcHN5Y2hpY3M/XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIZXkgRG91ZywgY2hlY2sgdGhpcyBvdXQuXG4gICAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nKHRoaXMuaW5pdGlhbFZhbHVlKS9NYXRoLkxOMTApKS8xMDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IHRoaXMuX19zdGVwO1xuXG4gICAgfVxuXG4gICAgdGhpcy5fX3ByZWNpc2lvbiA9IG51bURlY2ltYWxzKHRoaXMuX19pbXBsaWVkU3RlcCk7XG5cblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUgKi9cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuXG4gICAgICAgICAgaWYgKHRoaXMuX19taW4gIT09IHVuZGVmaW5lZCAmJiB2IDwgdGhpcy5fX21pbikge1xuICAgICAgICAgICAgdiA9IHRoaXMuX19taW47XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9fbWF4ICE9PSB1bmRlZmluZWQgJiYgdiA+IHRoaXMuX19tYXgpIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLl9fbWF4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9fc3RlcCAhPT0gdW5kZWZpbmVkICYmIHYgJSB0aGlzLl9fc3RlcCAhPSAwKSB7XG4gICAgICAgICAgICB2ID0gTWF0aC5yb3VuZCh2IC8gdGhpcy5fX3N0ZXApICogdGhpcy5fX3N0ZXA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IGEgbWluaW11bSB2YWx1ZSBmb3IgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5WYWx1ZSBUaGUgbWluaW11bSB2YWx1ZSBmb3JcbiAgICAgICAgICogPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBtaW46IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fbWluID0gdjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSBhIG1heGltdW0gdmFsdWUgZm9yIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4VmFsdWUgVGhlIG1heGltdW0gdmFsdWUgZm9yXG4gICAgICAgICAqIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgbWF4OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX21heCA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgYSBzdGVwIHZhbHVlIHRoYXQgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICAgICAgICogaW5jcmVtZW50cyBieS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBWYWx1ZSBUaGUgc3RlcCB2YWx1ZSBmb3JcbiAgICAgICAgICogZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICAgICAgICogQGRlZmF1bHQgaWYgbWluaW11bSBhbmQgbWF4aW11bSBzcGVjaWZpZWQgaW5jcmVtZW50IGlzIDElIG9mIHRoZVxuICAgICAgICAgKiBkaWZmZXJlbmNlIG90aGVyd2lzZSBzdGVwVmFsdWUgaXMgMVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fc3RlcCA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gbnVtRGVjaW1hbHMoeCkge1xuICAgIHggPSB4LnRvU3RyaW5nKCk7XG4gICAgaWYgKHguaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIHJldHVybiB4Lmxlbmd0aCAtIHguaW5kZXhPZignLicpIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3ggPSAoZnVuY3Rpb24gKE51bWJlckNvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIgYW5kXG4gICAqIHByb3ZpZGVzIGFuIGlucHV0IGVsZW1lbnQgd2l0aCB3aGljaCB0byBtYW5pcHVsYXRlIGl0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5taW5dIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5tYXhdIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5zdGVwXSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgTnVtYmVyQ29udHJvbGxlckJveCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSBmYWxzZTtcblxuICAgIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcyk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICoge051bWJlcn0gUHJldmlvdXMgbW91c2UgeSBwb3NpdGlvblxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB2YXIgcHJldl95O1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcblxuICAgIC8vIE1ha2VzIGl0IHNvIG1hbnVhbGx5IHNwZWNpZmllZCB2YWx1ZXMgYXJlIG5vdCB0cnVuY2F0ZWQuXG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIC8vIFdoZW4gcHJlc3NpbmcgZW50aXJlLCB5b3UgY2FuIGJlIGFzIHByZWNpc2UgYXMgeW91IHdhbnQuXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBfdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgdmFyIGF0dGVtcHRlZCA9IHBhcnNlRmxvYXQoX3RoaXMuX19pbnB1dC52YWx1ZSk7XG4gICAgICBpZiAoIWNvbW1vbi5pc05hTihhdHRlbXB0ZWQpKSBfdGhpcy5zZXRWYWx1ZShhdHRlbXB0ZWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIG9uQ2hhbmdlKCk7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgcHJldl95ID0gZS5jbGllbnRZO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEcmFnKGUpIHtcblxuICAgICAgdmFyIGRpZmYgPSBwcmV2X3kgLSBlLmNsaWVudFk7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5nZXRWYWx1ZSgpICsgZGlmZiAqIF90aGlzLl9faW1wbGllZFN0ZXApO1xuXG4gICAgICBwcmV2X3kgPSBlLmNsaWVudFk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcyA9IE51bWJlckNvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlckJveC5wcm90b3R5cGUsXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPyB0aGlzLmdldFZhbHVlKCkgOiByb3VuZFRvRGVjaW1hbCh0aGlzLmdldFZhbHVlKCksIHRoaXMuX19wcmVjaXNpb24pO1xuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICBmdW5jdGlvbiByb3VuZFRvRGVjaW1hbCh2YWx1ZSwgZGVjaW1hbHMpIHtcbiAgICB2YXIgdGVuVG8gPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogdGVuVG8pIC8gdGVuVG87XG4gIH1cblxuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveDtcblxufSkoZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyU2xpZGVyID0gKGZ1bmN0aW9uIChOdW1iZXJDb250cm9sbGVyLCBkb20sIGNzcywgY29tbW9uLCBzdHlsZVNoZWV0KSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIsIGNvbnRhaW5zXG4gICAqIGEgbWluaW11bSBhbmQgbWF4aW11bSwgYW5kIHByb3ZpZGVzIGEgc2xpZGVyIGVsZW1lbnQgd2l0aCB3aGljaCB0b1xuICAgKiBtYW5pcHVsYXRlIGl0LiBJdCBzaG91bGQgYmUgbm90ZWQgdGhhdCB0aGUgc2xpZGVyIGVsZW1lbnQgaXMgbWFkZSB1cCBvZlxuICAgKiA8Y29kZT4mbHQ7ZGl2Jmd0OzwvY29kZT4gdGFncywgPHN0cm9uZz5ub3Q8L3N0cm9uZz4gdGhlIGh0bWw1XG4gICAqIDxjb2RlPiZsdDtzbGlkZXImZ3Q7PC9jb2RlPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1pblZhbHVlIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gbWF4VmFsdWUgTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwVmFsdWUgSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE51bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBtaW4sIG1heCwgc3RlcCkge1xuXG4gICAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IG1pbiwgbWF4OiBtYXgsIHN0ZXA6IHN0ZXAgfSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2JhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fZm9yZWdyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFxuXG5cbiAgICBkb20uYmluZCh0aGlzLl9fYmFja2dyb3VuZCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBcbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2JhY2tncm91bmQsICdzbGlkZXInKTtcbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2ZvcmVncm91bmQsICdzbGlkZXItZmcnKTtcblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcblxuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG5cbiAgICAgIG9uTW91c2VEcmFnKGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEcmFnKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgb2Zmc2V0ID0gZG9tLmdldE9mZnNldChfdGhpcy5fX2JhY2tncm91bmQpO1xuICAgICAgdmFyIHdpZHRoID0gZG9tLmdldFdpZHRoKF90aGlzLl9fYmFja2dyb3VuZCk7XG4gICAgICBcbiAgICAgIF90aGlzLnNldFZhbHVlKFxuICAgICAgICBtYXAoZS5jbGllbnRYLCBvZmZzZXQubGVmdCwgb2Zmc2V0LmxlZnQgKyB3aWR0aCwgX3RoaXMuX19taW4sIF90aGlzLl9fbWF4KVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIHRoaXMuX19iYWNrZ3JvdW5kLmFwcGVuZENoaWxkKHRoaXMuX19mb3JlZ3JvdW5kKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2JhY2tncm91bmQpO1xuXG4gIH07XG5cbiAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzID0gTnVtYmVyQ29udHJvbGxlcjtcblxuICAvKipcbiAgICogSW5qZWN0cyBkZWZhdWx0IHN0eWxlc2hlZXQgZm9yIHNsaWRlciBlbGVtZW50cy5cbiAgICovXG4gIE51bWJlckNvbnRyb2xsZXJTbGlkZXIudXNlRGVmYXVsdFN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIGNzcy5pbmplY3Qoc3R5bGVTaGVldCk7XG4gIH07XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5wcm90b3R5cGUsXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwY3QgPSAodGhpcy5nZXRWYWx1ZSgpIC0gdGhpcy5fX21pbikvKHRoaXMuX19tYXggLSB0aGlzLl9fbWluKTtcbiAgICAgICAgICB0aGlzLl9fZm9yZWdyb3VuZC5zdHlsZS53aWR0aCA9IHBjdCoxMDArJyUnO1xuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cblxuXG4gICk7XG5cbiAgZnVuY3Rpb24gbWFwKHYsIGkxLCBpMiwgbzEsIG8yKSB7XG4gICAgcmV0dXJuIG8xICsgKG8yIC0gbzEpICogKCh2IC0gaTEpIC8gKGkyIC0gaTEpKTtcbiAgfVxuXG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyO1xuICBcbn0pKGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY3NzLFxuZGF0LnV0aWxzLmNvbW1vbixcblwiLnNsaWRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjE1KTtcXG4gIGhlaWdodDogMWVtO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gIHBhZGRpbmc6IDAgMC41ZW07XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uc2xpZGVyLWZnIHtcXG4gIHBhZGRpbmc6IDFweCAwIDJweCAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FhYTtcXG4gIGhlaWdodDogMWVtO1xcbiAgbWFyZ2luLWxlZnQ6IC0wLjVlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDAuNWVtO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtIDAgMCAxZW07XFxufVxcblxcbi5zbGlkZXItZmc6YWZ0ZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogIDFweCBzb2xpZCAjYWFhO1xcbiAgY29udGVudDogJyc7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBtYXJnaW4tcmlnaHQ6IC0xZW07XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgaGVpZ2h0OiAwLjllbTtcXG4gIHdpZHRoOiAwLjllbTtcXG59XCIpO1xuXG5cbmRhdC5jb250cm9sbGVycy5GdW5jdGlvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIEdVSSBpbnRlcmZhY2UgdG8gZmlyZSBhIHNwZWNpZmllZCBtZXRob2QsIGEgcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIEZ1bmN0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHRleHQpIHtcblxuICAgIEZ1bmN0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19idXR0b24uaW5uZXJIVE1MID0gdGV4dCA9PT0gdW5kZWZpbmVkID8gJ0ZpcmUnIDogdGV4dDtcbiAgICBkb20uYmluZCh0aGlzLl9fYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBfdGhpcy5maXJlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2J1dHRvbiwgJ2J1dHRvbicpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19idXR0b24pO1xuXG5cbiAgfTtcblxuICBGdW5jdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgRnVuY3Rpb25Db250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAge1xuICAgICAgICBcbiAgICAgICAgZmlyZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ2V0VmFsdWUoKS5jYWxsKHRoaXMub2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIEZ1bmN0aW9uQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgY2hlY2tib3ggaW5wdXQgdG8gYWx0ZXIgdGhlIGJvb2xlYW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIEJvb2xlYW5Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLl9fcHJldiA9IHRoaXMuZ2V0VmFsdWUoKTtcblxuICAgIHRoaXMuX19jaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2NoZWNrYm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuXG5cbiAgICBkb20uYmluZCh0aGlzLl9fY2hlY2tib3gsICdjaGFuZ2UnLCBvbkNoYW5nZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jaGVja2JveCk7XG5cbiAgICAvLyBNYXRjaCBvcmlnaW5hbCB2YWx1ZVxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICBfdGhpcy5zZXRWYWx1ZSghX3RoaXMuX19wcmV2KTtcbiAgICB9XG5cbiAgfTtcblxuICBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9fcHJldiA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHRoaXMuZ2V0VmFsdWUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fX2NoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IHRydWU7ICAgIFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX19jaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbG9yLnRvU3RyaW5nID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICByZXR1cm4gZnVuY3Rpb24oY29sb3IpIHtcblxuICAgIGlmIChjb2xvci5hID09IDEgfHwgY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLmEpKSB7XG5cbiAgICAgIHZhciBzID0gY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcbiAgICAgIHdoaWxlIChzLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcyA9ICcwJyArIHM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnIycgKyBzO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBNYXRoLnJvdW5kKGNvbG9yLnIpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5nKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuYikgKyAnLCcgKyBjb2xvci5hICsgJyknO1xuXG4gICAgfVxuXG4gIH1cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbG9yLmludGVycHJldCA9IChmdW5jdGlvbiAodG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciByZXN1bHQsIHRvUmV0dXJuO1xuXG4gIHZhciBpbnRlcnByZXQgPSBmdW5jdGlvbigpIHtcblxuICAgIHRvUmV0dXJuID0gZmFsc2U7XG5cbiAgICB2YXIgb3JpZ2luYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGNvbW1vbi50b0FycmF5KGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XG5cbiAgICBjb21tb24uZWFjaChJTlRFUlBSRVRBVElPTlMsIGZ1bmN0aW9uKGZhbWlseSkge1xuXG4gICAgICBpZiAoZmFtaWx5LmxpdG11cyhvcmlnaW5hbCkpIHtcblxuICAgICAgICBjb21tb24uZWFjaChmYW1pbHkuY29udmVyc2lvbnMsIGZ1bmN0aW9uKGNvbnZlcnNpb24sIGNvbnZlcnNpb25OYW1lKSB7XG5cbiAgICAgICAgICByZXN1bHQgPSBjb252ZXJzaW9uLnJlYWQob3JpZ2luYWwpO1xuXG4gICAgICAgICAgaWYgKHRvUmV0dXJuID09PSBmYWxzZSAmJiByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0b1JldHVybiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uTmFtZSA9IGNvbnZlcnNpb25OYW1lO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9O1xuXG4gIHZhciBJTlRFUlBSRVRBVElPTlMgPSBbXG5cbiAgICAvLyBTdHJpbmdzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc1N0cmluZyxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBUSFJFRV9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV0pKFtBLUYwLTldKShbQS1GMC05XSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KFxuICAgICAgICAgICAgICAgICAgJzB4JyArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsxXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzJdLnRvU3RyaW5nKCkgKyB0ZXN0WzJdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbM10udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBTSVhfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldezZ9KSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0JBOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiYVxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwsXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSksXG4gICAgICAgICAgICAgIGE6IHBhcnNlRmxvYXQodGVzdFs0XSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gTnVtYmVyc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNOdW1iZXIsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgSEVYOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBvcmlnaW5hbCxcbiAgICAgICAgICAgICAgY29udmVyc2lvbk5hbWU6ICdIRVgnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yLmhleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIEFycmF5c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNBcnJheSxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSAzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JBX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gNCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdLFxuICAgICAgICAgICAgICBhOiBvcmlnaW5hbFszXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmFdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBPYmplY3RzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc09iamVjdCxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iLFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmIsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnYsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cblxuICBdO1xuXG4gIHJldHVybiBpbnRlcnByZXQ7XG5cblxufSkoZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LkdVSSA9IGRhdC5ndWkuR1VJID0gKGZ1bmN0aW9uIChjc3MsIHNhdmVEaWFsb2d1ZUNvbnRlbnRzLCBzdHlsZVNoZWV0LCBjb250cm9sbGVyRmFjdG9yeSwgQ29udHJvbGxlciwgQm9vbGVhbkNvbnRyb2xsZXIsIEZ1bmN0aW9uQ29udHJvbGxlciwgTnVtYmVyQ29udHJvbGxlckJveCwgTnVtYmVyQ29udHJvbGxlclNsaWRlciwgT3B0aW9uQ29udHJvbGxlciwgQ29sb3JDb250cm9sbGVyLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIENlbnRlcmVkRGl2LCBkb20sIGNvbW1vbikge1xuXG4gIGNzcy5pbmplY3Qoc3R5bGVTaGVldCk7XG5cbiAgLyoqIE91dGVyLW1vc3QgY2xhc3NOYW1lIGZvciBHVUkncyAqL1xuICB2YXIgQ1NTX05BTUVTUEFDRSA9ICdkZyc7XG5cbiAgdmFyIEhJREVfS0VZX0NPREUgPSA3MjtcblxuICAvKiogVGhlIG9ubHkgdmFsdWUgc2hhcmVkIGJldHdlZW4gdGhlIEpTIGFuZCBTQ1NTLiBVc2UgY2F1dGlvbi4gKi9cbiAgdmFyIENMT1NFX0JVVFRPTl9IRUlHSFQgPSAyMDtcblxuICB2YXIgREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FID0gJ0RlZmF1bHQnO1xuXG4gIHZhciBTVVBQT1JUU19MT0NBTF9TVE9SQUdFID0gKGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93ICYmIHdpbmRvd1snbG9jYWxTdG9yYWdlJ10gIT09IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSkoKTtcblxuICB2YXIgU0FWRV9ESUFMT0dVRTtcblxuICAvKiogSGF2ZSB3ZSB5ZXQgdG8gY3JlYXRlIGFuIGF1dG9QbGFjZSBHVUk/ICovXG4gIHZhciBhdXRvX3BsYWNlX3ZpcmdpbiA9IHRydWU7XG5cbiAgLyoqIEZpeGVkIHBvc2l0aW9uIGRpdiB0aGF0IGF1dG8gcGxhY2UgR1VJJ3MgZ28gaW5zaWRlICovXG4gIHZhciBhdXRvX3BsYWNlX2NvbnRhaW5lcjtcblxuICAvKiogQXJlIHdlIGhpZGluZyB0aGUgR1VJJ3MgPyAqL1xuICB2YXIgaGlkZSA9IGZhbHNlO1xuXG4gIC8qKiBHVUkncyB3aGljaCBzaG91bGQgYmUgaGlkZGVuICovXG4gIHZhciBoaWRlYWJsZV9ndWlzID0gW107XG5cbiAgLyoqXG4gICAqIEEgbGlnaHR3ZWlnaHQgY29udHJvbGxlciBsaWJyYXJ5IGZvciBKYXZhU2NyaXB0LiBJdCBhbGxvd3MgeW91IHRvIGVhc2lseVxuICAgKiBtYW5pcHVsYXRlIHZhcmlhYmxlcyBhbmQgZmlyZSBmdW5jdGlvbnMgb24gdGhlIGZseS5cbiAgICogQGNsYXNzXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0Lmd1aVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwYXJhbXMubmFtZV0gVGhlIG5hbWUgb2YgdGhpcyBHVUkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zLmxvYWRdIEpTT04gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgc2F2ZWQgc3RhdGUgb2ZcbiAgICogdGhpcyBHVUkuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5hdXRvPXRydWVdXG4gICAqIEBwYXJhbSB7ZGF0Lmd1aS5HVUl9IFtwYXJhbXMucGFyZW50XSBUaGUgR1VJIEknbSBuZXN0ZWQgaW4uXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5jbG9zZWRdIElmIHRydWUsIHN0YXJ0cyBjbG9zZWRcbiAgICovXG4gIHZhciBHVUkgPSBmdW5jdGlvbihwYXJhbXMpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBPdXRlcm1vc3QgRE9NIEVsZW1lbnRcbiAgICAgKiBAdHlwZSBET01FbGVtZW50XG4gICAgICovXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3VsKTtcblxuICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIENTU19OQU1FU1BBQ0UpO1xuXG4gICAgLyoqXG4gICAgICogTmVzdGVkIEdVSSdzIGJ5IG5hbWVcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX2ZvbGRlcnMgPSB7fTtcblxuICAgIHRoaXMuX19jb250cm9sbGVycyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBvYmplY3RzIEknbSByZW1lbWJlcmluZyBmb3Igc2F2ZSwgb25seSB1c2VkIGluIHRvcCBsZXZlbCBHVUlcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIHRoZSBpbmRleCBvZiByZW1lbWJlcmVkIG9iamVjdHMgdG8gYSBtYXAgb2YgY29udHJvbGxlcnMsIG9ubHkgdXNlZFxuICAgICAqIGluIHRvcCBsZXZlbCBHVUkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogW1xuICAgICAqICB7XG4gICAgICogICAgcHJvcGVydHlOYW1lOiBDb250cm9sbGVyLFxuICAgICAqICAgIGFub3RoZXJQcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXJcbiAgICAgKiAgfSxcbiAgICAgKiAge1xuICAgICAqICAgIHByb3BlcnR5TmFtZTogQ29udHJvbGxlclxuICAgICAqICB9XG4gICAgICogXVxuICAgICAqL1xuICAgIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnMgPSBbXTtcblxuICAgIHRoaXMuX19saXN0ZW5pbmcgPSBbXTtcblxuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgIC8vIERlZmF1bHQgcGFyYW1ldGVyc1xuICAgIHBhcmFtcyA9IGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgIGF1dG9QbGFjZTogdHJ1ZSxcbiAgICAgIHdpZHRoOiBHVUkuREVGQVVMVF9XSURUSFxuICAgIH0pO1xuXG4gICAgcGFyYW1zID0gY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgcmVzaXphYmxlOiBwYXJhbXMuYXV0b1BsYWNlLFxuICAgICAgaGlkZWFibGU6IHBhcmFtcy5hdXRvUGxhY2VcbiAgICB9KTtcblxuXG4gICAgaWYgKCFjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLmxvYWQpKSB7XG5cbiAgICAgIC8vIEV4cGxpY2l0IHByZXNldFxuICAgICAgaWYgKHBhcmFtcy5wcmVzZXQpIHBhcmFtcy5sb2FkLnByZXNldCA9IHBhcmFtcy5wcmVzZXQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBwYXJhbXMubG9hZCA9IHsgcHJlc2V0OiBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgfTtcblxuICAgIH1cblxuICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLmhpZGVhYmxlKSB7XG4gICAgICBoaWRlYWJsZV9ndWlzLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgLy8gT25seSByb290IGxldmVsIEdVSSdzIGFyZSByZXNpemFibGUuXG4gICAgcGFyYW1zLnJlc2l6YWJsZSA9IGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMucmVzaXphYmxlO1xuXG5cbiAgICBpZiAocGFyYW1zLmF1dG9QbGFjZSAmJiBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnNjcm9sbGFibGUpKSB7XG4gICAgICBwYXJhbXMuc2Nyb2xsYWJsZSA9IHRydWU7XG4gICAgfVxuLy8gICAgcGFyYW1zLnNjcm9sbGFibGUgPSBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnNjcm9sbGFibGUgPT09IHRydWU7XG5cbiAgICAvLyBOb3QgcGFydCBvZiBwYXJhbXMgYmVjYXVzZSBJIGRvbid0IHdhbnQgcGVvcGxlIHBhc3NpbmcgdGhpcyBpbiB2aWFcbiAgICAvLyBjb25zdHJ1Y3Rvci4gU2hvdWxkIGJlIGEgJ3JlbWVtYmVyZWQnIHZhbHVlLlxuICAgIHZhciB1c2VfbG9jYWxfc3RvcmFnZSA9XG4gICAgICAgIFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UgJiZcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2lzTG9jYWwnKSkgPT09ICd0cnVlJztcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsXG5cbiAgICAgICAgLyoqIEBsZW5kcyBkYXQuZ3VpLkdVSS5wcm90b3R5cGUgKi9cbiAgICAgICAge1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIHBhcmVudCA8Y29kZT5HVUk8L2NvZGU+XG4gICAgICAgICAgICogQHR5cGUgZGF0Lmd1aS5HVUlcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzY3JvbGxhYmxlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnNjcm9sbGFibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEhhbmRsZXMgPGNvZGU+R1VJPC9jb2RlPidzIGVsZW1lbnQgcGxhY2VtZW50IGZvciB5b3VcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgYXV0b1BsYWNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmF1dG9QbGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIGlkZW50aWZpZXIgZm9yIGEgc2V0IG9mIHNhdmVkIHZhbHVlc1xuICAgICAgICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAgICAgICAqL1xuICAgICAgICAgIHByZXNldDoge1xuXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmdldFJvb3QoKS5wcmVzZXQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5sb2FkLnByZXNldDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRSb290KCkucHJlc2V0ID0gdjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMubG9hZC5wcmVzZXQgPSB2O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldFByZXNldFNlbGVjdEluZGV4KHRoaXMpO1xuICAgICAgICAgICAgICBfdGhpcy5yZXZlcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgd2lkdGggb2YgPGNvZGU+R1VJPC9jb2RlPiBlbGVtZW50XG4gICAgICAgICAgICogQHR5cGUgTnVtYmVyXG4gICAgICAgICAgICovXG4gICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMud2lkdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIHBhcmFtcy53aWR0aCA9IHY7XG4gICAgICAgICAgICAgIHNldFdpZHRoKF90aGlzLCB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIG5hbWUgb2YgPGNvZGU+R1VJPC9jb2RlPi4gVXNlZCBmb3IgZm9sZGVycy4gaS5lXG4gICAgICAgICAgICogYSBmb2xkZXIncyBuYW1lXG4gICAgICAgICAgICogQHR5cGUgU3RyaW5nXG4gICAgICAgICAgICovXG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5uYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBjb2xsaXNpb25zIGFtb25nIHNpYmxpbmcgZm9sZGVyc1xuICAgICAgICAgICAgICBwYXJhbXMubmFtZSA9IHY7XG4gICAgICAgICAgICAgIGlmICh0aXRsZV9yb3dfbmFtZSkge1xuICAgICAgICAgICAgICAgIHRpdGxlX3Jvd19uYW1lLmlubmVySFRNTCA9IHBhcmFtcy5uYW1lO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFdoZXRoZXIgdGhlIDxjb2RlPkdVSTwvY29kZT4gaXMgY29sbGFwc2VkIG9yIG5vdFxuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjbG9zZWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBwYXJhbXMuY2xvc2VkID0gdjtcbiAgICAgICAgICAgICAgaWYgKHBhcmFtcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoX3RoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEZvciBicm93c2VycyB0aGF0IGFyZW4ndCBnb2luZyB0byByZXNwZWN0IHRoZSBDU1MgdHJhbnNpdGlvbixcbiAgICAgICAgICAgICAgLy8gTGV0cyBqdXN0IGNoZWNrIG91ciBoZWlnaHQgYWdhaW5zdCB0aGUgd2luZG93IGhlaWdodCByaWdodCBvZmZcbiAgICAgICAgICAgICAgLy8gdGhlIGJhdC5cbiAgICAgICAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAgIGlmIChfdGhpcy5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSB2ID8gR1VJLlRFWFRfT1BFTiA6IEdVSS5URVhUX0NMT1NFRDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDb250YWlucyBhbGwgcHJlc2V0c1xuICAgICAgICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0byB1c2UgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS9TdG9yYWdlI2xvY2FsU3RvcmFnZVwiPmxvY2FsU3RvcmFnZTwvYT4gYXMgdGhlIG1lYW5zIGZvclxuICAgICAgICAgICAqIDxjb2RlPnJlbWVtYmVyPC9jb2RlPmluZ1xuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB1c2VMb2NhbFN0b3JhZ2U6IHtcblxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVzZV9sb2NhbF9zdG9yYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oYm9vbCkge1xuICAgICAgICAgICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuICAgICAgICAgICAgICAgIHVzZV9sb2NhbF9zdG9yYWdlID0gYm9vbDtcbiAgICAgICAgICAgICAgICBpZiAoYm9vbCkge1xuICAgICAgICAgICAgICAgICAgZG9tLmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZG9tLnVuYmluZCh3aW5kb3csICd1bmxvYWQnLCBzYXZlVG9Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnaXNMb2NhbCcpLCBib29sKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgLy8gQXJlIHdlIGEgcm9vdCBsZXZlbCBHVUk/XG4gICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuXG4gICAgICBwYXJhbXMuY2xvc2VkID0gZmFsc2U7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19NQUlOKTtcbiAgICAgIGRvbS5tYWtlU2VsZWN0YWJsZSh0aGlzLmRvbUVsZW1lbnQsIGZhbHNlKTtcblxuICAgICAgLy8gQXJlIHdlIHN1cHBvc2VkIHRvIGJlIGxvYWRpbmcgbG9jYWxseT9cbiAgICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG5cbiAgICAgICAgaWYgKHVzZV9sb2NhbF9zdG9yYWdlKSB7XG5cbiAgICAgICAgICBfdGhpcy51c2VMb2NhbFN0b3JhZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHNhdmVkX2d1aSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2d1aScpKTtcblxuICAgICAgICAgIGlmIChzYXZlZF9ndWkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5sb2FkID0gSlNPTi5wYXJzZShzYXZlZF9ndWkpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5fX2Nsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLl9fY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gR1VJLlRFWFRfQ0xPU0VEO1xuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0NMT1NFX0JVVFRPTik7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2Nsb3NlQnV0dG9uKTtcblxuICAgICAgZG9tLmJpbmQodGhpcy5fX2Nsb3NlQnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuXG5cbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIE9oLCB5b3UncmUgYSBuZXN0ZWQgR1VJIVxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGlmIChwYXJhbXMuY2xvc2VkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aXRsZV9yb3dfbmFtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhcmFtcy5uYW1lKTtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aXRsZV9yb3dfbmFtZSwgJ2NvbnRyb2xsZXItbmFtZScpO1xuXG4gICAgICB2YXIgdGl0bGVfcm93ID0gYWRkUm93KF90aGlzLCB0aXRsZV9yb3dfbmFtZSk7XG5cbiAgICAgIHZhciBvbl9jbGlja190aXRsZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcblxuICAgICAgZG9tLmFkZENsYXNzKHRpdGxlX3JvdywgJ3RpdGxlJyk7XG4gICAgICBkb20uYmluZCh0aXRsZV9yb3csICdjbGljaycsIG9uX2NsaWNrX3RpdGxlKTtcblxuICAgICAgaWYgKCFwYXJhbXMuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmF1dG9QbGFjZSkge1xuXG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpKSB7XG5cbiAgICAgICAgaWYgKGF1dG9fcGxhY2VfdmlyZ2luKSB7XG4gICAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBkb20uYWRkQ2xhc3MoYXV0b19wbGFjZV9jb250YWluZXIsIENTU19OQU1FU1BBQ0UpO1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhhdXRvX3BsYWNlX2NvbnRhaW5lciwgR1VJLkNMQVNTX0FVVE9fUExBQ0VfQ09OVEFJTkVSKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF1dG9fcGxhY2VfY29udGFpbmVyKTtcbiAgICAgICAgICBhdXRvX3BsYWNlX3ZpcmdpbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHV0IGl0IGluIHRoZSBkb20gZm9yIHlvdS5cbiAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcblxuICAgICAgICAvLyBBcHBseSB0aGUgYXV0byBzdHlsZXNcbiAgICAgICAgZG9tLmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgR1VJLkNMQVNTX0FVVE9fUExBQ0UpO1xuXG4gICAgICB9XG5cblxuICAgICAgLy8gTWFrZSBpdCBub3QgZWxhc3RpYy5cbiAgICAgIGlmICghdGhpcy5wYXJlbnQpIHNldFdpZHRoKF90aGlzLCBwYXJhbXMud2lkdGgpO1xuXG4gICAgfVxuXG4gICAgZG9tLmJpbmQod2luZG93LCAncmVzaXplJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpOyB9KTtcbiAgICBkb20uYmluZCh0aGlzLl9fdWwsICd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAnb1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKSB9KTtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG5cblxuICAgIGlmIChwYXJhbXMucmVzaXphYmxlKSB7XG4gICAgICBhZGRSZXNpemVIYW5kbGUodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2d1aScpLCBKU09OLnN0cmluZ2lmeShfdGhpcy5nZXRTYXZlT2JqZWN0KCkpKTtcbiAgICB9XG5cbiAgICB2YXIgcm9vdCA9IF90aGlzLmdldFJvb3QoKTtcbiAgICBmdW5jdGlvbiByZXNldFdpZHRoKCkge1xuICAgICAgICB2YXIgcm9vdCA9IF90aGlzLmdldFJvb3QoKTtcbiAgICAgICAgcm9vdC53aWR0aCArPSAxO1xuICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcm9vdC53aWR0aCAtPSAxO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJhbXMucGFyZW50KSB7XG4gICAgICAgIHJlc2V0V2lkdGgoKTtcbiAgICAgIH1cblxuICB9O1xuXG4gIEdVSS50b2dnbGVIaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICBoaWRlID0gIWhpZGU7XG4gICAgY29tbW9uLmVhY2goaGlkZWFibGVfZ3VpcywgZnVuY3Rpb24oZ3VpKSB7XG4gICAgICBndWkuZG9tRWxlbWVudC5zdHlsZS56SW5kZXggPSBoaWRlID8gLTk5OSA6IDk5OTtcbiAgICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBoaWRlID8gMCA6IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgR1VJLkNMQVNTX0FVVE9fUExBQ0UgPSAnYSc7XG4gIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUiA9ICdhYyc7XG4gIEdVSS5DTEFTU19NQUlOID0gJ21haW4nO1xuICBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cgPSAnY3InO1xuICBHVUkuQ0xBU1NfVE9PX1RBTEwgPSAndGFsbGVyLXRoYW4td2luZG93JztcbiAgR1VJLkNMQVNTX0NMT1NFRCA9ICdjbG9zZWQnO1xuICBHVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OID0gJ2Nsb3NlLWJ1dHRvbic7XG4gIEdVSS5DTEFTU19EUkFHID0gJ2RyYWcnO1xuXG4gIEdVSS5ERUZBVUxUX1dJRFRIID0gMjQ1O1xuICBHVUkuVEVYVF9DTE9TRUQgPSAnQ2xvc2UgQ29udHJvbHMnO1xuICBHVUkuVEVYVF9PUEVOID0gJ09wZW4gQ29udHJvbHMnO1xuXG4gIGRvbS5iaW5kKHdpbmRvdywgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50eXBlICE9PSAndGV4dCcgJiZcbiAgICAgICAgKGUud2hpY2ggPT09IEhJREVfS0VZX0NPREUgfHwgZS5rZXlDb2RlID09IEhJREVfS0VZX0NPREUpKSB7XG4gICAgICBHVUkudG9nZ2xlSGlkZSgpO1xuICAgIH1cblxuICB9LCBmYWxzZSk7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgR1VJLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuZ3VpLkdVSSAqL1xuICAgICAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IFRoZSBuZXcgY29udHJvbGxlciB0aGF0IHdhcyBhZGRlZC5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbG9yQ29udHJvbGxlcn0gVGhlIG5ldyBjb250cm9sbGVyIHRoYXQgd2FzIGFkZGVkLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGFkZENvbG9yOiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIGNvbnRyb2xsZXJcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgIC8vIFRPRE8gbGlzdGVuaW5nP1xuICAgICAgICAgIHRoaXMuX191bC5yZW1vdmVDaGlsZChjb250cm9sbGVyLl9fbGkpO1xuICAgICAgICAgIHRoaXMuX19jb250cm9sbGVycy5zbGljZSh0aGlzLl9fY29udHJvbGxlcnMuaW5kZXhPZihjb250cm9sbGVyKSwgMSk7XG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuZ3VpLkdVSX0gVGhlIG5ldyBmb2xkZXIuXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiB0aGlzIEdVSSBhbHJlYWR5IGhhcyBhIGZvbGRlciBieSB0aGUgc3BlY2lmaWVkXG4gICAgICAgICAqIG5hbWVcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGRGb2xkZXI6IGZ1bmN0aW9uKG5hbWUpIHtcblxuICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcHJldmVudCBjb2xsaXNpb25zIG9uIG5hbWVzIGluIG9yZGVyIHRvIGhhdmUgYSBrZXlcbiAgICAgICAgICAvLyBieSB3aGljaCB0byByZW1lbWJlciBzYXZlZCB2YWx1ZXNcbiAgICAgICAgICBpZiAodGhpcy5fX2ZvbGRlcnNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgYWxyZWFkeSBoYXZlIGEgZm9sZGVyIGluIHRoaXMgR1VJIGJ5IHRoZScgK1xuICAgICAgICAgICAgICAgICcgbmFtZSBcIicgKyBuYW1lICsgJ1wiJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5ld19ndWlfcGFyYW1zID0geyBuYW1lOiBuYW1lLCBwYXJlbnQ6IHRoaXMgfTtcblxuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcGFzcyBkb3duIHRoZSBhdXRvUGxhY2UgdHJhaXQgc28gdGhhdCB3ZSBjYW5cbiAgICAgICAgICAvLyBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIHRvIG9wZW4vY2xvc2UgZm9sZGVyIGFjdGlvbnMgdG9cbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBhIHNjcm9sbGJhciBhcHBlYXJzIGlmIHRoZSB3aW5kb3cgaXMgdG9vIHNob3J0LlxuICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmF1dG9QbGFjZSA9IHRoaXMuYXV0b1BsYWNlO1xuXG4gICAgICAgICAgLy8gRG8gd2UgaGF2ZSBzYXZlZCBhcHBlYXJhbmNlIGRhdGEgZm9yIHRoaXMgZm9sZGVyP1xuXG4gICAgICAgICAgaWYgKHRoaXMubG9hZCAmJiAvLyBBbnl0aGluZyBsb2FkZWQ/XG4gICAgICAgICAgICAgIHRoaXMubG9hZC5mb2xkZXJzICYmIC8vIFdhcyBteSBwYXJlbnQgYSBkZWFkLWVuZD9cbiAgICAgICAgICAgICAgdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0pIHsgLy8gRGlkIGRhZGR5IHJlbWVtYmVyIG1lP1xuXG4gICAgICAgICAgICAvLyBTdGFydCBtZSBjbG9zZWQgaWYgSSB3YXMgY2xvc2VkXG4gICAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5jbG9zZWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXS5jbG9zZWQ7XG5cbiAgICAgICAgICAgIC8vIFBhc3MgZG93biB0aGUgbG9hZGVkIGRhdGFcbiAgICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmxvYWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBndWkgPSBuZXcgR1VJKG5ld19ndWlfcGFyYW1zKTtcbiAgICAgICAgICB0aGlzLl9fZm9sZGVyc1tuYW1lXSA9IGd1aTtcblxuICAgICAgICAgIHZhciBsaSA9IGFkZFJvdyh0aGlzLCBndWkuZG9tRWxlbWVudCk7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKGxpLCAnZm9sZGVyJyk7XG4gICAgICAgICAgcmV0dXJuIGd1aTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlc2l6ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgcm9vdCA9IHRoaXMuZ2V0Um9vdCgpO1xuXG4gICAgICAgICAgaWYgKHJvb3Quc2Nyb2xsYWJsZSkge1xuXG4gICAgICAgICAgICB2YXIgdG9wID0gZG9tLmdldE9mZnNldChyb290Ll9fdWwpLnRvcDtcbiAgICAgICAgICAgIHZhciBoID0gMDtcblxuICAgICAgICAgICAgY29tbW9uLmVhY2gocm9vdC5fX3VsLmNoaWxkTm9kZXMsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgaWYgKCEgKHJvb3QuYXV0b1BsYWNlICYmIG5vZGUgPT09IHJvb3QuX19zYXZlX3JvdykpXG4gICAgICAgICAgICAgICAgaCArPSBkb20uZ2V0SGVpZ2h0KG5vZGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3AgLSBDTE9TRV9CVVRUT05fSEVJR0hUIDwgaCkge1xuICAgICAgICAgICAgICBkb20uYWRkQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJvb3QuX19yZXNpemVfaGFuZGxlKSB7XG4gICAgICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJvb3QuX19yZXNpemVfaGFuZGxlLnN0eWxlLmhlaWdodCA9IHJvb3QuX191bC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJvb3QuX19jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgcm9vdC5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gcm9vdC53aWR0aCArICdweCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcmsgb2JqZWN0cyBmb3Igc2F2aW5nLiBUaGUgb3JkZXIgb2YgdGhlc2Ugb2JqZWN0cyBjYW5ub3QgY2hhbmdlIGFzXG4gICAgICAgICAqIHRoZSBHVUkgZ3Jvd3MuIFdoZW4gcmVtZW1iZXJpbmcgbmV3IG9iamVjdHMsIGFwcGVuZCB0aGVtIHRvIHRoZSBlbmRcbiAgICAgICAgICogb2YgdGhlIGxpc3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0Li4ufSBvYmplY3RzXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiBub3QgY2FsbGVkIG9uIGEgdG9wIGxldmVsIEdVSS5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICByZW1lbWJlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKFNBVkVfRElBTE9HVUUpKSB7XG4gICAgICAgICAgICBTQVZFX0RJQUxPR1VFID0gbmV3IENlbnRlcmVkRGl2KCk7XG4gICAgICAgICAgICBTQVZFX0RJQUxPR1VFLmRvbUVsZW1lbnQuaW5uZXJIVE1MID0gc2F2ZURpYWxvZ3VlQ29udGVudHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2FuIG9ubHkgY2FsbCByZW1lbWJlciBvbiBhIHRvcCBsZXZlbCBHVUkuXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICBjb21tb24uZWFjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLCBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGFkZFNhdmVNZW51KF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSA9PSAtMSkge1xuICAgICAgICAgICAgICBfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xuICAgICAgICAgICAgLy8gU2V0IHNhdmUgcm93IHdpZHRoXG4gICAgICAgICAgICBzZXRXaWR0aCh0aGlzLCB0aGlzLndpZHRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge2RhdC5ndWkuR1VJfSB0aGUgdG9wbW9zdCBwYXJlbnQgR1VJIG9mIGEgbmVzdGVkIEdVSS5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRSb290OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZ3VpID0gdGhpcztcbiAgICAgICAgICB3aGlsZSAoZ3VpLnBhcmVudCkge1xuICAgICAgICAgICAgZ3VpID0gZ3VpLnBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGd1aTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gYSBKU09OIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgc3RhdGUgb2ZcbiAgICAgICAgICogdGhpcyBHVUkgYXMgd2VsbCBhcyBpdHMgcmVtZW1iZXJlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGdldFNhdmVPYmplY3Q6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gdGhpcy5sb2FkO1xuXG4gICAgICAgICAgdG9SZXR1cm4uY2xvc2VkID0gdGhpcy5jbG9zZWQ7XG5cbiAgICAgICAgICAvLyBBbSBJIHJlbWVtYmVyaW5nIGFueSB2YWx1ZXM/XG4gICAgICAgICAgaWYgKHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIHRvUmV0dXJuLnByZXNldCA9IHRoaXMucHJlc2V0O1xuXG4gICAgICAgICAgICBpZiAoIXRvUmV0dXJuLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgICAgdG9SZXR1cm4ucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b1JldHVybi5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b1JldHVybi5mb2xkZXJzID0ge307XG4gICAgICAgICAgY29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uKGVsZW1lbnQsIGtleSkge1xuICAgICAgICAgICAgdG9SZXR1cm4uZm9sZGVyc1trZXldID0gZWxlbWVudC5nZXRTYXZlT2JqZWN0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzYXZlOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmICghdGhpcy5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICAgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQodGhpcywgZmFsc2UpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2F2ZUFzOiBmdW5jdGlvbihwcmVzZXROYW1lKSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgICAgICAgIC8vIFJldGFpbiBkZWZhdWx0IHZhbHVlcyB1cG9uIGZpcnN0IHNhdmVcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzLCB0cnVlKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW3ByZXNldE5hbWVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICAgICAgICB0aGlzLnByZXNldCA9IHByZXNldE5hbWU7XG4gICAgICAgICAgYWRkUHJlc2V0T3B0aW9uKHRoaXMsIHByZXNldE5hbWUsIHRydWUpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmV2ZXJ0OiBmdW5jdGlvbihndWkpIHtcblxuICAgICAgICAgIGNvbW1vbi5lYWNoKHRoaXMuX19jb250cm9sbGVycywgZnVuY3Rpb24oY29udHJvbGxlcikge1xuICAgICAgICAgICAgLy8gTWFrZSByZXZlcnQgd29yayBvbiBEZWZhdWx0LlxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFJvb3QoKS5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZShjb250cm9sbGVyLmluaXRpYWxWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWNhbGxTYXZlZFZhbHVlKGd1aSB8fCB0aGlzLmdldFJvb3QoKSwgY29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICBjb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24oZm9sZGVyKSB7XG4gICAgICAgICAgICBmb2xkZXIucmV2ZXJ0KGZvbGRlcik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIWd1aSkge1xuICAgICAgICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMuZ2V0Um9vdCgpLCBmYWxzZSk7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBsaXN0ZW46IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgIHZhciBpbml0ID0gdGhpcy5fX2xpc3RlbmluZy5sZW5ndGggPT0gMDtcbiAgICAgICAgICB0aGlzLl9fbGlzdGVuaW5nLnB1c2goY29udHJvbGxlcik7XG4gICAgICAgICAgaWYgKGluaXQpIHVwZGF0ZURpc3BsYXlzKHRoaXMuX19saXN0ZW5pbmcpO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gYWRkKGd1aSwgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICBpZiAob2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgXCIgKyBvYmplY3QgKyBcIiBoYXMgbm8gcHJvcGVydHkgXFxcIlwiICsgcHJvcGVydHkgKyBcIlxcXCJcIik7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRyb2xsZXI7XG5cbiAgICBpZiAocGFyYW1zLmNvbG9yKSB7XG5cbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgQ29sb3JDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdmFyIGZhY3RvcnlBcmdzID0gW29iamVjdCxwcm9wZXJ0eV0uY29uY2F0KHBhcmFtcy5mYWN0b3J5QXJncyk7XG4gICAgICBjb250cm9sbGVyID0gY29udHJvbGxlckZhY3RvcnkuYXBwbHkoZ3VpLCBmYWN0b3J5QXJncyk7XG5cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmJlZm9yZSBpbnN0YW5jZW9mIENvbnRyb2xsZXIpIHtcbiAgICAgIHBhcmFtcy5iZWZvcmUgPSBwYXJhbXMuYmVmb3JlLl9fbGk7XG4gICAgfVxuXG4gICAgcmVjYWxsU2F2ZWRWYWx1ZShndWksIGNvbnRyb2xsZXIpO1xuXG4gICAgZG9tLmFkZENsYXNzKGNvbnRyb2xsZXIuZG9tRWxlbWVudCwgJ2MnKTtcblxuICAgIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRvbS5hZGRDbGFzcyhuYW1lLCAncHJvcGVydHktbmFtZScpO1xuICAgIG5hbWUuaW5uZXJIVE1MID0gY29udHJvbGxlci5wcm9wZXJ0eTtcblxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIuZG9tRWxlbWVudCk7XG5cbiAgICB2YXIgbGkgPSBhZGRSb3coZ3VpLCBjb250YWluZXIsIHBhcmFtcy5iZWZvcmUpO1xuXG4gICAgZG9tLmFkZENsYXNzKGxpLCBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cpO1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgdHlwZW9mIGNvbnRyb2xsZXIuZ2V0VmFsdWUoKSk7XG5cbiAgICBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKTtcblxuICAgIGd1aS5fX2NvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG5cbiAgICByZXR1cm4gY29udHJvbGxlcjtcblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHJvdyB0byB0aGUgZW5kIG9mIHRoZSBHVUkgb3IgYmVmb3JlIGFub3RoZXIgcm93LlxuICAgKlxuICAgKiBAcGFyYW0gZ3VpXG4gICAqIEBwYXJhbSBbZG9tXSBJZiBzcGVjaWZpZWQsIGluc2VydHMgdGhlIGRvbSBjb250ZW50IGluIHRoZSBuZXcgcm93XG4gICAqIEBwYXJhbSBbbGlCZWZvcmVdIElmIHNwZWNpZmllZCwgcGxhY2VzIHRoZSBuZXcgcm93IGJlZm9yZSBhbm90aGVyIHJvd1xuICAgKi9cbiAgZnVuY3Rpb24gYWRkUm93KGd1aSwgZG9tLCBsaUJlZm9yZSkge1xuICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgaWYgKGRvbSkgbGkuYXBwZW5kQ2hpbGQoZG9tKTtcbiAgICBpZiAobGlCZWZvcmUpIHtcbiAgICAgIGd1aS5fX3VsLmluc2VydEJlZm9yZShsaSwgcGFyYW1zLmJlZm9yZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGd1aS5fX3VsLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9XG4gICAgZ3VpLm9uUmVzaXplKCk7XG4gICAgcmV0dXJuIGxpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXVnbWVudENvbnRyb2xsZXIoZ3VpLCBsaSwgY29udHJvbGxlcikge1xuXG4gICAgY29udHJvbGxlci5fX2xpID0gbGk7XG4gICAgY29udHJvbGxlci5fX2d1aSA9IGd1aTtcblxuICAgIGNvbW1vbi5leHRlbmQoY29udHJvbGxlciwge1xuXG4gICAgICBvcHRpb25zOiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIGd1aSxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5vYmplY3QsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtjb21tb24udG9BcnJheShhcmd1bWVudHMpXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0FycmF5KG9wdGlvbnMpIHx8IGNvbW1vbi5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbb3B0aW9uc11cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9LFxuXG4gICAgICBuYW1lOiBmdW5jdGlvbih2KSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19saS5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSB2O1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH0sXG5cbiAgICAgIGxpc3RlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19ndWkubGlzdGVuKGNvbnRyb2xsZXIpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19ndWkucmVtb3ZlKGNvbnRyb2xsZXIpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gQWxsIHNsaWRlcnMgc2hvdWxkIGJlIGFjY29tcGFuaWVkIGJ5IGEgYm94LlxuICAgIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgTnVtYmVyQ29udHJvbGxlclNsaWRlcikge1xuXG4gICAgICB2YXIgYm94ID0gbmV3IE51bWJlckNvbnRyb2xsZXJCb3goY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgeyBtaW46IGNvbnRyb2xsZXIuX19taW4sIG1heDogY29udHJvbGxlci5fX21heCwgc3RlcDogY29udHJvbGxlci5fX3N0ZXAgfSk7XG5cbiAgICAgIGNvbW1vbi5lYWNoKFsndXBkYXRlRGlzcGxheScsICdvbkNoYW5nZScsICdvbkZpbmlzaENoYW5nZSddLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgdmFyIHBjID0gY29udHJvbGxlclttZXRob2RdO1xuICAgICAgICB2YXIgcGIgPSBib3hbbWV0aG9kXTtcbiAgICAgICAgY29udHJvbGxlclttZXRob2RdID0gYm94W21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgcGMuYXBwbHkoY29udHJvbGxlciwgYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHBiLmFwcGx5KGJveCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBkb20uYWRkQ2xhc3MobGksICdoYXMtc2xpZGVyJyk7XG4gICAgICBjb250cm9sbGVyLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGJveC5kb21FbGVtZW50LCBjb250cm9sbGVyLmRvbUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBOdW1iZXJDb250cm9sbGVyQm94KSB7XG5cbiAgICAgIHZhciByID0gZnVuY3Rpb24ocmV0dXJuZWQpIHtcblxuICAgICAgICAvLyBIYXZlIHdlIGRlZmluZWQgYm90aCBib3VuZGFyaWVzP1xuICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGNvbnRyb2xsZXIuX19taW4pICYmIGNvbW1vbi5pc051bWJlcihjb250cm9sbGVyLl9fbWF4KSkge1xuXG4gICAgICAgICAgLy8gV2VsbCwgdGhlbiBsZXRzIGp1c3QgcmVwbGFjZSB0aGlzIHdpdGggYSBzbGlkZXIuXG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbY29udHJvbGxlci5fX21pbiwgY29udHJvbGxlci5fX21heCwgY29udHJvbGxlci5fX3N0ZXBdXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG5cbiAgICAgIH07XG5cbiAgICAgIGNvbnRyb2xsZXIubWluID0gY29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5taW4pO1xuICAgICAgY29udHJvbGxlci5tYXggPSBjb21tb24uY29tcG9zZShyLCBjb250cm9sbGVyLm1heCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEJvb2xlYW5Db250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLmZha2VFdmVudChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50cyBkb3VibGUtdG9nZ2xlXG4gICAgICB9KVxuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBGdW5jdGlvbkNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20uZmFrZUV2ZW50KGNvbnRyb2xsZXIuX19idXR0b24sICdjbGljaycpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5hZGRDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChsaSwgJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5yZW1vdmVDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBDb2xvckNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmFkZENsYXNzKGxpLCAnY29sb3InKTtcbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSA9IGNvbW1vbi5jb21wb3NlKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgbGkuc3R5bGUuYm9yZGVyTGVmdENvbG9yID0gY29udHJvbGxlci5fX2NvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiByO1xuICAgICAgfSwgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KTtcblxuICAgICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB9XG5cbiAgICBjb250cm9sbGVyLnNldFZhbHVlID0gY29tbW9uLmNvbXBvc2UoZnVuY3Rpb24ocikge1xuICAgICAgaWYgKGd1aS5nZXRSb290KCkuX19wcmVzZXRfc2VsZWN0ICYmIGNvbnRyb2xsZXIuaXNNb2RpZmllZCgpKSB7XG4gICAgICAgIG1hcmtQcmVzZXRNb2RpZmllZChndWkuZ2V0Um9vdCgpLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH0sIGNvbnRyb2xsZXIuc2V0VmFsdWUpO1xuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcikge1xuXG4gICAgLy8gRmluZCB0aGUgdG9wbW9zdCBHVUksIHRoYXQncyB3aGVyZSByZW1lbWJlcmVkIG9iamVjdHMgbGl2ZS5cbiAgICB2YXIgcm9vdCA9IGd1aS5nZXRSb290KCk7XG5cbiAgICAvLyBEb2VzIHRoZSBvYmplY3Qgd2UncmUgY29udHJvbGxpbmcgbWF0Y2ggYW55dGhpbmcgd2UndmUgYmVlbiB0b2xkIHRvXG4gICAgLy8gcmVtZW1iZXI/XG4gICAgdmFyIG1hdGNoZWRfaW5kZXggPSByb290Ll9fcmVtZW1iZXJlZE9iamVjdHMuaW5kZXhPZihjb250cm9sbGVyLm9iamVjdCk7XG5cbiAgICAvLyBXaHkgeWVzLCBpdCBkb2VzIVxuICAgIGlmIChtYXRjaGVkX2luZGV4ICE9IC0xKSB7XG5cbiAgICAgIC8vIExldCBtZSBmZXRjaCBhIG1hcCBvZiBjb250cm9sbGVycyBmb3IgdGhjb21tb24uaXNPYmplY3QuXG4gICAgICB2YXIgY29udHJvbGxlcl9tYXAgPVxuICAgICAgICAgIHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZF9pbmRleF07XG5cbiAgICAgIC8vIE9ocCwgSSBiZWxpZXZlIHRoaXMgaXMgdGhlIGZpcnN0IGNvbnRyb2xsZXIgd2UndmUgY3JlYXRlZCBmb3IgdGhpc1xuICAgICAgLy8gb2JqZWN0LiBMZXRzIG1ha2UgdGhlIG1hcCBmcmVzaC5cbiAgICAgIGlmIChjb250cm9sbGVyX21hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRyb2xsZXJfbWFwID0ge307XG4gICAgICAgIHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZF9pbmRleF0gPVxuICAgICAgICAgICAgY29udHJvbGxlcl9tYXA7XG4gICAgICB9XG5cbiAgICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhpcyBjb250cm9sbGVyXG4gICAgICBjb250cm9sbGVyX21hcFtjb250cm9sbGVyLnByb3BlcnR5XSA9IGNvbnRyb2xsZXI7XG5cbiAgICAgIC8vIE9rYXksIG5vdyBoYXZlIHdlIHNhdmVkIGFueSB2YWx1ZXMgZm9yIHRoaXMgY29udHJvbGxlcj9cbiAgICAgIGlmIChyb290LmxvYWQgJiYgcm9vdC5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgICB2YXIgcHJlc2V0X21hcCA9IHJvb3QubG9hZC5yZW1lbWJlcmVkO1xuXG4gICAgICAgIC8vIFdoaWNoIHByZXNldCBhcmUgd2UgdHJ5aW5nIHRvIGxvYWQ/XG4gICAgICAgIHZhciBwcmVzZXQ7XG5cbiAgICAgICAgaWYgKHByZXNldF9tYXBbZ3VpLnByZXNldF0pIHtcblxuICAgICAgICAgIHByZXNldCA9IHByZXNldF9tYXBbZ3VpLnByZXNldF07XG5cbiAgICAgICAgfSBlbHNlIGlmIChwcmVzZXRfbWFwW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV0pIHtcblxuICAgICAgICAgIC8vIFVoaCwgeW91IGNhbiBoYXZlIHRoZSBkZWZhdWx0IGluc3RlYWQ/XG4gICAgICAgICAgcHJlc2V0ID0gcHJlc2V0X21hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAvLyBOYWRhLlxuXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIERpZCB0aGUgbG9hZGVkIG9iamVjdCByZW1lbWJlciB0aGNvbW1vbi5pc09iamVjdD9cbiAgICAgICAgaWYgKHByZXNldFttYXRjaGVkX2luZGV4XSAmJlxuXG4gICAgICAgICAgLy8gRGlkIHdlIHJlbWVtYmVyIHRoaXMgcGFydGljdWxhciBwcm9wZXJ0eT9cbiAgICAgICAgICAgIHByZXNldFttYXRjaGVkX2luZGV4XVtjb250cm9sbGVyLnByb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAvLyBXZSBkaWQgcmVtZW1iZXIgc29tZXRoaW5nIGZvciB0aGlzIGd1eSAuLi5cbiAgICAgICAgICB2YXIgdmFsdWUgPSBwcmVzZXRbbWF0Y2hlZF9pbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV07XG5cbiAgICAgICAgICAvLyBBbmQgdGhhdCdzIHdoYXQgaXQgaXMuXG4gICAgICAgICAgY29udHJvbGxlci5pbml0aWFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICBjb250cm9sbGVyLnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksIGtleSkge1xuICAgIC8vIFRPRE8gaG93IGRvZXMgdGhpcyBkZWFsIHdpdGggbXVsdGlwbGUgR1VJJ3M/XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgKyAnLicgKyBrZXk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNhdmVNZW51KGd1aSkge1xuXG4gICAgdmFyIGRpdiA9IGd1aS5fX3NhdmVfcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIGRvbS5hZGRDbGFzcyhndWkuZG9tRWxlbWVudCwgJ2hhcy1zYXZlJyk7XG5cbiAgICBndWkuX191bC5pbnNlcnRCZWZvcmUoZGl2LCBndWkuX191bC5maXJzdENoaWxkKTtcblxuICAgIGRvbS5hZGRDbGFzcyhkaXYsICdzYXZlLXJvdycpO1xuXG4gICAgdmFyIGdlYXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGdlYXJzLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgIGRvbS5hZGRDbGFzcyhnZWFycywgJ2J1dHRvbiBnZWFycycpO1xuXG4gICAgLy8gVE9ETyByZXBsYWNlIHdpdGggRnVuY3Rpb25Db250cm9sbGVyXG4gICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJ1NhdmUnO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24sICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnc2F2ZScpO1xuXG4gICAgdmFyIGJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uMi5pbm5lckhUTUwgPSAnTmV3JztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24yLCAnc2F2ZS1hcycpO1xuXG4gICAgdmFyIGJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uMy5pbm5lckhUTUwgPSAnUmV2ZXJ0JztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMywgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24zLCAncmV2ZXJ0Jyk7XG5cbiAgICB2YXIgc2VsZWN0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuXG4gICAgaWYgKGd1aS5sb2FkICYmIGd1aS5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgY29tbW9uLmVhY2goZ3VpLmxvYWQucmVtZW1iZXJlZCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBrZXksIGtleSA9PSBndWkucHJlc2V0KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFByZXNldE9wdGlvbihndWksIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGRvbS5iaW5kKHNlbGVjdCwgJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXG5cbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS5pbm5lckhUTUwgPSBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZTtcbiAgICAgIH1cblxuICAgICAgZ3VpLnByZXNldCA9IHRoaXMudmFsdWU7XG5cbiAgICB9KTtcblxuICAgIGRpdi5hcHBlbmRDaGlsZChzZWxlY3QpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChnZWFycyk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24zKTtcblxuICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG5cbiAgICAgIHZhciBzYXZlTG9jYWxseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1zYXZlLWxvY2FsbHknKTtcbiAgICAgIHZhciBleHBsYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLWxvY2FsLWV4cGxhaW4nKTtcblxuICAgICAgc2F2ZUxvY2FsbHkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgIHZhciBsb2NhbFN0b3JhZ2VDaGVja0JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1zdG9yYWdlJyk7XG5cbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKGd1aSwgJ2lzTG9jYWwnKSkgPT09ICd0cnVlJykge1xuICAgICAgICBsb2NhbFN0b3JhZ2VDaGVja0JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzaG93SGlkZUV4cGxhaW4oKSB7XG4gICAgICAgIGV4cGxhaW4uc3R5bGUuZGlzcGxheSA9IGd1aS51c2VMb2NhbFN0b3JhZ2UgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICBzaG93SGlkZUV4cGxhaW4oKTtcblxuICAgICAgLy8gVE9ETzogVXNlIGEgYm9vbGVhbiBjb250cm9sbGVyLCBmb29sIVxuICAgICAgZG9tLmJpbmQobG9jYWxTdG9yYWdlQ2hlY2tCb3gsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZ3VpLnVzZUxvY2FsU3RvcmFnZSA9ICFndWkudXNlTG9jYWxTdG9yYWdlO1xuICAgICAgICBzaG93SGlkZUV4cGxhaW4oKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdmFyIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbmV3LWNvbnN0cnVjdG9yJyk7XG5cbiAgICBkb20uYmluZChuZXdDb25zdHJ1Y3RvclRleHRBcmVhLCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLm1ldGFLZXkgJiYgKGUud2hpY2ggPT09IDY3IHx8IGUua2V5Q29kZSA9PSA2NykpIHtcbiAgICAgICAgU0FWRV9ESUFMT0dVRS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChnZWFycywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGd1aS5nZXRTYXZlT2JqZWN0KCksIHVuZGVmaW5lZCwgMik7XG4gICAgICBTQVZFX0RJQUxPR1VFLnNob3coKTtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuZm9jdXMoKTtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuc2VsZWN0KCk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgZ3VpLnNhdmUoKTtcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGJ1dHRvbjIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHByZXNldE5hbWUgPSBwcm9tcHQoJ0VudGVyIGEgbmV3IHByZXNldCBuYW1lLicpO1xuICAgICAgaWYgKHByZXNldE5hbWUpIGd1aS5zYXZlQXMocHJlc2V0TmFtZSk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24zLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGd1aS5yZXZlcnQoKTtcbiAgICB9KTtcblxuLy8gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRSZXNpemVIYW5kbGUoZ3VpKSB7XG5cbiAgICBndWkuX19yZXNpemVfaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKGd1aS5fX3Jlc2l6ZV9oYW5kbGUuc3R5bGUsIHtcblxuICAgICAgd2lkdGg6ICc2cHgnLFxuICAgICAgbWFyZ2luTGVmdDogJy0zcHgnLFxuICAgICAgaGVpZ2h0OiAnMjAwcHgnLFxuICAgICAgY3Vyc29yOiAnZXctcmVzaXplJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4vLyAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibHVlJ1xuXG4gICAgfSk7XG5cbiAgICB2YXIgcG1vdXNlWDtcblxuICAgIGRvbS5iaW5kKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsICdtb3VzZWRvd24nLCBkcmFnU3RhcnQpO1xuICAgIGRvbS5iaW5kKGd1aS5fX2Nsb3NlQnV0dG9uLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcblxuICAgIGd1aS5kb21FbGVtZW50Lmluc2VydEJlZm9yZShndWkuX19yZXNpemVfaGFuZGxlLCBndWkuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbiAgICBmdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBndWkud2lkdGggKz0gcG1vdXNlWCAtIGUuY2xpZW50WDtcbiAgICAgIGd1aS5vblJlc2l6ZSgpO1xuICAgICAgcG1vdXNlWCA9IGUuY2xpZW50WDtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ1N0b3AoKSB7XG5cbiAgICAgIGRvbS5yZW1vdmVDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gc2V0V2lkdGgoZ3VpLCB3KSB7XG4gICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICAvLyBBdXRvIHBsYWNlZCBzYXZlLXJvd3MgYXJlIHBvc2l0aW9uIGZpeGVkLCBzbyB3ZSBoYXZlIHRvXG4gICAgLy8gc2V0IHRoZSB3aWR0aCBtYW51YWxseSBpZiB3ZSB3YW50IGl0IHRvIGJsZWVkIHRvIHRoZSBlZGdlXG4gICAgaWYgKGd1aS5fX3NhdmVfcm93ICYmIGd1aS5hdXRvUGxhY2UpIHtcbiAgICAgIGd1aS5fX3NhdmVfcm93LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgfWlmIChndWkuX19jbG9zZUJ1dHRvbikge1xuICAgICAgZ3VpLl9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDdXJyZW50UHJlc2V0KGd1aSwgdXNlSW5pdGlhbFZhbHVlcykge1xuXG4gICAgdmFyIHRvUmV0dXJuID0ge307XG5cbiAgICAvLyBGb3IgZWFjaCBvYmplY3QgSSdtIHJlbWVtYmVyaW5nXG4gICAgY29tbW9uLmVhY2goZ3VpLl9fcmVtZW1iZXJlZE9iamVjdHMsIGZ1bmN0aW9uKHZhbCwgaW5kZXgpIHtcblxuICAgICAgdmFyIHNhdmVkX3ZhbHVlcyA9IHt9O1xuXG4gICAgICAvLyBUaGUgY29udHJvbGxlcnMgSSd2ZSBtYWRlIGZvciB0aGNvbW1vbi5pc09iamVjdCBieSBwcm9wZXJ0eVxuICAgICAgdmFyIGNvbnRyb2xsZXJfbWFwID1cbiAgICAgICAgICBndWkuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbaW5kZXhdO1xuXG4gICAgICAvLyBSZW1lbWJlciBlYWNoIHZhbHVlIGZvciBlYWNoIHByb3BlcnR5XG4gICAgICBjb21tb24uZWFjaChjb250cm9sbGVyX21hcCwgZnVuY3Rpb24oY29udHJvbGxlciwgcHJvcGVydHkpIHtcbiAgICAgICAgc2F2ZWRfdmFsdWVzW3Byb3BlcnR5XSA9IHVzZUluaXRpYWxWYWx1ZXMgPyBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA6IGNvbnRyb2xsZXIuZ2V0VmFsdWUoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTYXZlIHRoZSB2YWx1ZXMgZm9yIHRoY29tbW9uLmlzT2JqZWN0XG4gICAgICB0b1JldHVybltpbmRleF0gPSBzYXZlZF92YWx1ZXM7XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJlc2V0T3B0aW9uKGd1aSwgbmFtZSwgc2V0U2VsZWN0ZWQpIHtcbiAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgb3B0LmlubmVySFRNTCA9IG5hbWU7XG4gICAgb3B0LnZhbHVlID0gbmFtZTtcbiAgICBndWkuX19wcmVzZXRfc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gICAgaWYgKHNldFNlbGVjdGVkKSB7XG4gICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aCAtIDE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0UHJlc2V0U2VsZWN0SW5kZXgoZ3VpKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAoZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWUgPT0gZ3VpLnByZXNldCkge1xuICAgICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrUHJlc2V0TW9kaWZpZWQoZ3VpLCBtb2RpZmllZCkge1xuICAgIHZhciBvcHQgPSBndWkuX19wcmVzZXRfc2VsZWN0W2d1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleF07XG4vLyAgICBjb25zb2xlLmxvZygnbWFyaycsIG1vZGlmaWVkLCBvcHQpO1xuICAgIGlmIChtb2RpZmllZCkge1xuICAgICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZSArIFwiKlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSkge1xuXG5cbiAgICBpZiAoY29udHJvbGxlckFycmF5Lmxlbmd0aCAhPSAwKSB7XG5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgdXBkYXRlRGlzcGxheXMoY29udHJvbGxlckFycmF5KTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgY29tbW9uLmVhY2goY29udHJvbGxlckFycmF5LCBmdW5jdGlvbihjKSB7XG4gICAgICBjLnVwZGF0ZURpc3BsYXkoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgcmV0dXJuIEdVSTtcblxufSkoZGF0LnV0aWxzLmNzcyxcblwiPGRpdiBpZD1cXFwiZGctc2F2ZVxcXCIgY2xhc3M9XFxcImRnIGRpYWxvZ3VlXFxcIj5cXG5cXG4gIEhlcmUncyB0aGUgbmV3IGxvYWQgcGFyYW1ldGVyIGZvciB5b3VyIDxjb2RlPkdVSTwvY29kZT4ncyBjb25zdHJ1Y3RvcjpcXG5cXG4gIDx0ZXh0YXJlYSBpZD1cXFwiZGctbmV3LWNvbnN0cnVjdG9yXFxcIj48L3RleHRhcmVhPlxcblxcbiAgPGRpdiBpZD1cXFwiZGctc2F2ZS1sb2NhbGx5XFxcIj5cXG5cXG4gICAgPGlucHV0IGlkPVxcXCJkZy1sb2NhbC1zdG9yYWdlXFxcIiB0eXBlPVxcXCJjaGVja2JveFxcXCIvPiBBdXRvbWF0aWNhbGx5IHNhdmVcXG4gICAgdmFsdWVzIHRvIDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gb24gZXhpdC5cXG5cXG4gICAgPGRpdiBpZD1cXFwiZGctbG9jYWwtZXhwbGFpblxcXCI+VGhlIHZhbHVlcyBzYXZlZCB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IHdpbGxcXG4gICAgICBvdmVycmlkZSB0aG9zZSBwYXNzZWQgdG8gPGNvZGU+ZGF0LkdVSTwvY29kZT4ncyBjb25zdHJ1Y3Rvci4gVGhpcyBtYWtlcyBpdFxcbiAgICAgIGVhc2llciB0byB3b3JrIGluY3JlbWVudGFsbHksIGJ1dCA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IGlzIGZyYWdpbGUsXFxuICAgICAgYW5kIHlvdXIgZnJpZW5kcyBtYXkgbm90IHNlZSB0aGUgc2FtZSB2YWx1ZXMgeW91IGRvLlxcbiAgICAgIFxcbiAgICA8L2Rpdj5cXG4gICAgXFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cIixcblwiLmRnIHVse2xpc3Qtc3R5bGU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTtjbGVhcjpib3RofS5kZy5hY3twb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MDt6LWluZGV4OjB9LmRnOm5vdCguYWMpIC5tYWlue292ZXJmbG93OmhpZGRlbn0uZGcubWFpbnstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstby10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvd3tvdmVyZmxvdy15OmF1dG99LmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93IC5jbG9zZS1idXR0b257b3BhY2l0eToxO21hcmdpbi10b3A6LTFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjMmMyYzJjfS5kZy5tYWluIHVsLmNsb3NlZCAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MSAhaW1wb3J0YW50fS5kZy5tYWluOmhvdmVyIC5jbG9zZS1idXR0b24sLmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5kcmFne29wYWNpdHk6MX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uey13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1vLXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstbW96LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGluZS1oZWlnaHQ6MTlweDtoZWlnaHQ6MjBweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDB9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMxMTF9LmRnLmF7ZmxvYXQ6cmlnaHQ7bWFyZ2luLXJpZ2h0OjE1cHg7b3ZlcmZsb3cteDpoaWRkZW59LmRnLmEuaGFzLXNhdmUgdWx7bWFyZ2luLXRvcDoyN3B4fS5kZy5hLmhhcy1zYXZlIHVsLmNsb3NlZHttYXJnaW4tdG9wOjB9LmRnLmEgLnNhdmUtcm93e3Bvc2l0aW9uOmZpeGVkO3RvcDowO3otaW5kZXg6MTAwMn0uZGcgbGl7LXdlYmtpdC10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXR9LmRnIGxpOm5vdCguZm9sZGVyKXtjdXJzb3I6YXV0bztoZWlnaHQ6MjdweDtsaW5lLWhlaWdodDoyN3B4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjAgNHB4IDAgNXB4fS5kZyBsaS5mb2xkZXJ7cGFkZGluZzowO2JvcmRlci1sZWZ0OjRweCBzb2xpZCByZ2JhKDAsMCwwLDApfS5kZyBsaS50aXRsZXtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDotNHB4fS5kZyAuY2xvc2VkIGxpOm5vdCgudGl0bGUpLC5kZyAuY2xvc2VkIHVsIGxpLC5kZyAuY2xvc2VkIHVsIGxpID4gKntoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyOjB9LmRnIC5jcntjbGVhcjpib3RoO3BhZGRpbmctbGVmdDozcHg7aGVpZ2h0OjI3cHh9LmRnIC5wcm9wZXJ0eS1uYW1le2N1cnNvcjpkZWZhdWx0O2Zsb2F0OmxlZnQ7Y2xlYXI6bGVmdDt3aWR0aDo0MCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LmRnIC5je2Zsb2F0OmxlZnQ7d2lkdGg6NjAlfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JvcmRlcjowO21hcmdpbi10b3A6NHB4O3BhZGRpbmc6M3B4O3dpZHRoOjEwMCU7ZmxvYXQ6cmlnaHR9LmRnIC5oYXMtc2xpZGVyIGlucHV0W3R5cGU9dGV4dF17d2lkdGg6MzAlO21hcmdpbi1sZWZ0OjB9LmRnIC5zbGlkZXJ7ZmxvYXQ6bGVmdDt3aWR0aDo2NiU7bWFyZ2luLWxlZnQ6LTVweDttYXJnaW4tcmlnaHQ6MDtoZWlnaHQ6MTlweDttYXJnaW4tdG9wOjRweH0uZGcgLnNsaWRlci1mZ3toZWlnaHQ6MTAwJX0uZGcgLmMgaW5wdXRbdHlwZT1jaGVja2JveF17bWFyZ2luLXRvcDo5cHh9LmRnIC5jIHNlbGVjdHttYXJnaW4tdG9wOjVweH0uZGcgLmNyLmZ1bmN0aW9uLC5kZyAuY3IuZnVuY3Rpb24gLnByb3BlcnR5LW5hbWUsLmRnIC5jci5mdW5jdGlvbiAqLC5kZyAuY3IuYm9vbGVhbiwuZGcgLmNyLmJvb2xlYW4gKntjdXJzb3I6cG9pbnRlcn0uZGcgLnNlbGVjdG9ye2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tbGVmdDotOXB4O21hcmdpbi10b3A6MjNweDt6LWluZGV4OjEwfS5kZyAuYzpob3ZlciAuc2VsZWN0b3IsLmRnIC5zZWxlY3Rvci5kcmFne2Rpc3BsYXk6YmxvY2t9LmRnIGxpLnNhdmUtcm93e3BhZGRpbmc6MH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjBweCA2cHh9LmRnLmRpYWxvZ3Vle2JhY2tncm91bmQtY29sb3I6IzIyMjt3aWR0aDo0NjBweDtwYWRkaW5nOjE1cHg7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MTVweH0jZGctbmV3LWNvbnN0cnVjdG9ye3BhZGRpbmc6MTBweDtjb2xvcjojMjIyO2ZvbnQtZmFtaWx5Ok1vbmFjbywgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB4O2JvcmRlcjowO3Jlc2l6ZTpub25lO2JveC1zaGFkb3c6aW5zZXQgMXB4IDFweCAxcHggIzg4ODt3b3JkLXdyYXA6YnJlYWstd29yZDttYXJnaW46MTJweCAwO2Rpc3BsYXk6YmxvY2s7d2lkdGg6NDQwcHg7b3ZlcmZsb3cteTpzY3JvbGw7aGVpZ2h0OjEwMHB4O3Bvc2l0aW9uOnJlbGF0aXZlfSNkZy1sb2NhbC1leHBsYWlue2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MTFweDtsaW5lLWhlaWdodDoxN3B4O2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6IzMzMztwYWRkaW5nOjhweDttYXJnaW4tdG9wOjEwcHh9I2RnLWxvY2FsLWV4cGxhaW4gY29kZXtmb250LXNpemU6MTBweH0jZGF0LWd1aS1zYXZlLWxvY2FsbHl7ZGlzcGxheTpub25lfS5kZ3tjb2xvcjojZWVlO2ZvbnQ6MTFweCAnTHVjaWRhIEdyYW5kZScsIHNhbnMtc2VyaWY7dGV4dC1zaGFkb3c6MCAtMXB4IDAgIzExMX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXJ7d2lkdGg6NXB4O2JhY2tncm91bmQ6IzFhMWExYX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVye2hlaWdodDowO2Rpc3BsYXk6bm9uZX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJ7Ym9yZGVyLXJhZGl1czo1cHg7YmFja2dyb3VuZDojNjc2NzY3fS5kZyBsaTpub3QoLmZvbGRlcil7YmFja2dyb3VuZDojMWExYTFhO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMyYzJjMmN9LmRnIGxpLnNhdmUtcm93e2xpbmUtaGVpZ2h0OjI1cHg7YmFja2dyb3VuZDojZGFkNWNiO2JvcmRlcjowfS5kZyBsaS5zYXZlLXJvdyBzZWxlY3R7bWFyZ2luLWxlZnQ6NXB4O3dpZHRoOjEwOHB4fS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9ue21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjFweDtib3JkZXItcmFkaXVzOjJweDtmb250LXNpemU6OXB4O2xpbmUtaGVpZ2h0OjdweDtwYWRkaW5nOjRweCA0cHggNXB4IDRweDtiYWNrZ3JvdW5kOiNjNWJkYWQ7Y29sb3I6I2ZmZjt0ZXh0LXNoYWRvdzowIDFweCAwICNiMGE1OGY7Ym94LXNoYWRvdzowIC0xcHggMCAjYjBhNThmO2N1cnNvcjpwb2ludGVyfS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uLmdlYXJze2JhY2tncm91bmQ6I2M1YmRhZCB1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBc0FBQUFOQ0FZQUFBQi85WlE3QUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFRSkpSRUZVZU5waVlLQVUvUC8vUHdHSUMvQXBDQUJpQlNBVytJOEFDbEFjZ0t4UTRUOWhvTUFFVXJ4eDJRU0dONitlZ0RYKy92V1Q0ZTdOODJBTVlvUEF4L2V2d1dvWW9TWWJBQ1gyczdLeEN4emNzZXpEaDNldkZvREVCWVRFRXF5Y2dnV0F6QTlBdVVTUVFnZVlQYTlmUHY2L1lXbS9BY3g1SVBiN3R5L2Z3K1FaYmx3Njd2RHM4UjBZSHlRaGdPYngreUFKa0JxbUc1ZFBQRGgxYVBPR1IvZXVnVzBHNHZsSW9USWZ5RmNBK1Fla2hoSEpoUGRReGJpQUlndU1CVFFaclBENzEwOE02cm9XWURGUWlJQUF2NkFvdy8xYkZ3WGdpcytmMkxVQXlud29JYU5jejhYTngzRGw3TUVKVURHUXB4OWd0UThZQ3VlQitEMjZPRUNBQVFEYWR0N2U0NkQ0MlFBQUFBQkpSVTVFcmtKZ2dnPT0pIDJweCAxcHggbm8tcmVwZWF0O2hlaWdodDo3cHg7d2lkdGg6OHB4fS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2JhYjE5ZTtib3gtc2hhZG93OjAgLTFweCAwICNiMGE1OGZ9LmRnIGxpLmZvbGRlcntib3JkZXItYm90dG9tOjB9LmRnIGxpLnRpdGxle3BhZGRpbmctbGVmdDoxNnB4O2JhY2tncm91bmQ6IzAwMCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxJK2hLZ0Z4b0NnQU93PT0pIDZweCAxMHB4IG5vLXJlcGVhdDtjdXJzb3I6cG9pbnRlcjtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMil9LmRnIC5jbG9zZWQgbGkudGl0bGV7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxHSVdxTUNiV0FFQU93PT0pfS5kZyAuY3IuYm9vbGVhbntib3JkZXItbGVmdDozcHggc29saWQgIzgwNjc4N30uZGcgLmNyLmZ1bmN0aW9ue2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjZTYxZDVmfS5kZyAuY3IubnVtYmVye2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjMmZhMWQ2fS5kZyAuY3IubnVtYmVyIGlucHV0W3R5cGU9dGV4dF17Y29sb3I6IzJmYTFkNn0uZGcgLmNyLnN0cmluZ3tib3JkZXItbGVmdDozcHggc29saWQgIzFlZDM2Zn0uZGcgLmNyLnN0cmluZyBpbnB1dFt0eXBlPXRleHRde2NvbG9yOiMxZWQzNmZ9LmRnIC5jci5mdW5jdGlvbjpob3ZlciwuZGcgLmNyLmJvb2xlYW46aG92ZXJ7YmFja2dyb3VuZDojMTExfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JhY2tncm91bmQ6IzMwMzAzMDtvdXRsaW5lOm5vbmV9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF06aG92ZXJ7YmFja2dyb3VuZDojM2MzYzNjfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmZvY3Vze2JhY2tncm91bmQ6IzQ5NDk0OTtjb2xvcjojZmZmfS5kZyAuYyAuc2xpZGVye2JhY2tncm91bmQ6IzMwMzAzMDtjdXJzb3I6ZXctcmVzaXplfS5kZyAuYyAuc2xpZGVyLWZne2JhY2tncm91bmQ6IzJmYTFkNn0uZGcgLmMgLnNsaWRlcjpob3ZlcntiYWNrZ3JvdW5kOiMzYzNjM2N9LmRnIC5jIC5zbGlkZXI6aG92ZXIgLnNsaWRlci1mZ3tiYWNrZ3JvdW5kOiM0NGFiZGF9XFxuXCIsXG5kYXQuY29udHJvbGxlcnMuZmFjdG9yeSA9IChmdW5jdGlvbiAoT3B0aW9uQ29udHJvbGxlciwgTnVtYmVyQ29udHJvbGxlckJveCwgTnVtYmVyQ29udHJvbGxlclNsaWRlciwgU3RyaW5nQ29udHJvbGxlciwgRnVuY3Rpb25Db250cm9sbGVyLCBCb29sZWFuQ29udHJvbGxlciwgY29tbW9uKSB7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgdmFyIGluaXRpYWxWYWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICAgICAgLy8gUHJvdmlkaW5nIG9wdGlvbnM/XG4gICAgICAgIGlmIChjb21tb24uaXNBcnJheShhcmd1bWVudHNbMl0pIHx8IGNvbW1vbi5pc09iamVjdChhcmd1bWVudHNbMl0pKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBPcHRpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcm92aWRpbmcgYSBtYXA/XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihpbml0aWFsVmFsdWUpKSB7XG5cbiAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1syXSkgJiYgY29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1szXSkpIHtcblxuICAgICAgICAgICAgLy8gSGFzIG1pbiBhbmQgbWF4LlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXJDb250cm9sbGVyU2xpZGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTnVtYmVyQ29udHJvbGxlckJveChvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogYXJndW1lbnRzWzJdLCBtYXg6IGFyZ3VtZW50c1szXSB9KTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc1N0cmluZyhpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmdDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0Z1bmN0aW9uKGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzQm9vbGVhbihpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBCb29sZWFuQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9KShkYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94LFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJTbGlkZXIsXG5kYXQuY29udHJvbGxlcnMuU3RyaW5nQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgdGV4dCBpbnB1dCB0byBhbHRlciB0aGUgc3RyaW5nIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBTdHJpbmdDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgU3RyaW5nQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleXVwJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9faW5wdXQudmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcblxuICB9O1xuXG4gIFN0cmluZ0NvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgU3RyaW5nQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIFN0b3BzIHRoZSBjYXJldCBmcm9tIG1vdmluZyBvbiBhY2NvdW50IG9mOlxuICAgICAgICAgIC8vIGtleXVwIC0+IHNldFZhbHVlIC0+IHVwZGF0ZURpc3BsYXlcbiAgICAgICAgICBpZiAoIWRvbS5pc0FjdGl2ZSh0aGlzLl9faW5wdXQpKSB7XG4gICAgICAgICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBTdHJpbmdDb250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gU3RyaW5nQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbnRyb2xsZXJzLkZ1bmN0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlcixcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuRnVuY3Rpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3gsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclNsaWRlcixcbmRhdC5jb250cm9sbGVycy5PcHRpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkNvbG9yQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBDb2xvciwgaW50ZXJwcmV0LCBjb21tb24pIHtcblxuICB2YXIgQ29sb3JDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgQ29sb3JDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHRoaXMuX19jb2xvciA9IG5ldyBDb2xvcih0aGlzLmdldFZhbHVlKCkpO1xuICAgIHRoaXMuX190ZW1wID0gbmV3IENvbG9yKDApO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgZG9tLm1ha2VTZWxlY3RhYmxlKHRoaXMuZG9tRWxlbWVudCwgZmFsc2UpO1xuXG4gICAgdGhpcy5fX3NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmNsYXNzTmFtZSA9ICdzZWxlY3Rvcic7XG5cbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmNsYXNzTmFtZSA9ICdzYXR1cmF0aW9uLWZpZWxkJztcblxuICAgIHRoaXMuX19maWVsZF9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2ZpZWxkX2tub2IuY2xhc3NOYW1lID0gJ2ZpZWxkLWtub2InO1xuICAgIHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciA9ICcycHggc29saWQgJztcblxuICAgIHRoaXMuX19odWVfa25vYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19odWVfa25vYi5jbGFzc05hbWUgPSAnaHVlLWtub2InO1xuXG4gICAgdGhpcy5fX2h1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19odWVfZmllbGQuY2xhc3NOYW1lID0gJ2h1ZS1maWVsZCc7XG5cbiAgICB0aGlzLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19pbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ID0gJzAgMXB4IDFweCAnO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7IC8vIG9uIGVudGVyXG4gICAgICAgIG9uQmx1ci5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2VsZWN0b3IsICdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIGRvbVxuICAgICAgICAuYWRkQ2xhc3ModGhpcywgJ2RyYWcnKVxuICAgICAgICAuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3NlbGVjdG9yLCAnZHJhZycpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgdmFyIHZhbHVlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19zZWxlY3Rvci5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMjJweCcsXG4gICAgICBoZWlnaHQ6ICcxMDJweCcsXG4gICAgICBwYWRkaW5nOiAnM3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyMjInLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjMpJ1xuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fZmllbGRfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzEycHgnLFxuICAgICAgaGVpZ2h0OiAnMTJweCcsXG4gICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICh0aGlzLl9fY29sb3IudiA8IC41ID8gJyNmZmYnIDogJyMwMDAnKSxcbiAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC41KScsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgIHpJbmRleDogMVxuICAgIH0pO1xuICAgIFxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2h1ZV9rbm9iLnN0eWxlLCB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcycHgnLFxuICAgICAgYm9yZGVyUmlnaHQ6ICc0cHggc29saWQgI2ZmZicsXG4gICAgICB6SW5kZXg6IDFcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTAwcHgnLFxuICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICM1NTUnLFxuICAgICAgbWFyZ2luUmlnaHQ6ICczcHgnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh2YWx1ZV9maWVsZC5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZDogJ25vbmUnXG4gICAgfSk7XG4gICAgXG4gICAgbGluZWFyR3JhZGllbnQodmFsdWVfZmllbGQsICd0b3AnLCAncmdiYSgwLDAsMCwwKScsICcjMDAwJyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19odWVfZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcbiAgICAgIGN1cnNvcjogJ25zLXJlc2l6ZSdcbiAgICB9KTtcblxuICAgIGh1ZUdyYWRpZW50KHRoaXMuX19odWVfZmllbGQpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faW5wdXQuc3R5bGUsIHtcbiAgICAgIG91dGxpbmU6ICdub25lJyxcbi8vICAgICAgd2lkdGg6ICcxMjBweCcsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuLy8gICAgICBwYWRkaW5nOiAnNHB4Jyxcbi8vICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcbiAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXI6IDAsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICB0ZXh0U2hhZG93OiB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKDAsMCwwLDAuNyknXG4gICAgfSk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCwgJ21vdXNlZG93bicsIGZpZWxkRG93bik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2ZpZWxkX2tub2IsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2h1ZV9maWVsZCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHNldEgoZSk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRIKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGZpZWxkRG93bihlKSB7XG4gICAgICBzZXRTVihlKTtcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ25vbmUnO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZFNWKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmJpbmRTVigpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kU1YpO1xuICAgICAgLy8gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgdmFyIGkgPSBpbnRlcnByZXQodGhpcy52YWx1ZSk7XG4gICAgICBpZiAoaSAhPT0gZmFsc2UpIHtcbiAgICAgICAgX3RoaXMuX19jb2xvci5fX3N0YXRlID0gaTtcbiAgICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IF90aGlzLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmJpbmRIKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZEgpO1xuICAgIH1cblxuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmFwcGVuZENoaWxkKHZhbHVlX2ZpZWxkKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5fX2ZpZWxkX2tub2IpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5hcHBlbmRDaGlsZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKHRoaXMuX19odWVfZmllbGQpO1xuICAgIHRoaXMuX19odWVfZmllbGQuYXBwZW5kQ2hpbGQodGhpcy5fX2h1ZV9rbm9iKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9faW5wdXQpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fc2VsZWN0b3IpO1xuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICBmdW5jdGlvbiBzZXRTVihlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHcgPSBkb20uZ2V0V2lkdGgoX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICAgIHZhciBvID0gZG9tLmdldE9mZnNldChfdGhpcy5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgICAgdmFyIHMgPSAoZS5jbGllbnRYIC0gby5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0KSAvIHc7XG4gICAgICB2YXIgdiA9IDEgLSAoZS5jbGllbnRZIC0gby50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgLyB3O1xuXG4gICAgICBpZiAodiA+IDEpIHYgPSAxO1xuICAgICAgZWxzZSBpZiAodiA8IDApIHYgPSAwO1xuXG4gICAgICBpZiAocyA+IDEpIHMgPSAxO1xuICAgICAgZWxzZSBpZiAocyA8IDApIHMgPSAwO1xuXG4gICAgICBfdGhpcy5fX2NvbG9yLnYgPSB2O1xuICAgICAgX3RoaXMuX19jb2xvci5zID0gcztcblxuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuXG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEgoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBzID0gZG9tLmdldEhlaWdodChfdGhpcy5fX2h1ZV9maWVsZCk7XG4gICAgICB2YXIgbyA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19odWVfZmllbGQpO1xuICAgICAgdmFyIGggPSAxIC0gKGUuY2xpZW50WSAtIG8udG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApIC8gcztcblxuICAgICAgaWYgKGggPiAxKSBoID0gMTtcbiAgICAgIGVsc2UgaWYgKGggPCAwKSBoID0gMDtcblxuICAgICAgX3RoaXMuX19jb2xvci5oID0gaCAqIDM2MDtcblxuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgfTtcblxuICBDb2xvckNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgQ29sb3JDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgaSA9IGludGVycHJldCh0aGlzLmdldFZhbHVlKCkpO1xuXG4gICAgICAgICAgaWYgKGkgIT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHZhciBtaXNtYXRjaCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgbWlzbWF0Y2ggb24gdGhlIGludGVycHJldGVkIHZhbHVlLlxuXG4gICAgICAgICAgICBjb21tb24uZWFjaChDb2xvci5DT01QT05FTlRTLCBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb21tb24uaXNVbmRlZmluZWQoaVtjb21wb25lbnRdKSAmJlxuICAgICAgICAgICAgICAgICAgIWNvbW1vbi5pc1VuZGVmaW5lZCh0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSAmJlxuICAgICAgICAgICAgICAgICAgaVtjb21wb25lbnRdICE9PSB0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSB7XG4gICAgICAgICAgICAgICAgbWlzbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTsgLy8gYnJlYWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIC8vIElmIG5vdGhpbmcgZGl2ZXJnZXMsIHdlIGtlZXAgb3VyIHByZXZpb3VzIHZhbHVlc1xuICAgICAgICAgICAgLy8gZm9yIHN0YXRlZnVsbmVzcywgb3RoZXJ3aXNlIHdlIHJlY2FsY3VsYXRlIGZyZXNoXG4gICAgICAgICAgICBpZiAobWlzbWF0Y2gpIHtcbiAgICAgICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fY29sb3IuX19zdGF0ZSwgaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX190ZW1wLl9fc3RhdGUsIHRoaXMuX19jb2xvci5fX3N0YXRlKTtcblxuICAgICAgICAgIHRoaXMuX190ZW1wLmEgPSAxO1xuXG4gICAgICAgICAgdmFyIGZsaXAgPSAodGhpcy5fX2NvbG9yLnYgPCAuNSB8fCB0aGlzLl9fY29sb3IucyA+IC41KSA/IDI1NSA6IDA7XG4gICAgICAgICAgdmFyIF9mbGlwID0gMjU1IC0gZmxpcDtcblxuICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDEwMCAqIHRoaXMuX19jb2xvci5zIC0gNyArICdweCcsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6IDEwMCAqICgxIC0gdGhpcy5fX2NvbG9yLnYpIC0gNyArICdweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX190ZW1wLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArJyknXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLl9faHVlX2tub2Iuc3R5bGUubWFyZ2luVG9wID0gKDEgLSB0aGlzLl9fY29sb3IuaCAvIDM2MCkgKiAxMDAgKyAncHgnXG5cbiAgICAgICAgICB0aGlzLl9fdGVtcC5zID0gMTtcbiAgICAgICAgICB0aGlzLl9fdGVtcC52ID0gMTtcblxuICAgICAgICAgIGxpbmVhckdyYWRpZW50KHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLCAnbGVmdCcsICcjZmZmJywgdGhpcy5fX3RlbXAudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19pbnB1dC5zdHlsZSwge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fY29sb3IudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGNvbG9yOiAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKycpJyxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKyAnLCcgKyBfZmxpcCArJywuNyknXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcbiAgXG4gIHZhciB2ZW5kb3JzID0gWyctbW96LScsJy1vLScsJy13ZWJraXQtJywnLW1zLScsJyddO1xuICBcbiAgZnVuY3Rpb24gbGluZWFyR3JhZGllbnQoZWxlbSwgeCwgYSwgYikge1xuICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGNvbW1vbi5lYWNoKHZlbmRvcnMsIGZ1bmN0aW9uKHZlbmRvcikge1xuICAgICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAnICsgdmVuZG9yICsgJ2xpbmVhci1ncmFkaWVudCgnK3grJywgJythKycgMCUsICcgKyBiICsgJyAxMDAlKTsgJztcbiAgICB9KTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaHVlR3JhZGllbnQoZWxlbSkge1xuICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwgI2ZmMDBmZiAxNyUsICMwMDAwZmYgMzQlLCAjMDBmZmZmIDUwJSwgIzAwZmYwMCA2NyUsICNmZmZmMDAgODQlLCAjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tcy1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICB9XG5cblxuICByZXR1cm4gQ29sb3JDb250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LmNvbG9yLkNvbG9yID0gKGZ1bmN0aW9uIChpbnRlcnByZXQsIG1hdGgsIHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgQ29sb3IgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuX19zdGF0ZSA9IGludGVycHJldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHRoaXMuX19zdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93ICdGYWlsZWQgdG8gaW50ZXJwcmV0IGNvbG9yIGFyZ3VtZW50cyc7XG4gICAgfVxuXG4gICAgdGhpcy5fX3N0YXRlLmEgPSB0aGlzLl9fc3RhdGUuYSB8fCAxO1xuXG5cbiAgfTtcblxuICBDb2xvci5DT01QT05FTlRTID0gWydyJywnZycsJ2InLCdoJywncycsJ3YnLCdoZXgnLCdhJ107XG5cbiAgY29tbW9uLmV4dGVuZChDb2xvci5wcm90b3R5cGUsIHtcblxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0b1N0cmluZyh0aGlzKTtcbiAgICB9LFxuXG4gICAgdG9PcmlnaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmNvbnZlcnNpb24ud3JpdGUodGhpcyk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdyJywgMik7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdnJywgMSk7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdiJywgMCk7XG5cbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2gnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3MnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3YnKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnYScsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmE7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgdGhpcy5fX3N0YXRlLmEgPSB2O1xuICAgIH1cblxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnaGV4Jywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCF0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIRVgnKSB7XG4gICAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSBtYXRoLnJnYl90b19oZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuaGV4O1xuXG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSEVYJztcbiAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSB2O1xuXG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRlZmluZVJHQkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdSR0InKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnUkdCJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdSR0InO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZGVmaW5lSFNWQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnSFNWJylcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSFNWJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIU1YnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVSR0IoY29sb3IsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSEVYJykge1xuXG4gICAgICBjb2xvci5fX3N0YXRlW2NvbXBvbmVudF0gPSBtYXRoLmNvbXBvbmVudF9mcm9tX2hleChjb2xvci5fX3N0YXRlLmhleCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgfSBlbHNlIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xuXG4gICAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIG1hdGguaHN2X3RvX3JnYihjb2xvci5fX3N0YXRlLmgsIGNvbG9yLl9fc3RhdGUucywgY29sb3IuX19zdGF0ZS52KSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyAnQ29ycnVwdGVkIGNvbG9yIHN0YXRlJztcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVIU1YoY29sb3IpIHtcblxuICAgIHZhciByZXN1bHQgPSBtYXRoLnJnYl90b19oc3YoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBzOiByZXN1bHQucyxcbiAgICAgICAgICB2OiByZXN1bHQudlxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGlmICghY29tbW9uLmlzTmFOKHJlc3VsdC5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gcmVzdWx0Lmg7XG4gICAgfSBlbHNlIGlmIChjb21tb24uaXNVbmRlZmluZWQoY29sb3IuX19zdGF0ZS5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gMDtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBDb2xvcjtcblxufSkoZGF0LmNvbG9yLmludGVycHJldCxcbmRhdC5jb2xvci5tYXRoID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG1wQ29tcG9uZW50O1xuXG4gIHJldHVybiB7XG5cbiAgICBoc3ZfdG9fcmdiOiBmdW5jdGlvbihoLCBzLCB2KSB7XG5cbiAgICAgIHZhciBoaSA9IE1hdGguZmxvb3IoaCAvIDYwKSAlIDY7XG5cbiAgICAgIHZhciBmID0gaCAvIDYwIC0gTWF0aC5mbG9vcihoIC8gNjApO1xuICAgICAgdmFyIHAgPSB2ICogKDEuMCAtIHMpO1xuICAgICAgdmFyIHEgPSB2ICogKDEuMCAtIChmICogcykpO1xuICAgICAgdmFyIHQgPSB2ICogKDEuMCAtICgoMS4wIC0gZikgKiBzKSk7XG4gICAgICB2YXIgYyA9IFtcbiAgICAgICAgW3YsIHQsIHBdLFxuICAgICAgICBbcSwgdiwgcF0sXG4gICAgICAgIFtwLCB2LCB0XSxcbiAgICAgICAgW3AsIHEsIHZdLFxuICAgICAgICBbdCwgcCwgdl0sXG4gICAgICAgIFt2LCBwLCBxXVxuICAgICAgXVtoaV07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IGNbMF0gKiAyNTUsXG4gICAgICAgIGc6IGNbMV0gKiAyNTUsXG4gICAgICAgIGI6IGNbMl0gKiAyNTVcbiAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgcmdiX3RvX2hzdjogZnVuY3Rpb24ociwgZywgYikge1xuXG4gICAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICAgICAgZGVsdGEgPSBtYXggLSBtaW4sXG4gICAgICAgICAgaCwgcztcblxuICAgICAgaWYgKG1heCAhPSAwKSB7XG4gICAgICAgIHMgPSBkZWx0YSAvIG1heDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaDogTmFOLFxuICAgICAgICAgIHM6IDAsXG4gICAgICAgICAgdjogMFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAociA9PSBtYXgpIHtcbiAgICAgICAgaCA9IChnIC0gYikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSBpZiAoZyA9PSBtYXgpIHtcbiAgICAgICAgaCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoID0gNCArIChyIC0gZykgLyBkZWx0YTtcbiAgICAgIH1cbiAgICAgIGggLz0gNjtcbiAgICAgIGlmIChoIDwgMCkge1xuICAgICAgICBoICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGg6IGggKiAzNjAsXG4gICAgICAgIHM6IHMsXG4gICAgICAgIHY6IG1heCAvIDI1NVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmdiX3RvX2hleDogZnVuY3Rpb24ociwgZywgYikge1xuICAgICAgdmFyIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KDAsIDIsIHIpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAxLCBnKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMCwgYik7XG4gICAgICByZXR1cm4gaGV4O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRfZnJvbV9oZXg6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgpIHtcbiAgICAgIHJldHVybiAoaGV4ID4+IChjb21wb25lbnRJbmRleCAqIDgpKSAmIDB4RkY7XG4gICAgfSxcblxuICAgIGhleF93aXRoX2NvbXBvbmVudDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA8PCAodG1wQ29tcG9uZW50ID0gY29tcG9uZW50SW5kZXggKiA4KSB8IChoZXggJiB+ICgweEZGIDw8IHRtcENvbXBvbmVudCkpO1xuICAgIH1cblxuICB9XG5cbn0pKCksXG5kYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb2xvci5pbnRlcnByZXQsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC51dGlscy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxuICAgKiByZXF1aXJlanMgdmVyc2lvbiBvZiBQYXVsIElyaXNoJ3MgUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAqIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gICAqL1xuXG4gIHJldHVybiB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICBmdW5jdGlvbihjYWxsYmFjaywgZWxlbWVudCkge1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuXG4gICAgICB9O1xufSkoKSxcbmRhdC5kb20uQ2VudGVyZWREaXYgPSAoZnVuY3Rpb24gKGRvbSwgY29tbW9uKSB7XG5cblxuICB2YXIgQ2VudGVyZWREaXYgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUsIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMC44KScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgekluZGV4OiAnMTAwMCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBsaW5lYXInXG4gICAgfSk7XG5cbiAgICBkb20ubWFrZUZ1bGxzY3JlZW4odGhpcy5iYWNrZ3JvdW5kRWxlbWVudCk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuZG9tRWxlbWVudC5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB6SW5kZXg6ICcxMDAxJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLW91dCwgb3BhY2l0eSAwLjJzIGxpbmVhcidcbiAgICB9KTtcblxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGRvbS5iaW5kKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuaGlkZSgpO1xuICAgIH0pO1xuXG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBcblxuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4vLyAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzUyJSc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxLjEpJztcblxuICAgIHRoaXMubGF5b3V0KCk7XG5cbiAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxKSc7XG4gICAgfSk7XG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBoaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIF90aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ29UcmFuc2l0aW9uRW5kJywgaGlkZSk7XG5cbiAgICB9O1xuXG4gICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgIGRvbS5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbi8vICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnNDglJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxLjEpJztcblxuICB9O1xuXG4gIENlbnRlcmVkRGl2LnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHdpbmRvdy5pbm5lcldpZHRoLzIgLSBkb20uZ2V0V2lkdGgodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQvMiAtIGRvbS5nZXRIZWlnaHQodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICB9O1xuICBcbiAgZnVuY3Rpb24gbG9ja1Njcm9sbChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cblxuICByZXR1cm4gQ2VudGVyZWREaXY7XG5cbn0pKGRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pOyIsImNvbnN0IGNvbnZlcnNpb25GYWN0b3IgPSAxODAgLyBNYXRoLlBJO1xuXG52YXIgcmFkaWFuVG9EZWdyZWVzID0gZnVuY3Rpb24ocmFkaWFuKSB7XG5cdHJldHVybiByYWRpYW4gKiBjb252ZXJzaW9uRmFjdG9yO1xufVxuXG52YXIgZGVncmVlc1RvUmFkaWFuID0gZnVuY3Rpb24oZGVncmVlcykge1xuXHRyZXR1cm4gZGVncmVlcyAvIGNvbnZlcnNpb25GYWN0b3I7XG59XG5cbi8qKlxuICogQSBiYXNpYyAyRCBWZWN0b3IgY2xhc3MgdGhhdCBwcm92aWRlcyBzaW1wbGUgYWxnZWJyYWljIGZ1bmN0aW9uYWxpdHkgaW4gdGhlIGZvcm1cbiAqIG9mIDJEIFZlY3RvcnMuXG4gKlxuICogV2UgdXNlIEdldHRlcnMvc2V0dGVycyBmb3IgYm90aCBwcmluY2lwbGUgcHJvcGVydGllcyAoeCAmIHkpIGFzIHdlbGwgYXMgdmlydHVhbFxuICogcHJvcGVydGllcyAocm90YXRpb24sIGxlbmd0aCBldGMuKS5cbiAqXG4gKiBAY2xhc3MgVmVjdG9yXG4gKiBAYXV0aG9yIExpYW0gRWdhbiA8bGlhbUB3ZXRoZWNvbGxlY3RpdmUuY29tPlxuICogQHZlcnNpb24gMC4xLjFcbiAqIEBjcmVhdGVkIERlYyAxOSwgMjAxNlxuICovXG5jbGFzcyBWZWN0b3Ige1xuXG5cdC8qKlxuXHQgKiBUaGUgVmVjdG9yIENsYXNzIGNvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge251bWJlcn0geCBcdFx0XHRcdFRoZSB4IGNvb3JkXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB5IFx0XHRcdFx0VGhlIHkgY29vcmRcblx0ICovXG4gIGNvbnN0cnVjdG9yKHgsIHkpe1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIHZlY3RvciBjb29yZGluYXRlc1xuICAgKlxuICAgKiBAcHVibGljXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IFx0XHRcdFx0VGhlIHggY29vcmRcblx0ICogQHBhcmFtIHtudW1iZXJ9IHkgXHRcdFx0XHRUaGUgeSBjb29yZFxuICAgKi9cblx0cmVzZXQoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIHZlY3RvclxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0VGhlIGNsb25lZCB2ZWN0b3Jcblx0ICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG9uZSB2ZWN0b3IgdG8gYW5vdGhlci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIGFkZCB0byB0aGlzIG9uZVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgYWRkKHZlY3Rvcikge1xuICAgIHRoaXMueCArPSB2ZWN0b3IueDtcbiAgICB0aGlzLnkgKz0gdmVjdG9yLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBhZGRzIHRoZSB2ZWN0b3IgdG8gaXQgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gYWRkIHRvIHRoaXMgb25lXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgYWRkTmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmFkZCh2ZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBzY2FsYXIgdG8gdGhlIHZlY3RvciwgbW9kaWZ5aW5nIGJvdGggdGhlIHggYW5kIHlcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZCB0byB0aGUgdmVjdG9yXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBhZGRTY2FsYXIoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpKTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIGFkZHMgdGhlIHNjYWxhciB0byBpdCBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGQgdG8gdGhlIHZlY3RvclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGFkZFNjYWxhck5ldyhzY2FsYXIpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5hZGRTY2FsYXIoc2NhbGFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIGFub3RoZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBzdWJ0cmFjdCBmcm9tIHRoaXMgb25lXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBzdWJ0cmFjdCh2ZWN0b3IpIHtcbiAgICB0aGlzLnggLT0gdmVjdG9yLng7XG4gICAgdGhpcy55IC09IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgc3VidHJhY3RzIHRoZSB2ZWN0b3IgZnJvbSBpdCBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBzdWJ0cmFjdCBmcm9tIHRoaXMgb25lXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgc3VidHJhY3ROZXcodmVjdG9yKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuc3VidHJhY3QodmVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgYSBzY2FsYXIgZnJvbSB0aGUgdmVjdG9yLCBtb2RpZnlpbmcgYm90aCB0aGUgeCBhbmQgeVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3QgZnJvbSB0aGUgdmVjdG9yXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBzdWJ0cmFjdFNjYWxhcihzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJ0cmFjdChuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKSk7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBzdWJ0cmFjdHMgdGhlIHNjYWxhciBmcm9tIGl0IGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZCB0byB0aGUgdmVjdG9yXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgc3VidHJhY3RTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuc3VidHJhY3RTY2FsYXIoc2NhbGFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGVzIG9uZSB2ZWN0b3IgYnkgYW5vdGhlci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIGRpdmlkZSB0aGlzIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBkaXZpZGUodmVjdG9yKSB7XG4gICAgaWYodmVjdG9yLnggIT09IDApIHtcbiAgICAgIHRoaXMueCAvPSB2ZWN0b3IueFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnggPSAwO1xuICAgIH1cbiAgICBpZih2ZWN0b3IueSAhPT0gMCkge1xuICAgICAgdGhpcy55IC89IHZlY3Rvci55XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueSA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgZGl2aWRlcyBpdCBieSB0aGUgdmVjdG9yIGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIGRpdmlkZSB0aGUgY2xvbmUgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBkaXZpZGVOZXcodmVjdG9yKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuZGl2aWRlKHZlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogRGl2aWRlcyB0aGUgdmVjdG9yIGJ5IGEgc2NhbGFyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJvdGggeCBhbmQgeSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgZGl2aWRlU2NhbGFyKHNjYWxhcikge1xuICAgIHZhciB2ID0gbmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcik7XG4gICAgcmV0dXJuIHRoaXMuZGl2aWRlKHYpO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgZGl2aWRlcyBpdCBieSB0aGUgcHJvdmlkZWQgc2NhbGFyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJvdGggeCBhbmQgeSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGRpdmlkZVNjYWxhck5ldyhzY2FsYXIpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5kaXZpZGVTY2FsYXIoc2NhbGFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIG9uZSB2ZWN0b3IgYnkgYW5vdGhlci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IHRoaXMgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIG11bHRpcGx5KHZlY3Rvcikge1xuICAgIHRoaXMueCAqPSB2ZWN0b3IueDtcbiAgICB0aGlzLnkgKj0gdmVjdG9yLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBtdWx0aXBsaWVzIGl0IGJ5IHRoZSB2ZWN0b3IgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gbXVsdGlwbHkgdGhlIGNsb25lIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgbXVsdGlwbHlOZXcodmVjdG9yKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYubXVsdGlwbHkodmVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHRoZSB2ZWN0b3IgYnkgYSBzY2FsYXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBtdWx0aXBseSBib3RoIHggYW5kIHkgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIG11bHRpcGx5U2NhbGFyKHNjYWxhcikge1xuICAgIHZhciB2ID0gbmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcik7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkodik7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBtdWx0aXBsaWVzIGl0IGJ5IHRoZSBwcm92aWRlZCBzY2FsYXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBtdWx0aXBseSBib3RoIHggYW5kIHkgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBtdWx0aXBseVNjYWxhck5ldyhzY2FsYXIpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5tdWx0aXBseVNjYWxhcihzY2FsYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3IjbXVsdGlwbHlTY2FsYXJfX2FuY2hvciBtdWx0aXBseVNjYWxhcn1cbiAgICovXG4gIHNjYWxlKHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKHNjYWxhcik7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3IjbXVsdGlwbHlTY2FsYXJOZXdfX2FuY2hvciBtdWx0aXBseVNjYWxhck5ld31cbiAgICovXG4gIHNjYWxlTmV3KHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyTmV3KHNjYWxhcik7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRlcyBhIHZlY29yIGJ5IGEgZ2l2ZW4gYW1vdW50LCBwcm92aWRlZCBpbiByYWRpYW5zLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgcmFkaWFuIFRoZSBhbmdsZSwgaW4gcmFkaWFucywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHJvdGF0ZShyYWRpYW4pIHtcbiAgXHR2YXIgeCA9ICh0aGlzLnggKiBNYXRoLmNvcyhyYWRpYW4pKSAtICh0aGlzLnkgKiBNYXRoLnNpbihyYWRpYW4pKTtcbiAgXHR2YXIgeSA9ICh0aGlzLnggKiBNYXRoLnNpbihyYWRpYW4pKSArICh0aGlzLnkgKiBNYXRoLmNvcyhyYWRpYW4pKTtcblxuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblxuICBcdHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgcm90YXRlcyBpdCBieSB0aGUgc3VwcGxpZWQgcmFkaWFuIHZhbHVlXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICByYWRpYW4gVGhlIGFuZ2xlLCBpbiByYWRpYW5zLCB0byByb3RhdGUgdGhlIHZlY3RvciBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHJvdGF0ZU5ldyhyYWRpYW4pIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5yb3RhdGUocmFkaWFuKTtcbiAgfVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIGEgdmVjb3IgYnkgYSBnaXZlbiBhbW91bnQsIHByb3ZpZGVkIGluIGRlZ3JlZXMuIENvbnZlcnRzIHRoZSBkZWdyZWVcblx0ICogdmFsdWUgdG8gcmFkaWFucyBhbmQgcnVucyB0aGUgcm90YWV0IG1ldGhvZC5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKiBAY2hhaW5hYmxlXG5cdCAqIEBwYXJhbSAge251bWJlcn0gIGRlZ3JlZXMgVGhlIGFuZ2xlLCBpbiBkZWdyZWVzLCB0byByb3RhdGUgdGhlIHZlY3RvciBieVxuXHQgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG5cdCAqL1xuICByb3RhdGVEZWcoZGVncmVlcykge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZShkZWdyZWVzVG9SYWRpYW4oZGVncmVlcykpO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgcm90YXRlcyBpdCBieSB0aGUgc3VwcGxpZWQgZGVncmVlIHZhbHVlXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9ICBkZWdyZWVzIFRoZSBhbmdsZSwgaW4gZGVncmVlcywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHQgUmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgcm90YXRlRGVnTmV3KGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGVOZXcoZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI3JvdGF0ZV9fYW5jaG9yIHJvdGF0ZX1cbiAgICovXG4gIHJvdGF0ZUJ5KHJhZGlhbikge1xuXHRcdHJldHVybiB0aGlzLnJvdGF0ZShyYWRpYW4pO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI3JvdGF0ZU5ld19fYW5jaG9yIHJvdGF0ZU5ld31cbiAgICovXG4gIHJvdGF0ZUJ5TmV3KHJhZGlhbikge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZU5ldyhyYWRpYW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3Ijcm90YXRlRGVnX19hbmNob3Igcm90YXRlRGVnfVxuICAgKi9cbiAgcm90YXRlRGVnQnkoZGVncmVlcykge1xuXHRcdHJldHVybiB0aGlzLnJvdGF0ZURlZyhkZWdyZWVzKTtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNyb3RhdGVEZWdOZXdfX2FuY2hvciByb3RhdGVEZWdOZXd9XG4gICAqL1xuICByb3RhdGVEZWdCeU5ldyhyYWRpYW4pIHtcbiAgICByZXR1cm4gdGpvcy5yb3RhdGVEZWdOZXcocmFkaWFuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgdmVjdG9yIHRvIGEgc3BlY2lmaWMgYW5nbGVcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHJhZGlhbiBUaGUgYW5nbGUsIGluIHJhZGlhbnMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIHRvXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuXHRyb3RhdGVUbyhyYWRpYW4pIHtcblx0XHRyZXR1cm4gdGhpcy5yb3RhdGUocmFkaWFuLXRoaXMuYW5nbGUpO1xuXHR9O1xuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHJvdGF0ZXMgaXQgdG8gdGhlIHN1cHBsaWVkIHJhZGlhbiB2YWx1ZVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgcmFkaWFuIFRoZSBhbmdsZSwgaW4gcmFkaWFucywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgdG9cbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuXHRyb3RhdGVUb05ldyhyYWRpYW4pIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5yb3RhdGVUbyhyYWRpYW4pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIGEgdmVjb3IgdG8gYSBnaXZlbiBhbW91bnQsIHByb3ZpZGVkIGluIGRlZ3JlZXMuIENvbnZlcnRzIHRoZSBkZWdyZWVcblx0ICogdmFsdWUgdG8gcmFkaWFucyBhbmQgcnVucyB0aGUgcm90YXRlVG8gbWV0aG9kLlxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqIEBjaGFpbmFibGVcblx0ICogQHBhcmFtICB7bnVtYmVyfSAgZGVncmVlcyBUaGUgYW5nbGUsIGluIGRlZ3JlZXMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIHRvXG5cdCAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcblx0ICovXG4gIHJvdGF0ZVRvRGVnKGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGVUbyhkZWdyZWVzVG9SYWRpYW4oZGVncmVlcykpO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgcm90YXRlcyBpdCB0byB0aGUgc3VwcGxpZWQgZGVncmVlIHZhbHVlXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9ICBkZWdyZWVzIFRoZSBhbmdsZSwgaW4gZGVncmVlcywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgdG9cbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHQgUmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgcm90YXRlVG9EZWdOZXcoZGVncmVlcykge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZVRvTmV3KGRlZ3JlZXNUb1JhZGlhbihkZWdyZWVzKSk7XG4gIH1cblxuXHQvKipcblx0ICogTm9ybWFsaXNlcyB0aGUgdmVjdG9yIGRvd24gdG8gYSBsZW5ndGggb2YgMSB1bml0XG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICogQGNoYWluYWJsZVxuXHQgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuXHQgKi9cblx0bm9ybWFsaXNlKCkge1xuXHRcdHJldHVybiB0aGlzLmRpdmlkZVNjYWxhcih0aGlzLmxlbmd0aCk7XG5cdH1cblx0LyoqXG5cdCAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBub3JtYWxpc2VzIGl0XG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICogQGNoYWluYWJsZVxuXHQgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgYSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG5cdCAqL1xuXHRub3JtYWxpc2VOZXcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyTmV3KHRoaXMubGVuZ3RoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzdXBwbGllZCB2ZWN0b3Jcblx0ICpcblx0ICogQHBhcmFtICB7VmVjdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGZyb21cblx0ICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgVGhlIGRpc3RhbmNlIGJldHdlZW4gdGhpcyBhbmQgdGhlIHN1cHBsaWVkIHZlY3RvclxuXHQgKi9cblx0ZGlzdGFuY2UodmVjdG9yKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3VidHJhY3ROZXcodmVjdG9yKS5sZW5ndGg7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2Ugb24gdGhlIFggYXhpcyBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzdXBwbGllZCB2ZWN0b3Jcblx0ICpcblx0ICogQHBhcmFtICB7VmVjdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGZyb21cblx0ICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgVGhlIGRpc3RhbmNlLCBhbG9uZyB0aGUgeCBheGlzLCBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzdXBwbGllZCB2ZWN0b3Jcblx0ICovXG5cdGRpc3RhbmNlWCh2ZWN0b3IpIHtcblx0XHRyZXR1cm4gdGhpcy54IC0gdmVjdG9yLng7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsY3VsYXRlZCB0aGUgZGlzdGFuY2Ugb24gdGhlIFkgYXhpcyBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzdXBwbGllZCB2ZWN0b3Jcblx0ICpcblx0ICogQHBhcmFtICB7VmVjdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGZyb21cblx0ICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgVGhlIGRpc3RhbmNlLCBhbG9uZyB0aGUgeSBheGlzLCBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzdXBwbGllZCB2ZWN0b3Jcblx0ICovXG5cdGRpc3RhbmNlWSh2ZWN0b3IpIHtcblx0XHRyZXR1cm4gdGhpcy55IC0gdmVjdG9yLnk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBiZXR3ZWVuIHRoaXMgYW5kIGEgc3VwcGxpZWQgdmVjdG9yXG5cdCAqXG5cdCAqIEBleGFtcGxlXG5cdCAqIC8vIHJldHVybnMgLTE0XG5cdCAqIG5ldyBWZWN0b3IoMiwgLTMpLmRvdChuZXcgVmVjdG9yKC00LCAyKSlcblx0ICogbmV3IFZlY3RvcigtNCwgMikuZG90KG5ldyBWZWN0b3IoMiwgLTMpKVxuXHQgKiBuZXcgVmVjdG9yKDIsIC00KS5kb3QobmV3IFZlY3RvcigtMywgMikpXG5cdCAqXG5cdCAqIEBwYXJhbSAge1ZlY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3Igb2JqZWN0IGFnYWluc3Qgd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBkb3QgcHJvZHVjdFxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBUaGUgZG90IHByb2R1Y3Qgb2YgdGhlIHR3byB2ZWN0b3JzXG5cdCAqL1xuXHRkb3QodmVjdG9yKSB7XG5cdFx0cmV0dXJuICh0aGlzLnggKiB2ZWN0b3IueCkgKyAodGhpcy55ICogdmVjdG9yLnkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGNyb3NzIHByb2R1Y3QgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yLlxuXHQgKlxuXHQgKiBAZXhhbXBsZVxuXHQgKiAvLyByZXR1cm5zIC0yXG5cdCAqIG5ldyBWZWN0b3IoMiwgLTMpLmNyb3NzKG5ldyBWZWN0b3IoLTQsIDIpKVxuXHQgKiBuZXcgVmVjdG9yKC00LCAyKS5jcm9zcyhuZXcgVmVjdG9yKDIsIC0zKSlcblx0ICogLy8gcmV0dXJucyAyXG5cdCAqIG5ldyBWZWN0b3IoMiwgLTQpLmNyb3NzKG5ldyBWZWN0b3IoLTMsIDIpKVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtWZWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIG9iamVjdCBhZ2FpbnN0IHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgY3Jvc3MgcHJvZHVjdFxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBUaGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdHdvIHZlY3RvcnNcblx0ICovXG5cdGNyb3NzKHZlY3Rvcikge1xuXHRcdHJldHVybiAodGhpcy54ICogdmVjdG9yLngpIC0gKHRoaXMueSAqIHZlY3Rvci55KTtcblx0fVxuXG5cbiAgLyoqXG4gICAqIEdldHRlcnMgYW5kIHNldHRlcnNcbiAgICovXG5cbiAgLyoqXG4gICAqIChnZXR0ZXIvc2V0dGVyKSBUaGUgeCB2YWx1ZSBvZiB0aGUgdmVjdG9yLlxuICAgKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBzZXQgeCh4KSB7XG4gICAgaWYodHlwZW9mIHggPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3ggPSB4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdYIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgeCgpIHtcbiAgICByZXR1cm4gdGhpcy5feCB8fCAwO1xuICB9XG5cbiAvKipcblx0KiAoZ2V0dGVyL3NldHRlcikgVGhlIHkgdmFsdWUgb2YgdGhlIHZlY3Rvci5cblx0KlxuXHQqIEB0eXBlIHtudW1iZXJ9XG5cdCogQGRlZmF1bHQgMFxuXHQqL1xuICBzZXQgeSh5KSB7XG4gICAgaWYodHlwZW9mIHkgPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3kgPSB5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy5feSB8fCAwO1xuICB9XG5cblx0LyoqXG5cdCogKGdldHRlci9zZXR0ZXIpIFRoZSBsZW5ndGggb2YgdGhlIHZlY3RvciBwcmVzZW50ZWQgYXMgYSBzcXVhcmUuIElmIHlvdSdyZSB1c2luZ1xuXHQqIGxlbmd0aCBmb3IgY29tcGFyaXNvbiwgdGhpcyBpcyBxdWlja2VyLlxuXHQqXG5cdCogQHR5cGUge251bWJlcn1cblx0KiBAZGVmYXVsdCAwXG5cdCovXG4gIHNldCBsZW5ndGhTcXVhcmVkKGxlbmd0aCkge1xuICAgIHZhciBmYWN0b3I7XG4gICAgaWYodHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJykge1xuICAgICAgZmFjdG9yID0gbGVuZ3RoIC8gdGhpcy5sZW5ndGhTcXVhcmVkO1xuICAgICAgdGhpcy5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdsZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCBsZW5ndGhTcXVhcmVkKCkge1xuICAgIHJldHVybiAodGhpcy54ICogdGhpcy54KSArICh0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cblx0LyoqXG5cdCogKGdldHRlci9zZXR0ZXIpIFRoZSBsZW5ndGggb2YgdGhlIHZlY3RvclxuXHQqXG5cdCogQHR5cGUge251bWJlcn1cblx0KiBAZGVmYXVsdCAwXG5cdCovXG4gIHNldCBsZW5ndGgobGVuZ3RoKSB7XG4gICAgdmFyIGZhY3RvcjtcbiAgICBpZih0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInKSB7XG4gICAgICBmYWN0b3IgPSBsZW5ndGggLyB0aGlzLmxlbmd0aDtcbiAgICAgIHRoaXMubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXVhcmVkKTtcbiAgfVxuXG5cdC8qKlxuXHQqIChnZXR0ZXIvc2V0dGVyKSBUaGUgYW5nbGUgb2YgdGhlIHZlY3RvciwgaW4gcmFkaWFuc1xuXHQqXG5cdCogQHR5cGUge251bWJlcn1cblx0KiBAZGVmYXVsdCAwXG5cdCovXG4gIHNldCBhbmdsZShyYWRpYW4pIHtcbiAgICBpZih0eXBlb2YgcmFkaWFuID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnJvdGF0ZVRvKHJhZGlhbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FuZ2xlIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgYW5nbGUoKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICB9XG5cblx0LyoqXG5cdCogKGdldHRlci9zZXR0ZXIpIFRoZSBhbmdsZSBvZiB0aGUgdmVjdG9yLCBpbiByYWRpYW5zXG5cdCpcblx0KiBAdHlwZSB7bnVtYmVyfVxuXHQqIEBkZWZhdWx0IDBcblx0Ki9cbiAgc2V0IGFuZ2xlSW5EZWdyZWVzKGRlZ3JlZXMpIHtcbiAgICBpZih0eXBlb2YgZGVncmVlcyA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5yb3RhdGVUb0RlZyhkZWdyZWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYW5nbGUgc2hvdWxkIGJlIGEgbnVtYmVyJyk7XG4gICAgfVxuICB9XG4gIGdldCBhbmdsZUluRGVncmVlcygpIHtcbiAgICByZXR1cm4gcmFkaWFuVG9EZWdyZWVzKE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpKTtcbiAgfVxuXG5cdC8qKlxuXHQgKiAoZ2V0dGVyL3NldHRlcikgVmVjdG9yIHdpZHRoLlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI3ggeH1cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHNldCB3aWR0aCh3KSB7XG5cdFx0dGhpcy54ID0gdztcblx0fVxuXHRnZXQgd2lkdGgoKSB7XG5cdFx0cmV0dXJuIHRoaXMueDtcblx0fVxuXG5cdC8qKlxuXHQgKiAoZ2V0dGVyL3NldHRlcikgVmVjdG9yIGhlaWdodC5cbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciN4IHh9XG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzZXQgaGVpZ2h0KGgpIHtcblx0XHR0aGlzLnkgPSBoO1xuXHR9XG5cdGdldCBoZWlnaHQoKSB7XG5cdFx0cmV0dXJuIHRoaXMueTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvcjtcbiJdfQ==

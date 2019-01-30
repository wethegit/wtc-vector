(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _wtcVector = require("../../src/wtc-vector");

var _wtcVector2 = _interopRequireDefault(_wtcVector);

var _DrawingVector = require("../app/DrawingVector");

var _DrawingVector2 = _interopRequireDefault(_DrawingVector);

var _VectorPlayground = require("../app/VectorPlayground");

var _VectorPlayground2 = _interopRequireDefault(_VectorPlayground);

var _colours = require("../app/colours");

var _datGui = require("dat-gui");

var _datGui2 = _interopRequireDefault(_datGui);

var _calcUpdate = require("../app/calcUpdate");

var _calcUpdate2 = _interopRequireDefault(_calcUpdate);

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

  var va = new _DrawingVector2.default(1, -2, _colours.colours[0]);
  va.label = "[ 1, -2 ]";
  var vb = new _DrawingVector2.default(-3, 1, _colours.colours[1]);
  vb.label = "[ -3, 1 ]";
  settings._vector0 = va.v;
  settings._vector1 = vb.v;
  vb.offset = va.v;
  var vc = new _DrawingVector2.default(0, 0, '#CCCCCC');
  vc.v = va.v.addNew(vb.v);
  settings._vector2 = vc.v;
  vc.label = "[ " + vc.v.x + ", " + vc.v.y + " ]";
  var vd = new _DrawingVector2.default(0, 0, '#777777');
  vd.v = va.v.subtractNew(vb.v);
  vd.label = "subtraction";

  _VectorPlayground2.default.init();
  _VectorPlayground2.default.addVector(vc);
  _VectorPlayground2.default.addVector(va);
  _VectorPlayground2.default.addVector(vb);
  _VectorPlayground2.default.addVector(vd);

  var update = function update() {
    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


    if (settings.animating && animate === true) {

      // Update the angle of the vector
      va.v.angle += 0.01;

      requestAnimationFrame(function () {
        update(true);
      });
    }

    // Update Vector C based on the addition of the two components
    vc.v = va.v.addNew(vb.v);

    // Update Vector D based on the addition of the two components
    vd.v = va.v.subtractNew(vb.v);

    // Update the settings variables
    settings._vector0 = va.v;
    settings._vector2 = vc.v;

    // update the labels
    va.label = "[ " + Math.round(va.v.x * 100) / 100 + ", " + Math.round(va.v.y * 100) / 100 + " ]";
    vb.label = "[ " + Math.round(vb.v.x * 100) / 100 + ", " + Math.round(vb.v.y * 100) / 100 + " ]";
    vc.label = "[ " + Math.round(vc.v.x * 100) / 100 + ", " + Math.round(vc.v.y * 100) / 100 + " ]";
    vd.label = "subtraction [ " + Math.round(vd.v.x * 100) / 100 + ", " + Math.round(vd.v.y * 100) / 100 + " ]";
  };

  update();

  var gui = new _datGui2.default.GUI();
  var animationControl = gui.add(settings, 'animating');
  animationControl.onChange(function (value) {
    if (value == true) {
      update();
    }
  });
  var t_V_onChange = function t_V_onChange(val, item) {
    update(false);
  };
  var t_VA = gui.addFolder('Vector A');
  var t_VA_x = t_VA.add(settings._vector0, 'x').listen();
  var t_VA_y = t_VA.add(settings._vector0, 'y').listen();
  var t_VB = gui.addFolder('Vector B');
  var t_VB_x = t_VB.add(settings._vector1, 'x').listen();
  var t_VB_y = t_VB.add(settings._vector1, 'y').listen();
  var t_VC = gui.addFolder('Vector C');
  var t_VC_x = t_VC.add(settings._vector2, 'x').listen();
  var t_VC_y = t_VC.add(settings._vector2, 'y').listen();
  t_VA_x.onChange(t_V_onChange);
  t_VA_y.onChange(t_V_onChange);
  t_VB_x.onChange(t_V_onChange);
  t_VB_y.onChange(t_V_onChange);
  t_VA_x.__precision = t_VA_y.__precision = t_VB_x.__precision = t_VB_y.__precision = 3;
  t_VA_x.__impliedStep = t_VA_y.__impliedStep = t_VB_x.__impliedStep = t_VB_y.__impliedStep = 0.05;

  (0, _calcUpdate2.default)(settings);
});

},{"../../src/wtc-vector":9,"../app/DrawingVector":2,"../app/VectorPlayground":3,"../app/calcUpdate":4,"../app/colours":5,"dat-gui":6}],2:[function(require,module,exports){
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

},{"../../src/wtc-vector":9}],3:[function(require,module,exports){
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

},{"../../src/wtc-vector":9,"./DrawingVector":2,"./colours":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var updateCalculation = function updateCalculation(settings) {

  var els = document.querySelectorAll('[data-value]');

  function animate() {
    els.forEach(function (el) {
      var address = el.getAttribute('data-value').split('.');
      var value = settings;
      address.forEach(function (address) {
        try {
          if (value[address] !== 'undefined') value = value[address];
        } catch (e) {}
      });
      if (typeof value == 'number') value = Math.round(value * 100) / 100;
      el.innerText = value;
    });
    requestAnimationFrame(animate);
  }
  animate();
};

exports.default = updateCalculation;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
module.exports = require('./vendor/dat.gui')
module.exports.color = require('./vendor/dat.color')
},{"./vendor/dat.color":7,"./vendor/dat.gui":8}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2FkZGl0aW9uL3J1bi5qcyIsImRlbW8vYXBwL0RyYXdpbmdWZWN0b3IuanMiLCJkZW1vL2FwcC9WZWN0b3JQbGF5Z3JvdW5kLmpzIiwiZGVtby9hcHAvY2FsY1VwZGF0ZS5qcyIsImRlbW8vYXBwL2NvbG91cnMuanMiLCJub2RlX21vZHVsZXMvZGF0LWd1aS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kYXQtZ3VpL3ZlbmRvci9kYXQuY29sb3IuanMiLCJub2RlX21vZHVsZXMvZGF0LWd1aS92ZW5kb3IvZGF0Lmd1aS5qcyIsInNyYy93dGMtdmVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxPQUFPLE1BQVA7O0FBRUEsSUFBSSxXQUFXO0FBQ2IsYUFBVztBQURFLENBQWY7O0FBSUEsU0FBUyxLQUFULENBQWUsRUFBZixFQUFtQjtBQUNqQixNQUFJLFNBQVMsVUFBVCxJQUF1QixTQUEzQixFQUFxQztBQUNuQztBQUNELEdBRkQsTUFFTztBQUNMLGFBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLEVBQTlDO0FBQ0Q7QUFDRjtBQUNELE1BQU0sWUFBVzs7QUFFZixNQUFJLEtBQUssNEJBQWtCLENBQWxCLEVBQXFCLENBQUMsQ0FBdEIsRUFBeUIsaUJBQVEsQ0FBUixDQUF6QixDQUFUO0FBQ0EsS0FBRyxLQUFIO0FBQ0EsTUFBSSxLQUFLLDRCQUFrQixDQUFDLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLGlCQUFRLENBQVIsQ0FBekIsQ0FBVDtBQUNBLEtBQUcsS0FBSDtBQUNBLFdBQVMsUUFBVCxHQUFvQixHQUFHLENBQXZCO0FBQ0EsV0FBUyxRQUFULEdBQW9CLEdBQUcsQ0FBdkI7QUFDQSxLQUFHLE1BQUgsR0FBWSxHQUFHLENBQWY7QUFDQSxNQUFJLEtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LEtBQUssQ0FBckI7QUFDQTs7Ozs7O2tCQUlhLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuLi8uLi9zcmMvd3RjLXZlY3RvclwiO1xuaW1wb3J0IERyYXdpbmdWZWN0b3IgZnJvbSBcIi4uL2FwcC9EcmF3aW5nVmVjdG9yXCI7XG5pbXBvcnQgVmVjdG9yUGxheWdyb3VuZCBmcm9tIFwiLi4vYXBwL1ZlY3RvclBsYXlncm91bmRcIjtcbmltcG9ydCB7Y29sb3Vyc30gZnJvbSAnLi4vYXBwL2NvbG91cnMnO1xuaW1wb3J0IGRhdCBmcm9tICdkYXQtZ3VpJztcbmltcG9ydCB1cGRhdGVDYWxjdWxhdGlvbiBmcm9tICcuLi9hcHAvY2FsY1VwZGF0ZSc7XG5cbndpbmRvdy5WZWN0b3IgPSBWZWN0b3I7XG5cbmxldCBzZXR0aW5ncyA9IHtcbiAgYW5pbWF0aW5nOiBmYWxzZVxufVxuXG5mdW5jdGlvbiByZWFkeShmbikge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSAnbG9hZGluZycpe1xuICAgIGZuKCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuKTtcbiAgfVxufVxucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgbGV0IHZhID0gbmV3IERyYXdpbmdWZWN0b3IoMSwgLTIsIGNvbG91cnNbMF0pO1xuICB2YS5sYWJlbCA9IGBbIDEsIC0yIF1gO1xuICBsZXQgdmIgPSBuZXcgRHJhd2luZ1ZlY3RvcigtMywgMSwgY29sb3Vyc1sxXSk7XG4gIHZiLmxhYmVsID0gYFsgLTMsIDEgXWA7XG4gIHNldHRpbmdzLl92ZWN0b3IwID0gdmEudjtcbiAgc2V0dGluZ3MuX3ZlY3RvcjEgPSB2Yi52O1xuICB2Yi5vZmZzZXQgPSB2YS52O1xuICBsZXQgdmMgPSBuZXcgRHJhd2luZ1ZlY3RvcigwLCAwLCAnI0NDQ0NDQycpO1xuICB2Yy52ID0gdmEudi5hZGROZXcodmIudik7XG4gIHNldHRpbmdzLl92ZWN0b3IyID0gdmMudjtcbiAgdmMubGFiZWwgPSBgWyAke3ZjLnYueH0sICR7dmMudi55fSBdYDtcbiAgbGV0IHZkID0gbmV3IERyYXdpbmdWZWN0b3IoMCwgMCwgJyM3Nzc3NzcnKTtcbiAgdmQudiA9IHZhLnYuc3VidHJhY3ROZXcodmIudik7XG4gIHZkLmxhYmVsID0gYHN1YnRyYWN0aW9uYDtcblxuICBWZWN0b3JQbGF5Z3JvdW5kLmluaXQoKTtcbiAgVmVjdG9yUGxheWdyb3VuZC5hZGRWZWN0b3IodmMpO1xuICBWZWN0b3JQbGF5Z3JvdW5kLmFkZFZlY3Rvcih2YSk7XG4gIFZlY3RvclBsYXlncm91bmQuYWRkVmVjdG9yKHZiKTtcbiAgVmVjdG9yUGxheWdyb3VuZC5hZGRWZWN0b3IodmQpO1xuXG4gIGxldCB1cGRhdGUgPSBmdW5jdGlvbihhbmltYXRlID0gdHJ1ZSkge1xuXG4gICAgaWYoc2V0dGluZ3MuYW5pbWF0aW5nICYmIGFuaW1hdGUgPT09IHRydWUpIHtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBhbmdsZSBvZiB0aGUgdmVjdG9yXG4gICAgICB2YS52LmFuZ2xlICs9IDAuMDE7XG5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHsgdXBkYXRlKHRydWUpOyB9KTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgVmVjdG9yIEMgYmFzZWQgb24gdGhlIGFkZGl0aW9uIG9mIHRoZSB0d28gY29tcG9uZW50c1xuICAgIHZjLnYgPSB2YS52LmFkZE5ldyh2Yi52KTtcblxuICAgIC8vIFVwZGF0ZSBWZWN0b3IgRCBiYXNlZCBvbiB0aGUgYWRkaXRpb24gb2YgdGhlIHR3byBjb21wb25lbnRzXG4gICAgdmQudiA9IHZhLnYuc3VidHJhY3ROZXcodmIudik7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHNldHRpbmdzIHZhcmlhYmxlc1xuICAgIHNldHRpbmdzLl92ZWN0b3IwID0gdmEudjtcbiAgICBzZXR0aW5ncy5fdmVjdG9yMiA9IHZjLnY7XG5cbiAgICAvLyB1cGRhdGUgdGhlIGxhYmVsc1xuICAgIHZhLmxhYmVsID0gYFsgJHtNYXRoLnJvdW5kKHZhLnYueCAqIDEwMCkgLyAxMDB9LCAke01hdGgucm91bmQodmEudi55ICogMTAwKSAvIDEwMH0gXWA7XG4gICAgdmIubGFiZWwgPSBgWyAke01hdGgucm91bmQodmIudi54ICogMTAwKSAvIDEwMH0sICR7TWF0aC5yb3VuZCh2Yi52LnkgKiAxMDApIC8gMTAwfSBdYDtcbiAgICB2Yy5sYWJlbCA9IGBbICR7TWF0aC5yb3VuZCh2Yy52LnggKiAxMDApIC8gMTAwfSwgJHtNYXRoLnJvdW5kKHZjLnYueSAqIDEwMCkgLyAxMDB9IF1gO1xuICAgIHZkLmxhYmVsID0gYHN1YnRyYWN0aW9uIFsgJHtNYXRoLnJvdW5kKHZkLnYueCAqIDEwMCkgLyAxMDB9LCAke01hdGgucm91bmQodmQudi55ICogMTAwKSAvIDEwMH0gXWA7XG5cbiAgfVxuXG4gIHVwZGF0ZSgpO1xuXG4gIHZhciBndWkgPSBuZXcgZGF0LkdVSSgpO1xuICB2YXIgYW5pbWF0aW9uQ29udHJvbCA9IGd1aS5hZGQoc2V0dGluZ3MsICdhbmltYXRpbmcnKTtcbiAgYW5pbWF0aW9uQ29udHJvbC5vbkNoYW5nZShmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmKHZhbHVlID09IHRydWUpIHtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfSk7XG4gIGxldCB0X1Zfb25DaGFuZ2UgPSBmdW5jdGlvbih2YWwsIGl0ZW0pIHtcbiAgICB1cGRhdGUoZmFsc2UpO1xuICB9XG4gIGxldCB0X1ZBID0gZ3VpLmFkZEZvbGRlcignVmVjdG9yIEEnKTtcbiAgbGV0IHRfVkFfeCA9IHRfVkEuYWRkKHNldHRpbmdzLl92ZWN0b3IwLCAneCcpLmxpc3RlbigpO1xuICBsZXQgdF9WQV95ID0gdF9WQS5hZGQoc2V0dGluZ3MuX3ZlY3RvcjAsICd5JykubGlzdGVuKCk7XG4gIGxldCB0X1ZCID0gZ3VpLmFkZEZvbGRlcignVmVjdG9yIEInKTtcbiAgbGV0IHRfVkJfeCA9IHRfVkIuYWRkKHNldHRpbmdzLl92ZWN0b3IxLCAneCcpLmxpc3RlbigpO1xuICBsZXQgdF9WQl95ID0gdF9WQi5hZGQoc2V0dGluZ3MuX3ZlY3RvcjEsICd5JykubGlzdGVuKCk7XG4gIGxldCB0X1ZDID0gZ3VpLmFkZEZvbGRlcignVmVjdG9yIEMnKTtcbiAgbGV0IHRfVkNfeCA9IHRfVkMuYWRkKHNldHRpbmdzLl92ZWN0b3IyLCAneCcpLmxpc3RlbigpO1xuICBsZXQgdF9WQ195ID0gdF9WQy5hZGQoc2V0dGluZ3MuX3ZlY3RvcjIsICd5JykubGlzdGVuKCk7XG4gIHRfVkFfeC5vbkNoYW5nZSh0X1Zfb25DaGFuZ2UpO1xuICB0X1ZBX3kub25DaGFuZ2UodF9WX29uQ2hhbmdlKTtcbiAgdF9WQl94Lm9uQ2hhbmdlKHRfVl9vbkNoYW5nZSk7XG4gIHRfVkJfeS5vbkNoYW5nZSh0X1Zfb25DaGFuZ2UpO1xuICB0X1ZBX3guX19wcmVjaXNpb24gPSB0X1ZBX3kuX19wcmVjaXNpb24gPSB0X1ZCX3guX19wcmVjaXNpb24gPSB0X1ZCX3kuX19wcmVjaXNpb24gPSAzO1xuICB0X1ZBX3guX19pbXBsaWVkU3RlcCA9IHRfVkFfeS5fX2ltcGxpZWRTdGVwID0gdF9WQl94Ll9faW1wbGllZFN0ZXAgPSB0X1ZCX3kuX19pbXBsaWVkU3RlcCA9IDAuMDU7XG5cbiAgdXBkYXRlQ2FsY3VsYXRpb24oc2V0dGluZ3MpO1xuXG59KTtcbiIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4uLy4uL3NyYy93dGMtdmVjdG9yXCI7XG5cbmNsYXNzIERyYXdpbmdWZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBjb2xvciwgbGluZVdpZHRoID0gMSkge1xuICAgIHRoaXMudiA9IG5ldyBWZWN0b3IoeCwgeSk7XG5cbiAgICB0aGlzLmFycm93aGVhZFYxID0gbmV3IFZlY3RvcigtMTAsLTEwKTtcbiAgICB0aGlzLmFycm93aGVhZFYyID0gbmV3IFZlY3RvcigtMTAsIDEwKTtcblxuICAgIGlmKCB0eXBlb2YgY29sb3IgIT09ICdzdHJpbmcnIHx8ICEoL14jWzAtOUFCQ0RFRmFiY2RlZl0qLy50ZXN0KGNvbG9yKSkgKSB7XG4gICAgICBjb2xvciA9ICcjJyArICgnMCcrKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSoyNTUpKS50b1N0cmluZygxNikpLnN1YnN0cigtMikgKyAoJzAnKyhNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMjU1KSkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpICsgKCcwJysoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjI1NSkpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gIH1cblxuICBkcmF3KHBsYXlncm91bmQpIHtcbiAgICBsZXQgaXNDYXJ0ZXNpYW4gPSBwbGF5Z3JvdW5kLmNhcnRlc2lhbjtcbiAgICBsZXQgdW5pdFggPSBwbGF5Z3JvdW5kLnNjYWxlZFVuaXRWZWN0b3JYOyAvLyBpSGF0XG4gICAgbGV0IHVuaXRZID0gcGxheWdyb3VuZC5zY2FsZWRVbml0VmVjdG9yWTsgLy8gakhhdFxuICAgIGxldCBzY2FsZSA9IHBsYXlncm91bmQuc2NhbGU7XG4gICAgbGV0IG9mZnNldCA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgLy8gR3R0aW5nIHRoZSBvZmZzZXQgb2YgdGhlIHZlY3RvciBhbmQsIGlmIGl0IGhhcyBsZW5ndGgsIHNldHRpbmcgdXAgdGhlXG4gICAgLy8gdHJhbnNsYXRlZCBvZmZzZXRcbiAgICBpZih0aGlzLm9mZnNldCBpbnN0YW5jZW9mIFZlY3Rvcikge1xuICAgICAgbGV0IF9vZmZzZXQgPSB0aGlzLm9mZnNldC5jbG9uZSgpO1xuICAgICAgaWYoaXNDYXJ0ZXNpYW4pIHtcbiAgICAgICAgX29mZnNldC55ICo9IC0xXG4gICAgICB9XG4gICAgICBvZmZzZXQueCA9IChfb2Zmc2V0LnggKiB1bml0WC54KSArIChfb2Zmc2V0LnkgKiB1bml0WS54KTtcbiAgICAgIG9mZnNldC55ID0gKF9vZmZzZXQueCAqIHVuaXRYLnkpICsgKF9vZmZzZXQueSAqIHVuaXRZLnkpO1xuICAgIH1cbiAgICAvLyBBZGRpbmcgdGhlIHBsYXlncm91bmQncyBvZmZzZXQgdG8gaXQgKG9yaWdpbiBwb2ludClcbiAgICBsZXQgcGdPZmZzZXQgPSBwbGF5Z3JvdW5kLm9mZnNldDtcbiAgICAvLyBpZihpc0NhcnRlc2lhbikgcGdPZmZzZXQueSAqPSAtMTsgLy8gcmV2ZXJzaW5nIHRoZSBvdXRwdXQgWSBpZiB3ZSdyZSBzZXQgdG8gY2FydGVzaWFuIGNvb3Jkc1xuICAgIG9mZnNldC5hZGQocGdPZmZzZXQpO1xuICAgIGxldCB4ID0gb2Zmc2V0Lng7XG4gICAgbGV0IHkgPSBvZmZzZXQueTtcbiAgICBsZXQgY3R4ID0gcGxheWdyb3VuZC5tYWluQ3R4O1xuXG4gICAgaWYodGhpcy5vdXRwdXRWZWN0b3IgaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgIGxldCB1bml0WCA9IHBsYXlncm91bmQudW5pdFZlY3RvclguY2xvbmUoKTsgLy8gaUhhdFxuICAgICAgbGV0IHVuaXRZID0gcGxheWdyb3VuZC51bml0VmVjdG9yWS5jbG9uZSgpOyAvLyBqSGF0XG4gICAgICBsZXQgViA9IHRoaXMudi5jbG9uZSgpO1xuXG4gICAgICBpZihpc0NhcnRlc2lhbikge1xuICAgICAgICB1bml0WC55ICo9IC0xOyAvLyByZXZlcnNpbmcgdGhlIG91dHB1dCBZIGlmIHdlJ3JlIHNldCB0byBjYXJ0ZXNpYW4gY29vcmRzXG4gICAgICAgIHVuaXRZLnkgKj0gLTE7XG4gICAgICAgIFYueSAqPSAtMTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vdXRwdXRWZWN0b3IueCA9IChWLnggKiB1bml0WC54KSArIChWLnkgKiB1bml0WS54KTtcbiAgICAgIHRoaXMub3V0cHV0VmVjdG9yLnkgPSAoVi54ICogdW5pdFgueSkgKyAoVi55ICogdW5pdFkueSk7XG4gICAgfVxuXG4gICAgLy8gVHJhbnNsYXRlIHRoZSB2ZWN0b3IgdXNpbmcgbGluZWFyIHRyYW5zZm9ybWF0aW9uIHgow64pICsgeShqKVxuICAgIC8vIMOuID0gdW5peCBYXG4gICAgLy8gaiA9IHVuaXQgWVxuICAgIC8vICBfICAgICAgIF8gICAgXyAgICAgICBfXG4gICAgLy8gfCB4KMOuLngpIHwgKyB8IHkoai54KSB8XG4gICAgLy8gfCB4KGkueSkgfCArIHwgeShqLnkpIHxcbiAgICAvL1xuICAgIGxldCBWID0gdGhpcy52LmNsb25lKCk7XG4gICAgaWYoaXNDYXJ0ZXNpYW4pIHtcbiAgICAgIFYueSAqPSAtMTsgLy8gUmV2ZXJzZSB0aGUgWSBjb29yZCBpZiB0aGlzIGlzIGEgY2FydGVzaWFuIHN5c3RlbVxuICAgIH1cbiAgICBsZXQgdHJhbnNsYXRlZFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgdHJhbnNsYXRlZFZlY3Rvci54ID0gKFYueCAqIHVuaXRYLngpICsgKFYueSAqIHVuaXRZLngpO1xuICAgIHRyYW5zbGF0ZWRWZWN0b3IueSA9IChWLnggKiB1bml0WC55KSArIChWLnkgKiB1bml0WS55KTtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubGluZVdpZHRoID0gdGhpcy5saW5lV2lkdGg7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIHggPSB0cmFuc2xhdGVkVmVjdG9yLnggKyBvZmZzZXQueDtcbiAgICB5ID0gdHJhbnNsYXRlZFZlY3Rvci55ICsgb2Zmc2V0Lnk7XG4gICAgY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgIHRoaXMudHJhbnNsYXRlZFZlY3RvciA9IHRyYW5zbGF0ZWRWZWN0b3I7XG5cbiAgICAvLyBDcmVhdGUgdGhlIGFycm93IGhlYWQgdmVjdG9ycy4gVGhlc2UgYXJlIG5vdCBkZXBlbmRlbnQgdXBvbiB0aGUgdW5pdCB2ZWN0b3JcbiAgICB2YXIgYXYxID0gdGhpcy5hcnJvd2hlYWRWMS5yb3RhdGVOZXcodHJhbnNsYXRlZFZlY3Rvci5hbmdsZSk7XG4gICAgdmFyIGF2MiA9IHRoaXMuYXJyb3doZWFkVjIucm90YXRlTmV3KHRyYW5zbGF0ZWRWZWN0b3IuYW5nbGUpO1xuXG4gICAgLy8gRHJhdyB0aGUgYXJyb3doZWFkXG4gICAgY3R4LmxpbmVUbyhhdjEueCArIHgsIGF2MS55ICsgeSk7XG4gICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICBjdHgubGluZVRvKGF2Mi54ICsgeCwgYXYyLnkgKyB5KTtcblxuICAgIGN0eC5zdHJva2UoKTtcblxuICAgIGxldCBsYWJlbCA9IHRoaXMubGFiZWw7XG4gICAgaWYobGFiZWwpIHtcbiAgICAgIGxldCBsYWJlbFBvaW50ID0gdGhpcy52LmRpdmlkZVNjYWxhck5ldygyKTtcbiAgICAgIGxldCB0ZXh0bG9jID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgICAgIGlmKGlzQ2FydGVzaWFuKSB7XG4gICAgICAgIGxhYmVsUG9pbnQueSAqPSAtMTsgLy8gUmV2ZXJzZSB0aGUgWSBjb29yZCBpZiB0aGlzIGlzIGEgY2FydGVzaWFuIHN5c3RlbVxuICAgICAgfVxuICAgICAgdGV4dGxvYy54ID0gKGxhYmVsUG9pbnQueCAqIHVuaXRYLngpICsgKGxhYmVsUG9pbnQueSAqIHVuaXRZLngpICsgb2Zmc2V0Lng7XG4gICAgICB0ZXh0bG9jLnkgPSAobGFiZWxQb2ludC54ICogdW5pdFgueSkgKyAobGFiZWxQb2ludC55ICogdW5pdFkueSkgKyBvZmZzZXQueTtcblxuICAgICAgY3R4LmZvbnQgPSBcIjEwcHggSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiO1xuICAgICAgbGV0IHRleHRkaW1zID0gY3R4Lm1lYXN1cmVUZXh0KGxhYmVsKTtcbiAgICAgIGxldCBwYWRkaW5nID0gMztcbiAgICAgIHRleHRkaW1zLmhlaWdodCA9IDEwO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuNyknO1xuICAgICAgY3R4LmZpbGxSZWN0KHRleHRsb2MueCAtIHBhZGRpbmcgLSB0ZXh0ZGltcy53aWR0aCAvIDIsIHRleHRsb2MueSAtIHBhZGRpbmcgLSB0ZXh0ZGltcy5oZWlnaHQgLyAyLCB0ZXh0ZGltcy53aWR0aCArIHBhZGRpbmcgKiAyLCB0ZXh0ZGltcy5oZWlnaHQgKyBwYWRkaW5nICogMik7XG4gICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgIGN0eC5maWxsVGV4dChsYWJlbCx0ZXh0bG9jLnggLSB0ZXh0ZGltcy53aWR0aCAvIDIsIHRleHRsb2MueSAtIHRleHRkaW1zLmhlaWdodCAvIDIgKyB0ZXh0ZGltcy5oZWlnaHQgLSB0ZXh0ZGltcy5oZWlnaHQgLyA0KTtcbiAgICB9XG5cbiAgfVxuXG4gIGdldCBwbGF5Z3JvdW5kKCkge1xuICAgIHJldHVybiB0aGlzLl9wZztcbiAgfVxuICBzZXQgcGxheWdyb3VuZChwZykge1xuICAgIHRoaXMuX3BnID0gcGc7XG4gIH1cblxuICBzZXQgY29sb3IoY29sb3IpIHtcbiAgICBpZiggdHlwZW9mIGNvbG9yID09ICdzdHJpbmcnICYmIC9eI1swLTlBQkNERUZhYmNkZWZdKi8udGVzdChjb2xvcikgKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuICAgIH1cbiAgfVxuICBnZXQgY29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yIHx8ICcjRkZGRkZGJztcbiAgfVxuXG4gIHNldCBvZmZzZXQodikge1xuICAgIGlmKCB2IGluc3RhbmNlb2YgVmVjdG9yICkge1xuICAgICAgdGhpcy5fb2Zmc2V0ID0gdjtcbiAgICB9XG4gIH1cbiAgZ2V0IG9mZnNldCgpIHtcbiAgICAvLyBpZiggISh0aGlzLl9vZmZzZXQgaW5zdGFuY2VvZiBWZWN0b3IpICkge1xuICAgIC8vICAgdGhpcy5fb2Zmc2V0ID0gbmV3IFZlY3RvcigwLDApO1xuICAgIC8vIH1cbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0IHx8IGZhbHNlO1xuICB9XG5cbiAgc2V0IGxhYmVsKGxhYmVsKSB7XG4gICAgaWYobGFiZWwpIHtcbiAgICAgIHRoaXMuX2xhYmVsID0gbGFiZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgZ2V0IGxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbCB8fCBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYXdpbmdWZWN0b3I7XG4iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuLi8uLi9zcmMvd3RjLXZlY3RvclwiO1xuaW1wb3J0IERyYXdpbmdWZWN0b3IgZnJvbSBcIi4vRHJhd2luZ1ZlY3RvclwiO1xuaW1wb3J0IGNvbG91cnMgZnJvbSAnLi9jb2xvdXJzJztcblxuY2xhc3MgVmVjdG9yUGxheWdyb3VuZCB7XG4gIHN0YXRpYyBpbml0KGRyYXdpbmcgPSB0cnVlLCBzY2FsZSA9IDEwMCwgZHJhd0dyaWQgPSB0cnVlKSB7XG4gICAgdGhpcy5pbml0aWFsaXNlZCA9IHRydWU7XG5cbiAgICB0aGlzLm1haW5DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLm1haW5DdHggPSB0aGlzLm1haW5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLnNlY29uZGFyeUNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuc2Vjb25kYXJDdHggPSB0aGlzLnNlY29uZGFyeUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1haW5DYW52YXMpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zZWNvbmRhcnlDYW52YXMpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5yZXNpemVMaXN0ZW5lcigpO1xuXG4gICAgdGhpcy52ZWN0b3JzID0gW107XG5cbiAgICB0aGlzLmdyaWREaXN0YW5jZSA9IDE7XG5cbiAgICB0aGlzLmRvRHJhd0dyaWQgPSBkcmF3R3JpZDtcbiAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5kcmF3aW5nID0gZHJhd2luZztcbiAgfVxuXG4gIHN0YXRpYyByZXNpemVMaXN0ZW5lcihlKSB7XG4gICAgdGhpcy5kaW1lbnNpb25zID0gbmV3IFZlY3Rvcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICB0aGlzLm9mZnNldCA9IHRoaXMuZGltZW5zaW9ucy5kaXZpZGVTY2FsYXJOZXcoMik7XG5cbiAgICB0aGlzLm1haW5DYW52YXMud2lkdGggPSB0aGlzLnNlY29uZGFyeUNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMubWFpbkNhbnZhcy5oZWlnaHQgPSB0aGlzLnNlY29uZGFyeUNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIH1cblxuICBzdGF0aWMgYWRkVmVjdG9yKGRyYXdpbmdWZWN0b3IpIHtcbiAgICBpZiggISAoZHJhd2luZ1ZlY3RvciBpbnN0YW5jZW9mIERyYXdpbmdWZWN0b3IpICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudmVjdG9ycy5wdXNoKGRyYXdpbmdWZWN0b3IpO1xuXG4gICAgcmV0dXJuIGRyYXdpbmdWZWN0b3I7XG4gIH1cblxuICBzdGF0aWMgZHJhdygpIHtcbiAgICAvLyBDbGVhciB0aGUgY2FudmFzZXMgYmVmb3JlIGRyYXdpbmdcbiAgICB0aGlzLm1haW5DdHguZmlsbFN0eWxlID0gdGhpcy5iZ0NvbG9yO1xuICAgIHRoaXMubWFpbkN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLm1haW5DdHgucmVjdCgwLDAsIHRoaXMuZGltZW5zaW9ucy53aWR0aCwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XG4gICAgdGhpcy5tYWluQ3R4LmZpbGwoKTtcbiAgICAvLyB0aGlzLnNlY29uZGFyQ3R4LmNsZWFyUmVjdCgwLDAsdGhpcy5tYWluQ2FudmFzLndpZHRoLCB0aGlzLm1haW5DYW52YXMuaGVpZ2h0KTtcblxuICAgIGlmKHRoaXMuZG9EcmF3R3JpZCkgdGhpcy5kcmF3R3JpZCgpO1xuICAgIHRoaXMuZHJhd1ZlY3RvcnMoKTtcblxuICAgIGlmKCB0aGlzLmRyYXdpbmcgKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZHJhdy5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZHJhd1ZlY3RvcnMoKSB7XG4gICAgdGhpcy52ZWN0b3JzLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgdi5kcmF3KHRoaXMpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBzdGF0aWMgZHJhd0dyaWQoKSB7XG4gICAgbGV0IHNjYWxlID0gdGhpcy5zY2FsZTtcbiAgICBsZXQgZ3JpZERpc3RhbmNlID0gdGhpcy5ncmlkRGlzdGFuY2UgKiBzY2FsZTtcblxuICAgIC8vIGRyYXcgdGhlIG1haW4gZ3JpZCBsaW5lc1xuXG4gICAgdGhpcy5tYWluQ3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5tYWluQ3R4LnN0cm9rZVN0eWxlID0gdGhpcy5ncmlkQ29sb3I7XG4gICAgdGhpcy5tYWluQ3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgbGV0IHhQb3MgPSB0aGlzLm9mZnNldC54O1xuICAgIHdoaWxlKHhQb3MgPCB0aGlzLmRpbWVuc2lvbnMud2lkdGgpIHtcbiAgICAgIHhQb3MgKz0gZ3JpZERpc3RhbmNlO1xuICAgICAgdGhpcy5tYWluQ3R4Lm1vdmVUbyh4UG9zLCAwKTtcbiAgICAgIHRoaXMubWFpbkN0eC5saW5lVG8oeFBvcywgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XG4gICAgfVxuICAgIHhQb3MgPSB0aGlzLm9mZnNldC54O1xuICAgIHdoaWxlKHhQb3MgPiAwKSB7XG4gICAgICB4UG9zIC09IGdyaWREaXN0YW5jZTtcbiAgICAgIHRoaXMubWFpbkN0eC5tb3ZlVG8oeFBvcywgMCk7XG4gICAgICB0aGlzLm1haW5DdHgubGluZVRvKHhQb3MsIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgIH1cbiAgICBsZXQgeVBvcyA9IHRoaXMub2Zmc2V0Lnk7XG4gICAgd2hpbGUoeVBvcyA8IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpIHtcbiAgICAgIHlQb3MgKz0gZ3JpZERpc3RhbmNlO1xuICAgICAgdGhpcy5tYWluQ3R4Lm1vdmVUbygwLCB5UG9zKTtcbiAgICAgIHRoaXMubWFpbkN0eC5saW5lVG8odGhpcy5kaW1lbnNpb25zLndpZHRoLCB5UG9zKTtcbiAgICB9XG4gICAgeVBvcyA9IHRoaXMub2Zmc2V0Lnk7XG4gICAgd2hpbGUoeVBvcyA+IDApIHtcbiAgICAgIHlQb3MgLT0gZ3JpZERpc3RhbmNlO1xuICAgICAgdGhpcy5tYWluQ3R4Lm1vdmVUbygwLCB5UG9zKTtcbiAgICAgIHRoaXMubWFpbkN0eC5saW5lVG8odGhpcy5kaW1lbnNpb25zLndpZHRoLCB5UG9zKTtcbiAgICB9XG4gICAgdGhpcy5tYWluQ3R4LnN0cm9rZSgpO1xuXG5cbiAgICB0aGlzLm1haW5DdHguc3Ryb2tlU3R5bGUgPSB0aGlzLm9yaWdpbkNvbG9yO1xuICAgIHRoaXMubWFpbkN0eC5iZWdpblBhdGgoKTtcblxuICAgIHRoaXMubWFpbkN0eC5tb3ZlVG8oMCwgdGhpcy5vZmZzZXQueSk7XG4gICAgdGhpcy5tYWluQ3R4LmxpbmVUbyh0aGlzLmRpbWVuc2lvbnMud2lkdGgsIHRoaXMub2Zmc2V0LnkpO1xuICAgIHRoaXMubWFpbkN0eC5tb3ZlVG8odGhpcy5vZmZzZXQueCwgMCk7XG4gICAgdGhpcy5tYWluQ3R4LmxpbmVUbyh0aGlzLm9mZnNldC54LCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgIHRoaXMubWFpbkN0eC5zdHJva2UoKTtcblxuICB9XG5cbiAgc3RhdGljIHNldCBkcmF3aW5nKGQpIHtcbiAgICB0aGlzLl9kcmF3aW5nID0gZCA9PT0gdHJ1ZTtcblxuICAgIGlmKHRoaXMuX2RyYXdpbmcgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuZHJhdygpO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IGRyYXdpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYXdpbmcgPT09IHRydWU7XG4gIH1cblxuICBzdGF0aWMgc2V0IGJnQ29sb3IoY29sb3IpIHtcbiAgICBpZiggdHlwZW9mIGNvbG9yID09ICdzdHJpbmcnICYmICAvI1swLTlBQkNERUZdezZ9Ly50ZXN0KGNvbG9yLnRvVXBwZXJDYXNlKCkpKSB7XG4gICAgICB0aGlzLl9iZ0NvbG9yID0gY29sb3I7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgYmdDb2xvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYmdDb2xvciB8fCAnIzI4MkMzNCc7XG4gIH1cblxuICBzdGF0aWMgc2V0IG9yaWdpbkNvbG9yKGNvbG9yKSB7XG4gICAgaWYoIHR5cGVvZiBjb2xvciA9PSAnc3RyaW5nJyAmJiAgLyNbMC05QUJDREVGXXs2fS8udGVzdChjb2xvci50b1VwcGVyQ2FzZSgpKSkge1xuICAgICAgdGhpcy5fb3JpZ2luQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBvcmlnaW5Db2xvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luQ29sb3IgfHwgJyNGRkZGRkYnO1xuICB9XG5cbiAgc3RhdGljIHNldCBncmlkQ29sb3IoY29sb3IpIHtcbiAgICBpZiggdHlwZW9mIGNvbG9yID09ICdzdHJpbmcnICYmICAvI1swLTlBQkNERUZdezZ9Ly50ZXN0KGNvbG9yLnRvVXBwZXJDYXNlKCkpKSB7XG4gICAgICB0aGlzLl9ncmlkQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBncmlkQ29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWRDb2xvciB8fCAnIzY2NjY2Nic7XG4gIH1cblxuICBzdGF0aWMgc2V0IHVuaXRWZWN0b3JYKHYpIHtcbiAgICBpZiggdiBpbnN0YW5jZW9mIFZlY3RvciApIHtcbiAgICAgIHRoaXMuX3VuaXRWZWN0b3JYID0gdlxuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IHVuaXRWZWN0b3JYKCkge1xuICAgIHJldHVybiB0aGlzLl91bml0VmVjdG9yWCB8fCBuZXcgVmVjdG9yKDEsIDApO1xuICB9XG4gIHN0YXRpYyBnZXQgc2NhbGVkVW5pdFZlY3RvclgoKSB7XG4gICAgbGV0IHNjYWxlID0gdGhpcy5zY2FsZTtcbiAgICBsZXQgdXYgPSB0aGlzLnVuaXRWZWN0b3JYLmNsb25lKCk7XG4gICAgaWYoc2NhbGUgIT09IDEpIHV2Lm11bHRpcGx5U2NhbGFyKHNjYWxlKTtcbiAgICByZXR1cm4gdXY7XG4gIH1cblxuICBzdGF0aWMgc2V0IHVuaXRWZWN0b3JZKHYpIHtcbiAgICBpZiggdiBpbnN0YW5jZW9mIFZlY3RvciApIHtcbiAgICAgIHRoaXMuX3VuaXRWZWN0b3JZID0gdlxuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IHVuaXRWZWN0b3JZKCkge1xuICAgIHJldHVybiB0aGlzLl91bml0VmVjdG9yWSB8fCBuZXcgVmVjdG9yKDAsIDEpO1xuICB9XG4gIHN0YXRpYyBnZXQgc2NhbGVkVW5pdFZlY3RvclkoKSB7XG4gICAgbGV0IHNjYWxlID0gdGhpcy5zY2FsZTtcbiAgICBsZXQgdXYgPSB0aGlzLnVuaXRWZWN0b3JZLmNsb25lKCk7XG4gICAgaWYoc2NhbGUgIT09IDEpIHV2Lm11bHRpcGx5U2NhbGFyKHNjYWxlKTtcbiAgICByZXR1cm4gdXY7XG4gIH1cblxuICBzdGF0aWMgc2V0IGRpbWVuc2lvbnMoZGltcykge1xuICAgIGlmKGRpbXMgaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBkaW1zO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZ2V0IGRpbWVuc2lvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnMgfHwgbmV3IFZlY3RvcigpO1xuICB9XG5cbiAgc3RhdGljIHNldCBvZmZzZXQoZGltcykge1xuICAgIGlmKGRpbXMgaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgIHRoaXMuX29mZnNldCA9IGRpbXM7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBnZXQgb2Zmc2V0KCkge1xuICAgIGxldCBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgbmV3IFZlY3RvcigpO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBzdGF0aWMgc2V0IHNjYWxlKHNjYWxlKSB7XG4gICAgaWYodHlwZW9mIHNjYWxlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGdldCBzY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGUgfHwgMTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgZG9EcmF3R3JpZChkcmF3R3JpZCkge1xuICAgIHRoaXMuX2RyYXdHcmlkID0gZHJhd0dyaWQgPT09IHRydWU7XG4gIH1cbiAgc3RhdGljIGdldCBkb0RyYXdHcmlkKCkge1xuICAgIHJldHVybiB0aGlzLl9kcmF3R3JpZCB8fCBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgY2FydGVzaWFuKGlzQ2FydGVzaWFuKSB7XG4gICAgdGhpcy5pc0NhcnRlc2lhbiA9IGlzQ2FydGVzaWFuID09PSB0cnVlO1xuICB9XG4gIHN0YXRpYyBnZXQgY2FydGVzaWFuKCkge1xuICAgIHJldHVybiB0aGlzLmlzQ2FydGVzaWFuIHx8IGZhbHNlO1xuICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBWZWN0b3JQbGF5Z3JvdW5kO1xuIiwiXG4gIGxldCB1cGRhdGVDYWxjdWxhdGlvbiA9IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG5cbiAgICBsZXQgZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmFsdWVdJyk7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgZWxzLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgbGV0IGFkZHJlc3MgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKS5zcGxpdCgnLicpO1xuICAgICAgICBsZXQgdmFsdWUgPSBzZXR0aW5ncztcbiAgICAgICAgYWRkcmVzcy5mb3JFYWNoKGZ1bmN0aW9uKGFkZHJlc3Mpe1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZih2YWx1ZVthZGRyZXNzXSAhPT0gJ3VuZGVmaW5lZCcpIHZhbHVlID0gdmFsdWVbYWRkcmVzc107XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUgKiAxMDApIC8gMTAwO1xuICAgICAgICBlbC5pbm5lclRleHQgPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuXG4gICAgfVxuICAgIGFuaW1hdGUoKTtcblxuICB9XG5cbiAgZXhwb3J0IGRlZmF1bHQgdXBkYXRlQ2FsY3VsYXRpb247XG4iLCJcbmxldCBjb2xvdXJzID0gWycjYzY3OGRkJywgJyM5OGMzNzknLCAnI2MzNDQ0OCcsICcjNGU5YzllJywgJyNkMTg1NDknLCAnI2FiYjJiZiddO1xubGV0IG5hbWVkQ29sb3VycyA9IHtcbiAgc2lsdmVyOiAnI0NDQ0NDQydcbn07XG5leHBvcnQgeyBjb2xvdXJzLCBuYW1lZENvbG91cnMgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3ZlbmRvci9kYXQuZ3VpJylcbm1vZHVsZS5leHBvcnRzLmNvbG9yID0gcmVxdWlyZSgnLi92ZW5kb3IvZGF0LmNvbG9yJykiLCIvKipcbiAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXG4gKlxuICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKi9cblxuLyoqIEBuYW1lc3BhY2UgKi9cbnZhciBkYXQgPSBtb2R1bGUuZXhwb3J0cyA9IGRhdCB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb2xvciA9IGRhdC5jb2xvciB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC51dGlscyA9IGRhdC51dGlscyB8fCB7fTtcblxuZGF0LnV0aWxzLmNvbW1vbiA9IChmdW5jdGlvbiAoKSB7XG4gIFxuICB2YXIgQVJSX0VBQ0ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbiAgdmFyIEFSUl9TTElDRSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogQmFuZC1haWQgbWV0aG9kcyBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGEgbG90IGVhc2llciBpbiBKYXZhU2NyaXB0LlxuICAgKiBJbXBsZW1lbnRhdGlvbiBhbmQgc3RydWN0dXJlIGluc3BpcmVkIGJ5IHVuZGVyc2NvcmUuanNcbiAgICogaHR0cDovL2RvY3VtZW50Y2xvdWQuZ2l0aHViLmNvbS91bmRlcnNjb3JlL1xuICAgKi9cblxuICByZXR1cm4geyBcbiAgICBcbiAgICBCUkVBSzoge30sXG4gIFxuICAgIGV4dGVuZDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKCF0aGlzLmlzVW5kZWZpbmVkKG9ialtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZhdWx0czogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKHRoaXMuaXNVbmRlZmluZWQodGFyZ2V0W2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgXG4gICAgfSxcbiAgICBcbiAgICBjb21wb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b0NhbGwgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0b0NhbGwubGVuZ3RoIC0xOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbdG9DYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICAgICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRyLCBzY29wZSkge1xuXG4gICAgICBcbiAgICAgIGlmIChBUlJfRUFDSCAmJiBvYmouZm9yRWFjaCA9PT0gQVJSX0VBQ0gpIHsgXG4gICAgICAgIFxuICAgICAgICBvYmouZm9yRWFjaChpdHIsIHNjb3BlKTtcbiAgICAgICAgXG4gICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09IG9iai5sZW5ndGggKyAwKSB7IC8vIElzIG51bWJlciBidXQgbm90IE5hTlxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5ID0gMCwgbCA9IG9iai5sZW5ndGg7IGtleSA8IGw7IGtleSsrKVxuICAgICAgICAgIGlmIChrZXkgaW4gb2JqICYmIGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSykgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikgXG4gICAgICAgICAgaWYgKGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfVxuICAgICAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZlcjogZnVuY3Rpb24oZm5jKSB7XG4gICAgICBzZXRUaW1lb3V0KGZuYywgMCk7XG4gICAgfSxcbiAgICBcbiAgICB0b0FycmF5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmoudG9BcnJheSkgcmV0dXJuIG9iai50b0FycmF5KCk7XG4gICAgICByZXR1cm4gQVJSX1NMSUNFLmNhbGwob2JqKTtcbiAgICB9LFxuXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdWxsOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gICAgfSxcbiAgICBcbiAgICBpc05hTjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICE9PSBvYmo7XG4gICAgfSxcbiAgICBcbiAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG4gICAgfSxcbiAgICBcbiAgICBpc09iamVjdDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaiswO1xuICAgIH0sXG4gICAgXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKycnO1xuICAgIH0sXG4gICAgXG4gICAgaXNCb29sZWFuOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IGZhbHNlIHx8IG9iaiA9PT0gdHJ1ZTtcbiAgICB9LFxuICAgIFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cbiAgXG4gIH07XG4gICAgXG59KSgpO1xuXG5cbmRhdC5jb2xvci50b1N0cmluZyA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9yKSB7XG5cbiAgICBpZiAoY29sb3IuYSA9PSAxIHx8IGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5hKSkge1xuXG4gICAgICB2YXIgcyA9IGNvbG9yLmhleC50b1N0cmluZygxNik7XG4gICAgICB3aGlsZSAocy5sZW5ndGggPCA2KSB7XG4gICAgICAgIHMgPSAnMCcgKyBzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyMnICsgcztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiAncmdiYSgnICsgTWF0aC5yb3VuZChjb2xvci5yKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuZykgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmIpICsgJywnICsgY29sb3IuYSArICcpJztcblxuICAgIH1cblxuICB9XG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5Db2xvciA9IGRhdC5jb2xvci5Db2xvciA9IChmdW5jdGlvbiAoaW50ZXJwcmV0LCBtYXRoLCB0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLl9fc3RhdGUgPSBpbnRlcnByZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGludGVycHJldCBjb2xvciBhcmd1bWVudHMnO1xuICAgIH1cblxuICAgIHRoaXMuX19zdGF0ZS5hID0gdGhpcy5fX3N0YXRlLmEgfHwgMTtcblxuXG4gIH07XG5cbiAgQ29sb3IuQ09NUE9ORU5UUyA9IFsncicsJ2cnLCdiJywnaCcsJ3MnLCd2JywnaGV4JywnYSddO1xuXG4gIGNvbW1vbi5leHRlbmQoQ29sb3IucHJvdG90eXBlLCB7XG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcodGhpcyk7XG4gICAgfSxcblxuICAgIHRvT3JpZ2luYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5jb252ZXJzaW9uLndyaXRlKHRoaXMpO1xuICAgIH1cblxuICB9KTtcblxuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncicsIDIpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnZycsIDEpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnYicsIDApO1xuXG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdoJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdzJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICd2Jyk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2EnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5hO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHRoaXMuX19zdGF0ZS5hID0gdjtcbiAgICB9XG5cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2hleCcsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmICghdGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSEVYJykge1xuICAgICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gbWF0aC5yZ2JfdG9faGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmhleDtcblxuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gdjtcblxuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBkZWZpbmVSR0JDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnUkdCJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ1JHQicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnUkdCJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUhTVkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hTVicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSFNWJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlUkdCKGNvbG9yLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hFWCcpIHtcblxuICAgICAgY29sb3IuX19zdGF0ZVtjb21wb25lbnRdID0gbWF0aC5jb21wb25lbnRfZnJvbV9oZXgoY29sb3IuX19zdGF0ZS5oZXgsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgIH0gZWxzZSBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcblxuICAgICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLCBtYXRoLmhzdl90b19yZ2IoY29sb3IuX19zdGF0ZS5oLCBjb2xvci5fX3N0YXRlLnMsIGNvbG9yLl9fc3RhdGUudikpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgJ0NvcnJ1cHRlZCBjb2xvciBzdGF0ZSc7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlSFNWKGNvbG9yKSB7XG5cbiAgICB2YXIgcmVzdWx0ID0gbWF0aC5yZ2JfdG9faHN2KGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuXG4gICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgczogcmVzdWx0LnMsXG4gICAgICAgICAgdjogcmVzdWx0LnZcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc05hTihyZXN1bHQuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IHJlc3VsdC5oO1xuICAgIH0gZWxzZSBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLl9fc3RhdGUuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IDA7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gQ29sb3I7XG5cbn0pKGRhdC5jb2xvci5pbnRlcnByZXQgPSAoZnVuY3Rpb24gKHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgcmVzdWx0LCB0b1JldHVybjtcblxuICB2YXIgaW50ZXJwcmV0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b1JldHVybiA9IGZhbHNlO1xuXG4gICAgdmFyIG9yaWdpbmFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBjb21tb24udG9BcnJheShhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdO1xuXG4gICAgY29tbW9uLmVhY2goSU5URVJQUkVUQVRJT05TLCBmdW5jdGlvbihmYW1pbHkpIHtcblxuICAgICAgaWYgKGZhbWlseS5saXRtdXMob3JpZ2luYWwpKSB7XG5cbiAgICAgICAgY29tbW9uLmVhY2goZmFtaWx5LmNvbnZlcnNpb25zLCBmdW5jdGlvbihjb252ZXJzaW9uLCBjb252ZXJzaW9uTmFtZSkge1xuXG4gICAgICAgICAgcmVzdWx0ID0gY29udmVyc2lvbi5yZWFkKG9yaWdpbmFsKTtcblxuICAgICAgICAgIGlmICh0b1JldHVybiA9PT0gZmFsc2UgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9SZXR1cm4gPSByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbk5hbWUgPSBjb252ZXJzaW9uTmFtZTtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uID0gY29udmVyc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfTtcblxuICB2YXIgSU5URVJQUkVUQVRJT05TID0gW1xuXG4gICAgLy8gU3RyaW5nc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNTdHJpbmcsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgVEhSRUVfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldKShbQS1GMC05XSkoW0EtRjAtOV0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICcweCcgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMV0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzNdLnRvU3RyaW5nKCkgKyB0ZXN0WzNdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgU0lYX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XXs2fSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KCcweCcgKyB0ZXN0WzFdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQjoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYlxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCQToge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYmFcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pLFxuICAgICAgICAgICAgICBhOiBwYXJzZUZsb2F0KHRlc3RbNF0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE51bWJlcnNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzTnVtYmVyLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIEhFWDoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogb3JpZ2luYWwsXG4gICAgICAgICAgICAgIGNvbnZlcnNpb25OYW1lOiAnSEVYJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvci5oZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBBcnJheXNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzQXJyYXksXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gMykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCQV9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXSxcbiAgICAgICAgICAgICAgYTogb3JpZ2luYWxbM11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gT2JqZWN0c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNPYmplY3QsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iLFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52LFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnYsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG5cbiAgXTtcblxuICByZXR1cm4gaW50ZXJwcmV0O1xuXG5cbn0pKGRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbG9yLm1hdGggPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0bXBDb21wb25lbnQ7XG5cbiAgcmV0dXJuIHtcblxuICAgIGhzdl90b19yZ2I6IGZ1bmN0aW9uKGgsIHMsIHYpIHtcblxuICAgICAgdmFyIGhpID0gTWF0aC5mbG9vcihoIC8gNjApICUgNjtcblxuICAgICAgdmFyIGYgPSBoIC8gNjAgLSBNYXRoLmZsb29yKGggLyA2MCk7XG4gICAgICB2YXIgcCA9IHYgKiAoMS4wIC0gcyk7XG4gICAgICB2YXIgcSA9IHYgKiAoMS4wIC0gKGYgKiBzKSk7XG4gICAgICB2YXIgdCA9IHYgKiAoMS4wIC0gKCgxLjAgLSBmKSAqIHMpKTtcbiAgICAgIHZhciBjID0gW1xuICAgICAgICBbdiwgdCwgcF0sXG4gICAgICAgIFtxLCB2LCBwXSxcbiAgICAgICAgW3AsIHYsIHRdLFxuICAgICAgICBbcCwgcSwgdl0sXG4gICAgICAgIFt0LCBwLCB2XSxcbiAgICAgICAgW3YsIHAsIHFdXG4gICAgICBdW2hpXTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogY1swXSAqIDI1NSxcbiAgICAgICAgZzogY1sxXSAqIDI1NSxcbiAgICAgICAgYjogY1syXSAqIDI1NVxuICAgICAgfTtcblxuICAgIH0sXG5cbiAgICByZ2JfdG9faHN2OiBmdW5jdGlvbihyLCBnLCBiKSB7XG5cbiAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgICBkZWx0YSA9IG1heCAtIG1pbixcbiAgICAgICAgICBoLCBzO1xuXG4gICAgICBpZiAobWF4ICE9IDApIHtcbiAgICAgICAgcyA9IGRlbHRhIC8gbWF4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoOiBOYU4sXG4gICAgICAgICAgczogMCxcbiAgICAgICAgICB2OiAwXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChyID09IG1heCkge1xuICAgICAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIGlmIChnID09IG1heCkge1xuICAgICAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuICAgICAgfVxuICAgICAgaCAvPSA2O1xuICAgICAgaWYgKGggPCAwKSB7XG4gICAgICAgIGggKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaDogaCAqIDM2MCxcbiAgICAgICAgczogcyxcbiAgICAgICAgdjogbWF4IC8gMjU1XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICByZ2JfdG9faGV4OiBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgICB2YXIgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoMCwgMiwgcik7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDEsIGcpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAwLCBiKTtcbiAgICAgIHJldHVybiBoZXg7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudF9mcm9tX2hleDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCkge1xuICAgICAgcmV0dXJuIChoZXggPj4gKGNvbXBvbmVudEluZGV4ICogOCkpICYgMHhGRjtcbiAgICB9LFxuXG4gICAgaGV4X3dpdGhfY29tcG9uZW50OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIDw8ICh0bXBDb21wb25lbnQgPSBjb21wb25lbnRJbmRleCAqIDgpIHwgKGhleCAmIH4gKDB4RkYgPDwgdG1wQ29tcG9uZW50KSk7XG4gICAgfVxuXG4gIH1cblxufSkoKSxcbmRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pOyIsIi8qKlxuICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxuICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqL1xuXG4vKiogQG5hbWVzcGFjZSAqL1xudmFyIGRhdCA9IG1vZHVsZS5leHBvcnRzID0gZGF0IHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0Lmd1aSA9IGRhdC5ndWkgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQudXRpbHMgPSBkYXQudXRpbHMgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuY29udHJvbGxlcnMgPSBkYXQuY29udHJvbGxlcnMgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuZG9tID0gZGF0LmRvbSB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb2xvciA9IGRhdC5jb2xvciB8fCB7fTtcblxuZGF0LnV0aWxzLmNzcyA9IChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgbG9hZDogZnVuY3Rpb24gKHVybCwgZG9jKSB7XG4gICAgICBkb2MgPSBkb2MgfHwgZG9jdW1lbnQ7XG4gICAgICB2YXIgbGluayA9IGRvYy5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9LFxuICAgIGluamVjdDogZnVuY3Rpb24oY3NzLCBkb2MpIHtcbiAgICAgIGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcbiAgICAgIHZhciBpbmplY3RlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBpbmplY3RlZC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGluamVjdGVkLmlubmVySFRNTCA9IGNzcztcbiAgICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGluamVjdGVkKTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cblxuZGF0LnV0aWxzLmNvbW1vbiA9IChmdW5jdGlvbiAoKSB7XG4gIFxuICB2YXIgQVJSX0VBQ0ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbiAgdmFyIEFSUl9TTElDRSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogQmFuZC1haWQgbWV0aG9kcyBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGEgbG90IGVhc2llciBpbiBKYXZhU2NyaXB0LlxuICAgKiBJbXBsZW1lbnRhdGlvbiBhbmQgc3RydWN0dXJlIGluc3BpcmVkIGJ5IHVuZGVyc2NvcmUuanNcbiAgICogaHR0cDovL2RvY3VtZW50Y2xvdWQuZ2l0aHViLmNvbS91bmRlcnNjb3JlL1xuICAgKi9cblxuICByZXR1cm4geyBcbiAgICBcbiAgICBCUkVBSzoge30sXG4gIFxuICAgIGV4dGVuZDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKCF0aGlzLmlzVW5kZWZpbmVkKG9ialtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZhdWx0czogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKHRoaXMuaXNVbmRlZmluZWQodGFyZ2V0W2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgXG4gICAgfSxcbiAgICBcbiAgICBjb21wb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b0NhbGwgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0b0NhbGwubGVuZ3RoIC0xOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbdG9DYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICAgICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRyLCBzY29wZSkge1xuXG4gICAgICBcbiAgICAgIGlmIChBUlJfRUFDSCAmJiBvYmouZm9yRWFjaCA9PT0gQVJSX0VBQ0gpIHsgXG4gICAgICAgIFxuICAgICAgICBvYmouZm9yRWFjaChpdHIsIHNjb3BlKTtcbiAgICAgICAgXG4gICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09IG9iai5sZW5ndGggKyAwKSB7IC8vIElzIG51bWJlciBidXQgbm90IE5hTlxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5ID0gMCwgbCA9IG9iai5sZW5ndGg7IGtleSA8IGw7IGtleSsrKVxuICAgICAgICAgIGlmIChrZXkgaW4gb2JqICYmIGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSykgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikgXG4gICAgICAgICAgaWYgKGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfVxuICAgICAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZlcjogZnVuY3Rpb24oZm5jKSB7XG4gICAgICBzZXRUaW1lb3V0KGZuYywgMCk7XG4gICAgfSxcbiAgICBcbiAgICB0b0FycmF5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmoudG9BcnJheSkgcmV0dXJuIG9iai50b0FycmF5KCk7XG4gICAgICByZXR1cm4gQVJSX1NMSUNFLmNhbGwob2JqKTtcbiAgICB9LFxuXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdWxsOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gICAgfSxcbiAgICBcbiAgICBpc05hTjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICE9PSBvYmo7XG4gICAgfSxcbiAgICBcbiAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG4gICAgfSxcbiAgICBcbiAgICBpc09iamVjdDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaiswO1xuICAgIH0sXG4gICAgXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKycnO1xuICAgIH0sXG4gICAgXG4gICAgaXNCb29sZWFuOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IGZhbHNlIHx8IG9iaiA9PT0gdHJ1ZTtcbiAgICB9LFxuICAgIFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cbiAgXG4gIH07XG4gICAgXG59KSgpO1xuXG5cbmRhdC5jb250cm9sbGVycy5Db250cm9sbGVyID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIEFuIFwiYWJzdHJhY3RcIiBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgIC8qKlxuICAgICAqIFRob3NlIHdobyBleHRlbmQgdGhpcyBjbGFzcyB3aWxsIHB1dCB0aGVpciBET00gZWxlbWVudHMgaW4gaGVyZS5cbiAgICAgKiBAdHlwZSB7RE9NRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBvYmplY3QgdG8gbWFuaXB1bGF0ZVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gbWFuaXB1bGF0ZVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBjaGFuZ2UuXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fb25DaGFuZ2UgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGZpbmlzaGluZyBjaGFuZ2UuXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UgPSB1bmRlZmluZWQ7XG5cbiAgfTtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlci5wcm90b3R5cGUgKi9cbiAgICAgIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSB0aGF0IGEgZnVuY3Rpb24gZmlyZSBldmVyeSB0aW1lIHNvbWVvbmUgY2hhbmdlcyB0aGUgdmFsdWUgd2l0aFxuICAgICAgICAgKiB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuYyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSB2YWx1ZVxuICAgICAgICAgKiBpcyBtb2RpZmllZCB2aWEgdGhpcyBDb250cm9sbGVyLlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgICAgICB0aGlzLl9fb25DaGFuZ2UgPSBmbmM7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgdGhhdCBhIGZ1bmN0aW9uIGZpcmUgZXZlcnkgdGltZSBzb21lb25lIFwiZmluaXNoZXNcIiBjaGFuZ2luZ1xuICAgICAgICAgKiB0aGUgdmFsdWUgd2loIHRoaXMgQ29udHJvbGxlci4gVXNlZnVsIGZvciB2YWx1ZXMgdGhhdCBjaGFuZ2VcbiAgICAgICAgICogaW5jcmVtZW50YWxseSBsaWtlIG51bWJlcnMgb3Igc3RyaW5ncy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5jIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXJcbiAgICAgICAgICogc29tZW9uZSBcImZpbmlzaGVzXCIgY2hhbmdpbmcgdGhlIHZhbHVlIHZpYSB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgb25GaW5pc2hDaGFuZ2U6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IGZuYztcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hhbmdlIHRoZSB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbmV3VmFsdWUgVGhlIG5ldyB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5vYmplY3RbdGhpcy5wcm9wZXJ0eV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgY3VycmVudCB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVmcmVzaGVzIHRoZSB2aXN1YWwgZGlzcGxheSBvZiBhIENvbnRyb2xsZXIgaW4gb3JkZXIgdG8ga2VlcCBzeW5jXG4gICAgICAgICAqIHdpdGggdGhlIG9iamVjdCdzIGN1cnJlbnQgdmFsdWUuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZSB2YWx1ZSBoYXMgZGV2aWF0ZWQgZnJvbSBpbml0aWFsVmFsdWVcbiAgICAgICAgICovXG4gICAgICAgIGlzTW9kaWZpZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmluaXRpYWxWYWx1ZSAhPT0gdGhpcy5nZXRWYWx1ZSgpXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG5cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmRvbS5kb20gPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIHZhciBFVkVOVF9NQVAgPSB7XG4gICAgJ0hUTUxFdmVudHMnOiBbJ2NoYW5nZSddLFxuICAgICdNb3VzZUV2ZW50cyc6IFsnY2xpY2snLCdtb3VzZW1vdmUnLCdtb3VzZWRvd24nLCdtb3VzZXVwJywgJ21vdXNlb3ZlciddLFxuICAgICdLZXlib2FyZEV2ZW50cyc6IFsna2V5ZG93biddXG4gIH07XG5cbiAgdmFyIEVWRU5UX01BUF9JTlYgPSB7fTtcbiAgY29tbW9uLmVhY2goRVZFTlRfTUFQLCBmdW5jdGlvbih2LCBrKSB7XG4gICAgY29tbW9uLmVhY2godiwgZnVuY3Rpb24oZSkge1xuICAgICAgRVZFTlRfTUFQX0lOVltlXSA9IGs7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHZhciBDU1NfVkFMVUVfUElYRUxTID0gLyhcXGQrKFxcLlxcZCspPylweC87XG5cbiAgZnVuY3Rpb24gY3NzVmFsdWVUb1BpeGVscyh2YWwpIHtcblxuICAgIGlmICh2YWwgPT09ICcwJyB8fCBjb21tb24uaXNVbmRlZmluZWQodmFsKSkgcmV0dXJuIDA7XG5cbiAgICB2YXIgbWF0Y2ggPSB2YWwubWF0Y2goQ1NTX1ZBTFVFX1BJWEVMUyk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc051bGwobWF0Y2gpKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETyAuLi5lbXM/ICU/XG5cbiAgICByZXR1cm4gMDtcblxuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lc3BhY2VcbiAgICogQG1lbWJlciBkYXQuZG9tXG4gICAqL1xuICB2YXIgZG9tID0ge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gc2VsZWN0YWJsZVxuICAgICAqL1xuICAgIG1ha2VTZWxlY3RhYmxlOiBmdW5jdGlvbihlbGVtLCBzZWxlY3RhYmxlKSB7XG5cbiAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQgfHwgZWxlbS5zdHlsZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgIGVsZW0ub25zZWxlY3RzdGFydCA9IHNlbGVjdGFibGUgPyBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSA6IGZ1bmN0aW9uKCkge1xuICAgICAgfTtcblxuICAgICAgZWxlbS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcbiAgICAgIGVsZW0uc3R5bGUuS2h0bWxVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcbiAgICAgIGVsZW0udW5zZWxlY3RhYmxlID0gc2VsZWN0YWJsZSA/ICdvbicgOiAnb2ZmJztcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGhvcml6b250YWxcbiAgICAgKiBAcGFyYW0gdmVydGljYWxcbiAgICAgKi9cbiAgICBtYWtlRnVsbHNjcmVlbjogZnVuY3Rpb24oZWxlbSwgaG9yaXpvbnRhbCwgdmVydGljYWwpIHtcblxuICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChob3Jpem9udGFsKSkgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHZlcnRpY2FsKSkgdmVydGljYWwgPSB0cnVlO1xuXG4gICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgICAgZWxlbS5zdHlsZS5yaWdodCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAodmVydGljYWwpIHtcbiAgICAgICAgZWxlbS5zdHlsZS50b3AgPSAwO1xuICAgICAgICBlbGVtLnN0eWxlLmJvdHRvbSA9IDA7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBldmVudFR5cGVcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICovXG4gICAgZmFrZUV2ZW50OiBmdW5jdGlvbihlbGVtLCBldmVudFR5cGUsIHBhcmFtcywgYXV4KSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgICB2YXIgY2xhc3NOYW1lID0gRVZFTlRfTUFQX0lOVltldmVudFR5cGVdO1xuICAgICAgaWYgKCFjbGFzc05hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCB0eXBlICcgKyBldmVudFR5cGUgKyAnIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgICB9XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoY2xhc3NOYW1lKTtcbiAgICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGNhc2UgJ01vdXNlRXZlbnRzJzpcbiAgICAgICAgICB2YXIgY2xpZW50WCA9IHBhcmFtcy54IHx8IHBhcmFtcy5jbGllbnRYIHx8IDA7XG4gICAgICAgICAgdmFyIGNsaWVudFkgPSBwYXJhbXMueSB8fCBwYXJhbXMuY2xpZW50WSB8fCAwO1xuICAgICAgICAgIGV2dC5pbml0TW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLFxuICAgICAgICAgICAgICBwYXJhbXMuY2FuY2VsYWJsZSB8fCB0cnVlLCB3aW5kb3csIHBhcmFtcy5jbGlja0NvdW50IHx8IDEsXG4gICAgICAgICAgICAgIDAsIC8vc2NyZWVuIFhcbiAgICAgICAgICAgICAgMCwgLy9zY3JlZW4gWVxuICAgICAgICAgICAgICBjbGllbnRYLCAvL2NsaWVudCBYXG4gICAgICAgICAgICAgIGNsaWVudFksIC8vY2xpZW50IFlcbiAgICAgICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdLZXlib2FyZEV2ZW50cyc6XG4gICAgICAgICAgdmFyIGluaXQgPSBldnQuaW5pdEtleWJvYXJkRXZlbnQgfHwgZXZ0LmluaXRLZXlFdmVudDsgLy8gd2Via2l0IHx8IG1velxuICAgICAgICAgIGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICBjdHJsS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGFsdEtleTogZmFsc2UsXG4gICAgICAgICAgICBzaGlmdEtleTogZmFsc2UsXG4gICAgICAgICAgICBtZXRhS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGtleUNvZGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNoYXJDb2RlOiB1bmRlZmluZWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpbml0KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlLCB3aW5kb3csXG4gICAgICAgICAgICAgIHBhcmFtcy5jdHJsS2V5LCBwYXJhbXMuYWx0S2V5LFxuICAgICAgICAgICAgICBwYXJhbXMuc2hpZnRLZXksIHBhcmFtcy5tZXRhS2V5LFxuICAgICAgICAgICAgICBwYXJhbXMua2V5Q29kZSwgcGFyYW1zLmNoYXJDb2RlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29tbW9uLmRlZmF1bHRzKGV2dCwgYXV4KTtcbiAgICAgIGVsZW0uZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKiBAcGFyYW0gYm9vbFxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50LCBmdW5jLCBib29sKSB7XG4gICAgICBib29sID0gYm9vbCB8fCBmYWxzZTtcbiAgICAgIGlmIChlbGVtLmFkZEV2ZW50TGlzdGVuZXIpXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYywgYm9vbCk7XG4gICAgICBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50KVxuICAgICAgICBlbGVtLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgZnVuYyk7XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKiBAcGFyYW0gYm9vbFxuICAgICAqL1xuICAgIHVuYmluZDogZnVuY3Rpb24oZWxlbSwgZXZlbnQsIGZ1bmMsIGJvb2wpIHtcbiAgICAgIGJvb2wgPSBib29sIHx8IGZhbHNlO1xuICAgICAgaWYgKGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcbiAgICAgIGVsc2UgaWYgKGVsZW0uZGV0YWNoRXZlbnQpXG4gICAgICAgIGVsZW0uZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICovXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICB9IGVsc2UgaWYgKGVsZW0uY2xhc3NOYW1lICE9PSBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcbiAgICAgICAgaWYgKGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpID09IC0xKSB7XG4gICAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKS5yZXBsYWNlKC9eXFxzKy8sICcnKS5yZXBsYWNlKC9cXHMrJC8sICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKi9cbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgPT09IGNsYXNzTmFtZSkge1xuICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBjbGFzc2VzID0gZWxlbS5jbGFzc05hbWUuc3BsaXQoLyArLyk7XG4gICAgICAgICAgdmFyIGluZGV4ID0gY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKD86XnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoPzpcXFxccyt8JCknKS50ZXN0KGVsZW0uY2xhc3NOYW1lKSB8fCBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGdldFdpZHRoOiBmdW5jdGlvbihlbGVtKSB7XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG5cbiAgICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItbGVmdC13aWR0aCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLXJpZ2h0LXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWxlZnQnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctcmlnaHQnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3dpZHRoJ10pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0SGVpZ2h0OiBmdW5jdGlvbihlbGVtKSB7XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG5cbiAgICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItdG9wLXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItYm90dG9tLXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLXRvcCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1ib3R0b20nXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2hlaWdodCddKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGdldE9mZnNldDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgdmFyIG9mZnNldCA9IHtsZWZ0OiAwLCB0b3A6MH07XG4gICAgICBpZiAoZWxlbS5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG9mZnNldC5sZWZ0ICs9IGVsZW0ub2Zmc2V0TGVmdDtcbiAgICAgICAgICBvZmZzZXQudG9wICs9IGVsZW0ub2Zmc2V0VG9wO1xuICAgICAgICB9IHdoaWxlIChlbGVtID0gZWxlbS5vZmZzZXRQYXJlbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICB9LFxuXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3Bvc3RzLzI2ODQ1NjEvcmV2aXNpb25zXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBpc0FjdGl2ZTogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKCBlbGVtLnR5cGUgfHwgZWxlbS5ocmVmICk7XG4gICAgfVxuXG4gIH07XG5cbiAgcmV0dXJuIGRvbTtcblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk9wdGlvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIHNlbGVjdCBpbnB1dCB0byBhbHRlciB0aGUgcHJvcGVydHkgb2YgYW4gb2JqZWN0LCB1c2luZyBhXG4gICAqIGxpc3Qgb2YgYWNjZXB0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdHxzdHJpbmdbXX0gb3B0aW9ucyBBIG1hcCBvZiBsYWJlbHMgdG8gYWNjZXB0YWJsZSB2YWx1ZXMsIG9yXG4gICAqIGEgbGlzdCBvZiBhY2NlcHRhYmxlIHN0cmluZyB2YWx1ZXMuXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgT3B0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIG9wdGlvbnMpIHtcblxuICAgIE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIFRoZSBkcm9wIGRvd24gbWVudVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG5cbiAgICBpZiAoY29tbW9uLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIHZhciBtYXAgPSB7fTtcbiAgICAgIGNvbW1vbi5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgbWFwW2VsZW1lbnRdID0gZWxlbWVudDtcbiAgICAgIH0pO1xuICAgICAgb3B0aW9ucyA9IG1hcDtcbiAgICB9XG5cbiAgICBjb21tb24uZWFjaChvcHRpb25zLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG5cbiAgICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBrZXk7XG4gICAgICBvcHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIF90aGlzLl9fc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICB9KTtcblxuICAgIC8vIEFja25vd2xlZGdlIG9yaWdpbmFsIHZhbHVlXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2VsZWN0LCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVzaXJlZFZhbHVlID0gdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShkZXNpcmVkVmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19zZWxlY3QpO1xuXG4gIH07XG5cbiAgT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBPcHRpb25Db250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB2YXIgdG9SZXR1cm4gPSBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuX19zZWxlY3QudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBPcHRpb25Db250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0aGF0IGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5taW5dIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5tYXhdIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5zdGVwXSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgTnVtYmVyQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgTnVtYmVyQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG5cbiAgICB0aGlzLl9fbWluID0gcGFyYW1zLm1pbjtcbiAgICB0aGlzLl9fbWF4ID0gcGFyYW1zLm1heDtcbiAgICB0aGlzLl9fc3RlcCA9IHBhcmFtcy5zdGVwO1xuXG4gICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZCh0aGlzLl9fc3RlcCkpIHtcblxuICAgICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlID09IDApIHtcbiAgICAgICAgdGhpcy5fX2ltcGxpZWRTdGVwID0gMTsgLy8gV2hhdCBhcmUgd2UsIHBzeWNoaWNzP1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSGV5IERvdWcsIGNoZWNrIHRoaXMgb3V0LlxuICAgICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyh0aGlzLmluaXRpYWxWYWx1ZSkvTWF0aC5MTjEwKSkvMTA7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSB0aGlzLl9fc3RlcDtcblxuICAgIH1cblxuICAgIHRoaXMuX19wcmVjaXNpb24gPSBudW1EZWNpbWFscyh0aGlzLl9faW1wbGllZFN0ZXApO1xuXG5cbiAgfTtcblxuICBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIC8qKiBAbGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlICovXG4gICAgICB7XG5cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICAgIGlmICh0aGlzLl9fbWluICE9PSB1bmRlZmluZWQgJiYgdiA8IHRoaXMuX19taW4pIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLl9fbWluO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fX21heCAhPT0gdW5kZWZpbmVkICYmIHYgPiB0aGlzLl9fbWF4KSB7XG4gICAgICAgICAgICB2ID0gdGhpcy5fX21heDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fX3N0ZXAgIT09IHVuZGVmaW5lZCAmJiB2ICUgdGhpcy5fX3N0ZXAgIT0gMCkge1xuICAgICAgICAgICAgdiA9IE1hdGgucm91bmQodiAvIHRoaXMuX19zdGVwKSAqIHRoaXMuX19zdGVwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSBhIG1pbmltdW0gdmFsdWUgZm9yIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbWluVmFsdWUgVGhlIG1pbmltdW0gdmFsdWUgZm9yXG4gICAgICAgICAqIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgbWluOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX21pbiA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgYSBtYXhpbXVtIHZhbHVlIGZvciA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFZhbHVlIFRoZSBtYXhpbXVtIHZhbHVlIGZvclxuICAgICAgICAgKiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG1heDogZnVuY3Rpb24odikge1xuICAgICAgICAgIHRoaXMuX19tYXggPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IGEgc3RlcCB2YWx1ZSB0aGF0IGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAgICAgICAqIGluY3JlbWVudHMgYnkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwVmFsdWUgVGhlIHN0ZXAgdmFsdWUgZm9yXG4gICAgICAgICAqIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAgICAgICAqIEBkZWZhdWx0IGlmIG1pbmltdW0gYW5kIG1heGltdW0gc3BlY2lmaWVkIGluY3JlbWVudCBpcyAxJSBvZiB0aGVcbiAgICAgICAgICogZGlmZmVyZW5jZSBvdGhlcndpc2Ugc3RlcFZhbHVlIGlzIDFcbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBzdGVwOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX3N0ZXAgPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIGZ1bmN0aW9uIG51bURlY2ltYWxzKHgpIHtcbiAgICB4ID0geC50b1N0cmluZygpO1xuICAgIGlmICh4LmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICByZXR1cm4geC5sZW5ndGggLSB4LmluZGV4T2YoJy4nKSAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94ID0gKGZ1bmN0aW9uIChOdW1iZXJDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0aGF0IGlzIGEgbnVtYmVyIGFuZFxuICAgKiBwcm92aWRlcyBhbiBpbnB1dCBlbGVtZW50IHdpdGggd2hpY2ggdG8gbWFuaXB1bGF0ZSBpdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWluXSBNaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWF4XSBNYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMuc3RlcF0gSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE51bWJlckNvbnRyb2xsZXJCb3ggPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcblxuICAgIHRoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XG5cbiAgICBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIHtOdW1iZXJ9IFByZXZpb3VzIG1vdXNlIHkgcG9zaXRpb25cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdmFyIHByZXZfeTtcblxuICAgIHRoaXMuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG5cbiAgICAvLyBNYWtlcyBpdCBzbyBtYW51YWxseSBzcGVjaWZpZWQgdmFsdWVzIGFyZSBub3QgdHJ1bmNhdGVkLlxuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAvLyBXaGVuIHByZXNzaW5nIGVudGlyZSwgeW91IGNhbiBiZSBhcyBwcmVjaXNlIGFzIHlvdSB3YW50LlxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgIF90aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIHZhciBhdHRlbXB0ZWQgPSBwYXJzZUZsb2F0KF90aGlzLl9faW5wdXQudmFsdWUpO1xuICAgICAgaWYgKCFjb21tb24uaXNOYU4oYXR0ZW1wdGVkKSkgX3RoaXMuc2V0VmFsdWUoYXR0ZW1wdGVkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICBvbkNoYW5nZSgpO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgIHByZXZfeSA9IGUuY2xpZW50WTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XG5cbiAgICAgIHZhciBkaWZmID0gcHJldl95IC0gZS5jbGllbnRZO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuZ2V0VmFsdWUoKSArIGRpZmYgKiBfdGhpcy5fX2ltcGxpZWRTdGVwKTtcblxuICAgICAgcHJldl95ID0gZS5jbGllbnRZO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19pbnB1dCk7XG5cbiAgfTtcblxuICBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MgPSBOdW1iZXJDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE51bWJlckNvbnRyb2xsZXJCb3gucHJvdG90eXBlLFxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHRoaXMuX19pbnB1dC52YWx1ZSA9IHRoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID8gdGhpcy5nZXRWYWx1ZSgpIDogcm91bmRUb0RlY2ltYWwodGhpcy5nZXRWYWx1ZSgpLCB0aGlzLl9fcHJlY2lzaW9uKTtcbiAgICAgICAgICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveC5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gcm91bmRUb0RlY2ltYWwodmFsdWUsIGRlY2ltYWxzKSB7XG4gICAgdmFyIHRlblRvID0gTWF0aC5wb3coMTAsIGRlY2ltYWxzKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIHRlblRvKSAvIHRlblRvO1xuICB9XG5cbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJCb3g7XG5cbn0pKGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclNsaWRlciA9IChmdW5jdGlvbiAoTnVtYmVyQ29udHJvbGxlciwgZG9tLCBjc3MsIGNvbW1vbiwgc3R5bGVTaGVldCkge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0aGF0IGlzIGEgbnVtYmVyLCBjb250YWluc1xuICAgKiBhIG1pbmltdW0gYW5kIG1heGltdW0sIGFuZCBwcm92aWRlcyBhIHNsaWRlciBlbGVtZW50IHdpdGggd2hpY2ggdG9cbiAgICogbWFuaXB1bGF0ZSBpdC4gSXQgc2hvdWxkIGJlIG5vdGVkIHRoYXQgdGhlIHNsaWRlciBlbGVtZW50IGlzIG1hZGUgdXAgb2ZcbiAgICogPGNvZGU+Jmx0O2RpdiZndDs8L2NvZGU+IHRhZ3MsIDxzdHJvbmc+bm90PC9zdHJvbmc+IHRoZSBodG1sNVxuICAgKiA8Y29kZT4mbHQ7c2xpZGVyJmd0OzwvY29kZT4gZWxlbWVudC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5WYWx1ZSBNaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFZhbHVlIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3RlcFZhbHVlIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBOdW1iZXJDb250cm9sbGVyU2xpZGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgbWluLCBtYXgsIHN0ZXApIHtcblxuICAgIE51bWJlckNvbnRyb2xsZXJTbGlkZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHsgbWluOiBtaW4sIG1heDogbWF4LCBzdGVwOiBzdGVwIH0pO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX19iYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2ZvcmVncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBcblxuXG4gICAgZG9tLmJpbmQodGhpcy5fX2JhY2tncm91bmQsICdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gICAgXG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19iYWNrZ3JvdW5kLCAnc2xpZGVyJyk7XG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19mb3JlZ3JvdW5kLCAnc2xpZGVyLWZnJyk7XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG5cbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuXG4gICAgICBvbk1vdXNlRHJhZyhlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIG9mZnNldCA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19iYWNrZ3JvdW5kKTtcbiAgICAgIHZhciB3aWR0aCA9IGRvbS5nZXRXaWR0aChfdGhpcy5fX2JhY2tncm91bmQpO1xuICAgICAgXG4gICAgICBfdGhpcy5zZXRWYWx1ZShcbiAgICAgICAgbWFwKGUuY2xpZW50WCwgb2Zmc2V0LmxlZnQsIG9mZnNldC5sZWZ0ICsgd2lkdGgsIF90aGlzLl9fbWluLCBfdGhpcy5fX21heClcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VVcCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLl9fYmFja2dyb3VuZC5hcHBlbmRDaGlsZCh0aGlzLl9fZm9yZWdyb3VuZCk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19iYWNrZ3JvdW5kKTtcblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXJTbGlkZXIuc3VwZXJjbGFzcyA9IE51bWJlckNvbnRyb2xsZXI7XG5cbiAgLyoqXG4gICAqIEluamVjdHMgZGVmYXVsdCBzdHlsZXNoZWV0IGZvciBzbGlkZXIgZWxlbWVudHMuXG4gICAqL1xuICBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnVzZURlZmF1bHRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBjc3MuaW5qZWN0KHN0eWxlU2hlZXQpO1xuICB9O1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE51bWJlckNvbnRyb2xsZXJTbGlkZXIucHJvdG90eXBlLFxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcGN0ID0gKHRoaXMuZ2V0VmFsdWUoKSAtIHRoaXMuX19taW4pLyh0aGlzLl9fbWF4IC0gdGhpcy5fX21pbik7XG4gICAgICAgICAgdGhpcy5fX2ZvcmVncm91bmQuc3R5bGUud2lkdGggPSBwY3QqMTAwKyclJztcbiAgICAgICAgICByZXR1cm4gTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG5cblxuICApO1xuXG4gIGZ1bmN0aW9uIG1hcCh2LCBpMSwgaTIsIG8xLCBvMikge1xuICAgIHJldHVybiBvMSArIChvMiAtIG8xKSAqICgodiAtIGkxKSAvIChpMiAtIGkxKSk7XG4gIH1cblxuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlclNsaWRlcjtcbiAgXG59KShkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNzcyxcbmRhdC51dGlscy5jb21tb24sXG5cIi5zbGlkZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xNSk7XFxuICBoZWlnaHQ6IDFlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XFxuICBwYWRkaW5nOiAwIDAuNWVtO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnNsaWRlci1mZyB7XFxuICBwYWRkaW5nOiAxcHggMCAycHggMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhYWE7XFxuICBoZWlnaHQ6IDFlbTtcXG4gIG1hcmdpbi1sZWZ0OiAtMC41ZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjVlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDFlbSAwIDAgMWVtO1xcbn1cXG5cXG4uc2xpZGVyLWZnOmFmdGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6ICAxcHggc29saWQgI2FhYTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLXJpZ2h0OiAtMWVtO1xcbiAgbWFyZ2luLXRvcDogLTFweDtcXG4gIGhlaWdodDogMC45ZW07XFxuICB3aWR0aDogMC45ZW07XFxufVwiKTtcblxuXG5kYXQuY29udHJvbGxlcnMuRnVuY3Rpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUHJvdmlkZXMgYSBHVUkgaW50ZXJmYWNlIHRvIGZpcmUgYSBzcGVjaWZpZWQgbWV0aG9kLCBhIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBGdW5jdGlvbkNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCB0ZXh0KSB7XG5cbiAgICBGdW5jdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX19idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fYnV0dG9uLmlubmVySFRNTCA9IHRleHQgPT09IHVuZGVmaW5lZCA/ICdGaXJlJyA6IHRleHQ7XG4gICAgZG9tLmJpbmQodGhpcy5fX2J1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgX3RoaXMuZmlyZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19idXR0b24sICdidXR0b24nKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fYnV0dG9uKTtcblxuXG4gIH07XG5cbiAgRnVuY3Rpb25Db250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIEZ1bmN0aW9uQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkNoYW5nZS5jYWxsKHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdldFZhbHVlKCkuY2FsbCh0aGlzLm9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBGdW5jdGlvbkNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIGNoZWNrYm94IGlucHV0IHRvIGFsdGVyIHRoZSBib29sZWFuIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBCb29sZWFuQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5fX3ByZXYgPSB0aGlzLmdldFZhbHVlKCk7XG5cbiAgICB0aGlzLl9fY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcblxuXG4gICAgZG9tLmJpbmQodGhpcy5fX2NoZWNrYm94LCAnY2hhbmdlJywgb25DaGFuZ2UsIGZhbHNlKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fY2hlY2tib3gpO1xuXG4gICAgLy8gTWF0Y2ggb3JpZ2luYWwgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgX3RoaXMuc2V0VmFsdWUoIV90aGlzLl9fcHJldik7XG4gICAgfVxuXG4gIH07XG5cbiAgQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgQm9vbGVhbkNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuICAgICAgICAgIHZhciB0b1JldHVybiA9IEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fX3ByZXYgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIFxuICAgICAgICAgIGlmICh0aGlzLmdldFZhbHVlKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgICAgICAgdGhpcy5fX2NoZWNrYm94LmNoZWNrZWQgPSB0cnVlOyAgICBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBCb29sZWFuQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb2xvci50b1N0cmluZyA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9yKSB7XG5cbiAgICBpZiAoY29sb3IuYSA9PSAxIHx8IGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5hKSkge1xuXG4gICAgICB2YXIgcyA9IGNvbG9yLmhleC50b1N0cmluZygxNik7XG4gICAgICB3aGlsZSAocy5sZW5ndGggPCA2KSB7XG4gICAgICAgIHMgPSAnMCcgKyBzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyMnICsgcztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiAncmdiYSgnICsgTWF0aC5yb3VuZChjb2xvci5yKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuZykgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmIpICsgJywnICsgY29sb3IuYSArICcpJztcblxuICAgIH1cblxuICB9XG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb2xvci5pbnRlcnByZXQgPSAoZnVuY3Rpb24gKHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgcmVzdWx0LCB0b1JldHVybjtcblxuICB2YXIgaW50ZXJwcmV0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b1JldHVybiA9IGZhbHNlO1xuXG4gICAgdmFyIG9yaWdpbmFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBjb21tb24udG9BcnJheShhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdO1xuXG4gICAgY29tbW9uLmVhY2goSU5URVJQUkVUQVRJT05TLCBmdW5jdGlvbihmYW1pbHkpIHtcblxuICAgICAgaWYgKGZhbWlseS5saXRtdXMob3JpZ2luYWwpKSB7XG5cbiAgICAgICAgY29tbW9uLmVhY2goZmFtaWx5LmNvbnZlcnNpb25zLCBmdW5jdGlvbihjb252ZXJzaW9uLCBjb252ZXJzaW9uTmFtZSkge1xuXG4gICAgICAgICAgcmVzdWx0ID0gY29udmVyc2lvbi5yZWFkKG9yaWdpbmFsKTtcblxuICAgICAgICAgIGlmICh0b1JldHVybiA9PT0gZmFsc2UgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9SZXR1cm4gPSByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbk5hbWUgPSBjb252ZXJzaW9uTmFtZTtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uID0gY29udmVyc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfTtcblxuICB2YXIgSU5URVJQUkVUQVRJT05TID0gW1xuXG4gICAgLy8gU3RyaW5nc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNTdHJpbmcsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgVEhSRUVfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldKShbQS1GMC05XSkoW0EtRjAtOV0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICcweCcgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMV0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzNdLnRvU3RyaW5nKCkgKyB0ZXN0WzNdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgU0lYX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XXs2fSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KCcweCcgKyB0ZXN0WzFdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQjoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYlxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCQToge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYmFcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pLFxuICAgICAgICAgICAgICBhOiBwYXJzZUZsb2F0KHRlc3RbNF0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE51bWJlcnNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzTnVtYmVyLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIEhFWDoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogb3JpZ2luYWwsXG4gICAgICAgICAgICAgIGNvbnZlcnNpb25OYW1lOiAnSEVYJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvci5oZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBBcnJheXNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzQXJyYXksXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gMykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCQV9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXSxcbiAgICAgICAgICAgICAgYTogb3JpZ2luYWxbM11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gT2JqZWN0c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNPYmplY3QsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iLFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52LFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnYsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG5cbiAgXTtcblxuICByZXR1cm4gaW50ZXJwcmV0O1xuXG5cbn0pKGRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5HVUkgPSBkYXQuZ3VpLkdVSSA9IChmdW5jdGlvbiAoY3NzLCBzYXZlRGlhbG9ndWVDb250ZW50cywgc3R5bGVTaGVldCwgY29udHJvbGxlckZhY3RvcnksIENvbnRyb2xsZXIsIEJvb2xlYW5Db250cm9sbGVyLCBGdW5jdGlvbkNvbnRyb2xsZXIsIE51bWJlckNvbnRyb2xsZXJCb3gsIE51bWJlckNvbnRyb2xsZXJTbGlkZXIsIE9wdGlvbkNvbnRyb2xsZXIsIENvbG9yQ29udHJvbGxlciwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCBDZW50ZXJlZERpdiwgZG9tLCBjb21tb24pIHtcblxuICBjc3MuaW5qZWN0KHN0eWxlU2hlZXQpO1xuXG4gIC8qKiBPdXRlci1tb3N0IGNsYXNzTmFtZSBmb3IgR1VJJ3MgKi9cbiAgdmFyIENTU19OQU1FU1BBQ0UgPSAnZGcnO1xuXG4gIHZhciBISURFX0tFWV9DT0RFID0gNzI7XG5cbiAgLyoqIFRoZSBvbmx5IHZhbHVlIHNoYXJlZCBiZXR3ZWVuIHRoZSBKUyBhbmQgU0NTUy4gVXNlIGNhdXRpb24uICovXG4gIHZhciBDTE9TRV9CVVRUT05fSEVJR0hUID0gMjA7XG5cbiAgdmFyIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSA9ICdEZWZhdWx0JztcblxuICB2YXIgU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSA9IChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuICdsb2NhbFN0b3JhZ2UnIGluIHdpbmRvdyAmJiB3aW5kb3dbJ2xvY2FsU3RvcmFnZSddICE9PSBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgdmFyIFNBVkVfRElBTE9HVUU7XG5cbiAgLyoqIEhhdmUgd2UgeWV0IHRvIGNyZWF0ZSBhbiBhdXRvUGxhY2UgR1VJPyAqL1xuICB2YXIgYXV0b19wbGFjZV92aXJnaW4gPSB0cnVlO1xuXG4gIC8qKiBGaXhlZCBwb3NpdGlvbiBkaXYgdGhhdCBhdXRvIHBsYWNlIEdVSSdzIGdvIGluc2lkZSAqL1xuICB2YXIgYXV0b19wbGFjZV9jb250YWluZXI7XG5cbiAgLyoqIEFyZSB3ZSBoaWRpbmcgdGhlIEdVSSdzID8gKi9cbiAgdmFyIGhpZGUgPSBmYWxzZTtcblxuICAvKiogR1VJJ3Mgd2hpY2ggc2hvdWxkIGJlIGhpZGRlbiAqL1xuICB2YXIgaGlkZWFibGVfZ3VpcyA9IFtdO1xuXG4gIC8qKlxuICAgKiBBIGxpZ2h0d2VpZ2h0IGNvbnRyb2xsZXIgbGlicmFyeSBmb3IgSmF2YVNjcmlwdC4gSXQgYWxsb3dzIHlvdSB0byBlYXNpbHlcbiAgICogbWFuaXB1bGF0ZSB2YXJpYWJsZXMgYW5kIGZpcmUgZnVuY3Rpb25zIG9uIHRoZSBmbHkuXG4gICAqIEBjbGFzc1xuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5ndWlcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbcGFyYW1zLm5hbWVdIFRoZSBuYW1lIG9mIHRoaXMgR1VJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcy5sb2FkXSBKU09OIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHNhdmVkIHN0YXRlIG9mXG4gICAqIHRoaXMgR1VJLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXJhbXMuYXV0bz10cnVlXVxuICAgKiBAcGFyYW0ge2RhdC5ndWkuR1VJfSBbcGFyYW1zLnBhcmVudF0gVGhlIEdVSSBJJ20gbmVzdGVkIGluLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXJhbXMuY2xvc2VkXSBJZiB0cnVlLCBzdGFydHMgY2xvc2VkXG4gICAqL1xuICB2YXIgR1VJID0gZnVuY3Rpb24ocGFyYW1zKSB7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogT3V0ZXJtb3N0IERPTSBFbGVtZW50XG4gICAgICogQHR5cGUgRE9NRWxlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX191bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX191bCk7XG5cbiAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBDU1NfTkFNRVNQQUNFKTtcblxuICAgIC8qKlxuICAgICAqIE5lc3RlZCBHVUkncyBieSBuYW1lXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19mb2xkZXJzID0ge307XG5cbiAgICB0aGlzLl9fY29udHJvbGxlcnMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2Ygb2JqZWN0cyBJJ20gcmVtZW1iZXJpbmcgZm9yIHNhdmUsIG9ubHkgdXNlZCBpbiB0b3AgbGV2ZWwgR1VJXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTWFwcyB0aGUgaW5kZXggb2YgcmVtZW1iZXJlZCBvYmplY3RzIHRvIGEgbWFwIG9mIGNvbnRyb2xsZXJzLCBvbmx5IHVzZWRcbiAgICAgKiBpbiB0b3AgbGV2ZWwgR1VJLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIFtcbiAgICAgKiAge1xuICAgICAqICAgIHByb3BlcnR5TmFtZTogQ29udHJvbGxlcixcbiAgICAgKiAgICBhbm90aGVyUHJvcGVydHlOYW1lOiBDb250cm9sbGVyXG4gICAgICogIH0sXG4gICAgICogIHtcbiAgICAgKiAgICBwcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXJcbiAgICAgKiAgfVxuICAgICAqIF1cbiAgICAgKi9cbiAgICB0aGlzLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzID0gW107XG5cbiAgICB0aGlzLl9fbGlzdGVuaW5nID0gW107XG5cbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG5cbiAgICAvLyBEZWZhdWx0IHBhcmFtZXRlcnNcbiAgICBwYXJhbXMgPSBjb21tb24uZGVmYXVsdHMocGFyYW1zLCB7XG4gICAgICBhdXRvUGxhY2U6IHRydWUsXG4gICAgICB3aWR0aDogR1VJLkRFRkFVTFRfV0lEVEhcbiAgICB9KTtcblxuICAgIHBhcmFtcyA9IGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgIHJlc2l6YWJsZTogcGFyYW1zLmF1dG9QbGFjZSxcbiAgICAgIGhpZGVhYmxlOiBwYXJhbXMuYXV0b1BsYWNlXG4gICAgfSk7XG5cblxuICAgIGlmICghY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5sb2FkKSkge1xuXG4gICAgICAvLyBFeHBsaWNpdCBwcmVzZXRcbiAgICAgIGlmIChwYXJhbXMucHJlc2V0KSBwYXJhbXMubG9hZC5wcmVzZXQgPSBwYXJhbXMucHJlc2V0O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcGFyYW1zLmxvYWQgPSB7IHByZXNldDogREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FIH07XG5cbiAgICB9XG5cbiAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5oaWRlYWJsZSkge1xuICAgICAgaGlkZWFibGVfZ3Vpcy5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIE9ubHkgcm9vdCBsZXZlbCBHVUkncyBhcmUgcmVzaXphYmxlLlxuICAgIHBhcmFtcy5yZXNpemFibGUgPSBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnJlc2l6YWJsZTtcblxuXG4gICAgaWYgKHBhcmFtcy5hdXRvUGxhY2UgJiYgY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5zY3JvbGxhYmxlKSkge1xuICAgICAgcGFyYW1zLnNjcm9sbGFibGUgPSB0cnVlO1xuICAgIH1cbi8vICAgIHBhcmFtcy5zY3JvbGxhYmxlID0gY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5zY3JvbGxhYmxlID09PSB0cnVlO1xuXG4gICAgLy8gTm90IHBhcnQgb2YgcGFyYW1zIGJlY2F1c2UgSSBkb24ndCB3YW50IHBlb3BsZSBwYXNzaW5nIHRoaXMgaW4gdmlhXG4gICAgLy8gY29uc3RydWN0b3IuIFNob3VsZCBiZSBhICdyZW1lbWJlcmVkJyB2YWx1ZS5cbiAgICB2YXIgdXNlX2xvY2FsX3N0b3JhZ2UgPVxuICAgICAgICBTVVBQT1JUU19MT0NBTF9TVE9SQUdFICYmXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdpc0xvY2FsJykpID09PSAndHJ1ZSc7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLFxuXG4gICAgICAgIC8qKiBAbGVuZHMgZGF0Lmd1aS5HVUkucHJvdG90eXBlICovXG4gICAgICAgIHtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSBwYXJlbnQgPGNvZGU+R1VJPC9jb2RlPlxuICAgICAgICAgICAqIEB0eXBlIGRhdC5ndWkuR1VJXG4gICAgICAgICAgICovXG4gICAgICAgICAgcGFyZW50OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2Nyb2xsYWJsZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5zY3JvbGxhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBIYW5kbGVzIDxjb2RlPkdVSTwvY29kZT4ncyBlbGVtZW50IHBsYWNlbWVudCBmb3IgeW91XG4gICAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgIGF1dG9QbGFjZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5hdXRvUGxhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSBpZGVudGlmaWVyIGZvciBhIHNldCBvZiBzYXZlZCB2YWx1ZXNcbiAgICAgICAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBwcmVzZXQ6IHtcblxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5nZXRSb290KCkucHJlc2V0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubG9hZC5wcmVzZXQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0Um9vdCgpLnByZXNldCA9IHY7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmxvYWQucHJlc2V0ID0gdjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRQcmVzZXRTZWxlY3RJbmRleCh0aGlzKTtcbiAgICAgICAgICAgICAgX3RoaXMucmV2ZXJ0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIHdpZHRoIG9mIDxjb2RlPkdVSTwvY29kZT4gZWxlbWVudFxuICAgICAgICAgICAqIEB0eXBlIE51bWJlclxuICAgICAgICAgICAqL1xuICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLndpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBwYXJhbXMud2lkdGggPSB2O1xuICAgICAgICAgICAgICBzZXRXaWR0aChfdGhpcywgdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSBuYW1lIG9mIDxjb2RlPkdVSTwvY29kZT4uIFVzZWQgZm9yIGZvbGRlcnMuIGkuZVxuICAgICAgICAgICAqIGEgZm9sZGVyJ3MgbmFtZVxuICAgICAgICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAgICAgICAqL1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgY29sbGlzaW9ucyBhbW9uZyBzaWJsaW5nIGZvbGRlcnNcbiAgICAgICAgICAgICAgcGFyYW1zLm5hbWUgPSB2O1xuICAgICAgICAgICAgICBpZiAodGl0bGVfcm93X25hbWUpIHtcbiAgICAgICAgICAgICAgICB0aXRsZV9yb3dfbmFtZS5pbm5lckhUTUwgPSBwYXJhbXMubmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBXaGV0aGVyIHRoZSA8Y29kZT5HVUk8L2NvZGU+IGlzIGNvbGxhcHNlZCBvciBub3RcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgY2xvc2VkOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmNsb3NlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHY7XG4gICAgICAgICAgICAgIGlmIChwYXJhbXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBhcmVuJ3QgZ29pbmcgdG8gcmVzcGVjdCB0aGUgQ1NTIHRyYW5zaXRpb24sXG4gICAgICAgICAgICAgIC8vIExldHMganVzdCBjaGVjayBvdXIgaGVpZ2h0IGFnYWluc3QgdGhlIHdpbmRvdyBoZWlnaHQgcmlnaHQgb2ZmXG4gICAgICAgICAgICAgIC8vIHRoZSBiYXQuXG4gICAgICAgICAgICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgICAgICAgICAgICBpZiAoX3RoaXMuX19jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgIF90aGlzLl9fY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gdiA/IEdVSS5URVhUX09QRU4gOiBHVUkuVEVYVF9DTE9TRUQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQ29udGFpbnMgYWxsIHByZXNldHNcbiAgICAgICAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBsb2FkOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdG8gdXNlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vU3RvcmFnZSNsb2NhbFN0b3JhZ2VcIj5sb2NhbFN0b3JhZ2U8L2E+IGFzIHRoZSBtZWFucyBmb3JcbiAgICAgICAgICAgKiA8Y29kZT5yZW1lbWJlcjwvY29kZT5pbmdcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgdXNlTG9jYWxTdG9yYWdlOiB7XG5cbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1c2VfbG9jYWxfc3RvcmFnZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICAgICAgICAgICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcbiAgICAgICAgICAgICAgICB1c2VfbG9jYWxfc3RvcmFnZSA9IGJvb2w7XG4gICAgICAgICAgICAgICAgaWYgKGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRvbS51bmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2lzTG9jYWwnKSwgYm9vbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIC8vIEFyZSB3ZSBhIHJvb3QgbGV2ZWwgR1VJP1xuICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkpIHtcblxuICAgICAgcGFyYW1zLmNsb3NlZCA9IGZhbHNlO1xuXG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBHVUkuQ0xBU1NfTUFJTik7XG4gICAgICBkb20ubWFrZVNlbGVjdGFibGUodGhpcy5kb21FbGVtZW50LCBmYWxzZSk7XG5cbiAgICAgIC8vIEFyZSB3ZSBzdXBwb3NlZCB0byBiZSBsb2FkaW5nIGxvY2FsbHk/XG4gICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuXG4gICAgICAgIGlmICh1c2VfbG9jYWxfc3RvcmFnZSkge1xuXG4gICAgICAgICAgX3RoaXMudXNlTG9jYWxTdG9yYWdlID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzYXZlZF9ndWkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdndWknKSk7XG5cbiAgICAgICAgICBpZiAoc2F2ZWRfZ3VpKSB7XG4gICAgICAgICAgICBwYXJhbXMubG9hZCA9IEpTT04ucGFyc2Uoc2F2ZWRfZ3VpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX19jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5fX2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9IEdVSS5URVhUX0NMT1NFRDtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19DTE9TRV9CVVRUT04pO1xuICAgICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jbG9zZUJ1dHRvbik7XG5cbiAgICAgIGRvbS5iaW5kKHRoaXMuX19jbG9zZUJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcblxuXG4gICAgICB9KTtcblxuXG4gICAgICAvLyBPaCwgeW91J3JlIGEgbmVzdGVkIEdVSSFcbiAgICB9IGVsc2Uge1xuXG4gICAgICBpZiAocGFyYW1zLmNsb3NlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBhcmFtcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGl0bGVfcm93X25hbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYXJhbXMubmFtZSk7XG4gICAgICBkb20uYWRkQ2xhc3ModGl0bGVfcm93X25hbWUsICdjb250cm9sbGVyLW5hbWUnKTtcblxuICAgICAgdmFyIHRpdGxlX3JvdyA9IGFkZFJvdyhfdGhpcywgdGl0bGVfcm93X25hbWUpO1xuXG4gICAgICB2YXIgb25fY2xpY2tfdGl0bGUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyh0aXRsZV9yb3csICd0aXRsZScpO1xuICAgICAgZG9tLmJpbmQodGl0bGVfcm93LCAnY2xpY2snLCBvbl9jbGlja190aXRsZSk7XG5cbiAgICAgIGlmICghcGFyYW1zLmNsb3NlZCkge1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5hdXRvUGxhY2UpIHtcblxuICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuXG4gICAgICAgIGlmIChhdXRvX3BsYWNlX3Zpcmdpbikge1xuICAgICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKGF1dG9fcGxhY2VfY29udGFpbmVyLCBDU1NfTkFNRVNQQUNFKTtcbiAgICAgICAgICBkb20uYWRkQ2xhc3MoYXV0b19wbGFjZV9jb250YWluZXIsIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUik7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhdXRvX3BsYWNlX2NvbnRhaW5lcik7XG4gICAgICAgICAgYXV0b19wbGFjZV92aXJnaW4gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFB1dCBpdCBpbiB0aGUgZG9tIGZvciB5b3UuXG4gICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgLy8gQXBwbHkgdGhlIGF1dG8gc3R5bGVzXG4gICAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19BVVRPX1BMQUNFKTtcblxuICAgICAgfVxuXG5cbiAgICAgIC8vIE1ha2UgaXQgbm90IGVsYXN0aWMuXG4gICAgICBpZiAoIXRoaXMucGFyZW50KSBzZXRXaWR0aChfdGhpcywgcGFyYW1zLndpZHRoKTtcblxuICAgIH1cblxuICAgIGRvbS5iaW5kKHdpbmRvdywgJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpIH0pO1xuICAgIGRvbS5iaW5kKHRoaXMuX191bCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKTsgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpIH0pO1xuICAgIGRvbS5iaW5kKHRoaXMuX191bCwgJ29UcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuXG5cbiAgICBpZiAocGFyYW1zLnJlc2l6YWJsZSkge1xuICAgICAgYWRkUmVzaXplSGFuZGxlKHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZSgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdndWknKSwgSlNPTi5zdHJpbmdpZnkoX3RoaXMuZ2V0U2F2ZU9iamVjdCgpKSk7XG4gICAgfVxuXG4gICAgdmFyIHJvb3QgPSBfdGhpcy5nZXRSb290KCk7XG4gICAgZnVuY3Rpb24gcmVzZXRXaWR0aCgpIHtcbiAgICAgICAgdmFyIHJvb3QgPSBfdGhpcy5nZXRSb290KCk7XG4gICAgICAgIHJvb3Qud2lkdGggKz0gMTtcbiAgICAgICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJvb3Qud2lkdGggLT0gMTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyYW1zLnBhcmVudCkge1xuICAgICAgICByZXNldFdpZHRoKCk7XG4gICAgICB9XG5cbiAgfTtcblxuICBHVUkudG9nZ2xlSGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaGlkZSA9ICFoaWRlO1xuICAgIGNvbW1vbi5lYWNoKGhpZGVhYmxlX2d1aXMsIGZ1bmN0aW9uKGd1aSkge1xuICAgICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUuekluZGV4ID0gaGlkZSA/IC05OTkgOiA5OTk7XG4gICAgICBndWkuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaGlkZSA/IDAgOiAxO1xuICAgIH0pO1xuICB9O1xuXG4gIEdVSS5DTEFTU19BVVRPX1BMQUNFID0gJ2EnO1xuICBHVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIgPSAnYWMnO1xuICBHVUkuQ0xBU1NfTUFJTiA9ICdtYWluJztcbiAgR1VJLkNMQVNTX0NPTlRST0xMRVJfUk9XID0gJ2NyJztcbiAgR1VJLkNMQVNTX1RPT19UQUxMID0gJ3RhbGxlci10aGFuLXdpbmRvdyc7XG4gIEdVSS5DTEFTU19DTE9TRUQgPSAnY2xvc2VkJztcbiAgR1VJLkNMQVNTX0NMT1NFX0JVVFRPTiA9ICdjbG9zZS1idXR0b24nO1xuICBHVUkuQ0xBU1NfRFJBRyA9ICdkcmFnJztcblxuICBHVUkuREVGQVVMVF9XSURUSCA9IDI0NTtcbiAgR1VJLlRFWFRfQ0xPU0VEID0gJ0Nsb3NlIENvbnRyb2xzJztcbiAgR1VJLlRFWFRfT1BFTiA9ICdPcGVuIENvbnRyb2xzJztcblxuICBkb20uYmluZCh3aW5kb3csICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudHlwZSAhPT0gJ3RleHQnICYmXG4gICAgICAgIChlLndoaWNoID09PSBISURFX0tFWV9DT0RFIHx8IGUua2V5Q29kZSA9PSBISURFX0tFWV9DT0RFKSkge1xuICAgICAgR1VJLnRvZ2dsZUhpZGUoKTtcbiAgICB9XG5cbiAgfSwgZmFsc2UpO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIEdVSS5wcm90b3R5cGUsXG5cbiAgICAgIC8qKiBAbGVuZHMgZGF0Lmd1aS5HVUkgKi9cbiAgICAgIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSBUaGUgbmV3IGNvbnRyb2xsZXIgdGhhdCB3YXMgYWRkZWQuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkOiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db2xvckNvbnRyb2xsZXJ9IFRoZSBuZXcgY29udHJvbGxlciB0aGF0IHdhcyBhZGRlZC5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGRDb2xvcjogZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBjb250cm9sbGVyXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihjb250cm9sbGVyKSB7XG5cbiAgICAgICAgICAvLyBUT0RPIGxpc3RlbmluZz9cbiAgICAgICAgICB0aGlzLl9fdWwucmVtb3ZlQ2hpbGQoY29udHJvbGxlci5fX2xpKTtcbiAgICAgICAgICB0aGlzLl9fY29udHJvbGxlcnMuc2xpY2UodGhpcy5fX2NvbnRyb2xsZXJzLmluZGV4T2YoY29udHJvbGxlciksIDEpO1xuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMub25SZXNpemUoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKHRoaXMuYXV0b1BsYWNlKSB7XG4gICAgICAgICAgICBhdXRvX3BsYWNlX2NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0Lmd1aS5HVUl9IFRoZSBuZXcgZm9sZGVyLlxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gaWYgdGhpcyBHVUkgYWxyZWFkeSBoYXMgYSBmb2xkZXIgYnkgdGhlIHNwZWNpZmllZFxuICAgICAgICAgKiBuYW1lXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkRm9sZGVyOiBmdW5jdGlvbihuYW1lKSB7XG5cbiAgICAgICAgICAvLyBXZSBoYXZlIHRvIHByZXZlbnQgY29sbGlzaW9ucyBvbiBuYW1lcyBpbiBvcmRlciB0byBoYXZlIGEga2V5XG4gICAgICAgICAgLy8gYnkgd2hpY2ggdG8gcmVtZW1iZXIgc2F2ZWQgdmFsdWVzXG4gICAgICAgICAgaWYgKHRoaXMuX19mb2xkZXJzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGFscmVhZHkgaGF2ZSBhIGZvbGRlciBpbiB0aGlzIEdVSSBieSB0aGUnICtcbiAgICAgICAgICAgICAgICAnIG5hbWUgXCInICsgbmFtZSArICdcIicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBuZXdfZ3VpX3BhcmFtcyA9IHsgbmFtZTogbmFtZSwgcGFyZW50OiB0aGlzIH07XG5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIHBhc3MgZG93biB0aGUgYXV0b1BsYWNlIHRyYWl0IHNvIHRoYXQgd2UgY2FuXG4gICAgICAgICAgLy8gYXR0YWNoIGV2ZW50IGxpc3RlbmVycyB0byBvcGVuL2Nsb3NlIGZvbGRlciBhY3Rpb25zIHRvXG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgYSBzY3JvbGxiYXIgYXBwZWFycyBpZiB0aGUgd2luZG93IGlzIHRvbyBzaG9ydC5cbiAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5hdXRvUGxhY2UgPSB0aGlzLmF1dG9QbGFjZTtcblxuICAgICAgICAgIC8vIERvIHdlIGhhdmUgc2F2ZWQgYXBwZWFyYW5jZSBkYXRhIGZvciB0aGlzIGZvbGRlcj9cblxuICAgICAgICAgIGlmICh0aGlzLmxvYWQgJiYgLy8gQW55dGhpbmcgbG9hZGVkP1xuICAgICAgICAgICAgICB0aGlzLmxvYWQuZm9sZGVycyAmJiAvLyBXYXMgbXkgcGFyZW50IGEgZGVhZC1lbmQ/XG4gICAgICAgICAgICAgIHRoaXMubG9hZC5mb2xkZXJzW25hbWVdKSB7IC8vIERpZCBkYWRkeSByZW1lbWJlciBtZT9cblxuICAgICAgICAgICAgLy8gU3RhcnQgbWUgY2xvc2VkIGlmIEkgd2FzIGNsb3NlZFxuICAgICAgICAgICAgbmV3X2d1aV9wYXJhbXMuY2xvc2VkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0uY2xvc2VkO1xuXG4gICAgICAgICAgICAvLyBQYXNzIGRvd24gdGhlIGxvYWRlZCBkYXRhXG4gICAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5sb2FkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV07XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZ3VpID0gbmV3IEdVSShuZXdfZ3VpX3BhcmFtcyk7XG4gICAgICAgICAgdGhpcy5fX2ZvbGRlcnNbbmFtZV0gPSBndWk7XG5cbiAgICAgICAgICB2YXIgbGkgPSBhZGRSb3codGhpcywgZ3VpLmRvbUVsZW1lbnQpO1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2ZvbGRlcicpO1xuICAgICAgICAgIHJldHVybiBndWk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZXNpemU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIHJvb3QgPSB0aGlzLmdldFJvb3QoKTtcblxuICAgICAgICAgIGlmIChyb290LnNjcm9sbGFibGUpIHtcblxuICAgICAgICAgICAgdmFyIHRvcCA9IGRvbS5nZXRPZmZzZXQocm9vdC5fX3VsKS50b3A7XG4gICAgICAgICAgICB2YXIgaCA9IDA7XG5cbiAgICAgICAgICAgIGNvbW1vbi5lYWNoKHJvb3QuX191bC5jaGlsZE5vZGVzLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgIGlmICghIChyb290LmF1dG9QbGFjZSAmJiBub2RlID09PSByb290Ll9fc2F2ZV9yb3cpKVxuICAgICAgICAgICAgICAgIGggKz0gZG9tLmdldEhlaWdodChub2RlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCA8IGgpIHtcbiAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKHJvb3QuZG9tRWxlbWVudCwgR1VJLkNMQVNTX1RPT19UQUxMKTtcbiAgICAgICAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRvcCAtIENMT1NFX0JVVFRPTl9IRUlHSFQgKyAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKHJvb3QuZG9tRWxlbWVudCwgR1VJLkNMQVNTX1RPT19UQUxMKTtcbiAgICAgICAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyb290Ll9fcmVzaXplX2hhbmRsZSkge1xuICAgICAgICAgICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByb290Ll9fcmVzaXplX2hhbmRsZS5zdHlsZS5oZWlnaHQgPSByb290Ll9fdWwub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyb290Ll9fY2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgIHJvb3QuX19jbG9zZUJ1dHRvbi5zdHlsZS53aWR0aCA9IHJvb3Qud2lkdGggKyAncHgnO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYXJrIG9iamVjdHMgZm9yIHNhdmluZy4gVGhlIG9yZGVyIG9mIHRoZXNlIG9iamVjdHMgY2Fubm90IGNoYW5nZSBhc1xuICAgICAgICAgKiB0aGUgR1VJIGdyb3dzLiBXaGVuIHJlbWVtYmVyaW5nIG5ldyBvYmplY3RzLCBhcHBlbmQgdGhlbSB0byB0aGUgZW5kXG4gICAgICAgICAqIG9mIHRoZSBsaXN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC4uLn0gb2JqZWN0c1xuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm90IGNhbGxlZCBvbiBhIHRvcCBsZXZlbCBHVUkuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtZW1iZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChTQVZFX0RJQUxPR1VFKSkge1xuICAgICAgICAgICAgU0FWRV9ESUFMT0dVRSA9IG5ldyBDZW50ZXJlZERpdigpO1xuICAgICAgICAgICAgU0FWRV9ESUFMT0dVRS5kb21FbGVtZW50LmlubmVySFRNTCA9IHNhdmVEaWFsb2d1ZUNvbnRlbnRzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBvbmx5IGNhbGwgcmVtZW1iZXIgb24gYSB0b3AgbGV2ZWwgR1VJLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgY29tbW9uLmVhY2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSwgZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICBhZGRTYXZlTWVudShfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgICAgICAgIC8vIFNldCBzYXZlIHJvdyB3aWR0aFxuICAgICAgICAgICAgc2V0V2lkdGgodGhpcywgdGhpcy53aWR0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuZ3VpLkdVSX0gdGhlIHRvcG1vc3QgcGFyZW50IEdVSSBvZiBhIG5lc3RlZCBHVUkuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Um9vdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGd1aSA9IHRoaXM7XG4gICAgICAgICAgd2hpbGUgKGd1aS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGd1aSA9IGd1aS5wYXJlbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBndWk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGEgSlNPTiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IHN0YXRlIG9mXG4gICAgICAgICAqIHRoaXMgR1VJIGFzIHdlbGwgYXMgaXRzIHJlbWVtYmVyZWQgcHJvcGVydGllcy5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRTYXZlT2JqZWN0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciB0b1JldHVybiA9IHRoaXMubG9hZDtcblxuICAgICAgICAgIHRvUmV0dXJuLmNsb3NlZCA9IHRoaXMuY2xvc2VkO1xuXG4gICAgICAgICAgLy8gQW0gSSByZW1lbWJlcmluZyBhbnkgdmFsdWVzP1xuICAgICAgICAgIGlmICh0aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICB0b1JldHVybi5wcmVzZXQgPSB0aGlzLnByZXNldDtcblxuICAgICAgICAgICAgaWYgKCF0b1JldHVybi5yZW1lbWJlcmVkKSB7XG4gICAgICAgICAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9SZXR1cm4ucmVtZW1iZXJlZFt0aGlzLnByZXNldF0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9SZXR1cm4uZm9sZGVycyA9IHt9O1xuICAgICAgICAgIGNvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbihlbGVtZW50LCBrZXkpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuLmZvbGRlcnNba2V5XSA9IGVsZW1lbnQuZ2V0U2F2ZU9iamVjdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2F2ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMsIGZhbHNlKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNhdmVBczogZnVuY3Rpb24ocHJlc2V0TmFtZSkge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xuXG4gICAgICAgICAgICAvLyBSZXRhaW4gZGVmYXVsdCB2YWx1ZXMgdXBvbiBmaXJzdCBzYXZlXG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcywgdHJ1ZSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtwcmVzZXROYW1lXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgICAgICAgdGhpcy5wcmVzZXQgPSBwcmVzZXROYW1lO1xuICAgICAgICAgIGFkZFByZXNldE9wdGlvbih0aGlzLCBwcmVzZXROYW1lLCB0cnVlKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHJldmVydDogZnVuY3Rpb24oZ3VpKSB7XG5cbiAgICAgICAgICBjb21tb24uZWFjaCh0aGlzLl9fY29udHJvbGxlcnMsIGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgcmV2ZXJ0IHdvcmsgb24gRGVmYXVsdC5cbiAgICAgICAgICAgIGlmICghdGhpcy5nZXRSb290KCkubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUoY29udHJvbGxlci5pbml0aWFsVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVjYWxsU2F2ZWRWYWx1ZShndWkgfHwgdGhpcy5nZXRSb290KCksIGNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgY29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uKGZvbGRlcikge1xuICAgICAgICAgICAgZm9sZGVyLnJldmVydChmb2xkZXIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKCFndWkpIHtcbiAgICAgICAgICAgIG1hcmtQcmVzZXRNb2RpZmllZCh0aGlzLmdldFJvb3QoKSwgZmFsc2UpO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbGlzdGVuOiBmdW5jdGlvbihjb250cm9sbGVyKSB7XG5cbiAgICAgICAgICB2YXIgaW5pdCA9IHRoaXMuX19saXN0ZW5pbmcubGVuZ3RoID09IDA7XG4gICAgICAgICAgdGhpcy5fX2xpc3RlbmluZy5wdXNoKGNvbnRyb2xsZXIpO1xuICAgICAgICAgIGlmIChpbml0KSB1cGRhdGVEaXNwbGF5cyh0aGlzLl9fbGlzdGVuaW5nKTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIGZ1bmN0aW9uIGFkZChndWksIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgaWYgKG9iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IFwiICsgb2JqZWN0ICsgXCIgaGFzIG5vIHByb3BlcnR5IFxcXCJcIiArIHByb3BlcnR5ICsgXCJcXFwiXCIpO1xuICAgIH1cblxuICAgIHZhciBjb250cm9sbGVyO1xuXG4gICAgaWYgKHBhcmFtcy5jb2xvcikge1xuXG4gICAgICBjb250cm9sbGVyID0gbmV3IENvbG9yQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHZhciBmYWN0b3J5QXJncyA9IFtvYmplY3QscHJvcGVydHldLmNvbmNhdChwYXJhbXMuZmFjdG9yeUFyZ3MpO1xuICAgICAgY29udHJvbGxlciA9IGNvbnRyb2xsZXJGYWN0b3J5LmFwcGx5KGd1aSwgZmFjdG9yeUFyZ3MpO1xuXG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5iZWZvcmUgaW5zdGFuY2VvZiBDb250cm9sbGVyKSB7XG4gICAgICBwYXJhbXMuYmVmb3JlID0gcGFyYW1zLmJlZm9yZS5fX2xpO1xuICAgIH1cblxuICAgIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKTtcblxuICAgIGRvbS5hZGRDbGFzcyhjb250cm9sbGVyLmRvbUVsZW1lbnQsICdjJyk7XG5cbiAgICB2YXIgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBkb20uYWRkQ2xhc3MobmFtZSwgJ3Byb3BlcnR5LW5hbWUnKTtcbiAgICBuYW1lLmlubmVySFRNTCA9IGNvbnRyb2xsZXIucHJvcGVydHk7XG5cbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9sbGVyLmRvbUVsZW1lbnQpO1xuXG4gICAgdmFyIGxpID0gYWRkUm93KGd1aSwgY29udGFpbmVyLCBwYXJhbXMuYmVmb3JlKTtcblxuICAgIGRvbS5hZGRDbGFzcyhsaSwgR1VJLkNMQVNTX0NPTlRST0xMRVJfUk9XKTtcbiAgICBkb20uYWRkQ2xhc3MobGksIHR5cGVvZiBjb250cm9sbGVyLmdldFZhbHVlKCkpO1xuXG4gICAgYXVnbWVudENvbnRyb2xsZXIoZ3VpLCBsaSwgY29udHJvbGxlcik7XG5cbiAgICBndWkuX19jb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSByb3cgdG8gdGhlIGVuZCBvZiB0aGUgR1VJIG9yIGJlZm9yZSBhbm90aGVyIHJvdy5cbiAgICpcbiAgICogQHBhcmFtIGd1aVxuICAgKiBAcGFyYW0gW2RvbV0gSWYgc3BlY2lmaWVkLCBpbnNlcnRzIHRoZSBkb20gY29udGVudCBpbiB0aGUgbmV3IHJvd1xuICAgKiBAcGFyYW0gW2xpQmVmb3JlXSBJZiBzcGVjaWZpZWQsIHBsYWNlcyB0aGUgbmV3IHJvdyBiZWZvcmUgYW5vdGhlciByb3dcbiAgICovXG4gIGZ1bmN0aW9uIGFkZFJvdyhndWksIGRvbSwgbGlCZWZvcmUpIHtcbiAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGlmIChkb20pIGxpLmFwcGVuZENoaWxkKGRvbSk7XG4gICAgaWYgKGxpQmVmb3JlKSB7XG4gICAgICBndWkuX191bC5pbnNlcnRCZWZvcmUobGksIHBhcmFtcy5iZWZvcmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBndWkuX191bC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfVxuICAgIGd1aS5vblJlc2l6ZSgpO1xuICAgIHJldHVybiBsaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF1Z21lbnRDb250cm9sbGVyKGd1aSwgbGksIGNvbnRyb2xsZXIpIHtcblxuICAgIGNvbnRyb2xsZXIuX19saSA9IGxpO1xuICAgIGNvbnRyb2xsZXIuX19ndWkgPSBndWk7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbnRyb2xsZXIsIHtcblxuICAgICAgb3B0aW9uczogZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbY29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNBcnJheShvcHRpb25zKSB8fCBjb21tb24uaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgZ3VpLFxuICAgICAgICAgICAgICBjb250cm9sbGVyLm9iamVjdCxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogW29wdGlvbnNdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgfSxcblxuICAgICAgbmFtZTogZnVuY3Rpb24odikge1xuICAgICAgICBjb250cm9sbGVyLl9fbGkuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gdjtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICB9LFxuXG4gICAgICBsaXN0ZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250cm9sbGVyLl9fZ3VpLmxpc3Rlbihjb250cm9sbGVyKTtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250cm9sbGVyLl9fZ3VpLnJlbW92ZShjb250cm9sbGVyKTtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vIEFsbCBzbGlkZXJzIHNob3VsZCBiZSBhY2NvbXBhbmllZCBieSBhIGJveC5cbiAgICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIE51bWJlckNvbnRyb2xsZXJTbGlkZXIpIHtcblxuICAgICAgdmFyIGJveCA9IG5ldyBOdW1iZXJDb250cm9sbGVyQm94KGNvbnRyb2xsZXIub2JqZWN0LCBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgIHsgbWluOiBjb250cm9sbGVyLl9fbWluLCBtYXg6IGNvbnRyb2xsZXIuX19tYXgsIHN0ZXA6IGNvbnRyb2xsZXIuX19zdGVwIH0pO1xuXG4gICAgICBjb21tb24uZWFjaChbJ3VwZGF0ZURpc3BsYXknLCAnb25DaGFuZ2UnLCAnb25GaW5pc2hDaGFuZ2UnXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgIHZhciBwYyA9IGNvbnRyb2xsZXJbbWV0aG9kXTtcbiAgICAgICAgdmFyIHBiID0gYm94W21ldGhvZF07XG4gICAgICAgIGNvbnRyb2xsZXJbbWV0aG9kXSA9IGJveFttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgIHBjLmFwcGx5KGNvbnRyb2xsZXIsIGFyZ3MpO1xuICAgICAgICAgIHJldHVybiBwYi5hcHBseShib3gsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZG9tLmFkZENsYXNzKGxpLCAnaGFzLXNsaWRlcicpO1xuICAgICAgY29udHJvbGxlci5kb21FbGVtZW50Lmluc2VydEJlZm9yZShib3guZG9tRWxlbWVudCwgY29udHJvbGxlci5kb21FbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgTnVtYmVyQ29udHJvbGxlckJveCkge1xuXG4gICAgICB2YXIgciA9IGZ1bmN0aW9uKHJldHVybmVkKSB7XG5cbiAgICAgICAgLy8gSGF2ZSB3ZSBkZWZpbmVkIGJvdGggYm91bmRhcmllcz9cbiAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihjb250cm9sbGVyLl9fbWluKSAmJiBjb21tb24uaXNOdW1iZXIoY29udHJvbGxlci5fX21heCkpIHtcblxuICAgICAgICAgIC8vIFdlbGwsIHRoZW4gbGV0cyBqdXN0IHJlcGxhY2UgdGhpcyB3aXRoIGEgc2xpZGVyLlxuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgZ3VpLFxuICAgICAgICAgICAgICBjb250cm9sbGVyLm9iamVjdCxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogW2NvbnRyb2xsZXIuX19taW4sIGNvbnRyb2xsZXIuX19tYXgsIGNvbnRyb2xsZXIuX19zdGVwXVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuXG4gICAgICB9O1xuXG4gICAgICBjb250cm9sbGVyLm1pbiA9IGNvbW1vbi5jb21wb3NlKHIsIGNvbnRyb2xsZXIubWluKTtcbiAgICAgIGNvbnRyb2xsZXIubWF4ID0gY29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5tYXgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBCb29sZWFuQ29udHJvbGxlcikge1xuXG4gICAgICBkb20uYmluZChsaSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5mYWtlRXZlbnQoY29udHJvbGxlci5fX2NoZWNrYm94LCAnY2xpY2snKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudHMgZG91YmxlLXRvZ2dsZVxuICAgICAgfSlcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgRnVuY3Rpb25Db250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLmZha2VFdmVudChjb250cm9sbGVyLl9fYnV0dG9uLCAnY2xpY2snKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChsaSwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20uYWRkQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XG4gICAgICB9KTtcblxuICAgICAgZG9tLmJpbmQobGksICdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XG4gICAgICB9KTtcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQ29sb3JDb250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2NvbG9yJyk7XG4gICAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkgPSBjb21tb24uY29tcG9zZShmdW5jdGlvbihyKSB7XG4gICAgICAgIGxpLnN0eWxlLmJvcmRlckxlZnRDb2xvciA9IGNvbnRyb2xsZXIuX19jb2xvci50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICAgIH0sIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSk7XG5cbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgfVxuXG4gICAgY29udHJvbGxlci5zZXRWYWx1ZSA9IGNvbW1vbi5jb21wb3NlKGZ1bmN0aW9uKHIpIHtcbiAgICAgIGlmIChndWkuZ2V0Um9vdCgpLl9fcHJlc2V0X3NlbGVjdCAmJiBjb250cm9sbGVyLmlzTW9kaWZpZWQoKSkge1xuICAgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQoZ3VpLmdldFJvb3QoKSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9LCBjb250cm9sbGVyLnNldFZhbHVlKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxsU2F2ZWRWYWx1ZShndWksIGNvbnRyb2xsZXIpIHtcblxuICAgIC8vIEZpbmQgdGhlIHRvcG1vc3QgR1VJLCB0aGF0J3Mgd2hlcmUgcmVtZW1iZXJlZCBvYmplY3RzIGxpdmUuXG4gICAgdmFyIHJvb3QgPSBndWkuZ2V0Um9vdCgpO1xuXG4gICAgLy8gRG9lcyB0aGUgb2JqZWN0IHdlJ3JlIGNvbnRyb2xsaW5nIG1hdGNoIGFueXRoaW5nIHdlJ3ZlIGJlZW4gdG9sZCB0b1xuICAgIC8vIHJlbWVtYmVyP1xuICAgIHZhciBtYXRjaGVkX2luZGV4ID0gcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RzLmluZGV4T2YoY29udHJvbGxlci5vYmplY3QpO1xuXG4gICAgLy8gV2h5IHllcywgaXQgZG9lcyFcbiAgICBpZiAobWF0Y2hlZF9pbmRleCAhPSAtMSkge1xuXG4gICAgICAvLyBMZXQgbWUgZmV0Y2ggYSBtYXAgb2YgY29udHJvbGxlcnMgZm9yIHRoY29tbW9uLmlzT2JqZWN0LlxuICAgICAgdmFyIGNvbnRyb2xsZXJfbWFwID1cbiAgICAgICAgICByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRfaW5kZXhdO1xuXG4gICAgICAvLyBPaHAsIEkgYmVsaWV2ZSB0aGlzIGlzIHRoZSBmaXJzdCBjb250cm9sbGVyIHdlJ3ZlIGNyZWF0ZWQgZm9yIHRoaXNcbiAgICAgIC8vIG9iamVjdC4gTGV0cyBtYWtlIHRoZSBtYXAgZnJlc2guXG4gICAgICBpZiAoY29udHJvbGxlcl9tYXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250cm9sbGVyX21hcCA9IHt9O1xuICAgICAgICByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRfaW5kZXhdID1cbiAgICAgICAgICAgIGNvbnRyb2xsZXJfbWFwO1xuICAgICAgfVxuXG4gICAgICAvLyBLZWVwIHRyYWNrIG9mIHRoaXMgY29udHJvbGxlclxuICAgICAgY29udHJvbGxlcl9tYXBbY29udHJvbGxlci5wcm9wZXJ0eV0gPSBjb250cm9sbGVyO1xuXG4gICAgICAvLyBPa2F5LCBub3cgaGF2ZSB3ZSBzYXZlZCBhbnkgdmFsdWVzIGZvciB0aGlzIGNvbnRyb2xsZXI/XG4gICAgICBpZiAocm9vdC5sb2FkICYmIHJvb3QubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgICAgdmFyIHByZXNldF9tYXAgPSByb290LmxvYWQucmVtZW1iZXJlZDtcblxuICAgICAgICAvLyBXaGljaCBwcmVzZXQgYXJlIHdlIHRyeWluZyB0byBsb2FkP1xuICAgICAgICB2YXIgcHJlc2V0O1xuXG4gICAgICAgIGlmIChwcmVzZXRfbWFwW2d1aS5wcmVzZXRdKSB7XG5cbiAgICAgICAgICBwcmVzZXQgPSBwcmVzZXRfbWFwW2d1aS5wcmVzZXRdO1xuXG4gICAgICAgIH0gZWxzZSBpZiAocHJlc2V0X21hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdKSB7XG5cbiAgICAgICAgICAvLyBVaGgsIHlvdSBjYW4gaGF2ZSB0aGUgZGVmYXVsdCBpbnN0ZWFkP1xuICAgICAgICAgIHByZXNldCA9IHByZXNldF9tYXBbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgLy8gTmFkYS5cblxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBEaWQgdGhlIGxvYWRlZCBvYmplY3QgcmVtZW1iZXIgdGhjb21tb24uaXNPYmplY3Q/XG4gICAgICAgIGlmIChwcmVzZXRbbWF0Y2hlZF9pbmRleF0gJiZcblxuICAgICAgICAgIC8vIERpZCB3ZSByZW1lbWJlciB0aGlzIHBhcnRpY3VsYXIgcHJvcGVydHk/XG4gICAgICAgICAgICBwcmVzZXRbbWF0Y2hlZF9pbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgLy8gV2UgZGlkIHJlbWVtYmVyIHNvbWV0aGluZyBmb3IgdGhpcyBndXkgLi4uXG4gICAgICAgICAgdmFyIHZhbHVlID0gcHJlc2V0W21hdGNoZWRfaW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldO1xuXG4gICAgICAgICAgLy8gQW5kIHRoYXQncyB3aGF0IGl0IGlzLlxuICAgICAgICAgIGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZUhhc2goZ3VpLCBrZXkpIHtcbiAgICAvLyBUT0RPIGhvdyBkb2VzIHRoaXMgZGVhbCB3aXRoIG11bHRpcGxlIEdVSSdzP1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmICsgJy4nICsga2V5O1xuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRTYXZlTWVudShndWkpIHtcblxuICAgIHZhciBkaXYgPSBndWkuX19zYXZlX3JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICBkb20uYWRkQ2xhc3MoZ3VpLmRvbUVsZW1lbnQsICdoYXMtc2F2ZScpO1xuXG4gICAgZ3VpLl9fdWwuaW5zZXJ0QmVmb3JlKGRpdiwgZ3VpLl9fdWwuZmlyc3RDaGlsZCk7XG5cbiAgICBkb20uYWRkQ2xhc3MoZGl2LCAnc2F2ZS1yb3cnKTtcblxuICAgIHZhciBnZWFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBnZWFycy5pbm5lckhUTUwgPSAnJm5ic3A7JztcbiAgICBkb20uYWRkQ2xhc3MoZ2VhcnMsICdidXR0b24gZ2VhcnMnKTtcblxuICAgIC8vIFRPRE8gcmVwbGFjZSB3aXRoIEZ1bmN0aW9uQ29udHJvbGxlclxuICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICdTYXZlJztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnYnV0dG9uJyk7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ3NhdmUnKTtcblxuICAgIHZhciBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGJ1dHRvbjIuaW5uZXJIVE1MID0gJ05ldyc7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjIsICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ3NhdmUtYXMnKTtcblxuICAgIHZhciBidXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGJ1dHRvbjMuaW5uZXJIVE1MID0gJ1JldmVydCc7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjMsICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMywgJ3JldmVydCcpO1xuXG4gICAgdmFyIHNlbGVjdCA9IGd1aS5fX3ByZXNldF9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcblxuICAgIGlmIChndWkubG9hZCAmJiBndWkubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgIGNvbW1vbi5lYWNoKGd1aS5sb2FkLnJlbWVtYmVyZWQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgYWRkUHJlc2V0T3B0aW9uKGd1aSwga2V5LCBrZXkgPT0gZ3VpLnByZXNldCk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBkb20uYmluZChzZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblxuXG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0uaW5uZXJIVE1MID0gZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGd1aS5wcmVzZXQgPSB0aGlzLnZhbHVlO1xuXG4gICAgfSk7XG5cbiAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZ2VhcnMpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24yKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMyk7XG5cbiAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuXG4gICAgICB2YXIgc2F2ZUxvY2FsbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctc2F2ZS1sb2NhbGx5Jyk7XG4gICAgICB2YXIgZXhwbGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1leHBsYWluJyk7XG5cbiAgICAgIHNhdmVMb2NhbGx5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICB2YXIgbG9jYWxTdG9yYWdlQ2hlY2tCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbG9jYWwtc3RvcmFnZScpO1xuXG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksICdpc0xvY2FsJykpID09PSAndHJ1ZScpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlQ2hlY2tCb3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hvd0hpZGVFeHBsYWluKCkge1xuICAgICAgICBleHBsYWluLnN0eWxlLmRpc3BsYXkgPSBndWkudXNlTG9jYWxTdG9yYWdlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgIH1cblxuICAgICAgc2hvd0hpZGVFeHBsYWluKCk7XG5cbiAgICAgIC8vIFRPRE86IFVzZSBhIGJvb2xlYW4gY29udHJvbGxlciwgZm9vbCFcbiAgICAgIGRvbS5iaW5kKGxvY2FsU3RvcmFnZUNoZWNrQm94LCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGd1aS51c2VMb2NhbFN0b3JhZ2UgPSAhZ3VpLnVzZUxvY2FsU3RvcmFnZTtcbiAgICAgICAgc2hvd0hpZGVFeHBsYWluKCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIHZhciBuZXdDb25zdHJ1Y3RvclRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLW5ldy1jb25zdHJ1Y3RvcicpO1xuXG4gICAgZG9tLmJpbmQobmV3Q29uc3RydWN0b3JUZXh0QXJlYSwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5tZXRhS2V5ICYmIChlLndoaWNoID09PSA2NyB8fCBlLmtleUNvZGUgPT0gNjcpKSB7XG4gICAgICAgIFNBVkVfRElBTE9HVUUuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoZ2VhcnMsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeShndWkuZ2V0U2F2ZU9iamVjdCgpLCB1bmRlZmluZWQsIDIpO1xuICAgICAgU0FWRV9ESUFMT0dVRS5zaG93KCk7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmZvY3VzKCk7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLnNlbGVjdCgpO1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGd1aS5zYXZlKCk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24yLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwcmVzZXROYW1lID0gcHJvbXB0KCdFbnRlciBhIG5ldyBwcmVzZXQgbmFtZS4nKTtcbiAgICAgIGlmIChwcmVzZXROYW1lKSBndWkuc2F2ZUFzKHByZXNldE5hbWUpO1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoYnV0dG9uMywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBndWkucmV2ZXJ0KCk7XG4gICAgfSk7XG5cbi8vICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24yKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUmVzaXplSGFuZGxlKGd1aSkge1xuXG4gICAgZ3VpLl9fcmVzaXplX2hhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29tbW9uLmV4dGVuZChndWkuX19yZXNpemVfaGFuZGxlLnN0eWxlLCB7XG5cbiAgICAgIHdpZHRoOiAnNnB4JyxcbiAgICAgIG1hcmdpbkxlZnQ6ICctM3B4JyxcbiAgICAgIGhlaWdodDogJzIwMHB4JyxcbiAgICAgIGN1cnNvcjogJ2V3LXJlc2l6ZScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuLy8gICAgICBib3JkZXI6ICcxcHggc29saWQgYmx1ZSdcblxuICAgIH0pO1xuXG4gICAgdmFyIHBtb3VzZVg7XG5cbiAgICBkb20uYmluZChndWkuX19yZXNpemVfaGFuZGxlLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcbiAgICBkb20uYmluZChndWkuX19jbG9zZUJ1dHRvbiwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XG5cbiAgICBndWkuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZ3VpLl9fcmVzaXplX2hhbmRsZSwgZ3VpLmRvbUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgZnVuY3Rpb24gZHJhZ1N0YXJ0KGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBwbW91c2VYID0gZS5jbGllbnRYO1xuXG4gICAgICBkb20uYWRkQ2xhc3MoZ3VpLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19EUkFHKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZyhlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgZ3VpLndpZHRoICs9IHBtb3VzZVggLSBlLmNsaWVudFg7XG4gICAgICBndWkub25SZXNpemUoKTtcbiAgICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdTdG9wKCkge1xuXG4gICAgICBkb20ucmVtb3ZlQ2xhc3MoZ3VpLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19EUkFHKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBkcmFnU3RvcCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFdpZHRoKGd1aSwgdykge1xuICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgLy8gQXV0byBwbGFjZWQgc2F2ZS1yb3dzIGFyZSBwb3NpdGlvbiBmaXhlZCwgc28gd2UgaGF2ZSB0b1xuICAgIC8vIHNldCB0aGUgd2lkdGggbWFudWFsbHkgaWYgd2Ugd2FudCBpdCB0byBibGVlZCB0byB0aGUgZWRnZVxuICAgIGlmIChndWkuX19zYXZlX3JvdyAmJiBndWkuYXV0b1BsYWNlKSB7XG4gICAgICBndWkuX19zYXZlX3Jvdy5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIH1pZiAoZ3VpLl9fY2xvc2VCdXR0b24pIHtcbiAgICAgIGd1aS5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFByZXNldChndWksIHVzZUluaXRpYWxWYWx1ZXMpIHtcblxuICAgIHZhciB0b1JldHVybiA9IHt9O1xuXG4gICAgLy8gRm9yIGVhY2ggb2JqZWN0IEknbSByZW1lbWJlcmluZ1xuICAgIGNvbW1vbi5lYWNoKGd1aS5fX3JlbWVtYmVyZWRPYmplY3RzLCBmdW5jdGlvbih2YWwsIGluZGV4KSB7XG5cbiAgICAgIHZhciBzYXZlZF92YWx1ZXMgPSB7fTtcblxuICAgICAgLy8gVGhlIGNvbnRyb2xsZXJzIEkndmUgbWFkZSBmb3IgdGhjb21tb24uaXNPYmplY3QgYnkgcHJvcGVydHlcbiAgICAgIHZhciBjb250cm9sbGVyX21hcCA9XG4gICAgICAgICAgZ3VpLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW2luZGV4XTtcblxuICAgICAgLy8gUmVtZW1iZXIgZWFjaCB2YWx1ZSBmb3IgZWFjaCBwcm9wZXJ0eVxuICAgICAgY29tbW9uLmVhY2goY29udHJvbGxlcl9tYXAsIGZ1bmN0aW9uKGNvbnRyb2xsZXIsIHByb3BlcnR5KSB7XG4gICAgICAgIHNhdmVkX3ZhbHVlc1twcm9wZXJ0eV0gPSB1c2VJbml0aWFsVmFsdWVzID8gY29udHJvbGxlci5pbml0aWFsVmFsdWUgOiBjb250cm9sbGVyLmdldFZhbHVlKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU2F2ZSB0aGUgdmFsdWVzIGZvciB0aGNvbW1vbi5pc09iamVjdFxuICAgICAgdG9SZXR1cm5baW5kZXhdID0gc2F2ZWRfdmFsdWVzO1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFByZXNldE9wdGlvbihndWksIG5hbWUsIHNldFNlbGVjdGVkKSB7XG4gICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdC5pbm5lckhUTUwgPSBuYW1lO1xuICAgIG9wdC52YWx1ZSA9IG5hbWU7XG4gICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xuICAgIGlmIChzZXRTZWxlY3RlZCkge1xuICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGggLSAxO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFByZXNldFNlbGVjdEluZGV4KGd1aSkge1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKGd1aS5fX3ByZXNldF9zZWxlY3RbaW5kZXhdLnZhbHVlID09IGd1aS5wcmVzZXQpIHtcbiAgICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFya1ByZXNldE1vZGlmaWVkKGd1aSwgbW9kaWZpZWQpIHtcbiAgICB2YXIgb3B0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdFtndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xuLy8gICAgY29uc29sZS5sb2coJ21hcmsnLCBtb2RpZmllZCwgb3B0KTtcbiAgICBpZiAobW9kaWZpZWQpIHtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBvcHQudmFsdWUgKyBcIipcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5cyhjb250cm9sbGVyQXJyYXkpIHtcblxuXG4gICAgaWYgKGNvbnRyb2xsZXJBcnJheS5sZW5ndGggIT0gMCkge1xuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIGNvbW1vbi5lYWNoKGNvbnRyb2xsZXJBcnJheSwgZnVuY3Rpb24oYykge1xuICAgICAgYy51cGRhdGVEaXNwbGF5KCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHJldHVybiBHVUk7XG5cbn0pKGRhdC51dGlscy5jc3MsXG5cIjxkaXYgaWQ9XFxcImRnLXNhdmVcXFwiIGNsYXNzPVxcXCJkZyBkaWFsb2d1ZVxcXCI+XFxuXFxuICBIZXJlJ3MgdGhlIG5ldyBsb2FkIHBhcmFtZXRlciBmb3IgeW91ciA8Y29kZT5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3I6XFxuXFxuICA8dGV4dGFyZWEgaWQ9XFxcImRnLW5ldy1jb25zdHJ1Y3RvclxcXCI+PC90ZXh0YXJlYT5cXG5cXG4gIDxkaXYgaWQ9XFxcImRnLXNhdmUtbG9jYWxseVxcXCI+XFxuXFxuICAgIDxpbnB1dCBpZD1cXFwiZGctbG9jYWwtc3RvcmFnZVxcXCIgdHlwZT1cXFwiY2hlY2tib3hcXFwiLz4gQXV0b21hdGljYWxseSBzYXZlXFxuICAgIHZhbHVlcyB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IG9uIGV4aXQuXFxuXFxuICAgIDxkaXYgaWQ9XFxcImRnLWxvY2FsLWV4cGxhaW5cXFwiPlRoZSB2YWx1ZXMgc2F2ZWQgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiB3aWxsXFxuICAgICAgb3ZlcnJpZGUgdGhvc2UgcGFzc2VkIHRvIDxjb2RlPmRhdC5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3IuIFRoaXMgbWFrZXMgaXRcXG4gICAgICBlYXNpZXIgdG8gd29yayBpbmNyZW1lbnRhbGx5LCBidXQgPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBpcyBmcmFnaWxlLFxcbiAgICAgIGFuZCB5b3VyIGZyaWVuZHMgbWF5IG5vdCBzZWUgdGhlIHNhbWUgdmFsdWVzIHlvdSBkby5cXG4gICAgICBcXG4gICAgPC9kaXY+XFxuICAgIFxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XCIsXG5cIi5kZyB1bHtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7Y2xlYXI6Ym90aH0uZGcuYWN7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjA7ei1pbmRleDowfS5kZzpub3QoLmFjKSAubWFpbntvdmVyZmxvdzpoaWRkZW59LmRnLm1haW57LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyO3RyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcn0uZGcubWFpbi50YWxsZXItdGhhbi13aW5kb3d7b3ZlcmZsb3cteTphdXRvfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvdyAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MTttYXJnaW4tdG9wOi0xcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgIzJjMmMyY30uZGcubWFpbiB1bC5jbG9zZWQgLmNsb3NlLWJ1dHRvbntvcGFjaXR5OjEgIWltcG9ydGFudH0uZGcubWFpbjpob3ZlciAuY2xvc2UtYnV0dG9uLC5kZy5tYWluIC5jbG9zZS1idXR0b24uZHJhZ3tvcGFjaXR5OjF9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbnstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstby10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xpbmUtaGVpZ2h0OjE5cHg7aGVpZ2h0OjIwcHg7Y3Vyc29yOnBvaW50ZXI7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjojMDAwfS5kZy5tYWluIC5jbG9zZS1idXR0b246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMTExfS5kZy5he2Zsb2F0OnJpZ2h0O21hcmdpbi1yaWdodDoxNXB4O292ZXJmbG93LXg6aGlkZGVufS5kZy5hLmhhcy1zYXZlIHVse21hcmdpbi10b3A6MjdweH0uZGcuYS5oYXMtc2F2ZSB1bC5jbG9zZWR7bWFyZ2luLXRvcDowfS5kZy5hIC5zYXZlLXJvd3twb3NpdGlvbjpmaXhlZDt0b3A6MDt6LWluZGV4OjEwMDJ9LmRnIGxpey13ZWJraXQtdHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0fS5kZyBsaTpub3QoLmZvbGRlcil7Y3Vyc29yOmF1dG87aGVpZ2h0OjI3cHg7bGluZS1oZWlnaHQ6MjdweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowIDRweCAwIDVweH0uZGcgbGkuZm9sZGVye3BhZGRpbmc6MDtib3JkZXItbGVmdDo0cHggc29saWQgcmdiYSgwLDAsMCwwKX0uZGcgbGkudGl0bGV7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6LTRweH0uZGcgLmNsb3NlZCBsaTpub3QoLnRpdGxlKSwuZGcgLmNsb3NlZCB1bCBsaSwuZGcgLmNsb3NlZCB1bCBsaSA+ICp7aGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuO2JvcmRlcjowfS5kZyAuY3J7Y2xlYXI6Ym90aDtwYWRkaW5nLWxlZnQ6M3B4O2hlaWdodDoyN3B4fS5kZyAucHJvcGVydHktbmFtZXtjdXJzb3I6ZGVmYXVsdDtmbG9hdDpsZWZ0O2NsZWFyOmxlZnQ7d2lkdGg6NDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzfS5kZyAuY3tmbG9hdDpsZWZ0O3dpZHRoOjYwJX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XXtib3JkZXI6MDttYXJnaW4tdG9wOjRweDtwYWRkaW5nOjNweDt3aWR0aDoxMDAlO2Zsb2F0OnJpZ2h0fS5kZyAuaGFzLXNsaWRlciBpbnB1dFt0eXBlPXRleHRde3dpZHRoOjMwJTttYXJnaW4tbGVmdDowfS5kZyAuc2xpZGVye2Zsb2F0OmxlZnQ7d2lkdGg6NjYlO21hcmdpbi1sZWZ0Oi01cHg7bWFyZ2luLXJpZ2h0OjA7aGVpZ2h0OjE5cHg7bWFyZ2luLXRvcDo0cHh9LmRnIC5zbGlkZXItZmd7aGVpZ2h0OjEwMCV9LmRnIC5jIGlucHV0W3R5cGU9Y2hlY2tib3hde21hcmdpbi10b3A6OXB4fS5kZyAuYyBzZWxlY3R7bWFyZ2luLXRvcDo1cHh9LmRnIC5jci5mdW5jdGlvbiwuZGcgLmNyLmZ1bmN0aW9uIC5wcm9wZXJ0eS1uYW1lLC5kZyAuY3IuZnVuY3Rpb24gKiwuZGcgLmNyLmJvb2xlYW4sLmRnIC5jci5ib29sZWFuICp7Y3Vyc29yOnBvaW50ZXJ9LmRnIC5zZWxlY3RvcntkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLWxlZnQ6LTlweDttYXJnaW4tdG9wOjIzcHg7ei1pbmRleDoxMH0uZGcgLmM6aG92ZXIgLnNlbGVjdG9yLC5kZyAuc2VsZWN0b3IuZHJhZ3tkaXNwbGF5OmJsb2NrfS5kZyBsaS5zYXZlLXJvd3twYWRkaW5nOjB9LmRnIGxpLnNhdmUtcm93IC5idXR0b257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowcHggNnB4fS5kZy5kaWFsb2d1ZXtiYWNrZ3JvdW5kLWNvbG9yOiMyMjI7d2lkdGg6NDYwcHg7cGFkZGluZzoxNXB4O2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE1cHh9I2RnLW5ldy1jb25zdHJ1Y3RvcntwYWRkaW5nOjEwcHg7Y29sb3I6IzIyMjtmb250LWZhbWlseTpNb25hY28sIG1vbm9zcGFjZTtmb250LXNpemU6MTBweDtib3JkZXI6MDtyZXNpemU6bm9uZTtib3gtc2hhZG93Omluc2V0IDFweCAxcHggMXB4ICM4ODg7d29yZC13cmFwOmJyZWFrLXdvcmQ7bWFyZ2luOjEycHggMDtkaXNwbGF5OmJsb2NrO3dpZHRoOjQ0MHB4O292ZXJmbG93LXk6c2Nyb2xsO2hlaWdodDoxMDBweDtwb3NpdGlvbjpyZWxhdGl2ZX0jZGctbG9jYWwtZXhwbGFpbntkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MTdweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiMzMzM7cGFkZGluZzo4cHg7bWFyZ2luLXRvcDoxMHB4fSNkZy1sb2NhbC1leHBsYWluIGNvZGV7Zm9udC1zaXplOjEwcHh9I2RhdC1ndWktc2F2ZS1sb2NhbGx5e2Rpc3BsYXk6bm9uZX0uZGd7Y29sb3I6I2VlZTtmb250OjExcHggJ0x1Y2lkYSBHcmFuZGUnLCBzYW5zLXNlcmlmO3RleHQtc2hhZG93OjAgLTFweCAwICMxMTF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFye3dpZHRoOjVweDtiYWNrZ3JvdW5kOiMxYTFhMWF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lcntoZWlnaHQ6MDtkaXNwbGF5Om5vbmV9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JvcmRlci1yYWRpdXM6NXB4O2JhY2tncm91bmQ6IzY3Njc2N30uZGcgbGk6bm90KC5mb2xkZXIpe2JhY2tncm91bmQ6IzFhMWExYTtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjMmMyYzJjfS5kZyBsaS5zYXZlLXJvd3tsaW5lLWhlaWdodDoyNXB4O2JhY2tncm91bmQ6I2RhZDVjYjtib3JkZXI6MH0uZGcgbGkuc2F2ZS1yb3cgc2VsZWN0e21hcmdpbi1sZWZ0OjVweDt3aWR0aDoxMDhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbnttYXJnaW4tbGVmdDo1cHg7bWFyZ2luLXRvcDoxcHg7Ym9yZGVyLXJhZGl1czoycHg7Zm9udC1zaXplOjlweDtsaW5lLWhlaWdodDo3cHg7cGFkZGluZzo0cHggNHB4IDVweCA0cHg7YmFja2dyb3VuZDojYzViZGFkO2NvbG9yOiNmZmY7dGV4dC1zaGFkb3c6MCAxcHggMCAjYjBhNThmO2JveC1zaGFkb3c6MCAtMXB4IDAgI2IwYTU4ZjtjdXJzb3I6cG9pbnRlcn0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbi5nZWFyc3tiYWNrZ3JvdW5kOiNjNWJkYWQgdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQXNBQUFBTkNBWUFBQUIvOVpRN0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBUUpKUkVGVWVOcGlZS0FVL1AvL1B3R0lDL0FwQ0FCaUJTQVcrSThBQ2xBY2dLeFE0VDlob01BRVVyeHgyUVNHTjYrZWdEWCsvdldUNGU3TjgyQU1Zb1BBeC9ldndXb1lvU1liQUNYMnM3S3hDeHpjc2V6RGgzZXZGb0RFQllURUVxeWNnZ1dBekE5QXVVU1FRZ2VZUGE5ZlB2Ni9ZV20vQWN4NUlQYjd0eS9mdytRWmJsdzY3dkRzOFIwWUh5UWhnT2J4K3lBSmtCcW1HNWRQUERoMWFQT0dSL2V1Z1cwRzR2bElvVElmeUZjQStRZWtoaEhKaFBkUXhiaUFJZ3VNQlRRWnJQRDcxMDhNNnJvV1lERlFpSUFBdjZBb3cvMWJGd1hnaXMrZjJMVUF5bndvSWFOY3o4WE54M0RsN01FSlVER1FweDlndFE4WUN1ZUIrRDI2T0VDQUFRRGFkdDdlNDZENDJRQUFBQUJKUlU1RXJrSmdnZz09KSAycHggMXB4IG5vLXJlcGVhdDtoZWlnaHQ6N3B4O3dpZHRoOjhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiYWIxOWU7Ym94LXNoYWRvdzowIC0xcHggMCAjYjBhNThmfS5kZyBsaS5mb2xkZXJ7Ym9yZGVyLWJvdHRvbTowfS5kZyBsaS50aXRsZXtwYWRkaW5nLWxlZnQ6MTZweDtiYWNrZ3JvdW5kOiMwMDAgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsSStoS2dGeG9DZ0FPdz09KSA2cHggMTBweCBuby1yZXBlYXQ7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpfS5kZyAuY2xvc2VkIGxpLnRpdGxle2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsR0lXcU1DYldBRUFPdz09KX0uZGcgLmNyLmJvb2xlYW57Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICM4MDY3ODd9LmRnIC5jci5mdW5jdGlvbntib3JkZXItbGVmdDozcHggc29saWQgI2U2MWQ1Zn0uZGcgLmNyLm51bWJlcntib3JkZXItbGVmdDozcHggc29saWQgIzJmYTFkNn0uZGcgLmNyLm51bWJlciBpbnB1dFt0eXBlPXRleHRde2NvbG9yOiMyZmExZDZ9LmRnIC5jci5zdHJpbmd7Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICMxZWQzNmZ9LmRnIC5jci5zdHJpbmcgaW5wdXRbdHlwZT10ZXh0XXtjb2xvcjojMWVkMzZmfS5kZyAuY3IuZnVuY3Rpb246aG92ZXIsLmRnIC5jci5ib29sZWFuOmhvdmVye2JhY2tncm91bmQ6IzExMX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XXtiYWNrZ3JvdW5kOiMzMDMwMzA7b3V0bGluZTpub25lfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmhvdmVye2JhY2tncm91bmQ6IzNjM2MzY30uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpmb2N1c3tiYWNrZ3JvdW5kOiM0OTQ5NDk7Y29sb3I6I2ZmZn0uZGcgLmMgLnNsaWRlcntiYWNrZ3JvdW5kOiMzMDMwMzA7Y3Vyc29yOmV3LXJlc2l6ZX0uZGcgLmMgLnNsaWRlci1mZ3tiYWNrZ3JvdW5kOiMyZmExZDZ9LmRnIC5jIC5zbGlkZXI6aG92ZXJ7YmFja2dyb3VuZDojM2MzYzNjfS5kZyAuYyAuc2xpZGVyOmhvdmVyIC5zbGlkZXItZmd7YmFja2dyb3VuZDojNDRhYmRhfVxcblwiLFxuZGF0LmNvbnRyb2xsZXJzLmZhY3RvcnkgPSAoZnVuY3Rpb24gKE9wdGlvbkNvbnRyb2xsZXIsIE51bWJlckNvbnRyb2xsZXJCb3gsIE51bWJlckNvbnRyb2xsZXJTbGlkZXIsIFN0cmluZ0NvbnRyb2xsZXIsIEZ1bmN0aW9uQ29udHJvbGxlciwgQm9vbGVhbkNvbnRyb2xsZXIsIGNvbW1vbikge1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgICAgIHZhciBpbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgICAgIC8vIFByb3ZpZGluZyBvcHRpb25zP1xuICAgICAgICBpZiAoY29tbW9uLmlzQXJyYXkoYXJndW1lbnRzWzJdKSB8fCBjb21tb24uaXNPYmplY3QoYXJndW1lbnRzWzJdKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgT3B0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCBhcmd1bWVudHNbMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJvdmlkaW5nIGEgbWFwP1xuXG4gICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIoaW5pdGlhbFZhbHVlKSkge1xuXG4gICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihhcmd1bWVudHNbMl0pICYmIGNvbW1vbi5pc051bWJlcihhcmd1bWVudHNbM10pKSB7XG5cbiAgICAgICAgICAgIC8vIEhhcyBtaW4gYW5kIG1heC5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTnVtYmVyQ29udHJvbGxlclNsaWRlcihvYmplY3QsIHByb3BlcnR5LCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJCb3gob2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IGFyZ3VtZW50c1syXSwgbWF4OiBhcmd1bWVudHNbM10gfSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNTdHJpbmcoaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgU3RyaW5nQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNGdW5jdGlvbihpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0Jvb2xlYW4oaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgQm9vbGVhbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSkoZGF0LmNvbnRyb2xsZXJzLk9wdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlckJveCxcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyU2xpZGVyLFxuZGF0LmNvbnRyb2xsZXJzLlN0cmluZ0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIHRleHQgaW5wdXQgdG8gYWx0ZXIgdGhlIHN0cmluZyBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgU3RyaW5nQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIFN0cmluZ0NvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXl1cCcsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2lucHV0LnZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19pbnB1dCk7XG5cbiAgfTtcblxuICBTdHJpbmdDb250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIFN0cmluZ0NvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBTdG9wcyB0aGUgY2FyZXQgZnJvbSBtb3Zpbmcgb24gYWNjb3VudCBvZjpcbiAgICAgICAgICAvLyBrZXl1cCAtPiBzZXRWYWx1ZSAtPiB1cGRhdGVEaXNwbGF5XG4gICAgICAgICAgaWYgKCFkb20uaXNBY3RpdmUodGhpcy5fX2lucHV0KSkge1xuICAgICAgICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gU3RyaW5nQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIFN0cmluZ0NvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb250cm9sbGVycy5GdW5jdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkJvb2xlYW5Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkZ1bmN0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94LFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJTbGlkZXIsXG5kYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5Db2xvckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgQ29sb3IsIGludGVycHJldCwgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIENvbG9yQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB0aGlzLl9fY29sb3IgPSBuZXcgQ29sb3IodGhpcy5nZXRWYWx1ZSgpKTtcbiAgICB0aGlzLl9fdGVtcCA9IG5ldyBDb2xvcigwKTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGRvbS5tYWtlU2VsZWN0YWJsZSh0aGlzLmRvbUVsZW1lbnQsIGZhbHNlKTtcblxuICAgIHRoaXMuX19zZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5jbGFzc05hbWUgPSAnc2VsZWN0b3InO1xuXG4gICAgdGhpcy5fX3NhdHVyYXRpb25fZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZC5jbGFzc05hbWUgPSAnc2F0dXJhdGlvbi1maWVsZCc7XG5cbiAgICB0aGlzLl9fZmllbGRfa25vYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19maWVsZF9rbm9iLmNsYXNzTmFtZSA9ICdmaWVsZC1rbm9iJztcbiAgICB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgPSAnMnB4IHNvbGlkICc7XG5cbiAgICB0aGlzLl9faHVlX2tub2IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9faHVlX2tub2IuY2xhc3NOYW1lID0gJ2h1ZS1rbm9iJztcblxuICAgIHRoaXMuX19odWVfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9faHVlX2ZpZWxkLmNsYXNzTmFtZSA9ICdodWUtZmllbGQnO1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyA9ICcwIDFweCAxcHggJztcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgeyAvLyBvbiBlbnRlclxuICAgICAgICBvbkJsdXIuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX3NlbGVjdG9yLCAnbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICBkb21cbiAgICAgICAgLmFkZENsYXNzKHRoaXMsICdkcmFnJylcbiAgICAgICAgLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoX3RoaXMuX19zZWxlY3RvciwgJ2RyYWcnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIHZhciB2YWx1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fc2VsZWN0b3Iuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTIycHgnLFxuICAgICAgaGVpZ2h0OiAnMTAycHgnLFxuICAgICAgcGFkZGluZzogJzNweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMjIyJyxcbiAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC4zKSdcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgd2lkdGg6ICcxMnB4JyxcbiAgICAgIGhlaWdodDogJzEycHgnLFxuICAgICAgYm9yZGVyOiB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgKyAodGhpcy5fX2NvbG9yLnYgPCAuNSA/ICcjZmZmJyA6ICcjMDAwJyksXG4gICAgICBib3hTaGFkb3c6ICcwcHggMXB4IDNweCByZ2JhKDAsMCwwLDAuNSknLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICB6SW5kZXg6IDFcbiAgICB9KTtcbiAgICBcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19odWVfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzE1cHgnLFxuICAgICAgaGVpZ2h0OiAnMnB4JyxcbiAgICAgIGJvcmRlclJpZ2h0OiAnNHB4IHNvbGlkICNmZmYnLFxuICAgICAgekluZGV4OiAxXG4gICAgfSk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEwMHB4JyxcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnM3B4JyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodmFsdWVfZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xuICAgIH0pO1xuICAgIFxuICAgIGxpbmVhckdyYWRpZW50KHZhbHVlX2ZpZWxkLCAndG9wJywgJ3JnYmEoMCwwLDAsMCknLCAnIzAwMCcpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faHVlX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzE1cHgnLFxuICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgIzU1NScsXG4gICAgICBjdXJzb3I6ICducy1yZXNpemUnXG4gICAgfSk7XG5cbiAgICBodWVHcmFkaWVudCh0aGlzLl9faHVlX2ZpZWxkKTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2lucHV0LnN0eWxlLCB7XG4gICAgICBvdXRsaW5lOiAnbm9uZScsXG4vLyAgICAgIHdpZHRoOiAnMTIwcHgnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbi8vICAgICAgcGFkZGluZzogJzRweCcsXG4vLyAgICAgIG1hcmdpbkJvdHRvbTogJzZweCcsXG4gICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgdGV4dFNoYWRvdzogdGhpcy5fX2lucHV0X3RleHRTaGFkb3cgKyAncmdiYSgwLDAsMCwwLjcpJ1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xuICAgIGRvbS5iaW5kKHRoaXMuX19maWVsZF9rbm9iLCAnbW91c2Vkb3duJywgZmllbGREb3duKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19odWVfZmllbGQsICdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBzZXRIKGUpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0SCk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kSCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBmaWVsZERvd24oZSkge1xuICAgICAgc2V0U1YoZSk7XG4gICAgICAvLyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdub25lJztcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRTVik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5iaW5kU1YoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZFNWKTtcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIHZhciBpID0gaW50ZXJwcmV0KHRoaXMudmFsdWUpO1xuICAgICAgaWYgKGkgIT09IGZhbHNlKSB7XG4gICAgICAgIF90aGlzLl9fY29sb3IuX19zdGF0ZSA9IGk7XG4gICAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBfdGhpcy5fX2NvbG9yLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5iaW5kSCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0SCk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRIKTtcbiAgICB9XG5cbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZC5hcHBlbmRDaGlsZCh2YWx1ZV9maWVsZCk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKHRoaXMuX19maWVsZF9rbm9iKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5hcHBlbmRDaGlsZCh0aGlzLl9faHVlX2ZpZWxkKTtcbiAgICB0aGlzLl9faHVlX2ZpZWxkLmFwcGVuZENoaWxkKHRoaXMuX19odWVfa25vYik7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3NlbGVjdG9yKTtcblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgZnVuY3Rpb24gc2V0U1YoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciB3ID0gZG9tLmdldFdpZHRoKF90aGlzLl9fc2F0dXJhdGlvbl9maWVsZCk7XG4gICAgICB2YXIgbyA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICAgIHZhciBzID0gKGUuY2xpZW50WCAtIG8ubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCkgLyB3O1xuICAgICAgdmFyIHYgPSAxIC0gKGUuY2xpZW50WSAtIG8udG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApIC8gdztcblxuICAgICAgaWYgKHYgPiAxKSB2ID0gMTtcbiAgICAgIGVsc2UgaWYgKHYgPCAwKSB2ID0gMDtcblxuICAgICAgaWYgKHMgPiAxKSBzID0gMTtcbiAgICAgIGVsc2UgaWYgKHMgPCAwKSBzID0gMDtcblxuICAgICAgX3RoaXMuX19jb2xvci52ID0gdjtcbiAgICAgIF90aGlzLl9fY29sb3IucyA9IHM7XG5cbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcblxuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRIKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgcyA9IGRvbS5nZXRIZWlnaHQoX3RoaXMuX19odWVfZmllbGQpO1xuICAgICAgdmFyIG8gPSBkb20uZ2V0T2Zmc2V0KF90aGlzLl9faHVlX2ZpZWxkKTtcbiAgICAgIHZhciBoID0gMSAtIChlLmNsaWVudFkgLSBvLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wKSAvIHM7XG5cbiAgICAgIGlmIChoID4gMSkgaCA9IDE7XG4gICAgICBlbHNlIGlmIChoIDwgMCkgaCA9IDA7XG5cbiAgICAgIF90aGlzLl9fY29sb3IuaCA9IGggKiAzNjA7XG5cbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gIH07XG5cbiAgQ29sb3JDb250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIENvbG9yQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIGkgPSBpbnRlcnByZXQodGhpcy5nZXRWYWx1ZSgpKTtcblxuICAgICAgICAgIGlmIChpICE9PSBmYWxzZSkge1xuXG4gICAgICAgICAgICB2YXIgbWlzbWF0Y2ggPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIG1pc21hdGNoIG9uIHRoZSBpbnRlcnByZXRlZCB2YWx1ZS5cblxuICAgICAgICAgICAgY29tbW9uLmVhY2goQ29sb3IuQ09NUE9ORU5UUywgZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgIGlmICghY29tbW9uLmlzVW5kZWZpbmVkKGlbY29tcG9uZW50XSkgJiZcbiAgICAgICAgICAgICAgICAgICFjb21tb24uaXNVbmRlZmluZWQodGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkgJiZcbiAgICAgICAgICAgICAgICAgIGlbY29tcG9uZW50XSAhPT0gdGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkge1xuICAgICAgICAgICAgICAgIG1pc21hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307IC8vIGJyZWFrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBJZiBub3RoaW5nIGRpdmVyZ2VzLCB3ZSBrZWVwIG91ciBwcmV2aW91cyB2YWx1ZXNcbiAgICAgICAgICAgIC8vIGZvciBzdGF0ZWZ1bG5lc3MsIG90aGVyd2lzZSB3ZSByZWNhbGN1bGF0ZSBmcmVzaFxuICAgICAgICAgICAgaWYgKG1pc21hdGNoKSB7XG4gICAgICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2NvbG9yLl9fc3RhdGUsIGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fdGVtcC5fX3N0YXRlLCB0aGlzLl9fY29sb3IuX19zdGF0ZSk7XG5cbiAgICAgICAgICB0aGlzLl9fdGVtcC5hID0gMTtcblxuICAgICAgICAgIHZhciBmbGlwID0gKHRoaXMuX19jb2xvci52IDwgLjUgfHwgdGhpcy5fX2NvbG9yLnMgPiAuNSkgPyAyNTUgOiAwO1xuICAgICAgICAgIHZhciBfZmxpcCA9IDI1NSAtIGZsaXA7XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19maWVsZF9rbm9iLnN0eWxlLCB7XG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAxMDAgKiB0aGlzLl9fY29sb3IucyAtIDcgKyAncHgnLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAxMDAgKiAoMSAtIHRoaXMuX19jb2xvci52KSAtIDcgKyAncHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9fdGVtcC50b1N0cmluZygpLFxuICAgICAgICAgICAgYm9yZGVyOiB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgKyAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKycpJ1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5fX2h1ZV9rbm9iLnN0eWxlLm1hcmdpblRvcCA9ICgxIC0gdGhpcy5fX2NvbG9yLmggLyAzNjApICogMTAwICsgJ3B4J1xuXG4gICAgICAgICAgdGhpcy5fX3RlbXAucyA9IDE7XG4gICAgICAgICAgdGhpcy5fX3RlbXAudiA9IDE7XG5cbiAgICAgICAgICBsaW5lYXJHcmFkaWVudCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCwgJ2xlZnQnLCAnI2ZmZicsIHRoaXMuX190ZW1wLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faW5wdXQuc3R5bGUsIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX2NvbG9yLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBjb2xvcjogJ3JnYignICsgZmxpcCArICcsJyArIGZsaXAgKyAnLCcgKyBmbGlwICsnKScsXG4gICAgICAgICAgICB0ZXh0U2hhZG93OiB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKCcgKyBfZmxpcCArICcsJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKycsLjcpJ1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG4gIFxuICB2YXIgdmVuZG9ycyA9IFsnLW1vei0nLCctby0nLCctd2Via2l0LScsJy1tcy0nLCcnXTtcbiAgXG4gIGZ1bmN0aW9uIGxpbmVhckdyYWRpZW50KGVsZW0sIHgsIGEsIGIpIHtcbiAgICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBjb21tb24uZWFjaCh2ZW5kb3JzLCBmdW5jdGlvbih2ZW5kb3IpIHtcbiAgICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogJyArIHZlbmRvciArICdsaW5lYXItZ3JhZGllbnQoJyt4KycsICcrYSsnIDAlLCAnICsgYiArICcgMTAwJSk7ICc7XG4gICAgfSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGh1ZUdyYWRpZW50KGVsZW0pIHtcbiAgICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsICNmZjAwZmYgMTclLCAjMDAwMGZmIDM0JSwgIzAwZmZmZiA1MCUsICMwMGZmMDAgNjclLCAjZmZmZjAwIDg0JSwgI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgfVxuXG5cbiAgcmV0dXJuIENvbG9yQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC5jb2xvci5Db2xvciA9IChmdW5jdGlvbiAoaW50ZXJwcmV0LCBtYXRoLCB0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLl9fc3RhdGUgPSBpbnRlcnByZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGludGVycHJldCBjb2xvciBhcmd1bWVudHMnO1xuICAgIH1cblxuICAgIHRoaXMuX19zdGF0ZS5hID0gdGhpcy5fX3N0YXRlLmEgfHwgMTtcblxuXG4gIH07XG5cbiAgQ29sb3IuQ09NUE9ORU5UUyA9IFsncicsJ2cnLCdiJywnaCcsJ3MnLCd2JywnaGV4JywnYSddO1xuXG4gIGNvbW1vbi5leHRlbmQoQ29sb3IucHJvdG90eXBlLCB7XG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcodGhpcyk7XG4gICAgfSxcblxuICAgIHRvT3JpZ2luYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5jb252ZXJzaW9uLndyaXRlKHRoaXMpO1xuICAgIH1cblxuICB9KTtcblxuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncicsIDIpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnZycsIDEpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnYicsIDApO1xuXG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdoJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdzJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICd2Jyk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2EnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5hO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHRoaXMuX19zdGF0ZS5hID0gdjtcbiAgICB9XG5cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2hleCcsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmICghdGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSEVYJykge1xuICAgICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gbWF0aC5yZ2JfdG9faGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmhleDtcblxuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gdjtcblxuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBkZWZpbmVSR0JDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnUkdCJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ1JHQicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnUkdCJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUhTVkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hTVicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSFNWJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlUkdCKGNvbG9yLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hFWCcpIHtcblxuICAgICAgY29sb3IuX19zdGF0ZVtjb21wb25lbnRdID0gbWF0aC5jb21wb25lbnRfZnJvbV9oZXgoY29sb3IuX19zdGF0ZS5oZXgsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgIH0gZWxzZSBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcblxuICAgICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLCBtYXRoLmhzdl90b19yZ2IoY29sb3IuX19zdGF0ZS5oLCBjb2xvci5fX3N0YXRlLnMsIGNvbG9yLl9fc3RhdGUudikpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgJ0NvcnJ1cHRlZCBjb2xvciBzdGF0ZSc7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlSFNWKGNvbG9yKSB7XG5cbiAgICB2YXIgcmVzdWx0ID0gbWF0aC5yZ2JfdG9faHN2KGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuXG4gICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgczogcmVzdWx0LnMsXG4gICAgICAgICAgdjogcmVzdWx0LnZcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc05hTihyZXN1bHQuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IHJlc3VsdC5oO1xuICAgIH0gZWxzZSBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLl9fc3RhdGUuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IDA7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gQ29sb3I7XG5cbn0pKGRhdC5jb2xvci5pbnRlcnByZXQsXG5kYXQuY29sb3IubWF0aCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHRtcENvbXBvbmVudDtcblxuICByZXR1cm4ge1xuXG4gICAgaHN2X3RvX3JnYjogZnVuY3Rpb24oaCwgcywgdikge1xuXG4gICAgICB2YXIgaGkgPSBNYXRoLmZsb29yKGggLyA2MCkgJSA2O1xuXG4gICAgICB2YXIgZiA9IGggLyA2MCAtIE1hdGguZmxvb3IoaCAvIDYwKTtcbiAgICAgIHZhciBwID0gdiAqICgxLjAgLSBzKTtcbiAgICAgIHZhciBxID0gdiAqICgxLjAgLSAoZiAqIHMpKTtcbiAgICAgIHZhciB0ID0gdiAqICgxLjAgLSAoKDEuMCAtIGYpICogcykpO1xuICAgICAgdmFyIGMgPSBbXG4gICAgICAgIFt2LCB0LCBwXSxcbiAgICAgICAgW3EsIHYsIHBdLFxuICAgICAgICBbcCwgdiwgdF0sXG4gICAgICAgIFtwLCBxLCB2XSxcbiAgICAgICAgW3QsIHAsIHZdLFxuICAgICAgICBbdiwgcCwgcV1cbiAgICAgIF1baGldO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiBjWzBdICogMjU1LFxuICAgICAgICBnOiBjWzFdICogMjU1LFxuICAgICAgICBiOiBjWzJdICogMjU1XG4gICAgICB9O1xuXG4gICAgfSxcblxuICAgIHJnYl90b19oc3Y6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcblxuICAgICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgICAgIGRlbHRhID0gbWF4IC0gbWluLFxuICAgICAgICAgIGgsIHM7XG5cbiAgICAgIGlmIChtYXggIT0gMCkge1xuICAgICAgICBzID0gZGVsdGEgLyBtYXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGg6IE5hTixcbiAgICAgICAgICBzOiAwLFxuICAgICAgICAgIHY6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHIgPT0gbWF4KSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2UgaWYgKGcgPT0gbWF4KSB7XG4gICAgICAgIGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgICB9XG4gICAgICBoIC89IDY7XG4gICAgICBpZiAoaCA8IDApIHtcbiAgICAgICAgaCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBoOiBoICogMzYwLFxuICAgICAgICBzOiBzLFxuICAgICAgICB2OiBtYXggLyAyNTVcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHJnYl90b19oZXg6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcbiAgICAgIHZhciBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudCgwLCAyLCByKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMSwgZyk7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDAsIGIpO1xuICAgICAgcmV0dXJuIGhleDtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50X2Zyb21faGV4OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4KSB7XG4gICAgICByZXR1cm4gKGhleCA+PiAoY29tcG9uZW50SW5kZXggKiA4KSkgJiAweEZGO1xuICAgIH0sXG5cbiAgICBoZXhfd2l0aF9jb21wb25lbnQ6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPDwgKHRtcENvbXBvbmVudCA9IGNvbXBvbmVudEluZGV4ICogOCkgfCAoaGV4ICYgfiAoMHhGRiA8PCB0bXBDb21wb25lbnQpKTtcbiAgICB9XG5cbiAgfVxuXG59KSgpLFxuZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29sb3IuaW50ZXJwcmV0LFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQudXRpbHMucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogcmVxdWlyZWpzIHZlcnNpb24gb2YgUGF1bCBJcmlzaCdzIFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgKiBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuICAgKi9cblxuICByZXR1cm4gd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgZnVuY3Rpb24oY2FsbGJhY2ssIGVsZW1lbnQpIHtcblxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcblxuICAgICAgfTtcbn0pKCksXG5kYXQuZG9tLkNlbnRlcmVkRGl2ID0gKGZ1bmN0aW9uIChkb20sIGNvbW1vbikge1xuXG5cbiAgdmFyIENlbnRlcmVkRGl2ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuOCknLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgIHpJbmRleDogJzEwMDAnLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIFdlYmtpdFRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgbGluZWFyJ1xuICAgIH0pO1xuXG4gICAgZG9tLm1ha2VGdWxsc2NyZWVuKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQpO1xuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgekluZGV4OiAnMTAwMScsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogJy13ZWJraXQtdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQsIG9wYWNpdHkgMC4ycyBsaW5lYXInXG4gICAgfSk7XG5cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBkb20uYmluZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLmhpZGUoKTtcbiAgICB9KTtcblxuXG4gIH07XG5cbiAgQ2VudGVyZWREaXYucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgXG5cblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuLy8gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICc1MiUnO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG5cbiAgICB0aGlzLmxheW91dCgpO1xuXG4gICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xuICAgIH0pO1xuXG4gIH07XG5cbiAgQ2VudGVyZWREaXYucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgaGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgaGlkZSk7XG4gICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuXG4gICAgfTtcblxuICAgIGRvbS5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgaGlkZSk7XG4gICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4vLyAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzQ4JSc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUubGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aC8yIC0gZG9tLmdldFdpZHRoKHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gd2luZG93LmlubmVySGVpZ2h0LzIgLSBkb20uZ2V0SGVpZ2h0KHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcbiAgfTtcbiAgXG4gIGZ1bmN0aW9uIGxvY2tTY3JvbGwoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG5cbiAgcmV0dXJuIENlbnRlcmVkRGl2O1xuXG59KShkYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTsiLCJjb25zdCBjb252ZXJzaW9uRmFjdG9yID0gMTgwIC8gTWF0aC5QSTtcblxudmFyIHJhZGlhblRvRGVncmVlcyA9IGZ1bmN0aW9uKHJhZGlhbikge1xuXHRyZXR1cm4gcmFkaWFuICogY29udmVyc2lvbkZhY3Rvcjtcbn1cblxudmFyIGRlZ3JlZXNUb1JhZGlhbiA9IGZ1bmN0aW9uKGRlZ3JlZXMpIHtcblx0cmV0dXJuIGRlZ3JlZXMgLyBjb252ZXJzaW9uRmFjdG9yO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgMkQgVmVjdG9yIGNsYXNzIHRoYXQgcHJvdmlkZXMgc2ltcGxlIGFsZ2VicmFpYyBmdW5jdGlvbmFsaXR5IGluIHRoZSBmb3JtXG4gKiBvZiAyRCBWZWN0b3JzLlxuICpcbiAqIFdlIHVzZSBHZXR0ZXJzL3NldHRlcnMgZm9yIGJvdGggcHJpbmNpcGxlIHByb3BlcnRpZXMgKHggJiB5KSBhcyB3ZWxsIGFzIHZpcnR1YWxcbiAqIHByb3BlcnRpZXMgKHJvdGF0aW9uLCBsZW5ndGggZXRjLikuXG4gKlxuICogQGNsYXNzIFZlY3RvclxuICogQGF1dGhvciBMaWFtIEVnYW4gPGxpYW1Ad2V0aGVjb2xsZWN0aXZlLmNvbT5cbiAqIEB2ZXJzaW9uIDAuMS4xXG4gKiBAY3JlYXRlZCBEZWMgMTksIDIwMTZcbiAqL1xuY2xhc3MgVmVjdG9yIHtcblxuXHQvKipcblx0ICogVGhlIFZlY3RvciBDbGFzcyBjb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggXHRcdFx0XHRUaGUgeCBjb29yZFxuXHQgKiBAcGFyYW0ge251bWJlcn0geSBcdFx0XHRcdFRoZSB5IGNvb3JkXG5cdCAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5KXtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSB2ZWN0b3IgY29vcmRpbmF0ZXNcbiAgICpcbiAgICogQHB1YmxpY1xuXHQgKiBAcGFyYW0ge251bWJlcn0geCBcdFx0XHRcdFRoZSB4IGNvb3JkXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB5IFx0XHRcdFx0VGhlIHkgY29vcmRcbiAgICovXG5cdHJlc2V0KHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSB2ZWN0b3Jcblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFRoZSBjbG9uZWQgdmVjdG9yXG5cdCAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBvbmUgdmVjdG9yIHRvIGFub3RoZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBhZGQgdG8gdGhpcyBvbmVcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGFkZCh2ZWN0b3IpIHtcbiAgICB0aGlzLnggKz0gdmVjdG9yLng7XG4gICAgdGhpcy55ICs9IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgYWRkcyB0aGUgdmVjdG9yIHRvIGl0IGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIGFkZCB0byB0aGlzIG9uZVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGFkZE5ldyh2ZWN0b3IpIHtcbiAgICBsZXQgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICByZXR1cm4gdi5hZGQodmVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgc2NhbGFyIHRvIHRoZSB2ZWN0b3IsIG1vZGlmeWluZyBib3RoIHRoZSB4IGFuZCB5XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGQgdG8gdGhlIHZlY3RvclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgYWRkU2NhbGFyKHNjYWxhcikge1xuICAgIHJldHVybiB0aGlzLmFkZChuZXcgVmVjdG9yKHNjYWxhciwgc2NhbGFyKSk7XG4gIH1cbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCBhZGRzIHRoZSBzY2FsYXIgdG8gaXQgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gYWRkIHRvIHRoZSB2ZWN0b3JcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBhZGRTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuYWRkU2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICAvKipcbiAgICogU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSBhbm90aGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QgZnJvbSB0aGlzIG9uZVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgc3VidHJhY3QodmVjdG9yKSB7XG4gICAgdGhpcy54IC09IHZlY3Rvci54O1xuICAgIHRoaXMueSAtPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHN1YnRyYWN0cyB0aGUgdmVjdG9yIGZyb20gaXQgaW5zdGVhZFxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7VmVjdG9yfSAgdmVjdG9yIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QgZnJvbSB0aGlzIG9uZVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHN1YnRyYWN0TmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnN1YnRyYWN0KHZlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogU3VidHJhY3RzIGEgc2NhbGFyIGZyb20gdGhlIHZlY3RvciwgbW9kaWZ5aW5nIGJvdGggdGhlIHggYW5kIHlcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIHN1YnRyYWN0IGZyb20gdGhlIHZlY3RvclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgc3VidHJhY3RTY2FsYXIoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VidHJhY3QobmV3IFZlY3RvcihzY2FsYXIsIHNjYWxhcikpO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgc3VidHJhY3RzIHRoZSBzY2FsYXIgZnJvbSBpdCBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGQgdG8gdGhlIHZlY3RvclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHN1YnRyYWN0U2NhbGFyTmV3KHNjYWxhcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LnN1YnRyYWN0U2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICAvKipcbiAgICogRGl2aWRlcyBvbmUgdmVjdG9yIGJ5IGFub3RoZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBkaXZpZGUgdGhpcyBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgZGl2aWRlKHZlY3Rvcikge1xuICAgIGlmKHZlY3Rvci54ICE9PSAwKSB7XG4gICAgICB0aGlzLnggLz0gdmVjdG9yLnhcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54ID0gMDtcbiAgICB9XG4gICAgaWYodmVjdG9yLnkgIT09IDApIHtcbiAgICAgIHRoaXMueSAvPSB2ZWN0b3IueVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnkgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIGRpdmlkZXMgaXQgYnkgdGhlIHZlY3RvciBpbnN0ZWFkXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBkaXZpZGUgdGhlIGNsb25lIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgZGl2aWRlTmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2LmRpdmlkZSh2ZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpdmlkZXMgdGhlIHZlY3RvciBieSBhIHNjYWxhci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIGRpdmlkZSBib3RoIHggYW5kIHkgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIGRpdmlkZVNjYWxhcihzY2FsYXIpIHtcbiAgICB2YXIgdiA9IG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpO1xuICAgIHJldHVybiB0aGlzLmRpdmlkZSh2KTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIGRpdmlkZXMgaXQgYnkgdGhlIHByb3ZpZGVkIHNjYWxhci5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHNjYWxhciBUaGUgc2NhbGFyIHRvIGRpdmlkZSBib3RoIHggYW5kIHkgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBkaXZpZGVTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYuZGl2aWRlU2NhbGFyKHNjYWxhcik7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbGllcyBvbmUgdmVjdG9yIGJ5IGFub3RoZXIuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtWZWN0b3J9ICB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGlzIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBtdWx0aXBseSh2ZWN0b3IpIHtcbiAgICB0aGlzLnggKj0gdmVjdG9yLng7XG4gICAgdGhpcy55ICo9IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgbXVsdGlwbGllcyBpdCBieSB0aGUgdmVjdG9yIGluc3RlYWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge1ZlY3Rvcn0gIHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IHRoZSBjbG9uZSBieVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIG11bHRpcGx5TmV3KHZlY3Rvcikge1xuICAgIGxldCB2ID0gdGhpcy5jbG9uZSgpO1xuICAgIHJldHVybiB2Lm11bHRpcGx5KHZlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbGllcyB0aGUgdmVjdG9yIGJ5IGEgc2NhbGFyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgYm90aCB4IGFuZCB5IGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICBtdWx0aXBseVNjYWxhcihzY2FsYXIpIHtcbiAgICB2YXIgdiA9IG5ldyBWZWN0b3Ioc2NhbGFyLCBzY2FsYXIpO1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KHYpO1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgbXVsdGlwbGllcyBpdCBieSB0aGUgcHJvdmlkZWQgc2NhbGFyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgc2NhbGFyIFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgYm90aCB4IGFuZCB5IGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cbiAgbXVsdGlwbHlTY2FsYXJOZXcoc2NhbGFyKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYubXVsdGlwbHlTY2FsYXIoc2NhbGFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI211bHRpcGx5U2NhbGFyX19hbmNob3IgbXVsdGlwbHlTY2FsYXJ9XG4gICAqL1xuICBzY2FsZShzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcihzY2FsYXIpO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI211bHRpcGx5U2NhbGFyTmV3X19hbmNob3IgbXVsdGlwbHlTY2FsYXJOZXd9XG4gICAqL1xuICBzY2FsZU5ldyhzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhck5ldyhzY2FsYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSB2ZWNvciBieSBhIGdpdmVuIGFtb3VudCwgcHJvdmlkZWQgaW4gcmFkaWFucy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHJhZGlhbiBUaGUgYW5nbGUsIGluIHJhZGlhbnMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICByb3RhdGUocmFkaWFuKSB7XG4gIFx0dmFyIHggPSAodGhpcy54ICogTWF0aC5jb3MocmFkaWFuKSkgLSAodGhpcy55ICogTWF0aC5zaW4ocmFkaWFuKSk7XG4gIFx0dmFyIHkgPSAodGhpcy54ICogTWF0aC5zaW4ocmFkaWFuKSkgKyAodGhpcy55ICogTWF0aC5jb3MocmFkaWFuKSk7XG5cblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cbiAgXHRyZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHJvdGF0ZXMgaXQgYnkgdGhlIHN1cHBsaWVkIHJhZGlhbiB2YWx1ZVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgcmFkaWFuIFRoZSBhbmdsZSwgaW4gcmFkaWFucywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgYnlcbiAgICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIHRoZSBjbG9uZSBvZiBpdHNlbGYsIG1vZGlmaWVkXG4gICAqL1xuICByb3RhdGVOZXcocmFkaWFuKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYucm90YXRlKHJhZGlhbik7XG4gIH1cblxuXHQvKipcblx0ICogUm90YXRlcyBhIHZlY29yIGJ5IGEgZ2l2ZW4gYW1vdW50LCBwcm92aWRlZCBpbiBkZWdyZWVzLiBDb252ZXJ0cyB0aGUgZGVncmVlXG5cdCAqIHZhbHVlIHRvIHJhZGlhbnMgYW5kIHJ1bnMgdGhlIHJvdGFldCBtZXRob2QuXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICogQGNoYWluYWJsZVxuXHQgKiBAcGFyYW0gIHtudW1iZXJ9ICBkZWdyZWVzIFRoZSBhbmdsZSwgaW4gZGVncmVlcywgdG8gcm90YXRlIHRoZSB2ZWN0b3IgYnlcblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuXHQgKi9cbiAgcm90YXRlRGVnKGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGUoZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpKTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHJvdGF0ZXMgaXQgYnkgdGhlIHN1cHBsaWVkIGRlZ3JlZSB2YWx1ZVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcblx0ICogQHBhcmFtICB7bnVtYmVyfSAgZGVncmVlcyBUaGUgYW5nbGUsIGluIGRlZ3JlZXMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0IFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHJvdGF0ZURlZ05ldyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlTmV3KGRlZ3JlZXNUb1JhZGlhbihkZWdyZWVzKSk7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNyb3RhdGVfX2FuY2hvciByb3RhdGV9XG4gICAqL1xuICByb3RhdGVCeShyYWRpYW4pIHtcblx0XHRyZXR1cm4gdGhpcy5yb3RhdGUocmFkaWFuKTtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciNyb3RhdGVOZXdfX2FuY2hvciByb3RhdGVOZXd9XG4gICAqL1xuICByb3RhdGVCeU5ldyhyYWRpYW4pIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGVOZXcocmFkaWFuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBvZiB7QGxpbmsgVmVjdG9yI3JvdGF0ZURlZ19fYW5jaG9yIHJvdGF0ZURlZ31cbiAgICovXG4gIHJvdGF0ZURlZ0J5KGRlZ3JlZXMpIHtcblx0XHRyZXR1cm4gdGhpcy5yb3RhdGVEZWcoZGVncmVlcyk7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3Ijcm90YXRlRGVnTmV3X19hbmNob3Igcm90YXRlRGVnTmV3fVxuICAgKi9cbiAgcm90YXRlRGVnQnlOZXcocmFkaWFuKSB7XG4gICAgcmV0dXJuIHRqb3Mucm90YXRlRGVnTmV3KHJhZGlhbik7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRlcyBhIHZlY3RvciB0byBhIHNwZWNpZmljIGFuZ2xlXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICogQGNoYWluYWJsZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICByYWRpYW4gVGhlIGFuZ2xlLCBpbiByYWRpYW5zLCB0byByb3RhdGUgdGhlIHZlY3RvciB0b1xuICAgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFJldHVybnMgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cblx0cm90YXRlVG8ocmFkaWFuKSB7XG5cdFx0cmV0dXJuIHRoaXMucm90YXRlKHJhZGlhbi10aGlzLmFuZ2xlKTtcblx0fTtcbiAgLyoqXG4gICAqIENsb25lcyB0aGUgdmVjdG9yIGFuZCByb3RhdGVzIGl0IHRvIHRoZSBzdXBwbGllZCByYWRpYW4gdmFsdWVcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKiBAY2hhaW5hYmxlXG4gICAqIEBwYXJhbSAge251bWJlcn0gIHJhZGlhbiBUaGUgYW5nbGUsIGluIHJhZGlhbnMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIHRvXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0UmV0dXJucyB0aGUgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuICAgKi9cblx0cm90YXRlVG9OZXcocmFkaWFuKSB7XG4gICAgbGV0IHYgPSB0aGlzLmNsb25lKCk7XG4gICAgcmV0dXJuIHYucm90YXRlVG8ocmFkaWFuKTtcblx0fTtcblxuXHQvKipcblx0ICogUm90YXRlcyBhIHZlY29yIHRvIGEgZ2l2ZW4gYW1vdW50LCBwcm92aWRlZCBpbiBkZWdyZWVzLiBDb252ZXJ0cyB0aGUgZGVncmVlXG5cdCAqIHZhbHVlIHRvIHJhZGlhbnMgYW5kIHJ1bnMgdGhlIHJvdGF0ZVRvIG1ldGhvZC5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKiBAY2hhaW5hYmxlXG5cdCAqIEBwYXJhbSAge251bWJlcn0gIGRlZ3JlZXMgVGhlIGFuZ2xlLCBpbiBkZWdyZWVzLCB0byByb3RhdGUgdGhlIHZlY3RvciB0b1xuXHQgKiBAcmV0dXJuIHtWZWN0b3J9XHRcdFx0XHRcdFx0UmV0dXJucyBpdHNlbGYsIG1vZGlmaWVkXG5cdCAqL1xuICByb3RhdGVUb0RlZyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlVG8oZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpKTtcbiAgfVxuICAvKipcbiAgICogQ2xvbmVzIHRoZSB2ZWN0b3IgYW5kIHJvdGF0ZXMgaXQgdG8gdGhlIHN1cHBsaWVkIGRlZ3JlZSB2YWx1ZVxuICAgKlxuICAgKiBAcHVibGljXG4gICAqIEBjaGFpbmFibGVcblx0ICogQHBhcmFtICB7bnVtYmVyfSAgZGVncmVlcyBUaGUgYW5nbGUsIGluIGRlZ3JlZXMsIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIHRvXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn1cdFx0XHRcdFx0IFJldHVybnMgdGhlIGNsb25lIG9mIGl0c2VsZiwgbW9kaWZpZWRcbiAgICovXG4gIHJvdGF0ZVRvRGVnTmV3KGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGVUb05ldyhkZWdyZWVzVG9SYWRpYW4oZGVncmVlcykpO1xuICB9XG5cblx0LyoqXG5cdCAqIE5vcm1hbGlzZXMgdGhlIHZlY3RvciBkb3duIHRvIGEgbGVuZ3RoIG9mIDEgdW5pdFxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqIEBjaGFpbmFibGVcblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGl0c2VsZiwgbW9kaWZpZWRcblx0ICovXG5cdG5vcm1hbGlzZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIodGhpcy5sZW5ndGgpO1xuXHR9XG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIHZlY3RvciBhbmQgbm9ybWFsaXNlcyBpdFxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqIEBjaGFpbmFibGVcblx0ICogQHJldHVybiB7VmVjdG9yfVx0XHRcdFx0XHRSZXR1cm5zIGEgY2xvbmUgb2YgaXRzZWxmLCBtb2RpZmllZFxuXHQgKi9cblx0bm9ybWFsaXNlTmV3KCkge1xuXHRcdHJldHVybiB0aGlzLmRpdmlkZVNjYWxhck5ldyh0aGlzLmxlbmd0aCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSAge1ZlY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tXG5cdCAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzdXBwbGllZCB2ZWN0b3Jcblx0ICovXG5cdGRpc3RhbmNlKHZlY3Rvcikge1xuXHRcdHJldHVybiB0aGlzLnN1YnRyYWN0TmV3KHZlY3RvcikubGVuZ3RoO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9uIHRoZSBYIGF4aXMgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSAge1ZlY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tXG5cdCAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFRoZSBkaXN0YW5jZSwgYWxvbmcgdGhlIHggYXhpcywgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqL1xuXHRkaXN0YW5jZVgodmVjdG9yKSB7XG5cdFx0cmV0dXJuIHRoaXMueCAtIHZlY3Rvci54O1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZWQgdGhlIGRpc3RhbmNlIG9uIHRoZSBZIGF4aXMgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSAge1ZlY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tXG5cdCAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFRoZSBkaXN0YW5jZSwgYWxvbmcgdGhlIHkgYXhpcywgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc3VwcGxpZWQgdmVjdG9yXG5cdCAqL1xuXHRkaXN0YW5jZVkodmVjdG9yKSB7XG5cdFx0cmV0dXJuIHRoaXMueSAtIHZlY3Rvci55O1xuXHR9XG5cblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3QgYmV0d2VlbiB0aGlzIGFuZCBhIHN1cHBsaWVkIHZlY3RvclxuXHQgKlxuXHQgKiBAZXhhbXBsZVxuXHQgKiAvLyByZXR1cm5zIC0xNFxuXHQgKiBuZXcgVmVjdG9yKDIsIC0zKS5kb3QobmV3IFZlY3RvcigtNCwgMikpXG5cdCAqIG5ldyBWZWN0b3IoLTQsIDIpLmRvdChuZXcgVmVjdG9yKDIsIC0zKSlcblx0ICogbmV3IFZlY3RvcigyLCAtNCkuZG90KG5ldyBWZWN0b3IoLTMsIDIpKVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtWZWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIG9iamVjdCBhZ2FpbnN0IHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgZG90IHByb2R1Y3Rcblx0ICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgVGhlIGRvdCBwcm9kdWN0IG9mIHRoZSB0d28gdmVjdG9yc1xuXHQgKi9cblx0ZG90KHZlY3Rvcikge1xuXHRcdHJldHVybiAodGhpcy54ICogdmVjdG9yLngpICsgKHRoaXMueSAqIHZlY3Rvci55KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBjcm9zcyBwcm9kdWN0IGJldHdlZW4gdGhpcyBhbmQgdGhlIHN1cHBsaWVkIHZlY3Rvci5cblx0ICpcblx0ICogQGV4YW1wbGVcblx0ICogLy8gcmV0dXJucyAtMlxuXHQgKiBuZXcgVmVjdG9yKDIsIC0zKS5jcm9zcyhuZXcgVmVjdG9yKC00LCAyKSlcblx0ICogbmV3IFZlY3RvcigtNCwgMikuY3Jvc3MobmV3IFZlY3RvcigyLCAtMykpXG5cdCAqIC8vIHJldHVybnMgMlxuXHQgKiBuZXcgVmVjdG9yKDIsIC00KS5jcm9zcyhuZXcgVmVjdG9yKC0zLCAyKSlcblx0ICpcblx0ICogQHBhcmFtICB7VmVjdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciBvYmplY3QgYWdhaW5zdCB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGNyb3NzIHByb2R1Y3Rcblx0ICogQHJldHVybiB7bnVtYmVyfSAgICAgICAgVGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHR3byB2ZWN0b3JzXG5cdCAqL1xuXHRjcm9zcyh2ZWN0b3IpIHtcblx0XHRyZXR1cm4gKHRoaXMueCAqIHZlY3Rvci54KSAtICh0aGlzLnkgKiB2ZWN0b3IueSk7XG5cdH1cblxuXG4gIC8qKlxuICAgKiBHZXR0ZXJzIGFuZCBzZXR0ZXJzXG4gICAqL1xuXG4gIC8qKlxuICAgKiAoZ2V0dGVyL3NldHRlcikgVGhlIHggdmFsdWUgb2YgdGhlIHZlY3Rvci5cbiAgICpcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgc2V0IHgoeCkge1xuICAgIGlmKHR5cGVvZiB4ID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl94ID0geDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWCBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ggfHwgMDtcbiAgfVxuXG4gLyoqXG5cdCogKGdldHRlci9zZXR0ZXIpIFRoZSB5IHZhbHVlIG9mIHRoZSB2ZWN0b3IuXG5cdCpcblx0KiBAdHlwZSB7bnVtYmVyfVxuXHQqIEBkZWZhdWx0IDBcblx0Ki9cbiAgc2V0IHkoeSkge1xuICAgIGlmKHR5cGVvZiB5ID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl95ID0geTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWSBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kgfHwgMDtcbiAgfVxuXG5cdC8qKlxuXHQqIChnZXR0ZXIvc2V0dGVyKSBUaGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgcHJlc2VudGVkIGFzIGEgc3F1YXJlLiBJZiB5b3UncmUgdXNpbmdcblx0KiBsZW5ndGggZm9yIGNvbXBhcmlzb24sIHRoaXMgaXMgcXVpY2tlci5cblx0KlxuXHQqIEB0eXBlIHtudW1iZXJ9XG5cdCogQGRlZmF1bHQgMFxuXHQqL1xuICBzZXQgbGVuZ3RoU3F1YXJlZChsZW5ndGgpIHtcbiAgICB2YXIgZmFjdG9yO1xuICAgIGlmKHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicpIHtcbiAgICAgIGZhY3RvciA9IGxlbmd0aCAvIHRoaXMubGVuZ3RoU3F1YXJlZDtcbiAgICAgIHRoaXMubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgbGVuZ3RoU3F1YXJlZCgpIHtcbiAgICByZXR1cm4gKHRoaXMueCAqIHRoaXMueCkgKyAodGhpcy55ICogdGhpcy55KTtcbiAgfVxuXG5cdC8qKlxuXHQqIChnZXR0ZXIvc2V0dGVyKSBUaGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3Jcblx0KlxuXHQqIEB0eXBlIHtudW1iZXJ9XG5cdCogQGRlZmF1bHQgMFxuXHQqL1xuICBzZXQgbGVuZ3RoKGxlbmd0aCkge1xuICAgIHZhciBmYWN0b3I7XG4gICAgaWYodHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJykge1xuICAgICAgZmFjdG9yID0gbGVuZ3RoIC8gdGhpcy5sZW5ndGg7XG4gICAgICB0aGlzLm11bHRpcGx5U2NhbGFyKGZhY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xlbmd0aCBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCk7XG4gIH1cblxuXHQvKipcblx0KiAoZ2V0dGVyL3NldHRlcikgVGhlIGFuZ2xlIG9mIHRoZSB2ZWN0b3IsIGluIHJhZGlhbnNcblx0KlxuXHQqIEB0eXBlIHtudW1iZXJ9XG5cdCogQGRlZmF1bHQgMFxuXHQqL1xuICBzZXQgYW5nbGUocmFkaWFuKSB7XG4gICAgaWYodHlwZW9mIHJhZGlhbiA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5yb3RhdGVUbyhyYWRpYW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhbmdsZSBzaG91bGQgYmUgYSBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFuZ2xlKCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgfVxuXG5cdC8qKlxuXHQqIChnZXR0ZXIvc2V0dGVyKSBUaGUgYW5nbGUgb2YgdGhlIHZlY3RvciwgaW4gcmFkaWFuc1xuXHQqXG5cdCogQHR5cGUge251bWJlcn1cblx0KiBAZGVmYXVsdCAwXG5cdCovXG4gIHNldCBhbmdsZUluRGVncmVlcyhkZWdyZWVzKSB7XG4gICAgaWYodHlwZW9mIGRlZ3JlZXMgPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucm90YXRlVG9EZWcoZGVncmVlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FuZ2xlIHNob3VsZCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgfVxuICBnZXQgYW5nbGVJbkRlZ3JlZXMoKSB7XG4gICAgcmV0dXJuIHJhZGlhblRvRGVncmVlcyhNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KSk7XG4gIH1cblxuXHQvKipcblx0ICogKGdldHRlci9zZXR0ZXIpIFZlY3RvciB3aWR0aC5cbiAgICogQWxpYXMgb2Yge0BsaW5rIFZlY3RvciN4IHh9XG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzZXQgd2lkdGgodykge1xuXHRcdHRoaXMueCA9IHc7XG5cdH1cblx0Z2V0IHdpZHRoKCkge1xuXHRcdHJldHVybiB0aGlzLng7XG5cdH1cblxuXHQvKipcblx0ICogKGdldHRlci9zZXR0ZXIpIFZlY3RvciBoZWlnaHQuXG4gICAqIEFsaWFzIG9mIHtAbGluayBWZWN0b3IjeCB4fVxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c2V0IGhlaWdodChoKSB7XG5cdFx0dGhpcy55ID0gaDtcblx0fVxuXHRnZXQgaGVpZ2h0KCkge1xuXHRcdHJldHVybiB0aGlzLnk7XG5cdH1cblxuXHQvKipcblx0ICogKGdldHRlci9zZXR0ZXIpIFZlY3RvciBhcmVhLlxuXHQgKiBAcmVhZG9ubHlcblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdGdldCBhcmVhKCkge1xuXHRcdHJldHVybiB0aGlzLnggKiB0aGlzLnk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBWZWN0b3I7XG4iXX0=

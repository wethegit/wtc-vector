
const conversionFactor = 180 / Math.PI;

var radianToDegrees = function(radian) {
	return rad * conversionFactor;
}

var degreesToRadian = function(degrees) {
	return deg / conversionFactor;
}

class Vector {

  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  addNew(vector) {
    let v = this.clone();
    return v.add(vector);
  }

  addScalar(scalar) {
    return this.add(new Vector(scalar, scalar));
  }
  addScalarNew(scalar) {
    let v = this.clone();
    return v.addScalar(scalar);
  }

  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }
  subtractNew(vector) {
    let v = this.clone();
    return v.subtract(vector);
  }

  subtractScalar(scalar) {
    return this.subtract(new Vector(scalar, scalar));
  }
  subtractScalarNew(scalar) {
    let v = this.clone();
    return v.subtractScalar(scalar);
  }

  divide(vector) {
    if(vector.x !== 0) {
      this.x /= vector.x
    } else {
      this.x = 0;
    }
    if(vector.y !== 0) {
      this.y /= vector.y
    } else {
      this.y = 0;
    }
    return this;
  }
  divideNew(vector) {
    let v = this.clone();
    return v.divide(vector);
  }

  divideScalar(scalar) {
    var v = new Vector(scalar, scalar);
    return this.divide(v);
  }
  divideScalarNew(scalar) {
    let v = this.clone();
    return v.divideScalar(scalar);
  }

  multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  }
  multiplyNew(vector) {
    let v = this.clone();
    return v.multiply(vector);
  }

  multiplyScalar(scalar) {
    var v = new Vector(scalar, scalar);
    return this.multiply(v);
  }
  multiplyScalarNew(scalar) {
    let v = this.clone();
    return v.multiplyScalar(scalar);
  }

  scale(scalar) {
    return this.multiplyScalar(scalar);
  }
  scaleNew(scalar) {
    return this.multiplyScalarNew(scalar);
  }

  rotate(radian) {
  	this.x = (this.x * Math.cos(radian)) - (this.y * Math.sin(radian));
  	this.y = (this.x * Math.sin(radian)) + (this.y * Math.cos(radian));
  	return this;
  }
  rotateNew(radian) {
    let v = this.clone();
    return v.rotate(radian);
  }

  rotateDeg(degrees) {
    this.rotate(degreesToRadian(degrees));
  }
  rotateDegNew(degrees) {
    return this.rotateNew(degreesToRadian(degrees));
  }

  set x(x) {
    if(typoef x == 'number') {
      this._x = x;
    } else {
      throw new TypeError('X should be a number');
    }
  }
  get x() {
    return this._x || 0;
  }

  set y(y) {
    if(typoef y == 'number') {
      this._y = y;
    } else {
      throw new TypeError('Y should be a number');
    }
  }
  get y() {
    return this._y || 0;
  }

  set length(length) {
    var factor;
    if(typoef length == 'number') {
      factor = length / this.length;
      this.multiplyScalar(factor);
    } else {
      throw new TypeError('length should be a number');
    }
  }
  get length() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  set angle(radian) {
    if(typoef radian == 'number') {
      this.rotate(radian);
    } else {
      throw new TypeError('angle should be a number');
    }
  }
  get angle() {
    return Math.atan2(this.x, this.y)
  }

}

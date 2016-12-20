
const conversionFactor = 180 / Math.PI;

var radianToDegrees = function(radian) {
	return radian * conversionFactor;
}

var degreesToRadian = function(degrees) {
	return degrees / conversionFactor;
}

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
class Vector {

	/**
	 * The Vector Class constructor
	 *
	 * @constructor
	 * @param {number} x 				The x coord
	 * @param {number} y 				The y coord
	 */
  constructor(x, y){
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
	reset(x, y) {
    this.x = x;
    this.y = y;
	}

	/**
	 * Clones the vector
	 *
	 * @public
	 * @return {Vector}					The cloned vector
	 */
  clone() {
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
  add(vector) {
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
  addNew(vector) {
    let v = this.clone();
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
  addScalar(scalar) {
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
  addScalarNew(scalar) {
    let v = this.clone();
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
  subtract(vector) {
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
  subtractNew(vector) {
    let v = this.clone();
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
  subtractScalar(scalar) {
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
  subtractScalarNew(scalar) {
    let v = this.clone();
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
  /**
   * Clones the vector and divides it by the vector instead
   *
   * @public
   * @chainable
   * @param  {Vector}  vector The vector to divide the clone by
   * @return {Vector}					Returns the clone of itself, modified
   */
  divideNew(vector) {
    let v = this.clone();
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
  divideScalar(scalar) {
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
  divideScalarNew(scalar) {
    let v = this.clone();
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
  multiply(vector) {
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
  multiplyNew(vector) {
    let v = this.clone();
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
  multiplyScalar(scalar) {
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
  multiplyScalarNew(scalar) {
    let v = this.clone();
    return v.multiplyScalar(scalar);
  }

  /**
   * Alias of {@link Vector#multiplyScalar__anchor multiplyScalar}
   */
  scale(scalar) {
    return this.multiplyScalar(scalar);
  }
  /**
   * Alias of {@link Vector#multiplyScalarNew__anchor multiplyScalarNew}
   */
  scaleNew(scalar) {
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
  rotate(radian) {
  	var x = (this.x * Math.cos(radian)) - (this.y * Math.sin(radian));
  	var y = (this.x * Math.sin(radian)) + (this.y * Math.cos(radian));

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
  rotateNew(radian) {
    let v = this.clone();
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
  rotateDeg(degrees) {
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
  rotateDegNew(degrees) {
    return this.rotateNew(degreesToRadian(degrees));
  }

  /**
   * Alias of {@link Vector#rotate__anchor rotate}
   */
  rotateBy(radian) {
		return this.rotate(radian);
  }
  /**
   * Alias of {@link Vector#rotateNew__anchor rotateNew}
   */
  rotateByNew(radian) {
    return this.rotateNew(radian);
  }

  /**
   * Alias of {@link Vector#rotateDeg__anchor rotateDeg}
   */
  rotateDegBy(degrees) {
		return this.rotateDeg(degrees);
  }
  /**
   * Alias of {@link Vector#rotateDegNew__anchor rotateDegNew}
   */
  rotateDegByNew(radian) {
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
	rotateTo(radian) {
		return this.rotate(radian-this.angle);
	};
  /**
   * Clones the vector and rotates it to the supplied radian value
   *
   * @public
   * @chainable
   * @param  {number}  radian The angle, in radians, to rotate the vector to
   * @return {Vector}					Returns the clone of itself, modified
   */
	rotateToNew(radian) {
    let v = this.clone();
    return v.rotateTo(radian);
	};

	/**
	 * Rotates a vecor to a given amount, provided in degrees. Converts the degree
	 * value to radians and runs the rotateTo method.
	 *
	 * @public
	 * @chainable
	 * @param  {number}  degrees The angle, in degrees, to rotate the vector to
	 * @return {Vector}						Returns itself, modified
	 */
  rotateToDeg(degrees) {
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
  rotateToDegNew(degrees) {
    return this.rotateToNew(degreesToRadian(degrees));
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
  set x(x) {
    if(typeof x == 'number') {
      this._x = x;
    } else {
      throw new TypeError('X should be a number');
    }
  }
  get x() {
    return this._x || 0;
  }

 /**
	* (getter/setter) The y value of the vector.
	*
	* @type {number}
	* @default 0
	*/
  set y(y) {
    if(typeof y == 'number') {
      this._y = y;
    } else {
      throw new TypeError('Y should be a number');
    }
  }
  get y() {
    return this._y || 0;
  }

	/**
	* (getter/setter) The length of the vector
	*
	* @type {number}
	* @default 0
	*/
  set length(length) {
    var factor;
    if(typeof length == 'number') {
      factor = length / this.length;
      this.multiplyScalar(factor);
    } else {
      throw new TypeError('length should be a number');
    }
  }
  get length() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

	/**
	* (getter/setter) The angle of the vector, in radians
	*
	* @type {number}
	* @default 0
	*/
  set angle(radian) {
    if(typeof radian == 'number') {
      this.rotateTo(radian);
    } else {
      throw new TypeError('angle should be a number');
    }
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }

	/**
	* (getter/setter) The angle of the vector, in radians
	*
	* @type {number}
	* @default 0
	*/
  set angleInDegrees(degrees) {
    if(typeof degrees == 'number') {
      this.rotateToDeg(degrees);
    } else {
      throw new TypeError('angle should be a number');
    }
  }
  get angleInDegrees() {
    return radianToDegrees(Math.atan2(this.y, this.x));
  }

}

export default Vector;

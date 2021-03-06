# wtc-vector
A basic 2d vector class.

## Usage
```
let vPosition = new Vector(10, 10);
let vForce = new Vector(0, 1);
vPosition.add(vForce); // [0, 11];
```

## Using the es5 bundle in browser
```
npm install --save wtc-vector
```
### Using gulp
Add the final module to your JS bundle.
```
...JS bundle logic
node_modules/wtc-vector/dist/es5-bundle.js
```
The module will then be exposed inside ```window``` as ```window.WTCVector.default```
#### Example
```
<script>
  var vector = new window.WTCVector.default(0,0);
</script>
```
## Documentation
Documentation can be found [here](https://wethegit.github.io/wtc-vector/docs/)

## Demos
The following demos provide proofs and interactive examples of the Vector class:
- [Basic demo](https://wethegit.github.io/wtc-vector/demo/)

   A basic Vector demonstration.
- [Addition proof](https://wethegit.github.io/wtc-vector/demo/addition/)

   A basic proof of addition with vectors, with associated display.
- [Unit vectors](https://wethegit.github.io/wtc-vector/demo/unit-vectors/)

   Shows the use of unit vectors and the reasoning behind their use in a vector's redering.
- [Linear transformations](https://wethegit.github.io/wtc-vector/demo/linear-transformations/)

   This demo shows how to calculate linear transformations (specifically in the vector space's unit vectors).
- [Snowflake](https://wethegit.github.io/wtc-vector/demo/snowflake/)

   This demonstrates the use of a rotating vector as a a method of calculating a sinewave and it's applicable use in the animation of a falling snowflake.

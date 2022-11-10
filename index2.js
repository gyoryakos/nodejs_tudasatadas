//function wrapper(__dirname, __filename, module, require, exports) {
const calc = require('./calculator.js');
// const {add, sub} = require('./calculator.js');

console.log(__dirname);
console.log(__filename);

console.log(calc.add(2, 3));
console.log(calc.sub(2, 3));
//}
//function wrapper(__dirname, __filename, module, require, exports) {
const {add, sub} = require('./calculator.js');

console.log(__dirname);
console.log(__filename);

console.log(add(2, 3));
console.log(sub(2, 3));
//}
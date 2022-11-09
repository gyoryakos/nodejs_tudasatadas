//function wrapper(__dirname, __filename, module, require, exports) {
function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

module.exports = {add, sub};
//}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.choose = exports.bool = exports.randomIntRange = exports.randomInt = void 0;
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
exports.randomInt = randomInt;
function randomIntRange(min, max) {
    return Math.max(min, randomInt(max) - randomInt(max));
}
exports.randomIntRange = randomIntRange;
/**
 * From 0 to 100
 */
function bool(chance) {
    if (chance == 100)
        return true;
    if (chance == 0)
        return false;
    var n = randomInt(100);
    return n <= chance;
}
exports.bool = bool;
function choose(array) {
    var index = randomInt(array.length);
    return array[index];
}
exports.choose = choose;
//# sourceMappingURL=random.js.map
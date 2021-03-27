"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.names = exports.insults = void 0;
var random_1 = require("./game/utils/random");
var entity_1 = require("./game/entity");
var arena_1 = require("./game/arena");
var json = require('./game/data/data.json');
var div;
var text;
var backConsoleLog = console.log;
console.log = function () {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    backConsoleLog.apply(void 0, data);
    //text.innerText += data.toString() + "\n";
    var subDiv = document.createElement('div');
    var label = document.createElement('label');
    label.innerText = data.toString();
    subDiv.appendChild(label);
    div.appendChild(subDiv);
};
exports.insults = [];
exports.names = [];
//export let items: Item[] = [];
var version = "2:00, 28.03.2021";
function main() {
    //todo refactor?
    text = document.getElementById("text");
    div = document.getElementById("div");
    var versionText = document.createElement('label');
    versionText.id = "version";
    versionText.innerText = "WTF Arena\nПоследнее обновление: " + version + "\n\n";
    div.appendChild(versionText);
    div.appendChild(document.createElement('br'));
    for (var key in json.insults) {
        var value = json.insults[key];
        exports.insults.push(Object.assign({ kto: key }, value));
    }
    for (var key in json.names) {
        var value = json.names[key];
        exports.names.push(Object.assign({ kto: key }, value));
    }
    var arena = new arena_1.Arena();
    var baseHealth = 5;
    var baseDamage = 3;
    for (var _i = 0, names_1 = exports.names; _i < names_1.length; _i++) {
        var name_1 = names_1[_i];
        var health = baseHealth + random_1.randomIntRange(-baseHealth, baseHealth);
        var damage = baseDamage + random_1.randomIntRange(-baseDamage, baseDamage);
        arena.addEntity(new entity_1.Entity(arena, health, damage, name_1));
    }
    var loops = 1000;
    while (arena.loop < loops) {
        if (arena.entities.length == 1) {
            console.log("\n" + arena.entities[0].name.kto.toUpperCase() + " \u041F\u041E\u0411\u0415\u0414\u0418\u041B!\n\n\n");
            return;
        }
        arena.doLoop();
    }
}
exports.main = main;
main();
//# sourceMappingURL=app.js.map
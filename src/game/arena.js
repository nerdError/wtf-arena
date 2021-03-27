"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arena = void 0;
var random_1 = require("./utils/random");
var Arena = /** @class */ (function () {
    function Arena(entities) {
        if (entities === void 0) { entities = []; }
        this.entities = entities;
        this.loop = 0;
        this.died = [];
    }
    Arena.prototype.addEntity = function (entity, log) {
        if (log === void 0) { log = true; }
        if (log) {
            //console.log(`В игру врывается ${entity.name.kto} c ${entity.health} здоровья и ${entity.damage} урона!`);
        }
        this.entities.push(entity);
    };
    Arena.prototype.removeEntity = function (target) {
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            if (entity.uid == target.uid) {
                this.died.push(entity);
                this.entities.splice(i, 1);
                return;
            }
        }
        console.log("[\u041E\u0428\u0418\u0411\u041A\u0410] \u0421\u0443\u0449\u0435\u0441\u0442\u0432\u043E \u0441 \u0438\u043C\u0435\u043D\u0435\u043C " + target.name.kto + " (" + target.uid + ") \u043D\u0435 \u0431\u044B\u043B\u043E \u043D\u0430\u0439\u0434\u0435\u043D\u043E!");
    };
    Arena.prototype.doLoop = function () {
        if (this.entities.length > 1) {
            //console.log(`АРЕНА: НАЧАЛСЯ ЦИКЛ ${this.loop}`)
            for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
                var entity = _a[_i];
                entity.doAction();
            }
        }
        this.loop++;
    };
    Arena.prototype.getRandomEntity = function (exclude) {
        var entities = this.entities.slice();
        if (exclude) {
            // for (let i = 0; i < entities.length; i++) {
            //     let entity = entities[i];
            //     let excluder = exclude.find(item => item.uid == entity.uid);
            //     if (excluder) {
            //         entities.splice(i, 1);
            //     }
            // }
            entities = this.entities.filter(function (entity) {
                var excluder = exclude.find(function (item) { return item.uid == entity.uid; });
                return Boolean(!excluder);
            });
        }
        if (entities.length == 1) {
            return entities[0];
        }
        else {
            return entities[random_1.randomInt(entities.length - 1)];
        }
    };
    return Arena;
}());
exports.Arena = Arena;
//# sourceMappingURL=arena.js.map
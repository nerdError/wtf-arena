"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
var random_1 = require("./utils/random");
var app_1 = require("../app");
//todo DeadInfo
var Entity = /** @class */ (function () {
    function Entity(arena, health, damage, name) {
        this.arena = arena;
        this.health = health;
        this.damage = damage;
        this.name = name;
        this.generation = 0;
        this.uid = Entity.lastUID;
        Entity.lastUID++;
        this.baseHealth = health;
    }
    Entity.prototype.doAction = function () {
        // РЕБЁНОК
        if (random_1.bool(1)) {
            var parent_1 = this.arena.getRandomEntity([this]);
            var name_1 = JSON.parse(JSON.stringify(this.name));
            //console.log(parent.name.kto.substr(Math.floor(parent.name.kto.length/2)) + this.name.kto.substr(Math.floor(parent.name.kto.length/2)));
            for (var key in this.name) {
                var value = this.name[key];
                //(<any>name)[key] = value + " " + parent.name.surname;
                name_1[key] = "Микро-" + value;
                //todo (<any>name)[key] = parent.name.kto.substr(Math.floor(parent.name.kto.length/2)) + this.name.kto.substr(Math.floor(parent.name.kto.length/2))
            }
            console.log(this.name.kto + " \u0440\u043E\u0434\u0438\u043B \u0441\u044B\u043D\u0430 \u043E\u0442 " + parent_1.name.otKogo + ", \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u0437\u043E\u0432\u0443\u0442 " + name_1.kto + "!");
            this.arena.addEntity(new Entity(this.arena, Math.round(this.health / 2), Math.round(this.damage / 2), name_1), false);
        }
        // ОСКОРБЛЕНИЕ
        if (random_1.bool(5) && this.arena.entities.length > 2) {
            var target = this.arena.getRandomEntity([this]);
            var target2 = this.arena.getRandomEntity([this, target]);
            console.log(random_1.choose([
                this.name.kto + ": \"" + target.name.kto + ", \u0432\u0441\u0451 \u0441 \u0442\u043E\u0431\u043E\u0439 \u044F\u0441\u043D\u043E, \u0442\u044B \u0442\u0430\u043A\u043E\u0439 \u0436\u0435 \u043A\u0430\u043A " + target2.name.kto + "\"",
                this.name.kto + ": \"" + target.name.kto + ", \u0422\u042B " + random_1.choose(app_1.insults).kto.toUpperCase() + "!\"",
            ]));
        }
        // СУИЦИД
        if (random_1.bool(3)) {
            // УДАЛОСЬ ЛИ СОВЕРШИТЬ
            if (random_1.bool(50)) {
                console.log(this.name.komu + " \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0431\u0438\u0442\u044C \u0441\u0435\u0431\u044F :(");
                var didRevive = random_1.bool(15);
                if (!didRevive) {
                    this.arena.removeEntity(this);
                    return;
                }
                else {
                    this.health = 1;
                    this.health += random_1.randomInt(this.baseHealth / 2);
                    console.log("...\u043D\u043E " + this.name.kto + " \u0432\u043E\u0437\u0440\u043E\u0434\u0438\u043B\u0441\u044F \u0441 " + this.health + " \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044F!");
                }
            }
            else {
                console.log(this.name.kto + " \u043F\u044B\u0442\u0430\u043B\u0441\u044F \u0443\u0431\u0438\u0442\u044C \u0441\u0435\u0431\u044F, \u043D\u043E \u0443 \u043D\u0435\u0433\u043E \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C :)");
            }
        }
        // ЛЕЧЕНИЕ
        if (random_1.bool(10)) {
            var heal = random_1.randomInt(this.baseHealth * 0.7) + 1;
            this.health += heal;
            console.log(this.name.kto + " \u043F\u043E\u043B\u0435\u0447\u0438\u043B\u0441\u044F \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u043B " + heal + " \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044F (\u0432\u0441\u0435\u0433\u043E: " + this.health + ")");
        }
        // ПОБЕГ
        if (random_1.bool(2)) {
            // ПОЙМАЛ ЛИ КТО-ТО
            if (random_1.bool(50) && this.arena.entities.length > 1) {
                var target = this.arena.getRandomEntity([this]);
                console.log(this.name.kto + " \u043F\u044B\u0442\u0430\u043B\u0441\u044F \u0442\u0440\u0443\u0441\u043B\u0438\u0432\u043E \u0441\u0431\u0435\u0436\u0430\u0442\u044C, \u043D\u043E " + (target === null || target === void 0 ? void 0 : target.name.kto) + " \u043D\u0435 \u0434\u0430\u043B \u0435\u043C\u0443 \u0443\u0439\u0442\u0438!");
            }
            else {
                console.log(this.name.kto + " \u0442\u0440\u0443\u0441\u043B\u0438\u0432\u043E \u0441\u0431\u0435\u0436\u0430\u043B \u0441 \u043F\u043E\u043B\u044F \u0431\u043E\u044F!");
                this.arena.removeEntity(this);
                return;
            }
        }
        // ВСПОМНИЛ И ЗАПЛАКАЛ
        if (random_1.bool(1) && this.arena.died.length > 0) {
            var died = random_1.choose(this.arena.died);
            console.log(this.name.kto + ": \"\u041E " + died.name.kto + ", \u043A\u0430\u043A \u043C\u043D\u0435 \u0442\u0435\u0431\u044F \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442!\"");
        }
        // АТАКА
        if (random_1.bool(90)) {
            var target = this.arena.getRandomEntity([this]);
            if (target) {
                target.doDamage(random_1.randomInt(this.damage + 1), this);
            }
            else {
                console.log(this.name.kto + " \u043D\u0435 \u0441\u043C\u043E\u0433 \u043D\u0430\u0439\u0442\u0438 \u0441\u0435\u0431\u0435 \u0446\u0435\u043B\u044C \u0434\u043B\u044F \u0430\u0442\u0430\u043A\u0438");
            }
        }
    };
    Entity.prototype.doDamage = function (damage, attacker) {
        var didEvasion = random_1.bool(30);
        if (didEvasion) {
            console.log(this.name.kto + " \u0443\u043A\u043B\u043E\u043D\u0438\u043B\u0441\u044F \u043E\u0442 \u0430\u0442\u0430\u043A\u0438 " + attacker.name.otKogo);
            return;
        }
        if (damage >= this.health) {
            var didForgive = random_1.bool(10);
            if (didForgive && this.arena.entities.length > 2) {
                var word = random_1.bool(50) ? "ненавидит" : "любит";
                var target = this.arena.getRandomEntity([this, attacker]);
                console.log(attacker.name.kto + " \u043C\u043E\u0433 \u0443\u0431\u0438\u0442\u044C " + this.name.kogo + ", \u043D\u043E " + this.name.kto + " \u0441\u043A\u0430\u0437\u0430\u043B \u0447\u0442\u043E " + word + " " + target.name.kogo + ", \u0438 \u0442\u043E\u0442 \u0435\u0433\u043E \u043F\u043E\u0449\u0430\u0434\u0438\u043B");
                return;
            }
        }
        this.health -= damage;
        if (this.health <= 0) {
            if (random_1.bool(20)) {
                var insult = random_1.choose(app_1.insults);
                console.log(this.name.kto + ": \"\u042F \u0432\u0435\u0440\u0438\u043B \u0442\u0435\u0431\u0435, " + attacker.name.kto + ", \u0430 \u0442\u044B \u043E\u043A\u0430\u0437\u0430\u043B\u0441\u044F " + insult.kem + "\"");
            }
            console.log(attacker.name.kto + " \u0443\u0431\u0438\u043B " + this.name.kogo + ", \u043D\u0430\u043D\u0435\u0441\u044F " + damage + " \u0443\u0440\u043E\u043D\u0430");
            var didRevive = random_1.bool(15);
            if (!didRevive) {
                this.arena.removeEntity(this);
            }
            else {
                this.health = 1;
                this.health += random_1.randomInt(this.baseHealth / 2);
                console.log("...\u043D\u043E " + this.name.kto + " \u0432\u043E\u0437\u0440\u043E\u0434\u0438\u043B\u0441\u044F \u0441 " + this.health + " \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044F!");
            }
        }
        else {
            //console.log(`${attacker.name.kto} нанес ${damage} урона ${this.name.komu}, и теперь у него ${this.health} здоровья!`);
        }
    };
    Entity.lastUID = 0;
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map
"use strict";
var Arena = /** @class */ (function () {
    function Arena(entities) {
        if (entities === void 0) { entities = []; }
        this.entities = entities;
        this.loop = 0;
    }
    Arena.prototype.removeEntity = function (target) {
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            if (entity.uid == target.uid) {
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
        var entities = this.entities;
        if (exclude) {
            entities = this.entities.filter(function (entity) {
                var excluder = exclude.find(function (item) { return item.uid == entity.uid; });
                return Boolean(!excluder);
            });
        }
        return entities[randomInt(this.entities.length - 1)];
    };
    return Arena;
}());
var Entity = /** @class */ (function () {
    function Entity(arena, health, damage, name) {
        this.arena = arena;
        this.health = health;
        this.damage = damage;
        this.name = name;
        this.uid = Entity.lastUID;
        Entity.lastUID++;
        this.baseHealth = health;
    }
    Entity.prototype.doAction = function () {
        var target = this.arena.getRandomEntity([this]);
        var didSuicide = bool(5);
        if (didSuicide) {
            var actuallyDid = bool(50);
            if (actuallyDid) {
                console.log(this.name.kto + " \u0440\u0435\u0448\u0438\u043B \u0443\u0431\u0438\u0442\u044C \u0441\u0430\u043C \u0441\u0435\u0431\u044F :(");
                var didRevive = bool(15);
                if (!didRevive) {
                    this.arena.removeEntity(this);
                }
                else {
                    this.health = 1;
                    this.health += randomInt(this.baseHealth / 2);
                    console.log("...\u043D\u043E " + this.name.kto + " \u0432\u043E\u0437\u0440\u043E\u0434\u0438\u043B\u0441\u044F \u0441 " + this.health + " \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044F!");
                }
            }
            else {
                console.log(this.name.kto + " \u043F\u044B\u0442\u0430\u043B\u0441\u044F \u0443\u0431\u0438\u0442\u044C \u0441\u0435\u0431\u044F, \u043D\u043E \u0443 \u043D\u0435\u0433\u043E \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C :)");
            }
            return;
        }
        var didSkip = bool(20);
        if (didSkip) {
            console.log(this.name.kto + " \u0440\u0435\u0448\u0438\u043B \u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0445\u043E\u0434");
            return;
        }
        var didHeal = bool(10);
        if (didHeal) {
            var heal = randomInt(this.baseHealth * 0.7) + 1;
            this.health += heal;
            console.log(this.name.kto + " \u043F\u043E\u043B\u0435\u0447\u0438\u043B\u0441\u044F \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u043B " + heal + " \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044F (\u0432\u0441\u0435\u0433\u043E: " + this.health + ")");
            return;
        }
        if (target) {
            target.doDamage(randomInt(this.damage + 1), this);
        }
        else {
            console.log(this.name.kto + " \u043D\u0435 \u0441\u043C\u043E\u0433 \u043D\u0430\u0439\u0442\u0438 \u0441\u0435\u0431\u0435 \u0446\u0435\u043B\u044C \u0434\u043B\u044F \u0430\u0442\u0430\u043A\u0438");
        }
    };
    Entity.prototype.doDamage = function (damage, attacker) {
        var didEvasion = bool(30);
        if (didEvasion) {
            console.log(this.name.kto + " \u0443\u043A\u043B\u043E\u043D\u0438\u043B\u0441\u044F \u043E\u0442 \u0430\u0442\u0430\u043A\u0438 " + attacker.name.otKogo);
            return;
        }
        if (damage >= this.health) {
            var didForgive = bool(10);
            if (didForgive && this.arena.entities.length > 2) {
                var word = bool(50) ? "ненавидит" : "любит";
                var target = this.arena.getRandomEntity([this, attacker]);
                console.log(attacker.name.kto + " \u043C\u043E\u0433 \u0443\u0431\u0438\u0442\u044C " + this.name.kogo + ", \u043D\u043E " + this.name.kto + " \u0441\u043A\u0430\u0437\u0430\u043B \u0447\u0442\u043E " + word + " " + target.name.kogo + ", \u0438 \u0442\u043E\u0442 \u0435\u0433\u043E \u043F\u043E\u0449\u0430\u0434\u0438\u043B");
                return;
            }
        }
        this.health -= damage;
        if (this.health <= 0) {
            console.log(attacker.name.kto + " \u0443\u0431\u0438\u043B " + this.name.kogo + ", \u043D\u0430\u043D\u0435\u0441\u044F " + damage + " \u0443\u0440\u043E\u043D\u0430");
            var didRevive = bool(15);
            if (!didRevive) {
                this.arena.removeEntity(this);
            }
            else {
                this.health = 1;
                this.health += randomInt(this.baseHealth / 2);
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
function main() {
    var n = 0;
    var count = 1000;
    var chance = 90;
    for (var i = 0; i < count; i++) {
        n += bool(chance) ? 1 : 0;
    }
    console.log("\u0428\u0430\u043D\u0441 " + chance + "%: " + n + " / " + count);
    var arena = new Arena();
    // arena.entities.push(new Entity(arena, 10, 5, {
    //     kto: "Феликс",
    //     kogo: "Феликса",
    //     komu: "Феликсу",
    // }))
    // arena.entities.push(new Entity(arena, 10, 5, {
    //     kto: "Павел",
    //     kogo: "Павла",
    //     komu: "Павлу",
    // }))
    var baseHealth = 5;
    var baseDamage = 5;
    var jsonNames = "\n    {\n        \"Leha\": {\n            \"kto\": \"\u041B\u0451\u0445\u0430\",\n            \"kogo\": \"\u041B\u0451\u0445\u0443\",\n            \"komu\": \"\u041B\u0451\u0445\u0435\",\n            \"otKogo\": \"\u041B\u0451\u0445\u0438\"\n        }\n    }\n    ";
    var data = JSON.parse(jsonNames);
    console.log(data);
    for (var _i = 0, _a = Object.values(data); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        var health = baseHealth +
            arena.entities.push(new Entity(arena, baseHealth, baseDamage, name_1));
    }
    // arena.entities.push(new Entity(arena, health, damage, {
    //     kto: "Лёха",
    //     kogo: "Лёху",
    //     komu: "Лёхе",
    //     otKogo: "Лёхи",
    // }))
    //
    // arena.entities.push(new Entity(arena, health, damage, {
    //     kto: "Паша",
    //     kogo: "Пашу",
    //     komu: "Паше",
    //     otKogo: "Паши",
    // }))
    //
    // arena.entities.push(new Entity(arena, health, damage, {
    //     kto: "Гриша",
    //     kogo: "Гришу",
    //     komu: "Грише",
    //     otKogo: "Гриши",
    // }))
    //
    // arena.entities.push(new Entity(arena, health, damage, {
    //     kto: "Елисей",
    //     kogo: "Елисея",
    //     komu: "Елисею",
    //     otKogo: "Елисея",
    // }))
    //
    // arena.entities.push(new Entity(arena, health, damage, {
    //     kto: "Путин",
    //     kogo: "Путина",
    //     komu: "Путину",
    //     otKogo: "Путина",
    // }))
    //
    // arena.entities.push(new Entity(arena, health, damage, {
    //     kto: "Навальный",
    //     kogo: "Навального",
    //     komu: "Навальному",
    //     otKogo: "Навального",
    // }))
    //
    // arena.entities.push(new Entity(arena, health, damage, {
    //     kto: "Серафим",
    //     kogo: "Серафима",
    //     komu: "Серафиму",
    //     otKogo: "Серафима",
    // }))
    //
    // arena.entities.push(new Entity(arena, health, damage, {
    //     kto: "Куплинов",
    //     kogo: "Куплинова",
    //     komu: "Куплинову",
    //     otKogo: "Куплинова",
    // }))
    //
    //
    // arena.entities.push(new Entity(arena, health, damage, {
    //     kto: "Саня",
    //     kogo: "Саню",
    //     komu: "Сане",
    //     otKogo: "Сани",
    // }))
    var loops = 2;
    while (arena.loop < loops) {
        arena.doLoop();
    }
}
main();
//# sourceMappingURL=app.js.map
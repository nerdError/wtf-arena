import { bool, choose, randomInt } from "./utils/random";
import { Arena } from "./arena";
import { insults } from "../app";

export type EntityName = {
    kto: string,
    kogo: string,
    komu: string,
    otKogo: string,
    oKom: string,
    surname: string,
}

export type Insult = {
    kto: string,
    kogo: string,
    komu: string,
    kem: string,
}

//todo DeadInfo

export class Entity {

    public static lastUID: number = 0;
    public readonly uid: number;
    public readonly baseHealth: number;
    public generation: number = 0;

    constructor(
        public arena: Arena,
        public health: number,
        public damage: number,
        public name: EntityName,) {

        this.uid = Entity.lastUID;
        Entity.lastUID++;
        this.baseHealth = health;
    }

    doAction() {
        // РЕБЁНОК
        if (bool(2)) {
            let parent = this.arena.getRandomEntity([this])!;
            let name: EntityName = JSON.parse(JSON.stringify(this.name));
            //console.log(parent.name.kto.substr(Math.floor(parent.name.kto.length/2)) + this.name.kto.substr(Math.floor(parent.name.kto.length/2)));
            for (let key in this.name) {
                let value = this.name[key as keyof EntityName];
                //(<any>name)[key] = value + " " + parent.name.surname;
                (<any>name)[key] = "Микро-" + value;
                //todo (<any>name)[key] = parent.name.kto.substr(Math.floor(parent.name.kto.length/2)) + this.name.kto.substr(Math.floor(parent.name.kto.length/2))

            }
            console.log(`${this.name.kto} родил сына от ${parent.name.otKogo}, которого зовут ${name.kto}!`);
            this.arena.addEntity(new Entity(this.arena, Math.round(this.health / 2), Math.round(this.damage / 2), name), false);
        }

        // ОСКОРБЛЕНИЕ
        if (bool(10) && this.arena.entities.length > 2) {
            let target = this.arena.getRandomEntity([this])!;
            let target2 = this.arena.getRandomEntity([this, target])!;

            console.log(choose([
                `${this.name.kto}: "${target.name.kto}, всё с тобой ясно, ты такой же как ${target2.name.kto}"`,
                `${this.name.kto}: "${target.name.kto}, ТЫ ${choose(insults).kto.toUpperCase()}!"`,
            ]));
        }

        // СУИЦИД
        if (bool(3)) {
            // УДАЛОСЬ ЛИ СОВЕРШИТЬ
            if (bool(50)) {
                console.log(`${this.name.komu} удалось убить себя :(`);

                let didRevive = bool(15);
                if (!didRevive) {
                    this.arena.removeEntity(this);
                    return;
                }
                else {
                    this.health = 1;
                    this.health += randomInt(this.baseHealth / 2);
                    console.log(`...но ${this.name.kto} возродился с ${this.health} здоровья!`);
                }
            }
            else {
                console.log(`${this.name.kto} пытался убить себя, но у него не получилось :)`);
            }
        }

        // ЛЕЧЕНИЕ
        if (bool(10)) {
            let heal = randomInt(this.baseHealth * 0.7) + 1;
            this.health += heal;
            console.log(`${this.name.kto} полечился и получил ${heal} здоровья (всего: ${this.health})`);
        }

        // ПОБЕГ
        if (bool(2)) {
            // ПОЙМАЛ ЛИ КТО-ТО
            if (bool(50) && this.arena.entities.length > 1) {
                let target = this.arena.getRandomEntity([this]);
                console.log(`${this.name.kto} пытался трусливо сбежать, но ${target?.name.kto} не дал ему уйти!`)
            }
            else {
                console.log(`${this.name.kto} трусливо сбежал с поля боя!`)
                this.arena.removeEntity(this);
                return;
            }
        }

        // ВСПОМНИЛ И ЗАПЛАКАЛ
        if (bool(3) && this.arena.died.length > 0) {
            let died = choose(this.arena.died)
            console.log(`${this.name.kto}: "О ${died.name.kto}, как мне тебя не хватает!"`);
        }

        // АТАКА
        if (bool(50)) {
            let target = this.arena.getRandomEntity([this]);
            if (target) {
                target.doDamage(randomInt(this.damage + 1), this);
            } else {
                console.log(`${this.name.kto} не смог найти себе цель для атаки`);
            }
        }
    }

    doDamage(damage: number, attacker: Entity) {
        let didEvasion = bool(30);
        if (didEvasion) {
            console.log(`${this.name.kto} уклонился от атаки ${attacker.name.otKogo}`);
            return;
        }
        if (damage >= this.health) {
            let didForgive = bool(10);
            if (didForgive && this.arena.entities.length > 2) {
                let word = bool(50) ? "ненавидит" : "любит";
                let target = this.arena.getRandomEntity([this, attacker])!;
                console.log(`${attacker.name.kto} мог убить ${this.name.kogo}, но ${this.name.kto} сказал что ${word} ${target.name.kogo}, и тот его пощадил`);
                return;
            }
        }

        this.health -= damage;
        if (this.health <= 0) {
            console.log(`${attacker.name.kto} убил ${this.name.kogo}, нанеся ${damage} урона`);

            let didRevive = bool(15);
            if (!didRevive) {
                this.arena.removeEntity(this);
            }
            else {
                this.health = 1;
                this.health += randomInt(this.baseHealth / 2);
                console.log(`...но ${this.name.kto} возродился с ${this.health} здоровья!`);
            }
        }
        else {
            //console.log(`${attacker.name.kto} нанес ${damage} урона ${this.name.komu}, и теперь у него ${this.health} здоровья!`);
        }
    }
}
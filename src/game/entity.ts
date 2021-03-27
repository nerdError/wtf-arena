import { bool, randomInt } from "./utils/random";
import { Arena } from "./arena";

export type EntityName = {
    kto: string,
    kogo: string,
    komu: string,
    otKogo: string,
}

export class Entity {

    public static lastUID: number = 0;
    public readonly uid: number;
    public readonly baseHealth: number;

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
        let target = this.arena.getRandomEntity([this]);

        let didSuicide = bool(5);
        if (didSuicide) {
            let actuallyDid = bool(50);
            if (actuallyDid) {
                console.log(`${this.name.kto} решил убить сам себя :(`);

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
                console.log(`${this.name.kto} пытался убить себя, но у него не получилось :)`);
            }

            return;
        }

        let didSkip = bool(20);
        if (didSkip) {
            console.log(`${this.name.kto} решил пропустить ход`);
            return;
        }

        let didHeal = bool(10);
        if (didHeal) {
            let heal = randomInt(this.baseHealth * 0.7) + 1;
            this.health += heal;
            console.log(`${this.name.kto} полечился и получил ${heal} здоровья (всего: ${this.health})`);
            return;
        }


        if (target) {
            target.doDamage(randomInt(this.damage+1), this);
        }
        else {
            console.log(`${this.name.kto} не смог найти себе цель для атаки`);
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
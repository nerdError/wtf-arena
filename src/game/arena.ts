import { Entity } from "./entity";
import { randomInt } from "./utils/random";
import { printText } from "../app";

export class Arena {
    public loop: number = 0;
    public readonly died: Entity[] = [];

    constructor(
        public readonly entities: Entity[] = []
    ) {

    }

    addEntity(entity: Entity, log = true) {
        if (log) {
            printText(`В игру врывается ${entity.name.kto} c ${entity.health} здоровья и ${entity.damage} урона!`);
        }
        this.entities.push(entity);
    }

    removeEntity(target: Entity) {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            if (entity.uid == target.uid) {
                this.died.push(entity);
                this.entities.splice(i, 1);
                return;
            }
        }
        printText(`[ОШИБКА] Существо с именем ${target.name.kto} (${target.uid}) не было найдено!`);
    }

    async doLoop() {
        // if (this.entities.length > 1) {
        //     //console.log(`АРЕНА: НАЧАЛСЯ ЦИКЛ ${this.loop}`)
        // }

        for (const entity of this.entities) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    entity.doAction();
                    window.scrollTo(0, document.body.scrollHeight);
                    resolve("готово!")
                }, 1000)
            });
        }

        this.loop++;
    }

    getRandomEntity(exclude?: Entity[]): Entity | null {
        let entities = this.entities.slice();
        if (exclude) {
            entities = this.entities.filter(entity => {
                let excluder = exclude.find(item => item.uid == entity.uid)
                return Boolean(!excluder);
            })
        }
        if (entities.length == 1) {
            return entities[0];
        } else {
            return entities[randomInt(entities.length - 1)];
        }
    }
}
import { Entity } from "./entity";
import { randomInt } from "./utils/random";

export class Arena {
    public loop: number = 0;
    public readonly died: Entity[] = [];

    constructor(
        public readonly entities: Entity[] = []
    ) {

    }

    addEntity(entity: Entity, log = true) {
        if (log) {
            //console.log(`В игру врывается ${entity.name.kto} c ${entity.health} здоровья и ${entity.damage} урона!`);
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
        console.log(`[ОШИБКА] Существо с именем ${target.name.kto} (${target.uid}) не было найдено!`);
    }

    doLoop() {
        if (this.entities.length > 1) {
            //console.log(`АРЕНА: НАЧАЛСЯ ЦИКЛ ${this.loop}`)
            for (const entity of this.entities) {
                entity.doAction();
            }
        }
        this.loop++;
    }

    getRandomEntity(exclude?: Entity[]): Entity | null {
        let entities = this.entities.slice();
        if (exclude) {
            // for (let i = 0; i < entities.length; i++) {
            //     let entity = entities[i];
            //     let excluder = exclude.find(item => item.uid == entity.uid);
            //     if (excluder) {
            //         entities.splice(i, 1);
            //     }
            // }
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
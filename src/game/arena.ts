import { Entity } from "./entity";
import { randomInt } from "./utils/random";

export class Arena {
    public loop: number = 0;
    constructor(
        public entities: Entity[] = []
    ) {

    }

    removeEntity(target: Entity) {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            if (entity.uid == target.uid) {
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
        let entities = this.entities;
        if (exclude) {
            entities = this.entities.filter(entity => {
                let excluder = exclude.find(item => item.uid == entity.uid)
                return Boolean(!excluder);
            })
        }
        return entities[randomInt(this.entities.length-1)];
    }
}
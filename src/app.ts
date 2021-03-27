import { bool, randomIntRange } from "./game/utils/random";
import { Entity, EntityName } from "./game/entity";
import { Arena } from "./game/arena";
let jsonNames = require('./game/data/names.json');

export function main() {
    let arena = new Arena();
    let baseHealth = 5;
    let baseDamage = 5;

    let data = jsonNames.names as { [key: string]: EntityName }
    for (const key in data) {
        const name = data[key];
        let health = baseHealth + randomIntRange(-baseHealth, baseHealth);
        let damage = baseDamage + randomIntRange(-baseDamage, baseDamage);
        arena.entities.push(new Entity(arena, health, damage, Object.assign({ kto: key }, name)));
    }

    let loops = 10;
    while(arena.loop < loops) {
        arena.doLoop();
    }
}

main();
import { bool, choose, randomIntRange } from "./game/utils/random";
import { Entity, EntityName, Insult } from "./game/entity";
import { Arena } from "./game/arena";
const json: {
    names: { [key: string]: EntityName },
    insults: { [key: string]: Insult }
}
= require('./game/data/data.json');

let div: HTMLDivElement;
let text: HTMLLabelElement;

const backConsoleLog = console.log;

console.log = (...data: any[]) => {
    backConsoleLog(...data);
    //text.innerText += data.toString() + "\n";
    let subDiv = document.createElement('div');
    let label = document.createElement('label');
    label.innerText = data.toString();

    subDiv.appendChild(label);
    div.appendChild(subDiv);
}

export let insults: Insult[] = [];
export let names: EntityName[] = []
//export let items: Item[] = [];

const version = "2:20, 28.03.2021"


export function main() {
    //todo refactor?
    text = document.getElementById("text") as HTMLLabelElement;
    div = document.getElementById("div") as HTMLDivElement;


    let versionText = document.createElement('label');
    versionText.id = "version";
    versionText.innerText = "WTF Arena\nПоследнее обновление: " + version + "\n\n";

    div.appendChild(versionText);
    div.appendChild(document.createElement('br'));

    for (const key in json.insults) {
        const value = json.insults[key];
        insults.push(Object.assign({ kto: key }, value));
    }

    for (const key in json.names) {
        const value = json.names[key];
        names.push(Object.assign({ kto: key }, value));
    }

    let arena = new Arena();
    let baseHealth = 5;
    let baseDamage = 3;

    for (const name of names) {
        let health = baseHealth + randomIntRange(-baseHealth, baseHealth);
        let damage = baseDamage + randomIntRange(-baseDamage, baseDamage);
        arena.addEntity(new Entity(arena, health, damage, name));
    }

    let loops = 1000;
    while(arena.loop < loops) {
        if (arena.entities.length == 1) {
            console.log(`\n${arena.entities[0].name.kto.toUpperCase()} ПОБЕДИЛ!\n\n\n`);

            return;
        }
        arena.doLoop();
    }
}

main();
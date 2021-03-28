import { bool, choose, randomIntRange, shuffle } from "./game/utils/random";
import { Entity, EntityName, Insult } from "./game/entity";
import { Arena } from "./game/arena";
import Color = require("color");
const json: {
    names: { [key: string]: EntityName },
    insults: { [key: string]: Insult }
}
= require('./game/data/data.json');

let div: HTMLDivElement;
let text: HTMLLabelElement;

//const backConsoleLog = console.log;

export function printText(str: string, color?: string) {
    //backConsoleLog(...data);
    let subDiv = document.createElement('div');
    let label = document.createElement('label');
    label.innerHTML = `<p class="cool-text">${str}</p>`;

    subDiv.appendChild(label);
    div.appendChild(subDiv);
}

export let insults: Insult[] = [];
export let names: EntityName[] = []
//export let items: Item[] = [];

const version = "17:05, 28.03.2021"


export async function main() {
    text = document.getElementById("text") as HTMLLabelElement;
    div = document.getElementById("div") as HTMLDivElement;

    let versionText = document.createElement('label');
    versionText.id = "version";
    versionText.className = "cool-text"
    versionText.innerText = "WTF Arena\nПоследнее обновление: " + version + "\n\n";

    div.appendChild(versionText);
    div.appendChild(document.createElement('br'));

    for (const key in json.insults) {
        const value = json.insults[key];
        insults.push(Object.assign({ kto: key }, value));
    }

    let h = 0;

    const exceptions = [ "Димон", "Обэма", "" ]
    for (const key in json.names) {
        const value = json.names[key];
        if (exceptions.includes(key)) continue;

        let name = Object.assign({ kto: key }, value);
        for (const nameKey in name) {
            const nameValue = name[nameKey as keyof EntityName];
            let s = "#ad9696";
            let color = Color.hsv([h, 15, 90]); //[h, 25, 90]
            name[nameKey as keyof EntityName] = `<b style="color: ${color}">${nameValue}</b>`
        }

        names.push(name);
        h += 350/Object.values(json.names).length;
    }

    let arena = new Arena();
    let baseHealth = 10;
    let baseDamage = 3;

    for (const name of names) {
        let health = baseHealth + randomIntRange(-baseHealth, baseHealth);
        let damage = baseDamage + randomIntRange(-baseDamage, baseDamage);
        arena.addEntity(new Entity(arena, health, damage, name), false);
    }

    let loops = 1000;
    while(arena.loop < loops) {
        await arena.doLoop()
    }
}

main();
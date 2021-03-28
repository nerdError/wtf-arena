export function randomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function randomIntRange(min: number, max: number) {
    return Math.max(min, randomInt(max) - randomInt(max));
}

/**
 * From 0 to 100
 */
export function bool(chance: number): boolean {
    if (chance == 100) return true;
    if (chance == 0) return false;

    let n = randomInt(100);
    return n <= chance;
}

export function choose<T>(array: T[]): T {
    let index = randomInt(array.length);
    return array[index];
}

export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/**
 * The splice() method changes the content of a string by removing a range of
 * characters and/or adding new characters.
 *
 * @param str {string}
 * @param {number} start Index at which to start changing the string.
 * @param {number} delCount An integer indicating the number of old chars to remove.
 * @param {string} newSubStr The String that is spliced in.
 * @return {string} A new string with the spliced substring.
 */
export function spliceStr (str: string, start: number, delCount: number, newSubStr: string) {
    return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
}

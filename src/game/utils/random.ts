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
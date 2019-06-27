export namespace IndexManager {
    let value: number = 0;
    let limit: number = 0;

    export const getValue = (): number => value;

    export const setLimit = (number: number): number => limit = number - 1;

    export const shiftValue = () => {
        value >= limit ? value = 0 : value += 1;

        return IndexManager;
    }

    export const unshiftValue = () => {
        value <= 0 ? value = limit : value -= 1;

        return IndexManager;
    }
}
export namespace IndexManager {
    let value: number = 0;
    let limit: number = 0;

    export const getValue = (): number => {
        return value;
    };

    export const resetValue = () => {
        value = 0;

        return IndexManager;
    };

    export const setLimit = (number: number) => {
        limit = number - 1;

        return IndexManager;
    };

    export const shiftValue = () => {
        value >= limit ? value = 0 : value += 1;

        return IndexManager;
    }

    export const unshiftValue = () => {
        value <= 0 ? value = limit : value -= 1;

        return IndexManager;
    }
}
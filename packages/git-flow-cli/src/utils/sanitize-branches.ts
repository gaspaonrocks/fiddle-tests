export const sanitizeBranches = input => {
    return JSON.stringify(input).replace(/"/gi, '').replace(/  /gi, '').replace(/\\n/gi, ' ').split(' ').filter(element => element.length > 1);
};

export const sanitizeBranches2 = input => {
    return JSON.stringify(input).replace(/"/gi, '').replace(/  /gi, '').split('\\n').filter(element => element.length > 1 && !element.startsWith('*'));
};
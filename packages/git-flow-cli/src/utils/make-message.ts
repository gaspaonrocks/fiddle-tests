export const makeMyMessage = (input, inpIndex) => input.reduce((prev, curr, index) => {
    return prev + `${inpIndex === index ? '>' : ' '} ${curr}\n`
}, '');
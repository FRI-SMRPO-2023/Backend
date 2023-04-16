export const parseBool = (val: string | string[]): boolean => {
    return val === "true";
};

export function trim(x: string, characters?: string) {
    if (characters == undefined) {
        characters = " ";
    }
    var start = 0;
    while (characters.indexOf(x[start]) >= 0) {
        start += 1;
    }
    var end = x.length - 1;
    while (characters.indexOf(x[end]) >= 0) {
        end -= 1;
    }
    return x.substr(start, end - start + 1);
}

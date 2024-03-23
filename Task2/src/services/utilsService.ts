export const convertStringToDateString = (str: string) => {
    return `${fillString((+str.slice(-str.length-1, -4)).toString())}:${
        fillString(str.slice(-4, -2))}:${fillString(str.slice(-2))}`;
};

export const convertDateStringToMinutes = (str: string) => {

    let minutes: number = +str.slice(-4, -2);

    minutes += +str.slice(-str.length-1, -4) * 60;
    minutes += +str.slice(-2) / 60;

    return minutes;
};

const fillString = (str: string, length: number = 2, char: string = '0') => {
    if (length <= str.length) {
        return str;
    }

    const remainingLength = length - str.length;

    return char.repeat(remainingLength) + str;
};

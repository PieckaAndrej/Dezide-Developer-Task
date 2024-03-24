export const convertStringToDateString = (str: string) => {
    str = str.replace(/\D/g, '');

    return `${fillString((+str.slice(-str.length - 1, -4)).toString())}:${
        fillString(str.slice(-4, -2))}:${fillString(str.slice(-2))}`;
};

export const convertDateStringToMinutes = (str: string) => {
    str = str.replace(/\D/g, '');

    let minutes: number = +str.slice(-4, -2);

    minutes += +str.slice(-str.length-1, -4) * 60;
    minutes += +str.slice(-2) / 60;

    return minutes;
};

export const normalizeDateString = (str: string) => {
    str = str.replace(/\D/g, '');

    const date = new Date();

    date.setHours(0);
    date.setMinutes(+str.slice(-4, -2));
    date.setSeconds(+str.slice(-2));

    return `${fillString((+str.slice(-str.length - 1, -4) + date.getHours()).toString())}:${
        fillString(date.getMinutes().toString())}:${fillString(date.getSeconds().toString())}`;
};

export const fillString = (str: string, length: number = 2, char: string = '0') => {
    if (length <= str.length) {
        return str;
    }

    const remainingLength = length - str.length;

    return char.repeat(remainingLength) + str;
};

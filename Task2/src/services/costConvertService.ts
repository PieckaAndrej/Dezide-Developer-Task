export const convertCost = (time: number, money: number, monetaryValue: number) => {
    return Math.round(time * (monetaryValue / 60) + money);
};
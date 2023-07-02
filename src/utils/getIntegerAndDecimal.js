const getIntegerAndDecimal = number => {
    const splitPart = number.toFixed(2).split('.');
    return { integerPart: splitPart[0], decimalPart: splitPart[1] || '00' };
};
export default getIntegerAndDecimal;

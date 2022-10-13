const roundByUnit = (stringifyNumber, unit) => {
  const unitRefer = {
    K: 1,
    M: 2,
    B: 3,
  };
  return (parseInt(stringifyNumber, 10) / 1000 ** unitRefer[unit]).toFixed(1);
};

const numberCases = (stringifyNumber, numberLength) => {
  switch (numberLength) {
    case 4:
    case 5:
    case 6:
      return `${roundByUnit(stringifyNumber, "K")}K`;

    case 7:
    case 8:
    case 9:
      return `${roundByUnit(stringifyNumber, "M")}M`;

    case 10:
    case 11:
    case 12:
      return `${roundByUnit(stringifyNumber, "B")}B`;

    default:
      return stringifyNumber;
  }
};

const roundNumByUnit = (number) => {
  const stringifyNumber = number.toString();
  const numberLength = stringifyNumber.length;
  return numberCases(stringifyNumber, numberLength);
};

export default roundNumByUnit;

// const exchangeRate = () => {
//   // const resultFrom = 'USD';
//   // const resultTo = 'VND';
//   // const api = `https://api.exchangerate-api.com/v4/latest/${resultFrom}`;

//     fetch('https://api.exchangerate-api.com/v4/latest/USD')
//     .then((currency) => currency.json())
//     .then((response) => console.log(response))
//     .catch((error) => console.error(error));
// };
// exchangeRate();

// $
export function convertMoneyToCoin(money) {
  switch (money) {
    case '1.00': {
      return 10;
    }
    case '2.00': {
      return 20;
    }
    case '5.00': {
      return 50;
    }
    case '10.00': {
      return 100;
    }
    case '20.00': {
      return 200;
    }
    default:
      throw new Error('Số tiền không phù hợp');
  }
}

// $
export function convertCoinToMoney(money) {
  switch (money) {
    case 10: {
      return '1.00';
    }
    case 20: {
      return '2.00';
    }
    case 50: {
      return '5.00';
    }
    case 100: {
      return '10.00';
    }
    case 200: {
      return '20.00';
    }
    default:
      throw new Error('Số coin không phù hợp');
  }
}

// 1 LIKE = 10 VND
export function convertLikeToMoney() {
  return 10;
}

// COIN TO VND
export function convertPurchaseTransactionToMoney(coin) {
  const dollar = coin / 10;
  const CURRENCY_RATIO_TO_VND = 23502.37;
  const vnd = dollar * CURRENCY_RATIO_TO_VND;
  return vnd;
}

// 10 coins = $1
const COIN_DOLLAR_RATE = 1 / 10;

// COIN TO DOLLAR
export function coinToDollar(coin) {
  const dollar = Number.parseInt(coin, 10) * COIN_DOLLAR_RATE;
  return dollar;
}

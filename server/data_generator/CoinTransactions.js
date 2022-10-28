import { faker } from '@faker-js/faker';

const randomCoinTransaction = (numberOfCoinTransactions) => {
  const coinTransactionList = [];
  let index = 1;

  Array.from(new Array(numberOfCoinTransactions)).forEach(() => {
    const coinTransaction = {
      id: faker.datatype.uuid(),
      userId: '1',
      payMethodId: `${faker.datatype.number({ min: 1, max: 4 })}`,
      amount: `${faker.datatype.number({ min: 25, max: 40 })}`,
      createdAt: faker.date.past(0),
      updatedAt: new Date().toISOString(),
    };

    coinTransactionList.push(coinTransaction);
    index += 1;
  });

  return coinTransactionList;
};

export default randomCoinTransaction;

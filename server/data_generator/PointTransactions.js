import { faker } from '@faker-js/faker';

const randomPointTransaction = (numberOfPointTransactions) => {
  const pointTransactionList = [];
  let index = 1;

  Array.from(new Array(numberOfPointTransactions)).forEach(() => {
    const pointTransaction = {
      id: faker.datatype.uuid(),
      userId: '1',
      payMethodId: `${faker.datatype.number({ min: 1, max: 4 })}`,
      amount: `${faker.datatype.number({ min: 25, max: 40 })}`,
      createdAt: faker.date.past(0),
      updatedAt: new Date().toISOString(),
    };

    pointTransactionList.push(pointTransaction);
    index += 1;
  });

  return pointTransactionList;
};

export default randomPointTransaction;

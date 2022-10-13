import { faker } from '@faker-js/faker';

const randomTicketHistories = (numberOfPointTransactions) => {
  const pointTransactionList = [];
  let index = 1;

  Array.from(new Array(numberOfPointTransactions)).forEach(() => {
    const pointTransaction = {
      id: faker.datatype.uuid(),
      userId: 1,
      source: faker.helpers.arrayElement(['theo dõi truyện']),
      detail: faker.helpers.arrayElement(['Memorize']),
      amount: faker.datatype.number({ min: 1, max: 1 }),
      createdAt: faker.date.past(0),
      updatedAt: new Date().toISOString(),
    };

    pointTransactionList.push(pointTransaction);
    index += 1;
  });

  return pointTransactionList;
};

export default randomTicketHistories;

import { faker } from '@faker-js/faker';

const randomTransactionMethods = (numberOfTransactionMethods) => {
  const transactionMethodList = [];
  let index = 1;

  Array.from(new Array(numberOfTransactionMethods)).forEach(() => {
    const transactionMethod = {
      id: index,
      method: faker.commerce.productName(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    transactionMethodList.push(transactionMethod);
    index += 1;
  });

  return transactionMethodList;
};

export default randomTransactionMethods;

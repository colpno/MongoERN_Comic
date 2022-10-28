import { faker } from '@faker-js/faker';

const randomIncomeReport = () => {
  const data = [];
  for (let year = 2020; year <= 2022; year++) {
    for (let month = 1; month <= 12; month++) {
      data.push({
        id: faker.datatype.uuid(),
        income: `${faker.datatype.number({ min: 10000, max: 1000000 })}`,
        chapterIncome: `${faker.datatype.number({ min: 1000, max: 8900 })}`,
        coinRechargeIncome: `${faker.datatype.number({ min: 100, max: 2000 })}`,
        month: `${month}`,
        year: `${year}`,
        createdAt: `${year}-${month}-01T00:00:00.000Z`,
        updatedAt: `${year}-${month}-01T00:00:00.000Z`,
      });
    }
  }
  return data;
};

export default randomIncomeReport;

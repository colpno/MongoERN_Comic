import { faker } from '@faker-js/faker';

const randomTitleReport = () => {
  const data = [];
  for (let titleId = 1; titleId <= 60; titleId++) {
    for (let year = 2020; year <= 2022; year++) {
      for (let month = 1; month <= 12; month++) {
        data.push({
          id: faker.datatype.uuid(),
          titleId,
          like: `${faker.datatype.number({ min: 100, max: 1000 })}`,
          view: `${faker.datatype.number({ min: 1000, max: 2000000 })}`,
          month: `${month}`,
          year: `${year}`,
          createdAt: `${year}-${month}-01T00:00:00.000Z`,
          updatedAt: `${year}-${month}-01T00:00:00.000Z`,
        });
      }
    }
  }
  return data;
};

export default randomTitleReport;

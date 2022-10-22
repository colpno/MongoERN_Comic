import { faker } from '@faker-js/faker';

const randomRecentRead = (numberOfRecentTitleRead) => {
  const recentReadList = [];
  let index = 1;

  Array.from(new Array(numberOfRecentTitleRead)).forEach(() => {
    const recentRead = {
      id: faker.datatype.uuid(),
      titleId: `${faker.datatype.number({ min: 1, max: 60 })}`,
      chapter: `${faker.datatype.number({ min: 1, max: 60 })}`,
      userId: '1',
      readTime: faker.date.between('2022-06-01T00:00:00.000Z', '2022-09-11:00:00.000Z'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    recentReadList.push(recentRead);
    index += 1;
  });

  return recentReadList;
};

export default randomRecentRead;

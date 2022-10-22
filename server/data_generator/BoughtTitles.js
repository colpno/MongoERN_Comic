import { faker } from '@faker-js/faker';

const randomBoughtTitle = (numberOfBoughtTitle) => {
  const boughtTitleList = [];
  let index = 1;

  Array.from(new Array(numberOfBoughtTitle)).forEach(() => {
    const boughtTitle = {
      id: faker.datatype.uuid(),
      userId: '1',
      titleId: `${index}`,
      ticketId: '1',
      expiredDay: '',
      createdAt: faker.date.past(0),
      updatedAt: new Date().toISOString(),
    };

    boughtTitleList.push(boughtTitle);
    index += 1;
  });

  return boughtTitleList;
};

export default randomBoughtTitle;

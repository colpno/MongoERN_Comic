import { faker } from '@faker-js/faker';

const randomRentedTitles = (numberOfRentedTitles) => {
  const rentedTitleList = [];
  const index = [];
  for (let i = 0; i < 50; i++) {
    index.push(Math.floor(Math.random() * 50));
  }
  const arr = index.filter((first) => first !== 0);

  Array.from(new Array(numberOfRentedTitles)).forEach(() => {
    const rentedTitle = {
      id: faker.datatype.uuid(),
      userId: '1',
      titleId: `${arr[0]}`,
      ticketId: '2',
      expiredDay: faker.date.future(0),
      createdAt: faker.date.past(0),
      updatedAt: new Date().toISOString(),
    };

    rentedTitleList.push(rentedTitle);
    arr.shift();
  });

  return rentedTitleList;
};

export default randomRentedTitles;

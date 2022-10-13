import { faker } from '@faker-js/faker';

const randomUsers = (numberOfUser) => {
  const userList = [];
  let index = 1;

  Array.from(new Array(numberOfUser)).forEach(() => {
    const user = {
      id: index,
      avatar: faker.image.avatar(),
      userName: faker.name.firstName(),
      dateOfBirth: faker.date.birthdate({ min: 12, max: 40, mode: 'age' }),
      buyTicket: faker.datatype.number({ min: 0, max: 2 }),
      rentTicket: faker.datatype.number({ min: 0, max: 4 }),
      coin: faker.datatype.number({ min: 0, max: 100 }),
      point: faker.datatype.number({ min: 0, max: 300 }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userList.push(user);
    index += 1;
  });

  return userList;
};

export default randomUsers;

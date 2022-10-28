import { faker } from '@faker-js/faker';

const randomUsers = (numberOfUser) => {
  const userList = [];
  let index = 1;
  faker.locale = 'en_US';

  Array.from(new Array(numberOfUser)).forEach(() => {
    const user = {
      index: `${index}`,
      id: `${index}`,
      avatar: faker.image.avatar(),
      userName: faker.name.firstName(),
      password: 'asd',
      role: faker.helpers.arrayElement(['member', 'administrator']),
      dateOfBirth: faker.date.birthdate({ min: 12, max: 40, mode: 'age' }),
      buyTicket: `${faker.datatype.number({ min: 0, max: 2 })}`,
      rentTicket: `${faker.datatype.number({ min: 0, max: 4 })}`,
      coin: `${faker.datatype.number({ min: 0, max: 100 })}`,
      point: `${faker.datatype.number({ min: 0, max: 300 })}`,
      income: `${faker.datatype.number({ min: 10000, max: 3000000 })}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userList.push(user);
    index += 1;
  });

  return userList;
};

export default randomUsers;

import { faker } from '@faker-js/faker';

const randomChargeCountdown = (numberOfUserTitle) => {
  const userTitleList = [];
  let index = 1;

  Array.from(new Array(numberOfUserTitle)).forEach(() => {
    const userTitle = {
      id: faker.datatype.uuid(),
      userId: 1,
      titleId: faker.datatype.uuid(),
      startCountdown: new Date(2022, 7, 26, 23, 10, 0, 0).toISOString(),
      endCountdown: new Date(2022, 7, 27, 3, 0, 0, 0).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userTitleList.push(userTitle);
    index += 1;
  });

  return userTitleList;
};

export default randomChargeCountdown;

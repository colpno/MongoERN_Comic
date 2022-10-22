import { faker } from '@faker-js/faker';

const randomFollowTitle = (numberOfTitle) => {
  const followList = [];
  let index = 1;

  Array.from(new Array(numberOfTitle)).forEach(() => {
    const title = {
      id: faker.datatype.uuid(),
      userId: '1',
      titleId: index,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    followList.push(title);
    index += 1;
  });

  return followList;
};

export default randomFollowTitle;

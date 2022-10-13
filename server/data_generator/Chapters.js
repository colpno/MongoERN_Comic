import { faker } from '@faker-js/faker';

const randomChapters = (numberOfChapters) => {
  const chapterList = [];
  let index = 1;

  Array.from(new Array(numberOfChapters)).forEach(() => {
    const post = {
      id: index,
      titleId: 1,
      order: index,
      titleName: `Ch.${index}: ${faker.company.name()}`,
      coverImage: faker.image.cats(312, 232, true),
      contents: faker.helpers.arrayElements([
        faker.image.city(),
        faker.image.abstract(),
        faker.image.animals(),
        faker.image.avatar(),
        faker.image.business(),
        faker.image.cats(),
        faker.image.fashion(),
        faker.image.food(),
      ]),
      authorNote: faker.lorem.paragraph(2),
      free: faker.datatype.boolean(),
      charge: faker.datatype.boolean(),
      coin: faker.datatype.boolean(),
      point: faker.datatype.boolean(),
      like: faker.datatype.number({ min: 1000, max: 100000 }),
      statusId: faker.datatype.number({ min: 0, max: 1 }),
      releaseDay: faker.date.past(0),
      schedule: faker.date.future(0),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    chapterList.push(post);
    index += 1;
  });

  return chapterList;
};

export default randomChapters;

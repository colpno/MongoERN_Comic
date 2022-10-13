import { faker } from '@faker-js/faker';

const randomTitles = (numberOfTitle) => {
  const titleList = [];
  let index = 1;

  Array.from(new Array(numberOfTitle)).forEach(() => {
    const title = {
      id: index,
      userId: 1,
      coverImage: faker.image.animals(275, 275),
      titleName: faker.commerce.productName(),
      authors: faker.name.firstName(),
      genreId: [
        faker.datatype.number({ min: 1, max: 10 }),
        faker.datatype.number({ min: 1, max: 10 }),
        faker.datatype.number({ min: 1, max: 10 }),
      ],
      summary: faker.lorem.paragraphs(faker.datatype.number({ min: 1, max: 4 })),
      totalChapter: faker.datatype.number({ min: 2, max: 10 }),
      point: faker.datatype.number({ min: 15, max: 30 }),
      coin: faker.datatype.number({ min: 25, max: 40 }),
      like: faker.datatype.number({ min: 50000, max: 1500000 }),
      view: faker.datatype.number({ min: 100, max: 500000 }),
      rank: index,
      titleStatusId: faker.datatype.number({ min: 1, max: 3 }),
      schedule: faker.helpers.arrayElement([`T${faker.datatype.number({ min: 2, max: 8 })}`, `CN`]),
      publish: faker.datatype.number({ min: 0, max: 1 }),
      chargeTime: faker.datatype.number({ min: 6, max: 20 }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    titleList.push(title);
    index += 1;
  });

  return titleList;
};

export default randomTitles;

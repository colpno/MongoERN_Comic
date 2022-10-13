import { faker } from '@faker-js/faker';

const randomNotices = (numberOfNotices) => {
  const noticeList = [];

  Array.from(new Array(numberOfNotices)).forEach(() => {
    const title = {
      id: faker.datatype.uuid(),
      coverImage: faker.image.business(275, 275, true),
      title: faker.commerce.productName(),
      subTitle: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(faker.datatype.number({ min: 5, max: 15 })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    noticeList.push(title);
  });

  return noticeList;
};

export default randomNotices;

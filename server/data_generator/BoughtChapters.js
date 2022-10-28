import { faker } from '@faker-js/faker';

const randomBoughtChapter = (numberOfBoughtChapter) => {
  const boughtChapterList = [];
  let index = 1;

  Array.from(new Array(numberOfBoughtChapter)).forEach(() => {
    const boughtChapter = {
      id: faker.datatype.uuid(),
      userId: '1',
      chapterId: `${index}`,
      ticketId: '1',
      expiredDay: '',
      createdAt: faker.date.past(0),
      updatedAt: new Date().toISOString(),
    };

    boughtChapterList.push(boughtChapter);
    index += 1;
  });

  return boughtChapterList;
};

export default randomBoughtChapter;

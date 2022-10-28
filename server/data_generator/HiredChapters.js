import { faker } from '@faker-js/faker';

const randomHiredChapters = (numberOfHiredChapters) => {
  const hiredChapterList = [];
  const index = [];
  for (let i = 0; i < 50; i++) {
    index.push(Math.floor(Math.random() * 50));
  }
  const arr = index.filter((first) => first !== 0);

  Array.from(new Array(numberOfHiredChapters)).forEach(() => {
    const hiredChapter = {
      id: faker.datatype.uuid(),
      userId: '1',
      chapterId: `${arr[0]}`,
      ticketId: '2',
      expiredDay: faker.date.future(0),
      createdAt: faker.date.past(0),
      updatedAt: new Date().toISOString(),
    };

    hiredChapterList.push(hiredChapter);
    arr.shift();
  });

  return hiredChapterList;
};

export default randomHiredChapters;

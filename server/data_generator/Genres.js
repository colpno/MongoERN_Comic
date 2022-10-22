import { faker } from '@faker-js/faker';

const randomGenres = (numberOfGenres) => {
  const genreList = [];
  let index = 1;

  Array.from(new Array(numberOfGenres)).forEach(() => {
    const genre = {
      id: `${index}`,
      genre: faker.music.genre(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    genreList.push(genre);
    index += 1;
  });

  return genreList;
};

export default randomGenres;

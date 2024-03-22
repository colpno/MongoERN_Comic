export const sortTitlesByGenre = (genres = [], titles = []) => {
  const checkIdList = [];

  return genres.map((genre, genreIndex) => {
    let count = 0;
    const limit = genreIndex !== genres.length - 1 ? 6 : 3;
    const result = [];
    const titleLength = titles?.length || 0;

    for (let i = 0; i < titleLength; i++) {
      const title = titles[i];

      if (title.genres.includes(genre.name) && !checkIdList.includes(title._id)) {
        result.push(title);
        checkIdList.push(title._id);

        count += 1;
        if (count >= limit) break;
      }
    }

    return {
      _id: genre._id,
      name: genre.name,
      titles: result,
    };
  });
};

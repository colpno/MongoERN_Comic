const convert = (title = {}) => {
  const { id, coin, point, like, view, totalChapter } = title;

  return {
    ...title,
    id: Number.parseInt(id, 10),
    totalChapter: Number.parseInt(totalChapter, 10),
    coin: Number.parseInt(coin, 10),
    point: Number.parseInt(point, 10),
    like: Number.parseInt(like, 10),
    view: Number.parseInt(view, 10),
  };
};

export const convertTitleData = (titles = []) => {
  const result = titles.map((title) => convert(title));
  return result;
};

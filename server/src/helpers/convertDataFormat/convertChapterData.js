const convert = (chapter = {}) => {
  const { order, like, view, cost } = chapter;

  return {
    ...chapter,
    order: Number.parseInt(order, 10),
    like: Number.parseInt(like, 10),
    view: Number.parseInt(view, 10),
    cost: cost === 'true',
  };
};

export const convertChapterData = (chapters = []) => {
  const result = chapters.map((chapter) => convert(chapter));
  return result;
};

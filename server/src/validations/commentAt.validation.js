export const allowCommentPlaceList = (value) => {
  const whitelist = ['title_', 'chapter_'];

  const isValid = whitelist.some((filter) => value.includes(filter));
  return isValid;
};

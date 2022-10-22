export const convertChaptersPropertyToString = (chapters) => {
  const result = chapters.map((chapter) => {
    const { order, like, view, free, charge, coin, point } = chapter;
    return {
      ...chapter,
      order: Number.parseInt(order, 10),
      like: Number.parseInt(like, 10),
      view: Number.parseInt(view, 10),
      free: free === "true",
      charge: charge === "true",
      coin: coin === "true",
      point: point === "true",
    };
  });

  return result;
};

export const convertChapterPropertyToString = (chapter) => {
  const { order, like, view, free, charge, coin, point } = chapter;
  return {
    ...chapter,
    order: Number.parseInt(order, 10),
    like: Number.parseInt(like, 10),
    view: Number.parseInt(view, 10),
    free: free === "true",
    charge: charge === "true",
    coin: coin === "true",
    point: point === "true",
  };
};

export const convertTitlesPropertyToString = (titles) => {
  const result = titles.map((title) => {
    const {
      index,
      totalChapter,
      point,
      coin,
      like,
      view,
      rank,
      publish,
      chargeTime,
    } = title;
    return {
      ...title,
      index: Number.parseInt(index, 10),
      totalChapter: Number.parseInt(totalChapter, 10),
      point: Number.parseInt(point, 10),
      coin: Number.parseInt(coin, 10),
      like: Number.parseInt(like, 10),
      view: Number.parseInt(view, 10),
      rank: Number.parseInt(rank, 10),
      publish: Number.parseInt(publish, 10),
      chargeTime: Number.parseInt(chargeTime, 10),
    };
  });

  return result;
};

export const convertTitlePropertyToString = (title) => {
  const {
    index,
    totalChapter,
    point,
    coin,
    like,
    view,
    rank,
    publish,
    chargeTime,
  } = title;
  return {
    ...title,
    index: Number.parseInt(index, 10),
    totalChapter: Number.parseInt(totalChapter, 10),
    point: Number.parseInt(point, 10),
    coin: Number.parseInt(coin, 10),
    like: Number.parseInt(like, 10),
    view: Number.parseInt(view, 10),
    rank: Number.parseInt(rank, 10),
    publish: Number.parseInt(publish, 10),
    chargeTime: Number.parseInt(chargeTime, 10),
  };
};

export const convertUsersPropertyToString = (users) => {
  const result = users.map((user) => {
    const { index, buyTicket, rentTicket, coin, point } = user;
    return {
      ...user,
      index: Number.parseInt(index, 10),
      buyTicket: Number.parseInt(buyTicket, 10),
      rentTicket: Number.parseInt(rentTicket, 10),
      coin: Number.parseInt(coin, 10),
      point: Number.parseInt(point, 10),
    };
  });

  return result;
};

export const convertUserPropertyToString = (user) => {
  const { index, buyTicket, rentTicket, coin, point } = user;
  return {
    ...user,
    index: Number.parseInt(index, 10),
    buyTicket: Number.parseInt(buyTicket, 10),
    rentTicket: Number.parseInt(rentTicket, 10),
    coin: Number.parseInt(coin, 10),
    point: Number.parseInt(point, 10),
  };
};

export const convertPointHistoriesPropertyToString = (pointHistories) => {
  const result = pointHistories.map((history) => {
    const { amount } = history;
    return {
      ...history,
      amount: Number.parseInt(amount, 10),
    };
  });

  return result;
};

export const convertTicketHistoriesPropertyToString = (ticketHistories) => {
  const result = ticketHistories.map((history) => {
    const { amount } = history;
    return {
      ...history,
      amount: Number.parseInt(amount, 10),
    };
  });

  return result;
};

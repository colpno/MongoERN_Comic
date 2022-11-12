export const convertChaptersPropertyToString = (chapters) => {
  const result = chapters.map((chapter) => {
    const { order, like, view, cost } = chapter;
    return {
      ...chapter,
      order: Number.parseInt(order, 10),
      like: Number.parseInt(like, 10),
      view: Number.parseInt(view, 10),
      cost: cost === "0",
    };
  });

  return result;
};

export const convertChapterPropertyToString = (chapter) => {
  const { order, like, view, cost } = chapter;
  return {
    ...chapter,
    order: Number.parseInt(order, 10),
    like: Number.parseInt(like, 10),
    view: Number.parseInt(view, 10),
    cost: cost === "false",
  };
};

export const convertTitlesPropertyToString = (titles) => {
  const result = titles.map((title) => {
    const { id, like, view, totalChapter } = title;
    return {
      ...title,
      id: Number.parseInt(id, 10),
      totalChapter: Number.parseInt(totalChapter, 10),
      like: Number.parseInt(like, 10),
      view: Number.parseInt(view, 10),
    };
  });

  return result;
};

export const convertTitlePropertyToString = (title) => {
  const { id, like, view, totalChapter } = title;
  return {
    ...title,
    id: Number.parseInt(id, 10),
    totalChapter: Number.parseInt(totalChapter, 10),
    like: Number.parseInt(like, 10),
    view: Number.parseInt(view, 10),
  };
};

export const convertUsersPropertyToString = (users) => {
  const result = users.map((user) => {
    const { id, coin, income } = user;
    return {
      ...user,
      id: Number.parseInt(id, 10),
      coin: Number.parseInt(coin, 10),
      income: Number.parseInt(income, 10),
    };
  });

  return result;
};

export const convertUserPropertyToString = (user) => {
  const { id, coin, income } = user;
  return {
    ...user,
    id: Number.parseInt(id, 10),
    income: Number.parseInt(income, 10),
    coin: Number.parseInt(coin, 10),
  };
};

export const convertCoinHistoriesPropertyToString = (coinHistories) => {
  const result = coinHistories.map((history) => {
    const { amount } = history;
    return {
      ...history,
      amount: Number.parseInt(amount, 10),
    };
  });

  return result;
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

export const convertIncomeStatPropertyToString = (incomeStatArray) => {
  const result = incomeStatArray.map((incomeStat) => {
    const { income, month, year } = incomeStat;
    return {
      ...incomeStat,
      income: Number.parseInt(income, 10),
      month: Number.parseInt(month, 10),
      year: Number.parseInt(year, 10),
    };
  });

  return result;
};

export const convertTitleStatPropertyToString = (statArray) => {
  const result = statArray.map((incomeStat) => {
    const { like, view } = incomeStat;
    return {
      ...incomeStat,
      like: Number.parseInt(like, 10),
      view: Number.parseInt(view, 10),
    };
  });

  return result;
};

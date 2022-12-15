const convert = (user = {}) => {
  const { id, coin, point, income, ticketForRenting, ticketForBuying } = user;

  return {
    ...user,
    id: Number.parseInt(id, 10),
    coin: Number.parseInt(coin, 10),
    point: Number.parseInt(point, 10),
    income: Number.parseInt(income, 10),
    ticketForRenting: Number.parseInt(ticketForRenting, 10),
    ticketForBuying: Number.parseInt(ticketForBuying, 10),
  };
};

export const convertUserData = (users = []) => {
  const result = users.map((user) => convert(user));
  return result;
};

import bcrypt from "bcryptjs";

export const hash = (string = "", saltRound = 10) => {
  const salt = bcrypt.genSaltSync(saltRound);
  return bcrypt.hashSync(string, salt);
};

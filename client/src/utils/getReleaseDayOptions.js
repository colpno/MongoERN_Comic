import { DAYS_OF_WEEK } from "constants/time.constant";

export const getReleaseDayOptions = () => {
  const options = DAYS_OF_WEEK.reduce((array, day) => {
    return [...array, { value: day.shortLabel, label: day.label }];
  }, []);

  return options;
};

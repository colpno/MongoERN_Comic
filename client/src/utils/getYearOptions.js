import moment from "moment";

export const MIN_YEAR = 2010;
export const MAX_YEAR = moment().year();

export default function getYearOptions() {
  const options = [];

  for (let i = MAX_YEAR; i >= MIN_YEAR; i--) {
    options.push({
      value: `${i}`,
      label: `${i}`,
    });
  }

  return options;
}

import moment from 'moment';

export const getCurrentTimeISO = () => moment().toISOString();

export const getCurrentTime = (type = 'string' || 'number') => {
  const now = moment();
  const second = now.format('ss');
  const minute = now.format('mm');
  const hour = now.format('hh');
  const day = now.format('DD');
  const month = now.format('MM');
  const year = now.format('YYYY');

  if (type === 'number') {
    return {
      second: Number.parseInt(second, 10),
      minute: Number.parseInt(minute, 10),
      hour: Number.parseInt(hour, 10),
      day: Number.parseInt(day, 10),
      month: Number.parseInt(month, 10),
      year: Number.parseInt(year, 10),
    };
  }

  return { second, minute, hour, day, month, year };
};

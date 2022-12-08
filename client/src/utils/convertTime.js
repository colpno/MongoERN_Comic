export function secondToMinute(second) {
  const number = parseFloat(second);
  return number / 60;
}

export function secondToHour(second) {
  const number = parseFloat(second);
  return number / 3600;
}

export function minuteToSecond(minute) {
  const number = parseFloat(minute);
  return number * 60;
}

export function minuteToHour(minute) {
  const number = parseFloat(minute);
  return number / 60;
}

export function hourToSecond(hour) {
  const number = parseFloat(hour);
  return number * 3600;
}

export function hourToMinute(hour) {
  const number = parseFloat(hour);
  return number * 60;
}

export function msToHours(millisecond) {
  return Math.floor((millisecond / (1000 * 60 * 60)) % 24);
}

export function msToMinutes(millisecond) {
  return Math.floor((millisecond / (1000 * 60)) % 60);
}

export function msToSeconds(millisecond) {
  return Math.floor((millisecond / 1000) % 60);
}

export function msToTime(millisecond) {
  const second = msToSeconds(millisecond);
  const minute = msToMinutes(millisecond);
  const hour = msToHours(millisecond);

  return {
    second,
    minute,
    hour,
  };
}

export function countdown(millisecond) {
  const times = millisecond / 1000;
  const year = parseInt(times / 60 / 60 / 24 / 365, 10);
  const day = parseInt((times / 60 / 60 / 24) % 365, 10);
  const hour = parseInt((times / 60 / 60) % 24, 10);
  const minute = parseInt((times / 60) % 60, 10);
  const second = parseInt(times % 60, 10);

  return { year, day, hour, minute, second };
}

export function formatTime(timeString) {
  const dateObj = new Date(timeString);
  const getDay = dateObj.getDate();
  const getMonth = dateObj.getMonth() + 1;
  const getYear = dateObj.getFullYear();
  const getHour = dateObj.getHours();
  const getMinute = dateObj.getMinutes();

  const day = getDay < 10 ? `0${getDay}` : getDay;
  const month = getMonth < 10 ? `0${getMonth}` : getMonth;
  const year = getYear < 10 ? `0${getYear}` : getYear;
  const hour = getHour < 10 ? `0${getHour}` : getHour;
  const minute = getMinute < 10 ? `0${getMinute}` : getMinute;

  return { day, month, year, hour, minute };
}

export function convertToDateString(day, month, year, separator = "/") {
  return `${day}${separator}${month}${separator}${year}`;
}

export function convertToDateTimeString(
  timeString,
  daySeparator = ".",
  timeSeparator = ":"
) {
  const { day, month, year, hour, minute } = formatTime(timeString);
  return `${day}${daySeparator}${month}${daySeparator}${year} ${hour}${timeSeparator}${minute}`;
}

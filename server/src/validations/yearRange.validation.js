import { getCurrentTimeISO } from '../helpers/getCurrentTime.js';

export const MIN_YEAR = 2010;
export const MAX_YEAR = Number.parseInt(getCurrentTimeISO('MM'), 10);

export const yearRange = (value) => value >= MIN_YEAR && value <= MAX_YEAR;

import moment from 'moment';

export const getCurrentTime = (format = 'YYYY-MM-DD hh:mm:ss') => moment().format(format);

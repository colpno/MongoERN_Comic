import moment from 'moment';

export default function getCurrentDateTime() {
  return moment().format('YYYY-MM-DD hh:mm:ss');
}

import { inspect } from 'util';

export default function customConsole(type = 'log', ...values) {
  switch (type) {
    case 'log':
      values.forEach((value) => {
        if (typeof value === 'object') {
          console.log(inspect(value, false, null, true));
        } else {
          console.log(value);
        }
      });
      break;
    default:
      break;
  }
}

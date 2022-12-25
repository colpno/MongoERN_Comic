import { config } from 'dotenv';

import { server as app } from './app.js';

config();

const { PORT, SERVER_URL, BASE_URL } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on ${SERVER_URL}${BASE_URL}`);
});

/* eslint-disable prefer-arrow-callback */
import { config } from 'dotenv';
import { CronJob } from 'cron';
import axios from 'axios';

config();

const { SERVER_URL, BASE_URL } = process.env;
const backendURL =
  `https://api-comico.onrender.com/${BASE_URL}/object-statuses` ||
  `${SERVER_URL}/${BASE_URL}/object-statuses`;

export const cronJob = new CronJob(
  '*/14 * * * *', // cronTime
  function () {
    console.log('Restarting server');

    axios
      .get(backendURL)
      .then((res) => {
        if (res.status === 200) console.log('Server restarted');
        else console.log(`Failed to restart server with status code: ${res.status}`);
      })
      .catch((error) => {
        console.log(`Error during restarting: ${error}`);
      });
  }, // onTick
  null, // onComplete
  false, // start
  'Asia/Saigon' // timeZone
);

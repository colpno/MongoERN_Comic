import { faker } from '@faker-js/faker';
import fs from 'fs';

import randomBoughtChapter from './BoughtChapters.js';
import randomChapters from './Chapters.js';
import randomCoinTransaction from './CoinTransactions.js';
import randomFollowTitle from './Follows.js';
import randomGenres from './Genres.js';
import randomNotices from './Notices.js';
import randomPointTransaction from './PointTransactions.js';
import randomRecentRead from './ReadingHistories.js';
import randomHiredChapters from './HiredChapters.js';
import randomTitles from './Titles.js';
import randomTransactionMethods from './TransactionMethods.js';
import randomUsers from './Users.js';
import randomChargeCountdown from './ChargeCountdown.js';
import randomTitleStatus from './TitleStatus.js';
import randomTicketHistories from './TicketHistories.js';
import randomPayMethods from './PayMethods.js';
import randomIncomeReport from './IncomeReport.js';
import randomTitleReport from './TitleReport.js';
import randomChapterReport from './ChapterReport.js';

faker.setLocale('vi');

(() => {
  // random data
  const titles = randomTitles(60);
  const chapters = randomChapters(120);
  const users = randomUsers(50);
  const genres = randomGenres(10);
  const titleStatuses = randomTitleStatus();
  const boughtChapters = randomBoughtChapter(4);
  const hiredChapters = randomHiredChapters(4);
  const coinTransactions = randomCoinTransaction(4);
  const ticketHistories = randomTicketHistories(4);
  const follows = randomFollowTitle(50);
  const notices = randomNotices(4);
  const pointTransactions = randomPointTransaction(4);
  const readingHistories = randomRecentRead(50);
  const transactionMethods = randomTransactionMethods(4);
  const chargeCountdown = randomChargeCountdown(4);
  const payMethods = randomPayMethods();
  const incomeReports = randomIncomeReport();
  const titleReports = randomTitleReport();
  const chapterReports = randomChapterReport();

  // initial db
  const db = {
    titles,
    chapters,
    users,
    genres,
    titleStatuses,
    'purchased-chapters': boughtChapters,
    'hired-chapters': hiredChapters,
    'coin-transactions': coinTransactions,
    'point-transactions': pointTransactions,
    'ticket-histories': ticketHistories,
    follows,
    notices,
    'reading-histories': readingHistories,
    'transaction-methods': transactionMethods,
    'charge-countdown': chargeCountdown,
    payMethods,
    incomeReports,
    titleReports,
    chapterReports,
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully');
  });
})();

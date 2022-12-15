import {
  convertChapterData,
  convertChapterReportData,
  convertCoinHistoryData,
  convertIncomeData,
  convertPointHistoryData,
  convertTicketHistoryData,
  convertTitleData,
  convertTitleReportData,
  convertUserData,
} from './index.js';

export const switchCaseConvert = (data = [], table = '') => {
  if (typeof data === typeof []) {
    switch (table) {
      case 'title':
        return convertTitleData(data);
      case 'chapter':
        return convertChapterData(data);
      case 'user':
        return convertUserData(data);
      case 'chapter_report':
        return convertChapterReportData(data);
      case 'title_report':
        return convertTitleReportData(data);
      case 'coin_transaction':
        return convertCoinHistoryData(data);
      case 'point_history':
        return convertPointHistoryData(data);
      case 'ticket_history':
        return convertTicketHistoryData(data);
      case 'income_report':
        return convertIncomeData(data);
      default:
        return data;
    }
  }
};

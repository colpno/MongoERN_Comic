// import chapterTransactionApi from "api/chapterTransaction.api";

const chapterTransactionService = {
  getAll: async () => {
    // try {
    // const response = await chapterTransactionApi.getAll(params);

    // return response;
    // } catch (error) {
    //   return Promise.reject(error.data);
    // }

    return { purchasedChapters: [], hiredChapters: [] };
  },
};

export default chapterTransactionService;

// import chapterTransactionApi from "api/chapterTransaction.api";

const chapterTransactionService = {
  getAll: async () => {
    // try {
    // const response = await chapterTransactionApi.getAll(params);

    // return response;
    // } catch (error) {
    //   return error?.data?.error || error?.data?.message;
    // }

    return { purchasedChapters: [], hiredChapters: [] };
  },
};

export default chapterTransactionService;

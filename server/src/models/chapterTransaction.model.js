import mongoose from 'mongoose';

const chapterTransactionSchema = mongoose.Schema(
  {
    user_id: { type: String, require: true },
    chapter_id: { type: String, require: true },
    expired_at: { type: Date },
    method: {
      type: String,
      enum: ['coin', 'point', 'ticketForRenting', 'ticketForPurchasing'],
      require: true,
    },
    cost: { type: Number, require: true },
  },
  { timestamps: true }
);

const ChapterTransaction = mongoose.model('chapter_transaction', chapterTransactionSchema);

export default ChapterTransaction;

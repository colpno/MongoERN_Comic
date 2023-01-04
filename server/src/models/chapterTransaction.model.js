import mongoose from 'mongoose';

const chapterTransactionSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    title_id: { type: mongoose.Types.ObjectId, ref: 'title', require: true },
    chapter_id: { type: mongoose.Types.ObjectId, ref: 'chapter', require: true },
    expiredAt: { type: Date },
    method: {
      type: String,
      enum: ['coin', 'point', 'rent ticket', 'purchase ticket'],
      require: true,
    },
    cost: { type: Number, require: true },
  },
  { timestamps: true }
);

chapterTransactionSchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);
  this.title_id = mongoose.Types.ObjectId(this.title_id);
  this.chapter_id = mongoose.Types.ObjectId(this.chapter_id);

  next();
});

const ChapterTransaction = mongoose.model('chapter_transaction', chapterTransactionSchema);

export default ChapterTransaction;

import mongoose from 'mongoose';

const readingHistorySchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    title_id: { type: mongoose.Types.ObjectId, ref: 'title', require: true },
    chapter_id: { type: mongoose.Types.ObjectId, ref: 'chapter', require: true },
  },
  { timestamps: true }
);

readingHistorySchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);
  this.title_id = mongoose.Types.ObjectId(this.title_id);
  this.chapter_id = mongoose.Types.ObjectId(this.chapter_id);

  next();
});

const ReadingHistory = mongoose.model('reading_history', readingHistorySchema);

export default ReadingHistory;

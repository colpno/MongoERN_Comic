import mongoose from 'mongoose';

const readingHistorySchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'users', require: true },
    title_id: { type: mongoose.Types.ObjectId, ref: 'titles', require: true },
    chapter_id: { type: mongoose.Types.ObjectId, ref: 'chapters', require: true },
  },
  { timestamps: true }
);

readingHistorySchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);
  this.title_id = mongoose.Types.ObjectId(this.title_id);
  this.chapter_id = mongoose.Types.ObjectId(this.chapter_id);

  next();
});

const ReadingHistory = mongoose.model('reading_histories', readingHistorySchema);

export default ReadingHistory;

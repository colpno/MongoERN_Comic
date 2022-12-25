import mongoose from 'mongoose';

const readingHistorySchema = mongoose.Schema(
  {
    user_id: { type: String, require: true },
    title_id: { type: String, require: true },
    chapter_id: { type: String, require: true },
  },
  { timestamps: true }
);

const ReadingHistory = mongoose.model('reading_history', readingHistorySchema);

export default ReadingHistory;

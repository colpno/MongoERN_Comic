import mongoose from 'mongoose';
import { minimumLength } from '../validations/index.js';
import Chapter from './chapter.model.js';
import Follow from './follow.model.js';
import ReadingHistory from './readingHistory.model.js';
import TitleReport from './titleReport.model.js';

const titleSchema = mongoose.Schema(
  {
    user_id: { type: String, require: true },
    approved_status_id: { type: String, default: '63a6fb6216ee77053d6feb91' },
    status: {
      type: String,
      enum: ['inv', 'vis'],
      require: true,
    },
    release_day: {
      type: String,
      enum: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN', 'paused', 'finished'],
      require: true,
    },
    title: { type: String, require: true },
    cover: {
      source: { type: String, require: true },
      cloud_public_id: { type: String, require: true, unique: true },
    },
    author: { type: String, require: true },
    summary: { type: String, require: true },
    genres: { type: [{ type: String }], validate: [minimumLength, 'Tối thiểu 1 thể loại'] },
    coin: { type: Number, min: 0, require: true },
    point: { type: Number, min: 0, require: true },
    like: { type: Number, min: 0, default: 0 },
    view: { type: Number, min: 0, default: 0 },
    total_chapter: { type: Number, min: 0, default: 0 },
    _guid: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

titleSchema.pre('remove', function (next) {
  Chapter.remove({ title_id: this._id }).exec();
  Follow.remove({ title_id: this._id }).exec();
  ReadingHistory.remove({ title_id: this._id }).exec();
  TitleReport.remove({ title_id: this._id }).exec();

  next();
});

const Title = mongoose.model('title', titleSchema);

export default Title;

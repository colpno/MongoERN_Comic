import mongoose from 'mongoose';

import { minimumLength } from '../validations/index.js';
import ChapterReport from './chapterReport.model.js';
import ChapterTransaction from './chapterTransaction.model.js';
import Favorite from './favorite.model.js';
import ReadingHistory from './readingHistory.model.js';

const chapterSchema = mongoose.Schema(
  {
    title_id: { type: mongoose.Types.ObjectId, ref: 'title', require: true },
    approved_status_id: {
      type: mongoose.Types.ObjectId,
      ref: 'approved_status',
      default: '63a6fb6216ee77053d6feb91',
    },
    title: { type: String, require: true },
    cover: {
      source: { type: String, require: true },
      cloud_public_id: { type: String, require: true },
    },
    contents: {
      type: [
        {
          source: { type: String, require: true },
          cloud_public_id: { type: String, require: true },
        },
      ],
      validate: [minimumLength, 'Chương cần tối thiểu 1 nội dung hình ảnh'],
    },
    order: { type: Number, min: 1, require: true },
    cost: { type: Boolean, default: false },
    like: { type: Number, min: 0, default: 0 },
    view: { type: Number, min: 0, default: 0 },
    _guid: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

chapterSchema.pre('remove', function (next) {
  ChapterReport.remove({ chapter_id: this._id }).exec();
  ChapterTransaction.remove({ chapter_id: this._id }).exec();
  Favorite.remove({ chapter_id: this._id }).exec();
  ReadingHistory.remove({ chapter_id: this._id }).exec();

  next();
});

chapterSchema.pre(/^find/, function (next) {
  this.title_id = mongoose.Types.ObjectId(this.title_id);
  this.approved_status_id = mongoose.Types.ObjectId(this.approved_status_id);

  next();
});

const Chapter = mongoose.model('chapter', chapterSchema);

export default Chapter;

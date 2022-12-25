import mongoose from 'mongoose';
import { minimumLength } from '../validations/index.js';
import ChapterReport from './chapterReport.model.js';
import ChapterTransaction from './chapterTransaction.model.js';
import Favorite from './favorite.model.js';
import ReadingHistory from './readingHistory.model.js';

const chapterSchema = mongoose.Schema(
  {
    title_id: { type: String, require: true },
    approved_status_id: { type: String, require: true },
    title: { type: String, unique: true, require: true },
    cover: { type: String, require: true },
    contents: {
      type: [
        {
          src: { type: String, require: true },
          cloud_public_id: { type: String, require: true },
        },
      ],
      validate: [minimumLength, 'Chương cần tối thiểu 1 nội dung hình ảnh'],
    },
    order: { type: Number, min: 1, require: true, unique: true },
    cost: { type: Boolean, default: false },
    like: { type: Number, min: 0 },
    view: { type: Number, min: 0 },
    cloud_public_id: { type: String, require: true },
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

const Chapter = mongoose.model('chapter', chapterSchema);

export default Chapter;

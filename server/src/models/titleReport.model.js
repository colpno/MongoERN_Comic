import mongoose from 'mongoose';
import {
  MAX_MONTH,
  MAX_YEAR,
  MIN_MONTH,
  MIN_YEAR,
  monthRange,
  yearRange,
} from '../validations/index.js';

const titleReportSchema = mongoose.Schema(
  {
    title_id: { type: mongoose.Types.ObjectId, ref: 'titles' },
    like: { type: Number, min: 0, default: 0 },
    view: { type: Number, min: 0, default: 0 },
    month: {
      type: Number,
      min: MIN_MONTH,
      max: MAX_MONTH,
      require: true,
      validate: [monthRange, 'Tháng trong khoảng 1 - 12'],
    },
    year: {
      type: Number,
      min: MIN_YEAR,
      max: MAX_YEAR,
      require: true,
      validate: [yearRange, `Năm trong khoảng ${MIN_YEAR} - ${MAX_YEAR}`],
    },
  },
  { timestamps: true }
);

titleReportSchema.pre(/^find/, function (next) {
  this.title_id = mongoose.Types.ObjectId(this.title_id);

  next();
});

const TitleReport = mongoose.model('title_reports', titleReportSchema);

export default TitleReport;

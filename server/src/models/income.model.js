import mongoose from 'mongoose';
import {
  MAX_MONTH,
  MAX_YEAR,
  MIN_MONTH,
  MIN_YEAR,
  monthRange,
  yearRange,
} from '../validations/index.js';

const incomeSchema = mongoose.Schema(
  {
    user_id: { type: [mongoose.Types.ObjectId, null], ref: 'users', require: true },
    total_income: { type: Number, min: 0, default: 0 },
    purchased_chapter_income: { type: Number, min: 0, default: 0 },
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

incomeSchema.pre('save', function (next) {
  this.total_income = this.purchased_chapter_income;
  this.purchased_chapter_income = Number.parseFloat(this.purchased_chapter_income).toFixed(2);

  next();
});

incomeSchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);

  next();
});

const Income = mongoose.model('incomes', incomeSchema);

export default Income;

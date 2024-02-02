import moment from 'moment';
import mongoose from 'mongoose';

import ChapterTransaction from './chapterTransaction.model.js';
import Favorite from './favorite.model.js';
import Follow from './follow.model.js';
import Income from './income.model.js';
import ReadingHistory from './readingHistory.model.js';
import Title from './title.model.js';
import Transaction from './transaction.model.js';

const userSchema = mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    avatar: { type: String },
    email: { type: String, require: true, lowercase: true },
    coin: { type: Number, min: 0, default: 0 },
    point: { type: Number, min: 0, default: 0 },
    ticket_for_renting: { type: Number, min: 0, default: 0 },
    ticket_for_buying: { type: Number, min: 0, default: 0 },
    income: { type: Number, min: 0, default: 0 },
    date_of_birth: { type: Date, default: '' },
    role: {
      type: String,
      enum: ['member', 'administrator'],
      require: true,
    },
    isActivated: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    paypal_email: { type: String, require: true },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (this.date_of_birth) {
    const birthDay = moment(this.date_of_birth).toISOString();
    this.date_of_birth = birthDay;
  }

  next();
});

userSchema.pre('remove', function (next) {
  ChapterTransaction.remove({ user_id: this._id }).exec();
  Transaction.remove({ user_id: this._id }).exec();
  Favorite.remove({ user_id: this._id }).exec();
  Follow.remove({ user_id: this._id }).exec();
  Income.remove({ user_id: this._id }).exec();
  ReadingHistory.remove({ user_id: this._id }).exec();
  Title.remove({ user_id: this._id }).exec();

  next();
});

const User = mongoose.model('users', userSchema);

export default User;

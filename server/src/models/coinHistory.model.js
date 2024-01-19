import mongoose from 'mongoose';

const coinHistorySchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'users', require: true },
    method: { type: String, require: true },
    amount: { type: Number, require: true },
  },
  { timestamps: true }
);

coinHistorySchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);

  next();
});

const CoinHistory = mongoose.model('transactions', coinHistorySchema);

export default CoinHistory;

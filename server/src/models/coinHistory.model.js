import mongoose from 'mongoose';

const coinHistorySchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'users', require: true },
    payment_method: { type: String, require: true },
    amount: { type: Number, require: true },
  },
  { timestamps: true }
);

coinHistorySchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);

  next();
});

const CoinHistory = mongoose.model('coin_histories', coinHistorySchema);

export default CoinHistory;

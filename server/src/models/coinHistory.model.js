import mongoose from 'mongoose';

const coinHistorySchema = mongoose.Schema(
  {
    user_id: { type: String, require: true },
    payment_method: { type: String, require: true },
    amount: { type: Number, require: true },
  },
  { timestamps: true }
);

const CoinHistory = mongoose.model('coin_history', coinHistorySchema);

export default CoinHistory;

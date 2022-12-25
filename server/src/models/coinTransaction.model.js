import mongoose from 'mongoose';

const coinTransactionSchema = mongoose.Schema(
  {
    user_id: { type: String, require: true },
    payment_method: { type: String, require: true },
    amount: { type: Number, require: true, min: 1 },
  },
  { timestamps: true }
);

const CoinTransaction = mongoose.model('coin_transaction', coinTransactionSchema);

export default CoinTransaction;

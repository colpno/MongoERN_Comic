import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'users', require: true },
    method: { type: String, require: true },
    unit: {
      type: String,
      enum: ['coin', 'point'],
      require: true,
    },
    amount: { type: Number, require: true },
  },
  { timestamps: true }
);

transactionSchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);

  next();
});

const Transaction = mongoose.model('transactions', transactionSchema);

export default Transaction;

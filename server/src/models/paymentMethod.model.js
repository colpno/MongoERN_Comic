import mongoose from 'mongoose';

const paymentMethodSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

const PaymentMethod = mongoose.model('payment_method', paymentMethodSchema);

export default PaymentMethod;

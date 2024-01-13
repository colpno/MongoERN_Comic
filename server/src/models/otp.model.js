import mongoose from 'mongoose';

const otpSchema = mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    code: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

const OTP = mongoose.model('otps', otpSchema);

export default OTP;

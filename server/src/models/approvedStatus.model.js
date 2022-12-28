import mongoose from 'mongoose';
import { isHex } from '../validations/index.js';

const approvedStatusSchema = mongoose.Schema(
  {
    status: { type: String, require: true, unique: true },
    color: {
      text: { type: String, require: true, unique: true },
      hex: {
        type: String,
        require: true,
        unique: true,
        validate: [isHex, 'Mã màu phải là mã hex'],
      },
    },
  },
  { timestamps: true }
);

const ApprovedStatus = mongoose.model('approved_status', approvedStatusSchema);

export default ApprovedStatus;

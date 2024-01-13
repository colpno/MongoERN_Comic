import mongoose from 'mongoose';
import { isHex } from '../validations/index.js';

const approvedStatusSchema = mongoose.Schema(
  {
    code: { type: String, require: true, unique: true },
    status: { type: String, require: true, unique: true },
    color: {
      text: { type: String, require: true },
      hex: {
        type: String,
        require: true,
        validate: [isHex, 'Mã màu phải là mã hex'],
      },
    },
  },
  { timestamps: true }
);

const ApprovedStatus = mongoose.model('approved_statuses', approvedStatusSchema);

export default ApprovedStatus;

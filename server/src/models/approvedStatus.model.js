import mongoose from 'mongoose';

const approvedStatusSchema = mongoose.Schema(
  {
    status: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

const ApprovedStatus = mongoose.model('approved_status', approvedStatusSchema);

export default ApprovedStatus;

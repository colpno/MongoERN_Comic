import mongoose from 'mongoose';

const objectStatusSchema = mongoose.Schema(
  {
    code: { type: String, require: true, unique: true },
    status: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

const ObjectStatus = mongoose.model('object_statuses', objectStatusSchema);

export default ObjectStatus;

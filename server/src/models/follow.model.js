import mongoose from 'mongoose';

const followSchema = mongoose.Schema(
  {
    user_id: { type: String, require: true },
    title_id: { type: String, require: true },
  },
  { timestamps: true }
);

const Follow = mongoose.model('follow', followSchema);

export default Follow;

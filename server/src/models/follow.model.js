import mongoose from 'mongoose';

const followSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    title_id: { type: mongoose.Types.ObjectId, ref: 'title', require: true },
  },
  { timestamps: true }
);

followSchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);
  this.title_id = mongoose.Types.ObjectId(this.title_id);

  next();
});

const Follow = mongoose.model('follow', followSchema);

export default Follow;

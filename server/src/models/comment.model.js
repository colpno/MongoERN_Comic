import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    user_id: { type: String, require: true },
    text: { type: String, require: true },
    reply_num: { type: Number, require: true, min: 0, default: 0 },
    parent_id: { type: String, require: true },
    hide: { type: Boolean, default: false },
  },
  { timestamps: true }
);

commentSchema.pre('save', function (next) {
  this.reply_num += 1;

  next();
});

const Comment = mongoose.model('comment', commentSchema);

export default Comment;

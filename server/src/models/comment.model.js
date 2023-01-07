import mongoose from 'mongoose';
import { allowCommentPlaceList } from '../validations/commentAt.validation.js';

const commentSchema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    comment_at: {
      type: String,
      require: true,
      validate: [allowCommentPlaceList, 'Nơi bình luận không hơp lệ'],
    },
    text: { type: String, require: true },
    comment_replies_num: { type: Number, require: true, min: 0, default: 0 },
    slug: { type: String, require: true },
    parent_slug: { type: String, require: true, default: '' },
    full_slug: { type: String, require: true },
    hide: { type: Boolean, default: false },
  },
  { timestamps: true }
);

commentSchema.pre('save', function (next) {
  this.slug += this._id;
  this.full_slug += `${new Date().toISOString()}:${this._id}`;

  next();
});

commentSchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);
  this.approved_status_id = mongoose.Types.ObjectId(this.approved_status_id);

  next();
});

const Comment = mongoose.model('comment', commentSchema);

export default Comment;

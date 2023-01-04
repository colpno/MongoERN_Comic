import mongoose from 'mongoose';

const favoriteSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    chapter_id: { type: mongoose.Types.ObjectId, ref: 'chapter', require: true },
  },
  { timestamps: true }
);

favoriteSchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);
  this.chapter_id = mongoose.Types.ObjectId(this.chapter_id);

  next();
});

const Favorite = mongoose.model('favorite', favoriteSchema);

export default Favorite;

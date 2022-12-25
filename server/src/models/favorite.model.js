import mongoose from 'mongoose';

const favoriteSchema = mongoose.Schema(
  {
    user_id: { type: String, require: true },
    chapter_id: { type: String, require: true },
  },
  { timestamps: true }
);

const Favorite = mongoose.model('favorite', favoriteSchema);

export default Favorite;

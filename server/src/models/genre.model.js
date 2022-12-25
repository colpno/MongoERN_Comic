import mongoose from 'mongoose';

const genreSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

const Genre = mongoose.model('genre', genreSchema);

export default Genre;

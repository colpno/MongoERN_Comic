import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
  {
    cover: {
      source: { type: String, require: true },
      cloud_public_id: { type: String, require: true, unique: true },
    },
    title: { type: String, require: true, unique: true },
    subTitle: { type: String, require: true },
    content: { type: String, require: true },
  },
  { timestamps: true }
);

const Notification = mongoose.model('notifications', notificationSchema);

export default Notification;

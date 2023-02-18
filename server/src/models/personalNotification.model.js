import mongoose from 'mongoose';

const personalNotificationSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    text: { type: String, require: true },
    read_at: { type: Date, default: null },
  },
  { timestamps: true }
);

personalNotificationSchema.pre(/^find/, function (next) {
  this.user_id = mongoose.Types.ObjectId(this.user_id);

  next();
});

const PersonalNotification = mongoose.model('personal_notification', personalNotificationSchema);

export default PersonalNotification;

import mongoose, {
  Schema,
  Document
} from "mongoose";

export interface INotification
  extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema =
  new Schema<INotification>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
      },

      title: {
        type: String,
        required: true
      },

      message: {
        type: String,
        required: true
      },

      isRead: {
        type: Boolean,
        default: false,
        index: true
      }
    },
    {
      timestamps: true
    }
  );

notificationSchema.index({
  user: 1,
  isRead: 1,
  createdAt: -1
});

export default mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

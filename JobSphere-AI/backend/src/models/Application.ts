import mongoose, {
  Schema,
  Document
} from "mongoose";

import {
  ApplicationStatus
} from "../constants/enums";

export interface IApplication
  extends Document {
  candidate: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  resume: string;
  coverLetter?: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema =
  new Schema<IApplication>(
    {
      candidate: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      job: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true
      },

      resume: {
        type: String,
        required: true
      },

      coverLetter: String,

      status: {
        type: String,
        enum: Object.values(
          ApplicationStatus
        ),
        default:
          ApplicationStatus.APPLIED,
        index: true
      }
    },
    {
      timestamps: true
    }
  );

applicationSchema.index({
  candidate: 1,
  job: 1
});

applicationSchema.index(
  {
    candidate: 1,
    job: 1
  },
  {
    unique: true
  }
);

applicationSchema.index({
  job: 1,
  status: 1
});

export default mongoose.model<IApplication>(
  "Application",
  applicationSchema
);

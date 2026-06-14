import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
  CANDIDATE = "candidate",
  EMPLOYER = "employer",
  ADMIN = "admin"
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  resume?: string;
  skills: string[];
  savedJobs: mongoose.Types.ObjectId[];
  headline?: string;
  bio?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CANDIDATE
    },
    avatar: String,
    resume: String,
    skills: {
      type: [String],
      default: []
    },
    savedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job"
      }
    ],
    headline: String,
    bio: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    portfolio: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>(
  "User",
  userSchema
);

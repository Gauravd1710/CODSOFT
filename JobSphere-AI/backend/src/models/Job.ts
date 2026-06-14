import mongoose, {
  Schema,
  Document
} from "mongoose";

import {
  EmploymentType,
  ExperienceLevel
} from "../constants/enums";

export interface IJob
  extends Document {
  title: string;
  company: mongoose.Types.ObjectId;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  requirements: string[];
  skills: string[];
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  vacancies: number;
  postedBy: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema =
  new Schema<IJob>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        index: true
      },

      company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        index: true
      },

      location: {
        type: String,
        required: true,
        index: true
      },

      salaryMin: Number,

      salaryMax: Number,

      description: {
        type: String,
        required: true
      },

      requirements: {
        type: [String],
        default: []
      },

      skills: {
        type: [String],
        default: [],
        index: true
      },

      employmentType: {
        type: String,
        enum: Object.values(
          EmploymentType
        ),
        required: true,
        index: true
      },

      experienceLevel: {
        type: String,
        enum: Object.values(
          ExperienceLevel
        ),
        required: true,
        index: true
      },

      vacancies: {
        type: Number,
        default: 1,
        min: 1
      },

      postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
      },

      isActive: {
        type: Boolean,
        default: true,
        index: true
      }
    },
    {
      timestamps: true
    }
  );

jobSchema.index({
  title: "text",
  description: "text",
  skills: "text"
});

jobSchema.index({
  location: 1,
  employmentType: 1,
  experienceLevel: 1,
  isActive: 1
});

export default mongoose.model<IJob>(
  "Job",
  jobSchema
);

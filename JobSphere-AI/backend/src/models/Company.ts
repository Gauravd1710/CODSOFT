import mongoose, {
  Schema,
  Document
} from "mongoose";

export interface ICompany
  extends Document {
  name: string;
  logo?: string;
  website?: string;
  description: string;
  industry: string;
  location: string;
  size: string;
  employer: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema =
  new Schema<ICompany>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        index: true
      },

      logo: String,

      website: String,

      description: {
        type: String,
        required: true
      },

      industry: {
        type: String,
        required: true,
        index: true
      },

      location: {
        type: String,
        required: true,
        index: true
      },

      size: {
        type: String,
        default: "1-10"
      },

      employer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
      }
    },
    {
      timestamps: true
    }
  );

export default mongoose.model<ICompany>(
  "Company",
  companySchema
);

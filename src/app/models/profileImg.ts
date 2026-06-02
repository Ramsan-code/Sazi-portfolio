import { Schema, Document, models, model } from "mongoose";

export type PageKey = "home" | "about";

export interface IProfileImage extends Document {
  page: PageKey;
  url: string;
  publicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileImageSchema = new Schema<IProfileImage>(
  {
    page: {
      type: String,
      enum: ["home", "about"],
      required: true,
      default: "home",
      unique: true,   // one document per page
    },
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
  },
  { timestamps: true }
);

// IMPORTANT: one document per page key
export default models.ProfileImage ||
  model<IProfileImage>("ProfileImage", ProfileImageSchema);

import { Schema, Document, models, model } from "mongoose";

export interface IProfileImage extends Document {
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileImageSchema = new Schema<IProfileImage>(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

// IMPORTANT: force single document behavior using fixed collection logic
export default models.ProfileImage ||
  model<IProfileImage>("ProfileImage", ProfileImageSchema);

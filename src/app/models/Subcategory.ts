import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ISubCategory extends Document {
  category_id: Types.ObjectId;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

const SubCategorySchema = new Schema<ISubCategory>(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    name: {
      type: String,
      required: [true, "Subcategory name is required"],
      trim: true,
      enum: [
        "Instagram Post",
        "Facebook Post",
        "LinkedIn Post",
        "YouTube Thumbnail",
      ],
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

SubCategorySchema.index({ category_id: 1 });
SubCategorySchema.index({ category_id: 1, slug: 1 }, { unique: true });

const SubCategory: Model<ISubCategory> =
  mongoose.models.SubCategory ||
  mongoose.model<ISubCategory>("SubCategory", SubCategorySchema);

export default SubCategory;
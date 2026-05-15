import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  category_id: Types.ObjectId;
  subcategory_id?: Types.ObjectId | null;
  img: string;
  img_public_id: string;
  description: string;
  tools: string[];
  avg_rating: number;
  review_count: number;
  created_at: Date;
  updated_at: Date;
  updateRating(newRating: number): Promise<void>;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },

    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    subcategory_id: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },

    img: {
      type: String,
      required: [true, "Project image URL is required"],
      trim: true,
    },

    img_public_id: {
      type: String,
      required: [true, "Image public ID is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    tools: {
      type: [String],
      default: [],
    },

    avg_rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    review_count: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

ProjectSchema.index({ category_id: 1 });
ProjectSchema.index({ subcategory_id: 1 });
ProjectSchema.index({ avg_rating: -1 });

ProjectSchema.methods.updateRating = async function (
  newRating: number
): Promise<void> {
  const total = this.avg_rating * this.review_count + newRating;
  this.review_count += 1;
  this.avg_rating = parseFloat((total / this.review_count).toFixed(2));
  await this.save();
};

const Project: Model<IProject> =
  mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
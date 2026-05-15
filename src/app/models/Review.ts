import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Project from "@/app/models/Project";

export interface IReview extends Document {
  project_id: Types.ObjectId;
  reviewer_name: string;
  content: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
    },

    reviewer_name: {
      type: String,
      required: [true, "Reviewer name is required"],
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Review content is required"],
      trim: true,
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

ReviewSchema.index({ project_id: 1 });
ReviewSchema.index({ rating: -1 });

// Auto-update avg_rating on Project after a review is saved
ReviewSchema.post("save", async function (doc) {
  try {
    const project = await Project.findById(doc.project_id);
    if (project) {
      await project.updateRating(doc.rating);
    }
  } catch (error) {
    console.error("Failed to update project rating:", error);
  }
});

const Review: Model<IReview> =
  mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
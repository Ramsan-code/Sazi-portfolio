import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Project from "../models/Project";

export interface IRating extends Document {
  project_id: Types.ObjectId;
  rating: number;
  created_at: Date;
  updated_at: Date;
}

const RatingSchema = new Schema<IRating>(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
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

RatingSchema.index({ project_id: 1 });
RatingSchema.index({ rating: -1 });

// Auto-update avg_rating on Project after a rating is saved
RatingSchema.post("save", async function (doc) {
  try {
    const project = await Project.findById(doc.project_id);
    if (project) {
      await project.updateRating(doc.rating);
    }
  } catch (error) {
    console.error("Failed to update project rating:", error);
  }
});

// Recalculate avg_rating on Project after a rating is deleted
RatingSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;
  try {
    const allRatings = await mongoose
      .model<IRating>("Rating")
      .find({ project_id: doc.project_id });

    const project = await Project.findById(doc.project_id);
    if (project) {
      if (allRatings.length === 0) {
        project.avg_rating = 0;
        project.review_count = 0;
      } else {
        const total = allRatings.reduce((sum, r) => sum + r.rating, 0);
        project.avg_rating = parseFloat((total / allRatings.length).toFixed(2));
        project.review_count = allRatings.length;
      }
      await project.save();
    }
  } catch (error) {
    console.error("Failed to recalculate project rating:", error);
  }
});

const Rating: Model<IRating> =
  mongoose.models.Rating ||
  mongoose.model<IRating>("Rating", RatingSchema);

export default Rating;
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    due_date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low💤", "Medium⌛", "High🔥"],
      default: "Low💤",
    },
    position: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//^ Middleware to automatically set position for new tasks
taskSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const highestPositionTask = await this.constructor
        .findOne({ user: this.user, status: this.status })
        .sort({ position: -1 });

      this.position = highestPositionTask
        ? highestPositionTask.position + 1
        : 0;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

taskSchema.index({ user: 1, status: 1, position: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;

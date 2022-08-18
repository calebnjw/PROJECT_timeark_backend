import mongoose, { Schema } from "mongoose";

const DurationSchema: Schema = new Schema({
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
});

const TaskSchema: Schema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  duration: DurationSchema,
});

const InvoiceSchema: Schema = new Schema({
  issue_date: {
    type: Date,
  },
  paid: {
    type: Boolean,
  },
  overdue: {
    type: Boolean,
  },
});

const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    budget: {
      type: Float32Array,
      required: true,
    },
    rate: {
      type: Float32Array,
      allowNull: false,
    },
    due_date: {
      type: Float32Array,
      allowNull: false,
    },
    category_name: {
      type: Array,
    },
    task: TaskSchema,
    invoice: InvoiceSchema,
  },
  {
    timestamps: true,
  }
);

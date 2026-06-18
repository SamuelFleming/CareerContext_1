// server/src/models/Experience.js

const mongoose = require('mongoose');

const EXPERIENCE_TYPES = [
  'job',
  'project',
  'course',
  'certification',
  'personal_project',
  'other',
];

const ExperienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    type: {
      type: String,
      required: [true, 'Experience type is required'],
      enum: EXPERIENCE_TYPES,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    organisation: {
      type: String,
      default: '',
      trim: true,
    },
    role: {
      type: String,
      default: '',
      trim: true,
    },
    dateStart: {
      type: Date,
      default: null,
    },
    dateEnd: {
      type: Date,
      default: null,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    overviewRaw: {
      type: String,
      default: '',
    },
    overviewPolished: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    archivedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ExperienceSchema.index({ userId: 1 });
ExperienceSchema.index({ userId: 1, type: 1 });
ExperienceSchema.index({ userId: 1, isArchived: 1 });

ExperienceSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.userId;
    return ret;
  },
});

module.exports = mongoose.model('Experience', ExperienceSchema);
module.exports.EXPERIENCE_TYPES = EXPERIENCE_TYPES;

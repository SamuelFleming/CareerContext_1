// server/src/models/Activity.js

const mongoose = require('mongoose');

const EVIDENCE_STRENGTHS = ['low', 'medium', 'high'];

const ActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experience',
      required: [true, 'Experience ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    rawDescription: {
      type: String,
      default: '',
    },
    polishedSummary: {
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
    outcomes: {
      type: String,
      default: '',
    },
    evidenceStrength: {
      type: String,
      enum: EVIDENCE_STRENGTHS,
      default: null,
    },
    linkedJournalEntryIds: {
      type: [mongoose.Schema.Types.ObjectId],
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

ActivitySchema.index({ userId: 1 });
ActivitySchema.index({ experienceId: 1 });
ActivitySchema.index({ userId: 1, isArchived: 1 });

ActivitySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.userId;

    if (ret.experienceId) {
      ret.experienceId = ret.experienceId.toString();
    }

    if (Array.isArray(ret.linkedJournalEntryIds)) {
      ret.linkedJournalEntryIds = ret.linkedJournalEntryIds.map((entryId) =>
        entryId.toString()
      );
    }

    return ret;
  },
});

module.exports = mongoose.model('Activity', ActivitySchema);
module.exports.EVIDENCE_STRENGTHS = EVIDENCE_STRENGTHS;

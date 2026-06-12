// server/src/models/CoreContext.js

const mongoose = require('mongoose');

const CoreContextSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
    },
    fullName: {
      type: String,
      default: '',
      trim: true,
    },
    mobile: {
      type: String,
      default: '',
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    headline: {
      type: String,
      default: '',
      trim: true,
    },
    rawSummaryMd: {
      type: String,
      default: '',
    },
    summaryUpdatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

CoreContextSchema.index({ userId: 1 }, { unique: true });

<<<<<<< Updated upstream
CoreContextSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.userId;
    return ret;
  },
});

=======
>>>>>>> Stashed changes
module.exports = mongoose.model('CoreContext', CoreContextSchema);

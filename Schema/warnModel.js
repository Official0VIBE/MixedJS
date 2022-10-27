const mongoose = require('mongoose')

const warnModel = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    staffId: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('warnings', warnModel);

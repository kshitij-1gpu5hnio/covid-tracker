const mongoose = require("mongoose");

const countryDailySchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    confirmed: {
      type: Number,
      default: 0,
    },
    recovered: {
      type: Number,
      default: 0,
    },
    deceased: {
      type: Number,
      default: 0,
    },
    tested: {
      type: Number,
      default: 0,
    },
    source_updated_at: {
      type: Date,
    },
    source: {
      type: String,
    },
    isStale: {
      type: Boolean,
      default: false,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
  { timestamps: true }
);

countryDailySchema.virtual("active").get(function () {
  return this.confirmed - (this.recovered + this.deceased);
});

module.exports = mongoose.model("Country", countryDailySchema);

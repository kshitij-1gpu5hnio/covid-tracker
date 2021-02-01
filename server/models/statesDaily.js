const mongoose = require("mongoose");

const districtDailySchema = new mongoose.Schema(
  {
    district: {
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

districtDailySchema.virtual("active").get(function () {
  return this.confirmed - (this.recovered + this.deceased);
});

const District = mongoose.model("District", districtDailySchema);

const statesDailySchema = new mongoose.Schema(
  {
    state: {
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
    districts: [districtDailySchema],
    population: {
      type: Number,
    },
    source_updated_at: {
      type: Date,
    },
    source: {
      type: String,
      default: "",
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

statesDailySchema.virtual("active").get(function () {
  return this.confirmed - (this.recovered + this.deceased);
});

const State = mongoose.model("State", statesDailySchema);

module.exports = { State, District };

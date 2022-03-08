const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseInfoSchema = require("./exerciseInfo.js");
const exerciseSetSchema = require("./exerciseSet.js");



const exerciseSchema = new Schema({
  exerciseInfoRef: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "ExerciseInfo",
    required: true,
  },
  exerciseInfo: {
    type: exerciseInfoSchema,
  },
  name: {
    type: String,
  },
  exerciseSets: {
    type: [exerciseSetSchema],
    required: true,
  },
});

module.exports = exerciseSchema;

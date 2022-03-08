const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});
const ExerciseInfo = mongoose.model('ExerciseInfo', exerciseInfoSchema);

// ExerciseInfo.insertMany([{ name: 'pushup' },{name:'squat'}], function(err) {
//   console.log(err);
// });

module.exports = exerciseInfoSchema;
// module.exports = ExerciseInfo;


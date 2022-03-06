const mongoose = require("mongoose");
const router = require('express').Router();
let exerciseInfo = require('../models/exerciseInfo');
const ExerciseInfo = mongoose.model('ExerciseInfo', exerciseInfo);



router.route('/').get((req, res) => {
ExerciseInfo.find()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
const newExercise = new ExerciseInfo({
   name:req.body.name
});

newExercise.save()
    .then(() => res.json('exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports=router;






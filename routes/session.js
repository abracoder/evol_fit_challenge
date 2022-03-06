const router = require('express').Router();
let Trainer = require('../models/trainer');
let User = require('../models/user');
let Session=require('../models/session');
const exerciseSchema = require("../models/exercise");
const exerciseInfoSchema = require('../models/exerciseInfo');
const exerciseSetSchema = require('../models/exerciseSet');





router.route('/').get((req,res)=>{
    Session.find()
    .populate('userRef')
    .populate('trainerRef')
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));

})
router.route('/add').post((req, res) => {
    const exerciseInfoSchema=new exerciseInfoSchema({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name
    })
    // newSession.save()
    // .then(() => res.json('Session created!'))
    // .catch(err => res.status(400).json('Error: ' + err));

    const exerciseSetSchema=new exerciseSetSchema({
        _id: new mongoose.Types.ObjectId(),
        number:req.body.number,
        suggestedWeight:req.body.suggestedWeight,
        suggestedReps:req.body.suggestedReps
    })
    // newSession.save()
    // .then(() => res.json('Session created!'))
    // .catch(err => res.status(400).json('Error: ' + err));

    const exerciseSchema=new exerciseSchema({
        _id: new mongoose.Types.ObjectId(),
        // exerciseInfoRef:
        exerciseInfo:exerciseInfoSchema,
        name:req.body.name,
        exerciseSets:[].push(exerciseSetSchema)
    })
    // newSession.save()
    // .then(() => res.json('Session created!'))
    // .catch(err => res.status(400).json('Error: ' + err));

    const workoutSchema=new workout({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        excercises:[].push(exerciseSchema)
    })
    // newSession.save()
    // .then(() => res.json('Session created!'))
    // .catch(err => res.status(400).json('Error: ' + err));


// const routineRef=req.body.routineRef;
const workout=workoutSchema;
const date=req.body.date;
const userRef=req.body.userRef;
const trainerRef=req.body.trainerRef;
const isCompleted=req.body.isCompleted;


const newSession = new Session({
    workout,
    date,
    userRef,
    trainerRef,
    isCompleted
});

newSession.save()
    .then(() => res.json('Session created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;
const router = require('express').Router();
let Session=require('../models/session');

router.route('/').get((req,res)=>{
    Session.find()
    .populate('userRef')
    .populate('trainerRef')
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));

})
router.route('/add').post((req, res) => {


    const workout=req.body.workout;
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
router.route('/update/:id').patch((req, res) => {
    Session.findById(req.params.id)
    .then(session => {
        // console.log(session.workout.exercises[0].exerciseSets[0])
        // console.log(req.body.performedWeight)
        // console.log(req.body.performedReps)
        session.workout.exercises[0].exerciseSets[0].performedWeight=req.body.performedWeight
        session.workout.exercises[0].exerciseSets[0].performedReps=req.body.performedReps


        session.save()
        .then(() => res.json('session  updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    });


router.route('/updatedate').patch(async(req,res)=>{
    try{

        let session=await Session.find({date:{$gte:req.body.date}});
        for (let i = 0; i < session.length; i++) {
            console.log(session[i].isCompleted);
            // console.log(session[i].date.getUTCDate())

            if(session[i].isCompleted==false){
                id=session[i]._id
                console.log(id)
                Session.where({ _id: id }).update({ date: new Date(session[i].date.setUTCDate(session[i].date.getUTCDate()+1))})
                // session[i].date=new Date(session[i].date.setUTCDate(session[i].date.getUTCDate()+1));
                console.log(session[i].date)

            }
            // console.log(session[i].date.setUTCDate(session[i].date.getUTCDate()+1))

        }

        // const updatedSesssion = await session.save();
        // console.log(updatedSesssion);
        res.status(201).json(session);



    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: err.message })
    }



})

module.exports = router;
const router = require('express').Router();
let Session=require('../models/session');

router.route('/').get(async(req,res)=>{
    try{
        let session=await Session.find()
        res.json(session);

    }
    catch(err){
        res.status(500).json({ message: err.message })

    }
})
router.route('/add').post(async(req, res) => {


    const workout=req.body.workout;
    const date=req.body.date;
    const userRef=req.body.userRef;
    const trainerRef=req.body.trainerRef;
    const isCompleted=req.body.isCompleted;


    const session = new Session({
        workout,
        date,
        userRef,
        trainerRef,
        isCompleted
    });
    try{
        let newSession=await session.save();
        res.status(201).json(newSession);

    }catch(err){
        res.status(400).json({ message: err.message })
    }

    // newSession.save()
    //     .then(() => res.json('Session created!'))
    //     .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').patch(async(req, res) => {

    try{
        const session=await Session.findById(req.params.id);
        session.workout.exercises[0].exerciseSets[0].performedWeight=req.body.performedWeight
        session.workout.exercises[0].exerciseSets[0].performedReps=req.body.performedReps

        const updatedSession=await session.save()
        res.status(201).json(updatedSession);

    }
    catch(err){
        res.status(400).json({ message: err.message })
    }

    });


router.route('/updatedate').patch(async(req,res)=>{
    try{

        let session=await Session.find({date:{$gte:req.body.date}});

        for (let i = 0; i < session.length; i++) {
            console.log(session[i].isCompleted);
            if(session[i].isCompleted==false){
                id=session[i]._id
                 await Session.where({ _id: id }).update({ date: new Date(session[i].date.setUTCDate(session[i].date.getUTCDate()+1))})
                // session[i].date=new Date(session[i].date.setUTCDate(session[i].date.getUTCDate()+1));
                // console.log(session[i].date)
                // Session.save();

            }
        }
        session=await Session.find({date:{$gte:req.body.date}});
        // session.save()

        res.status(201).json(session);
    }
    catch(err){
        // console.log(err);
        res.status(500).json({ message: err.message })
    }



})

module.exports = router;
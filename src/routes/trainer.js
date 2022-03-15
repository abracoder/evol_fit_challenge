const router = require('express').Router();
let Trainer = require('../models/trainer');
const User = require("../models/user");

router.route('/').get(async(req, res) => {
    try{
        const trainer=await Trainer.find();
        res.json(trainer)
    }
    catch (err){
        res.status(500).json({ message: err.message })
    }

});

router.route('/add').post(async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const userRefs=req.body.userRefs;

    const trainer = new Trainer({
        name,
        email,
        userRefs

    });
    try{
        // let user= await User.findById(req.body.userRefs);
        const newTrainer = await trainer.save()
        res.status(201).json(newTrainer)




    }
    catch(err){
        res.status(400).json({ message: err.message })
    }

});

router.route('/:id').get((req, res) => {
Trainer.findById(req.params.id)
.then(trainer => res.json(trainer))
.catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;
const router = require('express').Router();
let Trainer = require('../models/trainer');
// let User=require()

const User = require("../models/user");
// const Product = require("../models/product");

router.route('/').get((req, res) => {
Trainer.find()
.populate('userRefs')
.then(trainers => res.json(trainers))
.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    User.findById(req.body.userRefs)
    .then(user => {
        if (!user) {
        return res.status(404).json({
            message: "user not found"
        });
        }
    })
        const name = req.body.name;
        const email = req.body.email;
        const userRefs=req.body.userRefs;

        const newTrainer = new Trainer({
            name,
            email,
            userRefs

        });

        newTrainer.save()
        .then(() => res.json('Trainer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
Trainer.findById(req.params.id)
.then(trainer => res.json(trainer))
.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
Trainer.findByIdAndDelete(req.params.id)
.then(() => res.json('Trainer deleted.'))
.catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/update/:id').post((req, res) => {
// Trainer.findById(req.params.id)
// .then(trainer => {
//     trainer.username = req.body.username;
//     trainer.description = req.body.description;
//     trainer.duration = Number(req.body.duration);
//     trainer.date = Date.parse(req.body.date);

//     trainer.save()
//     .then(() => res.json('Trainer updated!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// })
// .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
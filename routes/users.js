const router = require('express').Router();
let Trainer = require('../models/trainer');
let User = require('../models/user');

router.route('/').get((req, res) => {
  User.find()
    .populate('trainerRef')
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  Trainer.findById(req.body.trainerRef)
    .then(trainer => {
        if (!trainer) {
        return res.status(404).json({
            message: "trainer not found"
        });
        }
    })
  const name = req.body.name;
  const email=req.body.email;
  const gender=req.body.gender;
  const DOB=Date.parse(req.body.DOB);
  const phone=Number(req.body.phone);
  const trainerRef=req.body.trainerRef;


  const newUser = new User({
    email,
    name,
    gender,
    DOB,
    phone,
    trainerRef
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
const router = require('express').Router();
let Trainer = require('../models/trainer');
let User = require('../models/user');

router.route('/').get(async(req, res) => {
  try{
    const user=await User.find();
    res.json(user)
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }

});

router.route('/add').post(async(req, res) => {
  await Trainer.findById(req.body.trainerRef)
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
  const sessions=req.body.sessions;


  const user = new User({
    email,
    name,
    gender,
    DOB,
    phone,
    trainerRef,
    sessions
  });
  try{
    let newUser = await user.save();
    res.json(newUser);

  }catch(err){
    res.status(400).json({ message: err.message })
  }

});

module.exports = router;
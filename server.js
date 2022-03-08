const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const trainerRouter = require('./src/routes/trainer');
const usersRouter = require('./src/routes/users');
const sessionsRouter = require('./src/routes/session');
const exerciseRouter = require('./src/routes/excerciseinfo');



app.use('/trainers', trainerRouter);
app.use('/users', usersRouter);
app.use('/sessions',sessionsRouter);
app.use('/exerciseinfo',exerciseRouter)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
const DEFAULT_AIT_PORT = 3000;

// database setup
require('./db');
const mongoose = require('mongoose');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// body parser
/* app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs'); */
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const Review = mongoose.model('Review');

app.get('/api/reviews', async(req, res) => {
  // TODO: retrieve all reviews or use filters coming in from req.query
  // send back as JSON list
  const sem = req.query.semester;
  const yr = req.query.year;
  const check = {
    ...(sem && {semester: sem}),
    ...(yr && {year: yr}),
 };
 //console.log(check);
  const reviews = await Review.find(check).exec();
  //console.log(reviews);
  const data = reviews.map(r => {
    return {name: r.name, semester: r.semester, year: r.year, review: r.review};
  });
  res.json(data);
});

app.post('/api/review/create', (req, res) => {
  // TODO: create new review... if save succeeds, send back JSON
  // representation of saved object
  req.setRequestHeader("Content-type", "");
  const review = new Review(req.body);
  
  review.save(function(err, review) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.json(review);
    }
  });
  //console.log(Reviews.find());
/*   const {text, from} = req.body;
  const saved = await (new Message({text, from})).save();
  res.send(saved); */
});

app.listen(process.env.PORT || DEFAULT_AIT_PORT, (err) => {
  console.log('Server started (ctrl + c to shut down)');
});

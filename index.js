const path = require('path');
const { config, engine } = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Post = require('./database/models/Post');

const app = new express();

mongoose
  .connect('mongodb://localhost:27017/node-blog', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('You are now connected to Mongo!'))
  .catch((err) => console.error('Something went wrong', err));

app.use(express.static('public'));
app.use(engine);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

app.post('/posts/store', (req, res) => {
  console.log(req.body);
  Post.create(req.body, (error, post) => {
    res.redirect('/');
  });
});

/* app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/post.html'));
}); */

app.listen(4000, () => {
  console.log('App listening on port 4000');
});

const path = require('path');
const { config, engine } = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

const app = new express();

mongoose
  .connect('mongodb://localhost:27017/node-blog', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('You are now connected to Mongo!'))
  .catch((err) => console.error('Something went wrong', err));

app.use(fileUpload());
app.use(express.static('public'));
app.use(engine);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//const storePost = require('./middleware/storePost');
//app.use('/posts/store', storePost);

app.get('/', homePageController);
app.get('/post/:id', getPostController);
app.get('/posts/new', createPostController);
app.post('/posts/store', storePostController);

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

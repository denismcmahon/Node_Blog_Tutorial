const path = require('path');
const Post = require('../database/models/Post');

const storePost = require('../middleware/storePost');

(module.exports = storePost),
  (req, res) => {
    const { image } = req.files;

    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
      Post.create(
        {
          ...req.body,
          image: `/posts/${image.name}`,
        },
        (error, post) => {
          res.redirect('/');
        }
      );
    });
  };

module.exports = (req, res, next) => {
  console.log('DM here I am in the store middleware');
  if (!req.files || !req.body.username || !req.body.title || !req.body.description || !req.body.content) {
    return res.redirect('/posts/new');
  }

  next();
};

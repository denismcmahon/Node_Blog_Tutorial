module.exports = (req, res) => {
  console.log('===============DM here doing the session check=============');
  if (req.session.userId) {
    return res.render('create');
  }

  res.redirect('/auth/login');
};

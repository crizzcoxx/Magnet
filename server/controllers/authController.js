const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

exports.validateSignup = (req, res, next) => {
  req.sanitizeBody('name');
  req.sanitizeBody('email');
  req.sanitizeBody('password');

  req.checkBody('name', 'Enter your name please').notEmpty();
  req.checkBody('name', 'Name must be between 4 and 25 characters')
    .isLength({ min: 4, max: 25});

    //email not null & between 4-12 characters
    req.checkBody('email', 'Enter a valid email please')
    .isEmail()
    .normalizeEmail()

    //password not null & between 4-12 characters
    req.checkBody('password', 'Enter a password').notEmpty();
    req.checkBody('password', 'Password must be between 4 & 25 characters')
      .isLength({ min: 4, max: 25});

    const errors = req.validationErrors();
    if (errors) {
      const firstError = errors.map(error => error.msg)[0];
      return res.status(400).send (firstError);
    }
    next();
};

exports.signup = async (req, res) => {
  const {name, email, password} = req.body;
  const user = await new User({ name, email, password })
  await User.register(user, password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(user.name);
  })
};

exports.signin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json(err.message)
    }
    if (!user) {
      return res.status(400).json(info.message)
    }

    req.login(user, err => {
      if (err) {
        return res.status(500).json(err.message)
      }

      res.json(user);
    });
  })(req, res, next);
};

exports.signout = (req, res) => {
  res.clearCookie("next-cookie.sid")
  req.logout()
  res.send({ message: "You are signed out - you'll be back" })
};

exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin')
};

var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req,res){
  res.render('login', {message: req.flash('loginMessage')});
});


router.post('/login', passport.authenticate('user-login', {
  successRedirect: '/myprofile',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/signup', function(req,res){
  res.render('signup', {message: req.flash('loginMessage')});
});

router.post('/signup', passport.authenticate('user-signup', {
  successRedirect: '/myprofile',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.get('/myprofile', isLoggedIn, function(req, res){
  res.render('profile', {user: req.user});
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
     return next();
  res.redirect('/');
}

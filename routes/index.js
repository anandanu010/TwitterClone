var express = require('express');
var router = express.Router();
var passport = require('passport');

var Status = require('../models/status');
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
  // TO AMAZING SHIT HERE
  console.log('Loading all statuses for user', req.user);
  // Use our status model to find everything via find
  Status.find({'user':  req.user.username},function(err, allStatus){
      if (err) res.send(err);
      console.log(allStatus);
  });
  res.render('profile', {user: req.user});
})

router.post('/newstatus', isLoggedIn, function(req,res){
    console.log('Posting to status api with status %j', req.body.status);
    var status = new Status(); // new instance of status model - as we are adding to the DSB
    status.status = req.body.status // set the status to status that comes from request
    status.username = req.user.username;
    //save our new status object
    status.save(function(err){
     if (err) res.send(err);
        res.render('myprofile', {message: req.flash('newStatus')});
    });
  console.log(req.body.status);
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

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Status = require('../models/status');
var User = require('../models/user');
var busboy = require('connect-busboy');
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Clone', message: req.flash('message')});
});

router.post('/login', passport.authenticate('user-login', {
  successRedirect: '/homepage',
  failureRedirect: '/',
  failureFlash: true
}));

router.post('/signup', passport.authenticate('user-signup', {
  successRedirect: '/myprofile',
  failureRedirect: '/',
  failureFlash: true
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/homepage', isLoggedIn, function(req,res){
    console.log('Loading all user follows tweets');
    var usersFollowing = req.user.following;
    var query = {};
    query.$or = [];
    if (usersFollowing.length > 0){
      usersFollowing.map(function(entry){
        query.$or.push({'username': entry});
      });

      Status.find(query).sort({'created_at': -1}).exec(function(err, allStatus){
          if (err) res.send(err);
          var statusUsersDict = [];
          var itemsProcessed = 0;
          allStatus.forEach(function(entry){
             User.findOne({'username': entry.username}, function(err, user){
                if(err)console.log(err);
                statusUsersDict.push({ 'status': entry, 'user': user});
                itemsProcessed++;
                if (itemsProcessed === allStatus.length){
                  callback(req,res,statusUsersDict);
                }
             });
         });
    });
  }else{
    callback(req, res, []);
  }
});

function callback(req, res, dict){
   res.render('homepage', {title: "Home", user: req.user,tweetsAndUsersDict: dict});
}

router.post('/deleteStatus', isLoggedIn, function(req, res){
  console.log('Deleting status', req.body.statusid);
  Status.remove({_id:  req.body.statusid}, function(err,statusDeleted){
        if (err) res.send(err);
        res.redirect('/myprofile');
  });
});

router.post('/newstatus', isLoggedIn, function(req,res){
    // Move this logic to status model or create different model
    console.log('Posting to status api with status %j', req.body.status);
    var status = new Status(); // new instance of status model - as we are adding to the DSB
    status.status = req.body.status; // set the status to status that comes from request
    status.username = req.user.username;
    //save our new status object
    status.save(function(err) {
     if (err) res.send(err);
     res.redirect('/myprofile');
    });
});

router.post('/saveStatus', isLoggedIn, function(req,res){
    console.log('Updating status %j with new status %j', req.body.statusid, req.body.editedStatus);
    Status.findById(req.body.statusid, function(err, statusToUpdate){
      if (err) res.send(err);
      statusToUpdate.status = req.body.editedStatus;
      statusToUpdate.save(function(err){
        if (err) res.send(err);
        console.log('Status updated');
        res.redirect('/myprofile');
      });
    });
});

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
     return next();
  res.redirect('/');
}

var express = require('express');
var router = express.Router();
var Status = require('../models/status');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/following', isLoggedIn, function(req,res){
  User.findById(req.user._id, {following: true}, function(err, followers){
   console.log(followers);
   console.log(followers.following);
  });
});

router.get('/myprofile', isLoggedIn, function(req, res){
  console.log('Loading all statuses for user', req.user);
  // Use our status model to find everything via find
  Status.find({'username': req.user.username}).sort({'created_at': -1}).exec(function(err, allStatus){
      if (err) res.send(err);
      res.render('profile', {title: "My Profile", user: req.user, isCurrentUser: true, statuses: allStatus});
  });
});

router.get('/:username', isLoggedIn, function(req, res, next){
  var isCurrentUser = false;
  var username = req.params.username;
  var isFollowing = false;
  if(req.user.following.indexOf(username) >= 0)
    isFollowing = true;

  // Use our status model to find everything via find
  User.findOne({'username': username}, function(err, user){
    if (err) res.send(err);
    if(!user) {
      // Render 404 page here user not found...for now we are just redirecting catch all 404 rule
      next();
    }else {
      Status.find({'username': username}).sort({'created_at': -1}).exec(function(err, allStatus){
        if(username === req.user.username){
          isCurrentUser = true;
        }
        if (err) res.send(err);
        res.render('profile', {title: user.username + " Profile", user: user, statuses: allStatus, isCurrentUser: isCurrentUser, isFollowing: isFollowing});
      });
    }
  });
});

router.post('/editUser', isLoggedIn, function(req,res){
  User.findById(req.user._id, function(err, userToUpdate){
     userToUpdate.name = req.body.realName;
     userToUpdate.description = req.body.userDescription;

     userToUpdate.save(function(err){
       if (err) res.send(err);
       console.log('User details updated');
       res.json({ success: true });
     });
  });
});

router.post('/uploadHeaderPic', isLoggedIn, function(req,res){
   req.pipe(req.busboy);
   var fstream;
   var userFileLocation;
   req.busboy.on('file', function (fieldname, file, filename) {
      console.log("Uploading" + filename);
      userFileLocation = '/img/' + filename;
      fstream = fs.createWriteStream(process.env.PWD + '/public/img/' + filename);
      file.pipe(fstream);
      fstream.on('close', function() {
         console.log("Upload finished of " + filename);
         User.findById(req.user._id, function(err, userToUpdate){
             userToUpdate.headerImage = userFileLocation;
             userToUpdate.save(function(err){
             if (err) res.send(err);
                console.log('User details updated');
                res.status(200).send(userFileLocation);
             });
         });

      });
   });
});

router.post('/uploadProfilePic', isLoggedIn, function(req,res){
   req.pipe(req.busboy);
   var fstream;
   var userFileLocation;
   req.busboy.on('file', function (fieldname, file, filename) {
      console.log("Uploading" + filename);
      userFileLocation = '/img/' + filename;
      fstream = fs.createWriteStream(process.env.PWD + '/public/img/' + filename);
      file.pipe(fstream);
      fstream.on('close', function() {
         console.log("Upload finished of " + filename);
         User.findById(req.user._id, function(err, userToUpdate){
             userToUpdate.profileImage = userFileLocation;
             userToUpdate.save(function(err){
             if (err) res.send(err);
                console.log('User details updated');
                res.status(200).send(userFileLocation);
             });
         });

      });
   });
});

router.post('/addFollower', isLoggedIn, function(req,res){
  var userToFollow = req.body.userToFollow;
  User.update({"_id": req.user._id}, { "$push": {"following": userToFollow}}, function(err,worked){
    if(err) console.log(err);
    res.json({ success: true });
   });
  User.update({"username":userToFollow}, { "$push": {"followers": req.user.username}}, function(err,worked){
    if(err) console.log(err);
  });
});

router.post('/removeFollower', isLoggedIn, function(req,res){
  User.update({"_id": req.user._id},{ "$pull": {"following": req.body.userToRemove}}, function(err,worked){
    if (err) console.log(err);
   });

  User.update({"username": req.body.userToRemove},{ "$pull": {"followers": req.user.username}}, function(err,worked){
    if(err) console.log(err);
    res.json({ success: true });
  });
});

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
     return next();
  res.redirect('/');
}

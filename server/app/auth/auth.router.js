var router = require('express').Router();
var User = require('../../api/users/user.model');

router.post('/login',function(req, res){
  console.log('got a login request from',req.session);

    User.findOne({
    where: {
      email: req.body.email,
      password: req.body.pass
    }
  }).then(function(user){
      console.log(user);
      // console.log('it worked', user);
      req.session.userId = user.id;
      var hour = 3600000
      req.session.cookie.maxAge = hour;
      res.status(200).send();
  }).catch(function(err){
    console.error(err)
    req.session.userId = null;
    res.status(401).send(err)
  })
})

module.exports = router;

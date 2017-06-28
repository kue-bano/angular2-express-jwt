/**
 * Created by Kingsley on 6/20/2017.
 */

const express = require('express');
const router = express.Router();
var nJwt = require('njwt');
const config = require('../config/config');

// declare axios for making http requests
const axios = require('axios');
const API = 'https://reqres.in/';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});



router.post('/authenticate', (req, res) => {
  //authenticate and check if user exist

  //generate token
  var claims = {
    sub: 'userId1',
    iss: 'http://test',
    permissions: 'admin'
  }

  var jwt = nJwt.create(claims,config.secret);
  console.log('encrypt key' + config.secret)

  var token = jwt.compact();

  // return the information including token as JSON
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });

});

//guard routes to use jwt authentication
router.use((req,res,next) => {

  //check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  var splitParts = token.split(" ");
  token = splitParts[1];

  //decode token
  if(token) {

    //verify secret and check expiry date
    nJwt.verify(token,config.secret,function(err,verifiedJwt){
      console.log('decrypt key' + config.secret)
      if(err){
        console.log(err); // Token has expired, has been tampered with, etc
        return res.status(401).send({
          success: true,
          message: 'unauthorized'
        });
      }else{
        console.log(verifiedJwt); // Will contain the header and body
        return res.status(200).send({
          success: true,
          message: 'authentication successful'
        });
      }
    });
  }else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
})

router.post('/posts', (req, res) => {
  res.send('api works');
});


module.exports = router;

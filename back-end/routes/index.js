var express = require('express');
var router = express.Router();
const config = require('../config')
const connection = config.connect
const passport = require('passport')
var pgp = require('pg-promise')()
const db = pgp(connection);


router.get('/auth/github', passport.authenticate('github'))

router.get('/auth/github/callback',passport.authenticate('github'),(req,res)=>{
  const selectQuery = `select * from users`;
  const pgPromise = db.query(selectQuery)
  console.log(pgPromise)
  pgPromise.then((data)=>{
    console.log(data)
    res.json(data)
  })
  // res.json(req.user._json)
})

module.exports = router;

var express = require('express');
var router = express.Router();
const config = require('../config')
const connection = config.connect
var bcrypt = require('bcrypt-nodejs')
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

router.post('/register',(req,res)=>{
  console.log('b/e is working')
  const checkUsernameQuery = `SELECT * FROM users WHERE username = $1`
  db.query(checkUsernameQuery,[req.body.username]).then((results)=>{
    console.log (req.body.username)
    console.log(results)
    if(results.length === 0){
      // user does not exits, let's add them
      const insertUserQuery = `INSERT INTO users (username) VALUES ($1)`
      db.query(insertUserQuery,[req.body.username]).then(()=>{
        res.json({msg:"user added"})
      })
    } else {
      res.json({msg:"user exists"})
    }
  }).catch((err)=> {if (err) err})
  res.json(req.body)

})

module.exports = router;

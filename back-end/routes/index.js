var express = require('express');
var router = express.Router();
const config = require('../config')
const connection = config.connect
var bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
var pgp = require('pg-promise')()
const db = pgp(connection);
var randToken = require('rand-token');

router.get('/auth/github', passport.authenticate('github'))

router.get('/auth/github/callback',passport.authenticate('github'),(req,res)=>{
  const selectQuery = `select * from users`;
  const pgPromise = db.query(selectQuery)
  // console.log(pgPromise)
  pgPromise.then((data)=>{
    console.log(data)
    res.json(data)
  })
  // res.json(req.user._json)
})

router.post('/search', (req,res)=>{
  console.log(req.body.searchCriteria)
  const searchCriteria=req.body.searchCriteria;
  const searchQuery = `select * from games where gamename like '%$1%'`
  db.query(searchQuery,[searchCriteria]).then((results)=>{
    console.log(results)
  })
})

router.post('/register',(req,res)=>{
  // console.log('b/e is working')
  const checkUsernameQuery = `SELECT * FROM users WHERE username = $1`
  db.query(checkUsernameQuery,[req.body.username]).then((results)=>{
    // console.log (req.body.username)
    if(results.length === 0){
      // console.log(results)
        const token = randToken.uid(50)// this is for login to keep logged in after page refresh
        // use bcrypt.hashsync to make password something random
        const hash = bcrypt.hashSync(req.body.password)
        res.json({
          msg:"user added",
          token,
          username:req.body.username
        })
      // user does not exits, let's add them
      const insertUserQuery = `INSERT INTO users (username,password,token) VALUES ($1,$2,$3)`
      db.query(insertUserQuery,[req.body.username,hash,token]).then(()=>{
        // console.log('added')
      })
    } else {
      // console.log('exists')

      res.json({msg:"user exists"})
    }
  }).catch((err)=> {if (err) err})
})

router.post('/login',(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  // get the row with this username
  const selectUserQuery = `select * from users where username = $1`
  db.query(selectUserQuery,[username]).then((results)=>{
    if(results.length === 0){
      res.json({msg:'bad romance'})
    }else{
      const checkHash = bcrypt.compareSync(password,results[0].password)
      if (checkHash){
        // match! create a new token
        const token = randToken.uid(50)
        const updateTokenQuery = `update users set token = $1 where username = $2`
        db.query(updateTokenQuery,[token, username]).catch((err)=>{if (err) throw err})
        res.json({
          msg:"user logged in",
          token,
          username,
        })
      }else {
        res.json({
          msg:"bad password"
        })
      }
    }
  }).catch((err)=> {if(err)throw err})
})

module.exports = router;

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
var randToken = require('rand-token');
const db = require('../database')


router.get('/auth/github',passport.authenticate('github'));

router.get('/auth/github/callback',passport.authenticate('github'),(req,res)=>{
  const selectQuery = `SELECT * FROM users WHERE username = $1`;
  const pgPromise = db.query(selectQuery,[req.user.username]);
  // console.log(pgPromise);
  pgPromise.then((data)=>{
    if(data.length === 0){
      console.log("Not Found")
      const insertQuery = `INSERT into users (username) VALUES ($1) returning id`;
      db.query(insertQuery,[req.user.username]).then((id)=>{
        const payload = {id, username: req.user.username}
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: "1d"});
        sendToken(res,token);
      }).catch((error)=>{
        res.json(error)
      })
    }else{
      console.log("Found")
      const payload = {id: data.id, username: data.username};
      const token = jwt.sign(payload, config.jwtSecret, {expiresIn: "1d"});
      console.log(token)
      sendToken(res, token);
    }
  }).catch((error)=>{
    res.json(error)
  })
})


function sendToken(res,token){
  res.send(
    `<script>
      window.opener.postMessage({
        payload: ${JSON.stringify(token)},
        status: 'success'
        },window.opener.location)
    </script>`
    )
}

router.post('/search', (req,res)=>{
  console.log(req.body.searchCriteria)
  const searchCriteria=req.body.searchCriteria;
  const searchQuery = `select * from games where name like $1`
  db.query(searchQuery,[searchCriteria]).then((results)=>{
    console.log(results)
    res.json(results)
  }).catch((err)=>{if(err) throw err})
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

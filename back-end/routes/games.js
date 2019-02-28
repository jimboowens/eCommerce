var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
var randToken = require('rand-token');
const db = require('../database');

router.get('/getHome',(req,res)=>{
    res.json('GAMES')
})

module.exports = router;
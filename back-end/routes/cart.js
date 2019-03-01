var express = require('express');
var router = express.Router();
const db = require('../database');

router.post('/getCart',(req,res)=>{
    // res.json(req.body);
    console.log('test')
    const token = req.body.token
    const getUser = `select id from users where token = $1`
    db.query(getUser,[token]).then((results)=>{
        console.log(results)
        if (results.length ===0) return res.json({msg:'bad token'})
        else {
            const uid = results[0].id
            res.json({
                msg:'user connected',
                user:uid,
                token:token,
            })
        }
    }).catch((err)=>{if (err) throw err})
})
module.exports = router;
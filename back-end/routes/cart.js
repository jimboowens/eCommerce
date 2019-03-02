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
        if (results.length ===0){res.json({msg:'bad token'})}
        else {
            const uid = results[0].id
            const getCartTotals = `select * from cart inner join games on games.id = cart.gid where uid = $1`
            db.query(getCartTotals,[uid]).then((results)=>{
                const totals = `select sum(price) as totalprice, count(price) as totalitems from cart inner join games on games.id = cart.gid where uid = $1`
                db.query(totals,[uid]).then((totalNumbers)=>{
                    const responseData = {
                        contents:results,
                        total:totalNumbers[0].totalprice,
                        items:totalNumbers[0].totalitems,
                    }
                    res.json(responseData)
                }).catch((err)=>{if(err) throw err})
            }).catch((err)=>{if(err) throw err})
        }
    }).catch((err)=>{if (err) throw err})
})

router.post('/updateCart',(req, res)=>{
    // res.json("test");
    console.log(req.body.token)
    console.log(req.body.itemId)
    const token = req.body.token;
    const itemId = req.body.itemId
    const getUser = `SELECT id from users WHERE token = $1`
    db.query(getUser,[token]).then((results)=>{
        if(results.length === 0){res.json({msg: "bad token"})
        }else{
            const uid = results[0].id;
            const addToCartQuery = `INSERT INTO cart (uid,gid,date) VALUES ($1,$2,now())`
            db.query(addToCartQuery,[uid,itemId]).then(()=>{
                const getCartTotals = `SELECT * FROM cart WHERE uid = $1`
                db.query(getCartTotals,[uid]).then((results)=>{
                    res.json(results)
                }).catch((err)=>{if(err)throw err;})
            }).catch((err)=>{if(err)throw err;})
        }
    }).catch((err)=>{if(err)throw err;})
})

module.exports = router;
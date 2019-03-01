var express = require('express');
var router = express.Router();
const db = require('../database');

router.get('/getHome',(req,res)=>{
    // res.json('GAMES')
    const gameQuery = `select * from games where screenshot_url is not null order by random() limit 4`
    db.query(gameQuery).then((results)=>{
        // console.log(results)
        res.json(results)
    }).catch((err)=>{if(err) throw err})
})

router.get('/:id', (req,res)=>{
    // console.log(req.params)
    const gid = req.params.id
    const gameQuery = `select * from games where id = $1`
    db.query(gameQuery,[gid]).then((gameData)=>{
        // console.log(gameData)
        res.json(gameData)
    }).catch((err)=>{if(err) throw err})
})

module.exports = router;
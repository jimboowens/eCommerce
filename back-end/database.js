const config = require('./config')
const connection = config.connect
var pgp = require('pg-promise')()
const db = pgp(connection);

module.exports={query:(queryText,params)=>db.query(queryText,params)}
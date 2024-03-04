const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')

fs.mkdirSync('./database')

const db = new sqlite3.Database(
    './database/auth.db',
    (err)=>{
        if(err) return console.error(err)
        console.log('Connected to SQLite3 Database')
    }
)

db.serialize(()=>{
    console.log('Database[users] serialized...')
    // create the database schema for the todos app
    db.run("CREATE TABLE IF NOT EXISTS users ( \
      id INTEGER PRIMARY KEY, \
      username TEXT UNIQUE, \
      hashed_password BLOB, \
      salt BLOB \
    )");
})
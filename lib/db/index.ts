import sqlite3 from "sqlite3";

const authDB = new sqlite3.Database('./database/auth.db', (err)=>{
    if(err){
        console.log('Open Database error in  #/lib/db/index.ts')
        console.log('Error : ', err)
    }
})

export default authDB
const mysql2=require('mysql2');
const messages = require('../Constants/Messages');
const conn= mysql2.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'rntdbuat'
})
function testConnection(){
    this.conn.connect((error,success)=>{
        if(!error)
            console.log(messages.DB_CONNECTION_SUCCESS);
        else
            console.log(messages.DB_CONNECTION_FAIL,error);
    })
}

module.exports={
    conn,testConnection
}

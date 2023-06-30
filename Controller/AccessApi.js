const express=require('express');
const messages = require('../Constants/Messages');
const connection=require('../Connection/Connection');
const Query = require('../Constants/Query');
const port=3000||3002

const app=express();
app.use(express.json());
app.listen(port,(err,res)=>{
    if(!err){
        console.log(messages.SERVER_STATUS_UP,port);
        connection.testConnection();
    } else
        console.log(messages.SERVER_STATUS_ERROR);
})
app.get('/',(req,res)=>{
    connection.conn.query(Query.GET_ALL_EMPLOYEE,[1247],(error,result)=>{
        if(!error){
            res.send(result)
        }else{
            console.log("Error",error);
            res.send(messages.ERROR_WHILE_FETCHING_DATA)
        }
    });
})
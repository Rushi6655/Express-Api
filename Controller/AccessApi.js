const express=require('express');
const messages = require('../Constants/Messages');
const connection=require('../Connection/Connection');
const Query = require('../Constants/Query');
const jwt=require('jsonwebtoken');
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

app.use((req,res,next)=>{
    console.log(req.headers.authorization);
    console.log(req.url)
    if(req.headers.authorization!=null && req.url!="/login"){
        let token = req.headers.authorization.replace("Bearer ","");
        jwt.verify(token,"rushi",(error,success)=>{
            if(!error){
                next();
            }else{
                res.status(401).send("You Are Not Authoeized!");
            }
        })
    }else if(req.url=="/login"){
        console.log("Logic for tocken generation");
        jwt.sign({"user": req.body.username},"rushi",(error,success)=>{
            if(!error){
                console.log("generating ",success);
                res.send(success);
            }else{
                res.send("Error Creating Tocken");
            }
        });
    }else{
        res.status(401).send("You Are Not Authoeized!");
    }
})

app.get('/getEmployeeById',(req,res)=>{
    connection.conn.query(Query.GET_ALL_EMPLOYEE,[1247],(error,result)=>{
        if(!error){
            res.send(result)
        }else{
            console.log("Error",error);
            res.send(messages.ERROR_WHILE_FETCHING_DATA)
        }
    });
})
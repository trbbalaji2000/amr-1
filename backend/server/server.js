const exp=require("express");
const mysql=require("mysql");
const body=require("body-parser");
const app=exp();
//const db=require('../DB/db')
const dbdata=require('../controller/testcode');
const port=1500;

app.use(body.json())
//app.use('/mysql',db);
app.use('/control',dbdata);
app.get("/",(req,res)=>
{
    res.send("Welcome To Node Js Server");
}).listen(port,function()
{
    console.log("Server Running On...."+port);
});